import Link from 'next/link';
import Reveal from './Reveal';
import { Headed } from './HomeSections';
import type { Head } from '@/content/seed';

/**
 * ClosingCard — the house lights. After nine sections of photographs the
 * closer is the bare wall: the closing line set monumental and centred
 * between two champagne hairlines, the pitch, the pill. No image — the
 * restraint is the statement (the lounge letterbox, tried as both band
 * and hung print, could never give the moment enough room).
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
        <Reveal as="h2" className="sf-close__title">
          <Headed head={head} />
        </Reveal>
        <Reveal as="p" className="sf-close__text" delay={100}>
          {text}
        </Reveal>
        <Reveal delay={200}>
          <Link className="sf-btn" href={cta.href}>
            {cta.label} <span aria-hidden="true">&#8599;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
