# `/services` + `/services/[slug]`

The disciplines catalogue and each discipline's detail page.

## `/services` — the index

| | |
| --- | --- |
| File | `src/app/services/page.tsx` |
| Rendering | Static, `revalidate = 600` |
| Data | `getHomeData()` (services) + `seed.serviceProcess` |
| Metadata | title "Services", fixed description |

| # | Section | Component | Content source |
| --- | --- | --- | --- |
| 01 | **Title band** | `PageTitle` | "(Services)" · "What We *Create.*" |
| 01 | The Disciplines (bone) | `ServicesList` | the 4 service rows (num · tile · title · summary), each → detail |
| 02 | The Process (noir) | inline clientele-register markup | `seed.serviceProcess` — six steps, split on ` — ` into label + description |
| — | Closing card | `ClosingCard` | seed CTA |

The six-step process ("Six Steps. *Every Time.*") is **fixed copy**, not
studio content — it's the studio's discipline statement (DESIGN-DIRECTION §07).

## `/services/[slug]` — a discipline in full

| | |
| --- | --- |
| File | `src/app/services/[slug]/page.tsx` |
| Rendering | SSG via `generateStaticParams` (seed slugs ∪ Sanity services — new services are picked up automatically), `revalidate = 600` |
| Data | `getHomeData()` (row meta) + `safeFetchService(slug)` (chapters, tag `services`) |
| Metadata | from the service document (`title`, `summary`) |

Structure: **title band** (label `(Service 01)`; the title's first word stays
upright, the rest italic) → **chapters** from the studio (`chapters[]`, rendered
by `SectionBlock` with automatic numbering) → **the process register** (seed's
six steps, numbered as the final chapter) → *All Services* button → **closing
card**.

## Editing

- Rows and detail chapters: **Services** documents (studio-guide → *Services*).
- Publishing the first `service` replaces the seed's four — have all four
  ready; keep slugs stable to preserve URLs.
- The process register cannot be edited in the studio (deliberate).

## Notes

- With no `service` documents, all four detail pages render from seed rows with
  empty chapter lists — the process register closes the page.
- Services have no per-item body fields other than chapters; the summary line
  doubles as the detail page's intro.
