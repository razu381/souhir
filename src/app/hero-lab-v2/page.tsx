import type { Metadata } from 'next';
import { Fragment } from 'react';
import HeroNocturne from '@/components/sf/HeroNocturne';
import { HeaderSentinel } from '@/components/sf/PageTitle';
import { hero, type Plate } from '@/content/seed';

/**
 * Hero Lab v2 — /hero-lab-v2. Internal review page, unindexed.
 *
 * /hero-lab asks which WALL the hero hangs on: one photograph held constant,
 * twenty-seven grounds. This page asks the opposite question — which
 * PHOTOGRAPH the hero should be built around. Thirteen new frames, seventeen
 * hangs (the four backdrops appear twice, furnished and bare, because the
 * gallery apparatus is itself under review), each composed for its own
 * negative space.
 *
 * The copy is held constant — same title, same promise — so the comparison is
 * about the picture. Only the museum label and the alt text change, because a
 * caption that lies about its own photograph is worse than no caption.
 *
 * Review-only styles live in sf/hero-lab-v2.css; the plates are baked by
 * scripts/hero-lab-v2-assets.mjs (`npm run assets:hero-lab-v2`) from
 * sorted/hero exp images/, which is gitignored.
 */

export const metadata: Metadata = {
  title: 'Hero Lab v2',
  description: 'Internal hero experiments — not for publication.',
  robots: { index: false, follow: false },
};

/* --------------------------------------------------------------------------
   The plates. Every rendition below exists on disk — the widths are the ones
   scripts/hero-lab-v2-assets.mjs actually emitted, which is NOT a tidy ladder:
   it never upscales, and five of these thirteen sources are under 1100px. The
   two framed wides get a single 800w step because their sources are 843x563
   and 817x540; that is the whole reason they are framed rather than bled.
   -------------------------------------------------------------------------- */

const SIZES = {
  backdrop: '100vw',
  split: '(min-width: 1025px) 52vw, 100vw',
  column: '(min-width: 1025px) 40vw, 100vw',
  paysage: '(min-width: 1025px) 44vw, 88vw',
} as const;

/** Builds a Plate from the baked renditions. `steps` are [width, height] pairs
 *  in ascending order; the largest is the `src` and sets the intrinsic ratio. */
function plate(
  slug: string,
  steps: readonly (readonly [number, number])[],
  sizes: string,
  alt: string,
): Plate {
  const [width, height] = steps[steps.length - 1];
  return {
    src: `/assets/hero-lab-v2/${slug}-${width}.webp`,
    srcSet: steps.map(([w]) => `/assets/hero-lab-v2/${slug}-${w}.webp ${w}w`).join(', '),
    sizes,
    width,
    height,
    alt,
  };
}

const PLATES = {
  'desk-late': plate(
    'desk-late',
    [[800, 400], [1200, 600], [1600, 800]],
    SIZES.backdrop,
    'A dark marble desk at night — a camera, an espresso cup, an open magazine and scattered polaroids lit from one side, the rest of the frame in shadow.',
  ),
  'desk-spread': plate(
    'desk-spread',
    [[800, 400], [1200, 600], [1600, 800]],
    SIZES.backdrop,
    'A dark marble desk — a Dar SF notebook and pen, reading glasses, and a magazine open to a photograph of a Parisian doorway.',
  ),
  'light-shaft': plate(
    'light-shaft',
    [[800, 427], [1200, 640], [1600, 854]],
    SIZES.backdrop,
    'A dark interior with shafts of morning light raking across the wall, a marble table holding an open book, and a warm doorway beyond.',
  ),
  moodboard: plate(
    'moodboard',
    [[800, 533], [1200, 800], [1536, 1024]],
    SIZES.backdrop,
    'A woman in a black turtleneck studying a wall of pinned black-and-white prints in low, warm sunlight.',
  ),
  'staircase-shoulder': plate(
    'staircase-shoulder',
    [[480, 749], [800, 1249]],
    SIZES.split,
    'A woman in a white and floral gown on a panelled staircase, turning to look back over her shoulder, in black and white.',
  ),
  'staircase-seated': plate(
    'staircase-seated',
    [[480, 718], [800, 1197]],
    SIZES.split,
    'A woman seated on a grand staircase, her embroidered gown spilling down the steps, in black and white.',
  ),
  'gallery-standing': plate(
    'gallery-standing',
    [[480, 718], [800, 1197]],
    SIZES.split,
    'A woman in a beaded gown standing against a plinth beneath a marble statue in a long museum gallery, in black and white.',
  ),
  'gallery-gilt': plate(
    'gallery-gilt',
    [[480, 834], [800, 1390], [930, 1616]],
    SIZES.split,
    'A woman in a champagne beaded gown beneath a marble statue in a museum gallery, under a gilded ceiling.',
  ),
  'blazer-noir': plate(
    'blazer-noir',
    [[480, 718], [800, 1197], [1080, 1616]],
    SIZES.split,
    'A woman in a black tailored blazer, hands in her pockets, a marble statue behind her, in high-contrast black and white.',
  ),
  'window-portrait': plate(
    'window-portrait',
    [[480, 718], [800, 1197], [1080, 1616]],
    SIZES.column,
    'A close portrait of a woman beside a window, looking away from the camera, in soft black and white.',
  ),
  'window-shadow': plate(
    'window-shadow',
    [[480, 718], [800, 1197], [1080, 1616]],
    SIZES.split,
    'A woman standing at a tall arched window, her figure thrown as a vast shadow across the adjacent wall, in black and white.',
  ),
  balustrade: plate(
    'balustrade',
    [[800, 534]],
    SIZES.paysage,
    'A woman in a floral gown leaning on the balustrade of a panelled staircase, in black and white.',
  ),
  'mosaic-floor': plate(
    'mosaic-floor',
    [[800, 529]],
    SIZES.paysage,
    'A woman in an embroidered gown reclining on a mosaic floor, photographed from above, in black and white.',
  ),
} satisfies Record<string, Plate>;

type Slug = keyof typeof PLATES;

/* --------------------------------------------------------------------------
   The hangs.
   -------------------------------------------------------------------------- */

const NOIR = { ground: 'var(--noir)', hex: '#0A0A0A', variant: 'v2-noir' } as const;
const UMBER = { ground: 'var(--umber)', hex: '#1F1A17', variant: undefined } as const;
const CHARCOAL = { ground: 'var(--charcoal)', hex: '#2A2A2A', variant: 'v2-charcoal' } as const;

const BONE = '#F6F3EE';
const CHAMPAGNE = '#CDB190';

type Wall = typeof NOIR | typeof UMBER | typeof CHARCOAL;

type V2Hero = {
  num: string;
  name: string;
  slug: Slug;
  /** Source dimensions, shown on the tag strip: whether a frame has the pixels
   *  for the hang it has been given is half of what this page is reviewing. */
  dims: string;
  /** The family — becomes `sf-nocturne--{layout}`. */
  layout: 'v2-backdrop' | 'v2-split' | 'v2-column' | 'v2-paysage';
  /** Extra composition modifiers, prefixed `sf-nocturne--` at render. */
  mods?: string[];
  wall: Wall;
  caption: string;
  note: string;
};

const HEROES: V2Hero[] = [
  // — Group A · the backdrops. Four wide, dark, mostly-empty frames; the
  //   photograph is the wall and the type lives in the negative space.
  {
    num: 'A1', name: 'The Desk at Night', slug: 'desk-late', dims: '1774 × 887',
    layout: 'v2-backdrop', mods: ['v2-anchor-mid'], wall: NOIR,
    caption: 'Fig. 01 — The Desk at Night, Paris',
    note: 'Pure black across the left third — the emptiest frame in the set. Watch the Dar SF script already inside the photograph, bottom left.',
  },
  {
    num: 'A2', name: 'The Spread', slug: 'desk-spread', dims: '1774 × 887',
    layout: 'v2-backdrop', wall: UMBER,
    caption: 'Fig. 02 — The Spread, Paris',
    note: 'The same desk re-staged, warmer. Empty top left, so the type keeps the masthead position.',
  },
  {
    num: 'A3', name: 'Morning Shaft', slug: 'light-shaft', dims: '1717 × 916',
    layout: 'v2-backdrop', mods: ['v2-anchor-mid'], wall: UMBER,
    caption: 'Fig. 03 — Morning Shaft, Paris',
    note: 'The light does the composing. The type sits in the shadow the shafts fall through, not on them.',
  },
  {
    num: 'A4', name: 'The Moodboard', slug: 'moodboard', dims: '1536 × 1024',
    layout: 'v2-backdrop', mods: ['v2-anchor-floor'], wall: UMBER,
    caption: 'Fig. 04 — The Moodboard, Studio',
    note: 'No empty edge anywhere — prints fill two thirds, the subject holds the last third. The type goes to the floor and the scrim follows it.',
  },

  // — Group B · the same four, stripped. The apparatus under review.
  {
    num: 'B1', name: 'The Desk — Bare', slug: 'desk-late', dims: '1774 × 887',
    layout: 'v2-backdrop', mods: ['v2-anchor-mid', 'v2-bare'], wall: NOIR,
    caption: 'Fig. 01 — The Desk at Night, Paris',
    note: 'A1 with the masthead rule, the mark and the sub-headline struck. The photograph already carries a wordmark; does it need ours twice?',
  },
  {
    num: 'B2', name: 'The Spread — Bare', slug: 'desk-spread', dims: '1774 × 887',
    layout: 'v2-backdrop', mods: ['v2-bare'], wall: UMBER,
    caption: 'Fig. 02 — The Spread, Paris',
    note: 'A2 stripped. The DAR SF notebook is in-frame and legible — the same question, put more sharply.',
  },
  {
    num: 'B3', name: 'Morning Shaft — Bare', slug: 'light-shaft', dims: '1717 × 916',
    layout: 'v2-backdrop', mods: ['v2-anchor-mid', 'v2-bare'], wall: UMBER,
    caption: 'Fig. 03 — Morning Shaft, Paris',
    note: 'A3 stripped. The frame with the most air in it — the one most likely to be crowded by furniture.',
  },
  {
    num: 'B4', name: 'The Moodboard — Bare', slug: 'moodboard', dims: '1536 × 1024',
    layout: 'v2-backdrop', mods: ['v2-bare'], wall: UMBER,
    caption: 'Fig. 04 — The Moodboard, Studio',
    note: 'A4 stripped, and back to the top anchor: with the rule gone the masthead position is free again.',
  },

  // — Group C · the splits. Seven tall editorial frames: a portrait cannot
  //   hold a full-width hero, so it becomes architecture — a full-height half
  //   of the section, bleeding to the viewport edge.
  {
    num: 'C1', name: 'Over the Shoulder', slug: 'staircase-shoulder', dims: '843 × 1316',
    layout: 'v2-split', mods: ['v2-contain'], wall: NOIR,
    caption: 'Fig. 05 — Grand Staircase, Paris',
    note: 'Mean luminance 137, top decile 216 — the title is contained rather than crossing. The crop holds the turn of the head.',
  },
  {
    num: 'C2', name: 'Seated', slug: 'staircase-seated', dims: '843 × 1261',
    layout: 'v2-split', wall: NOIR,
    caption: 'Fig. 06 — Grand Staircase, Seated',
    note: 'Dark at the top where the title crosses, bright where the gown falls. The crossing is kept here.',
  },
  {
    num: 'C3', name: 'The Sculpture Gallery', slug: 'gallery-standing', dims: '843 × 1261',
    layout: 'v2-split', mods: ['v2-contain'], wall: NOIR,
    caption: 'Fig. 07 — The Sculpture Gallery',
    note: 'A wide-angle interior squeezed into a half — the statue and the plinth have to survive the crop together.',
  },
  {
    num: 'C4', name: 'The Gallery, Gilt', slug: 'gallery-gilt', dims: '930 × 1616',
    layout: 'v2-split', mods: ['v2-mirror', 'v2-contain'], wall: UMBER,
    caption: 'Fig. 08 — The Sculpture Gallery, Gilt',
    note: 'The only colour frame in the set, and its palette IS champagne. Mirrored, on umber — the one hang where the wall and the photograph share a temperature by nature rather than by tuning.',
  },
  {
    num: 'C5', name: 'Tailoring, Noir', slug: 'blazer-noir', dims: '1080 × 1616',
    layout: 'v2-split', wall: NOIR,
    caption: 'Fig. 09 — Tailoring, Noir',
    note: 'The darkest portrait, and the only one already wearing the brand: black tailoring, hands in pockets. The title crosses freely.',
  },
  {
    num: 'C6', name: 'By the Window', slug: 'window-portrait', dims: '1080 × 1616',
    layout: 'v2-column', wall: CHARCOAL,
    caption: 'Fig. 10 — By the Window',
    note: 'The tightest crop in the set, so not a half but a slit — the print reads as a doorway rather than a wall.',
  },
  {
    num: 'C7', name: 'The Cast Shadow', slug: 'window-shadow', dims: '1080 × 1616',
    layout: 'v2-split', mods: ['v2-mirror', 'v2-contain'], wall: NOIR,
    caption: 'Fig. 11 — The Cast Shadow',
    note: 'The most graphic frame here. Mirrored on purpose: she holds the outer edge and the shadow points inward, at the title — which is contained, because the corner it would have crossed is the lit wall, not the dark mass.',
  },

  // — Group D · the framed wides. Landscape, but 843px and 817px wide: at
  //   100vw they would be upscaled 2x on a laptop and 4x on retina, so they
  //   keep the base nocturne's hang with the frame swung to 3:2.
  {
    num: 'D1', name: 'The Balustrade', slug: 'balustrade', dims: '843 × 563',
    layout: 'v2-paysage', wall: CHARCOAL,
    caption: 'Fig. 12 — The Balustrade',
    note: 'Wide, but only 843px of it. Framed, lit and railed like a print, because that is the largest hang the pixels can carry honestly.',
  },
  {
    num: 'D2', name: 'The Mosaic Floor', slug: 'mosaic-floor', dims: '817 × 540',
    layout: 'v2-paysage', wall: NOIR,
    caption: 'Fig. 13 — The Mosaic Floor',
    note: 'Shot from above — the one frame in the set with no horizon. 817px wide; same verdict as D1.',
  },
];

const HANG_LABEL: Record<V2Hero['layout'], string> = {
  'v2-backdrop': 'Backdrop',
  'v2-split': 'Split',
  'v2-column': 'Column',
  'v2-paysage': 'Framed wide',
};

const GROUPS: { head: string; blurb: string; from: number; to: number }[] = [
  { head: 'The Backdrops', blurb: 'Wide, dark, furnished', from: 0, to: 4 },
  { head: 'Stripped', blurb: 'The same four, bare', from: 4, to: 8 },
  { head: 'The Splits', blurb: 'Tall frames as architecture', from: 8, to: 15 },
  { head: 'The Framed Wides', blurb: 'Too small to bleed', from: 15, to: 17 },
];

export default function HeroLabV2Page() {
  return (
    <main id="main">
      <header className="sf-lab-intro sf-lab-intro--v2">
        <div className="sf-container">
          <p className="sf-lab-intro__label">(Hero Lab v2)</p>
          <h1 className="sf-lab-intro__title">Thirteen photographs, seventeen hangs.</h1>
          <p className="sf-lab-intro__lede">
            The first lab asked which wall the hero hangs on. This one asks the
            opposite question: which photograph the hero should be built
            around. Four of the thirteen new frames are wide, dark and almost
            empty — they become the wall, and the type lives in the negative
            space they were chosen for. Seven are tall editorial portraits that
            cannot hold a full-width screen, so they become architecture: a
            full-height half of the section, bleeding to the viewport edge. Two
            are wide but only 840px of it, and are framed rather than bled,
            because a soft hero is not a hero you can judge. The four backdrops
            are each hung twice, furnished and bare, because the gallery
            apparatus is under review with them. The copy never changes — only
            the label, and the picture.
          </p>
          <p className="sf-lab-intro__flag">Unindexed — internal review only</p>
        </div>

        <div className="sf-container">
          <nav className="sf-lab-index" aria-label="Jump to a hang">
            {GROUPS.map((group) => (
              <div key={group.head}>
                <p className="sf-lab-index__head">
                  {group.head} — {group.blurb}
                </p>
                <ul>
                  {HEROES.slice(group.from, group.to).map((v) => (
                    <li key={v.num}>
                      <a href={`#lab-v2-${v.num.toLowerCase()}`}>
                        {v.num} — {v.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <HeaderSentinel />
      </header>

      {HEROES.map((v, i) => (
        <Fragment key={v.num}>
          <div
            className="sf-lab-tag"
            id={`lab-v2-${v.num.toLowerCase()}`}
            style={{ background: v.wall.ground, color: BONE }}
          >
            <span style={{ color: CHAMPAGNE }}>{v.num}</span>
            <span>{v.name}</span>
            <span className="sf-lab-tag__hang">{HANG_LABEL[v.layout]}</span>
            <span className="sf-lab-tag__dims">{v.dims}</span>
            <span className="sf-lab-tag__note">{v.note}</span>
          </div>
          <HeroNocturne
            {...hero}
            image={PLATES[v.slug]}
            labelMeta={v.caption}
            layout={v.layout}
            variant={v.wall.variant}
            className={[...(v.mods ?? []).map((m) => `sf-nocturne--${m}`), `sf-v2-${v.slug}`].join(' ')}
            id={`hero-v2-${v.num.toLowerCase()}`}
            titleAs="h2"
            /* Only the first hang is an LCP candidate — see HeroNocturne. */
            priority={i === 0}
          />
        </Fragment>
      ))}

      <footer className="sf-lab-notes">
        <div className="sf-container">
          <p className="sf-lab-notes__head">(The Verdict)</p>
          <h2 className="sf-lab-notes__title">How to judge a photograph.</h2>
          <ol className="sf-lab-notes__rubric">
            <li>
              Does the frame hold a title — is there space the type can live in,
              or is it fighting the picture for the same pixels?
            </li>
            <li>
              Does the subject survive the handset crop? A 2:1 frame on a
              390&thinsp;×&thinsp;844 screen shows about a quarter of its width.
            </li>
            <li>
              Are the pixels honest at this hang — nothing upscaled, nothing
              soft at 2× device pixel ratio?
            </li>
            <li>
              Do the photograph and its wall agree on temperature? One grade per
              viewport (§08), and the wall is half of it.
            </li>
            <li>
              Furnished or bare: does the gallery apparatus earn its place on
              this frame, or crowd it? Compare each A against its B.
            </li>
            <li>
              Does it still read as Dar SF’s museum-night, rather than a stock
              luxury template?
            </li>
          </ol>

          <p className="sf-lab-notes__flag">
            <strong>One flag before anything ships.</strong> Every backdrop
            carries a legibility scrim, and a scrim is a gradient —
            DESIGN-DIRECTION §09 permits exactly three depth exceptions, and
            this is not yet one of them. /hero-lab raised the same flag against
            its Cinema variant. If a backdrop wins here, §09 is amended to name
            the scrim as a fourth exception <em>first</em>, and the hero ships
            after.
          </p>

          <div className="sf-lab-notes__scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Hang</th>
                  <th scope="col">Photograph</th>
                  <th scope="col">Source</th>
                  <th scope="col">Treatment</th>
                  <th scope="col">Wall</th>
                  <th scope="col">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {HEROES.map((v) => (
                  <tr key={v.num}>
                    <td>
                      {v.num} — {v.name}
                    </td>
                    <td>{v.caption.replace(/^Fig\. \d+ — /, '')}</td>
                    <td>{v.dims}</td>
                    <td>
                      {HANG_LABEL[v.layout]}
                      {(v.mods ?? [])
                        .map((m) => ` · ${m.replace('v2-', '')}`)
                        .join('')}
                    </td>
                    <td>
                      <span
                        className="sf-lab-notes__swatch"
                        style={{ background: v.wall.hex }}
                        aria-hidden="true"
                      />
                      {v.wall.hex}
                    </td>
                    <td aria-label="Verdict, to be filled in during review" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </footer>
    </main>
  );
}
