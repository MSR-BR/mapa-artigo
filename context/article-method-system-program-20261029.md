# Programa do artigo de método e sistema — IP&M

29/10/2026. Mario Reis decidiu construir o artigo diretamente a partir das fontes metodológicas, da implementação e da literatura, sem usar o Mapa para planejar uma pesquisa futura. O [contrato compartilhado](../../.specs/shared/article-method-system-contract.md) fixa o escopo. Pó Mágico local `v20261020.002`: ARTICLE, subtipo `METHODS_OR_SYSTEM_ARTICLE`, com método de construção compartilhado como objeto descrito e AI_SYSTEM como apoio à inspeção do agente. O produto final é **LaTeX + PDF local**, sem submissão.

## Pergunta e objetivo de trabalho

**Pergunta:** Como o método Mapa da Pesquisa, concebido por Sergio França, é representado e operacionalizado em um aplicativo com agente de IA supervisionado por pessoas para construir e revisar projetos de pesquisa, e quais limites são visíveis na implementação?

**Objetivo:** Descrever e analisar o método original e sua implementação, articulando etapas, matriz objetivo–método, dependências, ações humanas, funções do agente, persistência/revisão e um percurso hipotético. Não afirmar que o sistema melhora resultados de usuários ou garante adequação científica.

**Tese editorial provisória:** o interesse da IP&M está no desenho de um método e de um sistema de informação que tornam relações e revisões de um plano de pesquisa inspecionáveis; a força dessa tese será testada contra fontes próximas e código, sem convertê-la em achado de eficácia.

## Roteiro do manuscrito

1. Introdução: problema de planos fragmentados; escopo, contribuição e limites.
2. Trabalhos relacionados: assistência por IA ao desenho de pesquisa, sistemas de agentes e proveniência/revisão; comparação específica, sem reivindicação genérica.
3. Metodologia de Sergio França: cinco etapas originais, matriz objetivo–método, relações e revisão humana; separar formalização posterior M1–M7.
4. Aplicativo e agente: modelo de informação, fluxo de geração/edição, papel da IA, regras, revisão, persistência, referências, exportação e diferenças método↔código.
5. Percurso ilustrativo: entrada hipotética, propostas, edição upstream, efeitos downstream e PDF; cada tela/estado rotulado como observado ou ilustrado.
6. Discussão e limites: o que o desenho permite inspecionar, falhas/partes não implementadas, validade externa e pesquisa futura.
7. Conclusão e declarações: contribuição documental/sistêmica proporcional à evidência, autoria, IA, disponibilidade e custos/acordo apenas quando confirmados.

Figuras candidatas: fluxo original com matriz; mapeamento método→componentes do sistema; arquitetura/agente e pontos de decisão humana; percurso de revisão. Tabelas candidatas: fonte→implementação e comparação de trabalhos próximos. Figuras são selecionadas por função argumentativa, não por quantidade predefinida.

## Changes canônicas

| Change | Entrega | Gate |
|---|---|---|
| [C158](../../.specs/changes/158-article-contract-evidence-baseline/objective.md) | Contrato de contribuição, baseline de fontes e ledger de alegações — **concluída em 29/10** | `GO_CONDICIONADO`; originalidade C160 e implementação C161 ainda pendentes. |
| [C159](../../.specs/changes/159-original-method-exposition/objective.md) | Descrição fiel do método de Sergio e figura/matriz — **draft concluído em 29/10** | `DRAFT_FOR_COAUTHOR_REVIEW`; original, formalização posterior e implementação separados. |
| [C160](../../.specs/changes/160-literature-ipm-positioning/objective.md) | Literatura próxima e contribuição original delimitada para IP&M — **concluída em 29/10** | Nove comparadores com fonte e nível de acesso; `GO_CONDICIONADO` à auditoria C161. |
| [C161](../../.specs/changes/161-system-agent-implementation/objective.md) | Descrição auditada do app/agente e diagramas | Código/fluxo atual sustentam cada alegação; limites e falhas preservados. |
| [C162](../../.specs/changes/162-illustrative-walkthrough/objective.md) | Percurso hipotético e figuras/capturas sintéticas | Exemplo não é usuário, estudo de caso empírico ou teste de eficácia. |
| [C163](../../.specs/changes/163-latex-manuscript-draft/objective.md) | Manuscrito integral em inglês, LaTeX e `.bib` | Texto segue o fluxo decidido; todas as afirmações decisivas rastreáveis. |
| [C164](../../.specs/changes/164-scientific-editorial-audit/objective.md) | Auditoria, PDF local e pacote para revisão dos coautores | Citações, figuras, limites, compilação e páginas inspecionados; sem submissão. |

As Changes são executadas sequencialmente quando Mario pedir continuidade. O antigo fluxo de screenshots/PDF do Mapa foi encerrado como caminho do artigo; C148–C151 e o LaTeX de 24/10 permanecem como histórico e material seletivo de reaproveitamento, sem gate de fichas/benchmark para esta versão. O PDF do Mapa de 29/10 é diagnóstico do desvio de escopo, não base obrigatória.

## Fontes já existentes

- [Auditoria das fontes de Sergio](primary-method-sources.md) e [matriz fonte→código](method-source-code-matrix.csv).
- [Revisão e comparadores](manuscript/related-work.md), [posicionamento IP&M anterior](ipm-article-positioning.md) e [guia/limites conhecidos](journal/ipm-guidelines.md); todos sujeitos a rechecagem proporcional às alegações finais.
- Repositório do aplicativo, código do agente, esquemas, testes e exportações na revisão local registrada em cada Change.
- [Rascunho LaTeX anterior](manuscript/latex/main.tex) como texto reaproveitável apenas após auditoria; seções de benchmark/resultados incompatíveis com este contrato serão retiradas.

Não se exigem novas avaliações de Mario/Sergio como participantes. Eles revisam autoria, fidelidade ao método e interpretação como **coautores** no draft integral preparado após C163–C164; Mario decidiu não encaminhar artefatos parciais da C159. Não há publicação automática.
