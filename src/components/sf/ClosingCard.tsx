import Link from 'next/link';
import Reveal from './Reveal';
import { Headed } from './HomeSections';
import type { Head, Plate } from '@/content/seed';

/**
 * ClosingCard — the last room. The closing invitation returns to the
 * opening's grammar: the lounge photograph hangs as a framed panorama on
 * a drawn rail under the picture light, and the closing line crosses onto
 * the print from below — the hero's move, said once more at the exit.
 * A champagne hairline at the section's end seams the colophon away.
 * (Supersedes the ported sf-cta band; see site.css.)
 */
export default function ClosingCard({
  image,
  head,
  text,
  cta,
}: {
  image: Plate;
  head: Head;
  text: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="sf-section sf-close" aria-label="Start a project">
      <div className="sf-container">
        <Reveal className="sf-close__hang">
          <figure className="sf-close__plate">
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.sizes}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <h2 className="sf-close__title">
            <Headed head={head} />
          </h2>
        </Reveal>

        <div className="sf-close__foot">
          <Reveal as="p" className="sf-close__text">
            {text}
          </Reveal>
          <Reveal delay={120}>
            <Link className="sf-btn" href={cta.href}>
              {cta.label} <span aria-hidden="true">&#8599;</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
