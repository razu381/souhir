# Dar SF

Luxury creative studio — "cinematic, editorial, noir." The client-editable site:
**Next.js 16 (App Router) + Sanity v6 + Tailwind v4**, deployed on Netlify.

## Quickstart

```bash
npm install
npm run dev        # http://localhost:3000  ·  Studio at /studio
```

`.env.local` (see `netlify.toml` for the production equivalents):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` | public read access |
| `SANITY_API_WRITE_TOKEN` | create-only token — the contact/newsletter forms write `message` documents; never expose client-side |
| `SANITY_REVALIDATE_SECRET` | shared secret for the Sanity → `/api/revalidate` webhook |
| `NEXT_PUBLIC_SITE_URL` | canonical origin for metadata/sitemap |

## How it works

- **Seed fallback.** `src/content/seed.ts` carries the full Nocturne home page verbatim. Every section renders Sanity content when its documents exist and the seed when they don't — a fresh clone with zero documents still renders the complete site. The client's first publish takes over, section by section.
- **Embedded studio.** `/studio` (Sanity desk; schemas in `src/sanity/schemas.ts`). Content model: `home`, `siteSettings`, `service`, `workItem`, `caseStudy`, `journalArticle`, `pressFeature`, `message`.
- **Tag-based revalidation.** Fetches are tagged (`home`, `work`, `journal`, …); publishing fires a GROQ webhook → `POST /api/revalidate` → `revalidateTag`.
- **Design system.** The prototype's CSS lives on verbatim in `src/app/sf/` (`tokens` / `base` / `components`, ported at prototype freeze `7a7bced`) plus `site.css` for menu, inner pages, long-form and forms. React components carry only class names and the custom-property contract (`is-ready`, `is-revealed`, `--sf-delay`, `--sf-p`, …) — the stylesheet owns every visual outcome. `DESIGN-DIRECTION.md` is the system spec; the retired static prototype remains viewable in git history (see commits ≤ `7a7bced`).

## Deploy

Netlify reads `netlify.toml` at the repo root (base directory: none). Set the environment variables above in the Netlify UI, configure the Sanity GROQ webhook (`x-sanity-webhook-secret` header → `/api/revalidate`), and allow the production domain in the dataset's CORS settings.
