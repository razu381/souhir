'use client';

/**
 * PressCovers — the deck deal (scroll-scrubbed).
 *
 * The three covers are dealt from one held pile at the first column —
 * down and tilted, like cards in a hand — and settle onto the wall's
 * existing margin staircase (--b 2.5rem / --c 5rem) as the reader scrolls
 * the wall into the upper third of the viewport. `scrub: 1` supplies the
 * lagged catch-up that reads as expensive; the tween itself runs
 * `ease: 'none'` because the reader's hand is the easing curve.
 *
 * The initial pile pose exists only in JS (applied pre-paint by useGSAP),
 * never in CSS: no-JS and SSR render the dealt wall. Reveal is not used
 * here — its 1100ms CSS transition on transform would fight the per-frame
 * scrub. The shared caption below keeps its plain fade (it is text).
 */
import { useRef } from 'react';
import { gsap, useGSAP } from './animation/gsap';
import type { PressCover } from '@/sanity/fetch';

export default function PressCovers({ covers }: { covers: PressCover[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>('.sf-press__cover'));
      if (cards.length < 2) return;

      // Each card's own tilt in the hand; the pile itself sits over the
      // first column, dropped below the grid line.
      const TILT = [8, -5, 11];

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: '(prefers-reduced-motion: no-preference) and (min-width: 1025px)',
          mobile: '(prefers-reduced-motion: no-preference) and (max-width: 1024px)',
        },
        (ctx) => {
          const desktop = Boolean(ctx.conditions?.desktop);
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root,
              start: 'top 90%',
              end: desktop ? 'top 32%' : 'top 45%',
              scrub: 1,
            },
          });
          cards.forEach((card, i) => {
            tl.fromTo(
              card,
              {
                // Staggered pre-deal arc: cards 1 and 2 wait behind and above
                // card 0, each stepped back and tipped — the full deck in
                // hand. fromTo re-renders with the delay, so cards mid-wait
                // HOLD their start pose (from() alone would snap them to
                // the grid until their slot arrives).
                xPercent: -i * 112 - i * 3,
                y: desktop ? 96 + i * 26 : 48 + i * 14,
                rotate: TILT[i] ?? 8,
                opacity: 1,
              },
              { xPercent: 0, y: 0, rotate: 0, opacity: 1, duration: 0.52 },
              i * 0.22,
            );
          });
        },
      );
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div className="sf-press__covers" ref={scope}>
      {covers.map((cover, i) => (
        <figure
          className={`sf-press__cover${i === 1 ? ' sf-press__cover--b' : i === 2 ? ' sf-press__cover--c' : ''}`}
          key={cover.caption}
        >
          <img
            src={cover.image.src}
            srcSet={cover.image.srcSet}
            sizes={cover.image.sizes}
            alt={cover.image.alt}
            width={cover.image.width}
            height={cover.image.height}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="sf-press__caption">{cover.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
