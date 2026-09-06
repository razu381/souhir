# Dar SF — Site Documentation

Reference documentation for the client-editable site: Next.js 16 (App Router) +
Sanity v6 + Tailwind v4, deployed on Netlify. Start here.

| Document | What it covers |
| --- | --- |
| [overview.md](overview.md) | Stack, repo layout, rendering model, seed fallback, data flow, forms, deploy, env vars, known quirks |
| [design-system.md](design-system.md) | The CSS system — layers, tokens, grounds, class contract, motion contract, plate ratios |
| [content-model.md](content-model.md) | Sanity schema reference — every document type, section types, queries, tags, webhook mapping |
| [studio-guide.md](studio-guide.md) | Editor's guide — how to create and edit every piece of content, and where it lands on the site |

## Page documentation (`pages/`)

Every route, one file each: sections in order, which component renders it,
where its content comes from, and how it is edited.

| Page | Doc |
| --- | --- |
| `/` — The Nocturne home | [pages/home.md](pages/home.md) |
| `/about` — The Language of Presence | [pages/about.md](pages/about.md) |
| `/services` + `/services/[slug]` | [pages/services.md](pages/services.md) |
| `/portfolio` + `/portfolio/[slug]` (case studies) | [pages/portfolio.md](pages/portfolio.md) |
| `/journal` + `/journal/[slug]` (articles) | [pages/journal.md](pages/journal.md) |
| `/editorial` — press recognition | [pages/editorial.md](pages/editorial.md) |
| `/contact` — correspondence | [pages/contact.md](pages/contact.md) |

## The one rule worth memorising

**The site renders with zero content and zero configuration.** Every section
falls back to the seed (`src/content/seed.ts` — the Nocturne home page, verbatim)
when its Sanity documents don't exist. Publishing a document takes that section
over. A broken or missing fetch degrades to seed, never to an error page.
