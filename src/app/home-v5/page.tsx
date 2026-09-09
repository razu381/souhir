import type { Metadata } from 'next';
import HomeVariant from '../home-lab/variant';
import { getHomeData } from '@/sanity/fetch';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Home V5 — Les Salons',
  description: 'Internal homepage recomposition — not for publication.',
  robots: { index: false, follow: false },
};

/** Home Lab V5 — Les Salons. The brand rooms as page rhythm — cognac, champagne, fig, noir doré. */
export default async function HomeV5() {
  const data = await getHomeData();
  return <HomeVariant version={5} data={data} />;
}
