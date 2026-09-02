# souhir

Maison SF / Dar SF — a luxury creative studio prototype: cinematic, editorial, noir.
Static HTML + Tailwind v4 (CSS-first, no preflight) + vanilla JS, architected for a
1:1 WordPress + Elementor rebuild (class-only selectors, custom-property-driven JS,
progressive enhancement via `.sf-js`).

## Design directions

Three complete hero directions, each carrying the same five sections in its own voice:

| Direction | Page | Section 05 treatment |
| --- | --- | --- |
| The Spread — paper, the double-page print | `src/hero-threshold.html` | the rail |
| The Exhibition — noir gallery, Fig. plates | `src/hero-exhibition.html` | the signature |
| The Overture — the night film, champagne | `src/hero-overture.html` | the wide plate |

A comparison index lives at `src/index.html`.

## Structure

- `src/` — pages, CSS (`tokens` / `base` / `components`), JS modules
- `assets/` — optimized webp/jpg plates (built by `scripts/build-images.sh` from
  `images/` + `sorted/`, which are **not** in the repo)
- `dist/` — build output (`sf.css`, `sf.js`, fonts); self-contained so a clone
  previews immediately
- `scripts/` — image pipeline + bundler
- `AGENT.md`, `DESIGN-DIRECTION.md` — system rules and art direction
- `Maison-SF.mapped.md` — the client brief, mapped

## Commands

```sh
npm run build:css     # Tailwind v4 → dist/sf.css
npm run build:js      # esbuild bundle → dist/sf.js
bash scripts/build-images.sh   # ffmpeg pipeline → assets/ (requires images/ + sorted/)
```

## Preview

Any static file server rooted at the project, e.g.:

```sh
npx serve .           # then open /src/index.html
```
