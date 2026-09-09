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
import type { getHomeData } from '@/sanity/fetch';
import { CHAPTER } from '@/content/chapters';

/**
 * HomeVariant — the full homepage composition, wrapped in a per-version class
 * (`sf-home--v1 … sf-home--v5`) that sf/home-lab.css re-skins section by
 * section. The section ORDER and the chapter numbering stay canonical — what
 * the variants change is the lighting, the type and the closing movement.
 * Nothing here writes to the production homepage.
 */

export type HomeData = Awaited<ReturnType<typeof getHomeData>>;

/** Each copy opens on a different wall from the hero lab. */
const HERO: Record<1 | 2 | 3 | 4 | 5, { variant?: string; layout?: string }> = {
  1: { variant: 'noir-dore' },
  2: { layout: 'monument' },
  3: { variant: 'noir' },
  4: { variant: 'noir-dore', layout: 'marquee' },
  5: { variant: 'cognac' },
};

export default function HomeVariant({
  version,
  data,
}: {
  version: 1 | 2 | 3 | 4 | 5;
  data: HomeData;
}) {
  const hero = HERO[version];

  return (
    <main id="main" className={`sf-home sf-home--v${version}`}>
      <HeroNocturne {...data.hero} id={`home-v${version}-hero`} {...hero} />

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
      <ClosingCard head={data.cta.head} text={data.cta.text} cta={data.cta.cta} />
    </main>
  );
}
