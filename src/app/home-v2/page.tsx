import type { Metadata } from 'next';
import HomeVariant from '../home-lab/variant';
import { getHomeData } from '@/sanity/fetch';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Home V2 — Le Musée',
  description: 'Internal homepage recomposition — not for publication.',
  robots: { index: false, follow: false },
};

/** Home Lab V2 — Le Musée. Paper rooms, catalogue numerals, and a black final wing. */
export default async function HomeV2() {
  const data = await getHomeData();
  return <HomeVariant version={2} data={data} />;
}
