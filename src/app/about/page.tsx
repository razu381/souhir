import type { Metadata } from 'next';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import { Clientele, Founder, Interlude } from '@/components/sf/HomeSections';
import ClosingCard from '@/components/sf/ClosingCard';
import { getHomeData } from '@/sanity/fetch';
import * as seed from '@/content/seed';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'About',
  description:
    'Dar SF brings together creative intelligence, visual storytelling, and strategic thinking to craft brands and experiences designed to inspire, connect, and endure.',
};

/** The Language of Presence — the founder's story and the studio's register. */
export default async function AboutPage() {
  const data = await getHomeData();

  return (
    <main id="main">
      <PageTitle
        label="(About Dar SF)"
        title={['The Language ', 'of Presence.']}
        intro={data.founder.texts[1]}
        num="01"
      />
      <HeaderSentinel />

      <Founder data={data.founder} />
      <Clientele data={data.clientele} />

      <Interlude
        image={seed.interlude.image}
        quote={seed.interlude.quote}
        cite={seed.interlude.cite}
      />

      <ClosingCard
        image={seed.cta.image}
        head={seed.cta.head}
        text={seed.cta.text}
        cta={seed.cta.cta}
      />
    </main>
  );
}
