# `/about` — More Than A Studio

The client's final About copy (`SF_Muse_Website_Copy_Shorter_Updated.docx`,
ABOUT PAGE), verbatim and in its order, on the homepage's frame: a black
hero, then rooms alternating D7 Champagne and D8 Sable, the footer black.

| | |
| --- | --- |
| File | `src/app/about/page.tsx` |
| Styles | `src/app/sf/about.css` (scoped to `.sf-about*`) + the shared walls in `rooms.css` |
| Rendering | Static |
| Data | `src/content/about.ts` — no Sanity document yet |
| Plates | `images/SF images  new/About page /` → `npm run assets:about` → `public/assets/about/` |
| Metadata | title "About", description = the hero's third line |

## Sections in order

| # | Section | Ground | Content |
| --- | --- | --- | --- |
| — | **Hero** | noir | "More Than A Studio. *A Philosophy Of Experience.*" · three lines · `About_Hero.jpg` (4:5) |
| 01 | **Founder Story** | champagne | "Where strategy becomes *desire*" · "The Language of Presence" · five paragraphs · `Founder_Story.jpg` (sticky, left) |
| 02 | **The Philosophy** (`#philosophy`) | sable | two-line statement · two paragraphs · `Philosophy.jpg` (right) |
| 03 | **The SF Muse way** | champagne | creed (word reveal) · six numbered principles, 3 × 2 |
| 04 | **The SF Muse Difference** | sable | "Designing What *Cannot Be Seen*" · "How should people feel?" at display scale |
| 05 | **The Vision** | champagne | one sentence, word reveal |
| 06 | **Our Values** | sable | six values with the client's icon set (`ValueIcon.tsx`) |
| — | **Closing** | champagne | `ClosingCard` (no rule) · two paragraphs · "Start a Conversation" → /contact |

## Notes

- The values icons follow the client's mock-up the copy's note points to
  (`docs/assets/dar-sf/image21.png`): king → Strategic Elegance, heart →
  Emotional Intelligence, diamond → Timeless Aesthetics, nib → Elevated
  Experiences, star → Visionary Innovation, column → Authentic Presence.
- The homepage's "Explore Our Philosophy" links to `/about#philosophy`.
- Bodoni Moda draws dashes as sub-pixel hairlines at display sizes;
  WordReveal marks a lone dash `.sf-w--dash` so the Vision sentence can give
  it a 1px stroke.
