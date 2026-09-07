# `/` — The Nocturne (home)

The full Nocturne one-pager, section by section, now studio-fed.

| | |
| --- | --- |
| File | `src/app/page.tsx` |
| Rendering | Static, `revalidate = 600` |
| Data | `getHomeData()` — tags `home`, `work`, `journal`, `services`, `press` |
| Studio | `home` singleton + `workItem` + `journalArticle` + `service` |

## Sections in order

| # | Section | Component | Content source |
| --- | --- | --- | --- |
| 01 | **Hero — the Nocturne** | `HeroNocturne` | `heroTitleA/B`, `heroLabelMeta`, `heroImage`; note + sub-line are seed-fixed |
| — | header sentinel | `<span data-sf-header-sentinel>` | triggers the header's solid ground |
| 02 | Explore Dar SF (bone) | `Explore` | statement (word-reveal), felt line, spa plate, `Fig. 02` caption, → `/about` |
| 03 | Services (bone) | `ServicesList` | 4 rows from `service` docs (num, tile, title, summary) → `/services/[slug]` |
| 04 | Who We Work With (noir) | `Clientele` | headline, statement (word-reveal), 7 register rows |
| 05 | About Dar SF (bone) | `Founder` | hands-pockets plate, refrain, 2 texts, felt line, signature, name/role, → `/about` |
| 06 | Selected Works (noir) | inline chapter + `WorkGrid` | statement + 6 plates from `workItem` docs; filter rail |
| 07 | Editorial Recognition | `PressSalon` | stats (15+/100+/8+) + 3 covers + shared caption |
| 08 | The Journal | `JournalIndex` | masthead, 4 register rows — the newest essays, hairline rows → `/journal/[slug]` |
| — | Interlude | `Interlude` | 6.4:1 corridor band + founder quote |
| 09 | Correspondence | `NewsletterSection` | **the guest register** — one bone correspondence card centred on the umber night (wordmark · property line · heading · pitch · ruled entry line · pill · fine print), lamplight pooling from above; **newsletter form** |
| — | Closing card | `ClosingCard` | 6.4:1 lounge band, closing line, → `/contact` |

Chapter numerals `02…09` are the system's spine — the components carry them.

## Interactions

- **Hero decode gate**: entrance starts only when the image has decoded (or
  after a 600ms budget → `is-instant` skip). Title lines rise, the rail draws,
  the print settles from `scale(1.05)`. Transform-only (LCP element);
  `fetchPriority="high"`.
- **WordReveal** statements (explore, clientele): scroll-linked per-word ink.
- **Work filter rail**: `aria-pressed` buttons, All + five categories; plates
  hide via `is-filtered`; the grid is CSS multicol so filtering reflows.
- **Reveal** entrances everywhere, staggered by `--sf-delay`.

## Editing

See studio-guide.md → *Home page*, *Work items*, *Journal*, *Services*.
Per-section seed fallback: publishing any one document takes over exactly its
section.

## Notes

- Journal rows link to `/journal/[slug]` only when the article has a slug;
  seed rows are intentionally unlinked. (No featured slot — the newest
  article is simply the first row; see d3202ba→next for the removed lead.)
- Seed work item `06.2` links to `/portfolio/velocity-noir`, which 404s until
  that case study exists (only visible while seed plates render — see
  overview.md → Known quirks).
