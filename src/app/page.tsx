import HeroNocturne from '@/components/sf/HeroNocturne';
import WorkGrid from '@/components/sf/WorkGrid';
import Reveal from '@/components/sf/Reveal';
import {
  Chapter,
  Explore,
  ServicesList,
  Clientele,
  Founder,
  PressSalon,
  JournalIndex,
  Interlude,
  NewsletterSection,
  ClosingCard,
} from '@/components/sf/HomeSections';
import { getHomeData } from '@/sanity/fetch';
import { CHAPTER } from '@/content/chapters';
import { hero as seedHero } from '@/content/seed';

export const revalidate = 600;

/** The Nocturne (src/hero-nocturne.html @ 7a7bced), set to the client's
 *  final copy (SF_Muse_Website_Copy_Shorter_Updated.docx, Oct 2026). */
export default async function Home() {
  const data = await getHomeData();

  return (
    // sf-home-walls: below the black hero the rooms alternate champagne and
    // sable (client direction, Oct 2026) — see the block in site.css.
    <main id="main" className="sf-home-walls">
      {/* The statue-shadow backdrop (hero-lab-v2 A0b, promoted Sept 2026).
          The plate and its museum label are pinned from the seed — the
          photograph and its treatment are a DESIGN decision, not editorial
          copy — while the words stay studio-owned. */}
      <HeroNocturne
        {...data.hero}
        image={seedHero.image}
        labelMeta={seedHero.labelMeta}
        variant="backdrop"
      />

      <span data-sf-header-sentinel aria-hidden="true" />

      <Explore data={data.explore} />
      <ServicesList data={data.services} intro={data.servicesIntro} />
      <Clientele data={data.clientele} />
      <Founder data={data.founder} />

      <section className="sf-section sf-work sf-work--nocturne" id="work">
        <div className="sf-container">
          <Chapter label={`(${data.work.label})`} num={CHAPTER.work} />
          <Reveal as="h2" className="sf-work__head">
            {data.work.head}
          </Reveal>
          <WorkGrid
            statement={data.work.statement}
            filters={data.work.filters}
            items={data.work.items}
          />
        </div>
      </section>

      <PressSalon data={data.press} compact />
      <JournalIndex data={data.journal} categories={false} />
      <Interlude
        image={data.interlude.image}
        quote={data.interlude.quote}
        cite={data.interlude.cite}
        role={data.interlude.role}
      />
      <NewsletterSection
        head={data.news.head}
        text={data.news.text}
        image={data.news.image}
      />
      <ClosingCard
        head={data.cta.head}
        text={data.cta.text}
        cta={data.cta.cta}
        image={data.cta.image}
      />
    </main>
  );
}
