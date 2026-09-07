import type { Metadata } from 'next';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import { PressSalon } from '@/components/sf/HomeSections';
import ClosingCard from '@/components/sf/ClosingCard';
import Reveal from '@/components/sf/Reveal';
import { getHomeData } from '@/sanity/fetch';
import { client, urlFor } from '@/sanity/client';
import { PRESS_FEATURES } from '@/sanity/queries';
import * as seed from '@/content/seed';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Editorial Recognition',
  description:
    'Featured across international editorial publications celebrating visual storytelling, creativity, and contemporary culture.',
};

type Feature = { publication?: string; date?: string; caption?: string; cover?: { asset?: unknown; alt?: string } };

async function getFeatures(): Promise<Feature[]> {
  try {
    return (await client.fetch<Feature[]>(PRESS_FEATURES, {}, { next: { tags: ['press'] } })) ?? [];
  } catch {
    return [];
  }
}

export default async function EditorialPage() {
  const [data, features] = await Promise.all([getHomeData(), getFeatures()]);

  return (
    <main id="main">
      <PageTitle
        label="(Editorial Recognition)"
        title={['Where Vision ', 'Earns Recognition.']}
        intro={data.press.statement}
        num="01"
      />
      <HeaderSentinel />

      <PressSalon data={data.press} chapter={1} />

      {features.length > 0 && (
        <section className="sf-section sf-press">
          <div className="sf-container">
            <div className="sf-chapter">
              <span className="sf-chapter__label">(The Archive)</span>
              <span className="sf-chapter__num">02</span>
            </div>
            <div className="sf-press__covers">
              {features
                .filter((f) => f.cover?.asset)
                .map((f, i) => (
                  <Reveal as="figure" className="sf-press__cover" key={i} delay={(i % 3) * 90}>
                    <img
                      src={urlFor(f.cover).width(600).height(776).fit('crop').auto('format').url()}
                      alt={f.cover?.alt ?? ''}
                      width={600}
                      height={776}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className="sf-press__caption">
                      {f.caption ?? `Cover Feature — ${f.publication}${f.date ? `, ${f.date}` : ''}`}
                    </figcaption>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCard
        head={seed.cta.head}
        text={seed.cta.text}
        cta={seed.cta.cta}
      />
    </main>
  );
}
