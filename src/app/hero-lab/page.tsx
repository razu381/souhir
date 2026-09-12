import type { Metadata } from 'next';
import { Fragment } from 'react';
import HeroNocturne from '@/components/sf/HeroNocturne';
import { HeaderSentinel } from '@/components/sf/PageTitle';
import { hero, type Plate } from '@/content/seed';

/**
 * Hero Lab — /hero-lab. Internal review page, unindexed.
 *
 * The same Nocturne component hung on seventeen walls: a controlled ground
 * sweep (identical plate and copy), five recompositions, and three
 * temperature-matched wall+plate pairings. Every instance renders at full
 * viewport height, because the hero is a one-screen composition and judging
 * it scaled is judging it wrongly. Review-only styles live in sf/hero-lab.css;
 * the promotion recipe is in that file's header and the notes band below.
 */

export const metadata: Metadata = {
  title: 'Hero Lab',
  description: 'Internal hero experiments — not for publication.',
  robots: { index: false, follow: false },
};

/* Alternative plates for the composition and pairing groups. The audit rule:
   warm-shadow plates on warm walls, cool-shadow plates on cool walls —
   see the notes band. */
const founderPlate: Plate = {
  src: '/assets/hero/hands-pockets-1200.webp',
  srcSet:
    '/assets/hero/hands-pockets-480.webp 480w, /assets/hero/hands-pockets-800.webp 800w, /assets/hero/hands-pockets-1200.webp 1200w',
  sizes: '(min-width: 1025px) 32vw, 88vw',
  width: 1200,
  height: 1800,
  alt: 'A woman in a black tailored suit, hands in pockets, standing in a Parisian street at dusk.',
};

const velocityPlate: Plate = {
  src: '/assets/work/velocity-1200.webp',
  srcSet: '/assets/work/velocity-800.webp 800w, /assets/work/velocity-1200.webp 1200w',
  sizes: '100vw',
  width: 1200,
  height: 800,
  alt: 'A woman beside a vintage sports car on a Parisian street at night, in black and white.',
};

const ritualPlate: Plate = {
  src: '/assets/work/ritual-1200.webp',
  srcSet: '/assets/work/ritual-800.webp 800w, /assets/work/ritual-1200.webp 1200w',
  sizes: '(min-width: 1025px) 32vw, 88vw',
  width: 1200,
  height: 800,
  alt: 'A candlelit spa treatment, warm amber light against deep shadow.',
};

type LabVariant = {
  id: string;
  anchor: string;
  num: string;
  name: string;
  /** CSS colour of the wall — paints the wall-label strip. */
  ground: string;
  hex: string;
  /** Wall-label strip colours (inline, per variant). */
  fg: string;
  accent: string;
  note: string;
  variant?: string;
  layout?: string;
  className?: string;
  image?: Plate;
};

const BONE = '#F6F3EE';
const CHAMPAGNE = '#CDB190';
const INK = '#141414';
const BRONZE = '#7F674A';

const VARIANTS: LabVariant[] = [
  // — 00 + Group A · the ground sweep (same plate, same composition) —
  {
    id: 'hero-baseline', anchor: 'lab-00', num: '00', name: 'Umber — Baseline',
    ground: 'var(--umber)', hex: '#1F1A17', fg: BONE, accent: CHAMPAGNE,
    note: 'The current wall — warm shadows dissolve into it.',
  },
  {
    id: 'hero-a1', anchor: 'lab-a1', num: 'A1', name: 'Espresso',
    ground: 'var(--lab-espresso)', hex: '#2B211A', fg: BONE, accent: CHAMPAGNE, variant: 'espresso',
    note: 'A warmer, softer night.',
  },
  {
    id: 'hero-a2', anchor: 'lab-a2', num: 'A2', name: 'Oxblood',
    ground: 'var(--lab-bordeaux)', hex: '#2B151A', fg: BONE, accent: CHAMPAGNE, variant: 'bordeaux',
    note: 'The wine wall — warm plate on wine, maximal warmth.',
  },
  {
    id: 'hero-a3', anchor: 'lab-a3', num: 'A3', name: 'Noir',
    ground: 'var(--noir)', hex: '#0A0A0A', fg: BONE, accent: CHAMPAGNE, variant: 'noir',
    note: 'Formal gallery black — the coldest of the warm-walls.',
  },
  {
    id: 'hero-a4', anchor: 'lab-a4', num: 'A4', name: 'Charcoal — Control',
    ground: 'var(--charcoal)', hex: '#2A2A2A', fg: BONE, accent: CHAMPAGNE, variant: 'charcoal',
    note: 'The null hypothesis — most likely to read industrial.',
  },
  {
    id: 'hero-a5', anchor: 'lab-a5', num: 'A5', name: 'Pine',
    ground: 'var(--lab-forest)', hex: '#14251E', fg: BONE, accent: CHAMPAGNE, variant: 'forest',
    note: 'Warm plate on a cold wall — deliberate tension; see C1.',
  },
  {
    id: 'hero-a6', anchor: 'lab-a6', num: 'A6', name: 'Midnight',
    ground: 'var(--lab-midnight)', hex: '#10151F', fg: BONE, accent: CHAMPAGNE, variant: 'midnight',
    note: 'Warm plate on cold navy — see C2 for the matched plate.',
  },
  {
    id: 'hero-a7', anchor: 'lab-a7', num: 'A7', name: 'Bone — Daylight',
    ground: 'var(--bone)', hex: '#F6F3EE', fg: INK, accent: BRONZE, variant: 'bone',
    note: 'Lamp off, bronze accents — breaks the opens-in-the-dark contract.',
  },
  {
    id: 'hero-a8', anchor: 'lab-a8', num: 'A8', name: 'Paper — Daylight',
    ground: 'var(--paper)', hex: '#FFFFFF', fg: INK, accent: BRONZE, variant: 'paper',
    note: 'The stark pole of the light family.',
  },

  // — Group B · recompositions (new layout + new ground) —
  {
    id: 'hero-b1', anchor: 'lab-b1', num: 'B1', name: 'Mirror',
    ground: 'var(--lab-bordeaux)', hex: '#2B151A', fg: BONE, accent: CHAMPAGNE,
    layout: 'mirror', variant: 'bordeaux',
    note: 'The hang reversed — print on the left wall, wine ground.',
  },
  {
    id: 'hero-b2', anchor: 'lab-b2', num: 'B2', name: 'Monument',
    ground: 'var(--lab-midnight)', hex: '#10151F', fg: BONE, accent: CHAMPAGNE,
    layout: 'monument', variant: 'midnight',
    note: 'Centred stack, gallery furniture kept.',
  },
  {
    id: 'hero-b3', anchor: 'lab-b3', num: 'B3', name: 'Split — The Doorway',
    ground: 'var(--lab-forest)', hex: '#14251E', fg: BONE, accent: CHAMPAGNE,
    layout: 'split', variant: 'forest', image: founderPlate,
    note: 'Full-height bleeding print, no frame or light — founder plate on pine.',
  },
  {
    id: 'hero-b4', anchor: 'lab-b4', num: 'B4', name: 'Cinema',
    ground: 'var(--noir)', hex: '#0A0A0A', fg: BONE, accent: CHAMPAGNE,
    layout: 'cinema', image: velocityPlate,
    note: 'The photograph is the wall — velocity plate under a legibility scrim.',
  },
  {
    id: 'hero-b5', anchor: 'lab-b5', num: 'B5', name: 'Typographic',
    ground: 'var(--lab-espresso)', hex: '#2B211A', fg: BONE, accent: CHAMPAGNE,
    layout: 'typographic', variant: 'espresso',
    note: 'No plate — the Didone alone carries the screen.',
  },

  // — Group C · temperature pairings (same composition, matched plate) —
  {
    id: 'hero-c1', anchor: 'lab-c1', num: 'C1', name: 'Pine / Founder Plate',
    ground: 'var(--lab-forest)', hex: '#14251E', fg: BONE, accent: CHAMPAGNE,
    variant: 'forest', image: founderPlate,
    note: 'A5’s wall, re-hung: warm brown-black subject mass floats off cool pine.',
  },
  {
    id: 'hero-c2', anchor: 'lab-c2', num: 'C2', name: 'Midnight / Velocity',
    ground: 'var(--lab-midnight)', hex: '#10151F', fg: BONE, accent: CHAMPAGNE,
    variant: 'midnight', image: velocityPlate, className: 'sf-pair-velocity',
    note: 'A6’s wall, re-hung: cool platinum plate, blue-black shadows sink in.',
  },
  {
    id: 'hero-c3', anchor: 'lab-c3', num: 'C3', name: 'Oxblood / Ritual',
    ground: 'var(--lab-bordeaux)', hex: '#2B151A', fg: BONE, accent: CHAMPAGNE,
    variant: 'bordeaux', image: ritualPlate, className: 'sf-pair-ritual',
    note: 'A2’s wall, re-hung: candlelight on wine; the frame keeps the edge.',
  },

  // — Group D · the brand rooms (every ground derived from the mark) —
  {
    id: 'hero-d1', anchor: 'lab-d1', num: 'D1', name: 'Noir Doré',
    ground: 'var(--lab-noir-dore)', hex: '#171310', fg: BONE, accent: CHAMPAGNE,
    variant: 'noir-dore',
    note: 'The logo’s own pairing — noir warmed toward the gold mark.',
  },
  {
    id: 'hero-d2', anchor: 'lab-d2', num: 'D2', name: 'Bronze Noir',
    ground: 'var(--lab-bronze-noir)', hex: '#221C13', fg: BONE, accent: CHAMPAGNE,
    variant: 'bronze-noir',
    note: 'Bronze #7F674A — the system’s own mid-tone — darkened to a wall.',
  },
  {
    id: 'hero-d3', anchor: 'lab-d3', num: 'D3', name: 'Cognac',
    ground: 'var(--lab-cognac)', hex: '#2A1E12', fg: BONE, accent: CHAMPAGNE,
    variant: 'cognac',
    note: 'Candlelit leather — the warm photography’s own register.',
  },
  {
    id: 'hero-d4', anchor: 'lab-d4', num: 'D4', name: 'Taupe Fumé',
    ground: 'var(--lab-taupe)', hex: '#282320', fg: BONE, accent: CHAMPAGNE,
    variant: 'taupe',
    note: 'Champagne’s pale-taupe undertone, smoked to a night ground.',
  },
  {
    id: 'hero-d5', anchor: 'lab-d5', num: 'D5', name: 'Vert Doré',
    ground: 'var(--lab-vert-dore)', hex: '#1E2114', fg: BONE, accent: CHAMPAGNE,
    variant: 'vert-dore',
    note: 'Olive with a gold undertone — the brand-correct green.',
  },
  {
    id: 'hero-d6', anchor: 'lab-d6', num: 'D6', name: 'Figue',
    ground: 'var(--lab-fig)', hex: '#271A1D', fg: BONE, accent: CHAMPAGNE,
    variant: 'fig',
    note: 'Warm aubergine — the jewel tone champagne sits on, classically.',
  },
  {
    id: 'hero-d7', anchor: 'lab-d7', num: 'D7', name: 'Champagne — Daylight',
    ground: 'var(--lab-champagne)', hex: '#EFE6D8', fg: INK, accent: BRONZE,
    variant: 'champagne',
    note: 'The accent itself, lifted to a wall — the brand colour as ground.',
  },
  {
    id: 'hero-d8', anchor: 'lab-d8', num: 'D8', name: 'Sable — Daylight',
    ground: 'var(--lab-sable)', hex: '#E2D7C4', fg: INK, accent: BRONZE,
    variant: 'sable',
    note: 'Champagne’s taupe shadow — the warm-sand light.',
  },
  {
    id: 'hero-d9', anchor: 'lab-d9', num: 'D9', name: 'Marquee',
    ground: 'var(--lab-noir-dore)', hex: '#171310', fg: BONE, accent: CHAMPAGNE,
    layout: 'marquee', variant: 'noir-dore',
    note: 'The one-line statement — the Didone spans the wall.',
  },
  {
    id: 'hero-d10', anchor: 'lab-d10', num: 'D10', name: 'Paysage',
    ground: 'var(--lab-fig)', hex: '#271A1D', fg: BONE, accent: CHAMPAGNE,
    layout: 'paysage', variant: 'fig', image: ritualPlate, className: 'sf-pair-ritual',
    note: 'The landscape hang — one wide candlelit print on warm aubergine.',
  },
];

const DECISION_ROWS: {
  num: string; name: string; hex: string; ground: string; plate: string;
  title: string; accent: string;
}[] = [
  { num: '00', name: 'Umber (current)', hex: '#1F1A17', ground: '#1F1A17', plate: 'Staircase', title: '16.7 : 1', accent: '9.1 : 1' },
  { num: 'A1', name: 'Espresso', hex: '#2B211A', ground: '#2B211A', plate: 'Staircase', title: '15.2 : 1', accent: '8.3 : 1' },
  { num: 'A2', name: 'Oxblood', hex: '#2B151A', ground: '#2B151A', plate: 'Staircase', title: '16.5 : 1', accent: '9.0 : 1' },
  { num: 'A3', name: 'Noir', hex: '#0A0A0A', ground: '#0A0A0A', plate: 'Staircase', title: '18.7 : 1', accent: '10.2 : 1' },
  { num: 'A4', name: 'Charcoal (control)', hex: '#2A2A2A', ground: '#2A2A2A', plate: 'Staircase', title: '13.8 : 1', accent: '7.5 : 1' },
  { num: 'A5', name: 'Pine', hex: '#14251E', ground: '#14251E', plate: 'Staircase', title: '15.4 : 1', accent: '8.4 : 1' },
  { num: 'A6', name: 'Midnight', hex: '#10151F', ground: '#10151F', plate: 'Staircase', title: '17.3 : 1', accent: '9.6 : 1' },
  { num: 'A7', name: 'Bone', hex: '#F6F3EE', ground: '#F6F3EE', plate: 'Staircase', title: '17.7 : 1 (ink)', accent: '4.8 : 1 (bronze)' },
  { num: 'A8', name: 'Paper', hex: '#FFFFFF', ground: '#FFFFFF', plate: 'Staircase', title: '17.4 : 1 (ink)', accent: '5.3 : 1 (bronze)' },
  { num: 'B1', name: 'Mirror', hex: '#2B151A', ground: '#2B151A', plate: 'Staircase', title: '16.5 : 1', accent: '9.0 : 1' },
  { num: 'B2', name: 'Monument', hex: '#10151F', ground: '#10151F', plate: 'Staircase', title: '17.3 : 1', accent: '9.6 : 1' },
  { num: 'B3', name: 'Split', hex: '#14251E', ground: '#14251E', plate: 'Founder', title: '15.4 : 1', accent: '8.4 : 1' },
  { num: 'B4', name: 'Cinema', hex: '#0A0A0A', ground: '#0A0A0A', plate: 'Velocity', title: '—', accent: '—' },
  { num: 'B5', name: 'Typographic', hex: '#2B211A', ground: '#2B211A', plate: 'None', title: '15.2 : 1', accent: '8.3 : 1' },
  { num: 'C1', name: 'Pine / Founder', hex: '#14251E', ground: '#14251E', plate: 'Founder', title: '15.4 : 1', accent: '8.4 : 1' },
  { num: 'C2', name: 'Midnight / Velocity', hex: '#10151F', ground: '#10151F', plate: 'Velocity', title: '17.3 : 1', accent: '9.6 : 1' },
  { num: 'C3', name: 'Oxblood / Ritual', hex: '#2B151A', ground: '#2B151A', plate: 'Ritual', title: '16.5 : 1', accent: '9.0 : 1' },
  { num: 'D1', name: 'Noir Doré', hex: '#171310', ground: '#171310', plate: 'Staircase', title: '17.7 : 1', accent: '9.7 : 1' },
  { num: 'D2', name: 'Bronze Noir', hex: '#221C13', ground: '#221C13', plate: 'Staircase', title: '16.3 : 1', accent: '9.0 : 1' },
  { num: 'D3', name: 'Cognac', hex: '#2A1E12', ground: '#2A1E12', plate: 'Staircase', title: '15.6 : 1', accent: '8.6 : 1' },
  { num: 'D4', name: 'Taupe Fumé', hex: '#282320', ground: '#282320', plate: 'Staircase', title: '15.0 : 1', accent: '8.3 : 1' },
  { num: 'D5', name: 'Vert Doré', hex: '#1E2114', ground: '#1E2114', plate: 'Staircase', title: '15.8 : 1', accent: '8.7 : 1' },
  { num: 'D6', name: 'Figue', hex: '#271A1D', ground: '#271A1D', plate: 'Staircase', title: '16.2 : 1', accent: '9.0 : 1' },
  { num: 'D7', name: 'Champagne', hex: '#EFE6D8', ground: '#EFE6D8', plate: 'Staircase', title: '15.9 : 1 (ink)', accent: '4.3 : 1 (bronze)*' },
  { num: 'D8', name: 'Sable', hex: '#E2D7C4', ground: '#E2D7C4', plate: 'Staircase', title: '13.9 : 1 (ink)', accent: '3.8 : 1 (bronze)*' },
  { num: 'D9', name: 'Marquee', hex: '#171310', ground: '#171310', plate: 'Staircase', title: '17.7 : 1', accent: '9.7 : 1' },
  { num: 'D10', name: 'Paysage', hex: '#271A1D', ground: '#271A1D', plate: 'Ritual', title: '16.2 : 1', accent: '9.0 : 1' },
];

/** Contrast figures are approximate (γ-2.2) — spot-check anything close.
 *  (*) D7/D8 bronze sits under 4.5:1: fine for the large italic label, and
 *  the 11px mark reads as decorative there — but flag it if either wins. */

export default function HeroLabPage() {
  return (
    <main id="main">
      <header className="sf-lab-intro">
        <div className="sf-container">
          <p className="sf-lab-intro__label">(Hero Lab)</p>
          <h1 className="sf-lab-intro__title">Twenty-seven ways to open the night.</h1>
          <p className="sf-lab-intro__lede">
            The same Nocturne, hung on twenty-seven walls. The first sweep
            changes only the ground — identical composition, plate and copy.
            Five recompositions and three temperature-matched pairings follow,
            and the lab closes with the brand rooms: grounds derived from the
            mark itself — champagne and its bronze, its taupe shadow, its
            leather, its jewel tones. The decision under review is a pair: the
            wall is half the photograph.
          </p>
          <p className="sf-lab-intro__flag">Unindexed — internal review only</p>
        </div>

        <div className="sf-container">
          <nav className="sf-lab-index" aria-label="Jump to a variant">
            <div>
              <p className="sf-lab-index__head">The Walls</p>
              <ul>
                {VARIANTS.slice(0, 9).map((v) => (
                  <li key={v.id}>
                    <a href={`#${v.anchor}`}>
                      <span className="sf-lab-index__chip" style={{ background: v.hex }} aria-hidden="true" />
                      {v.num} — {v.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="sf-lab-index__head">The Compositions</p>
              <ul>
                {VARIANTS.slice(9, 14).map((v) => (
                  <li key={v.id}>
                    <a href={`#${v.anchor}`}>
                      <span className="sf-lab-index__chip" style={{ background: v.hex }} aria-hidden="true" />
                      {v.num} — {v.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="sf-lab-index__head">The Pairings</p>
              <ul>
                {VARIANTS.slice(14, 17).map((v) => (
                  <li key={v.id}>
                    <a href={`#${v.anchor}`}>
                      <span className="sf-lab-index__chip" style={{ background: v.hex }} aria-hidden="true" />
                      {v.num} — {v.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="sf-lab-index__head">The Brand Rooms</p>
              <ul>
                {VARIANTS.slice(17).map((v) => (
                  <li key={v.id}>
                    <a href={`#${v.anchor}`}>
                      <span className="sf-lab-index__chip" style={{ background: v.hex }} aria-hidden="true" />
                      {v.num} — {v.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <HeaderSentinel />
      </header>

      {VARIANTS.map((v) => (
        <Fragment key={v.id}>
          <div className="sf-lab-tag" id={v.anchor} style={{ background: v.ground, color: v.fg }}>
            <span style={{ color: v.accent }}>{v.num}</span>
            <span>{v.name}</span>
            <span className="sf-lab-tag__hex">{v.hex}</span>
            <span className="sf-lab-tag__note">{v.note}</span>
          </div>
          <HeroNocturne
            {...hero}
            image={v.image ?? hero.image}
            variant={v.variant}
            layout={v.layout}
            className={v.className}
            id={v.id}
            titleAs="h2"
          />
        </Fragment>
      ))}

      <footer className="sf-lab-notes">
        <div className="sf-container">
          <p className="sf-lab-notes__head">(The Verdict)</p>
          <h2 className="sf-lab-notes__title">How to judge a wall.</h2>
          <ol className="sf-lab-notes__rubric">
            <li>Does the plate dissolve into the wall, or butt against it?</li>
            <li>Does champagne still sing — brass on pine, gilt on navy, or mud on charcoal?</li>
            <li>Do the plate’s shadows and the wall’s temperature agree?</li>
            <li>Does the composition still close inside one screen?</li>
            <li>Does it still feel like Dar SF’s museum-night, not a generic luxury template?</li>
          </ol>
          <div className="sf-lab-notes__scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Variant</th>
                  <th scope="col">Wall</th>
                  <th scope="col">Plate</th>
                  <th scope="col">Title</th>
                  <th scope="col">Accent</th>
                  <th scope="col">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {DECISION_ROWS.map((row) => (
                  <tr key={row.num}>
                    <td>{row.num} — {row.name}</td>
                    <td><span className="sf-lab-notes__swatch" style={{ background: row.ground }} aria-hidden="true" />{row.hex}</td>
                    <td>{row.plate}</td>
                    <td>{row.title}</td>
                    <td>{row.accent}</td>
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
