import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/sanity/client';
import { CASE_STUDY, CASE_STUDY_SLUGS } from '@/sanity/queries';
import { Nav, Foot } from '../../nav';

export const revalidate = 60;

type Section = {
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

/** Plates and quote banners are interludes in her design language, not
 * argument steps — they don't consume a chapter number. */
const CHAPTER_TYPES = new Set([
  'richSection',
  'pillarSection',
  'listSection',
  'resultsSection',
  'gallerySection',
]);

export async function generateStaticParams() {
  const rows = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(CASE_STUDY_SLUGS);
  return rows.map((r) => ({ slug: r.slug }));
}

/** Section headings are numbered because the order genuinely carries meaning. */
function Chapter({ label, n }: { label: string; n: number }) {
  return (
    <div className="sfd-chapter sfd-label">
      <span className="sfd-chapter__label">{label}</span>
      <span className="sfd-chapter__num">{String(n).padStart(2, '0')}</span>
    </div>
  );
}

function Plate({ section }: { section: Section }) {
  if (!section.image) return null;
  const inset = section.width === 'Inset';
  return (
    <figure className={inset ? 'sfd-plate sfd-plate--inset' : 'sfd-plate'}>
      <img
        src={urlFor(section.image).width(inset ? 1100 : 2000).auto('format').url()}
        alt={section.image.alt ?? ''}
        width={inset ? 1100 : 2000}
        height={inset ? 733 : 1125}
        loading="lazy"
      />
      {section.caption && <figcaption className="sfd-label">{section.caption}</figcaption>}
    </figure>
  );
}

function QuoteBanner({ section }: { section: Section }) {
  if (!section.quote) return null;
  return (
    <figure className={section.image ? 'sfd-quote-banner' : 'sfd-quote-banner sfd-quote-banner--plain'}>
      {section.image && (
        <img
          src={urlFor(section.image).width(2000).auto('format').url()}
          alt={section.image.alt ?? ''}
          width={2000}
          height={1000}
          loading="lazy"
        />
      )}
      <blockquote className="sfd-quote-banner__text">“{section.quote}”</blockquote>
      {section.attribution && (
        <figcaption className="sfd-quote-banner__by sfd-label">{section.attribution}</figcaption>
      )}
    </figure>
  );
}

function SectionBody({ section }: { section: Section }) {
  switch (section._type) {
    case 'pillarSection':
      return (
        <>
          {section.intro && <p className="sfd-intro">{section.intro}</p>}
          <div className="sfd-pillars">
            {section.pillars?.map((p) => (
              <div key={p._key} className="sfd-pillar">
                <h3 className="sfd-pillar__title">{p.title}</h3>
                <p className="sfd-pillar__text">{p.description}</p>
              </div>
            ))}
          </div>
        </>
      );

    case 'listSection':
      return (
        <>
          {section.intro && <p className="sfd-intro">{section.intro}</p>}
          <ul className="sfd-list">
            {section.items?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      );

    case 'resultsSection':
      return (
        <div className="sfd-results">
          {section.results?.map((r) => (
            <div key={r._key} className="sfd-result">
              {r.figure && <span className="sfd-result__figure">{r.figure}</span>}
              <span className="sfd-result__label">{r.label}</span>
            </div>
          ))}
        </div>
      );

    case 'gallerySection': {
      const threeUp = section.layout === 'Three up';
      return (
        <div className={threeUp ? 'sfd-gallery sfd-gallery--three' : 'sfd-gallery'}>
          {section.images?.map((img) => (
            <figure key={img._key}>
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
      return (
        <div className="sfd-prose">
          <PortableText value={(section.body ?? []) as never} />
        </div>
      );

    default:
      console.warn(`caseStudy: no render branch for section type "${section._type}"`);
      return null;
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch<Record<string, any> | null>(CASE_STUDY, { slug });

  if (!project) notFound();

  const details = project.projectDetails ?? {};
  const plaque: [string, string][] = [
    ['Industry', details.industry],
    ['Project type', details.projectType],
    ['Services', (details.services ?? []).join(' · ')],
    ['Location', details.location],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const sections = (project.sections as Section[] | undefined) ?? [];

  // Chapter numbers skip interludes (plate, quote banner) so the numbering
  // stays a true count of the argument's steps, not of everything on the page.
  let chapterN = 1;
  const numbered = sections.map((section) => {
    const isChapter = CHAPTER_TYPES.has(section._type);
    if (isChapter) chapterN += 1;
    return { section, n: isChapter ? chapterN : null };
  });
  const finalChapterN = chapterN + 1;

  return (
    <>
      <div className="sf-container">
        <Nav back={{ href: '/', label: 'All work' }} />
      </div>

      {project.heroImage && (
        <div className="sfd-hero">
          <figure className="sfd-hero__media">
            <img
              src={urlFor(project.heroImage).width(2000).auto('format').url()}
              alt={project.heroImage.alt ?? ''}
              width={2000}
              height={1125}
            />
          </figure>
        </div>
      )}

      <div className="sf-container">
        <header className="sfd-titles">
          <span className="sfd-titles__eyebrow sfd-label">{project.category}</span>
          <h1 className="sfd-titles__title">{project.title}</h1>
          {project.tagline && <p className="sfd-titles__tagline">{project.tagline}</p>}
        </header>

        <div className="sfd-sections">
          {Array.isArray(project.overview) && project.overview.length > 0 && (
            <section>
              <Chapter label="Overview" n={1} />
              <div className="sfd-prose">
                <PortableText value={project.overview} />
              </div>
            </section>
          )}

          {numbered.map(({ section, n }) => {
            if (section._type === 'plateSection') {
              return <Plate key={section._key} section={section} />;
            }
            if (section._type === 'quoteSection') {
              return <QuoteBanner key={section._key} section={section} />;
            }
            return (
              <section key={section._key}>
                <Chapter label={section.heading ?? 'Section'} n={n ?? finalChapterN} />
                <SectionBody section={section} />
              </section>
            );
          })}

          {plaque.length > 0 && (
            <section>
              <Chapter label="Project details" n={finalChapterN} />
              <div className="sfd-plaque">
                {plaque.map(([key, val]) => (
                  <div key={key} className="sfd-plaque__item">
                    <span className="sfd-plaque__key sfd-label">{key}</span>
                    <span className="sfd-plaque__val">{val}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {project.closingQuote?.quote && (
          <div className="sfd-quote">
            <blockquote className="sfd-quote__text">
              “{project.closingQuote.quote}”
            </blockquote>
            {project.closingQuote.attribution && (
              <span className="sfd-quote__by sfd-label">
                {project.closingQuote.attribution}
              </span>
            )}
          </div>
        )}

        <Foot />
      </div>
    </>
  );
}
