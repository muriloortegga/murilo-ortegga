# FIX-03: Hero Photo Decision & Phase 2 Handoff Spec

This document is the durable answer to FIX-03 and ROADMAP Phase 1 success criterion 3. It exists so
Phase 2's hero build is a wiring exercise, not a decision exercise — every source, crop, colour,
dimension and file-path question is answered below.

## 1. Source and Selection

**Source file:** `public/assets/about/photos/hero-bg.jpg` — 3376x6000, 19,713,812 bytes, JPEG.

Selected per CONTEXT.md D-04, over the two sibling files it was compared against:
- `public/assets/about/photos/middle-bg.jpg` (18,033,680 bytes) — NOT selected
- `public/assets/about/photos/footer-bg.jpg` (25,963,681 bytes) — NOT selected

Per D-03, this is a **real photo of Murilo**, not a stock image.

**True framing** (verified by direct visual inspection during planning and again after export):
a three-quarter-length seated studio portrait — head, torso, arms and hands resting on the knee,
shot against a clean near-white seamless background, direct eye contact, warm beige overshirt over
a cream tee, forearm tattoos visible on both arms, short hair, moustache/light beard, small earring.
CONTEXT.md D-04 glosses this as a "close studio portrait" — the source file is a little wider than
that phrase implies. The filename is what D-04 locks, and the filename is unambiguous: this is the
right photo. The crop in section 3 below is what turns the three-quarter frame into the close,
confident portrait D-04 describes.

**The source stays in the repo, untouched.** `/sobre` (`src/routes/sobre.tsx` lines ~132-142) renders
directly from `hero-bg.jpg` today, as a grayscale background layer, and must keep working exactly as
it does now. This plan did not touch `/sobre`, did not touch `src/` at all, and did not modify, move,
rename or delete `hero-bg.jpg`, `middle-bg.jpg` or `footer-bg.jpg`. Confirmed:
`git status --porcelain public/assets/about/photos/` returned empty after every task in this plan.

## 2. Treatment — Full Colour (D-05)

The six exported variants are **full colour**. No `format=gray`, no `hue=s=0`, no
`colorchannelmixer`, no desaturation, no opacity reduction and no colour grading was applied at any
stage of the export pipeline.

**Do not copy the `/sobre` treatment.** `src/routes/sobre.tsx` (around line 135) renders this same
source photo with `className="w-full h-full object-cover grayscale opacity-30 md:opacity-50
object-[50%_25%] md:object-[50%_15%]"` — a low-opacity, desaturated **background layer** sitting
behind page copy. D-05 explicitly rejects this treatment for the home hero. The home hero portrait
is a full-colour, foreground-prominent element, not a faded backdrop. Phase 2 must not reuse the
`grayscale opacity-*` classes, nor the "background layer behind text" compositing approach, unless
Phase 2's own layout spec explicitly calls for it independent of this document.

## 3. Export Spec

**Crop, locked:** `crop=3376:4220:0:257` — full 3376px source width, 4220px tall, starting 257px
down from the top of the source frame. This produces a 4:5 aspect portrait. Validated visually after
export: comfortable headroom above the hair, the entire face and both shoulders in frame, torso
visible, hands entering cleanly at the bottom edge with no awkward clipping of the head or hands.
No y-offset adjustment was needed — 257 is the final value shipped.

**Scale:** `scale=W:H:flags=lanczos` applied after the crop, to each of three target widths.

**Formats and encoder settings, locked:**
- JPEG: `-q:v 4`
- AVIF: `-c:v libsvtav1 -crf 32 -preset 6 -pix_fmt yuv420p10le`

**Six files, their intrinsic dimensions, and their real on-disk byte sizes:**

| File | Dimensions | Size |
|---|---|---|
| `public/assets/home/hero/murilo-hero-480.jpg` | 480x600 | 29,209 bytes |
| `public/assets/home/hero/murilo-hero-480.avif` | 480x600 | 9,957 bytes |
| `public/assets/home/hero/murilo-hero-960.jpg` | 960x1200 | 99,069 bytes |
| `public/assets/home/hero/murilo-hero-960.avif` | 960x1200 | 30,558 bytes |
| `public/assets/home/hero/murilo-hero-1440.jpg` | 1440x1800 | 270,594 bytes |
| `public/assets/home/hero/murilo-hero-1440.avif` | 1440x1800 | 71,962 bytes |

Every variant is under 300KB — the entire set totals roughly 511KB, versus the 19.7MB source.

**EXIF:** the ffmpeg re-encode does not carry source EXIF forward. `LC_ALL=C grep -ac "Exif"`
returns `0` for every exported file and `1` for the untouched source.

**Reproducible export command** (run from repo root; safe to re-run, always re-derives the six
files from the untouched source):

```bash
SRC="public/assets/about/photos/hero-bg.jpg"
OUT="public/assets/home/hero"
CROP="crop=3376:4220:0:257"
mkdir -p "$OUT"

for W in 480 960 1440; do
  H=$(( W * 5 / 4 ))
  ffmpeg -hide_banner -loglevel error -i "$SRC" \
    -vf "${CROP},scale=${W}:${H}:flags=lanczos" \
    -q:v 4 -y "$OUT/murilo-hero-${W}.jpg"
  ffmpeg -hide_banner -loglevel error -i "$SRC" \
    -vf "${CROP},scale=${W}:${H}:flags=lanczos" \
    -c:v libsvtav1 -crf 32 -preset 6 -pix_fmt yuv420p10le \
    -y "$OUT/murilo-hero-${W}.avif"
done
```

## 4. The WebP Decision (deliberate, not an oversight)

**There is no WebP tier.** This was evaluated and rejected on purpose:

- `ffmpeg` on this machine has the `webp` **muxer** but no `libwebp` **encoder** — it cannot actually
  produce a WebP file.
- `sips` (the other preinstalled tool) can read WebP/AVIF but **cannot write** WebP.
- `magick` / `convert` / `cwebp` / `avifenc` are not installed.
- Producing a WebP tier would require installing a new image-processing package (`sharp`,
  `@squoosh/cli`, `imagemin-webp`, etc.). Both `.planning/PROJECT.md` ("Tech stack ... fixo, não é
  decisão desta fase") and `.planning/research/STACK.md` ("do NOT introduce vite-imagetools / any
  new image-processing library for this phase") forbid this.
- Coverage-wise, AVIF (Safari 16+, Chrome 85+, Firefox 93+) plus JPEG (universal fallback) already
  brackets the browser support range that WebP would sit inside. A WebP tier would be a redundant
  middle format, not additional coverage.

**Decision: ship AVIF + JPEG only.** Zero packages were installed to produce these assets;
`package.json`, `bun.lock` and `package-lock.json` all show zero diff from this plan.

This is revisitable: if a future phase adds a real image-processing dependency for unrelated
reasons, producing a WebP tier at that point would be low-cost. It is not worth adding a dependency
for this alone.

## 5. Phase 2 Handoff — Markup Sketch

**Do not use `ProjectMedia`** (`src/components/project-media.tsx`) for this image. It hardcodes
`loading="lazy"`, emits no `width`/`height`, no `fetchPriority`, and has no `<picture>`/srcset
support — the opposite of what an LCP-priority image needs. Extending `ProjectMedia` to support this
is a larger change than "prep only" and is explicitly out of scope for this phase (D-06); Phase 2
should build a dedicated `<picture>` element (inline in `src/routes/index.tsx`, or a small new
component) instead.

**LCP attribute set to copy**, from the only existing precedent in this codebase for prioritising an
above-the-fold image — `HeroGallery()` in `src/routes/index.tsx` (around lines 155-165), first image
in its loop:

```tsx
loading="eager"
fetchPriority="high"
```

**Sketch** (illustrative only — `sizes` and the surrounding container/layout are explicitly NOT
decided here, see below):

```tsx
<picture>
  <source
    type="image/avif"
    srcSet="
      /assets/home/hero/murilo-hero-480.avif 480w,
      /assets/home/hero/murilo-hero-960.avif 960w,
      /assets/home/hero/murilo-hero-1440.avif 1440w
    "
    sizes="TBD — Phase 2 layout decision"
  />
  <img
    src="/assets/home/hero/murilo-hero-960.jpg"
    srcSet="
      /assets/home/hero/murilo-hero-480.jpg 480w,
      /assets/home/hero/murilo-hero-960.jpg 960w,
      /assets/home/hero/murilo-hero-1440.jpg 1440w
    "
    sizes="TBD — Phase 2 layout decision"
    alt="Murilo Ortega"
    width={960}
    height={1200}
    loading="eager"
    fetchPriority="high"
  />
</picture>
```

`width={960}` / `height={1200}` (the 4:5 aspect ratio, any tier) is the explicit intrinsic size
needed to prevent CLS — do not omit it regardless of which tier is used as the `<img>` fallback.

## 6. What Is Explicitly NOT Decided Here

- **`sizes` attribute** — depends on Phase 2's actual layout (how much viewport width the hero
  portrait occupies at each breakpoint). Left as `TBD` in the sketch above on purpose.
- **Container / layout / positioning** — where and how large the portrait renders on the page is
  Phase 2's UI-SPEC work, per CONTEXT.md D-06 ("the actual hero layout/placement is Phase 2 work").
  This document only guarantees the pixels exist at the right dimensions.

## 7. Open Items Phase 2 Inherits

Named here as decisions for Phase 2 to make, not as problems this plan failed to solve:

- **Light portrait on a dark canvas.** The photo's background is near-white/seamless; the site is
  dark mode. Phase 2 must decide how the portrait meets the dark canvas — options include a
  feathered/gradient mask fading the white background into the page background, a contained card
  with a hard edge, or a cut-out/matte treatment isolating just the figure. This plan does not
  pre-judge which.
- **No existing foreground-portrait precedent.** `hero-bg.jpg` has only ever been used as a faded
  background layer (`/sobre`). There is no in-codebase example of this photo — or any portrait photo
  — rendered as a prominent foreground element to copy compositing cues from. Phase 2 is establishing
  new visual territory here, not following a pattern.

## 8. Not Covered By This Plan

**The 1200x630 Open Graph image is NOT produced here.** `.planning/research/STACK.md` section 4 and
ROADMAP Phase 4 success criterion 4 both reference a social-share/Open Graph image at 1200x630. That
asset is a separate deliverable, outside FIX-03's scope (which is the home page LCP hero, not social
share cards), and as of this plan **no phase currently owns creating it**. Flagging this now so it
does not surface as a surprise during Phase 4 QA — someone needs to either scope it into an existing
phase or explicitly defer it to v2.
