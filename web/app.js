'use strict';
let workspace;
const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = value => new Date(value).toLocaleString('pt-BR', {dateStyle:'medium',timeStyle:'short'});
const githubURL = path => `https://github.com/${workspace.repository}/${path}`;
function setView() {
  const hash = location.hash.slice(1) || 'article';
  const view = ['article','suggestions','versions','guide'].includes(hash) ? hash : 'article';
  document.querySelectorAll('.view').forEach(el => el.hidden = el.id !== view);
  document.querySelectorAll('nav a').forEach(el => el.classList.toggle('active', el.dataset.view === view));
  if (!['article','suggestions','versions','guide'].includes(hash)) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
}
function suggest(section = 'Geral') {
  $('#suggest-section').value = section;
  $('#suggestion-dialog').showModal();
  $('#suggest-title').focus();
}
function saveDraft() {
  try {localStorage.setItem('research-map-suggestion', JSON.stringify({title:$('#suggest-title').value, body:$('#suggest-body').value, section:$('#suggest-section').value}));} catch { /* Storage may be disabled. */ }
}
function card(item) {
  if (!item.html_url?.startsWith(`https://github.com/${workspace.repository}/`)) return '';
  return `<article class="card"><div class="meta">#${escapeHTML(item.number)} · ${escapeHTML(item.user?.login)} · ${escapeHTML(date(item.created_at))}</div><h3><a href="${escapeHTML(item.html_url)}" target="_blank" rel="noopener">${escapeHTML(item.title)} ↗</a></h3><p>${escapeHTML((item.body || '').slice(0,260))}</p></article>`;
}
async function loadGitHub() {
  try {
    const response = await fetch(`https://api.github.com/repos/${workspace.repository}/issues?state=open&per_page=100`);
    if (!response.ok) throw new Error();
    const issues = await response.json();
    $('#discussions').innerHTML = issues.map(card).join('');
    $('#discussion-status').textContent = issues.length ? 'Propostas abertas para a próxima versão. Abra uma proposta para discutir e revisar as mudanças.' : 'Nenhuma proposta pendente. Crie uma sugestão ou solicite uma nova revisão da IA.';
  } catch {
    $('#discussion-status').innerHTML = `Não foi possível carregar as propostas agora. <a href="${githubURL('issues')}" target="_blank" rel="noopener">Consultar propostas ↗</a>`;
  }
}
async function init() {
  try {
    const response = await fetch('workspace.json');
    if (!response.ok) throw new Error('Não foi possível carregar o manuscrito.');
    workspace = await response.json();
    $('#version').textContent = workspace.version;
    $('#repo-link').href = githubURL('');
    $('#invite-link').href = githubURL('settings/access');
    for (const selector of ['#top-pdf','#download-pdf']) $(selector).href = workspace.pdf;
    for (const selector of ['#review-link','#ai-action']) $(selector).href = githubURL('actions/workflows/review.yml');
    $('#abstract-text').textContent = workspace.abstract;
    $('#section-links').innerHTML = workspace.sections.map((s,i) => `<a href="#section-${escapeHTML(s.id)}">${i+1}. ${escapeHTML(s.title)}</a>`).join('');
    $('#article-sections').innerHTML = workspace.sections.map((s,i) => `<article class="article-section" id="section-${escapeHTML(s.id)}"><div class="section-tools"><button data-suggest="${escapeHTML(s.title)}">Sugerir mudança +</button><a href="${githubURL('edit/main/' + s.path)}" target="_blank" rel="noopener">Editar seção ↗</a><a href="${githubURL('commits/main/' + s.path)}" target="_blank" rel="noopener">Histórico ↗</a></div><div class="article-body">${s.html}</div></article>`).join('');
    $('#current-version').innerHTML = `<div class="eyebrow">PDF ATUAL</div><h2>The Research Map</h2><p class="muted">Versão ${escapeHTML(workspace.version)} · ${escapeHTML(date(workspace.generatedAt))}</p><div class="action-row"><a class="button primary" href="${escapeHTML(workspace.pdf)}" target="_blank" rel="noopener">Abrir PDF ↗</a><a class="button" href="${escapeHTML(workspace.pdf)}" download>Baixar PDF ↓</a></div>`;
    $('#suggest-section').innerHTML = ['Geral', ...workspace.sections.map(s => s.title)].map(s => `<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join('');
    try { const draft = JSON.parse(localStorage.getItem('research-map-suggestion') || '{}'); $('#suggest-title').value=draft.title||''; $('#suggest-body').value=draft.body||''; $('#suggest-section').value=draft.section||'Geral'; } catch { /* Ignore unavailable storage. */ }
    $('#suggestion-form').addEventListener('input', saveDraft);
    $('#suggestion-form').addEventListener('submit', event => {
      event.preventDefault(); saveDraft();
      const body = `## Seção\n${$('#suggest-section').value}\n\n## Proposta e justificativa\n${$('#suggest-body').value}\n\n## Versão consultada\n${workspace.version} · ${workspace.sha}\n\n---\nProposta enviada pela mesa de trabalho do Research Map.`;
      const url = new URL(githubURL('issues/new'));
      url.searchParams.set('title', $('#suggest-title').value); url.searchParams.set('body', body);
      if (url.href.length > 7500) { $('#suggestion-feedback').textContent='O texto é longo para enviar por link. Abra uma discussão no GitHub e cole sua proposta; o rascunho permanece salvo aqui.'; return; }
      const opened = window.open(url.href, '_blank', 'noopener');
      $('#suggestion-feedback').innerHTML=`Continue no GitHub para enviar. <a href="${escapeHTML(url.href)}" target="_blank" rel="noopener">Abrir proposta ↗</a>`;
    });
    document.querySelectorAll('[data-suggest]').forEach(el => el.addEventListener('click', () => suggest(el.dataset.suggest)));
    for (const id of ['#suggest-general','#new-suggestion']) $(id).addEventListener('click', () => suggest());
    $('#close-dialog').addEventListener('click', () => $('#suggestion-dialog').close());
    window.addEventListener('hashchange', setView);
    $('#loading').hidden=true; setView(); await loadGitHub();
  } catch (error) { $('#loading').textContent = 'Não foi possível abrir a área de trabalho. Atualize a página ou consulte o repositório no GitHub.'; console.error(error.message); }
}
init();
