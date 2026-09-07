# The design system

How the CSS works, what React is allowed to do, and the contracts that keep the
port 1:1 with the prototype.

## File layout

| File | Role |
| --- | --- |
| `src/app/globals.css` | Entry. Tailwind v4 (CSS-first, `@tailwindcss/postcss`). Declares the layer order and pulls in the three ported files. |
| `src/app/sf/tokens.css` | Design tokens — colours, type scale, spacing, durations, easings. **Verbatim port** of the prototype @ `7a7bced`. |
| `src/app/sf/base.css` | Scoped reset + `@font-face` (Bodoni Moda display, Inter Tight sans; latin + latin-ext). Only change from the prototype: font URLs lead with `/`. |
| `src/app/sf/components.css` | The shipped `sf-*` component classes. **Verbatim port.** |
| `src/app/sf/site.css` | New styles written for the multi-page site (menu overlay, inner-page title band, long-form article styles, form states, glue). ~400 lines. |

**Rule: don't edit `tokens/base/components` casually** — they are the audited
port; the diff against `7a7bced` is the fidelity proof. New styles go in
`site.css`. (One deliberate divergence: the journal §08 featured lead was
removed post-port — after a brief cinemascope redesign — so the section
runs masthead → register only; its old `sf-journal__lead*` styles were
removed from `components.css`.)

## Layers and breakpoints

- Layer order: `theme, base, components, utilities`. Base sits in the declared
  `base` layer — unlayered, its `a { color: inherit }` would outrank every
  component colour at any specificity (the button-hover bug from the prototype).
- Breakpoints are pinned: **768 / 1025 / 1367**. Never Tailwind's stock
  640 / 1280 / 1536.
- No preflight. The system carries its own scoped reset.

## Grounds

The system speaks three grounds, set by section modifier classes:

| Ground | Class suffix | Use |
| --- | --- | --- |
| Noir (near-black) | `--nocturne` | dark sections: clientele, work, press, journal, news |
| Umber (warm near-black) | the hero + interlude/cta bands | the Nocturne's wall |
| Bone (warm paper) | `--bone` | light sections: explore, services, founder |

Text colours (`--paper`, `--bone`, `--ink`, `--graphite`) and the champagne
accent are ground-aware in the components; never hard-code greys.

## The class contract (what React may do)

React components carry **only** class names and CSS custom properties the
stylesheet already understands. All visual outcomes live in CSS. The JS-owned
state vocabulary is small and closed:

| Hook | Set by | Effect |
| --- | --- | --- |
| `.sf-js` on `<html>` | inline script in `layout.tsx` | gates every hidden initial state — no JS, page renders complete |
| `is-ready` / `is-instant` on the hero root | `HeroNocturne.tsx` decode gate | starts the entrance; `is-instant` skips it (slow decode > 600ms budget or reduced motion) |
| `is-scrolled` on `.sf-header` | sentinel IntersectionObserver | solid noir ground once the opening band leaves the viewport |
| `is-revealed` on `[data-sf-reveal]` | `<Reveal>` wrapper | opacity/translate entrance, staggered via `--sf-delay` |
| `is-filtered` on `.sf-work__item` | `WorkGrid` rail | `display: none` — the whole filter effect |
| `--sf-p` / `--sf-i` / `--sf-n` | `WordReveal` (words.js port) | scroll-linked per-word colour mix on statement paragraphs |

If you need a new behaviour, extend this vocabulary in `site.css` — don't
inline styles in components.

## Motion

- Durations/easings are tokens (`--dur-micro/base/slow/hero`, `--ease`).
- The hero is the LCP element: its image animates **transform only** — opacity
  or clip-path would delay LCP by the animation's length.
- `prefers-reduced-motion: reduce` collapses every animation to its final
  state, handled centrally in the ported files plus per-module overrides.
- The word-by-word statement ramps each word over 1/8 of total scroll progress
  (`clamp((p·n − i)·8, 0, 1)`); without `color-mix` support it degrades to
  plain ink.

## Plates (the image contract)

Images are plain `<img>` elements — **webp only**, no `<picture>` fallbacks —
always with `width`/`height` (aspect-ratio reservation), `srcSet`/`sizes` where
it matters, `loading="lazy"` below the fold, `fetchPriority="high"` on heroes.

| Ratio | Where |
| --- | --- |
| 2:3 | hero print, explore plate, founder plate (Sanity-cropped to these) |
| 4:3 / 4:5 / 1:1 | work hang (std / tall / square) |
| 3:4 | press covers, journal register thumbs |
| 4:5 | service tiles |
| 3:2 | article inline images |
| 6.4:1 | interlude + CTA letterbox bands |

Sanity images are cropped at the CDN: `urlFor(img).width(w).height(h)
.fit('crop').auto('format').quality(80)` (`sanityPlate()` in `fetch.ts`).
`height: auto` on grid images is load-bearing — without it the width/height
attributes pin the box and defeat `aspect-ratio`.

## Recurring devices

- **Chapter header** (§06, the signature): `.sf-chapter` — full-width hairline,
  tracked-caps label left, numeral right (`--bronze` on light grounds).
- **Mixed-Didone headings**: `Head = [before, em]` — the felt half in italic
  (`<Headed>` in `HomeSections.tsx`; `splitHead()` splits editor strings at the
  last sentence break).
- **Outline button**: `.sf-btn` — the one rounded form in the system; on light
  grounds hover fills noir (champagne proved unreadable at label size).
- **Plate captions**: `Fig. NN — Title` museum labels.
- **PageTitle band** (`site.css`): every inner page opens on a dark umber band
  so the transparent header stays legible; `HeaderSentinel` sits right after it
  and triggers the header's solid ground.
