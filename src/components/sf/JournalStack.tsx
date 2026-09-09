'use client';

/**
 * JournalStack — the recede of the covered sheets.
 *
 * The stacking itself is CSS (`position: sticky` on each card wrapper —
 * see the block in site.css; no JS required, no-JS keeps the stack). What
 * GSAP adds is the recede: as sheet N+1 advances over sheet N, N's
 * `--sf-p` scrubs 0→1 and CSS scales it down and washes it — one custom
 * property written by JS, the look owned by CSS, per the WordReveal
 * precedent. `scrub: 1`, `ease: 'none'`: the hand drives, the glide lags.
 *
 * Renders the `.sf-journal__index` itself so row markup stays untouched;
 * the cards inside are the Row Reveal wrappers carrying `sf-journal__card`.
 */
import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from './animation/gsap';

/** Mirrors --stack-top (clamp(5.5rem, 12vh, 8rem)) so the recede completes
 *  exactly as the covering sheet reaches its own pin. */
const stickyTopOf = (index: number) =>
  `${Math.round(Math.min(128, Math.max(88, window.innerHeight * 0.12))) + index * 14}px`;

export default function JournalStack({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>('.sf-journal__card'));

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1025px)', () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return; // the last sheet is never covered
          gsap.fromTo(
            card,
            { '--sf-p': 0 },
            {
              '--sf-p': 1,
              ease: 'none',
              scrollTrigger: {
                trigger: next,
                start: 'top bottom',
                end: () => `top ${stickyTopOf(i + 1)}`,
                scrub: 1,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div className="sf-journal__index" ref={scope}>
      {children}
    </div>
  );
}
