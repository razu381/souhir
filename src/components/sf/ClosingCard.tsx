/**
 * ClosingCard — the CTA title card. Native 6.4:1 letterbox of the lounge at
 * night, umber feathers at the seams, the closing line beneath — the felt
 * half in champagne italic. Chapterless: the page opens on a card and
 * closes on one.
 */
import Link from 'next/link';
import Reveal from './Reveal';
import { Headed } from './HomeSections';
import type { Head, Plate } from '@/content/seed';

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
    <section className="sf-section sf-cta" aria-label="Start a project">
      <figure className="sf-cta__band">
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
      <div className="sf-container">
        <Reveal as="h2" className="sf-cta__title">
          <Headed head={head} />
        </Reveal>
        <Reveal as="p" className="sf-cta__text">
          {text}
        </Reveal>
        <Reveal delay={120}>
          <Link className="sf-btn" href={cta.href}>
            {cta.label} <span aria-hidden="true">&#8599;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
