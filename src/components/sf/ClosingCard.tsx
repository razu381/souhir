import Link from 'next/link';
import Reveal from './Reveal';
import { Headed } from './HomeSections';
import type { Head } from '@/content/seed';

/**
 * ClosingCard — the house lights, and the hero's bookend.
 *
 * The restraint was right and the symmetry was not: set centred, it was the
 * third centred block in a row and it answered a hero that is entirely
 * asymmetric. It now carries the hero's own anatomy in reverse — an opening
 * rule, the statement set LEFT at display scale, and a closing rail that
 * mirrors the hero's meta rail with the pitch at the left hand and the way
 * out at the right. Still no image; the restraint is still the statement.
 */
export default function ClosingCard({
  head,
  text,
  cta,
}: {
  head: Head;
  text: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="sf-section sf-close" aria-label="Start a project">
      <div className="sf-container">
        <div className="sf-close__rule">
          <span>(Start a Project)</span>
          <span className="sf-close__note">Est. MMXXVI — Paris</span>
        </div>

        <Reveal as="h2" className="sf-close__title">
          <Headed head={head} />
        </Reveal>

        <div className="sf-close__rail">
          <Reveal as="p" className="sf-close__text" delay={100}>
            {text}
          </Reveal>
          <Reveal delay={200}>
            <Link className="sf-btn" href={cta.href}>
              {cta.label} <span aria-hidden="true">&#8599;</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
