# Stack Research

**Domain:** Personal portfolio homepage restructured for recruiter conversion (brownfield — existing React 19 + TanStack Start SSR + Tailwind CSS 4 + Framer Motion + Vite 7 site, deployed to Cloudflare Workers)
**Researched:** 2026-08-04
**Confidence:** MEDIUM-HIGH (patterns verified against Google's official structured-data docs and multiple independent sources; some case-study schema conventions are community consensus, not a formal spec)

## Framing

This is **not** a "what to install" document. The stack is fixed (React 19, TanStack Start, Tailwind CSS 4, Framer Motion, Vite 7, Cloudflare Workers) and the milestone explicitly forbids swapping it. Every recommendation below is about **how to use existing capabilities** already present in this codebase — `src/lib/seo.ts`'s `routeSeo()` helper, the `head()` JSON-LD pattern already used in `src/routes/index.tsx` and `__root.tsx`, native `<picture>`/`<img>` attributes, and Framer Motion's built-in accessibility hooks — to serve the new primary audience (recruiters) without adding dependencies.

## Recommended Patterns

### 1. Structured Data (Schema.org / JSON-LD)

| Pattern | Purpose | Why Recommended |
|---------|---------|------------------|
| `ProfilePage` + `Person` (`mainEntity`) on the home route only | Tells Google (and increasingly, AI answer engines / recruiter-facing search tools) that this page's primary focus is one identifiable professional | Google explicitly documents `ProfilePage` for pages whose primary focus is a single person; recommended fields: `mainEntity.name`, `.image`, `.description` (headline/bio), `.sameAs` (LinkedIn URL + any other professional profiles), `.jobTitle`, `.worksFor`. Required: `mainEntity` must resolve to a `Person`/`Organization` with at least `name`. [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/profile-page) — HIGH confidence |
| Keep the existing `Person` schema in `__root.tsx`/`index.tsx`, extend it rather than duplicate | The codebase already emits a `Person` JSON-LD block (per ARCHITECTURE.md: `src/routes/index.tsx:19-35`, `src/routes/__root.tsx:65-76`) | Avoid two competing `Person` entities on the same page — extend the existing object with `sameAs` (LinkedIn, and any other verified professional profile), `image` (the new hero photo once available), and `description` matching the new recruiter-facing headline. Two independent `Person`/`ProfilePage` blocks with mismatched data is a common structured-data mistake that can suppress rich results entirely. MEDIUM confidence (Google doesn't explicitly ban duplicates, but conflicting entity data is a documented anti-pattern in their guidelines) |
| `CreativeWork` (not `SoftwareApplication`) for the 5 featured case studies on the home | Marks each case-study card as a distinct creative/portfolio work with `creator` (referencing the `Person`), `image`, `about`/`keywords`, `datePublished` if known | Schema.org has no dedicated "case study" or "design portfolio piece" type. Community convention for design/branding portfolios is `CreativeWork` (broad, safe, valid) — **not** `SoftwareApplication`, which some low-quality SEO blogs suggest but which is semantically wrong for branding/social-media/graphic-design work and risks a manual structured-data mismatch flag. MEDIUM confidence — this is community convention, not an official Google-documented type for this exact use case |
| `BreadcrumbList` — do NOT add to the home page | Breadcrumbs are for wayfinding on non-root pages | The home page is the root; adding a breadcrumb schema there is meaningless and adds no value. `ContextNav`'s existing breadcrumb UI (already scoped to sub-pages via `nav-context.ts`) is the right place for this, and it's out of scope for this phase anyway |
| Validate via Google's Rich Results Test before merging | Catch malformed JSON-LD before it ships | Free, no new dependency — just a manual step in the PR checklist. HIGH confidence (standard practice, zero cost) |

**Implementation note:** extend `routeSeo()` in `src/lib/seo.ts` to optionally accept a `personSchema` / `profilePage` builder param used only by `index.tsx`, rather than hand-writing a second `head().scripts` block — keeps the existing "one helper builds all SEO" convention (documented in ARCHITECTURE.md as the `routeSeo()` pattern) intact instead of forking it.

### 2. Hero Photo & Image Delivery

| Pattern | Purpose | Why Recommended |
|---------|---------|------------------|
| Native `<picture>` with AVIF → WebP → JPEG fallback, explicit `width`/`height` (or `aspect-ratio` CSS), `fetchpriority="high"` + `loading="eager"` on the hero image only | Prevent Cumulative Layout Shift (CLS) and keep the hero photo as the page's Largest Contentful Paint (LCP) element loading fast | The codebase currently has **no** professional photo of Murilo — only 3 grayscale/low-opacity mood images (per PROJECT.md Context). A hero photo is the single highest-impact new asset for recruiter trust (a "clean, well-lit, approachable" photo measurably increases engagement per UX portfolio research). Since it becomes the LCP element, it must be optimized manually before commit — no new build-time dependency needed. MEDIUM-HIGH confidence (CWV/LCP guidance is well-established web-perf practice; the specific "hero photo increases recruiter trust" claim is MEDIUM, sourced from UX-portfolio blogs, not a controlled study) |
| Pre-export 2-3 responsive widths (e.g. ~480w/960w/1440w) of the hero photo as AVIF+WebP+JPEG using an external tool (Squoosh, `sharp` CLI, or an image editor's export) — commit static files to `src/assets/` or `public/`, no runtime transformation | Keeps zero new npm dependencies while still shipping modern formats | Matches the existing project convention (all current images are static files imported via `import.meta.glob`, per ARCHITECTURE.md) — no data-fetching or transform layer exists and none should be introduced for one new image. HIGH confidence — this is the lowest-risk option that respects the "don't touch the stack" constraint |
| Optional/future: Cloudflare Image Transformations (`format=auto`, `width=`) via the existing Workers deployment | On-the-fly resizing/format negotiation at the edge, no client bundle cost | The site is **already** on Cloudflare Workers (`wrangler.jsonc`), so this is a platform feature, not a new dependency — but it typically requires the Cloudflare Images product/zone-level feature to be enabled on the account/plan, which is unverified for this project. Flag as a future optimization, not a requirement for this phase. LOW-MEDIUM confidence — plan/billing tier unverified; do not assume it's available |
| Do NOT introduce `vite-imagetools`, `unpic-img`, `next/image`-style solutions, or any new image-processing library for this phase | Scope discipline | The milestone's Active scope is "hero of visual presence (photo)" — a single new image. A build-time image pipeline is justified once there are many recruiter-facing images to manage (e.g., a future blog or many new case studies), not for one hero photo. Adding one now is premature infrastructure for a single-page scope |

### 3. CV / Resume Delivery

| Pattern | Purpose | Why Recommended |
|---------|---------|------------------|
| Direct link to the real PDF path (`/cv/CV MURILO ORTEGA 2026.pdf` or a renamed clean-URL copy), opened in a new tab (`target="_blank" rel="noopener"`), with a visually separate, explicit "Download" affordance | Recruiters skim; give them a low-friction "view without leaving the page" option, and a distinct "download to disk" option for later reference | Standard 2025/2026 pattern across portfolio/resume sites: PDFs preserve layout across devices/print and can be forwarded/attached by the recruiter to an ATS or email thread — this is why PDF (not an HTML resume page) remains the default deliverable. MEDIUM confidence (cross-referenced across multiple resume/portfolio guides, no single authoritative spec) |
| Ensure the PDF itself is a **tagged/accessible PDF** (exported from the source design tool with proper reading order and alt text on any graphics), not a flattened image-only PDF | Screen readers cannot parse an untagged/image PDF; an inaccessible CV is a hard blocker for some recruiters/ATS pipelines | This is a content/asset-production concern, not code, but belongs in the acceptance criteria for "fix the CV link" since a broken link and an inaccessible file are both "the CV doesn't work" from a recruiter's perspective. MEDIUM confidence, standard accessibility guidance |
| Fix the existing broken path as a like-for-like correction — do not restructure how the CV is stored/served | Scope discipline | ARCHITECTURE.md and PROJECT.md already pinpoint the exact bug (link points to `/cv/curriculo.pdf`, real file is `public/cv/CV MURILO ORTEGA 2026.pdf`); this is a one-line fix, not a new delivery pattern |
| Do NOT build a JSON Resume (`resume.json`) endpoint or a parallel HTML "resume page" this phase | Scope discipline | JSON Resume / machine-readable resume formats are an emerging niche pattern for AI-agent parsing, but there's no evidence this project's audience (human recruiters clicking from LinkedIn/email) needs it, and it's not in the Active scope. Worth flagging as a **possible future phase**, not now. LOW confidence / speculative trend, correctly out of scope |

### 4. Open Graph / Social Share Preview

| Pattern | Purpose | Why Recommended |
|---------|---------|------------------|
| Home page OG image: 1200×630px (1.91:1), JPEG/PNG, under ~1MB, headline/photo kept inside the center ~1080×600 "safe zone" | When a recruiter shares/forwards the site link in LinkedIn DM, Slack, or email, this is what renders as the preview card | 1200×630 is the universal safe dimension across LinkedIn, Facebook, X, Slack, WhatsApp, iMessage — one image works everywhere, no per-platform variants needed. HIGH confidence, this is a stable, widely-documented convention |
| Feature the new hero photo (or a dedicated crop of it) plus headline text as the OG image, not a generic logo/wordmark | Since the audience is now recruiters evaluating a specific person, a face + role communicates faster in a link preview than an abstract brand image | Directly supports the milestone's stated goal ("recruiter understands who Murilo is... within seconds") — the OG card is often the very first impression, before the click |
| Reuse the existing `routeSeo()` OG/Twitter-card wiring (already present per ARCHITECTURE.md) — just update the `image` value passed in for the home route | No new code path needed | The helper already normalizes OG + Twitter card meta consistently across routes; this is a content update to the home route's `head()` call, not new infrastructure |

### 5. Framer Motion & Motion Accessibility

| Pattern | Purpose | Why Recommended |
|---------|---------|------------------|
| Use Framer Motion's `useReducedMotion()` hook (or CSS `prefers-reduced-motion` media query) to disable/simplify hero entrance animations | Respect OS-level accessibility settings; also avoids motion-induced distraction during the critical "first 7 seconds" a recruiter spends scanning | Framer Motion is already a project dependency (`framer-motion` 12.38, per STACK.md) — this is a built-in hook, zero new dependency. HIGH confidence this hook exists and is the documented pattern for this exact problem |
| Animate only `opacity`/`transform` on the new hero elements (photo, headline, CTA), never properties that trigger layout (`width`, `top`, `margin`) | Keeps animations on the GPU compositor thread, avoids jank and avoids delaying LCP paint of the hero photo | Standard web-performance guidance, reinforced by the fact that the hero photo is likely the LCP element (see Image Delivery above) — animating it via layout-affecting properties would directly hurt the metric that most affects perceived speed |
| Reuse the existing `useScrollReveal` hook (`src/hooks/use-scroll-reveal.tsx`) for below-the-fold new sections (skills, case-study cards), reserve direct Framer Motion `motion.div` usage for the hero (first-paint) elements only | Consistency with existing codebase convention; avoids IntersectionObserver + Framer Motion doing redundant work on the same elements | ARCHITECTURE.md documents `useScrollReveal` as the established pattern for scroll-triggered reveals sitewide — new home sections should follow it rather than introducing a second animation approach for the same purpose |

## Installation

No new packages required for any of the above. All patterns use libraries already declared in `package.json` (`framer-motion`, native browser APIs) or plain markup/asset changes.

```bash
# Nothing to install — this phase adds zero new dependencies.
# If image tooling is needed for one-off exports, use it OUTSIDE the repo
# (Squoosh web app, or `npx @squoosh/cli`) and commit only the output files.
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|--------------------------|
| Manual pre-export of AVIF/WebP hero photo, committed as static files | `vite-imagetools` / `unpic-img` build-time image pipeline | If a future phase adds many new recruiter-facing images (case study galleries, a blog) where manual export becomes a maintenance burden — not justified for one hero photo |
| `CreativeWork` schema for case studies | A custom/no schema at all for case studies | If structured data testing shows no measurable SEO/rich-result benefit after a future phase, it's safe to drop — but there's no downside to including it now since it's a small JSON-LD addition reusing existing patterns |
| Direct PDF link for CV | JSON Resume (`resume.json`) machine-readable endpoint | If a future milestone specifically targets AI-agent-mediated recruiting tools (e.g., LinkedIn's or ATS's AI resume parsers) as a distinct channel — currently unverified as relevant to this audience |
| Cloudflare's platform-level image transformations left as "future, unverified" | Actively enabling Cloudflare Images now | Only if the user confirms the Cloudflare account/plan already includes Image Transformations — otherwise this could silently 404 or require a paid upgrade, which is outside this phase's scope to investigate |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|--------------|
| `SoftwareApplication` schema for design/branding case studies | Semantically wrong for graphic design/branding/social-media work; appeared in one low-quality SEO blog's generic "portfolio schema" advice, not an authoritative source | `CreativeWork` |
| A second, independent `Person`/`ProfilePage` JSON-LD block that duplicates/conflicts with the existing one in `__root.tsx`/`index.tsx` | Conflicting entity data across JSON-LD blocks on the same page is a documented structured-data anti-pattern that can suppress rich results | Extend the existing `Person` object in place |
| Any new state-management library, CMS, or data-fetching layer to "make content editable" | Explicitly out of scope (PROJECT.md: stack is fixed; content stays hardcoded per existing convention); the site has zero backend/database by design (ARCHITECTURE.md) | Keep new home-page content as inline TS objects/arrays, following the existing convention in `src/routes/index.tsx` |
| A new animation library (GSAP, Lottie, etc.) for the hero | Framer Motion already covers this need and is already a dependency; adding a second animation library increases bundle size for no functional gain | Framer Motion + `useReducedMotion()` |
| Image-only (flattened, untagged) PDF export for the CV | Inaccessible to screen readers; several recruiters/ATS tools may reject or mis-parse it | Tagged/accessible PDF export from the source design tool |
| Introducing automated tests as part of this work | Explicitly out of scope for this phase per PROJECT.md (registered as separate technical debt) | N/A — not this phase's concern |

## Stack Patterns by Variant

**If the hero photo asset isn't available/shot yet before implementation starts:**
- Build the hero layout to accept the image via a single named import/constant (not scattered across the component), so swapping in the final photo later is a one-file change
- Use a solid-color or blurred-placeholder background matching the site's dark/editorial palette as a temporary `background` so CLS/LCP work can still be validated before the real photo exists

**If recruiter audience is confirmed to be primarily international (English-reading) rather than Brazilian Portuguese-reading:**
- This affects `lang` attribute, OG `locale`, and copy — a content/i18n concern for FEATURES.md or PITFALLS.md, not a stack decision. Flagging here only so the roadmap doesn't silently assume Portuguese-only content is final.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|------------------|-------|
| `framer-motion@12.38` | React 19.2 | Already verified working in production per existing STACK.md; `useReducedMotion()` has been stable API since early Framer Motion versions, no version risk |
| Native `<picture>`/AVIF | All modern evergreen browsers (Safari 16+, Chrome/Edge/Firefox current) | AVIF support has been broadly available since ~2023; keep the WebP/JPEG fallback tiers in `<picture>` for older browser coverage, no polyfill needed |

## Sources

- [Google Search Central — ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page) — HIGH confidence, official documentation, verified required/recommended properties
- [Schema.org — CreativeWork](https://schema.org/CreativeWork) — HIGH confidence, official schema reference
- WebSearch: "portfolio website structured data schema.org Person ProfilePage best practices" — MEDIUM confidence, cross-referenced multiple independent blogs against the Google doc above
- WebSearch: "personal portfolio site convert recruiters case study structure hero photo best practices" — MEDIUM confidence, UX-portfolio industry blogs (uxfol.io, opendoorscareers.com), consistent across multiple independent sources on hero photo / 7-second scan / case-study structure claims
- WebSearch: "Cloudflare Workers image optimization responsive images React Vite portfolio LCP" — MEDIUM confidence; confirms Cloudflare Images is a platform capability but plan/tier availability for this specific project is unverified
- WebSearch: "Open Graph image LinkedIn preview portfolio site best practices dimensions" — HIGH confidence, 1200×630/1.91:1 convention is consistent across every source checked (ogpreview.app, krumzi.com, featureimg.com, etc.) and matches long-standing OG spec convention
- WebSearch: "downloadable resume CV PDF accessibility print stylesheet best practice portfolio site" — MEDIUM confidence, general accessibility/career-site guidance, no single authoritative spec for "resume delivery" as a pattern
- `.planning/codebase/STACK.md`, `.planning/codebase/ARCHITECTURE.md` — HIGH confidence, ground truth for what already exists in this codebase (not re-verified externally, per milestone instructions)

---
*Stack research for: personal portfolio homepage restructured for recruiter conversion (brownfield)*
*Researched: 2026-08-04*
