"""Compile the article and build a portable GitHub Pages workspace."""
import argparse
import datetime as dt
import html
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
REPO = os.getenv('GITHUB_REPOSITORY', 'MSR-BR/mapa-artigo')
SECTIONS = sorted((ROOT / 'article/sections').glob('*.tex'))

def run(args, cwd=ROOT):
    subprocess.run(args, cwd=cwd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def convert(path, bibliography=True):
    args = ['pandoc', str(path), '--from=latex' if path.suffix == '.tex' else '--from=markdown', '--to=html5', '--mathml']
    if bibliography:
        args += ['--citeproc', '--bibliography', str(ROOT / 'article/references.bib')]
    return subprocess.check_output(args, cwd=ROOT, text=True)

def build(output, compile_pdf=True):
    output = Path(output).resolve()
    if output == ROOT or ROOT not in output.parents:
        raise ValueError('Output must be a subdirectory of this workspace')
    output.mkdir(parents=True, exist_ok=True)
    sha = os.getenv('GITHUB_SHA') or subprocess.check_output(['git', 'hash-object', 'article/main.tex'], cwd=ROOT, text=True).strip()
    revision = os.getenv('GITHUB_RUN_NUMBER', 'local')
    attempt = os.getenv('GITHUB_RUN_ATTEMPT', '1')
    now = dt.datetime.now(dt.timezone.utc)
    version = f'r{revision}.{attempt}-{sha[:8]}'
    pdfname = f'research-map-{version}.pdf'
    references = {}
    if compile_pdf:
        with tempfile.TemporaryDirectory() as temporary:
            work = Path(temporary) / 'article'
            shutil.copytree(ROOT / 'article', work)
            main = (work / 'main.tex').read_text()
            main = re.sub(r'\\date\{[^}]*\}', lambda _: r'\date{Working draft --- ' + version + r'\\' + now.strftime('%Y-%m-%d %H:%M UTC') + '}', main)
            (work / 'main.tex').write_text(main)
            run(['latexmk', '-pdf', '-interaction=nonstopmode', '-halt-on-error', '-file-line-error', '-latexoption=-no-shell-escape', 'main.tex'], work)
            references = dict(re.findall(r'\\newlabel\{([^}]+)\}\{\{([^}]+)\}', (work / 'main.aux').read_text()))
            shutil.copy2(work / 'main.pdf', output / pdfname)
    else:
        shutil.copy2(ROOT / 'article/recovered-2026-10-30.pdf', output / pdfname)
    shutil.copy2(output / pdfname, output / 'article.pdf')
    assets = output / 'figures'
    assets.mkdir(exist_ok=True)
    for figure in (ROOT / 'article/figures').glob('*.pdf'):
        run(['pdftoppm', '-scale-to', '1600', '-png', '-singlefile', str(figure), str(assets / figure.stem)])
    sections = []
    section_labels = {}
    for index, source in enumerate(SECTIONS, 1):
        for label in re.findall(r'\\label\{(sec:[^}]+)\}', source.read_text()):
            section_labels[label] = (source.stem, index)
    for source in SECTIONS:
        body = convert(source)
        body = re.sub(r'src="figures/([^\"]+)\.pdf"', r'src="figures/\1.png"', body)
        body = re.sub(r'<embed src="([^"]+)"\s*/>', r'<img src="\1" alt="Figure from the Research Map manuscript" loading="lazy">', body)
        for label, number in references.items():
            body = re.sub(r'(<a[^>]+data-reference="' + re.escape(label) + r'">)[^<]+(</a>)', lambda m: m.group(1) + number + m.group(2), body)
        table_labels = re.findall(r'\\begin\{table\}[^\n]*[\s\S]*?\\label\{([^}]+)\}[\s\S]*?\\end\{table\}', source.read_text())
        for label in table_labels:
            body = body.replace('<table>', '<table id="' + label + '">', 1)
        for label, (target, number) in section_labels.items():
            body = body.replace('href="#' + label + '"', 'href="#section-' + target + '"').replace('[' + label + ']', str(number))
        body = body.replace('id="refs"', 'id="refs-' + source.stem + '"').replace('id="ref-', 'id="' + source.stem + '-ref-').replace('href="#ref-', 'href="#' + source.stem + '-ref-')
        match = re.search(r'\\section\{([^}]+)\}', source.read_text())
        sections.append({'id': source.stem, 'title': match.group(1) if match else source.stem, 'path': str(source.relative_to(ROOT)), 'html': body, 'source': source.read_text()})
    # Render title and abstract from the canonical source, without duplicating sections.
    main = (ROOT / 'article/main.tex').read_text()
    abstract = re.search(r'\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}', main).group(1).strip()
    contexts = [{'title': p.stem.replace('-', ' '), 'path': str(p.relative_to(ROOT)), 'html': convert(p, False)} for p in sorted((ROOT / 'context').glob('*.md'))]
    reviews = []
    for p in sorted((ROOT / 'reviews').glob('*.json'), reverse=True):
        try:
            reviews.append(json.loads(p.read_text()))
        except json.JSONDecodeError:
            raise ValueError(f'Invalid review file: {p.name}')
    data = {'repository': REPO, 'version': version, 'sha': sha, 'generatedAt': now.isoformat(), 'pdf': pdfname, 'compiled': compile_pdf, 'abstract': abstract, 'sections': sections, 'context': contexts, 'reviews': reviews, 'runUrl': f'https://github.com/{REPO}/actions/runs/{os.getenv("GITHUB_RUN_ID", "")}' }
    (output / 'workspace.json').write_text(json.dumps(data, ensure_ascii=False))
    for name in ['index.html', 'style.css', 'app.js']:
        shutil.copy2(ROOT / 'web' / name, output / name)
    (output / '.nojekyll').touch()
    (output / 'version.json').write_text(json.dumps({k: data[k] for k in ['version', 'sha', 'generatedAt', 'pdf', 'compiled']}))
    print(json.dumps({'version': version, 'pdf': pdfname, 'output': str(output)}))
    if os.getenv('GITHUB_OUTPUT'):
        with open(os.environ['GITHUB_OUTPUT'], 'a') as stream:
            stream.write(f'version={version}\npdf={pdfname}\n')
    return data

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', default=str(ROOT / 'site'))
    parser.add_argument('--recovered-pdf', action='store_true', help='Use recovered PDF for preview; mark as not compiled')
    args = parser.parse_args()
    build(args.output, not args.recovered_pdf)
