import type { Metadata } from 'next';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import { JournalIndex } from '@/components/sf/HomeSections';
import ClosingCard from '@/components/sf/ClosingCard';
import { getHomeData } from '@/sanity/fetch';
import * as seed from '@/content/seed';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Perspectives on luxury, creativity, hospitality, branding, and the evolving relationship between culture, technology, and human experience.',
};

export default async function JournalPage() {
  const data = await getHomeData();

  return (
    <main id="main">
      <PageTitle
        label="(The Journal)"
        title={['Ideas, Atmosphere & ', 'Creative Intelligence.']}
        intro={data.journal.statement}
        num="01"
      />
      <HeaderSentinel />

      <JournalIndex data={data.journal} />

      <ClosingCard
        head={seed.cta.head}
        text={seed.cta.text}
        cta={seed.cta.cta}
      />
    </main>
  );
}
