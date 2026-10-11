# `/` — SF Muse (home)

The homepage on the client's final copy, revised after her round-2 feedback
(Oct 2026). Plan: `docs/plans/11-homepage-round-2.md` (local); decisions:
`DECISION-LOG.md`; type and colour rules: `DESIGN-DIRECTION.md` §02 / §03 / §09.

| | |
| --- | --- |
| File | `src/app/page.tsx` → `src/components/sf/HomeRooms.tsx`, `HomeNewsletter.tsx` |
| Styles | `src/app/sf/home.css`, scoped to `<main class="sf-homepage">` |
| Rendering | Static, `revalidate = 600` |
| Data | `getHomeData()` — tags `home`, `work`, `journal`, `services`, `press` |
| Studio | `home` singleton + `workItem` + `journalArticle` + `service` |

## Sections in order

Grounds alternate warm ivory and charcoal below the black hero; deep brown is
used once (the founder). Image sides alternate down the page.

| # | Section | Ground | Component | Content source |
| --- | --- | --- | --- | --- |
| — | **Hero** | black | `HeroNocturne` (`backdrop` + `sf-nocturne--home`) | statue-shadow photograph, full-bleed, her figure clear of any overlay; seed-pinned plate (`/assets/home/hero-*`) |
| 01 | Explore SF Muse | ivory | `HomeExplore` | ONE photograph (studio wall, 4:5, left); heading, lead (word-reveal), two paragraphs |
| 02 | What We Create | charcoal | `HomeServices` | "What We Create" as the headline (the doc gives no other, or an intro, since its Services update); four visual cards (photo, numeral, title, summary, Learn More) → `/services#<slug>` |
| 03 | Who We Work With | ivory | `HomeClients` | 3-column grid: heading + statement span two cells, seven categories with line icons (`ClientIcon`) |
| 04 | About SF Muse | brown | `HomeFounder` | portrait, refrain, sentence, her signature (`/assets/home/signature-*`), name/role, → `/about#philosophy` |
| 05 | Selected Works | ivory | `HomeWork` → `WorkGrid` | statement + five projects; filters with no project are hidden |
| 06 | Editorial Recognition | charcoal | `HomePress` | statement + three covers in one row, captioned publication / issue |
| 07 | The Journal | ivory | `HomeJournal` | masthead, one featured article, three cards; every card links |
| — | Quote | photograph | `HomeQuote` | colonnade + founder quote, cover only behind the words |
| 08 | Newsletter | charcoal | `HomeNewsletter` | no photograph; heading, text, labelled email field, Subscribe |
| — | Closing invitation | photograph | `ClosingCard` (image) | the lounge at night (brightened in the bake) → `/contact` |

Chapter numerals `01…08` come from `src/content/chapters.ts`.

## Interactions

- **Hero decode gate**: the entrance starts once the image decodes (or after
  600ms → `is-instant`). Title lines rise from a mask that clips vertically
  only, so long words are never cut sideways.
- **WordReveal** on the Explore lead: scroll-linked per-word ink.
- **Work filter rail**: `aria-pressed` buttons; only categories with at least
  one project are shown. From two columns up each project is a subgrid, so
  titles, paragraphs and credits align across a row.
- **Cards** (services, journal): the whole card is the link; image settles
  on hover, the arrow nudges; visible focus ring.
- **Reveal** entrances everywhere, staggered by `--sf-delay`.

## Editing

See studio-guide.md → *Home page*, *Work items*, *Journal*, *Services*.
Per-section seed fallback: publishing any one document takes over exactly its
section.

## Notes

- **Journal images are pinned.** The copy asks the homepage to use the
  Journal page's images, so for the four articles it names the preview uses
  the Journal-delivery image by title even when the studio article carries
  its own (the studio's are still round-1 photos). A new article keeps its own.
- **Journal links**: a card links to `/journal/<slug>` when the studio article
  exists, otherwise to `/journal`. `/journal/<slug>` answers 404 (not 500) when
  Sanity has no such article or cannot be reached.
- The hero, Explore, service, signature and journal plates are baked by
  `scripts/home-assets.mjs` (`npm run assets:home -- home/<prefix>`).
