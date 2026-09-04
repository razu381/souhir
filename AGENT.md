# AGENT.md — Dar SF

Build instructions for any agent or developer working in this repo.
Read alongside [`DESIGN-DIRECTION.md`](./DESIGN-DIRECTION.md), which is the visual authority. This file is the **technical** authority. Where they appear to conflict, the design doc wins on *what it looks like*, this file wins on *how it is built*.

---

## 1. The governing constraint

> **We build a static HTML / Tailwind / vanilla-JS site now. It is rebuilt in Elementor later.**

Everything below exists to make that second step cheap. The static build is not a throwaway prototype and it is not the final product — it is a **reference implementation whose CSS and JS ship unchanged into WordPress**, with only the markup rebuilt in Elementor's UI.

That single fact drives three non-negotiable rules:

### Rule 1 — Style by class, never by structure

Elementor injects its own wrapper `<div>`s around and inside everything. Any selector that depends on the DOM shape will break.

```css
/* ❌ breaks the moment Elementor wraps it */
.sf-hero > div > h1 { … }
.sf-services .row:first-child { … }
.sf-card + .sf-card { … }

/* ✅ survives any wrapper Elementor adds */
.sf-hero__title { … }
.sf-service-row { … }
.sf-card { … }
```

**Every visual outcome must be reachable by putting one class name in Elementor's "CSS Classes" field.** No `>`, no `+`, no `~`, no `:first-child` / `:nth-child` on anything that will become a separate Elementor element. Descendant selectors (`.sf-hero .sf-hero__title`) are fine — they tolerate wrappers.

### Rule 2 — Two-level section anatomy, always

This is Elementor's own model, so match it exactly:

```html
<section class="sf-section sf-hero" id="hero">   <!-- full-bleed, sets ground colour -->
  <div class="sf-container">                      <!-- max-width 1440, gutters -->
    …content…
  </div>
</section>
```

`.sf-section` → Elementor **Container, Full Width**.
`.sf-container` → nested Elementor **Container, Boxed**.

Never more than these two structural levels before content. Never use `100vw` for full-bleed (scrollbar overflow) — `.sf-section` is a block element and is already edge-to-edge.

### Rule 3 — JS must be idempotent and re-runnable on any subtree

Elementor's editor destroys and rebuilds DOM nodes live. Every init function takes a root and refuses to double-bind:

```js
export function initReveal(root = document) {
  root.querySelectorAll('[data-sf-reveal]:not([data-sf-init])').forEach((el) => {
    el.setAttribute('data-sf-init', '');
    // …bind here
  });
}
```

Behaviour is attached via **`data-sf-*` attributes**, never by tag or position — so in Elementor it is added through the widget's Attributes field. The WordPress bridge is then one file:

```js
jQuery(window).on('elementor/frontend/init', () => {
  elementorFrontend.hooks.addAction('frontend/element_ready/global', ($el) => initAll($el[0]));
});
```

---

## 2. Stack

| Layer | Choice | Notes |
|---|---|---|
| Markup | Semantic HTML5 | `<section>`, `<article>`, `<figure>`, real headings in order |
| CSS | **Tailwind v4**, CSS-first config | Compiled to one static `dist/sf.css` that WordPress enqueues verbatim |
| JS | **Vanilla ES modules**, no framework | Bundled to one IIFE `dist/sf.js`. No React, no Vue, no jQuery dependency in our own code |
| Motion | `IntersectionObserver` + CSS transitions | See §5 — GSAP only with justification |
| Images | `<picture>` + `srcset`, webp first | See §6 |
| Fonts | Self-hosted `woff2` | See §4 |

**No** Bootstrap, no component libraries, no CSS-in-JS, no runtime that requires a build step in production.

---

## 3. Tailwind — utilities are a build-time tool, not a shipped artifact

This is the crux of Elementor compatibility. **Utility classes must not end up in Elementor.** Nobody is typing `flex items-end gap-6 pb-24 tracking-[0.16em]` into a CSS Classes field, and Tailwind's preflight fights Elementor's reset.

So: use Tailwind freely while authoring, but **collapse every component into a semantic class** in the components layer.

```css
/* src/css/components.css */
@layer components {
  .sf-chapter-header {
    @apply flex items-baseline justify-between w-full pt-8 pb-6;
    border-top: 1px solid var(--hairline);
  }
  .sf-chapter-header__label { @apply text-label uppercase; letter-spacing: .16em; }
  .sf-chapter-header__num   { @apply text-label; color: var(--champagne-deep); }
}
```

The Elementor rebuild then only needs `sf-chapter-header` on a container. **That is the deliverable.**

### Config — CSS-first, preflight excluded

```css
/* src/css/main.css */
@layer theme, base, components, utilities;

@import "tailwindcss/theme.css"     layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
/* preflight deliberately NOT imported — Elementor supplies its own reset */

@import "./tokens.css";
@import "./base.css";
@import "./components.css";

@theme {
  /* breakpoints aligned to Elementor — see below */
  --breakpoint-md: 768px;
  --breakpoint-lg: 1025px;
  --breakpoint-xl: 1367px;
}
```

### Breakpoints must match Elementor's, exactly

Elementor's default breakpoints are **max-width** based: Mobile ≤767, Tablet ≤1024, Laptop ≤1366. Tailwind is min-width. To make the conversion 1:1 rather than a re-tuning exercise, our min-width values are Elementor's max **+1**:

| Tailwind | Value | Elementor device |
|---|---|---|
| *(base)* | ≤767 | Mobile |
| `md:` | ≥768 | Tablet |
| `lg:` | ≥1025 | Desktop |
| `xl:` | ≥1367 | Widescreen / Laptop+ |

**Do not use Tailwind's stock 640 / 1280 / 1536.** Any layout tuned at a breakpoint Elementor does not have will need rebuilding by hand.

### Naming

`sf-` prefix, BEM-flavoured, lowercase-hyphen: `.sf-hero`, `.sf-hero__title`, `.sf-hero--dark`. The prefix prevents collisions with Elementor, the active theme, and plugin CSS.

---

## 4. Tokens

`src/css/tokens.css` holds the `:root` custom properties from `DESIGN-DIRECTION.md` §03. **This file is the single source of truth for colour, type, spacing, and motion**, and it maps 1:1 onto Elementor's Global Colors and Global Fonts at conversion time.

- Colours → Elementor **Global Colors** (`--noir`, `--champagne`, …)
- Fonts → Elementor **Global Fonts** (Display / Structural)
- Spacing and motion → **stay in CSS**; Elementor has no global spacing scale, so section rhythm lives in `.sf-section` variants, never in Elementor's padding controls

Never hard-code a hex, a duration, or a section gap anywhere but `tokens.css`.

**Fonts:** self-hosted `woff2`, `font-display: swap`, preload the display cut only, subset Latin + Latin-Ext. Declare `@font-face` once in `base.css`; in WordPress this moves to the child theme, unchanged.

---

## 5. Motion

Default to **`IntersectionObserver` + CSS transitions**, driven by tokens. The LCP budget (§7) does not have room for a 70 KB animation library used for fades.

```html
<div data-sf-reveal="curtain" data-sf-delay="90">
```

Permitted `data-sf-reveal` behaviours: `curtain` (clip-path image reveal), `lines` (headline mask-up), `words` (grey→ink paragraph), `fade-up`.
Other behaviours: `data-sf-marquee`, `data-sf-rotate`, `data-sf-transition`.

**GSAP / ScrollTrigger is permitted only for the hero sequence and page transitions, and only if vanilla genuinely cannot do it.** Justify it in the PR before adding it.

Every behaviour must no-op under `prefers-reduced-motion: reduce` — reveals become instant, marquees and rotation stop. Build that into the shared init, not per-module.

JS sets **CSS custom properties**, not inline geometry:

```js
el.style.setProperty('--sf-progress', p);   // ✅ CSS owns the visual
el.style.transform = `translateY(${y}px)`;  // ❌ fights Elementor's own transforms
```

---

## 6. Images

Ratios are fixed by `sorted/` and are a layout contract — see `DESIGN-DIRECTION.md` §08.

- Enforce ratio with `aspect-ratio`, never padding-top hacks (Elementor handles `aspect-ratio` cleanly; padding hacks break in its containers)
- `<picture>` with webp first, jpg fallback, at `480 / 800 / 1200 / 1800w`
- Sources in `sorted/` are 5000–10500px wide — **nothing raw ever reaches the browser.** Processed output goes to `assets/`
- Hero image: `fetchpriority="high"`, preloaded, never lazy. Everything below the fold: `loading="lazy" decoding="async"`
- Placeholder is a flat `--noir` block, so a slow load still looks intentional

---

## 7. Budgets

| Metric | Budget |
|---|---|
| LCP (4G, mid-tier mobile) | **< 2.5 s** |
| CLS | **< 0.05** — every image and embed has a reserved ratio box |
| CSS shipped | **< 60 KB** gzipped |
| JS shipped | **< 25 KB** gzipped (excluding GSAP if ever justified) |
| Lighthouse a11y | **100** |

Full-bleed photography on every section makes LCP the governing metric of this project. Treat a regression as a build failure.

---

## 8. Accessibility — non-negotiables

- **`#CDB190` on light grounds is decorative only** (~1.9:1). Use `--champagne-deep` for champagne text on white, and only for labels. Full champagne is safe on `--noir` (~9:1).
- Heading order never skips a level. The oversized display wordmark is not automatically an `<h1>` — mark up by meaning, size with CSS.
- Focus states are visible everywhere: 1px champagne ring on noir, `--champagne-deep` on light. Never `outline: none` without a replacement.
- Marquees and the rotating badge are `aria-hidden` decorative; their content exists as real text elsewhere.
- All motion respects `prefers-reduced-motion`.
- Contrast is checked before a section is called done, not at the end of the project.

---

## 9. Repo layout

```
├── AGENT.md                   ← this file
├── DESIGN-DIRECTION.md        ← visual authority
├── src/
│   ├── index.html             ← composed homepage
│   ├── sections/              ← one standalone file per section
│   │   ├── 01-hero.html
│   │   └── …
│   ├── css/
│   │   ├── main.css           ← entry (imports below)
│   │   ├── tokens.css         ← :root — single source of truth
│   │   ├── base.css           ← @font-face, element defaults
│   │   └── components.css     ← @layer components — the shipped classes
│   ├── js/
│   │   ├── main.js            ← initAll orchestrator
│   │   └── modules/           ← reveal.js, marquee.js, …
│   └── fonts/
├── assets/                    ← processed, web-ready images
├── dist/                      ← sf.css + sf.js, enqueued verbatim by WP
├── sorted/                    ← source images (never shipped)
└── docs/
```

---

## 10. Section-by-section workflow

We are building **one section at a time**. A section is done when all of the following exist:

1. `src/sections/NN-name.html` — renders standalone *and* composes into `index.html` unchanged
2. Its classes in `components.css`, semantic and Elementor-ready per §1 Rule 1
3. Any behaviour as a `data-sf-*` module in `src/js/modules/`, idempotent per §1 Rule 3
4. Verified at all four breakpoints (§3)
5. Contrast and focus states checked (§8)
6. A short note in `docs/elementor-map.md` — which container / widget each part becomes

Do not start the next section until the current one passes all six. Do not build ahead of the design doc; if a section needs a decision the design doc does not make, ask rather than invent.

---

## 11. Elementor conversion map

Maintained in `docs/elementor-map.md`, one row per component, filled in as we go.

| Our construct | Becomes in Elementor |
|---|---|
| `.sf-section` | Container — Full Width, ground colour from Global Colors |
| `.sf-container` | Nested Container — Boxed, max 1440 |
| `.sf-chapter-header` | Container + two Heading widgets, class on the container |
| Display headline | Heading widget, Global Font "Display", class for tracking / leading |
| Body copy | Text Editor widget, Global Font "Structural" |
| Outline button | Button widget + `.sf-btn` |
| `<picture>` responsive | Image widget with the ratio class, or Container background |
| Portfolio / journal grid | Loop Grid on the `work` / `journal` CPT |
| `data-sf-*` behaviour | Widget → Advanced → Attributes |
| Chapter numerals, filters | Static widgets or ACF-driven, not hard-coded per page |

**Content model (WordPress):** CPTs `work`, `journal`, `editorial`; a taxonomy for the six portfolio filters; ACF blocks mirroring §06 of the design doc so sections stay composable rather than duplicated per page.

---

## 12. Anti-patterns

- ❌ Utility-class soup in shipped markup — collapse to a semantic class (§3)
- ❌ Structural selectors: `>`, `+`, `~`, `:first-child` across section boundaries (§1)
- ❌ More than two structural levels before content (§1)
- ❌ `100vw`, negative-margin full-bleed hacks, `padding-top` ratio hacks
- ❌ Hard-coded hex values, durations, or gaps outside `tokens.css`
- ❌ Tailwind's stock breakpoints
- ❌ JS that binds on load only, or that cannot re-run on a subtree
- ❌ JS writing inline geometry instead of custom properties
- ❌ Raw `sorted/` images referenced directly
- ❌ Rounded corners, shadows, gradients, glows — see `DESIGN-DIRECTION.md` §09
