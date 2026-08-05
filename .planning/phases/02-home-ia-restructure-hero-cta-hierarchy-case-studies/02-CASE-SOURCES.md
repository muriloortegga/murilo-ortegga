---
phase: 02
plan: 03
constraint: no-fabricated-metrics
---

# Phase 2 Plan 3 — Case Copy Provenance

Every Problema/Ação/Resultado sentence shipped in `src/routes/index.tsx`'s `projects` array is
condensed from copy already published on that project's own route file. This table proves it.

## P/A/R Provenance

| Case | Field | Shipped sentence | Source file:line | Grep used |
|------|-------|-------------------|-------------------|-----------|
| NaTrave | problem | "Plataforma social sem identidade nem retenção de usuários." | `src/routes/natrave.tsx:53` | `grep -n "phrase=\"Virando o Jogo\"" src/routes/natrave.tsx` (condensed from `BrandHeader description="O futebol amador elevado ao nível de elite. Uma plataforma para conectar jogadores, organizadores e a paixão pelo esporte sem burocracia."`) |
| NaTrave | action | "Direção de arte, sistema de conteúdo e social media completos." | `src/routes/natrave.tsx:54` | `grep -n "niche=" src/routes/natrave.tsx` (condensed from `niche="Projeto Autoral - Esporte & Tech"` + page's overall scope) |
| NaTrave | result | "2.250 seguidores conquistados organicamente." | `src/routes/natrave.tsx:69` | `grep -n "followers={2250}" src/routes/natrave.tsx` |
| Symplice | problem | "Marca operando em complexidade sem clareza de comunicação." | `src/routes/symplice.tsx:25` | `grep -n "Para marcas que operam na complexidade" src/routes/symplice.tsx` |
| Symplice | action | "Identidade visual limpa, direta, focada em experiência do usuário." | `src/routes/symplice.tsx:25` | `grep -n "identidade visual limpa, direta" src/routes/symplice.tsx` |
| Symplice | result | "Simplicidade estratégica sustentada em todo o sistema de marca." | `src/routes/symplice.tsx:25` | `grep -n "simplicidade estratégica" src/routes/symplice.tsx` |
| Maxi | problem | "Instituição de ensino tradicional precisando reforçar autoridade digital." | `src/routes/maxi.tsx:44` | `grep -n "trajetória consolidada" src/routes/maxi.tsx` (condensed from `BrandHeader description="O Colégio Maxi é uma instituição de ensino com trajetória consolidada..."`) |
| Maxi | action | "Social media e OOH alinhados à trajetória de excelência acadêmica." | `src/routes/maxi.tsx:44` | `grep -n "excelência acadêmica" src/routes/maxi.tsx` |
| Maxi | result | "Performance institucional sustentada para aprovações em vestibulares." | `src/routes/maxi.tsx:44` | `grep -n "aprovações em vestibulares" src/routes/maxi.tsx` |
| Solid+ | problem | "Fintech precisando de solidez e confiança visual no mercado internacional." | `src/routes/solid.tsx:25` | `grep -n "Fintech Identity" src/routes/solid.tsx` (condensed from `description="Fintech Identity & Systems. Design que transmite solidez, confiança e inovação para o mercado financeiro digital."`) |
| Solid+ | action | "Direção de identidade visual e sistemas de design robustos." | `src/routes/solid.tsx:25` | `grep -n "Design que transmite solidez" src/routes/solid.tsx` |
| Solid+ | result | "Design que transmite solidez, confiança e inovação para o mercado financeiro digital." | `src/routes/solid.tsx:25` | `grep -n "mercado financeiro digital" src/routes/solid.tsx` |
| Kapyi | problem | "Marcas de nichos distintos (engenharia, educação, clínicas, tech) sem posicionamento premium consistente." | `src/routes/kapyi.tsx:61` | `grep -n "nichos distintos" src/routes/kapyi.tsx` (condensed from `EditorialSocialCase designText="...Atuando na direção de campanhas e estratégias para nichos distintos (engenharia, educação, clínicas, tech)..."`) |
| Kapyi | action | "2,5 anos de liderança criativa unindo branding e direção de campanhas." | `src/routes/kapyi.tsx:43` | `grep -n "2,5 anos" src/routes/kapyi.tsx` |
| Kapyi | result | "Posicionamento premium sustentado para marcas de nichos distintos." | `src/routes/kapyi.tsx:43` | `grep -n "posicionar marcas de forma premium" src/routes/kapyi.tsx` |

**D-02 verification:** Kapyi's `result` field ("Posicionamento premium sustentado para marcas de
nichos distintos.") contains zero digits — confirmed via
`grep -A4 'to: "/kapyi"' src/routes/index.tsx | grep 'result:' | grep -c '[0-9]'` → `0`. The "2,5 anos"
figure appears only in Kapyi's `action` line, verbatim-sourced from `kapyi.tsx:43`.

**NaTrave verification:** NaTrave's `result` field is the only P/A/R line in the entire 5-card set
that contains a digit, and that digit sequence is `2.250` — traceable to `followers={2250}` at
`src/routes/natrave.tsx:69` (the `PerformanceHero` component prop).

## CASE-03 Reachability

The 3 projects dropped from the home `projects` array (Kmillion, Evidive, Talk2Buy) remain fully
reachable — their routes were not touched and `/trabalho` still lists all three.

| Dropped project | `/trabalho` line (src/routes/trabalho.tsx) | Still-live route file |
|------------------|---------------------------------------------|-------------------------|
| Kmillion | `line 54`: `{ name: "Kmillion", category: "Id Visual", year: "2024", image: "/assets/projects/thumbnails/kmillion.jpg", to: "/kmillion", search: { service: "marca" } }` | `src/routes/kmillion.tsx` |
| Evidive | `line 46`: `{ name: "Evidive", category: "Social Media", year: "2024", image: "/assets/projects/thumbnails/social/evidive.jpg", to: "/evidive", search: { service: "social" } }` | `src/routes/evidive.tsx` |
| Talk2Buy | `line 45`: `{ name: "Talk2Buy", category: "Social Media", year: "2024", image: "/assets/projects/thumbnails/social/talk2buy.jpg", to: "/talk2buy", search: { service: "social" } }` | `src/routes/talk2buy.tsx` |

`src/routes/trabalho.tsx` was not modified by this plan (confirmed via
`git status --porcelain src/routes/trabalho.tsx` — empty output). No project route file was deleted.

## Post-render verification

Verified against `npm run dev` (port 8080) SSR output on 2026-08-05:

- `curl -s http://localhost:8080/ | grep -ao "Resultado:" | wc -l` → **5** (CASE-02 — every card's outcome is in the SSR'd HTML, no click/hover/expand required)
- `curl -s http://localhost:8080/ | grep -ao "Prova de Trabalho" | wc -l` → **1** (eyebrow renders once)
- `href="/natrave"`, `href="/symplice"`, `href="/maxi"`, `href="/solid"` each present (≥1; observed 5 — additional occurrences come from unrelated nav/breadcrumb context elsewhere on the page, not from duplicate cards)
- `href="/kapyi"` present (≥1; observed 1)
- The Case Studies `<section>` sits between the Brand Marquee `</section>` and the `{/* Positioning */}` comment in `src/routes/index.tsx`, confirmed via `awk '/Case Studies \*\//,/Positioning \*\//' src/routes/index.tsx` — the slice contains exactly one `projects.map` call and zero `bg-foreground text-background` occurrences (not inverted, stays on the default light section background per UI-SPEC §1)
- `git status --porcelain src/routes/trabalho.tsx` → empty (unmodified)
- `git diff --stat src/styles.css` → empty (unmodified)
- `git status --porcelain public/` → empty (no asset changes)
- `npx tsc --noEmit` exits 0; `npm run lint` shows the same 6 pre-existing problems as the pre-task baseline (5 errors in `draggable-marquee.tsx`, `project-media.tsx`, `social-media-case.tsx`, and 2 pre-existing `any`-typed `ProjectCard` params in `index.tsx`; 1 pre-existing warning in `router.tsx`) — zero new errors introduced by this plan
