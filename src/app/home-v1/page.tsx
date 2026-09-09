import type { Metadata } from 'next';
import HomeVariant from '../home-lab/variant';
import { getHomeData } from '@/sanity/fetch';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Home V1 — Lumière',
  description: 'Internal homepage recomposition — not for publication.',
  robots: { index: false, follow: false },
};

/** Home Lab V1 — Lumière. The daylight maison — one dark entry, then champagne and sable to the end. */
export default async function HomeV1() {
  const data = await getHomeData();
  return <HomeVariant version={1} data={data} />;
}
