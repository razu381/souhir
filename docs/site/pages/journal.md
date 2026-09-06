# `/journal` + `/journal/[slug]` (articles)

The contents page and the essays.

## `/journal` — the index

| | |
| --- | --- |
| File | `src/app/journal/page.tsx` |
| Rendering | Static, `revalidate = 600` |
| Data | `getHomeData()` — articles query (tags `journal`, `home`) + `home` statement/sub |
| Metadata | title "The Journal", fixed description |

| # | Section | Component | Content source |
| --- | --- | --- | --- |
| 01 | **Title band** | `PageTitle` | "(The Journal)" · "Ideas, Atmosphere & *Creative Intelligence.*" · intro = journal statement |
| 08 | The Journal | `JournalIndex` | masthead → 4:5 **lead** (newest article, links through) → register rows (next 3) → *Explore The Journal* (self-link) |
| — | Closing card | `ClosingCard` | seed CTA |

With no articles, the seed's four essay entries render (lead unlinked). The
numeral `08` is the home page's chapter number travelling with the component —
see overview.md → Known quirks.

## `/journal/[slug]` — an article

| | |
| --- | --- |
| File | `src/app/journal/[slug]/page.tsx` |
| Rendering | SSG from the dataset (`ARTICLE_SLUGS` on `useCdn: false`); `revalidate = 600` |
| Data | `ARTICLE` query; refreshes via the `journal` tag webhook |
| Metadata | `title` + `excerpt` from the document |

**No seed** — no document, no page.

Structure: **title band** (label `(The Journal — {category ?? Essay})`; a title
starting with "The " keeps *The* upright; the numeral slot shows the date, e.g.
`12 March 2026`, en-GB) → **hero plate** (16:9, 2000w, high priority) → the
**article** (`sf-prose--article`, centred measure, portable text) → *The
Journal* button.

Inside the body, two embedded block types render as their own devices:

- `image` → a 3:2 plate (1400w) with optional `Fig.`-style caption
- `closingQuote` → a full-width pull quote with attribution

## Editing

Write in **Journal** (studio-guide → *Journal*). Order is `publishedAt desc`:
to feature an older essay as the lead, back-date the newer one or unpublish it.
The home page's journal statement/sub come from the `home` document.
