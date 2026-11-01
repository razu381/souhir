# SF Muse — Decision Log

Important decisions and client discussions, **newest first**. Each entry
records what was decided, why, who decided, and its status. When a later entry
replaces an earlier one, both say so.

Statuses: **Decided** (agreed, not yet built) · **Built** (live or in code) ·
**Open** (waiting on someone) · **Superseded**.

---

## Open questions

| # | Question | Owner | Notes |
|---|---|---|---|
| Q1 | Should the journal article pages be rebuilt from the doc? | Developer | **Update 2026-10-10:** the four articles already exist in Sanity, and their pages render locally, so homepage cards link to `/journal/<slug>`. But the live site can't reach Sanity (see Q7), so live cards fall back to `/journal`. The articles still carry round-1 hero images and the Journal page isn't rebuilt to the doc yet. |
| Q2 | Which photo does Explore SF Muse use? | Client to confirm | Built with the studio wall (`Explore SF Muse.jpg`, 2026-10-10). Swapping is one bake line plus one seed line. |
| Q3 | Should the new palette (2026-10-09, point 1) also go on About and Services? | Developer and client | **About: answered (2026-10-09).** Her About feedback gives the order: charcoal, ivory, charcoal, ivory, brown, ivory, closing, footer. **Services: answered (2026-10-09).** Her Services feedback asks for ivory and charcoal, with charcoal for "From Vision to Experience" and champagne for accents. |
| Q4 | Which photos does "approved colour versions" refer to? | Client | The hero, founder and Explore photos, and two service photos, are black-and-white in the delivery itself. |
| Q5 | What are her Instagram and LinkedIn URLs? | Client | This blocks feedback point 14. |
| Q6 | The client offered a call on Fri 9 Oct, around 7 pm UK. | Developer | Outcome not recorded yet. Add notes here after it. |
| Q7 | Why doesn't the live site reach Sanity? | Developer | Live, every page renders seed content and `/journal/<slug>` returned 500. Locally, with `.env.local`, Sanity answers and the article pages render. The Netlify environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET`) are likely missing or wrong. Check them in the Netlify UI. |
| Q8 | Which photo goes in the About closing panel? | Client | She asked for "an atmospheric image panel" but named no photo. The plan uses `Contact /SF Muse on a Marble Notebook.jpg` provisionally. It comes from the Contact folder, so one photo per slot applies. |
| Q9 | Should the footer be charcoal or black? | Client | **Answered 2026-10-31:** "Please retain the simple black footer." It stays black. |
| Q10 | Her Services feedback numbers its points 1–4 and 6–8. Was a point 5 left out? | Client | Building the seven we have. |
| Q11 | The Services closer has no copy in the doc. Can it reuse the doc's CTA headline, "Let's Create Something Worth Remembering.", with "Start a Project"? | Client to confirm | Built with that copy unless she objects. Home and About already use the same headline. |
| Q12 | Is the Lumière Skin mockup (her Portfolio delivery, a Digital Experience case study in the doc) the "approved SF Muse website or interface" she means for Digital Experiences? | Client to confirm | Built with it. The oyster-shell photo stays on the homepage card. |
| Q13 | v4: which file is the "new banner photo (black and white)" for the quote? | Client | **Answered 2026-11-01:** `Quote banner .jpeg` (sent again). Built. |
| Q14 | v4: which is the "studio image" for the closing banner? | Client | **Answered 2026-11-01:** `CTA Banner .jpeg` (a new studio photograph, not our guess). Built. |
| Q15 | v4: what are the URLs of the three magazine features? | Client | **Partly answered 2026-11-01:** she sent the magazines' homepages (artegomagazine.com, quadromagazine.com), not the features. The covers link to them; swap in feature URLs if she has them. |
| Q16 | v4: where does the new Digital MALVIE cover go, and what issue is it? | Client | **Answered 2026-11-01:** `/editorial` only; issue 27/10/26, with a description, credits and a link. Built as the page's "Latest Feature". |
| Q17 | v4: is the light ground champagne `#EFE6D8` or ivory `#F5F0E7`? Is What We Create charcoal or black? | Client | **Answered 2026-11-01:** champagne, "consistent throughout the website"; What We Create is black with lighter cards. Home and About are done. Services (sable) and the round-1 pages (bone) follow in their own rounds. |
| Q18 | v4: where should newsletter sign-ups go? | Client | **Answered 2026-11-01:** stay in the studio for now. She asked for export and for consent and privacy information: consent is built; the Privacy Policy is Q20. |
| Q20 | Her approved Privacy Policy text (the v3 doc: "publish working approved pages only"). | Client | The newsletter's consent line links to it once the page exists. The contact form needs it too. |
| Q19 | v4: can the "Powered by Netlify" badge be removed? | Developer, then client | It's the free tier's HUD script (`data-account-tier="free"`). Check Netlify settings first, then ask about a plan or domain. |

---

## 2026-11-01 — MALVIE replaces Artego Feb on the homepage

- **Decision (developer, for the client):** the homepage's second cover is
  now MALVIE Digital ("Strength & Glamour — October 2026"), with her
  description and a link to the feature. Artego Dec and Quadro stay.
- **/editorial:** its wall keeps Artego Dec, Artego Feb and Quadro, and
  MALVIE stays its Latest Feature. Every cover appears on the site, and
  none twice on one page.
- **Note:** her MALVIE description runs five lines under its cover; the
  other two run three. Shorten it only if she agrees.
- **Status:** Built locally.

## 2026-11-01 — Client answers to v4, and the build that follows

- **Quote banner:**
  - Her black-and-white tweed portrait (`Quote banner .jpeg`; it's in
    `latest v3/` now).
  - Hung whole at 2.5 : 1, with the quote in its black right half.
  - The italic beat is champagne.
  - Handsets show her portrait at 4:5, with the words on black beneath it.
- **Closing banner:**
  - Her studio photograph (`CTA Banner .jpeg`), hung whole.
  - The rail stays on the dark wall: the paragraph, then a filled champagne
    "Start a Project" beneath it, for her "button visibility" note.
  - The handset crop centres on the softbox, so the chandelier isn't behind
    the headline.
- **Covers:** they link to the magazines' sites she sent.
- **MALVIE:** a "Latest Feature" section on `/editorial` (02; the archive
  is now 03), with:
  - the cover (her PNG, cropped to the cover)
  - her title, description and credits
  - "Read the Feature", which opens malvie.fr.
- **Colour:**
  - Champagne is now the shared light ground, so About's ivory rooms are
    champagne too.
  - The homepage's dark rooms are noir. About keeps its charcoal and brown.
- **Newsletter consent:**
  - A required opt-in checkbox, also enforced by the server.
  - The exact wording is stored on each subscriber as `consent`, in a new
    read-only schema field; the date is `createdAt`.
  - The Studio has a "Newsletter subscribers" list.
  - Export works through the Vision tool (a GROQ query, JSON out). CSV
    would need a small extra, if she wants it.
  - Unsubscribing is manual: delete the subscriber's document.
- **Fixed:** the cover links' sr-only note had escaped the handset swipe
  strip and widened the page by 232px; the link now has a positioning
  context.
- **Status:** Built locally. No horizontal overflow on `/`, `/editorial` or
  `/about` at 390 or 768.

## 2026-11-01 — Homepage v4 built (local, not committed)

- **Backgrounds:** every homepage section now takes one of two grounds,
  set once in `home.css` §1 (`--home-light`, `--home-dark`):
  - Light: champagne `#EFE6D8` (her "ivory").
  - Dark: noir `#0A0A0A`.
  - About, Editorial and What We Create are black; What We Create keeps
    its charcoal card panels.
  - The About page's own walls are untouched; it still renders ivory,
    charcoal and brown.
  - Q17's answer is a one-line change to these values.
- **Newsletter D:** built into `HomeNewsletter`:
  - Light ground, a visible "Email" label, and a joined field and noir
    button.
  - The row stacks below 768px.
  - Same server action as before.
- **Removed:** `/home-v6`, `sf/home-v2.css` and their lab and robots
  entries.
- **Copy:** her Editorial intro, the three cover descriptions and the
  Journal intro, all verbatim.
  - The press and journal statements are shared, so `/editorial` and
    `/journal` show the new intros too (checked).
  - Covers take an optional `href` (seed, plus Sanity's `url` field) and
    link out in a new tab when one is set. None is set yet (Q15).
- **Images:**
  - `journal-card-luxury-gallery` (her checkerboard gallery, a centred
    4:5 crop) replaces `luxury-culture`, which is deleted.
  - `service-card-digital` now comes from her retouched PNG.
  - The bake drops the alpha channel on non-signature plates.
- **Type:**
  - The reading voice is 16–17px (it was 15px below 1619px).
  - Labels are 12px on the homepage and in the footer (were 11px).
  - Credit names are 15px (also on `/portfolio`).
  - Selected Works titles use the card title size.
  - Measured: nothing on `/` is below 15px except the 12px labels.
- **Alignment:**
  - What We Create titles reserve two lines, so the descriptions line up.
  - Who We Work With: the statement is wider and balanced, and "Different
    Worlds" has its own Didone heading with reading-size paragraphs.
  - The About signature rule runs the paragraph's measure.
  - The Journal masthead splits evenly, with the intro at 18px.
  - The press intro sits on a wider measure.
- **Footer:**
  - The wordmark spans the container edge to edge, sized in `cqi` with the
    S's side bearing pulled back.
  - The email sits a step below the social links.
- **Checked:**
  - No horizontal overflow at 390, 768, 1024 or 1440px.
  - Every internal link on `/` returns 200, and the journal cards open
    `/journal/<slug>` locally.
  - `next build` is clean.
- **Not done (waiting):**
  - The quote photo (Q13) and the closing photo (Q14).
  - Cover URLs (Q15) and social URLs (Q5).
  - Sanity on Netlify, so the live journal links and forms work (Q7).
  - The badge (Q19).
  - The newsletter was not test-submitted, because that writes to Sanity.
- **Status:** Built locally; not committed or deployed.

## 2026-10-31 — Client feedback "v4": final visual refinements (homepage)

- **Her direction:** refine, don't restructure. The work is typography,
  alignment, image proportions, spacing, and one black, ivory and gold
  palette. Approved copy stays. The new copy is the Editorial Recognition
  intro, three cover descriptions and a longer Journal intro.
- **Our reading:** she combined `/home-v6` and the live page:
  - From V6: About black, Editorial black, newsletter D.
  - From the live page: What We Create dark.
  - So v4 is the live components on V6's grounds, What We Create kept dark,
    and sable retired. `/home-v6` is deleted once v4 ships.
- **Images:**
  - The checkerboard gallery replaces "Why Luxury Is No Longer About Price":
    `Why luxury is not about price .png`, supplied 31 Oct.
  - The quote gets a new black-and-white photo (not supplied, Q13).
  - The closing banner gets her "studio image" (not identified, Q14).
  - She sent three images with the email: the gallery, a retouched
    "Digital Experience" photo (the same shot as the What We Create card,
    at 5000×7500, so it replaces the card's file), and a Digital MALVIE
    cover the email doesn't mention (Q16). None of them is the quote banner
    or the studio image.
- **Footer:** stays black, which answers Q9.
- **Technical:**
  - Responsive layouts, images, links and the newsletter.
  - The badge is Netlify's free-tier HUD script (Q19).
  - Journal links and the forms need Sanity on Netlify (Q7).
- **Plan:** `docs/plans/14-homepage-v4.md` (local only). The questions are
  Q13–Q19.
- **Decided by:** client (requests) and developer (reading and defaults) ·
  **Status:** Decided; nothing built yet. Waiting on Q13–Q19.

## 2026-10-24 — Homepage V6: her champagne/sable/black scheme, as an experiment

- **Brief:** a second version of the current homepage to try her ground
  scheme, without touching the live page: hero black; Explore, Who We Work
  With, Selected Work and Journal champagne (#EFE6D8, D7); What We Create
  and the Newsletter sable (#E2D7C4, D8); About SF Muse and Editorial
  Recognition black; the quote and "Let's Create Something Worth
  Remembering." as dark photographic banners; footer black.
- **What We Create:** her own treatment — "four black-and-white
  photographs… charcoal text beneath them on the light Sable background,
  without dark card panels." The raised dark panels are gone; the words sit
  on the wall like the Journal cards, and the photographs run
  `grayscale(1)` in CSS.
- **Built as `/home-v6`** (the lab series' next number; `/home-v2` is taken
  by Le Musée): the production page's own components and copy, untouched —
  the whole experiment is `sf/home-v2.css`, scoped to
  `main.sf-homepage.sf-homepage-v2`, listed on `/home-lab`, unindexed and
  disallowed in robots. The production `/` renders exactly as before.
- **Text on the new grounds** (per tokens.css measurements): on champagne
  and sable, ink ≈ 15 / 14 : 1, charcoal-soft 6.6 : 1 on sable, bronze-wall
  5.6 / 4.9 : 1; on the black rooms the dark roles stand (bone 17 : 1,
  white .78 ≈ 12 : 1, champagne ≈ 9 : 1). The newsletter field becomes a
  filled ivory one with a bronze border, keeping her "clearly visible email
  field".
- **Newsletter review (developer, 2026-10-24):** the newsletter is the
  page's most template moment (label + boxed field + pill), so `/home-v6`
  now renders it four ways, each on its own ground so she can tell them
  apart and choose one: **A** The Correspondence Line (sable — the
  `/contact` underline grammar, subscribe as a quiet caps link), **B** The
  Lit Entry (black — the form centred as the room's hero, champagne
  accents), **C** The Letterpress Card (ivory — the round-1 guest register
  as a bordered stationery card), **D** The Editorial Split Row (champagne
  — today's field re-proportioned into one joined row). Every variant is a
  working form. The production `/` keeps today's newsletter untouched.
- **Balance pass (same day, the developer's eye):** the What We Create
  masthead reserved its standfirst cell that the copy gives no text for —
  an empty right half that read as missing content — so on V6 the head is
  now a full-measure statement over the symmetric card rail. Variants A
  and D took the production newsletter's two-column balance (voice left,
  entry right; stacked on handsets) for the same reason.
- **QA pass on the stack (same day):** the wall hairline (.28 bronze) is
  decorative and read as nothing where the variants used it as structure —
  the entry underlines (A/B/C), C's card frame and B's pill border now sit
  at the accent's own strength; the entries carry an "Email address"
  placeholder; D's button is solid noir (champagne filled sat on the
  champagne wall and vanished) and its row stacks below 768px so the field
  keeps its width.
- **If she adopts it:** real black-and-white plates get baked with new
  slugs (the CSS grayscale is the reversible stand-in), the winning grounds
  move into home.css/tokens.css, the chosen newsletter folds back into
  `HomeNewsletter`, and the route and its sheet are deleted.
- **Status:** Built (local, awaiting her review).

## 2026-10-17 — Homepage on the v3 final content (text and images only)

- **Source:** `SF_Muse_Final_Content_For - v3.docx` (13 Oct 2026, "Luxury
  Creative & Marketing Studio") is now the copy spec. This round covers the
  **homepage only**; the other pages follow in their own rounds.
- **Rule:** change the homepage's words and the images the doc names, using
  the existing components and classes. A first build added new heading styles,
  recoloured the rooms and hung the six Featured work photos twice (on Who We
  Work With and on the studies). It was reverted on the developer's
  instruction, and the round was re-planned.
- **Images:** the v3 photo set equals v2 except in two Home folders.
  - `services /`: new B&W Digital and Growth cards replace the oyster shell
    and the mushrooms.
  - `Featured work/`: six study photos (`work-fashion`, `-beauty`,
    `-hospitality`, `-wellness`, `-automotive`, `-travel`, all 2:3) replace the
    five old plates. The two Instagram exports stop at native width (Beauty
    1017px, Auto 1125px).
  - The unreferenced old plates were deleted.
  - `scripts/home-assets.mjs` now reads `images/SF images  latest v3`.
- **Built:**
  - **Hero:** eyebrow in the top rule; "Expressive in style…" in the standfirst
    slot, so it sits above the descriptive sentence (the doc has it the other
    way round); a second button.
  - **Explore:** v3 heading and copy, the "(Explore SF Muse)" chapter label and
    a Discover Our Approach button.
  - **What We Create:** the four v3 cards; no "Learn More".
  - **Who We Work With:** six categories in the existing icon list. "Different
    Worlds. Shared Ambitions." is the grid's last cell, in the categories' own
    type.
  - **Founder:** "The Perspective Behind SF Muse", with a Discover Our Story
    button.
  - **The Art of Brand Presence:** six studies in the existing caption
    anatomy, with no filter rail.
  - **Remaining copy:** v3 text for the press line, journal heading and blurb,
    quote (no role), newsletter and closing.
  - **Footer:** text edits to the current three columns, per the doc's
    "Homepage Footer Update".
  - **Nav:** Editorial before Journal, in the header and footer.
- **Kept on purpose (developer's call):** today's room colours, not v3's
  DESIGN LOCK; no photos on the Who We Work With cards, though v3 asks for one
  each; the Journal layout, despite the doc's "refine" note.
- **Side effects:** the footer and nav change on every page. `/portfolio`
  shows the six studies, since it shares the seed. The `/editorial` and
  `/journal` intros pick up the new press and journal lines.
- **Open:**
  - Card photos for Who We Work With.
  - v3's colour order.
  - The Journal "refine" note.
  - Legal pages and the expanded footer (§09).
  - Instagram and LinkedIn URLs.
  - Moevir cover permission.
  - The Netlify badge.
  - v3 §10 says to keep the package prices, though the Services copy omits
    them.
- **Developer's follow-ups (same day):**
  - **Hero title is 1.5× round 2's size**, wherever it still ends before her
    figure. A fit guard in `home.css` (`--hero-title-fit`) gives laptops up
    to 1440 the full 1.5×, and wider screens about 1.3×. On handsets it is
    capped to the column.
  - **Hero "Start a Project" is filled champagne at rest** (the outline
    button's hover). It lifts to bone on hover, the newsletter submit's
    pattern. "Explore Our Work" stays outline.
  - **"Different Worlds. Shared Ambitions." sits beside** the Who We Work
    With heading and statement (the first row's third cell), not after the
    list. The six categories fill the two rows below.
- **Status:** Built locally, not committed.

## 2026-10-12 — Homepage round 2 deployed on its own

- **Decision:** the developer asked to host the homepage, so it shipped
  alone (`7ae9439`, pushed to `main` 2026-10-12): homepage round 2, the
  What We Create half of the Services copy update, and her signature on
  the homepage. Its site-wide parts went too, as planned (footer, Bodoni
  weights, Selected Works captions, the journal 404).
- **Held back, still local:** About round 2, the `/services` half of the
  copy update, and the docs for both.
- **`home.css` §1 shipped scoped to `.sf-homepage` only.** With About's
  `:is(.sf-homepage, .sf-about)` the shared room rules would have reached
  the round-1 About, which has no room modifiers, and blanked its walls. The
  working copy keeps the `:is()` for About's commit.
- **Known gap until `/services` ships:** the homepage's first two cards are
  titled "The Art of Brand Presence" and "Creative Direction & Identity";
  their Learn More lands on the old titles ("Luxury Visual Storytelling",
  "Creative Direction & Brand Identity").
- **Not committed:** `MEMORY.md` and `DECISION-LOG.md`. The GitHub repo is
  public and they hold client discussions.
- **Checked first:** the commit's own tree, built in a separate worktree
  without Sanity env (as Netlify builds it): typecheck and build clean;
  `/`, `/about` and `/services` at 390 and 1440 without horizontal scroll or
  console errors; the round-1 About renders as before, with the new footer.
- **Status:** Deployed.

## 2026-10-11 — Signature: her file used directly (homepage deployed 2026-10-12)

- **Problem:** the signature on the homepage's About SF Muse section read
  blurred (the developer flagged it, and asked why we weren't using her
  signature directly). About's bronze version had the same fuzzy edge.
- **Cause:** her file is already a clean cut-out, a **transparent PNG**
  (98.9% of pixels fully transparent) with champagne strokes (#CCB597, within
  a few levels of the site's `#CDB190`). Its hidden colour channels hold a
  grey "wall" under the transparent area. When it was first opened, that wall
  was taken for a background, so since round 2 the bake threw away the alpha
  and keyed the strokes back out of the hidden colour by warmth. That keyed
  in the hidden glow as a halo, and a pre-key blur softened it further. A
  first fix on 2026-10-11 tightened that key; it was replaced the same day by
  this one.
- **Decision:** use her file as supplied. The bake only crops it to the
  signature (with a margin) and resizes it; no keying.
  - Home (brown room): her own colour, unchanged.
  - About (ivory): her strokes and edges unchanged, refilled in
    `--bronze-wall` (`tint` in the bake), because her champagne reads 1.8 : 1
    on ivory.
- **Rule for later:** check an image's alpha before treating what looks like
  a background as one.
- **Status:** Checked in the page at 1× and 2×. The homepage's is deployed
  (2026-10-12); About's bronze version ships with About round 2.

## 2026-10-11 — Services copy update: packages and starting rates (homepage half deployed 2026-10-12)

- **Context:** the client sent `SF_Muse_Website_Copy_Services_Updated.docx`.
  It replaces `SF_Muse_Website_Copy_Shorter_Updated.docx` (no longer in the
  repo root) as the spec. Compared section by section with the old text,
  only the Services copy changed: the homepage's "What we create" and the
  Services page. Everything else differs only in line breaks.
- **Homepage, What We Create:**
  - The section headline ("The Art of Brand Presence") and its intro
    paragraph are gone from the doc; "The Art of Brand Presence" is now only
    the first card's title.
  - "What We Create", the doc's label, is promoted to the section's headline.
    The empty chapter rule keeps its numeral, as on Explore.
  - The four card summaries are the doc's new lines (commercial rather than
    poetic; card 1 is the longest at six lines on desktop).
- **Services page:**
  - Hero: two new paragraphs. The metadata description is the first
    sentence of the second.
  - What we create: "One Brand Story. *A Clear Path To Action.*" The doc's
    paragraph is split: its first sentence is the standfirst, the pricing
    terms sit beneath it in the reading voice.
  - Service 1 is now "The Art of Brand Presence" (was "Luxury Visual
    Storytelling"); Service 2 is "Creative Direction & Identity" (was "…&
    Brand Identity"). The anchors stay as they were, so the homepage's Learn
    More links still land.
  - **Each service paragraph now names three packages with starting rates**
    (£550 to £2,250, one "tailored quote") and closing terms. They are set as
    a rate card: name in the display voice, rate at the right, contents
    beneath, the terms as a small note, then the new "Includes:" list.
  - **Layout:** label, title and the one-line promise open each service across
    the top, on the same two columns as the photo and rate card below. With
    three packages, the right column is about the photo's height, so it stays
    balanced without a sticky photo.
  - **Words:** split from the doc's run-on sentences verbatim. The only change
    is a capital on each split-off piece ("From £550 per session", "A creative
    brief, …"). Checked by script against the doc.
  - The Method is unchanged.
- **Plan 13 (Services round 2, not built):** its service anatomy (§2.2) and
  the four compositions (§3.3–3.6) were drawn for a one-sentence description
  and an 8-item list. They now need the rate card too; see the note added to
  the plan.
- **Checked:** production build at 390, 834 and 1440; no horizontal scroll,
  no console errors; the /home-v* labs still render their services list.
- **Decided by:** client (copy) and developer (presentation) · **Status:**
  Built 2026-10-11. The homepage half is deployed (2026-10-12); the
  `/services` half is local, not committed.

## 2026-10-09 — Client feedback on Services: redesign plan

- **Context:** the client reviewed `/services` (live, round-1 build). The
  content is all there, but she wants the design to feel "more captivating"
  and to show "clarity and creative confidence". She sent points 1–4 and 6–8
  (there is no 5, see Q10), plus a colour note: keep warm ivory and beige, and
  add charcoal in selected sections, for example "From Vision to Experience"
  in charcoal with ivory text and champagne accents.
- **Plan, by her points:**

| # | Her point | Planned response |
|---|---|---|
| 1 | Hero text placement | Measured: at 1920 the text sits 240px right of the logo, because it's in the centred container. The headline runs into the light stand, and "Through Experience" sits on the lit pool. **Response:** align the text with the logo, upper-middle, four-line headline; re-bake the banner at 2:1 so the pool starts at ≥45% of the width; on phones, the photo goes above the text. |
| 2 | Colour transitions | Ivory and charcoal alternate down the page. Beige is used once (the closer) and never touches ivory. Champagne is for accents only. Uses the round-2 rooms the About plan moves to shared CSS, with `.sf-svc` added to their scope. |
| 3 | Service sections | All four use one text structure (label, title, description, list), with the description at lead size and the lists at 16–17px reading down the columns. Each gets its own composition: a full-bleed photo (Storytelling), an editorial print (Creative Direction), a large device mockup (Digital), and a framed photo on a stone panel (Growth). |
| 4 | Digital Experiences image | Replace the oyster-shell phone with her **Lumière Skin** laptop, tablet and phone mockup (`Portfolio/Digital_Experience.jpg`) at full container width (Q12). |
| 6 | Method | The six photos are removed. The steps go on a charcoal 3×2 grid with numbered stages, bespoke line icons (`MethodIcon`), a champagne line connecting the stages and aligned descriptions. On phones the line becomes a vertical rail on the left. |
| 7 | Closing invitation | A compact beige band with "Let's Create Something Worth Remembering." and a "Start a Project" button to `/contact` (Q11). |
| 8 | Footer | The round-2 footer (built locally, so she hasn't seen it) becomes site-wide, with a full-width wordmark, an opening champagne line, 16px links and icons on the social links. The ground follows Q9. **The correct social links are still blocked on Q5.** |

- **Also:**
  - The request for an "Elevate" photo is **withdrawn**, because the Method
    no longer uses photos.
  - `DESIGN-DIRECTION.md` §07 already called for a "numbered hairline
    sequence" for the process, so point 6 brings the page back to that
    direction.
  - §09 needs the new icons and frames added as exceptions when this is
    built.
- **Order:** commit the homepage round 2 first; its footer is part of point 8.
  The About plan runs alongside. Only this plan changes the footer's design.
- **Decided by:** client (requests) and developer (responses) · **Status:**
  Decided; nothing built yet. The full plan, with acceptance criteria per
  section, is `docs/plans/13-services-round-2.md` (2026-10-10, local only).

## 2026-10-10 — About round 2 built (local, not yet deployed)

The About revision from `docs/plans/12-about-round-2.md` is built and checked
locally on a production build at 390, 768, 1025, 1280, 1440 and 1920. It is
**not committed or deployed**, and it sits on top of the uncommitted homepage
round 2. Decisions made during the build that differ from the plan:

- **The room rules are shared in place.** The plan said to move them into
  `rooms.css`. Instead, their selectors in `home.css` §1 now read
  `:is(.sf-homepage, .sf-about)`. Moving them would have put them earlier in
  the cascade than `site.css`, which risks changing the homepage. Keeping them
  in place guarantees it renders as before.
- **Founder Story: the headline spans the top.** With the headline inside the
  text column, the text ran about 970px against a 730px portrait at 1440.
  With the headline across the top, the portrait (5/12) and the story share
  one row. The portrait's foot and the name line end on the same pixel at
  1280 and 1440. At 1600 and above the split is 1:1.
- **Display type at `"opsz" 30`.** Comparing optical sizes showed the
  automatic one thins the W and V hairlines until "Way" and "Vision" read as
  "W ay" and "V ision". 30 firms them up. About only for now.
- **The hero headline is sized from its column** (container query units), so
  "More Than / A Studio." keeps its two hand-set lines at every desktop
  width. At 1920 it had broken into three.
- **Icons:** the star is redrawn as her mock-up's faceted four-point star; it
  was the set's outlier, larger and curvier than the others. The other five
  were already on one grid, stroke and cap, so they're unchanged. All six
  render at 44px (the homepage's client icons are 40px).
- **No hairlines in Values.** The Way cells keep a top rule, as the grid's
  structure, so the two grids stay distinct.
- **Tablets (768–1024)** stack every section. The founder portrait is capped
  at 30rem, the Philosophy figure narrows so the whole figure fits one screen,
  and the closing photo is square.
- **Images:** `npm run assets:about` now also bakes `hero-mobile`,
  `signature-ink` (her signature in bronze; since 2026-10-11 her own strokes
  refilled, not keyed) and
  `closing`. `hero-480` and `hero-800` are deleted, because the square hero
  starts at 1200.
- **Checked:**
  - no console errors and no horizontal scroll;
  - the only 404 is the known favicon;
  - the homepage renders with its rooms unchanged.
- **Still open:** Q8 (the closing photo) and Q9 (the footer ground).

## 2026-10-09 — Client feedback on About: revision plan

- **Context:** the client reviewed `/about`. The copy is largely respected,
  but she wants more contrast, more variety and a stronger personal feel. She
  gave 10 points and a colour flow, and called the page "too simple".
- **Plan:** `docs/plans/12-about-round-2.md` (2026-10-10, local only). Its §9
  maps each of her points to a section. The main decisions:
  - **Grounds, in her order:** charcoal hero, ivory founder, charcoal
    philosophy, ivory principles, brown statement, ivory vision and values,
    brown closing with a photo panel, then the footer. This answers Q3 for
    About.
  - **Hero:** the curtain photo bleeds off the right edge at full height
    (~58% of the width). The headline is "More Than / A Studio." with "A
    Philosophy / Of Experience." as a smaller italic second voice.
  - **Philosophy:** the full-body colour photo bleeds off the left edge at
    exactly 3:4, uncropped, beside a charcoal text panel. It no longer
    repeats the hero.
  - **Founder:** the portrait is balanced with the text by layout, not by a
    sticky portrait.
  - **Additions:** her signature (a new bronze-tinted `signature-ink` bake for
    the ivory ground) and the line "Souhir Fhima — Founder & Creative
    Director". Both are her own request, so they're allowed beyond the doc.
  - **Headings:** "The SF Muse Way" uses her feedback's title case (the doc
    has "way").
  - **No `Chapter` on About.** The numbered label and hairline leave the
    page, per her point 9. Only the Way principles keep numerals.
  - **Italics:** three on the page (the hero voice, the question, the
    closer).
  - **`WordReveal` is removed from About,** because its pale unrevealed words
    are what she saw in the Vision.
  - **Shared code:** the round 2 room roles move from `home.css` into
    `rooms.css`, scoped to `:is(.sf-homepage, .sf-about)`. `ClosingCard` is
    untouched; About gets its own closing section.
- **Depends on** the homepage round 2 being committed first (tokens, rooms,
  font weights, footer).
- **Decided by:** client (requests) and developer (responses) · **Status:**
  Built locally 2026-10-10 (see "About round 2 built"). Q8 and Q9 are open.

## 2026-10-10 — Round 2 built (deployed 2026-10-12)

The homepage revision from `docs/plans/11-homepage-round-2.md` is built and
reviewed locally (production build, at desktop 1440, tablet 834 and phone 390).
Deployed 2026-10-12 (`7ae9439`). Decisions made during the build:

- **Structure.** The homepage sections are new homepage-only components
  (`HomeRooms.tsx`, `HomeNewsletter.tsx`), styled in `sf/home.css` and scoped
  to `main.sf-homepage`. The round-1 components still serve `/journal`,
  `/editorial` and the `/home-v*` labs unchanged.
- **Who We Work With is a 3×3 grid, not 4×2.** The heading needs two cells to
  hold its two lines, and 2 + 7 fills three rows exactly.
- **Service-card text sits below the photo.** Overlaid text was unreadable on
  the bright, near-monochrome service photos without a heavy dimmer, which the
  client asked us to avoid.
- **The homepage journal pins the Journal-delivery image by title.** Sanity's
  four articles still carry round-1 hero photos.
- **The hero keeps the full-bleed photograph.**
  - The gradient comes off her figure.
  - The crop pushes her right.
  - The headline is sized to end before her.
  - On phones the photo sits above the words.
- **Her signature comes from her own file**; the prototype's redrawn ink
  signature is retired. (Keyed here at first; used directly since
  2026-10-11, see that entry.)
- **Shared changes, intended for every page:**
  - The variable Bodoni weights are unlocked (`font-weight: 400 900`).
  - The hero line masks clip vertically only.
  - Selected Works: one caption anatomy, subgrid row alignment, empty filters
    hidden (`/portfolio` too).
  - The footer is redesigned site-wide: aligned columns, the address shown,
    the outro wordmark back.
- **Bug fixed:** `/journal/<slug>` now returns 404 instead of 500 when Sanity
  has no such article or can't be reached.
- **Still open:** the real Instagram and LinkedIn URLs (Q5). The footer keeps
  the platform homepages until she sends them.

## 2026-10-10 — Take the A4 hero's typography, not its layout

- **Context:** the client sent a screenshot of `/hero-lab` wall A4 ("Charcoal —
  Control"): *"I particularly liked how you displayed the text in this earlier
  hero version … Please use this as a reference when refining the text layouts
  across the website."*
- **Decision:** we **don't** use that hero (the framed print beside the words,
  on a charcoal wall). We take **only its typography**: scale, voices, reading
  order, spacing and colour roles. It becomes the reference for every text
  block, including our own homepage hero.
- **Why:** what the client values is how the text reads. The composition is a
  separate decision for each section.
- **Decided by:** developer · **Status:** Decided. The spec is recorded in
  `DESIGN-DIRECTION.md` §02 (addendum); it gets applied in the round-2
  revision.
- **Follow-up:** the A4 line masks clip the end of "Visibility." at some widths
  (her screenshot reads "Visibilit"). Fix this before reusing the masks.
- **Consequence:** the question "black or charcoal hero?" goes away. The hero
  stays black per 2026-10-07 unless the client asks otherwise.

## 2026-10-10 — One photo per slot

- **Context:** the client wrote that where she gave two photos for one section,
  they were alternatives. She asked us not to combine both, as the homepage's
  Explore SF Muse section does.
- **Decision:** each slot uses one photo.
  - **Home, Explore SF Muse:** today the two photos overlap. Use one (see Q2).
  - **Services, Our Method:** `Discovery.jpg` and `Discovery 1 .jpg` are both
    in use, the second as the "Elevate" step. Discovery keeps one, and Elevate
    needs its own photo, which we've asked the client for.
  - **Services hero:** the wide banner shows on desktop and the portrait on
    phones. It's the same scene and the two never appear together, so we keep
    the pairing unless the client objects.
- **Decided by:** client · **Status:** Decided. Elevate's photo is no longer
  needed: the Services redesign drops the Method photos (2026-10-09 Services
  entry).

## 2026-10-10 — Which replacement images to ask for

- **Context:** the client offered alternative banner images for sections where
  the supplied ones don't fit the layout.
- **Ask for:**
  1. The **original high-resolution hero photo**. The delivery is 1920×1080 and
     goes soft when cropped closer to her.
  2. A brighter, taller image for the **closing banner**. The current one is a
     6608×1033 strip and very dark (average brightness about 17/255).
  3. A photo for the **Services "Elevate" step**.
  4. Optionally, colour versions of the four "What We Create" photos, which are
     all nearly black-and-white as supplied.
- **Not needed:**
  - The newsletter, which becomes plain charcoal with no photo.
  - The journal desk banner, which is being removed.
  - The quote banner, which works once its overlay is lighter.
- **Status:** Open. A message to the client was drafted; whether it was sent
  isn't recorded.

## 2026-10-09 — Client feedback round 2: homepage revision plan

- **Context:** the client reviewed the homepage against her copy doc and the
  design references in `inspirations/`. Most content was present, but the visual
  presentation needs refining. She wants the references treated as
  inspiration, adapted into an original design rather than one structure
  repeated throughout.
- **Plan, by her 14 points:**

| # | Her point | Planned response |
|---|---|---|
| 1 | The two beiges are too similar | **Supersedes the 2026-10-07 walls.** Ivory and charcoal alternate: ivory for Explore, Who We Work With, Selected Works and Journal; charcoal for What We Create, Editorial Recognition and the newsletter. Deep brown is used once (About). Champagne is reserved for accents. Every pair gets checked for contrast. |
| 2 | Her figure in the hero is too dark | Measured: her figure stands where the hero gradient is still 70–90% black. Keep the gradient behind the text only, crop so she's clearly visible, and use the 2026-10-10 typography. The layout is still to be designed, and won't be A4's. |
| 3 | The Explore photos feel disconnected | Use one photo (2026-10-10), and give the text a clear heading → lead → body hierarchy. |
| 4 | What We Create needs more impact | Image cards on charcoal, each with title, short description and a Learn More link that's always visible. |
| 5 | Who We Work With is a long list | A balanced 4×2 grid: an intro cell plus the seven categories, each with a thin-line icon. |
| 6 | About SF Muse needs integrating | Portrait, text, signature, name and role, and button as one composition. **Use her supplied signature** (the neon PNG) instead of the prototype's redrawn ink version. Keep the photo's current treatment. |
| 7 | Selected Works alignment; Wellness filter | "The Art of Slowing Down" (the only landscape) currently splits its text into two columns. It will stack like the others, with credits aligned across rows. Filters with no projects are hidden, so Wellness goes. |
| 8 | Editorial Recognition needs presence | Charcoal background, covers much larger and evenly spaced. |
| 9 | The Journal needs redesigning | One featured article plus three cards; the 8:1 desk banner removed; images from the Journal folder ("Why Luxury Is No Longer About Price" changes to `Luxury_Culture.jpg`); clickable links (see Q1). |
| 10 | The quote banner's crop and contrast | A lighter overlay, behind the quote only. Both lines readable, and the photo stays visible. |
| 11 | Newsletter and closing banner use similar photos | The newsletter becomes plain charcoal with ivory text and a clearly visible email field. The cinematic photo stays only on the closing banner. |
| 12 | Headings and alignment | One type scale, hand-set line breaks, consistent margins and measures. Italics only for the hero, the quote and the closer. |
| 13 | Image colours | Our image processing desaturates only "The Art of Slowing Down", because the copy calls it black-and-white, and the client confirmed that's fine. The other black-and-white photos arrive that way. The fix is to remove heavy overlays, and use colour files if she has them (Q4). |
| 14 | The footer needs polish | A larger SF Muse wordmark, aligned columns, readable text, and real social links (Q5). |

- **Conflicts with `DESIGN-DIRECTION.md` §09:**
  - Point 5's icons break the "no icon sets" rule.
  - Points 4 and 9's cards break the "no boxed or carded layouts" rule.
  - The client's request wins. Amend §09 when these are built, per §09's own
    rule.
- **Also found:**
  - `/journal/<slug>` returns 500 for a missing article; it should return 404.
  - A "Powered by Netlify" badge is injected on every page.
- **Decided by:** client (requests) and developer (responses) · **Status:**
  Decided; nothing built yet. The full build plan, with acceptance criteria per
  section, is `docs/plans/11-homepage-round-2.md` (2026-10-10, local only).

## 2026-10-07 — Inline `<head>` script moved into `<body>`

- **Why:** Netlify injects a newline and comment into `<head>`. That broke
  hydration for the inline `sf-js` script (React #418), so every live page was
  discarded and re-rendered on the client.
- **Status:** Built (`4ed64a5`), and verified live on all routes.

## 2026-10-07 — Service pages retired; Learn More lands on its section

- **Decision:** the homepage's Learn More buttons go to `/services#<slug>`.
  `/services/<slug>` is removed and answers with a permanent 308 redirect to its
  section. Two renamed slugs are mapped:
  - `art-of-brand-presence` → `luxury-visual-storytelling`
  - `creative-direction-identity` → `creative-direction`
- **Why:** the old pages carried text that isn't in the final doc.
- **Status:** Built (`be180b0`); the redirects are in `next.config.mjs`.

## 2026-10-07 — About and Services built from the doc, with content in code

- **Decision:** both pages are rebuilt from the final copy and the new About and
  Services photos. Their content lives in `src/content/about.ts` and
  `src/content/services.ts`.
- **Consequence:** the client can't edit these pages in the Sanity studio.
  Moving them to Sanity is still open.
- **Status:** Built (`be180b0`).

## 2026-10-07 — Black footer and menu; contact email

- **Decision:** the footer and menu are black, like the hero. The contact email
  is `contact@souhirfhima.com`.
- **Status:** Built (`cd2c14d`). Whether that inbox is live still needs the
  client's confirmation.

## 2026-10-07 — Champagne and sable walls *(Superseded 2026-10-09, point 1)*

- **Client direction:** keep the hero black. Alternate the homepage sections
  between D7 Champagne `#EFE6D8` and D8 Sable `#E2D7C4`, with dark charcoal text
  and gold or bronze kept for accents.
- **Status:** Built (`cd2c14d`). Superseded once the round-2 palette is built.

## 2026-10-07 — "The Art of Slowing Down" in black-and-white

- **Why:** the copy describes it as black-and-white photography. It's the only
  photo our processing desaturates.
- **Status:** Built (`c4403eb`). The client confirmed on 2026-10-09 that it
  should stay that way.

## 2026-10-07 — The final copy doc is the spec

- **Decision:** `SF_Muse_Website_Copy_Shorter_Updated.docx` is final, and the
  design must follow it. The brand is renamed from Dar SF to SF Muse.
  Site text that isn't in the doc is removed. We only ask about things the doc
  can't answer, such as URLs and email.
- **Status:** Built (`57715d8` homepage, `be180b0` About and Services).

## 2026-09-14 — Statue-shadow photo as the homepage hero

- **Decision:** `/hero-lab-v2` hang A0b becomes the homepage hero: a full-bleed
  backdrop with a legibility gradient.
- **Status:** Built (`cc78945`). Being revised in round 2, point 2.

## 2026-08-29 — Design direction

- **Decision:** keep the reference sites' structure (big type over photography,
  numbered chapters, hairlines, dark interludes, a giant footer wordmark) and
  replace their finish. That means a Didone serif, slow easing, champagne
  accents only, sharp corners and more whitespace.
- **Status:** Built. See `DESIGN-DIRECTION.md`.
