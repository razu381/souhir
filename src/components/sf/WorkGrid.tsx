'use client';

/**
 * WorkGrid — port of src/js/modules/work.js (the collection's filter rail).
 *
 * The buttons carry the category tokens; the plates carry theirs (a plate
 * may hang in more than one room — tokens are space-separated). State lives
 * in React now; the hidden/visible treatment is still one CSS line
 * (.sf-work__item.is-filtered), and the failure mode is unchanged:
 * "no filtering", never "no work".
 *
 * The transition is a FLIP (Flip plugin): React flips the classes and the
 * columns reflow instantly; Flip measured the pre-reflow rects, so it can
 * compensate each survivor with a transform and glide it to its new spot,
 * fade the incoming plates up off the wall and lift the outgoing ones out.
 * The classes stay the single source of truth — Flip only ever animates
 * toward the state the CSS has already declared. Reduced motion skips it
 * and keeps today's instant swap.
 */
import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import { gsap, Flip } from './animation/gsap';
import type { WorkItem } from '@/sanity/fetch';

type FlipState = ReturnType<typeof Flip.getState>;

export default function WorkGrid({
  statement,
  filters,
  items,
}: {
  statement: string;
  filters: { slug: string; label: string }[];
  items: WorkItem[];
}) {
  const [active, setActive] = useState('all');
  const rootRef = useRef<HTMLDivElement>(null);
  // The rect snapshot taken in the click handler, consumed by the layout
  // effect that runs after React has reflowed the columns.
  const pending = useRef<FlipState | null>(null);
  const mounted = useRef(false);

  const inRoom = (item: WorkItem, slug: string) =>
    slug === 'all' || ` ${item.category} `.includes(` ${slug} `);
  const apply = (item: WorkItem) => !inRoom(item, active);

  const select = (slug: string) => {
    if (slug === active) return;
    const root = rootRef.current;
    // Snapshot BEFORE the state change: Flip.from will read these rects and
    // walk each plate to wherever the reflow lands it. Querying the live DOM
    // (not the React list) is the contract — Flip animates what is hung.
    pending.current = root
      ? Flip.getState(root.querySelectorAll('.sf-work__item'))
      : null;
    setActive(slug);
  };

  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const state = pending.current;
    pending.current = null;
    const root = rootRef.current;
    if (!state || !root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const plates = root.querySelectorAll('.sf-work__item');
    gsap.killTweensOf(plates); // a fast second click restarts the walk

    Flip.from(state, {
      duration: 0.9,
      ease: 'sf',
      stagger: 0.05,
      onEnter: (entered) =>
        gsap.fromTo(
          entered,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'sf', stagger: 0.06 },
        ),
      onLeave: (leaving) =>
        gsap.to(leaving, {
          opacity: 0,
          y: -14,
          duration: 0.4,
          ease: 'sf',
          stagger: 0.03,
        }),
    });

    return () => {
      gsap.killTweensOf(plates);
    };
  }, [active]);

  return (
    <div ref={rootRef}>
      <Reveal as="p" className="sf-work__statement">
        {statement}
      </Reveal>

      <div className="sf-work__rail" data-sf_work="">
        {/* The copy names its rooms; a room with nothing hung in it yet
            (Wellness, today) stays on the index but cannot be entered —
            an empty wall is not a filter result. */}
        {filters.map((f) => (
          <button
            key={f.slug}
            className="sf-work__filter"
            type="button"
            aria-pressed={active === f.slug}
            disabled={!items.some((item) => inRoom(item, f.slug))}
            onClick={() => select(f.slug)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* No entrance on the hang itself. A Reveal fires at 15% visible, and
          with five captioned projects the one-column handset grid runs
          ~4500px — 15% of it never fits a phone screen, so the work never
          appeared. The FLIP's per-plate transforms stay the only motion on
          the items. */}
      <div className="sf-work__grid">
        {items.map((item) => {
          // A landscape hangs wide, across two columns, at the portraits' height.
          const wide = item.image.width > item.image.height;
          const cls = [
            'sf-work__item',
            wide ? 'sf-work__item--wide' : '',
            // A plate with no case study behind it must not wear a link's
            // clothes: the ↗ below and the hover travel are both gated on this.
            item.href ? '' : 'sf-work__item--static',
            apply(item) ? 'is-filtered' : '',
          ]
            .filter(Boolean)
            .join(' ');
          const body = (
            <>
              <figure className="sf-work__plate">
                <img
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes={item.image.sizes}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="sf-work__caption">
                <span className="sf-work__num">
                  {item.num}
                  {item.href && <span aria-hidden="true"> &#8599;</span>}
                </span>
                {/* "Beauty — Botanical Contrast", as the copy sets it: the
                    category in caps, the title in Didone. */}
                <h3 className="sf-work__heading">
                  {item.categoryLabel && (
                    <>
                      <span className="sf-work__meta">{item.categoryLabel}</span>
                      <span className="sf-work__sep"> — </span>
                    </>
                  )}
                  <span className="sf-work__title">{item.title}</span>
                </h3>
                {item.desc && <p className="sf-work__desc">{item.desc}</p>}
                {item.credits.length > 0 && (
                  <dl className="sf-work__credits">
                    {item.credits.map(([role, name]) => (
                      <div className="sf-work__credit" key={role}>
                        <dt>{role}</dt>
                        <dd>{name}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </>
          );
          // A plate without a write-up is a hung print, not a link.
          return item.href ? (
            <Link key={item.num} href={item.href} className={cls}>
              {body}
            </Link>
          ) : (
            <div key={item.num} className={cls}>
              {body}
            </div>
          );
        })}
      </div>
    </div>
  );
}
