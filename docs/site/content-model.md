# Content model (Sanity reference)

Schema source: `src/sanity/schemas.ts`. Desk layout: `src/sanity/config.ts`.
The studio lives at `/studio` (embedded, dynamic route).

## Documents at a glance

| Type | Desk name | Feeds |
| --- | --- | --- |
| `home` (singleton) | Home page | home sections' copy + images |
| `siteSettings` (singleton) | Site settings | footer, contact email, socials |
| `workItem` | Work items | home §06 hang + `/portfolio` grid |
| `caseStudy` | Case studies | `/portfolio/[slug]` |
| `journalArticle` | Journal | home §08 + `/journal` + `/journal/[slug]` |
| `service` | Services | home §03 rows + `/services` + `/services/[slug]` |
| `pressFeature` | Press | `/editorial` archive |
| `message` | Correspondence | form submissions (never rendered publicly) |

Plus seven reusable **section types** (below) used inside `caseStudy.sections`
and `service.chapters`.

## Field reference

### `home` — one document, id `home`
Hero: `heroTitleA`, `heroTitleB`, `heroLabelMeta`, `heroImage` (2:3 crop, alt
required). Explore: `exploreStatement`, `exploreFelt`, `exploreImage`. 
Clientele: `clientele[]` (`label`, `description`). Founder: `founderImage`,
`founderRefrain`, `founderTexts[]`, `founderFelt`, `founderName`,
`founderRole`. Work: `workStatement`. Press: `press { heading, statement,
stats[]{figure, label} }`. Journal: `journalStatement`, `journalSub`.
Interlude: `interludeImage`, `interludeQuote`, `interludeAttribution`.
Newsletter: `newsHeading`, `newsText`. CTA: `ctaImage`, `ctaHeading`,
`ctaText`.
Everything is optional — any omitted field keeps its seed value.

### `siteSettings` — one document, id `siteSettings`
`tagline`, `contactEmail`, `socials[]{label, href}`.

### `workItem`
`title`, `image` (alt required), `category` (radio: hospitality / beauty /
wellness / editorial / lifestyle — the filter rail's tokens), `ratio`
(std 4:3 · tall 4:5 · square 1:1), optional `caseStudy` reference — **adding
the reference is what makes the tile clickable** and it then shows in the
`/portfolio` case-study register too.

### `caseStudy`
`title`, `slug`, `category`, `tagline`, `publishedAt`, `heroImage` (16:9 crop),
`overview` (portable text), `sections[]` (composable, see below),
`projectDetails { industry, projectType, services[], location }`,
`closingQuote { quote, attribution }`. These types match the dataset's
pre-existing documents **field-for-field — never rename**.

### `journalArticle`
`title`, `slug`, `category`, `excerpt`, `publishedAt`, `heroImage` (16:9),
`body` (portable text; may embed `image` blocks with captions and a
`closingQuote`). Ordering is `publishedAt desc`: the four newest articles
fill the register rows (no featured slot).

### `service`
`num` (01–04), `title`, `slug`, `summary`, `tile` (4:5), `chapters[]` (the
detail page's sections). When any `service` documents exist they replace the
seed's four entirely (ordered by `num`).

### `pressFeature`
`publication`, `date`, `caption`, `url`, `cover` (3:4, alt required). Feeds
`/editorial`'s archive only — the home salon's three covers come from `home`'s
stats section + seed until replaced.

### `message` (written by the forms, read in Correspondence)
`kind` (`contact` | `newsletter`), `name`, `email`, `message`, `createdAt`.

## Section types (shared by case studies and services)

Every section renders as a numbered chapter (`sf-chapter` + body). Types:

| Type | Layout |
| --- | --- |
| `richSection` | prose paragraphs (portable text) |
| `pillarSection` | `pillars[]{title, description}` → three-column pillar grid |
| `listSection` | `items[]` → hairline register list |
| `resultsSection` | `results[]{figure, label}` → stat grid; trailing `+`s are stripped and re-set as champagne italics automatically |
| `gallerySection` | `images[]` → two-up (three-up with `layout: 'three'`) |
| `plateSection` | single `image` + `caption`, full-bleed (2000w) or inset (1100w) by `width` |
| `quoteSection` | pull quote banner (`quote`, `attribution`) |

Sections whose `_type` starts with `interlude` are rendered but **skip
numbering** (they're breaths, not chapters).

## Queries and cache tags (`src/sanity/queries.ts`, `fetch.ts`)

| Query | Tag(s) | Used by |
| --- | --- | --- |
| `HOME` | `home` | `getHomeData()` |
| `WORK_ITEMS` | `work`, `home` | home hang |
| `PRESS_FEATURES` | `press`, `home` | editorial archive |
| `SERVICES` | `services`, `home` | service rows/pages |
| `SERVICE` | `services` | `/services/[slug]` chapters |
| `SETTINGS` | `settings` | layout footer, contact page |
| `INDEX` | `work` | portfolio case-study register |
| `CASE_STUDY` / `CASE_STUDY_SLUGS` | (on-demand) | `/portfolio/[slug]`, sitemap |
| `ARTICLE` / `ARTICLE_SLUGS` | (on-demand) | `/journal/[slug]`, sitemap |

## Revalidation

Publish webhook → `POST /api/revalidate`:

- Projection: `{ _type, "slug": slug.current }`
- Trigger on: create, update, delete
- Header: `x-sanity-webhook-secret: <SANITY_REVALIDATE_SECRET>`
- Auth failures return 401; malformed bodies 400.

Type → tag mapping (`route.ts`): `home→[home]`, `workItem→[work, home]`,
`caseStudy→[work]`, `journalArticle→[journal, home]`, `service→[services,
home]`, `pressFeature→[press, home]`, `siteSettings→[settings]`.

## Seed fallback rules

`getHomeData()` resolves **per section**: Sanity rows win only when non-empty;
otherwise the seed value renders. Tile/plate images fall back per-item. The
journal section mixes types (articles query, then `home` singleton for
statement/sub, then seed). Detail pages have **no** seed — a case study or
article page is 404 until its document exists.
