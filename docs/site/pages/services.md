# `/services`

The disciplines, each in full, on one page. The per-service detail pages
(`/services/[slug]`) are retired — see *Retired detail pages* below.

## `/services` — Shaping Perception Through Experience

The client's final Services copy (`SF_Muse_Website_Copy_Shorter_Updated.docx`,
SERVICES PAGE), verbatim and in its order, on the homepage's frame: a black
hero, then rooms alternating D7 Champagne and D8 Sable, the footer black.

| | |
| --- | --- |
| File | `src/app/services/page.tsx` |
| Styles | `src/app/sf/services.css` (scoped to `.sf-svc*`) + the shared walls in `rooms.css` |
| Rendering | Static |
| Data | `src/content/services.ts` — no Sanity document yet |
| Plates | `images/SF images  new/Services/` → `npm run assets:services` → `public/assets/services/` |
| Metadata | title "Services", description = the hero's second paragraph |

| # | Section | Ground | Content |
| --- | --- | --- | --- |
| — | **Hero** | noir, full bleed | "Shaping Perception *Through Experience*" · two paragraphs · `Banner_.jpg` cropped 16:9 (desktop), `Hero page_.jpg` (handsets) |
| 01 | **What we create** | champagne | "Experiences Shaped Through Strategy, *Storytelling & Creative Intelligence*" · standfirst |
| — | Service 1–4 | sable / champagne alternating | label · title · description · "Includes:" register · 4:5 plate, sides alternating. Anchors: `#luxury-visual-storytelling`, `#creative-direction`, `#digital-experiences`, `#intelligent-brand-growth` |
| 02 | **The SF Muse Method** (`#method`) | sable | "From Vision *To Experience.*" · standfirst · six steps with `Process/` plates, 3 × 2 |

The doc gives the Services page no closing section, so it has none.

The delivery names two process plates "Discovery" and none "Elevate": the
research flat-lay (`Discovery.jpg`) opens the method and the director at her
desk (`Discovery 1 .jpg`) closes it — swap in `scripts/home-assets.mjs` if the
client meant otherwise.

## Retired detail pages

The homepage's service tiles ("Learn More") land on their section of
`/services` — `/services#<slug>`. The old `/services/<slug>` URLs answer with a
permanent redirect to the same anchor (`next.config.mjs`), including the two
slugs the final copy renamed (`art-of-brand-presence` →
`#luxury-visual-storytelling`, `creative-direction-identity` →
`#creative-direction`).

## Editing

- The homepage's service tiles: **Services** documents (studio-guide →
  *Services*) — title, number, summary, tile. Publishing the first `service`
  replaces the seed's four — have all four ready.
- A tile's slug must match its section's anchor on `/services` (the `id`s in
  `src/content/services.ts`), or its Learn More lands at the top of the page.
- The `/services` page is not studio-fed: its copy is `src/content/services.ts`.
- A service document's *Detail chapters* field no longer renders anywhere.
