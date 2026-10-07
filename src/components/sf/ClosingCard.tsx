import Link from 'next/link';
import Reveal from './Reveal';
import Picture from './Picture';
import { Headed } from './HomeSections';
import type { Head, Plate } from '@/content/seed';

/**
 * ClosingCard — the house lights, and the hero's bookend.
 *
 * The restraint was right and the symmetry was not: set centred, it was the
 * third centred block in a row and it answered a hero that is entirely
 * asymmetric. It now carries the hero's own anatomy in reverse — an opening
 * rule, the statement set LEFT at display scale, and a closing rail that
 * mirrors the hero's meta rail with the pitch at the left hand and the way
 * out at the right.
 *
 * With `image` (the homepage — the final copy asks for "a large luxury
 * cinematic image") the photograph becomes the wall: the lounge above the
 * city at night, art-directed per breakpoint so the 6.4:1 delivery is never
 * stretched to a band's height, the words on a scrim poured from the left.
 * The opening rule is the image-less closer's own device and does not
 * travel with it. Inner pages keep the bare wall.
 *
 * `text` may be several paragraphs (the About copy gives two), and
 * `rule={false}` drops the opening rule where the copy names no label.
 */
export default function ClosingCard({
  head,
  text,
  cta,
  image,
  rule = true,
}: {
  head: Head;
  text: string | string[];
  cta: { label: string; href: string };
  image?: Plate;
  rule?: boolean;
}) {
  return (
    <section
      className={`sf-section sf-close${image ? ' sf-close--image' : ''}`}
      aria-label="Start a project"
    >
      {image && (
        <>
          <figure className="sf-close__media">
            <Picture plate={image} />
          </figure>
          <div className="sf-close__scrim" aria-hidden="true" />
        </>
      )}
      <div className="sf-container">
        {!image && rule && (
          <div className="sf-close__rule">
            <span>(Start a Project)</span>
            <span className="sf-close__note">Est. MMXXVI — Paris</span>
          </div>
        )}
        <Reveal as="h2" className="sf-close__title">
          <Headed head={head} />
        </Reveal>
        <div className="sf-close__rail">
          {Array.isArray(text) ? (
            <Reveal className="sf-close__text" delay={100}>
              {text.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </Reveal>
          ) : (
            <Reveal as="p" className="sf-close__text" delay={100}>
              {text}
            </Reveal>
          )}
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
