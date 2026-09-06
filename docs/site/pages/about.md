# `/about` — The Language of Presence

The founder's story and the studio's register, re-using the home page's
founder and clientele movements in a quieter arrangement.

| | |
| --- | --- |
| File | `src/app/about/page.tsx` |
| Rendering | Static, `revalidate = 600` |
| Data | `getHomeData()` (founder + clientele) + seed (interlude, CTA) |
| Metadata | title "About", fixed description |

## Sections in order

| # | Section | Component | Content source |
| --- | --- | --- | --- |
| 01 | **Title band** | `PageTitle` | "(About Dar SF)" · "The Language *of Presence.*" · intro = founder `texts[1]` |
| — | header sentinel | `HeaderSentinel` | |
| 05 | About Dar SF (bone) | `Founder` | same component/fields as home §05 |
| 04 | Who We Work With (noir) | `Clientele` | same as home §04 |
| — | Interlude | `Interlude` | seed corridor band + quote (not yet studio-fed here) |
| — | Closing card | `ClosingCard` | seed CTA |

## Interactions

Same vocabulary as home: word-reveal statement in the clientele register,
reveal entrances, hero band → solid header via the sentinel.

## Editing

Fully covered by the **home page document** (Founder + Clientele groups) —
there is no separate "about" document. Editing the founder section on home
changes it here too; that is by design: one story, told twice.

## Notes / quirks

- The section numerals render `05` then `04` — they travel with the
  components (home numbering). Accept as signature or thread numbers through
  as props (overview.md → Known quirks).
- The interlude and closing card here read from `seed.ts`, not the `home`
  document — if the client wants them editable on inner pages, swap the seed
  imports for `data.interlude` / `data.cta`.
