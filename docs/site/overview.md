# Project overview

## What this is

The Dar SF website — a luxury creative studio site in the "cinematic, editorial,
noir" design language. It began as a static HTML + Tailwind prototype (four hero
directions); the chosen direction, **The Nocturne**, was frozen at prototype
commit `7a7bced` and ported 1:1 into this Next.js app, where every section the
client sees can be edited in an embedded Sanity studio.

The prototype itself was removed from the repo when the app was promoted to the
repo root; it remains viewable in git history at commits ≤ `7a7bced`.

## Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16.3.4, App Router, Turbopack | `params` is a Promise in RSC pages; `revalidateTag(tag, 'max')` is the two-arg form |
| UI | React 19, server components by default | Client components exist only where interaction demands it (header/menu, filters, hero decode gate, forms, reveal observers) |
| CMS | Sanity v6, embedded studio at `/studio` | Desk mirrors the site, not the schema dump |
| Styling | Tailwind v4 (CSS-first) + the ported design system | Preflight deliberately off; see design-system.md |
| Deploy | Netlify (free tier) | `netlify.toml` at repo root; base directory: none |
| Email/forms | None — submissions become `message` documents in Sanity | The client reads correspondence in the same studio |

## Repo layout

```
src/
  app/                 routes (see pages/*.md), plus:
    sf/                the ported design system CSS (tokens/base/components) + site.css (new styles)
    api/revalidate/    Sanity publish webhook target
    studio/            the embedded Sanity studio (dynamic)
    actions.ts         the single server action behind both forms
  components/sf/       the site's component library (all ports of prototype modules)
  content/seed.ts      seed content — the Nocturne, verbatim, with Plate/Head types
  sanity/              client, config (desk), schemas, queries, fetch (data layer), writeClient
public/
  assets/              exactly the images the seed references (webp only)
  fonts/               Bodoni Moda + Inter Tight woff2 (latin + latin-ext)
  brand/               the brand mark (reserved for favicon/OG work)
netlify.toml           build config + required env vars
DESIGN-DIRECTION.md    the design system's founding document (§01–§10)
Dar-SF.md / Dar-SF.mapped.md   original client brief and content mapping
docs/site/             this documentation
docs/plans/            build plans (local-only, gitignored)
```

## Commands

```bash
npm install
npm run dev        # localhost:3000 · studio at /studio
npm run build      # production build (works with ZERO env vars — seed mode)
npm start          # serve the production build
```

## Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | public | Sanity project (read) |
| `NEXT_PUBLIC_SANITY_DATASET` | public | usually `production` |
| `SANITY_API_WRITE_TOKEN` | server only | **create-only** token; the forms write `message` docs. Never `NEXT_PUBLIC_*`. |
| `SANITY_REVALIDATE_SECRET` | server + webhook | shared secret with the GROQ webhook |
| `NEXT_PUBLIC_SITE_URL` | public | canonical origin for metadata/sitemap |

Missing env vars never break the build: `src/sanity/client.ts` constructs
against an inert placeholder and every fetch is guarded (`safeFetch` checks the
env first and returns null → seed fallback).

## Rendering model

- Every page is **static** with `revalidate = 600` (sitemap: 3600; `/contact`
  is fully static; `/studio` and `/api/revalidate` are dynamic).
- Detail routes (`/portfolio/[slug]`, `/journal/[slug]`, `/services/[slug]`)
  prerender via `generateStaticParams` from their slug queries; pages not
  prerendered fall back to on-demand rendering and cache.
- Publishing in the studio fires the GROQ webhook → `POST /api/revalidate` →
  `revalidateTag`. Worst case without a webhook: content goes live within 600s.

## The seed fallback (the architecture's spine)

`getHomeData()` (`src/sanity/fetch.ts`) fetches each home feed independently
(home singleton, work items, press, services, articles) and maps Sanity rows to
the exact shapes `seed.ts` uses. Any feed that comes back empty — because the
documents don't exist yet, or Sanity is unreachable — falls back to seed. So:

1. Fresh clone, no `.env.local` → the complete Nocturne home renders.
2. Client publishes a `home` document → those fields take over.
3. Client adds `workItem` documents → the work hang swaps from seed plates to
   studio plates; each gains a link when a `caseStudy` is attached.

The journal section is the one place with cross-type logic: the **newest
`journalArticle` by publish date becomes the lead**; the next three become the
register rows. With no articles, the seed's four essay entries render.

## Forms

Both forms (`NewsletterSection` on home, `ContactForm` on `/contact`) submit to
one server action (`src/app/actions.ts` → `submitMessage`) which:

1. drops honeypot submissions silently (the hidden `company` field),
2. validates the email,
3. creates a `message` document (`kind`: `contact` | `newsletter`).

If `SANITY_API_WRITE_TOKEN` is absent the form reports "the letterbox is not
connected" and offers the mailto address — never a dead failure.

## SEO

- Title template: `%s — Dar SF`; default title and description in `layout.tsx`.
- Each page sets its own title/description; detail pages derive them from the
  document (`title` + `tagline`/`excerpt`).
- `sitemap.xml`: the 7 static routes + all case-study and article slugs.
- `robots.txt`: allows everything except `/studio` and `/api`; sitemap linked.
- **Not yet done**: favicon and per-page Open Graph images (brand mark is in
  `public/brand/`, ready for this pass).

## Deploy checklist

1. Netlify: base directory **empty** (repo root is the app), build `npm run build`.
2. Set the five env vars above.
3. Sanity: create the write token + webhook (see content-model.md §Revalidation).
4. Dataset CORS: allow the production domain.
5. Push → verify the seed/studio swap on the staging URL → client training →
   domain cutover.

## Known quirks (worth a look in the visual pass)

- **Chapter numerals travel with components.** `Founder` always renders chapter
  `(About Dar SF) 05` and `Clientele` `(Who We Work With) 04`; on `/about` they
  appear in that order (05 then 04). Likewise `JournalIndex` shows numeral `08`
  on `/journal`. Faithful to the home page's numbering, but odd on inner pages —
  either accept as a signature or thread numbers through as props.
- **One seed work item links to a case study that doesn't exist yet**
  (`06.2 Velocity Noir` → `/portfolio/velocity-noir`). It only renders when the
  dataset has **no** `workItem` documents; either add that case study or null
  the href in `seed.ts` (line ~178).
- Journal/article images assume 16:9 hero plates and 3:2 inline images — the
  Sanity CDN crops to fit, so very tall sources get centre-cropped.
