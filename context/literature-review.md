# Revisão bibliográfica focal e delimitação da contribuição v0.1

## Atualização C146 — 24/10/2026

A comparação decisiva está redigida em [Related Work](manuscript/related-work.md), com fonte primária, DOI/URL e nível de leitura por alegação. O antecedente mais restritivo é [Aamer et al.](https://doi.org/10.1002/aidi.202500186): seu texto editorial descreve agentes analista/cientista/revisor, `ResearchMemory` com histórico de estados e críticas, avaliação estruturada e dashboard Intelliscope. Assim, memória, crítica, interface e desenho estruturado não bastam para reivindicar contribuição original. [Guerard et al.](https://hrcak.srce.hr/en/344763) já apresentam desenvolvimento de proposta, desenho e manuscrito com checkpoints humanos; [Wang et al.](https://www.sciencedirect.com/science/article/pii/S2950559326000209) já apresentam cinco etapas e nove prompts. O contraste proposto é a especificação de contratos de revisão de componentes de um plano persistido e sua avaliação técnica com casos de falha, **não** a ausência comprovada desses contratos nos sistemas anteriores.

[CoQuest](https://arxiv.org/html/2310.06155v3) e [ResearchAgent](https://aclanthology.org/2025.naacl-long.342/) continuam comparadores diretos de perguntas/ideias e revisão iterativa. [PROV-DM](https://www.w3.org/TR/prov-dm/) e os trabalhos de proveniência citados abaixo impedem tratar histórico como inovação isolada. O precedente IP&M de [Sarr et al.](https://doi.org/10.1016/j.ipm.2026.104940) foi acessível apenas em texto indexado pela editora nesta rodada; comparação detalhada aguarda acesso integral. O registro de busca e acesso está em [sources-and-search.md](sources-and-search.md). Esta é revisão narrativa focal, sem protocolo/recall de revisão sistemática.

O escopo editorial, tipo de artigo e lacunas de instruções da IP&M estão em [ipm-guidelines.md](journal/ipm-guidelines.md). A descrição oficial confirma interesse em artigos de método e aplicações críticas; a página específica de autores retornou 403. Nenhum limite formal de texto ou template foi inferido. As contribuições C1–C3 abaixo ficam **condicionadas** aos resultados C148 e à apreciação dos autores C149.

C135 — 23/10/2026 (America/Sao_Paulo; arquivos RS gerados em 24/10 UTC). Revisão exploratória aprofundada dos vizinhos conceituais, não revisão sistemática nem demonstração de ausência universal. As comparações abaixo se limitam ao material efetivamente examinado; “não verificado” não significa “ausente”.

## 1. Research Starter: execução, cobertura e triagem

Uso solicitado pelo usuário. Três consultas autenticadas à API v1 de Research Starter retornaram HTTP 200, `ok=true`, `status=partial`, `confidenceLevel=medium` e `analysisProvider=local`. O campo `analysisModel=gemini-3.5-flash` não prova síntese executada nesse modelo: os avisos informam indisponibilidade de síntese pelo modelo, e a revisão está skipped/primary-fallback. Utilizamos as referências recuperadas como descoberta, não as conclusões automáticas como evidência.

| Run | Consulta exata | Intervalo solicitado | Referências devolvidas |
|---|---|---|---|
| RS01 | Human AI collaboration in research question formulation and research proposal design: structured workflows, CoQuest, scientific planning agents | 2022-01-01 a 2026-10-23 | 30 |
| RS02 | Scientific workflow provenance and change-based versioning | 2000-01-01 a 2026-10-23 | 30 |
| RS03 | Large language model agents for research proposal generation | 2022-01-01 a 2026-10-23 | 30 |

Foram devolvidas **90 ocorrências, 89 registros distintos pela chave DOI normalizado ou título normalizado**. A deduplicação não resolve automaticamente preprint versus artigo editorial. Triagem focal por título/metadados: 5 retidos para a matriz, 14 candidatos, 17 de contexto, 53 excluídos da matriz focal e 1 duplicado. Retido não significa leitura integral. As decisões por registro estão em [screening.csv](research-starter/screening.csv), e os JSONs preservam requisição, resposta, direitos, cobertura e avisos.

Critério focal: contribuição direta a cocriação de perguntas/propostas, construção de planos científicos, controle humano de revisões ou proveniência de artefatos mutáveis. Contexto: infraestrutura de execução com relação indireta. Exclusão focal: outro domínio/tarefa sem conexão direta identificável nos metadados; não é juízo sobre qualidade do artigo. Candidatos não foram tratados como evidência confirmada. Esse rastreio foi preparado com assistência de IA e precisa de conferência dos dois autores antes da submissão; não representa duas triagens humanas independentes.

Limitações: fontes desabilitadas e erros/rate limits estão nas respostas, incluindo Semantic Scholar/CORE e DataCite na RS02. A ordenação e o teto de 30 por consulta limitam recall. A pontuação de pertinência do serviço não substitui triagem: RS03 indica bom ajuste lexical apesar de muitos títulos fora do escopo. Para registros não retidos, a data exata de publicação não foi confirmada; o filtro solicitado não certifica a elegibilidade de cada resultado de 2026. Não calcular recall da revisão sem universo de referência. Buscas dirigidas e navegação em fontes primárias complementaram o serviço, especialmente para CoQuest, ResearchAgent, Agent Laboratory e VisTrails.

## 2. Fontes primárias e extensão da leitura

Os IDs R01–R08 são preservados de [sources-and-search.md](sources-and-search.md). Os novos IDs abaixo não reutilizam os IDs internos R001 de cada relatório RS.

| ID | Fonte / identificador | Acesso examinado e origem |
|---|---|---|
| R01 | Liu et al. (2024), *CoQuest*. [CHI DOI](https://doi.org/10.1145/3613904.3642698) | [Texto v3](https://arxiv.org/html/2310.06155v3), seções 5.1–5.2 sobre interface, fluxo de perguntas e backend; fonte da busca inicial aprofundada nesta etapa |
| R03 | Gottweis et al. (2026), *Accelerating scientific discovery with Co-Scientist*. [Nature](https://www.nature.com/articles/s41586-026-10644-y) | Resumo, início do texto e Fig.1 da busca inicial; sem revisão integral de suplementos |
| R05 | Wang et al. (2026), *Learning to Predict Future-Aligned Research Proposals with Language Models*. [arXiv v4](https://arxiv.org/abs/2603.27146v4) | Metadados/resumo; reencontrado RS03-09; métodos completos pendentes |
| R06 | Moreau e Missier, eds. (2013), *PROV-DM*. [W3C](https://www.w3.org/TR/prov-dm/) | Resumo e estrutura conceitual; referência de vocabulário, sem teste de conformidade do Mapa |
| R09 | Baek, J.; Jauhar, S. K.; Cucerzan, S.; Hwang, S. J. (2025), *ResearchAgent: Iterative Research Idea Generation over Scientific Literature with Large Language Models*. NAACL, pp.6709–6738. DOI 10.18653/v1/2025.naacl-long.342 | [ACL Anthology](https://aclanthology.org/2025.naacl-long.342/), resumo e início/Fig.1 do PDF; busca suplementar |
| R10 | Schmidgall et al. (2025), *Agent Laboratory: Using LLM Agents as Research Assistants*. arXiv:2501.04227 | [Texto v1](https://arxiv.org/html/2501.04227v1), resumo, organização e início da seção 3; busca suplementar; preprint examinado, sem assumir estado editorial atual |
| R11 | Freire et al. (2006), *Managing Rapidly-Evolving Scientific Workflows*. IPAW, LNCS 4145, pp.10–18 | [PDF dos autores](https://www.sci.utah.edu/~stevec/papers/ipaw2006.pdf), resumo e páginas iniciais sobre VisTrails; busca suplementar |
| R12 | Leo et al. (2024), *Recording provenance of workflow runs with RO-Crate*. PLOS ONE 19(9):e0309210 | [Artigo editorial](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0309210), resumo e metadados; RS02-01 |
| R13 | Hugie et al. (2026), *RaivenTracks: Branching Provenance for Conversational Visualization Workflows*. arXiv:2608.14869v2 | [Texto v2](https://arxiv.org/html/2608.14869v2), resumo e seções 2–4, incluindo restauração; RS02-08; preprint, revisão de 13/10/2026 |
| R14 | Ciccarese et al. (2013), *PAV ontology: provenance, authoring and versioning*. Journal of Biomedical Semantics 4:37. DOI 10.1186/2041-1480-4-37 | [Registro/texto](https://pmc.ncbi.nlm.nih.gov/articles/PMC4177195/), metadados e trechos indexados; abertura direta encontrou CAPTCHA; RS02-13; não declarar leitura integral |
| R15 | Belhajjame et al. (2015), *Using a suite of ontologies for preserving workflow-centric research objects*. DOI 10.1016/j.websem.2015.01.003 | [Editora](https://www.sciencedirect.com/science/article/pii/S1570826815000049), metadados/resumo indexado; PDF institucional não acessível; RS02-23 |
| X01 | Wang, Y. (2026), *FirstResearch: Auditable Question Formation for LLM Scientific Discovery Agents*. arXiv:2607.05682 | [Registro oficial](https://arxiv.org/abs/2607.05682): retirado em 28/07/2026 para melhoria/consolidação; registro e v1 consultados; excluir como evidência de eficácia, manter sobreposição conceitual documentada |

R04 (avaliação de ideias), R07 (interação humano–IA) e R08 (design science) continuam como fundamentos candidatos da busca inicial. Seus instrumentos não foram importados como validados para este corpus. Candidatos adicionais relevantes: CWLProv, AiiDA, colaboração assíncrona em workflows e BioVerge; não sustentam conclusões deste documento enquanto não forem lidos.

## 3. Síntese comparativa

**Perguntas e propostas já são objetos de sistemas de IA.** CoQuest apresenta cocriação de perguntas, relações entre perguntas, fundamentação em literatura e ações de refinamento. ResearchAgent organiza geração iterativa de problemas, métodos e experimentos com agentes revisores. Esses antecedentes afastam alegações de inaugurar pergunta estruturada, refinamento ou integração problema–método. [R01](https://arxiv.org/html/2310.06155v3), [R09](https://aclanthology.org/2025.naacl-long.342/).

**Supervisão humana também não basta para originalidade.** Agent Laboratory descreve etapas de literatura, experimentação e relatório com assistência ao pesquisador; Co-Scientist oferece propostas e refinamentos a partir de objetivos científicos. A distinção investigável é o tratamento de uma revisão do plano e suas consequências, não a simples presença humana no ciclo. [R10](https://arxiv.org/html/2501.04227v1), [R03](https://www.nature.com/articles/s41586-026-10644-y).

**Versionamento e proveniência precedem LLMs.** VisTrails registra mudanças em workflows e permite revisitar variantes. PROV-DM fornece conceitos de entidade, atividade e agente. PAV distingue proveniência/autoria/versionamento, enquanto Research Objects e Workflow Run RO-Crate tratam organização e proveniência de artefatos/execuções. O Mapa não propõe uma nova teoria de proveniência nem demonstrou interoperabilidade com esses padrões. [R11](https://www.sci.utah.edu/~stevec/papers/ipaw2006.pdf), [R06](https://www.w3.org/TR/prov-dm/), [R14](https://doi.org/10.1186/2041-1480-4-37), [R15](https://doi.org/10.1016/j.websem.2015.01.003), [R12](https://doi.org/10.1371/journal.pone.0309210).

**A combinação IA–artefato validável–histórico tem antecedente próximo.** RaivenTracks persiste especificações de visualização como checkpoints ramificados, separa esse histórico de undo/redo e restaura estados para recompilação. Assim, versionar artefatos gerados, em lugar de apenas conversas, também não é contribuição exclusiva. Seu domínio é visualização; a oportunidade do Mapa é investigar contratos e consequências de alterações em componentes de um projeto de pesquisa. [R13](https://arxiv.org/html/2608.14869v2).

**Auditabilidade da pergunta exige atenção adicional.** FirstResearch anuncia certificados explícitos de formação de perguntas, mas foi retirado. A proximidade conceitual deve permanecer registrada; suas pontuações não fundamentam o artigo. [X01](https://arxiv.org/abs/2607.05682).

## 4. Matriz de fronteiras

| Família/comparador | Objeto e mecanismo documentados | O que não reivindicar | Questão própria a testar no Mapa |
|---|---|---|---|
| CoQuest | Perguntas relacionadas, literatura, refinamento | Primeira cocriação de pergunta ou primeiro grafo de pesquisa | Efeito de uma alteração sobre objetivos, tópicos e métodos do plano |
| ResearchAgent / Co-Scientist | Propostas, revisão e refinamento | Primeira ligação problema–método ou primeira supervisão científica | Separação canônico/rascunho/proposta e autoridade de revisão no plano persistido |
| Agent Laboratory | Processo de pesquisa com agentes e etapas | Primeiro workflow científico assistido por IA | Gestão explícita de revisões prospectivas antes da execução do estudo |
| VisTrails / PROV / PAV | Mudanças, versões, autoria e proveniência | Versionamento, recuperação ou proveniência como invenções | Aplicação desses princípios à construção metodológica do projeto |
| RO-Crate / Research Objects | Organização/preservação de artefatos e execuções | Reprodutibilidade ou interoperabilidade só porque existe histórico | Que decisões e estados o registro do Mapa permite reconstruir |
| RaivenTracks | Checkpoints de especificações geradas por IA | Primeiro artefato de IA persistido e recuperável | Consequências de revisão de componentes acadêmicos, com oráculo técnico e metodológico separados |

A matriz não afirma que sistemas comparadores carecem de funcionalidades não examinadas. Uma comparação experimental direta exigiria instalar/configurar suas versões ou justificar reproduções fiéis; isso não foi feito.

## 5. Contribuição candidata, agora mais restrita

**C1 — Formalização de método:** representar o projeto prospectivo por componentes tipados, relações explícitas, unidades de revisão e decisões humanas, com distinção entre completude técnica e adequação metodológica.

**C2 — Operacionalização auditável:** descrever contratos implementados para separar conteúdo canônico, rascunhos e propostas, recuperar unidades históricas e propagar necessidade de revisão por dependências de tipos. Trata-se de integração de mecanismos conhecidos em um domínio específico, não de novo algoritmo de inferência semântica.

**C3 — Evidência e limites:** avaliar contratos e consequências das mudanças em corpus sintético reproduzível, separando conformidade com a implementação de adequação segundo os autores, incluindo sobreinvalidação, omissões e falhas advisory. A contribuição empírica depende da execução futura.

Formulação em inglês para orientar o artigo:

> We present Research Mapping, a formalized workflow and implemented system for revising structured research plans. Its evaluation separates software revision contracts from author-assessed methodological dependencies, examining where type-based invalidation, recoverable editing, and advisory checks support or fail to support traceable project revision.

Essa frase descreve o artigo pretendido; em qualquer resumo divulgado antes dos experimentos, trocar “Its evaluation separates” por “The proposed evaluation will separate”. Não usar “first”, “unique”, “ensures scientific coherence”, “improves researchers’ autonomy” ou “validated methodology” sem evidências específicas.

**Decisão:** contribuição potencialmente publicável como método/sistema e estudo técnico delimitado, ainda condicional. O diferencial mais promissor é a caracterização verificável dos contratos e de seus limites no planejamento de pesquisa. Apenas apresentar interface, fluxo de prompts e histórico seria uma contribuição mais fraca diante dos antecedentes encontrados.

## 6. Condições para consolidar a alegação antes da submissão

Concluir leitura de métodos/avaliação dos comparadores diretos e seguir suas referências de projetos/ideação; conferir candidatos retidos por metadados; atualizar busca perto da submissão e resolver famílias preprint/editorial. A presente revisão já permite abandonar alegações amplas e formular hipóteses testáveis. Não permite afirmar exclusividade da combinação, superioridade sobre esses sistemas nem eficácia geral com usuários. O próximo trabalho concreto é congelar fixtures e oráculos e construir o harness definido em [validation-contract.md](validation-contract.md).
