import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import ClosingCard from '@/components/sf/ClosingCard';
import Reveal from '@/components/sf/Reveal';
import { SectionBlock, numberSections, type Section } from '@/components/sf/Sections';
import { getHomeData } from '@/sanity/fetch';
import { safeFetchService } from '@/sanity/serviceData';
import * as seed from '@/content/seed';

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const data = await getHomeData();
  return data.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getHomeData();
  const service = data.services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

/** Detail chapters come from the studio when written; the process register
 * below always closes the argument. */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const data = await getHomeData();
  const service = data.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const live = await safeFetchService(slug);
  const chapters: Section[] = live?.chapters ?? [];
  const numbered = numberSections(chapters);
  const finalN = numbered.filter(({ n }) => n !== null).length + 1;

  return (
    <main id="main">
      <PageTitle
        label={`(Service ${service.num})`}
        title={service.title.includes(' ') ? [`${service.title.split(' ')[0]} `, service.title.split(' ').slice(1).join(' ')] : [service.title, '']}
        intro={service.summary}
        num={service.num}
      />
      <HeaderSentinel />

      <section className="sf-section sf-founder sf-founder--bone">
        <div className="sf-container">
          <div className="sf-sections">
            {numbered.map(({ section, n }) => (
              <SectionBlock key={section._key} section={section} n={n} />
            ))}

            {/* The process register, closing the argument. */}
            <section>
              <div className="sf-chapter">
                <span className="sf-chapter__label">{seed.serviceProcess.heading}</span>
                <span className="sf-chapter__num">{String(finalN).padStart(2, '0')}</span>
              </div>
              <div className="sf-prose">
                <ul>
                  {seed.serviceProcess.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <Reveal>
              <Link className="sf-btn" href="/services">
                All Services <span aria-hidden="true">&#8599;</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ClosingCard
        image={seed.cta.image}
        head={seed.cta.head}
        text={seed.cta.text}
        cta={seed.cta.cta}
      />
    </main>
  );
}
