# Destino editorial e perfil do artigo — 24/10/2026

**Busca comparativa adicional, 24/10/2026:**
[artigos próximos e avaliação das revistas](closest-papers-and-journals.md).
O antecedente mais próximo para o método foi publicado em *Technical Journal*,
que declara não cobrar APC; essa revista passa a ser reserva editorial sem taxa.
*Advanced Engineering Informatics* consta também do acordo CAPES–Elsevier,
mas requer aplicação demonstrada a tarefas de engenharia e evidência mais forte.

**Atualização de financiamento em 24/10/2026:** a verificação no
[contrato CAPES–Elsevier](uff-elsevier-capes.md) encontrou a UFF como
instituição participante e *Information Processing & Management* (IP&M) como
periódico híbrido `Read & Publish`. Em vista da condição de não pagar APC,
**IP&M passa a ser a revista principal de trabalho**. MethodsX permanece aqui
como registro da primeira escolha pelo escopo, agora descartada como alvo
principal por ser integralmente OA e cobrar APC. O manuscrito deve ser moldado
como *methods manuscript* ou *critical application manuscript* de IP&M, com
foco na representação, organização e revisão de informação científica.

## Decisão de trabalho

**Escolha editorial inicial: MethodsX (Elsevier), tipo Method Article.** Esta escolha
orienta a redação de um único artigo em inglês sobre a **metodologia de
construção e revisão de projetos de pesquisa**. O agente Mapa da Pesquisa é a
implementação computacional e o exemplo operacional do método. Casos
sintéticos, verificações técnicas e apreciações de Mario Reis e Sergio França
sustentam a validação delimitada; não constituem estudo com usuários externos.

**Reserva editorial inicial: AI (MDPI), tipo Article**, se o resultado final tiver uma contribuição
de sistema de IA e evidência experimental suficientemente fortes para esse
enquadramento. A escolha de MethodsX é editorial, não submissão ou garantia de
aceite. Não haverá submissões simultâneas.

## Base da escolha (fontes oficiais consultadas em 24/10/2026)

| Critério da análise inicial | MethodsX — então principal | AI — então reserva |
|---|---|---|
| Escopo/tipo | A editora define MethodsX como multidisciplinar, acesso aberto e voltada a avanços metodológicos curtos; fornece template de Method Article. | A revista recebe pesquisa original em aplicações, técnicas, agentes e outros tópicos de IA, exigindo contribuição substancial em IA. |
| Encaixe do manuscrito | O método pode ocupar o centro; arquitetura do agente demonstra a execução das etapas e regras. | Exigiria deslocar o centro para o sistema de IA e demonstrar sua contribuição específica além da aplicação de LLM. |
| Evidência que falta | Protocolo executável por terceiros, comparação explícita com prática anterior, validação do método e discussão honesta das falhas. | Avaliação experimental mais forte da contribuição de IA, com comparadores e resultados completos. |
| Limite editorial | Diretrizes de pareceristas da MethodsX pedem passos lógicos, reprodução e validade da mudança metodológica; a política ali publicada indica rejeição quando faltam experimentos essenciais. | A página oficial exige detalhamento experimental reproduzível; a revista é uma reserva se os resultados sustentarem o foco em IA. |

Fontes: [Elsevier Research Elements: MethodsX e SoftwareX](https://www.elsevier.com/researcher/author/tools-and-resources/research-elements-journals), [instruções aos pareceristas da MethodsX](https://legacyfileshare.elsevier.com/promis_misc/751614reviewer_guidelines.pdf), [AI: aims and scope](https://www.mdpi.com/journal/ai/about), [AI: tipos de artigo da editora](https://www.mdpi.com/about/article_types). O guia atual de autores e o template oficial da MethodsX devem ser relidos antes da formatação/submissão; o site ScienceDirect retornou HTTP 403 nesta consulta. Não inferir número de palavras ou figuras a partir desta checagem. Quartil depende de base, ano e categoria; a preferência Q1 não foi usada como afirmação de classificação JCR da MethodsX. O valor personalizado da APC permanece por confirmar na fase de submissão.

**Atualização de custo, 24/10/2026:** [DOAJ](https://doaj.org/toc/2215-0161)
registra APC de até **US$ 1.380** e política de dispensa. A [lista oficial de
preços da Elsevier de maio de 2025](https://assets.ctfassets.net/o78em1y1w4i4/5ZH2ckERsr69JYpnMue94T/c40ff39a9d21ba89acacdb5c48685370/article-publishing-charge.pdf)
registrava US$ 1.260 para MethodsX, portanto não serve como preço atual.
MethodsX consta do [piloto oficial de preço geográfico](https://www.elsevier.com/about/policies-and-standards/pricing/gpoa-journals-list);
a [política da Elsevier](https://www.elsevier.com/about/policies-and-standards/pricing)
lista Brasil na faixa de 65% do preço-base, sujeita ao cálculo personalizado
do grupo de autores e a tributos. O [acordo CAPES–Elsevier](https://www.elsevier.com/pt-br/open-access/agreements/brazil)
cobre periódicos **híbridos** elegíveis, enquanto MethodsX é integralmente
aberta; não presumir custeio pelo acordo. O custo é condição material da escolha
e deve ser aceito pelos autores antes de uma submissão paga.

## Perfil a adotar desde já

**Pergunta editorial:** Como uma metodologia de construção de projetos de
pesquisa pode tornar explícitas as dependências entre problema, objetivos,
literatura e método, e como um agente supervisionado pode executar revisões
versionadas sem apagar decisões humanas?

**Alegação central proposta:** formalização transferível dos contratos de etapa
e revisão do plano, com implementação em agente supervisionado e demonstração
de propriedades e limites em casos controlados. Não reivindicar primeiro
versionamento, primeiro agente científico, correção científica garantida ou
ganho de produtividade/aprendizagem.

**Título de trabalho:** *A Versioned Research-Design Method Implemented in a
Human-Supervised AI Agent: The Mapa da Pesquisa Framework*.

**Ordem do conteúdo:**

1. Problema e diferença precisa frente a métodos e sistemas próximos.
2. Contratos do método: entradas, saídas, critérios, dependências, revisão e papel humano.
3. Procedimento reproduzível passo a passo, incluindo exceções e exemplos.
4. Agente: arquitetura, fontes, estados, histórico, regras, IA e aprovações.
5. Validação: gabaritos técnico/metodológico, casos demonstrativos, execução local, resultados e falhas.
6. Discussão da utilidade, da validade limitada aos casos e do viés dos dois autores-avaliadores.

O benchmark fica subordinado à pergunta metodológica: verificar se o método e
sua implementação preservam decisões, sinalizam efeitos de mudanças e tornam
inconsistências visíveis. Testes de infraestrutura são evidência de execução,
não a contribuição principal. O achado local de conclusão/exportação de grafo
com ciclo e órfão e omissão de achados bloqueantes deve aparecer como limite
observado, caso persista na versão avaliada.

## Critérios antes de um manuscrito submetível

- Congelar a versão e executar os casos reservados; reportar também resultados desfavoráveis.
- Mario e Sergio julgam separadamente a adequação metodológica e reconciliam divergências; declarar envolvimento dos avaliadores no desenvolvimento.
- Mostrar diferença verificável em relação a uma prática comparadora, sem inventar superioridade.
- Disponibilizar protocolo, casos, gabaritos e configuração na extensão permitida por direitos e licenças; decidir abertura do código separadamente.
- Confirmar guia/template vigentes, valor personalizado da APC e sua fonte de custeio, elegibilidade institucional e quartil na base de interesse antes da submissão.

**Estado atual:** IP&M é a revista principal de trabalho pelo encaixe e pelo
acordo UFF–CAPES–Elsevier; MethodsX é escolha histórica retirada por custo.
Adequação e publicação continuam condicionadas à evidência científica, à
elegibilidade individual e à validação final da CAPES.
