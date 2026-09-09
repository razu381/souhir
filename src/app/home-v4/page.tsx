import type { Metadata } from 'next';
import HomeVariant from '../home-lab/variant';
import { getHomeData } from '@/sanity/fetch';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Home V4 — La Gazette',
  description: 'Internal homepage recomposition — not for publication.',
  robots: { index: false, follow: false },
};

/** Home Lab V4 — La Gazette. The editorial issue — two-column catalogue, back-pages closing movement. */
export default async function HomeV4() {
  const data = await getHomeData();
  return <HomeVariant version={4} data={data} />;
}
