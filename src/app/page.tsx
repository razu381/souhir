import HeroNocturne from '@/components/sf/HeroNocturne';
import ClosingCard from '@/components/sf/ClosingCard';
import HomeNewsletter from '@/components/sf/HomeNewsletter';
import {
  HomeExplore,
  HomeServices,
  HomeClients,
  HomeFounder,
  HomeWork,
  HomePress,
  HomeJournal,
  HomeQuote,
} from '@/components/sf/HomeRooms';
import { getHomeData } from '@/sanity/fetch';
import { hero as seedHero } from '@/content/seed';

export const revalidate = 600;

/** The homepage on the client's final copy
 *  (SF_Muse_Website_Copy_Shorter_Updated.docx), revised after her round-2
 *  feedback (Oct 2026) — docs/plans/11-homepage-round-2.md. */
export default async function Home() {
  const data = await getHomeData();

  return (
    // sf-homepage scopes sf/home.css: the hero stays black, the rooms below
    // alternate warm ivory and charcoal (deep brown once), and every text
    // block follows the client's reference setting (DESIGN-DIRECTION §02).
    <main id="main" className="sf-homepage">
      {/* The statue-shadow photograph, full-bleed (the copy: "full-screen
          imagery"). Round 2 keeps her figure clear of any overlay — see the
          hero block in home.css. The plate is pinned from the seed: the
          photograph and its treatment are a design decision, not copy. */}
      <HeroNocturne
        {...data.hero}
        image={seedHero.image}
        labelMeta={seedHero.labelMeta}
        variant="backdrop"
        className="sf-nocturne--home"
      />

      <span data-sf-header-sentinel aria-hidden="true" />

      <HomeExplore data={data.explore} />
      <HomeServices data={data.services} intro={data.servicesIntro} />
      <HomeClients data={data.clientele} />
      <HomeFounder data={data.founder} />
      <HomeWork data={data.work} />
      <HomePress data={data.press} />
      <HomeJournal data={data.journal} />
      <HomeQuote data={data.interlude} />
      <HomeNewsletter head={data.news.head} text={data.news.text} />
      <ClosingCard
        head={data.cta.head}
        text={data.cta.text}
        cta={data.cta.cta}
        image={data.cta.image}
      />
    </main>
  );
}
