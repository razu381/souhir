'use client';

/**
 * WorkGrid — port of src/js/modules/work.js (the collection's filter rail).
 *
 * The buttons carry the category tokens; the plates carry theirs (a plate
 * may hang in more than one room — tokens are space-separated). State lives
 * in React now; the hidden/visible treatment is still one CSS line
 * (.sf-work__item.is-filtered), and the failure mode is unchanged:
 * "no filtering", never "no work".
 */
import { useState } from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import type { WorkItem } from '@/sanity/fetch';

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

  const apply = (item: WorkItem) =>
    active !== 'all' && !` ${item.category} `.includes(` ${active} `);

  return (
    <>
      <Reveal as="p" className="sf-work__statement">
        {statement}
      </Reveal>

      <div className="sf-work__rail" data-sf-work>
        {filters.map((f) => (
          <button
            key={f.slug}
            className="sf-work__filter"
            type="button"
            aria-pressed={active === f.slug}
            onClick={() => setActive(f.slug)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* One entrance for the hang (the prototype staggered each plate;
          column children can't carry the observer without breaking the
          multicol contract — the container reveal keeps the motion honest). */}
      <Reveal className="sf-work__grid">
        {items.map((item) => {
          const cls = [
            'sf-work__item',
            item.ratio === 'tall' ? 'sf-work__item--tall' : '',
            item.ratio === 'square' ? 'sf-work__item--square' : '',
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
                <span className="sf-work__num">{item.num}</span>
                <span className="sf-work__title">{item.title}</span>
                <span className="sf-work__meta">
                  {item.categoryLabel || item.category}
                  {item.href && <span aria-hidden="true"> &#8599;</span>}
                </span>
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
      </Reveal>
    </>
  );
}
