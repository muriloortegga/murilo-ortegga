# Phase 1: Foundation Fixes & Hero Decision - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-05
**Phase:** 1-Foundation Fixes & Hero Decision
**Areas discussed:** Origem da foto do hero, URL do LinkedIn (CV filename declined for discussion)

---

## Gray Areas Offered

| Area | Description | Selected for discussion |
|------|-------------|--------------------------|
| Origem da foto do hero | Real photo to use, or design a fallback treatment from existing mood images | ✓ |
| URL do LinkedIn | Confirm `https://linkedin.com/in/muriloortega` is correct | ✓ |
| Nome do arquivo do CV | Keep exact current filename or rename to a URL-friendly slug | Declined — "vamos deixar em standby por enquanto" |

## LinkedIn URL

**User's answer (free text):** "URL do linkedin correta: www.linkedin.com/in/murilo-ortega"

**Finding:** Current code (`Footer.tsx`, `contato.tsx`, JSON-LD `sameAs` in `index.tsx`) has `https://linkedin.com/in/muriloortega` — wrong on two counts (missing hyphen, missing `www.`). Confirmed correct value: `https://www.linkedin.com/in/murilo-ortega`.

**Notes:** User caught this was actually incorrect in the live code, not just "unconfirmed" as the codebase mapping had flagged it.

---

## Hero Photo

**User's answer (free text):** "As fotos em grayscale com baixa opacidade, na verdade, são fotos minhas mesmo, já são fotos que queria usar no site."

This reframed the original assumption (no usable photo exists) — the photos exist and are real, high-quality studio/lifestyle shots of Murilo, currently misused as low-opacity grayscale background layers on `/sobre`.

Followed up with two AskUserQuestion rounds after visually inspecting all three photos:

| Option (photo choice) | Description | Selected |
|--------|-------------|----------|
| hero-bg.jpg | Close studio portrait, direct eye contact, neutral background | ✓ |
| footer-bg.jpg | Candid working-on-laptop shot, communicates "remote professional in action" | |
| middle-bg.jpg | Full-body seated, more editorial/distant | |

| Option (treatment) | Description | Selected |
|--------|-------------|----------|
| Cor real, sem grayscale | Full color for foreground hero presence, more energy/confidence | ✓ |
| Manter grayscale/dessaturado | Keeps visual consistency with current `/sobre` treatment | |

**User's choice:** `hero-bg.jpg`, full color, no grayscale.
**Notes:** User confirmed both selections directly ("hero-bg.jpg (Recomendado)" / "Cor real, sem grayscale (Recomendado)") without further discussion — recommendations aligned with what they wanted.

---

## Claude's Discretion

- **CV filename:** User deferred this decision entirely ("deixar em standby"). Default applied in CONTEXT.md: fix the home page's CV link to point to the existing file as-is (no rename), unless the user or planner decides renaming is worth the small extra risk. This is explicitly flagged as revisitable.
- **Hero photo export specifics** (exact crop, light retouch/color-grade): not discussed — left to planning to apply `.planning/research/STACK.md`'s LCP/picture-element guidance.

## Deferred Ideas

- CV filename/URL hygiene — see Claude's Discretion above. Not lost, just not decided in this discussion.

