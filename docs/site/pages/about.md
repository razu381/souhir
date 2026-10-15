# `/about` — More Than A Studio

The client's final About copy (`SF_Muse_Website_Copy_Shorter_Updated.docx`,
ABOUT PAGE), verbatim and in its order, in the round 2 presentation
(client feedback, 2026-10-09). The plan is `docs/plans/12-about-round-2.md`
(local only). The grounds follow her colour flow, on the homepage's round 2
rooms.

| | |
| --- | --- |
| File | `src/app/about/page.tsx` |
| Styles | `src/app/sf/about.css` (scoped to `.sf-about*`). The rooms' grounds and colour roles are shared from `src/app/sf/home.css` §1 through `:is(.sf-homepage, .sf-about)` |
| Rendering | Static |
| Data | `src/content/about.ts`, with no Sanity document yet |
| Plates | `images/SF images  new/About page /` (and one Contact file) → `npm run assets:about` → `public/assets/about/` |
| Metadata | title "About"; description = the hero's third line |

## Sections in order

| Section | Ground | Composition |
| --- | --- | --- |
| **Hero** | charcoal | Words at the left: "More Than / A Studio." with the italic champagne second voice "A Philosophy / Of Experience.", the lead and two paragraphs. `About_Hero.jpg` bleeds off the right edge from below the header's line (square plate; 4:5 on phones) |
| **Founder Story** (`#founder-story`) | warm ivory | Kicker and "Where strategy / becomes desire" across the top. Below it, the portrait (`Founder_Story.jpg`, delivered black-and-white) and the story share one row height, ending in her signature (`signature-ink`) and "Souhir Fhima — Founder & Creative Director" |
| **The Philosophy** (`#philosophy`) | charcoal | `Philosophy.jpg` bleeds off the left edge at its own 3:4, never cropped. The statement and two paragraphs sit on the charcoal panel beside it |
| **The SF Muse Way** (`#the-sf-muse-way`) | warm ivory | Heading and intro in a masthead on one baseline, then six principles 3 × 2, rows aligned by subgrid |
| **The SF Muse Difference** | deep brown | A compact centred statement: kicker, secondary heading, a short champagne rule, the lead, "How should people feel?" (italic, ivory) |
| **The Vision** | warm ivory | Heading in the left column; the sentence at reading size to the right. Static text (no scroll-linked word reveal) |
| **Our Values** | warm ivory | Heading in the left column; six values 2 × 3, icon at the left (`ValueIcon.tsx`), rows aligned by subgrid |
| **Closing** | deep brown | "Let's Create Something / *Worth Remembering*", two paragraphs and "Start a Conversation" → /contact, beside a 4:5 photo panel bleeding right (`closing`, provisional: DECISION-LOG Q8) |

## Notes

- **No `Chapter` on this page.** Her point 9 asked that the numbered label and
  hairline stop being every section's device. Only the Way principles keep
  numerals, because the doc numbers them.
- **Italics appear three times:** the hero's second voice, the question and
  the closer.
- **Display type is set at `font-variation-settings: "opsz" 30`.** Bodoni's
  automatic optical size thins the hairlines at display sizes, which made the
  W and V arms vanish ("W ay", "V ision").
- **The values icons follow the client's mock-up** (`docs/assets/dar-sf/image21.png`):
  - king → Strategic Elegance
  - heart → Emotional Intelligence
  - diamond → Timeless Aesthetics
  - nib → Elevated Experiences
  - star → Visionary Innovation (redrawn as the mock-up's faceted four-point
    star)
  - column → Authentic Presence
- **The homepage's "Explore Our Philosophy"** links to `/about#philosophy`.
- **The Vision's em dash** is wrapped in `.sf-about-dash` and given a 1px text
  stroke. Bodoni Moda draws dashes as sub-pixel hairlines.
