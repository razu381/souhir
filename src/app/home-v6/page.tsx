import type { Metadata } from 'next';
import HeroNocturne from '@/components/sf/HeroNocturne';
import ClosingCard from '@/components/sf/ClosingCard';
import HomeNewsletterVariants from './newsletter-variants';
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

export const metadata: Metadata = {
  title: 'Home V6',
  description: 'Internal homepage experiment — not for publication.',
  robots: { index: false, follow: false },
};

/** The V6 experiment (client brief, Oct 2026): the production homepage —
 *  the same sections, copy and photographs, in the same order — re-hung on
 *  her champagne and sable grounds with black rooms between them. What We
 *  Create drops its dark panels: four black-and-white photographs, the
 *  words in charcoal on the sable wall. The newsletter is a review stack:
 *  four treatments, A–D, each on its own ground (newsletter-variants.tsx).
 *
 *  The page renders the production components untouched; everything it
 *  changes is CSS, in sf/home-v2.css, scoped to the sf-homepage-v2 class
 *  this main carries alongside sf-homepage (which pulls in sf/home.css). */
export default async function HomeV6() {
  const data = await getHomeData();

  return (
    <main id="main" className="sf-homepage sf-homepage-v2">
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
      {/* The newsletter as a review stack: four treatments, A–D, each on
          its own ground — see newsletter-variants.tsx. */}
      <HomeNewsletterVariants head={data.news.head} text={data.news.text} />
      <ClosingCard
        head={data.cta.head}
        text={data.cta.text}
        cta={data.cta.cta}
        image={data.cta.image}
      />
    </main>
  );
}
