# Studio guide (for editors)

Open **`/studio`** on the live site. The left rail mirrors the site itself:
Home page · Site settings · Work items · Case studies · Journal · Services ·
Press · Correspondence.

**The golden rule:** the site is already full of content — the "seed". Every
field you leave empty keeps showing the seed version. You take over a section
by publishing its document; you can take it back by deleting/unpublishing.
Nothing you do can break the layout: editors own words and pictures, never
layout.

Changes go live within seconds of publishing (a webhook refreshes the pages);
even if the webhook is misconfigured, pages refresh themselves within 10
minutes.

## Home page (one document)

Each field group maps to one home section — the studio labels say which:

- **Hero** — the two title lines (they render as "Beyond / Visibility."-style
  stacked lines), the museum-label caption (`Fig. …`), and the hero photograph.
  The photograph is cropped to a tall 2:3 plate; pick an image that survives a
  centre crop.
- **Explore** — the big statement paragraph, the felt line beneath it, the
  photograph and its `Fig.` caption.
- **Clientele** — the register rows (label + description). The intro headline
  has the same rule as all headings: the last sentence renders in italic.
- **Founder** — photograph, refrain (two-part heading), two text paragraphs,
  the felt line, name and role. The signature image is fixed.
- **Work** — only the statement line. The hang itself is managed in **Work
  items**.
- **Press** — heading, statement, and the three stat figures/labels.
- **Journal** — the statement and sub-line only. Articles are managed in
  **Journal**.
- **Interlude** — the full-bleed photograph, the quote (last sentence italic),
  attribution.
- **Newsletter** — heading and text.
- **Closing card** — the letterbox photograph, closing headline, text. The
  button label/target are fixed ("Start a Project" → /contact).

## Work items

One document per plate in the hang.

1. Title (shown under the plate), image (alt text required).
2. **Category** — must be one of the six filters: hospitality, beauty,
   wellness, editorial, lifestyle. It decides which filter the plate answers.
3. **Ratio** — std (4:3), tall (4:5), or square. The hang is a mixed-ratio
   masonry; vary them.
4. **Case study** (optional) — linking one makes the tile clickable and adds it
   to `/portfolio`'s case-study register. Create the case study first.

When the first Work item is published it replaces the seed hang entirely —
publish all six at once.

## Case studies

Create via the Journal/Case-studies list. Title, slug, category, tagline,
publish date, hero image (wide crop). Then **Overview** (intro paragraphs) and
**Sections** — add blocks in reading order:

- **Rich text** — paragraphs.
- **Pillars** — three titled columns.
- **List** — a hairline register.
- **Results** — figure + label rows. Write figures like `15+`; the `+`
  re-renders in champagne automatically.
- **Gallery** — two or three images per row.
- **Plate** — one large image with a `Fig.` caption; full-bleed or inset.
- **Quote** — a full-width pull quote.

Project details (industry / type / services / location) render as the closing
plaque; the closing quote renders as the final pull. Numbering is automatic.

## Journal

Write articles as usual: title, slug, category, excerpt, publish date, hero
image, body. You can drop **images with captions** and a **closing quote**
into the body anywhere. The **four newest articles by publish date** fill
the journal register rows everywhere (no featured slot).
Titles starting with "The " keep "The" upright and italicise the rest, per the
house style.

## Services

Four documents, ordered by their `num` (01–04). Title, summary (shows in the
home/services rows), 4:5 tile image, slug (must match the seed slugs if you
want to keep the current URLs: `art-of-brand-presence`,
`creative-direction-identity`, `digital-experiences`, `intelligent-brand-growth`).
Detail-page chapters use the same section blocks as case studies. The
six-step process register at the bottom of each detail page is fixed copy.

**Publishing the first service replaces the seed list** — have all four ready.

## Press

Cover features for `/editorial`'s archive: publication, date, caption, optional
external link, cover image (magazine-cover crop, alt required). Nothing shows
until the first feature is published.

## Site settings

Tagline (footer + menu), contact email (footer, contact page, mailto links),
social links. If empty, the defaults hold.

## Correspondence

Every contact/newsletter submission lands here as a `message` document — the
inbox of record. Read, then delete or archive; nothing on the public site
depends on them. Submissions are not emailed; check this desk (or set up an
email forwarder later).
