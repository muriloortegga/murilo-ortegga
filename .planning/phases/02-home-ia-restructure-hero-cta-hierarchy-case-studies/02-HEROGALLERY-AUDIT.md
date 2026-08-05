---
phase: 02
plan: 02
constraint: no-content-deletion
---

# HeroGallery Retirement — Image Reachability Audit

This audit exists to satisfy `.planning/PROJECT.md`'s non-negotiable constraint: "Nenhum
conteúdo/página/projeto/texto/asset existente pode ser excluído — só reorganizado, reescrito ou
movido de posição/hierarquia." The `HeroGallery()` component, and the `galleryImages`/`galleryAlts`
arrays that fed it, are being removed from `src/routes/index.tsx` as part of plan `02-02` (per
`02-UI-SPEC.md` §5). This table proves, image by image, that every path the retired gallery
referenced remains reachable through `/trabalho` and its own project route — nothing is lost, only
the hero-specific scrolling-gallery UI pattern is retired.

## Reachability Table

| Image path | Project | Still reachable at | Verified by |
|---|---|---|---|
| `thumbnails/symplice.jpg` | Symplice | `/trabalho` "Id Visual" category entry + `/symplice` project route | `grep "thumbnails/symplice.jpg" src/routes/trabalho.tsx` → line 53 |
| `thumbnails/social/kapyi.jpg` | Kapyi | `/trabalho` "Social Media" category entry + `/kapyi` project route | `grep "thumbnails/social/kapyi.jpg" src/routes/trabalho.tsx` → line 49 |
| `thumbnails/solid.jpg` | Solid+ | `/trabalho` "Id Visual" category entry + `/solid` project route | `grep "thumbnails/solid.jpg" src/routes/trabalho.tsx` → line 55 |
| `thumbnails/natrave.jpg` | NaTrave | `/trabalho` "Id Visual" category entry + `/natrave` project route | `grep "thumbnails/natrave.jpg" src/routes/trabalho.tsx` → line 52 |
| `thumbnails/kmillion.jpg` | Kmillion | `/trabalho` "Id Visual" category entry + `/kmillion` project route | `grep "thumbnails/kmillion.jpg" src/routes/trabalho.tsx` → line 54 |
| `thumbnails/social/talk2buy.jpg` | Talk2Buy | `/trabalho` "Social Media" category entry + `/talk2buy` project route | `grep "thumbnails/social/talk2buy.jpg" src/routes/trabalho.tsx` → line 45 |
| `thumbnails/social/maxi.jpg` | Colégio Maxi | `/trabalho` "Social Media" category entry + `/maxi` project route | `grep "thumbnails/social/maxi.jpg" src/routes/trabalho.tsx` → line 47 |
| `thumbnails/social/milgrows.jpg` | Milgrows | `/trabalho` "Social Media" category entry + `/milgrows` project route | `grep "thumbnails/social/milgrows.jpg" src/routes/trabalho.tsx` → line 48 |
| `thumbnails/social/evidive.jpg` | Evidive | `/trabalho` "Social Media" category entry + `/evidive` project route | `grep "thumbnails/social/evidive.jpg" src/routes/trabalho.tsx` → line 46 |

All 9 paths from the live `galleryImages` array in `src/routes/index.tsx` (pre-removal) return a
match in `src/routes/trabalho.tsx`. No orphaned image was found — the removal below proceeds.

## Ruling

- The image assets themselves, under `public/assets/projects/`, are untouched by this plan — zero
  files under `public/` were added, moved, or deleted (`git status --porcelain public/` is empty
  after this plan's commits).
- Only the hero-specific `HeroGallery()` scrolling-gallery UI pattern is retired from
  `src/routes/index.tsx` — the `galleryImages` array, `galleryAlts` array, and `HeroGallery()`
  function are deleted from that file. The images they referenced continue to render on `/trabalho`
  and on each project's own route, unaffected.
- `02-UI-SPEC.md` §5 pre-approved this exact removal as reorganization, not deletion, and explicitly
  asked that it be flagged for visibility rather than done silently — this document is that flag.
- `src/styles.css`'s `.hero-gallery`, `.hero-gallery-track`, `.hero-gallery-item` rules (lines
  504–541) are intentionally left in place. `src/styles.css` is out of scope for this phase; removing
  now-unused CSS is a separate, future cleanup task, not part of `02-02`.
