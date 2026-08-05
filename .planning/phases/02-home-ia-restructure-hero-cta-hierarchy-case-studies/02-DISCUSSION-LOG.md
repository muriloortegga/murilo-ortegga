# Phase 2: Home IA Restructure — Hero, CTA Hierarchy, Case Studies - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-05
**Phase:** 2-Home IA Restructure — Hero, CTA Hierarchy, Case Studies
**Areas discussed:** 5º case em destaque (Headline do hero, Conteúdo dos 5 cases, e Foto sobre fundo dark mode foram oferecidos mas não selecionados para discussão)

---

## Gray Areas Offered

| Area | Description | Selected for discussion |
|------|-------------|--------------------------|
| 5º case em destaque | Milgrows ou Kapyi? | ✓ |
| Headline dupla do hero | Cópia exata da linha 1 (papel/valor) + linha 2 (resultado) | Não selecionada |
| Conteúdo real dos 5 cases | Dados/métricas de resultado por case | Não selecionada |
| Foto sobre fundo dark mode | Máscara/gradiente vs. card vs. recorte | Não selecionada |

## 5º Case em Destaque

Apresentei o que já existe em `src/routes/milgrows.tsx` (métrica pronta: +11.000 seguidores, tom educativo sobre cannabis medicinal) vs. `src/routes/kapyi.tsx` (2,5 anos de liderança criativa em agência, sem métrica quantificável, só qualitativo).

| Opção | Descrição | Selecionada |
|-------|-----------|-------------|
| Milgrows (recomendado) | Métrica concreta pronta (+11K seguidores) | |
| Kapyi | Experiência de liderança/direção criativa em agência, sem métrica pronta | ✓ |

**Escolha do usuário:** Kapyi.
**Notas:** Usuário escolheu Kapyi mesmo sem métrica pronta, provavelmente por representar experiência de nível mais sênior/liderança, mais relevante pro público de recrutador.

### Follow-up — resultado concreto para o Kapyi

Perguntei se havia uma métrica ou resultado específico e verificável para o Kapyi, já que CASE-02 exige resultado visível sem clicar.

| Opção | Descrição | Selecionada |
|-------|-----------|-------------|
| Vou te passar agora | Usuário forneceria o dado real | |
| Não tenho métrica — use qualitativo | Fallback qualitativo, sem inventar número | ✓ |

**Escolha do usuário:** Sem métrica — usar framing qualitativo baseado no que já existe na página do Kapyi (2,5 anos de liderança criativa, posicionamento premium para múltiplos nichos).

---

## Claude's Discretion

- Cópia exata da headline dupla do hero (HERO-01) — não discutida agora; vai ser rascunhada durante o planejamento/execução e apresentada de volta ao usuário antes de ir pro ar, não decidida silenciosamente.
- Tratamento visual da foto sobre o fundo dark mode (máscara/gradiente vs. card vs. recorte) — não discutida agora; três opções já documentadas em `01-HERO-PHOTO.md` §7, sem uma pré-julgada.
- Conteúdo/copy final dos outros 4 cases (NaTrave, Symplice, Maxi, Solid+) — não discutido linha a linha; default é condensar apenas o que já existe publicado nas páginas de cada projeto, nunca inventar métrica ou resultado.

## Deferred Ideas

Nenhuma — a discussão ficou dentro do escopo da fase (só a decisão do 5º case foi resolvida nesta rodada).

