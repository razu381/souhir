# `/editorial` — Editorial Recognition

The press salon: stats, covers, and the archive of published features.

| | |
| --- | --- |
| File | `src/app/editorial/page.tsx` |
| Rendering | Static, `revalidate = 600` |
| Data | `getHomeData()` (press stats) + `PRESS_FEATURES` (tag `press`, try/catch → empty) |
| Metadata | title "Editorial Recognition", fixed description |

## Sections in order

| # | Section | Component | Content source |
| --- | --- | --- | --- |
| 01 | **Title band** | `PageTitle` | "(Editorial Recognition)" · "Where Vision *Earns Recognition.*" · intro = press statement |
| 1 | The salon | `PressSalon` (`chapter={1}`) | stats spine (15+/100+/8+) + the three home covers (same component as home §07) |
| 02 | The Archive | inline covers grid | `pressFeature` documents — **renders only when features exist** |
| — | Closing card | `ClosingCard` | seed CTA |

The archive renders each cover at 3:4 (600×776 CDN crop) with its caption —
`Cover Feature — {publication}, {date}` when no custom caption. Staggered
entrances repeat every three covers (`(i % 3) * 90` delay).

## Editing

- **Stats + salon covers** come from the home document's *Press* group (stats)
  — the salon's three covers are seed plates until replaced (they are not
  studio-fed yet).
- **The archive** is pure `pressFeature` documents: publication, date, caption,
  optional external link, cover image (alt required). Nothing shows until the
  first feature is published — see studio-guide → *Press*.

## Notes

- Features without a cover image are skipped (a blank frame is worse than a
  missing row).
- The archive refreshes via the `press` tag webhook within seconds.
