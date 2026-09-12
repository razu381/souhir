import type { Metadata } from 'next';
import { Fragment } from 'react';
import HeroNocturne from '@/components/sf/HeroNocturne';
import { HeaderSentinel } from '@/components/sf/PageTitle';
import { hero, type Plate } from '@/content/seed';

/**
 * Hero Lab — /hero-lab. Internal review page, unindexed.
 *
 * The same Nocturne component hung on twenty-seven walls: a controlled ground
 * sweep (identical plate and copy), five recompositions, and three
 * temperature-matched wall+plate pairings, closing with the brand rooms.
 * Every instance renders at full viewport height, because the hero is a
 * one-screen composition and judging it scaled is judging it wrongly.
 * Review-only styles live in sf/hero-lab.css; the promotion recipe is in
 * that file's header.
 */

export const metadata: Metadata = {
  title: 'Hero Lab',
  description: 'Internal hero experiments — not for publication.',
  robots: { index: false, follow: false },
};

/* Alternative plates for the composition and pairing groups. The audit rule:
   warm-shadow plates on warm walls, cool-shadow plates on cool walls. */
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
  },
  {
    id: 'hero-a1', anchor: 'lab-a1', num: 'A1', name: 'Espresso',
    ground: 'var(--lab-espresso)', hex: '#2B211A', fg: BONE, accent: CHAMPAGNE, variant: 'espresso',
  },
  {
    id: 'hero-a2', anchor: 'lab-a2', num: 'A2', name: 'Oxblood',
    ground: 'var(--lab-bordeaux)', hex: '#2B151A', fg: BONE, accent: CHAMPAGNE, variant: 'bordeaux',
  },
  {
    id: 'hero-a3', anchor: 'lab-a3', num: 'A3', name: 'Noir',
    ground: 'var(--noir)', hex: '#0A0A0A', fg: BONE, accent: CHAMPAGNE, variant: 'noir',
  },
  {
    id: 'hero-a4', anchor: 'lab-a4', num: 'A4', name: 'Charcoal — Control',
    ground: 'var(--charcoal)', hex: '#2A2A2A', fg: BONE, accent: CHAMPAGNE, variant: 'charcoal',
  },
  {
    id: 'hero-a5', anchor: 'lab-a5', num: 'A5', name: 'Pine',
    ground: 'var(--lab-forest)', hex: '#14251E', fg: BONE, accent: CHAMPAGNE, variant: 'forest',
  },
  {
    id: 'hero-a6', anchor: 'lab-a6', num: 'A6', name: 'Midnight',
    ground: 'var(--lab-midnight)', hex: '#10151F', fg: BONE, accent: CHAMPAGNE, variant: 'midnight',
  },
  {
    id: 'hero-a7', anchor: 'lab-a7', num: 'A7', name: 'Bone — Daylight',
    ground: 'var(--bone)', hex: '#F6F3EE', fg: INK, accent: BRONZE, variant: 'bone',
  },
  {
    id: 'hero-a8', anchor: 'lab-a8', num: 'A8', name: 'Paper — Daylight',
    ground: 'var(--paper)', hex: '#FFFFFF', fg: INK, accent: BRONZE, variant: 'paper',
  },

  // — Group B · recompositions (new layout + new ground) —
  {
    id: 'hero-b1', anchor: 'lab-b1', num: 'B1', name: 'Mirror',
    ground: 'var(--lab-bordeaux)', hex: '#2B151A', fg: BONE, accent: CHAMPAGNE,
    layout: 'mirror', variant: 'bordeaux',
  },
  {
    id: 'hero-b2', anchor: 'lab-b2', num: 'B2', name: 'Monument',
    ground: 'var(--lab-midnight)', hex: '#10151F', fg: BONE, accent: CHAMPAGNE,
    layout: 'monument', variant: 'midnight',
  },
  {
    id: 'hero-b3', anchor: 'lab-b3', num: 'B3', name: 'Split — The Doorway',
    ground: 'var(--lab-forest)', hex: '#14251E', fg: BONE, accent: CHAMPAGNE,
    layout: 'split', variant: 'forest', image: founderPlate,
  },
  {
    id: 'hero-b4', anchor: 'lab-b4', num: 'B4', name: 'Cinema',
    ground: 'var(--noir)', hex: '#0A0A0A', fg: BONE, accent: CHAMPAGNE,
    layout: 'cinema', image: velocityPlate,
  },
  {
    id: 'hero-b5', anchor: 'lab-b5', num: 'B5', name: 'Typographic',
    ground: 'var(--lab-espresso)', hex: '#2B211A', fg: BONE, accent: CHAMPAGNE,
    layout: 'typographic', variant: 'espresso',
  },

  // — Group C · temperature pairings (same composition, matched plate) —
  {
    id: 'hero-c1', anchor: 'lab-c1', num: 'C1', name: 'Pine / Founder Plate',
    ground: 'var(--lab-forest)', hex: '#14251E', fg: BONE, accent: CHAMPAGNE,
    variant: 'forest', image: founderPlate,
  },
  {
    id: 'hero-c2', anchor: 'lab-c2', num: 'C2', name: 'Midnight / Velocity',
    ground: 'var(--lab-midnight)', hex: '#10151F', fg: BONE, accent: CHAMPAGNE,
    variant: 'midnight', image: velocityPlate, className: 'sf-pair-velocity',
  },
  {
    id: 'hero-c3', anchor: 'lab-c3', num: 'C3', name: 'Oxblood / Ritual',
    ground: 'var(--lab-bordeaux)', hex: '#2B151A', fg: BONE, accent: CHAMPAGNE,
    variant: 'bordeaux', image: ritualPlate, className: 'sf-pair-ritual',
  },

  // — Group D · the brand rooms (every ground derived from the mark) —
  {
    id: 'hero-d1', anchor: 'lab-d1', num: 'D1', name: 'Noir Doré',
    ground: 'var(--lab-noir-dore)', hex: '#171310', fg: BONE, accent: CHAMPAGNE,
    variant: 'noir-dore',
  },
  {
    id: 'hero-d2', anchor: 'lab-d2', num: 'D2', name: 'Bronze Noir',
    ground: 'var(--lab-bronze-noir)', hex: '#221C13', fg: BONE, accent: CHAMPAGNE,
    variant: 'bronze-noir',
  },
  {
    id: 'hero-d3', anchor: 'lab-d3', num: 'D3', name: 'Cognac',
    ground: 'var(--lab-cognac)', hex: '#2A1E12', fg: BONE, accent: CHAMPAGNE,
    variant: 'cognac',
  },
  {
    id: 'hero-d4', anchor: 'lab-d4', num: 'D4', name: 'Taupe Fumé',
    ground: 'var(--lab-taupe)', hex: '#282320', fg: BONE, accent: CHAMPAGNE,
    variant: 'taupe',
  },
  {
    id: 'hero-d5', anchor: 'lab-d5', num: 'D5', name: 'Vert Doré',
    ground: 'var(--lab-vert-dore)', hex: '#1E2114', fg: BONE, accent: CHAMPAGNE,
    variant: 'vert-dore',
  },
  {
    id: 'hero-d6', anchor: 'lab-d6', num: 'D6', name: 'Figue',
    ground: 'var(--lab-fig)', hex: '#271A1D', fg: BONE, accent: CHAMPAGNE,
    variant: 'fig',
  },
  {
    id: 'hero-d7', anchor: 'lab-d7', num: 'D7', name: 'Champagne — Daylight',
    ground: 'var(--lab-champagne)', hex: '#EFE6D8', fg: INK, accent: BRONZE,
    variant: 'champagne',
  },
  {
    id: 'hero-d8', anchor: 'lab-d8', num: 'D8', name: 'Sable — Daylight',
    ground: 'var(--lab-sable)', hex: '#E2D7C4', fg: INK, accent: BRONZE,
    variant: 'sable',
  },
  {
    id: 'hero-d9', anchor: 'lab-d9', num: 'D9', name: 'Marquee',
    ground: 'var(--lab-noir-dore)', hex: '#171310', fg: BONE, accent: CHAMPAGNE,
    layout: 'marquee', variant: 'noir-dore',
  },
  {
    id: 'hero-d10', anchor: 'lab-d10', num: 'D10', name: 'Paysage',
    ground: 'var(--lab-fig)', hex: '#271A1D', fg: BONE, accent: CHAMPAGNE,
    layout: 'paysage', variant: 'fig', image: ritualPlate, className: 'sf-pair-ritual',
  },
];

export default function HeroLabPage() {
  return (
    <main id="main">
      <header className="sf-lab-intro">
        <div className="sf-container">
          <p className="sf-lab-intro__label">(Hero Lab)</p>
          <h1 className="sf-lab-intro__title">Twenty-seven ways to open the night.</h1>
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
    </main>
  );
}
