# Research Map · Mesa de trabalho do artigo

Área de colaboração de Sérgio Luiz Braga França e Mario Reis para **The Research Map: A Method and Human-Supervised AI System for Structuring Research Plans**.

- **Área web:** https://msr-br.github.io/mapa-artigo/
- **Texto de referência:** `article/main.tex`, `article/sections/`, `article/references.bib`.
- **Histórico recuperado:** `context/` preserva os documentos de decisões e sugestões anteriores.
- **Revisões novas:** `reviews/` registra relatórios da IA com modelo, data, commit e propostas.
- **PDF original recuperado:** `article/recovered-2026-10-30.pdf`, mantido sem alterações.

## Colaboração

1. Abra a área web para ler o texto e as sugestões anteriores.
2. Use **Sugerir mudança** para criar uma discussão identificada pela conta GitHub.
3. Use **Editar seção** para propor texto no editor do GitHub. Escolha **Create a new branch** e abra um pull request para revisão.
4. Compare as alterações e a prévia PDF antes de incorporar o pull request. Se o editor ofereceu commit direto em `main`, prefira uma branch para manter a revisão explícita.
5. Após o merge, a automação compila o PDF, registra uma Release com revisão/data/commit e publica o site atualizado.

Para adicionar Sérgio, o proprietário convida seu usuário em **Settings → Collaborators**. Nenhum convite foi enviado automaticamente.

## Revisão por IA

Em **Actions → Revisar artigo com IA → Run workflow**, indique o foco. Alternativamente, colaboradores com escrita podem comentar `/revisar` numa Issue. O workflow só usa o texto consolidado de `main`; não lê código de branches de colaboradores com a chave.

A API OpenAI Responses gera um relatório em português e propostas em inglês/LaTeX. O modelo padrão é `gpt-5.4`; a variável de repositório `OPENAI_MODEL` permite configurar outro modelo compatível com Structured Outputs. Não há revisão automática em cada comentário nem alteração automática do texto consolidado.

A IA abre um **draft pull request**: somente trechos exatos e únicos podem ser substituídos, e conselhos que dependem de fontes ou decisões dos autores ficam no relatório. Uma prévia PDF é anexada à execução da revisão. Marque a proposta como pronta após conferi-la e faça o merge apenas quando os autores concordarem. O relatório é mostrado no site depois de incorporado.

**Limites:** a revisão não faz busca externa nem comprova referências ou resultados. Não substitui avaliação metodológica dos autores. A chave não aparece no site e o envio à OpenAI usa `store: false`. Cada revisão consome créditos da API.

## Configuração do GitHub

- Pages: **Settings → Pages → Source: GitHub Actions**.
- Secret de Actions: `OPENAI_API_KEY_ARTIGOSERGIO` (exposto ao script como `OPENAI_API_KEY`).
- **Settings → Actions → General → Workflow permissions:** habilitar **Allow GitHub Actions to create and approve pull requests** para a criação das propostas. A automação nunca aprova PRs; o workflow pede apenas as permissões necessárias no próprio YAML.
- O plano GitHub Free exige repositório público para Pages. O conteúdo publicado é público, mesmo que não seja indexado por buscadores. `noindex` não é controle de acesso.

## Execução local

Requisitos: Python 3.11+, Node.js (validação JS), Pandoc, latexmk/TeX Live, pdftoppm. Não há dependências JavaScript de produção.

```sh
python3 -m unittest discover -s scripts -p 'test_*.py'
node --check web/app.js
python3 scripts/build.py
python3 -m http.server 8088 --directory site
```

O build falha se o LaTeX não compila; não substitui silenciosamente o documento por um PDF antigo. A opção `--recovered-pdf` existe somente para prévia e identifica explicitamente o PDF recuperado. Cada versão gerada tem metadados em `version.json`.

## Origem e publicação

O manuscrito e o contexto foram recuperados do stash local **Preserved pre-C168 research and outreach drafts 2026-11-01; local only** do projeto Mapa. A versão 2 é a base de trabalho (rascunho datado de 30/10/2026). A elaboração e a decisão de submissão permanecem com os autores. Nenhum serviço de submissão editorial está integrado.

## Login e revisão pela própria página

Clique em **Entrar com GitHub** para conectar sua conta. O GitHub App MAPA Artigo MSR-BR está restrito ao repositório do artigo e pede somente Contents e Actions: escrita, além de Metadata: leitura. O serviço de login é https://mapa-artigo-login.vercel.app; os segredos ficam no servidor e a chave GPT continua no Actions. Não é necessário copiar tokens nem usar o console do GitHub para revisar ou salvar.

Cada autor precisa ter acesso de escrita ao repositório e autoriza a integração com sua própria conta. O botão de cada seção abre o editor, as orientações para IA e a comparação colorida. Aceitar coloca a proposta no formulário; salvar registra a autoria, bloqueia sobrescritas concorrentes e inicia a publicação do PDF. A sessão fica somente na memória da aba; ao recarregar, clique novamente em Entrar com GitHub. Sair limpa a sessão e solicita sua revogação.

A instalação administrativa é uma etapa única; o uso cotidiano ocorre pela página.
