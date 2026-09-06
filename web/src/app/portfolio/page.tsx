import type { Metadata } from 'next';
import Link from 'next/link';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import WorkGrid from '@/components/sf/WorkGrid';
import ClosingCard from '@/components/sf/ClosingCard';
import Reveal from '@/components/sf/Reveal';
import { getHomeData } from '@/sanity/fetch';
import { client } from '@/sanity/client';
import { INDEX } from '@/sanity/queries';
import * as seed from '@/content/seed';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'A curated collection of visual stories and brand experiences shaped through atmosphere, perception, and creative intelligence.',
};

type Project = { title: string; category?: string; tagline?: string; slug: string; thumbnail?: unknown; heroImage?: unknown };

async function getProjects(): Promise<Project[]> {
  try {
    const { projects } = await client.fetch<{ projects: Project[] }>(INDEX, {}, { next: { tags: ['work'] } });
    return projects ?? [];
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const [data, projects] = await Promise.all([getHomeData(), getProjects()]);

  return (
    <main id="main">
      <PageTitle
        label="(Selected Works)"
        title={['Selected ', 'Works.']}
        intro={data.work.statement}
        num="01"
      />
      <HeaderSentinel />

      <section className="sf-section sf-work sf-work--nocturne" id="work">
        <div className="sf-container">
          <div className="sf-chapter">
            <span className="sf-chapter__label">(The Collection)</span>
            <span className="sf-chapter__num">01</span>
          </div>
          <WorkGrid
            statement={data.work.statement}
            filters={data.work.filters}
            items={data.work.items}
          />
        </div>
      </section>

      {projects.length > 0 && (
        <section className="sf-section sf-journal">
          <div className="sf-container">
            <div className="sf-chapter">
              <span className="sf-chapter__label">(Case Studies)</span>
              <span className="sf-chapter__num">02</span>
            </div>

            <div className="sf-journal__masthead">
              <h2 className="sf-journal__head">
                The <em>Write-Ups.</em>
              </h2>
              <div className="sf-journal__intro">
                <p className="sf-journal__statement">
                  The full story behind selected works — brief, strategy, and outcome.
                </p>
              </div>
            </div>

            <div className="sf-journal__index">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 90}>
                  <Link
                    className={`sf-journal__row${i === projects.length - 1 ? ' sf-journal__row--last' : ''}`}
                    href={`/portfolio/${p.slug}`}
                  >
                    <span className="sf-journal__row-num">{String(i + 1).padStart(2, '0')}</span>
                    <div className="sf-journal__row-text">
                      <span className="sf-journal__cat">{p.category ?? 'Case Study'}</span>
                      <span className="sf-journal__row-title">{p.title}</span>
                      {p.tagline && <span className="sf-journal__row-desc">{p.tagline}</span>}
                    </div>
                    <span className="sf-journal__row-read">
                      Read <span aria-hidden="true">&#8594;</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCard
        image={seed.cta.image}
        head={seed.cta.head}
        text={seed.cta.text}
        cta={seed.cta.cta}
      />
    </main>
  );
}
