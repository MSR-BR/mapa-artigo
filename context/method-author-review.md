# Author review packet — method provenance and differences

Prepared in C145 on 24/10/2026. This is a concrete text for Mario Reis and Sergio França to inspect when they review the manuscript. It records pending intellectual decisions; no answer or approval is attributed to either author.

## Proposed manuscript wording

> The Mapa da Pesquisa method originated in Sergio França's research-project map and his subsequent methodological specification. The original map defines five linked construction stages—research problem, general objective, specific objectives, literature topics and development topics—alongside an objective-to-method matrix for data collection, analysis and expected results. The detailed specification adds explicit dependencies, traceability, coherence rules and human validation. For analysis in this paper, we describe these components as M1–M7, where M6 names the original methodological matrix and M7 groups cross-cutting integration and revision operations. The M1–M7 labels, versioned state model and software-level invalidation contract are later formalizations; they are not verbatim stage labels from the original documents.

The signed 21 July functional letter predates the detailed specification but expressly excludes the method's internal logic. It should not be cited as the primary method description, nor should its private partnership terms enter the paper.

## Differences requiring explicit author decision

| Issue | Evidence | Candidate treatment | Status |
|---|---|---|---|
| Intellectual attribution and CRediT roles | The primary map identifies Sergio; the detailed specification metadata identifies Sergio; the signed letter states that Sergio conceived the method. Code history alone does not settle each person's scholarly contribution. | Attribute original methodology to Sergio; let Mario and Sergio approve exact contributions, author order and declarations. | Author review pending. |
| Research questions beyond the main problem | Detail v0.1, Module 7 includes validation of research questions. Current v2 schema/state machine has no separate element/state for them. | Describe as a proposed methodological step not implemented as a separate agent stage; avoid calling the central problem question equivalent to all secondary questions. | Author review pending. |
| Number of objectives/topics | 03/08 map permits 3–6; generator produces four by default, validators accept 3–6. | State source range and narrower generator default separately. | Author review pending. |
| Methodological matrix | Original table has collection, analysis and expected impact by specific objective; system also adds a general-objective synthesis row. | Call the synthesis row a later implementation extension. | Author review pending. |
| Traceability and coherence | Detail v0.1 calls for explicit origin/destination and coherent method; code records links and marks dependent *types* stale; academic checks may be advisory. | Claim inspectable structure and bounded technical behavior, not automated semantic validity. | Author review pending. |
| IA/ESG dissertation draft | No verified link to a Mapa run or benchmark fixture. | Exclude from evidence and demonstrative cases unless provenance is established separately. | Author review pending. |

This packet does not require a software change. The manuscript may use the bounded factual description above while marking author-controlled wording pending; the final intellectual and authorship declarations belong to Mario and Sergio.
