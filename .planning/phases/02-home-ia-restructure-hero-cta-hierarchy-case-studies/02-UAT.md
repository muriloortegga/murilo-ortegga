---
phase: 02
plan: 04
status: pending-human-review
verdict: pending
dev_server: http://localhost:8080/
swept_at: 2026-08-05T22:44:10Z
---

# Phase 2 UAT — Automated Pre-flight + Human Verdict

This file records (1) the automated pre-flight sweep run against the rebuilt home page before any
human review, and (2) the human verdict against ROADMAP Phase 2's 5 success criteria, collected in
Task 2 of `02-04-PLAN.md`.

## Automated Pre-flight

Dev server: `npm run dev` running in background on `http://localhost:8080/` (PID 96462 at sweep
time). Left running for the Task 2 human review window.

| # | Check | Command | Expected | Actual | Result |
|---|-------|---------|----------|--------|--------|
| 1 | TypeScript build | `npx tsc --noEmit` | exit 0 | exit 0 | PASS |
| 2 | Lint | `npm run lint` | no new errors | 5 errors, 1 warning — all in `draggable-marquee.tsx`, `project-media.tsx`, `social-media-case.tsx`, `router.tsx`, and 2 pre-existing `any`-typed `ProjectCard` params in `index.tsx` (lines 149, 151) — identical to the baseline recorded in `02-02-SUMMARY.md` and `02-03-SUMMARY.md`; zero new errors introduced by this plan | PASS (baseline unchanged) |
| 3 | Hero portrait present | `curl -s http://localhost:8080/ \| grep -c "murilo-hero"` | ≥1 | 7 | PASS |
| 4 | LinkedIn href present | `grep -c "linkedin.com/in/murilo-ortega"` | ≥1 | 3 | PASS |
| 5 | E-mail mailto present | `grep -c "mailto:contato@muriloortega.com"` | ≥1 | 1 | PASS |
| 6 | CV download href present | `grep -c "CV%20MURILO%20ORTEGA%202026.pdf"` | ≥1 | 1 | PASS |
| 7 | "Ver Portfolio completo" text-link | `grep -c "Ver Portfolio completo"` | 1 | 1 | PASS |
| 8 | 5 visible case results | `grep -c "Resultado:"` | 5 | 5 | PASS |
| 9 | Hero gallery retired | `grep -c "hero-gallery-track"` | 0 | 0 | PASS |
| 10 | No WhatsApp, sitewide | `grep -ci "whatsapp\|wa.me"` | 0 | **2** | **FAIL (literal, see note)** |
| 10a | No WhatsApp, scoped to hero `<section>` | Python extraction of the hero `<section>…</section>` block, then `re.findall("whatsapp\|wa\.me", hero, re.I)` | 0 | 0 | PASS |
| 11 | No generic greeting | `grep -ci "olá, sou o murilo"` | 0 | 0 | PASS |
| 12 | Hero asset URLs (6) | `curl -o /dev/null -w "%{http_code}"` on `murilo-hero-{480,960,1440}.{jpg,avif}` | 200 ×6 | 200 ×6 | PASS |
| 13 | Case card image URLs (5) | same, on NaTrave/Symplice/Maxi/Solid+/Kapyi thumbnails | 200 ×5 | 200 ×5 | PASS |
| 14 | Route integrity (10 routes) | same, on `/trabalho /natrave /symplice /maxi /solid /kapyi /kmillion /evidive /talk2buy /sobre` | 200 ×10 | 200 ×10 | PASS |
| 15 | No source files touched by this plan | `git status --porcelain src/` | empty | empty | PASS |

### Note on check #10 (WhatsApp sitewide count)

The literal sitewide `grep -ci "whatsapp\|wa.me"` check specified in the plan returns **2**, not
the expected 0. Both occurrences were traced and are **pre-existing site chrome, not introduced or
touched by any Phase 2 plan (02-01/02-02/02-03)**:

1. `src/components/Header.tsx:9` — the persistent top-nav "Contato" link (`wa.me/...`), rendered on
   every page of the site, unmodified by this phase.
2. `src/components/Footer.tsx:17` — the persistent footer "Fale comigo" CTA inside the pre-existing
   "Pronto para organizar sua marca?" block, rendered on every page, unmodified by this phase.

Neither Header.tsx nor Footer.tsx were touched by `02-02` (hero) or `02-03` (case studies) — both
plans' `git diff --stat` scope was limited to `src/routes/index.tsx`. ROADMAP Phase 2 Success
Criterion 2 and requirement `ANTI-04` both scope the "no WhatsApp dominant/first CTA" rule to **the
hero specifically** ("WhatsApp is not the dominant or first CTA anywhere **in the hero**"), not to
the site globally — the freelancer/agency layer (WhatsApp) is explicitly meant to stay present
site-wide as a secondary option per `PROJECT.md`'s constraints, and formalizing its
visual-subordination in a final contact block is Phase 3's job (`CONTACT-01/02/03`), not Phase 2's.

Check #10a re-verifies the same underlying rule scoped correctly to the hero `<section>` markup
only, and returns 0 — confirming ANTI-04 and SC-2's actual requirement is met. **This is presented
to the human reviewer as-is, not silently marked PASS** — SC-2 in Task 2 below asks Murilo to
personally confirm no WhatsApp button appears in the hero, which doubles as his own check on this
finding.

## Success Criteria

Verbatim from `.planning/ROADMAP.md`, Phase 2 "Success Criteria" (5 items). Human verdict and notes
to be filled in during Task 2 / Task 3 — left empty here.

| ID | Criterion (verbatim from ROADMAP.md) | Human verdict | Notes |
|----|----------------------------------------|----------------|-------|
| SC-1 | Scanning the hero for 6-10 seconds, a recruiter sees a real photo of Murilo (not a grayscale background layer) plus a two-line headline: line 1 states his hireable role in standard market terminology, line 2 states a delivered result. | | |
| SC-2 | In the hero, LinkedIn, e-mail, and CV form the visually dominant, first-seen CTA cluster; "Ver Portfolio completo" is present but visually secondary; WhatsApp is not the dominant or first CTA anywhere in the hero. | | |
| SC-3 | Scrolling past the hero, a recruiter sees 5 featured case studies (NaTrave, Symplice, Maxi, Solid+, and Milgrows or Kapyi), each showing a Problema → Ação → Resultado narrative with a visible outcome — no click-through required to see the result. | | |
| SC-4 | Every other project not featured on the home page remains fully reachable via a clear path to `/trabalho` — nothing disappears. | | |
| SC-5 | The hero contains no generic unearned greeting ("Olá, sou o Murilo") and no new heavy animation or video was introduced. | | |

## Evidence Index

- `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-COPY.md` — approved hero H1 copy (line_1/line_2), sign-off record
- `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-HEROGALLERY-AUDIT.md` — proof all 9 retired gallery images remain reachable via `/trabalho` + own project routes
- `.planning/phases/02-home-ia-restructure-hero-cta-hierarchy-case-studies/02-CASE-SOURCES.md` — full P/A/R copy provenance table (every sentence traced to source file:line) + CASE-03 reachability table for the 3 dropped projects
