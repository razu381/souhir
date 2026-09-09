# Premium Scroll Choreography + Custom Pointer — GSAP + ScrollTrigger + Lenis (rev. 2)

**Decisions:** GSAP + ScrollTrigger · Lenis on choreographed routes only · journal deck-peek stack · §05 curtain reveals · custom pointer. House tokens stay authoritative; JS writes state, CSS owns looks; every effect has reduced-motion + no-JS final-state paths.

## 1. Dependencies & infrastructure

**Install (pinned):** `gsap@^3.13` (CustomEase free only from 3.13), `@gsap/react`, `lenis`.

### NEW `src/components/sf/animation/gsap.ts`
Client-only: `gsap.registerPlugin(ScrollTrigger, CustomEase)` (+ `useGSAP` per the installed `@gsap/react` README's instruction) and `CustomEase.create('sf', 'M0,0 C0.16,1 0.3,1 1,1')` — the SVG-path form of the token curve, cross-referenced to tokens.css `--ease`. **Ease policy:** scrubbed tweens use `ease: 'none'` (the reader's hand is the easing; `scrub: 1` supplies the catch-up glide); the `sf` ease is for time-driven tweens only (cursor, entrances). The §05 addendum states this plainly — no token-fidelity claim on scrubbed effects.

### NEW `src/components/sf/animation/SmoothScroll.tsx` (null-render, once in `layout.tsx`)
- **Route allowlist — Lenis exists only where choreography exists:** `/`, `/home-v1…v5`, `/editorial`, `/journal`. Everything else (`/about`, `/journal/[slug]`, `/contact`, `/hero-lab`, `/studio`) native. `usePathname()` drives init/destroy across boundary crossings.
- **Config:** `duration ≈ 1.15` easeOutQuart-ish, `smoothWheel: true`, `syncTouch: false`, `wheelMultiplier: 1`. Not initialized under `prefers-reduced-motion: reduce`.
- **GSAP wiring:** `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t * 1000))` + `lagSmoothing(0)`.
- **Navigation discipline:** on push navigations `lenis.scrollTo(0, { immediate: true })` so `animatedScroll` can't desync from Next's scroll-to-top; on popstate let Next restore, then resync to `window.scrollY` immediately. Pathname-change `ScrollTrigger.refresh()` + one rAF-deferred second refresh.
- **Menu lock:** `MutationObserver` on `<html>` (overflow toggled by the header menu) → `lenis.stop()/start()`, callback guarded by the live instance and observer torn down with Lenis.
- **Hash links:** delegated, same-document anchors only; `lenis.scrollTo(hash, { offset: -<header clamp> })` so targets clear the fixed header. Cross-page `/path#id` links stay native and are resynced by the navigation rule.
- `ScrollTrigger.refresh()` on `document.fonts.ready` + window `load`; `config({ ignoreMobileResize: true })`; confirm no `scroll-behavior: smooth` anywhere.

## 2. Press covers — scrubbed deck deal

### NEW `src/components/sf/PressCovers.tsx` (client)
`PressSalon` stays server-side and renders `<PressCovers covers sharedCaption />` — which means **`/editorial` gets the deal too (conscious yes)**; its separate Archive covers block (`editorial/page.tsx:51`) keeps plain Reveal. Covers render without `Reveal` (its CSS transition fights per-frame scrub). `useGSAP` + `gsap.matchMedia`:
- ≥1025px: ScrollTrigger on `.sf-press__covers`, `top 90% → top 32%`, `scrub: 1`, `ease: 'none'`, ~0.12 stagger timeline — all three cards from one shared pile origin (down-right), rotations +8°/−5°/+11°, opacity in the first 20% of each sub-range, settling onto the existing `--b/--c` margin layout.
- <1025px: same poses, shorter travel.
- Deck pose set only in JS pre-paint — SSR/no-JS render the dealt layout. Reduced-motion: no trigger.
- Labs (`/home-v*`) inherit automatically via `variant.tsx`.

## 3. Journal — sticky stack, deck peek

### NEW `src/components/sf/JournalStack.tsx` (client, children passthrough)
`JournalIndex` wraps `.sf-journal__index` in it — zero row markup changes; scope + scrub live in the wrapper. Renders on `/journal` too (conscious yes; rows are `slice(0,4)` in `fetch.ts` — 4 cards everywhere).
- **CSS (site.css),** under `(min-width: 1025px) and (prefers-reduced-motion: no-preference)`: Reveal wrappers `position: sticky; top: calc(var(--stack-top) + var(--sf-i) * 14px)`, `--stack-top: clamp(5.5rem, 12vh, 8rem)`, `--sf-i` via `nth-child`. Sheets opaque via **`background: var(--stack-sheet, var(--bone))`** — tokenized because the home-lab variants change journal grounds (V2 = paper); wash `::after` uses the same var. Existing hairline `border-top` reads as the covering edge. Modest index runway padding.
- **Recede:** per card except last, ScrollTrigger on the next card (`top bottom → top top+offset`, `scrub: 1`, `ease: 'none'`) tweens `--sf-p: 0→1`; CSS: `scale(calc(1 - var(--sf-p,0)*.04))`, `transform-origin: top center`, flat wash at `opacity: calc(var(--sf-p,0)*.45)`.
- <1025px and reduced-motion: today's flat list. No-JS: sticky works, `--sf-p` defaults 0.

## 4. Curtain image reveals (§05)

`Reveal.tsx` + `curtain` prop → `data-sf-reveal="curtain"`. `components.css`: figure `clip-path: inset(0 0 100% 0)` → `inset(0)`, inner `img` `scale(1.08)→1`, `--dur-slow` + `--ease`, honors `--sf-delay`; reduced-motion forces open. Applied to Explore + Founder figures only (this pass).

## 5. Custom pointer — isolated and droppable by design

### NEW `src/components/sf/animation/CustomCursor.tsx` (null-render, once in `layout.tsx`)
- Hairline ring (~30px, 1px) + 4px dot as **direct `<body>` children**; `gsap.quickTo` transforms — dot ~0.1s, ring ~0.45s. **Invariant: nothing ever transforms/filters/will-changes `<html>`/`<body>`** (blend + fixed depend on it; Lenis uses native scroll, so it holds).
- `--paper` + `mix-blend-mode: difference` (white on noir, near-ink on bone). **Perf gate:** FPS measured on a scroll pass before sign-off; documented fallback = drop the blend, ground-aware ring color sampled from the section under the pointer.
- States via delegated `pointerover/out` on `a, button, [data-sf-cursor]`: hover → ring ~56px + the system's ↗ glyph; `pointerdown` → ×0.9; window exit → fade. State changes at `--dur-micro`/`--ease`.
- **Gates:** `(pointer: fine)` AND `prefers-reduced-motion: no-preference` AND not `/studio`; **both matchMedia conditions get `change` listeners** (OS toggles / device docking re-evaluate live, no reload). Native cursor hidden via JS-added `sf-cursor` class only; `input/textarea/select` keep native I-beam. **Kill-switch:** `Escape` removes `sf-cursor` for the session and restores the native cursor. `:focus-visible` outlines untouched.

## 6. Files

| File | Change |
|---|---|
| `package.json` | + `gsap@^3.13`, `@gsap/react`, `lenis` |
| `src/components/sf/animation/gsap.ts` | NEW — registration, `sf` path-ease, ease policy |
| `src/components/sf/animation/SmoothScroll.tsx` | NEW — route-allowlisted Lenis, nav/hash/menu rules |
| `src/components/sf/animation/CustomCursor.tsx` | NEW — ring + dot, gates, kill-switch |
| `src/components/sf/PressCovers.tsx` | NEW — scrubbed deal |
| `src/components/sf/JournalStack.tsx` | NEW — recede scrub wrapper |
| `src/components/sf/Reveal.tsx` | + `curtain` prop |
| `src/components/sf/HomeSections.tsx` | PressSalon → PressCovers; JournalIndex → JournalStack; curtain ×2 |
| `src/app/layout.tsx` | mount SmoothScroll + CustomCursor |
| `src/app/sf/site.css` | sticky stack block (+`--stack-sheet`), cursor chrome |
| `src/app/sf/components.css` | curtain variant |
| `DESIGN-DIRECTION.md` | §05 addendum: GSAP/Lenis/cursor recorded as decisions; scrub effects are hand-driven (`ease: 'none'`), tokens govern timed motion |

## 7. Verification

Desktop pass on `/` (dev server, this workspace's port from `/tmp/next-dev.log` — currently 3001): deal completes by upper-third, cards scrub with lag; journal pins with 14px peek + recede; cursor follows/expands/↗, I-beam over newsletter input, Escape restores native; menu locks scroll; same-page hash glides with header offset. **Ripple pages:** `/editorial` (deal + untouched Archive), `/journal` (4-card stack), one `/home-v*`. **Boundaries:** route-change scroll reset + back/forward resync; `/about` + `/journal/[slug]` fully native (no Lenis); `/studio` untouched by Lenis and cursor; reduced-motion → all final-state + native cursor; mobile width → flat journal, shorter deal, no cursor; console clean (known `sf-js` note only). **Perf gate:** scroll-pass FPS with blend cursor before sign-off.