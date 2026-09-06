import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import type { Metadata } from 'next';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import Reveal from '@/components/sf/Reveal';
import {
  SectionBlock,
  numberSections,
  type Section,
} from '@/components/sf/Sections';
import { client, urlFor } from '@/sanity/client';
import { CASE_STUDY, CASE_STUDY_SLUGS } from '@/sanity/queries';

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(CASE_STUDY_SLUGS)
    .catch(() => []);
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await client
    .fetch<{ title: string; tagline?: string } | null>(CASE_STUDY, { slug })
    .catch(() => null);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function CaseStudyPage({ params }: Props) {
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

  const sections = ((project.sections ?? []) as Section[]).filter(Boolean);
  const numbered = numberSections(sections);
  const finalChapterN = numbered.filter(({ n }) => n !== null).length + 1;

  const title = project.title as string;
  const split: [string, string] = title.includes(' ')
    ? [`${title.split(' ')[0]} `, title.split(' ').slice(1).join(' ')]
    : [title, ''];

  return (
    <main id="main">
      <PageTitle
        label={`(Case Study — ${project.category ?? 'Dar SF'})`}
        title={split}
        intro={project.tagline}
        num={project.category ?? '01'}
      />
      <HeaderSentinel />

      {project.heroImage?.asset && (
        <figure className="sf-plate">
          <img
            src={urlFor(project.heroImage).width(2000).height(1125).fit('crop').auto('format').url()}
            alt={project.heroImage.alt ?? ''}
            width={2000}
            height={1125}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      )}

      <div className="sf-container">
        <div className="sf-sections">
          {Array.isArray(project.overview) && project.overview.length > 0 && (
            <section>
              <div className="sf-chapter">
                <span className="sf-chapter__label">Overview</span>
                <span className="sf-chapter__num">01</span>
              </div>
              <div className="sf-prose">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <PortableText value={project.overview} />
              </div>
            </section>
          )}

          {numbered.map(({ section, n }) => (
            <SectionBlock key={section._key} section={section} n={n} />
          ))}

          {plaque.length > 0 && (
            <section>
              <div className="sf-chapter">
                <span className="sf-chapter__label">Project details</span>
                <span className="sf-chapter__num">
                  {String(finalChapterN).padStart(2, '0')}
                </span>
              </div>
              <div className="sf-plaque">
                {plaque.map(([key, val]) => (
                  <div key={key} className="sf-plaque__item">
                    <span className="sf-plaque__key">{key}</span>
                    <span className="sf-plaque__val">{val}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.closingQuote?.quote && (
            <Reveal>
              <div className="sf-pull">
                <p className="sf-pull__text">&ldquo;{project.closingQuote.quote}&rdquo;</p>
                {project.closingQuote.attribution && (
                  <span className="sf-pull__by">{project.closingQuote.attribution}</span>
                )}
              </div>
            </Reveal>
          )}

          <Reveal>
            <Link className="sf-btn" href="/portfolio">
              All Work <span aria-hidden="true">&#8599;</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

