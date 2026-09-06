/**
 * Sections — the renderer for composable chapters (case-study and service
 * bodies). One section type each, mapped to the system's own vocabulary:
 * rich → prose, pillars → principles, list → register, results → stats,
 * gallery → editorial pairs, plate → hung print, quote → pull line.
 *
 * Plates and quote banners are interludes in the design language, not
 * argument steps — they don't consume a chapter number.
 */
import { urlFor } from '@/sanity/client';
import { PortableText } from 'next-sanity';

export type Section = {
  _type: string;
  _key: string;
  heading?: string;
  intro?: string;
  items?: string[];
  body?: unknown;
  layout?: 'Two up' | 'Three up';
  pillars?: { _key: string; title?: string; description?: string }[];
  results?: { _key: string; figure?: string; label?: string }[];
  images?: { _key: string; alt?: string; asset?: unknown }[];
  image?: { alt?: string } & Record<string, unknown>;
  caption?: string;
  width?: 'Full bleed' | 'Inset';
  quote?: string;
  attribution?: string;
};

export const CHAPTER_TYPES = new Set([
  'richSection',
  'pillarSection',
  'listSection',
  'resultsSection',
  'gallerySection',
]);

export function ChapterNumber({ label, n }: { label: string; n: number }) {
  return (
    <div className="sf-chapter">
      <span className="sf-chapter__label">{label}</span>
      <span className="sf-chapter__num">{String(n).padStart(2, '0')}</span>
    </div>
  );
}

function Plate({ section }: { section: Section }) {
  if (!section.image?.asset) return null;
  const inset = section.width === 'Inset';
  const w = inset ? 1100 : 2000;
  return (
    <figure className="sf-plate" style={inset ? { maxWidth: '72rem', marginInline: 'auto' } : undefined}>
      <img
        src={urlFor(section.image).width(w).height(Math.round((w * 2) / 3)).fit('crop').auto('format').url()}
        alt={section.image.alt ?? ''}
        width={w}
        height={Math.round((w * 2) / 3)}
        loading="lazy"
      />
      {section.caption && <figcaption className="sf-plate__caption">{section.caption}</figcaption>}
    </figure>
  );
}

function QuoteBanner({ section }: { section: Section }) {
  if (!section.quote) return null;
  return (
    <figure className="sf-pull" style={{ maxWidth: '100%' }}>
      <p className="sf-pull__text">
        &ldquo;{section.quote}&rdquo;
      </p>
      {section.attribution && (
        <span className="sf-pull__by">{section.attribution}</span>
      )}
    </figure>
  );
}

function Body({ section }: { section: Section }) {
  switch (section._type) {
    case 'pillarSection':
      return (
        <>
          {section.intro && <p className="sf-article-head__tagline">{section.intro}</p>}
          <div className="sf-pillars">
            {section.pillars?.map((p) => (
              <div key={p._key} className="sf-pillar">
                <h3 className="sf-pillar__title">{p.title}</h3>
                <p className="sf-pillar__text">{p.description}</p>
              </div>
            ))}
          </div>
        </>
      );

    case 'listSection':
      return (
        <>
          {section.intro && <p className="sf-article-head__tagline">{section.intro}</p>}
          <div className="sf-prose">
            <ul>
              {section.items?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      );

    case 'resultsSection':
      return (
        <div className="sf-stats">
          {section.results?.map((r) => (
            <div key={r._key} className="sf-stat">
              {r.figure && (
                <span className="sf-stat__num">
                  {r.figure.replace(/\++$/, '')}
                  <em>+</em>
                </span>
              )}
              <span className="sf-stat__label">{r.label}</span>
            </div>
          ))}
        </div>
      );

    case 'gallerySection': {
      const three = section.layout === 'Three up';
      return (
        <div className={three ? 'sf-gallery sf-gallery--three' : 'sf-gallery'}>
          {section.images?.map((img) => (
            <figure key={img._key} className="sf-plate">
              <img
                src={urlFor(img).width(900).height(675).fit('crop').auto('format').url()}
                alt={img.alt ?? ''}
                width={900}
                height={675}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      );
    }

    case 'richSection':
    default:
      return (
        <>
          {section.intro && <p className="sf-article-head__tagline">{section.intro}</p>}
          <div className="sf-prose">
            <PortableText value={(section.body ?? []) as never} />
          </div>
        </>
      );
  }
}

/** Renders one section with its chapter number (or as an interlude). */
export function SectionBlock({ section, n }: { section: Section; n: number | null }) {
  if (section._type === 'plateSection') {
    return <Plate section={section} />;
  }
  if (section._type === 'quoteSection') {
    return <QuoteBanner section={section} />;
  }
  return (
    <section>
      {section.heading && n !== null && (
        <ChapterNumber label={section.heading} n={n} />
      )}
      <Body section={section} />
    </section>
  );
}

/** Numbers the argument's steps, skipping interludes. */
export function numberSections(sections: Section[]) {
  let n = 0;
  return sections.map((section) => {
    const isChapter = CHAPTER_TYPES.has(section._type);
    if (isChapter) n += 1;
    return { section, n: isChapter ? n : null };
  });
}
