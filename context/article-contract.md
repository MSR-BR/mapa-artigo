# C158 — Contrato científico do artigo método+sistema

**Atualização editorial de 30/10/2026:** Mario definiu Sérgio Luiz Braga França como primeiro autor e Mario Reis como último autor, com afiliações Escola de Engenharia/UFF e Instituto de Física/UFF, respectivamente. Autor correspondente e declarações CRediT permanecem abertos.

29/10/2026 · status **GO_CONDICIONADO** para construir um draft local dirigido à *Information Processing & Management* (IP&M). Este não é um juízo de aceitação pela revista. A [descrição editorial atual](https://shop.elsevier.com/journals/information-processing-and-management/0306-4573) inclui manuscritos de métodos e aplicações críticas de design de sistemas na interseção computação–ciência da informação. O Guide for Authors específico retornou 403 nesta consulta; nenhum limite formal de extensão, figuras ou template está confirmado.

## Pergunta, objeto e contribuição

**Pergunta de trabalho:** Como a metodologia Mapa da Pesquisa, concebida por Sergio França, é representada e operacionalizada em um aplicativo com agente de IA supervisionado por pessoas para construir e revisar projetos de pesquisa, e quais limites são visíveis nessa implementação?

**Objeto de análise:** correspondência entre o método documentado e o sistema implementado, especialmente componentes, dependências, matriz objetivo–método, revisões, propostas do agente e decisões humanas. A unidade é o **contrato método–sistema**, não o usuário, a instituição, nem um projeto acadêmico real. O percurso hipotético é explicativo, não amostra.

**Contribuição candidata:** uma exposição rastreável da metodologia original, uma descrição crítica de sua tradução para um sistema de informação com agente supervisionado e um percurso ilustrativo que torna visíveis decisões e limites. O artigo não reivindica invenção de agentes, grafos, memória, revisão por IA, versões ou exportação. Sua contribuição precisa ser específica na *composição* do método e do sistema e posicionada contra os comparadores próximos na C160.

**Público-alvo:** pesquisadores de sistemas de informação, ciência da informação, interação humano–IA e apoio ao desenho de pesquisa. O texto deve explicar a relevância para estados de informação persistidos e revisáveis, além do contexto educacional particular.

## Arquitetura de evidências

| Papel | Material | Pode sustentar | Não pode sustentar |
|---|---|---|---|
| Método original | Mapa de 03/08 e especificação de 07/08 de Sergio | Etapas, matriz, dependências e validação proposta | Que toda regra foi implementada ou testada |
| Formalização posterior | C145, `formal-method.md`, M1–M7 | Linguagem analítica do artigo, rotulada como posterior | Que M1–M7 sejam rótulos originais de Sergio |
| Sistema existente | Código e testes em revisão exata | Estruturas e comportamento delimitado | Coerência científica garantida ou eficácia em usuários |
| Literatura | Artigos e standards verificados | Antecedentes e contraste de mecanismos | Superioridade do Mapa sem comparação executada |
| Ilustração | Projeto sintético ou percurso conceitual | Compreensão do fluxo e das escolhas | Resultado empírico ou generalização |

O [ledger de alegações](article-claims-ledger.csv) registra IDs estáveis, fonte, acesso, status, formulação permitida e próxima checagem. `SUPPORTED_SOURCE` significa suporte documental; `SUPPORTED_CODE_STATIC` significa código lido, sem inferir desempenho ou execução; `SUPPORTED_ILLUSTRATION` significa exemplo construído com proveniência explícita, sem observação de uso; `CONDITIONAL` requer auditoria adicional; `OPEN` não autoriza a afirmação; `EXCLUDED` não entra no manuscrito como achado.

## Exclusões e decisões

- Sem novos usuários, participantes, métricas de uso, precisão metodológica, tempo economizado, ganho de qualidade ou efeito educacional.
- Sem benchmark reservado C148/C149 como requisito deste artigo. Seus artefatos podem informar limites técnicos, mas não entram como resultados de um estudo executado nesta versão.
- Sem “garantia” de coerência, “verificação formal” ampla ou “automação” integral da matriz quando a implementação é gerativa, editável e contém avisos consultivos.
- Sem tratar o PDF produzido pelo próprio Mapa em 29/10, as saídas do Research Starter ou o DOCX IA/ESG como prova do método ou do desempenho do sistema.
- Sem trocar a revista-alvo ou submeter o texto por inferência. A revisão intelectual e a permissão de citar os documentos privados pertencem a Mario e Sergio.

## Gate de viabilidade

**GO_CONDICIONADO:** há fontes originais identificadas, um sistema real e uma categoria editorial plausível para método/aplicação crítica. A condição é dupla: C160 deve mostrar uma distinção específica diante de Guerard, Aamer, CoQuest, ResearchAgent e outros comparadores; C161 deve verificar que o código realmente suporta as funções descritas e expor falhas como V13/V17. A falta de avaliação externa não bloqueia a redação descritiva decidida pelo usuário, mas é risco editorial material e proíbe alegações de eficácia.

**Converter em NO_GO_IPM** se a comparação revelar apenas uma recombinação genérica de funções já publicadas, se o sistema não sustentar a contribuição central, ou se os autores não puderem autorizar o uso intelectual necessário das fontes privadas. Nesse caso, devolver o argumento e alternativas a Mario antes de forçar a redação para a IP&M. Nenhuma probabilidade de aceite é inferida do escopo ou de precedente publicado.

Próxima Change: C159, descrição do método original. C160 e C161 reavaliam este gate com evidência adicional. A ordem de autoria foi definida na atualização de 30/10; autor correspondente, CRediT, formulações que atribuem propriedade intelectual e permissões de citação ainda são decisões dos coautores, não imputadas.
