# SF Muse — Project Memory

What someone (or an agent) needs to know before touching this repo. The
reasons behind decisions live in [`DECISION-LOG.md`](DECISION-LOG.md); the
design system lives in [`DESIGN-DIRECTION.md`](DESIGN-DIRECTION.md); the
per-route docs live in [`docs/site/`](docs/site/README.md).

_Last updated: 2026-10-12 (homepage round 2 deployed; About round 2 and the Services page update still local; Services redesign planned)_

---

## The project

- **Client:** Souhir Fhima, founder and creative director of **SF Muse**. The
  studio was called **Dar SF** until Oct 2026; older files (`README.md`,
  `DESIGN-DIRECTION.md`, `Dar-SF*.md`, `docs/plans/`) still use that name.
- **The site:** a luxury creative studio, meant to feel "cinematic, editorial,
  immersive, minimal, refined". It has seven pages: Home, About, Services,
  Portfolio, Journal, Editorial and Contact.
- **Live:** https://darsfsouhir.netlify.app. Netlify auto-deploys `main` from
  GitHub `razu381/souhir`, so a push to `main` is a deploy.
- **Stack:** Next.js 16 App Router (Turbopack) and React 19, with Sanity and an
  embedded studio at `/studio`. Every section falls back to
  `src/content/seed.ts` when Sanity has no document for it.

## Sources of truth

| What | Where | Notes |
|---|---|---|
| Copy | `SF_Muse_Website_Copy_Services_Updated.docx` (repo root, **not committed**; it isn't git-ignored, so stage files by name) | The final copy. Since 2026-10-11 it replaces `SF_Muse_Website_Copy_Shorter_Updated.docx`, which older comments still name; only the Services copy differs. **The design follows the doc**, not the reverse. Text that isn't in the doc gets removed. The doc ends with developer notes. |
| Photos | `images/SF images  new/<Page>/` (gitignored) | Folder names contain a **double space and trailing spaces**. Where she supplied two photos for one slot, **they are alternatives: use one**. |
| Baked images | `public/assets/<page>/` | Made by `scripts/home-assets.mjs` (`npm run assets:home`, `assets:about`, `assets:services`). |
| Design system | `DESIGN-DIRECTION.md` | Written in Aug 2026 as "Dar SF", with addenda since. §02 holds the client's reference text setting. |
| Design references | `inspirations/` | Two template homepages (Horizon / Refresh studio). The client wants the **ideas** adapted into an original design, not copied. |
| Review labs | `/hero-lab`, `/hero-lab-v2`, `/home-lab`, `/home-v1` … `/home-v5` | Internal pages, not indexed, which the client sometimes reviews. |
| Signature | `images/SF images  new/Home page /ChatGPT Image May 13, 2026 at 08_02_28 PM.png` | Her supplied signature, byte-identical to `images/souhir-fhima-neon-signature.png`. It is a **transparent PNG** of champagne strokes; the grey "wall" some viewers show is hidden colour under alpha 0. Use it directly: the bake only crops and resizes it (`public/assets/home/signature-*`), and refills it in bronze for About's ivory (`public/assets/about/signature-ink-*`). Never drop its alpha and key it. |

## Where things stand (2026-10-12)

**Live now:**
- The homepage on the final copy, with champagne and sable walls, a black hero, footer and menu.
- About and Services rebuilt from the doc. Their content is **in code**
  (`src/content/about.ts`, `services.ts`), not in Sanity.
- `/services/<slug>` retired with 308 redirects to `/services#<slug>`.
- **Homepage round 2** (14 points plus a supplementary note), deployed
  2026-10-12 in `7ae9439`, with the What We Create part of the Services copy
  update and her signature used directly. The plan is
  `docs/plans/11-homepage-round-2.md` (local only, git-ignored); build notes
  are in `DECISION-LOG.md` ("Round 2 built"). The site-wide parts (footer,
  Bodoni weights, Selected Works captions, the journal 404) went with it.
  - Homepage files: `src/components/sf/HomeRooms.tsx`, `HomeNewsletter.tsx`,
    `ClientIcon.tsx`, `Lines.tsx` and `src/app/sf/home.css`.
  - Images: `public/assets/home/{hero,explore-studio,service-card-*,signature,journal-card-*}`.

**Also built locally:** the client's About feedback (2026-10-09, 10 points
plus a colour flow). The plan is `docs/plans/12-about-round-2.md` (local
only); the build notes are in `DECISION-LOG.md` ("About round 2 built").
It's not committed. The homepage it builds on is live now.
- About shares the homepage's rooms through `:is(.sf-homepage, .sf-about)`
  in `home.css` §1. **That scope is only in the working copy:** the deployed
  `home.css` says `.sf-homepage`, because on the round-1 About the shared
  rules would have blanked its walls. Commit the `:is()` with About.
- New About images: `public/assets/about/{hero-mobile,signature-ink,closing}`.

**Also built locally (2026-10-11):** the `/services` half of the client's
Services copy update (the new doc): new hero and intro text and three
packages with starting rates per service, set as a rate card. See
`DECISION-LOG.md` 2026-10-11. Not committed. (The homepage half is live.)
Until it ships, the homepage's first two cards ("The Art of Brand Presence",
"Creative Direction & Identity") land on the old titles on `/services`.

**Planned:** the client's Services feedback (2026-10-09, points 1–4 and 6–8,
plus a colour note). The plan is `docs/plans/13-services-round-2.md` (local
only, git-ignored). Nothing is built yet. It shares the room move with the
About plan, and it owns the footer redesign (point 8). Its service anatomy
must now carry the packages (see the note at the top of the plan).

**Waiting on the client:**
- Her Instagram and LinkedIn profile URLs. The footer links to the platforms' homepages until then.
- The original high-resolution hero photo (the delivery is 1920×1080).
- A brighter, less strip-shaped image for the closing "Let's Create Something Worth Remembering" banner.
- ~~A photo for the Services "Elevate" step.~~ No longer needed: the
  redesigned Method uses icons, not photos (2026-10-10).
- Optionally, colour versions of the four "What We Create" photos.
- Which photos she means by "approved colour versions".
- Which photo goes in the About closing panel (Q8).
- Whether the footer should be charcoal or black (Q9).
- Services: whether a point 5 is missing (Q10), whether the closer can reuse
  the doc's CTA copy (Q11), and whether the Lumière mockup is the interface
  she means (Q12).

**Known issues:**
- **The live site doesn't reach Sanity.** It renders seed content everywhere,
  and the Netlify environment variables are probably missing (DECISION-LOG
  Q7). Locally, Sanity has four journal articles whose pages render.
  `/journal/<slug>` now returns 404 rather than 500 when Sanity can't answer
  (fixed locally, not yet deployed).
- The favicon returns 404.
- `theme-color` is still umber `#1F1A17`.
- Netlify injects a "Powered by Netlify" badge and an HTML comment into every page.
- The Sanity CLI and MCP connection need re-authentication.

## Working agreements

- Commit and push only with explicit approval. A push to `main` deploys.
- **The GitHub repo is public.** `MEMORY.md` and `DECISION-LOG.md` (client
  discussions) have never been committed; ask before committing them.
- Write to Sanity (documents or assets) only with explicit permission.
- Never read `.env.local` or credentials.
- Keep the copy docx and its `.~lock…#` file out of git.
- Don't stop the developer's dev server on `:3000`. Kill processes by PID, never
  with `pkill -f` patterns, which can match the command doing the killing.
- Record important decisions and client discussions in `DECISION-LOG.md`, and
  keep this file's status section current.

## Gotchas

- **Netlify edits `<head>`.** It injects a newline and a comment, which breaks
  React hydration (#418) for any inline `<head>` script. Inline scripts go in
  `<body>` (see `src/app/layout.tsx`).
- **Headless-Chrome profiles inside the repo break Turbopack.** A `chr-*`
  profile directory makes every route return 500. Run screenshot tooling from
  outside the repo.
- **Builds alongside dev are fine.** `npm run build` while `next dev` runs works
  (dev uses `.next/dev`). Afterwards restore with `git checkout -- next-env.d.ts`.
- **Image bake rules.** Never upscale. Crop to the ratio the layout renders,
  around a focal point. The supplied banners are 6–9:1 strips, so each one
  needs separate desktop and mobile crops. Check a file's alpha channel
  before treating what you see as its background: some viewers draw the
  hidden colour under transparent pixels (the signature, 2026-10-11).
- **Turbopack serves stale CSS for `@import`ed files.** After editing
  `tokens.css`, `base.css` or `components.css` (imported through
  `globals.css`), the dev server can keep serving the old rules, even after a
  restart. Stop it, `rm -rf .next/dev`, and start it again. Production builds
  are not affected.
- **Headless Chrome needs `Page.bringToFront`.** With a fresh profile, a
  component extension's background page takes the default tab, so the page
  stays `visibilityState: hidden` and gets no animation frames. Screenshots
  then stall at random. Send `Page.bringToFront` (and focus emulation) after
  enabling `Page`. Review against a production build (`next build` and
  `next start -p 3101`) for reliable captures, with `prefers-reduced-motion`
  emulated to get final states.
