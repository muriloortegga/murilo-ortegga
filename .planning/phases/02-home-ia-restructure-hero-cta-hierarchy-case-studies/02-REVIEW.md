---
phase: 02-home-ia-restructure-hero-cta-hierarchy-case-studies
reviewed: 2026-08-05T23:07:29Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - src/routes/index.tsx
findings:
  critical: 0
  warning: 2
  info: 5
  total: 7
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-08-05T23:07:29Z
**Depth:** standard
**Files Reviewed:** 1
**Status:** issues_found

## Summary

`src/routes/index.tsx` was reviewed against the phase's documented changes: hero rebuild (two-line
H1, responsive `<picture>` portrait, three-tier CTA cluster), removal of `HeroGallery`/`galleryImages`/
`galleryAlts`, redefinition of the `projects` array to 5 confirmed cases with Problema/Ação/Resultado
copy, and the restructured `ProjectCard` figcaption.

Cross-checked against the phase's planning artifacts (`02-COPY.md`, `02-CASE-SOURCES.md`,
`02-UI-SPEC.md`): the approved hero copy strings match exactly, all 5 project routes
(`/natrave`, `/symplice`, `/maxi`, `/solid`, `/kapyi`) exist, all referenced image assets
(`public/assets/projects/thumbnails/...`, `public/assets/home/hero/...`, the CV PDF) exist on disk,
the LinkedIn URL and e-mail address are consistent with `Footer.tsx`/`contato.tsx`, and `npx tsc
--noEmit` compiles cleanly. No fabricated metrics, no dead links, no security issues (no secrets,
`eval`, `innerHTML`, or empty catch blocks) were found in this file.

The issues below are two pre-existing (but still live and now more consequential) robustness gaps in
`ProjectCard` — the component this phase's `02-03` plan directly modified — plus several minor code
quality / dead-code items, some newly created by this phase's edits (orphaned `HeroGallery` CSS,
dead `project.gif` branch) and some inherited unchanged (unused `ChevronRight` import).

## Warnings

### WR-01: `ProjectCard`'s callback ref creates a fresh, undisposed `IntersectionObserver` on every render

**File:** `src/routes/index.tsx:151-164`
**Issue:** `cardRef` is a plain inline function re-created on every render of `ProjectCard`:

```tsx
const cardRef = (node: any) => {
  if (node) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
  }
};
```

Because `cardRef`'s identity changes on every render, React detaches (`ref(null)` — a no-op here since
the code only branches on truthy `node`) and re-attaches (`ref(node)`) the ref on each re-render,
constructing and starting a **new** `IntersectionObserver` on the same DOM node every time. `HomePage`
re-renders on every `scroll` event (via the unthrottled `scrollY` state set in the `useEffect` at
`index.tsx:204-210`), so while a user scrolls past the case-studies grid, each of the 5 `ProjectCard`
instances will spin up a new observer per scroll-driven re-render. None of these observers is ever
disconnected unless its own `isIntersecting` fires — if a card unmounts (e.g. fast client-side
navigation away from `/`) before intersecting, its observer(s) are also never cleaned up. This is a
resource-management bug (missing cleanup / incorrect ref lifecycle), not merely a performance
tuning concern.

**Fix:** Use a `useRef` + `useEffect` (with a proper `return () => observer.disconnect()` cleanup) or
memoize the ref callback so its identity is stable, e.g.:

```tsx
const nodeRef = useRef<HTMLElement | null>(null);
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const node = nodeRef.current;
  if (!node) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(node);
  return () => observer.disconnect();
}, []);
```

### WR-02: `ProjectCard` prop type is `any`, so the compiler cannot verify the new required P/A/R fields

**File:** `src/routes/index.tsx:149`
**Issue:** `function ProjectCard({ project, index }: { project: any, index: number })` types `project`
as `any`. This phase added three new fields (`problem`, `action`, `result`) that every entry in
`projects` must supply and that `ProjectCard`'s figcaption now unconditionally renders
(`index.tsx:190-192`). With `project: any`, a future edit that adds/removes a project without one of
these fields (or misspells a key) will render `undefined` in the UI silently — TypeScript gives no
protection here despite `strict: true` in `tsconfig.json`, because the `any` annotation opts the whole
object out of checking.
**Fix:** Introduce a named interface and use it for both the `projects` array and `ProjectCard`'s
props:

```ts
interface Project {
  name: string;
  category: string;
  image: string;
  to: string;
  problem: string;
  action: string;
  result: string;
}

const projects: Project[] = [ /* ... */ ];

function ProjectCard({ project, index }: { project: Project; index: number }) { /* ... */ }
```

## Info

### IN-01: Unused `ChevronRight` import

**File:** `src/routes/index.tsx:5`
**Issue:** `ChevronRight` is imported from `lucide-react` but never referenced anywhere in the file
(pre-existing before this phase's edits, still present after). Dead import.
**Fix:** Remove `ChevronRight` from the import list: `import { ArrowRight, Linkedin, Mail, Download } from "lucide-react";`

### IN-02: Dead `project.gif` branch in `ProjectMedia` src selection

**File:** `src/routes/index.tsx:175`
**Issue:** `src={isVisible && project.gif ? project.gif : project.image}` references a `project.gif`
field that no longer exists on any of the 5 objects in the redefined `projects` array (confirmed: no
`gif:` key appears anywhere in the array, `index.tsx:41-87`). The condition is now permanently falsy
and this line always evaluates to `project.image` — vestigial logic left over from a prior card shape.
**Fix:** Simplify to `src={project.image}` (or restore a `gif` field on the data if hover-preview GIFs
are still intended for some cases).

### IN-03: `.hero-gallery*` CSS classes are now fully orphaned

**File:** `src/styles.css:503-541` (not modified this phase, but made dead by this phase's change)
**Issue:** This phase removed the `HeroGallery()` component, its call site, and the `galleryImages`/
`galleryAlts` arrays from `index.tsx`. A grep across `src/` confirms `.hero-gallery`,
`.hero-gallery-track`, `.hero-gallery-item`, and the `gallery-scroll` keyframes in `src/styles.css` are
no longer referenced by any component. Out of this file's literal diff scope, but a direct, provable
consequence of it.
**Fix:** In a follow-up cleanup pass, remove the now-dead `.hero-gallery*` rules and `@keyframes
gallery-scroll` from `src/styles.css`.

### IN-04: Category string format inconsistency for the Kapyi card

**File:** `src/routes/index.tsx:80`
**Issue:** 4 of 5 project cards use a `"<Discipline> · <Year>"` category format (e.g. `"Branding &
UX/UI · 2024"`), but Kapyi uses `"Direção Criativa & Branding · Agência"` — no year, different suffix
token. This appears to be an intentional distinction (ongoing agency relationship vs. a single dated
project) rather than an oversight, but it breaks the visual/textual pattern a recruiter scanning the
grid would otherwise rely on.
**Fix:** If intentional, consider a more explicit and consistent qualifier (e.g. `"Direção Criativa &
Branding · 2022–24"`) so the format stays parseable at a glance; otherwise align to the `· <Year>`
pattern used by the other 4 cards.

### IN-05: Duplicate/overlapping `IntersectionObserver` usage between `useScrollReveal` and `ProjectCard`

**File:** `src/routes/index.tsx:149-164`, `src/hooks/use-scroll-reveal.tsx:1-30`
**Issue:** Every `ProjectCard`'s root `<figure>` carries the `scroll-reveal` class, which is picked up
by `HomePage`'s `useScrollReveal()` hook (root-level `IntersectionObserver` that toggles `.is-visible`
for the fade-in animation). `ProjectCard` additionally runs its own separate, independent
`IntersectionObserver` (see WR-01) on the exact same node purely to gate lazy image loading. Two
different observer instances now watch the same element for conceptually similar "has this scrolled
into view" signals, maintained in two different places with two different lifecycles.
**Fix:** Consider extending `useScrollReveal` to optionally expose per-element visibility state (or
have `ProjectCard` consume the `is-visible` class it already sets) instead of maintaining a second,
parallel observer.

---

_Reviewed: 2026-08-05T23:07:29Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
