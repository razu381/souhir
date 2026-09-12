'use client';

/**
 * HeroNocturne — port of src/js/modules/hero.js (01-hero.md D8).
 *
 * The hero image is the LCP element, so it is never faded or clipped — the
 * only thing animated on it is `transform: scale()`. Ordering matters more
 * than choreography: wait for the image to decode; within the budget, play
 * the full sequence; past it, jump straight to the final state. The failure
 * mode is "no animation", never "wrong order".
 *
 * The `variant` / `layout` / `className` / `id` / `titleAs` props exist for
 * the /hero-lab review page only; omitted (the homepage's call), the markup
 * is byte-for-byte what it always was.
 */
import { useEffect, useRef } from 'react';
import type { Plate } from '@/content/seed';

const DECODE_BUDGET = 600; // ms

export default function HeroNocturne({
  label,
  note,
  titleLines,
  image,
  labelTitle,
  labelMeta,
  mark,
  sub,
  variant,
  layout,
  className,
  id = 'hero',
  titleAs: TitleTag = 'h1',
  priority = true,
}: {
  label: string;
  note: string;
  titleLines: string[];
  image: Plate;
  labelTitle: string;
  labelMeta: string;
  mark: string;
  sub: string;
  /** Hero Lab: ground modifier — appended as `sf-nocturne--{variant}`. */
  variant?: string;
  /** Hero Lab: composition modifier — appended as `sf-nocturne--{layout}`. */
  layout?: string;
  /** Hero Lab: extra classes (e.g. a plate pairing's object-position). */
  className?: string;
  /** Hero Lab: seventeen instances on the review page need unique ids. */
  id?: string;
  /** Hero Lab: the review page's single h1 lives above the variants. */
  titleAs?: 'h1' | 'h2';
  /** Hero Lab: only the FIRST hero on a review page is an LCP candidate —
   *  seventeen images all claiming fetchPriority="high" is seventeen images
   *  competing. Note what this does NOT do: add loading="lazy". The entrance
   *  below gates on img.decode() inside a 600ms budget, and an image that has
   *  not begun loading blows it — every hero past the fold would snap to
   *  is-instant and lose the choreography that is under review. */
  priority?: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const img = root?.querySelector('img');
    if (!root) return;

    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const play = (instant: boolean) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      // Double rAF so the initial state paints before the class flips,
      // otherwise both frames may coalesce and skip the transition.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.add(instant ? 'is-instant' : 'is-ready');
        });
      });
    };

    if (!img) {
      play(false);
      return;
    }

    timer = setTimeout(() => play(true), DECODE_BUDGET);
    const decode = img.decode
      ? img.decode()
      : img.complete
        ? Promise.resolve()
        : new Promise((res, rej) => {
            img.addEventListener('load', res, { once: true });
            img.addEventListener('error', rej, { once: true });
          });
    decode.then(() => play(false)).catch(() => play(true));

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section
      className={[
        'sf-section',
        'sf-nocturne',
        variant ? `sf-nocturne--${variant}` : null,
        layout ? `sf-nocturne--${layout}` : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
      data-sf-hero
      ref={rootRef}
    >
      <div className="sf-container sf-nocturne__inner">
        <div className="sf-nocturne__rule">
          <span>{label}</span>
          <span className="sf-nocturne__note">{note}</span>
        </div>

        <div className="sf-nocturne__grid">
          {/* The lines are display:block, so the space between them is purely
              for the accessible name: without it the h1's text content is the
              single token "BeyondVisibility." */}
          <TitleTag className="sf-nocturne__title">
            {titleLines.map((line, i) => (
              <span
                key={line}
                className={`sf-nocturne__line sf-nocturne__line--${i === 0 ? 'a' : 'b'}`}
              >
                <span className="sf-nocturne__line-in">{line}</span>
                {i < titleLines.length - 1 && ' '}
              </span>
            ))}
          </TitleTag>

          <figure className="sf-nocturne__plate">
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.sizes}
              alt={image.alt}
              width={image.width}
              height={image.height}
              fetchPriority={priority ? 'high' : 'auto'}
              decoding="async"
            />
          </figure>

          <div className="sf-nocturne__label">
            <p className="sf-nocturne__label-title">{labelTitle}</p>
            <p className="sf-nocturne__label-meta">{labelMeta}</p>
          </div>
        </div>

        <div className="sf-nocturne__meta">
          <span className="sf-nocturne__mark">{mark}</span>
          <span className="sf-nocturne__sub">{sub}</span>
          <a className="sf-nocturne__cue" href="#explore">
            Scroll <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
