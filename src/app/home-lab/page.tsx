import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home Lab',
  description: 'Internal homepage recompositions — not for publication.',
  robots: { index: false, follow: false },
};

/** Index of the five homepage recompositions. Unindexed; review only. */
const VERSIONS = [
  {
    href: '/home-v1',
    num: 'V1',
    name: 'Lumière',
    desc: 'The daylight maison. One dark entry — noir doré — then champagne and sable all the way down. The closing movement runs in daylight and ends on ink.',
  },
  {
    href: '/home-v2',
    num: 'V2',
    name: 'Le Musée',
    desc: 'Paper rooms with catalogue numerals and monumental heads, and a black final wing: the quote as pure type, the lit entry, the centred monument.',
  },
  {
    href: '/home-v3',
    num: 'V3',
    name: 'La Nuit',
    desc: 'One continuous night. Noir catalogue, cognac register, fig press, taupe journal — every numeral champagne, the scrim itself re-graded.',
  },
  {
    href: '/home-v4',
    num: 'V4',
    name: 'La Gazette',
    desc: 'The editorial issue. Marquee hero, two-column catalogue, magazine-scale statements, and a closing movement from the back pages.',
  },
  {
    href: '/home-v5',
    num: 'V5',
    name: 'Les Salons',
    desc: 'The brand rooms as page rhythm. Cognac entry, champagne and sable salons, fig clientele, the works on noir doré, the closer on the gold-black.',
  },
];

export default function HomeLab() {
  return (
    <main id="main">
      <header className="sf-lab-intro">
        <div className="sf-container">
          <p className="sf-lab-intro__label">(Home Lab)</p>
          <h1 className="sf-lab-intro__title">Five cuts of the same house.</h1>
          <p className="sf-lab-intro__lede">
            Five recompositions of the full homepage — the production page is
            untouched. Section order and chapter numbering stay canonical; what
            changes is the lighting, the type, and above all the closing
            movement: interlude, correspondence, closer, redesigned in each
            cut. Review each as a whole page.
          </p>
          <p className="sf-lab-intro__flag">Unindexed — internal review only</p>
        </div>
        <div className="sf-container">
          <nav className="sf-lab-index sf-home-lab-index" aria-label="Homepage versions">
            <div>
              <p className="sf-lab-index__head">The Cuts</p>
              <ul>
                {VERSIONS.map((v) => (
                  <li key={v.href}>
                    <Link href={v.href}>
                      {v.num} — {v.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="sf-lab-index__head">The Notes</p>
              <ul className="sf-home-lab-index__descs">
                {VERSIONS.map((v) => (
                  <li key={v.href}>
                    <span className="sf-home-lab-index__num">{v.num}</span>
                    <span>{v.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <span data-sf-header-sentinel aria-hidden="true" />
      </header>
    </main>
  );
}
