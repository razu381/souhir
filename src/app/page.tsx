import HeroNocturne from '@/components/sf/HeroNocturne';
import WorkGrid from '@/components/sf/WorkGrid';
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

export const revalidate = 600;

/** The Nocturne (src/hero-nocturne.html @ 7a7bced), fed from the studio. */
export default async function Home() {
  const data = await getHomeData();

  return (
    <main id="main">
      <HeroNocturne {...data.hero} />

      <span data-sf-header-sentinel aria-hidden="true" />

      <Explore data={data.explore} />
      <ServicesList data={data.services} />
      <Clientele data={data.clientele} />
      <Founder data={data.founder} />

      <section className="sf-section sf-work sf-work--nocturne" id="work">
        <div className="sf-container">
          <Chapter label="(Selected Works)" num={CHAPTER.work} heading />
          <WorkGrid
            statement={data.work.statement}
            filters={data.work.filters}
            items={data.work.items}
          />
        </div>
      </section>

      <PressSalon data={data.press} />
      <JournalIndex data={data.journal} />
      <Interlude
        image={data.interlude.image}
        quote={data.interlude.quote}
        cite={data.interlude.cite}
      />
      <NewsletterSection head={data.news.head} text={data.news.text} />
      <ClosingCard
        head={data.cta.head}
        text={data.cta.text}
        cta={data.cta.cta}
      />
    </main>
  );
}
