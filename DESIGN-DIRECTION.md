# Dar SF — Design Direction

**Luxury Visual Presence**
Final direction · 2026-08-29 · build specification

---

## 01 — The Direction

> **Keep the skeleton of the reference sites. Replace their finish entirely.**
>
> Swiss architecture. Couture typography. Hospitality tempo.

The two reference designs in `inspirations/` are structurally excellent and tonally wrong. That is a solvable problem, because **structure and finish are independent layers.** The layout skeleton — oversized type over photography, numbered chapters, hairline rules, full-bleed dark interludes, a giant outro wordmark — is entirely compatible with premium luxury. What reads as *agency demo* is the finish: grotesk caps, neon accents, rounded corners, fast springy motion.

We keep every structural decision and change seven finish decisions. **No layout changes are required.**

| | Reference | Dar SF |
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

### Addendum — the client's reference text setting (Oct 2026)

The client picked one hero study, **`/hero-lab` wall A4 "Charcoal — Control"**, as the way she wants text presented: *"I particularly liked how you displayed the text in this earlier hero version … Please use this as a reference when refining the text layouts across the website."*

**Adopted: the typography only.** Not A4's composition (the framed print hung beside the words), not its charcoal wall, not the picture light — those stay per-section decisions. The type setting below is the reference for every text block on the site, **our own homepage hero included** (decision 2026-10-10, `DECISION-LOG.md`).

Measured on the live lab at 1440 × 900; the source is the `.sf-nocturne__*` rules in `src/app/sf/components.css`.

| Step | Voice | Setting |
|---|---|---|
| 1 · Masthead | hairline + `(SF MUSE)` | Full-width rule; label 11px / 500 / `0.16em` / uppercase |
| 2 · Headline | Didone roman | `clamp(3rem, 12vw, 13.5rem)` (173px at 1440) · line-height `.94` · tracking `-.035em` · bone `#F6F3EE` · one word or phrase per line, each line its own reveal mask |
| 3 · Second voice | Didone *italic* | `clamp(1.625rem, 3.2vw, 3rem)` (46px — a quarter of the headline) · line-height `1.1` · tracking `-.01em` · champagne · set clear of the headline by `clamp(1.25rem, 3.5svh, 3.75rem)` |
| 4 · Standfirst | sans caps | 11px / 500 / `0.16em` · champagne · `.875rem` under the italic |
| 5 · Body | sans | `clamp(.9375rem, 1.05vw, 1.0625rem)` / `1.65` · white at 80% · measure `32rem` · paragraphs `.875rem` apart, the first `1–1.5rem` under the standfirst |
| 6 · Action | outline pill | 11px tracked caps · `clamp(1.5rem, 4svh, 2.5rem)` above |

**Why it works — the rules to carry into every section:**

1. **Extreme scale contrast, no in-between sizes.** The headline is ~11× the body; the italic is a quarter of the headline; everything else is 11px caps or body copy.
2. **A fixed reading order where each step changes voice, not just size:** label → roman headline → italic second voice → caps standfirst → body → button.
3. **One left-aligned column, ragged right.** The headline may run wider than the text column; the body never does (`32rem`).
4. **Spacing steps up with the hierarchy:** tight inside a group (`.875rem`), open between groups (`1.5–3.75rem`).
5. **Colour has one job per role:** bone headline; champagne only for the italic and the standfirst; body at 80% white. On light grounds the roles map to ink / bronze / `--charcoal-soft`, because champagne fails contrast there (§03).
6. **Italic is a voice, not decoration.** At most one italic line per text block, and only where the copy has a natural second beat: the hero's *Into Memory.*, the quote's second line and the closer's *Worth Remembering.* Every other heading is roman (client feedback, point 12, Oct 2026).

**Below the hero,** sections keep the ratios rather than the absolute sizes. Section headlines run the same recipe at roughly half the hero's scale (target `clamp(2.25rem, 5vw, 5.5rem)`, to be tuned in the build). Labels, standfirsts, body and buttons are identical everywhere.

> **Known defect — fix before reusing the masks.** `.sf-nocturne__line { overflow: hidden }` clips the end of a word whenever the headline's column is narrower than that word. The client's own screenshot of A4 reads "Visibilit", and at 1728px wide the full stop is cut. The masks must clip vertically only, or the headline must be sized so its longest word fits its column.

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

**Grounds alternate.** `--bone` is the light ground in practice (`--paper` is
reserved for type and small surfaces); `--umber` is the dark one — a warm
near-black tuned to the hero photograph's own shadow, so the picture can
dissolve into the ground rather than butt against it.

**Alternation is a rule, not a preference.** No more than two light sections in
a row, and never more than two dark. The home page once ran
`D L L D L D L L D D D D` — eight sections alternating, then a four-deep
blackout across interlude, correspondence, closer and footer. The interlude is
specified below as the page's held breath, the still *between* rooms; with
three more dark sections behind it, it contrasted with nothing. Correspondence
carries the light that keeps the run honest:

> `D · L L · D · L · D · L L · D · L · D D`
> hero · explore services · clientele · founder · work · press journal ·
> interlude · correspondence · closer footer

**Addendum — the round-2 rooms (client feedback, Oct 2026).** The homepage's two beige walls (D7 Champagne / D8 Sable, 7 Oct) read as one colour. They are replaced by warm ivory (`--wall-ivory #F5F0E7`) and charcoal (`--wall-charcoal #232120`), with deep brown (`--wall-brown #35261D`) used once (the founder) and champagne kept for accents. Each room sets its colour roles (headline · body · accent · rule) and re-points the shared tokens to them, so the components it hosts follow; measured contrast is in `tokens.css`. The homepage order is black · ivory · charcoal · ivory · brown · ivory · charcoal · ivory · (quote photograph) · charcoal · (closing photograph) · black. The tail is three dark bands in a row (newsletter, closing photograph, footer), against the two-dark rule above. The client asked for a charcoal newsletter, so the exception is accepted. The closing photograph is brightened in the bake (`home-assets.mjs` `tone`) so it reads as a photograph rather than another dark band.

**Addendum — About round 2 (client feedback, Oct 2026).** About runs on the same rooms, in the client's own order: charcoal hero · ivory founder story · charcoal philosophy · ivory principles · brown statement · ivory vision and values · brown closing · footer. Here brown is used twice, for the statement and the closing. That means two darks in a row at the tail (closing, footer), which is within the rule above. Q3 (the palette on Services) is still open.

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

**Addendum — the scroll-choreography layer (Sept 2026).** GSAP/ScrollTrigger and Lenis were adopted for three hand-driven scenes (the press-covers deck deal, the journal's sticky sheet-stack, the wheel glide) plus a custom pointer — a champagne orb with a trailing orbit ring; over links it grows a touch, warms one step brighter and its aura swells, never covering what it points at; killable with Escape. Two laws keep it maison rather than *portfolio-site*: **(1) tokens govern timed motion only** — the `--ease` curve is mirrored once into GSAP (`CustomEase('sf')`, `src/components/sf/animation/gsap.ts`) and used for time-driven tweens; scrubbed tweens run `ease: 'none'` because the reader's hand is the easing curve and `scrub: 1` supplies the glide — no token-fidelity claim is made for hand-driven motion. **(2) the same failure modes as the rest of the system** — Lenis mounts only on choreographed routes (never reading pages, never `/studio`), the pointer only on fine pointers without reduced-motion, and every effect degrades to its final state. JS writes classes and one custom property (`--sf-p`); CSS owns the look.

**Addendum — the filter transition (Sept 2026).** The work-grid filter is a FLIP (`gsap/Flip`): React still flips the `is-filtered` class — the one CSS line stays the source of truth — and Flip walks each surviving plate to wherever the reflow lands it while incoming plates fade up and outgoing ones lift off. The classes' snap becomes a glide; reduced motion skips Flip and keeps the instant swap. Same law as above: JS animates toward the state the CSS has already declared, never away from it.

---

## 06 — Components

| Component | Specification |
|---|---|
| **Outline button** | Pill, 1px `--hairline`, tracked sans caps 11px, `↗` glyph. Hover: fills `--noir`, text to `--champagne`, `--dur-micro` |
| **Chapter header** | Full-width hairline, then `(SERVICES)` left · `01` right in `--bronze` (champagne-deep measured 2.77:1 and failed). Opens every section. **Numbering starts at 01 on the first chapter the reader actually sees** — the hero is the cover and carries a masthead rule, not a chapter header, so counting it as 01 shipped a page whose visible sequence began at 02. One source of truth: `src/content/chapters.ts`. Interludes and the closer stay unnumbered by design. Where a section has no display headline, the chapter label *is* its `<h2>` |
| **Service row** | Numeral and label in Didone, description in `--graphite` sans right. Hairline dividers. 4:5 preview tile appears in the left margin on hover |
| **Portfolio card** | **Sharp corners.** Title top-left in Didone, `↗` circle top-right, tag pills bottom-left |
| **Dark interlude** | Full-bleed `--noir`, one Didone line in champagne, 6.4:1 banner behind at low luminance |
| **Stat tile** | Full-bleed image, giant Didone numeral burned into the bottom-left |
| **Marquee label** | Tracked caps drifting on the ground — no black pill |
| **Status line** | `CURRENTLY ACCEPTING PROJECTS — 2026`, tracked caps, no dot |
| **Outro wordmark** | `DAR SF` in Didone at extreme scale, bleeding off the footer's bottom edge |
| **Navigation** | Logotype + hamburger on home; full tracked-caps nav on interior pages. **Sans, not serif** — nav is structural |

**Addendum — round 2 (Oct 2026).**

- **The outro wordmark is back.** "SF *Muse*" sits at monument scale above the footer bar; the client asked for "a stronger SF Muse logo presence".
- **Service and journal cards.** Each is a photograph uncovered at the top, with the words on a raised panel (services) or beneath it (journal). The whole card is the link, and the Learn More / Read Article line is always visible.
- **Client icons.** "Who We Work With" carries bespoke single-weight line icons (`ClientIcon.tsx`, drawn on `ValueIcon`'s grid).

**Addendum — About round 2 (Oct 2026).**

- **The bleed split.** The photograph runs to the screen's edge, from the top to the bottom of its section, beside a text column or panel on the room's ground. No overlay is needed, because the text never sits on the photograph. About uses it three times, and each one differs:
  - **Hero:** the photo is on the right, below the header's line.
  - **Philosophy:** the photo is on the left, at its uncropped 3:4.
  - **Closing:** a shorter 4:5 panel, on the right.
- **The left rail.** A room whose headings share a left column (4/12) with their content to the right (8/12): About's Vision and Values.
- **Display type at a text-leaning optical size.** About sets its display lines at `"opsz" 30`. The automatic optical size thins Bodoni's hairlines to threads at 60px and over, so the right arms of W and V all but vanish. This answered the client's "slightly stronger serif strokes". The homepage still uses the automatic optical size; carry it over if she likes the About setting.

**Cut from the references:** diagonal ticker ribbons, rounded corners, GRID/LIST toggle *(reinstate only if the portfolio exceeds ~12 items)*.

---

## 07 — Page Architecture

### Home

| # | Section | Direction |
|---|---|---|
| 01 | **Hero** | Full-bleed `hero-parisian-woman-black-suit-hands-pockets-street.jpg`, slow scale-out on load. `DAR SF` in Didone over the image. **Beyond Visibility. Into Memory.** Meta rail: `(EST. 2026)` left · sub-headline centre · `SCROLL ↓` right |
| 02 | **Explore Dar SF** | Scroll-reveal statement paragraph, grey → ink, word by word. 2:3 portrait right |
| 03 | **The Art of Brand Presence** | `(SERVICES) —— 01`. Four numbered Didone rows, hairline dividers, margin preview tiles |
| 04 | **Who We Work With** | `(CLIENTS) —— 02`. Seven verticals on 4:5 category tiles — hospitality, wellness, beauty, lifestyle, travel, editorial, hotels |
| 05 | **About / Founder** | `(STUDIO) —— 03`. Portrait left, statement right, `souhir-fhima-neon-signature.png` sign-off, `Explore Our Philosophy →` |
| 06 | **Interlude** | Full-bleed noir. One Didone line in champagne. The page's held breath |
| 07 | **Selected Works** | `(WORK) —— 04`. Filters: All / Hospitality / Beauty / Wellness / Editorial / Lifestyle. 2-up sharp cards |
| 08 | **Editorial Recognition** | Press marks, greyscale at 40%, champagne on hover |
| 09 | **The Journal** | `(JOURNAL) —— 05`. 3-up grid, 3:2 crops, Didone titles, tracked-caps dates |
| 10 | **CTA** | *Let's Create Something Worth Remembering* on noir, outline pill, rotating champagne badge |
| 11 | **Footer** | Noir. Link columns, `Back to top`, giant `DAR SF` outro wordmark |

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

**Croppability is part of the contract.** The CDN will crop anything to
anything, which is how a 1600×197 banner ended up as a 148×197 sliver blown up
4× to fill a 600×800 journal thumb. A source that cannot honestly meet the
ratio must fall through to the seed plate rather than be forced —
`croppable()` in `src/sanity/fetch.ts` enforces it.

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

- Rounded corners, drop shadows, gradients, glows — no depth effects of any kind,
  **with four named exceptions, and no others:**
  1. **The outline button is a pill** (`border-radius: 999px`). §06 specifies it;
     this line used to forbid it, and the two contradicted each other. §06 wins:
     the pill is the system's one curve.
  2. **The picture light** — the champagne glow above a hung plate
     (`.sf-nocturne__plate`, `.sf-register__card`). It is a light source in the
     photograph's own world, not a UI shadow, and it is the nocturne's signature.
  3. **The cinematic grade** — vignette, champagne wash and grain laid *inside*
     a frame as glass over the print (`.sf-nocturne__plate::after`,
     `.sf-work__plate::after`). The photograph keeps its full dynamic range
     underneath; the grade never replaces it.
  4. **The hero legibility scrim** — the warm-black ramps poured over a
     full-bleed hero photograph (`.sf-nocturne--backdrop .sf-nocturne__plate::after`),
     promoted from /hero-lab-v2 hang A0b (Sept 2026). Named here BEFORE that
     hang shipped, per this section's own rule. Three coats, each earning its
     place by measurement: the feather eases the frame's own black-to-grey
     seam (wall entry 91→20 luminance); the edge ramp darkens the type's
     ground; the floor coat keeps the rail's champagne at 4.5 : 1. Poured in
     the direction of the words, never uniformly — a flat wash is a dimmer,
     and it would cost the photograph the dynamic range it was chosen for.

  Round 2 (Oct 2026) amends two of these:

  - **Exception 2 extends to the hung magazine covers** on the homepage
    (`.sf-hp-cover__print`): a print's shadow and a champagne hairline. They
    are hung prints, like the plate.
  - **Exception 4 is cut back on the homepage.** Its three coats sat 93–98%
    black over the middle of the frame, where the client stands, and she
    asked for her figure to be visible. On the homepage hero
    (`.sf-nocturne--home`) the scrim is now a feather on the black field's
    edge plus thin header and floor bands; her figure carries no coat. The
    lab hangs keep the original.

  Anything else with depth is a bug. If a fifth exception is ever wanted, it
  gets added here first.
- Any accent colour other than champagne
- All-caps serif, or serif in a button
- Champagne body text on a light ground
- Icon sets — the only glyphs are `↗ ↓ ← →`. *Exceptions (client-requested):
  the About value icons (`ValueIcon`) and the homepage client icons
  (`ClientIcon`) — bespoke, single-weight, currentColor.*
- Boxed section containers or carded layouts. *Exception (client round 2,
  Oct 2026): the homepage's service and journal cards — sharp-cornered,
  image-led, no borders.*
- The numbered chapter rule as every section's device. *About (client
  round 2, Oct 2026) drops `Chapter` entirely. Its sections open on a kicker
  or a plain heading, and only the Way principles keep numerals. On other
  pages the chapter rule stays, used where it earns its place.*
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
