---
status: pending-approval
phase: 02
requirement: HERO-01
---

# Hero Headline Copy — Decision Record

Source: `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-UI-SPEC.md`,
"Copywriting Contract" table, rows "Hero role line (H1 line 1)" and "Hero result line (H1 line 2)".
Both rows are marked **UNCONFIRMED** in the UI-SPEC — this file exists to carry them through the
blocking human copy-approval checkpoint (`02-01-PLAN.md` Task 2) before plan `02-02` writes any
string into `src/routes/index.tsx`'s hero H1.

Three draft pairs are transcribed verbatim below — no paraphrasing, no re-drafting, no fourth option
invented at this stage (a placeholder for the user's own wording, Option D, is included separately).

---

## Draft A (UI-SPEC recommended)

- **line 1:** "Diretor de Arte & Designer de Marca"
- **line 2:** "8 anos transformando marcas comuns em marcas com resultado real."

**ANTI-02 compliance:** Line 1 is a market-standard, hireable role title ("Diretor de Arte", "Designer
de Marca") and contains no greeting form ("Olá", "Oi", "sou o Murilo", "Hi, I'm").

---

## Draft B

- **line 1:** "Branding, Social Media & Direção de Arte"
- **line 2:** "Identidade e conteúdo que já geraram +2.250 seguidores e posicionamento premium para marcas como NaTrave e Kapyi."

**ANTI-02 compliance:** Line 1 lists market-standard, hireable disciplines ("Branding", "Social Media",
"Direção de Arte") and contains no greeting form ("Olá", "Oi", "sou o Murilo", "Hi, I'm").

---

## Draft C

- **line 1:** "Designer de Marca & Social Media"
- **line 2:** "De NaTrave a Solid+: 8 anos entregando marca, conteúdo e presença digital com resultado."

**ANTI-02 compliance:** Line 1 is a market-standard, hireable role title ("Designer de Marca", "Social
Media") and contains no greeting form ("Olá", "Oi", "sou o Murilo", "Hi, I'm").

---

## Option D — user's own wording

Placeholder for the case where the user supplies their own line 1 / line 2 at the checkpoint instead
of selecting Draft A, B, or C. To be filled in only if selected.

- **line 1:** _(pending — user-supplied)_
- **line 2:** _(pending — user-supplied)_

**ANTI-02 compliance:** To be checked against the same rule as Drafts A–C before recording as approved
— no greeting form ("Olá", "Oi", "sou o Murilo", "Hi, I'm") permitted in either line.

---

## Status

`status: pending-approval` — awaiting the user's selection at the `02-01-PLAN.md` Task 2 blocking
checkpoint. Once approved, this file will be updated in place (Task 3) with `status: approved`,
`approved_by`, `approved_on`, `selected`, and an `## Approved Copy` section containing the final
`line_1:` / `line_2:` strings that plan `02-02` reads verbatim.
