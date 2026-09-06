# `/portfolio` + `/portfolio/[slug]` (case studies)

The mixed-ratio hang of work, and the full case-study write-ups.

## `/portfolio` — the collection

| | |
| --- | --- |
| File | `src/app/portfolio/page.tsx` |
| Rendering | Static, `revalidate = 600` |
| Data | `getHomeData()` (work items) + `INDEX` query (tag `work`, try/catch → empty) |
| Metadata | title "Portfolio", fixed description |

| # | Section | Component | Content source |
| --- | --- | --- | --- |
| 01 | **Title band** | `PageTitle` | "(Selected Works)" · "Selected *Works.*" · intro = work statement |
| 01 | The Collection (noir) | `WorkGrid` | the hang + filter rail (same component as home §06) |
| 02 | Case Studies (noir) | journal-register markup | one hairline row per `caseStudy` ("The *Write-Ups.*") — **renders only when case studies exist** |
| — | Closing card | `ClosingCard` | seed CTA |

### The hang

CSS multicol (1 / 2 / 3 columns at 768 / 1025+), `break-inside: avoid`, mixed
ratios (`std` 4:3, `tall` 4:5, `square` 1:1 — the ratio field decides). The
filter rail is tracked caps with `aria-pressed` state; filtering is a single
`is-filtered` class per tile and the columns reflow. Tiles are links only when
the work item references a case study.

## `/portfolio/[slug]` — a case study

| | |
| --- | --- |
| File | `src/app/portfolio/[slug]/page.tsx` |
| Rendering | SSG from the dataset (`CASE_STUDY_SLUGS` on `useCdn: false`); on-demand for anything missed; `revalidate = 600` |
| Data | `CASE_STUDY` query, tag `work` via webhook |
| Metadata | `title` + `tagline` from the document |

**No seed** — a case study page exists only when its document exists (404
otherwise).

Structure, top to bottom:

1. **Title band** — label `(Case Study — {category})`, title (first word
   upright), tagline as intro.
2. **Hero plate** — 16:9, 2000w, `fetchPriority="high"`.
3. **Overview** — chapter 01, prose (portable text).
4. **Sections** — the composable blocks (rich / pillars / list / results /
   gallery / plate / quote), auto-numbered; interludes skip numbers.
5. **Project details** — the plaque (industry / type / services / location),
   numbered as the last chapter.
6. **Closing quote** — full-width pull, then the *All Work* button.

## Editing

- The hang: **Work items** (ratio + category + optional case-study link).
- The write-ups: **Case studies** — see studio-guide.md for the section blocks.
- The case-study register on `/portfolio` (and the home hang) refresh via the
  `work` tag webhook within seconds of publishing.
