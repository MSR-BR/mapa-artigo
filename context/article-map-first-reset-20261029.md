# Novo roteiro do artigo — construção pelo próprio Mapa

> Histórico, substituído em 29/10/2026 por [programa direto de artigo método+sistema](article-method-system-program-20261029.md). Não continuar o fluxo de screenshots ou usar este roteiro como plano vigente.

29/10/2026. Decisão de trabalho: artigo em inglês que **descreve a metodologia Mapa da Pesquisa e o aplicativo/agente que a operacionaliza**. Mario Reis e Sergio França permanecem os dois autores. Esta versão não estuda usuários, não estima benefício educacional e não usa avaliações de participantes. Fluxogramas, telas e um exemplo hipotético identificado como ilustração podem explicar o funcionamento; qualquer resultado técnico citado deve ter evidência delimitada.

## Revista e categoria

**Alvo definido pelo usuário em 29/10/2026: Information Processing & Management (IP&M).** A [descrição da editora](https://shop.elsevier.com/journals/information-processing-and-management/0306-4573) inclui manuscritos de métodos e aplicações críticas de design de sistemas na interseção entre computação e ciência da informação. O artigo será moldado como contribuição de método e sistema de informação para construção e revisão rastreável de projetos de pesquisa. O guia específico da IP&M permanece inacessível nesta sessão (403); tipo exato, limites e formatação de submissão ainda não foram confirmados. Sem dados de usuários, o texto precisa fundamentar a originalidade do método e mostrar uma aplicação técnica/ilustrativa de maneira verificável, sem alegar eficácia empírica.

**Reserva:** *Technical Journal / Tehnički glasnik*, previamente analisada como alternativa sem APC. A [página oficial](https://hrcak.srce.hr/en/tehnickiglasnik) confirma o custo. O recorte atual e a redação seguirão a IP&M; não aplicar o template nem os limites da revista reserva.

O **arquivo mestre seguirá em LaTeX**, conforme decisão do usuário. Nenhum limite de páginas, palavras ou classe LaTeX da IP&M é presumido enquanto o Guide for Authors não estiver acessível. Elegibilidade individual no acordo CAPES–Elsevier ou rota sem APC requer conferência antes de eventual submissão; nenhum pagamento é autorizado por este plano.

## Contribuição e limites

Contribuição proposta: (1) explicitar a cadeia do método original de Sergio França, com sua matriz objetivo–método; (2) mostrar como o aplicativo representa etapas, ligações e revisões; (3) delimitar o papel do agente de IA, as decisões humanas e as verificações; (4) oferecer um fluxograma e uma demonstração ilustrativa de preenchimento/revisão. O texto separará o método original, a formalização posterior M1–M7, o comportamento efetivamente implementado e funções ainda propostas.

Não declarar eficácia, ganho de qualidade, redução de tempo, adoção, satisfação ou validade externa. Não chamar telas ilustrativas de estudo de caso com usuários. Os antigos testes sintéticos e fichas de avaliação ficam preservados como material técnico de um desenho anterior, mas **não são pré-requisito do novo artigo descritivo** e não serão apresentados como evidência humana.

## Roteiro do manuscrito

1. Introdução: problema de coerência e rastreabilidade no planejamento de pesquisa; objetivo e contribuição delimitada.
2. Trabalhos relacionados: métodos de construção de projetos e sistemas de apoio com IA; diferença específica do Mapa.
3. Metodologia Mapa da Pesquisa: origem, cinco etapas, matriz objetivo–método, regras de coerência, ciclos de revisão e validação humana.
4. Aplicativo e agente: arquitetura, jornada de preenchimento, geração de propostas, edição, persistência, referências, revisão, exportação e fronteiras da IA.
5. Demonstração ilustrativa: um projeto hipotético, da problemática ao PDF, mostrando uma edição e seus efeitos, sem dados de usuário.
6. Discussão: o que a formalização e a implementação permitem inspecionar; diferenças entre desenho e código; limitações e avaliação futura.
7. Conclusão e declarações: contribuição documental/sistêmica, sem conclusão sobre resultados de uso.

Figuras previstas: fluxograma do método; mapa de correspondência método→interface/agente; jornada do usuário com pontos de decisão; arquitetura simplificada e cadeia de revisão; até algumas telas autorizadas, legíveis em duas colunas. Tabelas: etapas e saídas; regras de coerência; comparação cuidadosa com trabalhos próximos. A seleção final cabe no limite editorial de páginas.

## Construção do roteiro dentro do aplicativo

1. Mario abre um novo projeto no Mapa com o produto **artigo de periódico** e envia o screenshot da tela atual, incluindo rótulos e campos visíveis. Não precisa enviar credenciais ou dados pessoais.
2. Para cada tela, o assistente devolve propostas de preenchimento **campo por campo**, com texto pronto para copiar, fonte/justificativa breve e indicação do que Mario ou Sergio precisam decidir. Mario insere, edita e valida no próprio aplicativo.
3. Mario envia o screenshot seguinte. A sequência esperada segue Problemática → Objetivos → Capítulos/tópicos → Metodologia → Mapa final; nomes e campos reais serão confirmados pelos screenshots, sem presumir que a interface permaneceu igual.
4. Ao final, Mario exporta o PDF do Mapa e o coloca nesta conversa. O PDF passa a ser a especificação aprovada do roteiro; o assistente o confronta com as fontes originais, código e literatura já levantada, aponta lacunas e prepara o manuscrito LaTeX.
5. Mario e Sergio revisam as passagens de autoria, fidelidade ao método, contribuição e limites. Nenhuma submissão externa faz parte deste fluxo.

### Texto inicial candidato para o Mapa, sujeito aos campos reais

**Pergunta central:** Como a metodologia Mapa da Pesquisa pode ser explicitada e operacionalizada em um aplicativo com agente de IA para apoiar a construção e a revisão rastreável de projetos de pesquisa sob decisão humana?

**Objetivo geral:** Descrever a metodologia Mapa da Pesquisa e sua operacionalização em um aplicativo com agente de IA, explicitando etapas, relações entre componentes, mecanismos de revisão e pontos de decisão humana.

**Objetivos específicos candidatos:** (1) sistematizar as etapas e a matriz objetivo–método da metodologia original; (2) mapear a correspondência entre conceitos metodológicos e componentes do aplicativo; (3) descrever o papel do agente de IA e os controles de edição, validação e revisão; (4) ilustrar o percurso de elaboração e exportação de um projeto hipotético e discutir limites da implementação.

**Natureza do artigo:** descrição analítica de método e sistema, baseada em documentos de origem, inspeção do aplicativo/código e demonstração hipotética. A categorização metodológica exata será proposta de acordo com os campos que o Mapa apresentar; não se atribui Design Science Research ou avaliação empírica que não tenha sido executada.

O [manuscrito LaTeX de 24/10](manuscript/latex/main.tex) permanece como material de reaproveitamento, não como roteiro aprovado desta versão. Suas seções de benchmark, resultados e afirmações condicionadas serão removidas ou reescritas após o PDF do novo Mapa.

## Primeiro screenshot — entrada do Mapa Rápido, 29/10/2026

A tela mostra o Mapa Rápido expandido, com um campo livre que pede palavras-chave (mínimo duas) ou tema; o Mapa Avançado de cinco perguntas está recolhido. Para manter a direção editorial sem transformar o prompt em resultado, a proposta de preenchimento é:

> Quero elaborar um artigo de periódico para a revista Information Processing & Management sobre a metodologia Mapa da Pesquisa, concebida por Sergio França, e sua operacionalização em um aplicativo com agente de inteligência artificial. O artigo deve descrever a construção encadeada da situação-problema, dos objetivos, dos tópicos de fundamentação e desenvolvimento e da matriz objetivo–método; mostrar como o sistema representa essas relações, gera propostas, permite revisão humana, preserva versões e exporta o mapa. A contribuição pretendida é explicitar um método e sua implementação como sistema de apoio à concepção e revisão rastreável de projetos de pesquisa. Usar fluxogramas, arquitetura e um exemplo hipotético apenas como ilustração. Não incluir estudo com usuários nem afirmar ganhos de qualidade, eficácia ou redução de tempo sem evidência. Distinguir o método original, formalizações posteriores e recursos efetivamente implementados.

Depois de Mario inserir o texto e clicar em **Gerar mapa**, o próximo screenshot deve mostrar a primeira proposta ou card gerado. Se o aplicativo solicitar o tipo de produto em uma etapa posterior, escolher **artigo de periódico**. O assistente revisará as sugestões do aplicativo antes de propor a redação dos campos seguintes. Este texto é uma instrução inicial para o produto, não uma descrição de resultados comprovados.

## Primeiro PDF exportado — diagnóstico

Mario enviou o PDF do Mapa, revisão 13, em 29/10/2026. A [auditoria do conteúdo](map-pdf-diagnostic-20261029.md) concluiu que ele é útil para localizar os campos a corrigir, mas não é o roteiro aprovado: adiciona avaliação de desempenho e verificação formal, cita literatura lateral e contém bloqueios de justificativa. O trabalho continuará **no mapa existente**, revisando primeiro problema e objetivos, depois literatura, matriz e demonstração, antes de nova exportação. O fluxo editorial permanece metodologia de Sergio → implementação → percurso ilustrativo → limites.
