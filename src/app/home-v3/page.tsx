import type { Metadata } from 'next';
import HomeVariant from '../home-lab/variant';
import { getHomeData } from '@/sanity/fetch';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Home V3 — La Nuit',
  description: 'Internal homepage recomposition — not for publication.',
  robots: { index: false, follow: false },
};

/** Home Lab V3 — La Nuit. One continuous night — noir, cognac, fig and taupe to the close. */
export default async function HomeV3() {
  const data = await getHomeData();
  return <HomeVariant version={3} data={data} />;
}
