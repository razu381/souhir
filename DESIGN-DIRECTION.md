# Maison SF / Dar SF — Design Direction

**Luxury Visual Presence**
Final direction · 2026-08-29 · build specification

---

## 01 — The Direction

> **Keep the skeleton of the reference sites. Replace their finish entirely.**
>
> Swiss architecture. Couture typography. Hospitality tempo.

The two reference designs in `inspirations/` are structurally excellent and tonally wrong. That is a solvable problem, because **structure and finish are independent layers.** The layout skeleton — oversized type over photography, numbered chapters, hairline rules, full-bleed dark interludes, a giant outro wordmark — is entirely compatible with premium luxury. What reads as *agency demo* is the finish: grotesk caps, neon accents, rounded corners, fast springy motion.

We keep every structural decision and change seven finish decisions. **No layout changes are required.**

| | Reference | Maison SF |
|---|---|---|
| 1 | Grotesk caps display | **Didone serif, mixed case** |
| 2 | ~300 ms springy easing | **~1100 ms long-tail, no overshoot** |
| 3 | Neon orange / lime | **Champagne `#CDB190`, under 2% coverage** |
| 4 | Rounded card corners | **Sharp corners throughout** |
| 5 | Dense multi-column hero | **One image, one word, one line, one cue** |
| 6 | AI sci-fi renders | **The `sorted/` photography library** |
| 7 | Tight vertical rhythm | **+25% whitespace** |

The brief calls for *cinematic, editorial, immersive, minimal, refined, slow luxury.* The references supply the architecture; the seven substitutions supply the atmosphere.

---

## 02 — Typography

Two voices with a hard division of labour. **If a line is *felt*, it is serif. If a line is *structural*, it is tracked sans caps.** No third typeface.

### Voice 1 — Emotional (display)

High-contrast Didone, echoing the `SF` monogram in the logo. Headlines, pull-quotes, wordmark, statement lines, numerals in service rows and stat tiles.

- **Specified:** Canela — alternates Ogg, Reckless *(licence ~$200–600; the highest-leverage spend on the project)*
- **Fallback if unlicensed:** Bodoni Moda (Google Fonts)

```css
--font-display: "Canela", "Bodoni Moda", "Didot", Georgia, serif;
```

**Rules.** Mixed case, **never all-caps**. Tracking `-0.02em` to `-0.035em` — Didones must be set tight. Line-height `0.95`–`1.05`. Minimum size `clamp(2.75rem, 7vw, 9rem)` for display; a hairline Didone below ~40px thins out and cheapens — under that threshold, drop to Voice 2.

### Voice 2 — Structural (everything else)

Neutral grotesk. Navigation, chapter labels, numbers, buttons, tags, captions, meta, and all body copy. This is the voice of `LUXURY VISUAL PRESENCE` on the logo.

- **Specified:** Suisse Int'l — alternate ABC Monument Grotesk
- **Fallback if unlicensed:** Inter Tight (Google Fonts)

```css
--font-sans: "Suisse Int'l", "Inter Tight", -apple-system, "Helvetica Neue", sans-serif;
```

**Rules.** Labels and nav: `11–12px / 0.16em tracking / uppercase`. Body: `16–18px / 1.7 line-height`, sentence case, never tracked, never uppercase. Colour `--graphite` for supporting copy, `--ink` for primary.

### Scale

```css
--t-display: clamp(2.75rem, 7vw, 9rem);    /* hero wordmark, section statements */
--t-h1:      clamp(2.25rem, 4.5vw, 4.5rem);
--t-h2:      clamp(1.75rem, 3vw, 3rem);
--t-h3:      clamp(1.35rem, 2vw, 1.875rem);
--t-body:    clamp(1rem, 1.05vw, 1.125rem);
--t-label:   0.6875rem;  /* 11px, 0.16em tracking, uppercase */
```

---

## 03 — Colour

Sampled from `dar-logo-gold-black-brand-mark.png`.

```css
:root {
  /* Ground */
  --noir:       #0A0A0A;   /* full-bleed dark bands, footer, page transitions */
  --ink:        #141414;   /* primary text on light */
  --charcoal:   #2A2A2A;   /* secondary dark surfaces */
  --graphite:   #6E6A66;   /* supporting text */
  --hairline:   #E2DDD6;   /* 1px rules on light */
  --hairline-d: rgba(255,255,255,.14);  /* 1px rules on dark */
  --bone:       #F6F3EE;   /* warm alternate ground */
  --paper:      #FFFFFF;

  /* Accent — the only colour in the system */
  --champagne:      #CDB190;  /* logo exact */
  --champagne-deep: #A98F6E;  /* accessible variant for light grounds */
}
```

**Champagne is a jewel, not a paint.** Under ~2% coverage per screen: the logo, one hairline underline, active nav state, `↗` glyphs, chapter numerals, the hover fill on an outline button. Never a full-width band, never a large fill.

> **Hard constraint.** `#CDB190` on white is ~1.9:1 — it fails every contrast threshold. On light grounds it is **decorative only**; use `--champagne-deep` for any champagne text, and keep it to labels rather than body. On `--noir` it sits near 9:1 and is safe for anything.
>
> The practical consequence: **champagne belongs on black.** This is the structural reason the dark interlude sections exist — they are where the brand colour gets to live.

**Grounds alternate.** `--paper` as default; `--bone` for About and Journal sections for a warmer print feel; `--noir` for interludes, CTA, and footer.

**Dark mode:** build it. The palette is already monochrome, so the noir inverse is close to free and suits the brand. Tokens swap under `:root[data-theme="dark"]` and `@media (prefers-color-scheme: dark)`.

---

## 04 — Grid & Space

- 12 columns · max content `1440px` · outer margin `clamp(20px, 5vw, 96px)`
- Full-bleed breakouts permitted for imagery, dark bands, and the outro wordmark
- Baseline `8px`
- Section rhythm: **`200px` desktop / `120px` tablet / `88px` mobile** — the references' whitespace plus 25%. This is where "slow luxury atmosphere" is physically built; it is not a place to economise.
- Sections are separated by hairlines and space. **Never by borders, boxes, or containers.**

---

## 05 — Motion

The references animate fast and springy. Halving the speed and removing the overshoot converts the identical layout from *tech agency* to *maison*. Tempo is the cheapest luxury signal in the system.

```css
--ease:      cubic-bezier(0.16, 1, 0.30, 1);  /* long tail, no overshoot */
--dur-micro: 320ms;    /* hovers, buttons */
--dur-base:  680ms;    /* content reveal */
--dur-slow:  1100ms;   /* image reveal, hero, section entrance */
```

- **Image reveal** — `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` over `--dur-slow`, with a `1.08` → `1.0` scale. A curtain, not a fade.
- **Headline reveal** — line-by-line mask-up, `90ms` stagger.
- **Statement paragraph** — word-by-word `--graphite` → `--ink` on scroll. The most editorial moment in the system; run it slow.
- **Marquee labels** — kept, at `~60s` per cycle rather than `~20s`. A drift, not a ticker.
- **Rotating badge** — `SAY HELLO · LET'S TALK ·` in tracked caps, champagne on noir, `24s`.
- **Page transitions** — full-bleed `--noir` wipe. This is what makes seven pages feel like one continuous film.
- **`prefers-reduced-motion`** — reveals become instant; marquees and rotation stop.

---

## 06 — Components

| Component | Specification |
|---|---|
| **Outline button** | Pill, 1px `--hairline`, tracked sans caps 11px, `↗` glyph. Hover: fills `--noir`, text to `--champagne`, `--dur-micro` |
| **Chapter header** | Full-width hairline, then `(SERVICES)` left · `01` right in `--champagne-deep`. Opens every section |
| **Service row** | Numeral and label in Didone, description in `--graphite` sans right. Hairline dividers. 4:5 preview tile appears in the left margin on hover |
| **Portfolio card** | **Sharp corners.** Title top-left in Didone, `↗` circle top-right, tag pills bottom-left |
| **Dark interlude** | Full-bleed `--noir`, one Didone line in champagne, 6.4:1 banner behind at low luminance |
| **Stat tile** | Full-bleed image, giant Didone numeral burned into the bottom-left |
| **Marquee label** | Tracked caps drifting on the ground — no black pill |
| **Status line** | `CURRENTLY ACCEPTING PROJECTS — 2026`, tracked caps, no dot |
| **Outro wordmark** | `MAISON SF` in Didone at extreme scale, bleeding off the footer's bottom edge |
| **Navigation** | Logotype + hamburger on home; full tracked-caps nav on interior pages. **Sans, not serif** — nav is structural |

**Cut from the references:** diagonal ticker ribbons, rounded corners, GRID/LIST toggle *(reinstate only if the portfolio exceeds ~12 items)*.

---

## 07 — Page Architecture

### Home

| # | Section | Direction |
|---|---|---|
| 01 | **Hero** | Full-bleed `hero-parisian-woman-black-suit-hands-pockets-street.jpg`, slow scale-out on load. `MAISON SF` in Didone over the image. **Beyond Visibility. Into Memory.** Meta rail: `(EST. 2026)` left · sub-headline centre · `SCROLL ↓` right |
| 02 | **Explore Dar SF** | Scroll-reveal statement paragraph, grey → ink, word by word. 2:3 portrait right |
| 03 | **The Art of Brand Presence** | `(SERVICES) —— 01`. Four numbered Didone rows, hairline dividers, margin preview tiles |
| 04 | **Who We Work With** | `(CLIENTS) —— 02`. Seven verticals on 4:5 category tiles — hospitality, wellness, beauty, lifestyle, travel, editorial, hotels |
| 05 | **About / Founder** | `(STUDIO) —— 03`. Portrait left, statement right, `souhir-fhima-neon-signature.png` sign-off, `Explore Our Philosophy →` |
| 06 | **Interlude** | Full-bleed noir. One Didone line in champagne. The page's held breath |
| 07 | **Selected Works** | `(WORK) —— 04`. Filters: All / Hospitality / Beauty / Wellness / Editorial / Lifestyle. 2-up sharp cards |
| 08 | **Editorial Recognition** | Press marks, greyscale at 40%, champagne on hover |
| 09 | **The Journal** | `(JOURNAL) —— 05`. 3-up grid, 3:2 crops, Didone titles, tracked-caps dates |
| 10 | **CTA** | *Let's Create Something Worth Remembering* on noir, outline pill, rotating champagne badge |
| 11 | **Footer** | Noir. Link columns, `Back to top`, giant `MAISON SF` outro wordmark |

### About — *The Language of Presence*
Founder story · The Philosophy · The Dar SF Way (numbered `01–06` principles, same row system as Services) · Vision · Values · Closing CTA. Ground alternates `--bone`.

### Services — *What We Create*
Intro · four service chapters, each a full section with its own `(01–04)` number, 2:3 image, and statement · Process `01–06` (Discovery → Creative Direction → Production → Refinement → Delivery → Elevate) as a numbered hairline sequence · AI & Innovation on a dark band.

### Portfolio
Filterable grid. Case studies (*Paris Couture Editorial*, *Eternal Reflections*, *Velocity Noir*) as full editorial pages: full-bleed hero, brief in a narrow measure, alternating 2:3 and 3:2 image pairs, pull-quote on noir, next-project link.

### Journal & Editorial
3-up index with a 6.4:1 banner header. Article pages: single narrow measure (~68ch), Didone title, generous leading, full-bleed image breakouts.

### Contact
Minimal. Statement in Didone, form in tracked-caps labels with hairline underline inputs, noir ground. No boxed form fields.

---

## 08 — Imagery

The `sorted/` folder is a layout contract. Lock these ratios into the theme's registered image sizes.

| Bucket | Ratio | Use |
|---|---|---|
| `01_banners_wide` | **6.4 : 1** | Dark interludes, CTA, newsletter, pull-quote grounds |
| `02_portrait_xl_vertical` | **2 : 3** | Hero, founder portrait, editorial pairings |
| `03_category_tiles` | **4 : 5** | Client verticals, service previews |
| `04_landscape_editorial` | **3 : 2** | Journal cards, process, case-study bodies |
| `05_small_medium` | **3 : 4** | Press covers, signature, inline editorial |

**Grading.** The library is already coherent — warm golden-hour interiors, cool wet-street Parisian monochrome, candlelit ambers. **One grade per section; never a warm and a cool image in the same viewport.** The black-and-white editorial frames (`editorial-*-bw`) are the strongest assets in the set — use them where the brand needs to feel most authored.

**Delivery.** Sources are 5000–10500px wide; none can reach the browser unprocessed. `sorted-resized/` already demonstrates the correct pattern — `480 / 800 / 1200w` in `.webp` and `.jpg`. Extend it to every bucket and ship `<picture>` with webp first.

---

## 09 — Rules

**Always**

- Sharp corners
- Hairlines and whitespace as the only separators
- Didone mixed case for felt lines; tracked sans caps for structural ones
- One image grade per viewport
- Champagne on noir
- Long-tail easing, no overshoot

**Never**

- Rounded corners, drop shadows, gradients, glows — no depth effects of any kind
- Any accent colour other than champagne
- All-caps serif, or serif in a button
- Champagne body text on a light ground
- Icon sets — the only glyphs are `↗ ↓ ← →`
- Boxed section containers or carded layouts
- Fast or springy easing, hover bounces, parallax on everything
- Reference-demo imagery anywhere near the live build

---

## 10 — Build Notes

- **Performance is the real risk.** Full-bleed imagery on every section makes LCP the governing metric. Preload and prioritise the hero; lazy-load everything below the fold; use a `--noir` block as the placeholder so a slow load still looks intentional. Budget: LCP < 2.5s on 4G.
- **Fonts:** self-host, `woff2`, `font-display: swap`, preload the display cut only. Subset to Latin + Latin-Ext.
- **Accessibility:** champagne contrast rule above is non-negotiable. Focus states use a 1px champagne ring on noir, `--champagne-deep` on light. All motion respects `prefers-reduced-motion`.
- **Content model (WordPress):** custom post types for `work`, `journal`, `editorial`; taxonomy for the six portfolio filters; ACF blocks mirroring the components in §06 so sections stay composable rather than hard-coded per page.

---

**Next:** homepage design canvas — hero, chapter header, service rows, dark interlude, portfolio grid, footer — as artboards to react to visually.
