import type { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { CASE_STUDY_SLUGS, ARTICLE_SLUGS } from '@/sanity/queries';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darsfsouhir.netlify.app';
  const routes = ['', '/about', '/services', '/portfolio', '/journal', '/editorial', '/contact'].map(
    (path) => ({ url: `${base}${path}`, lastModified: new Date() }),
  );

  let dynamic: MetadataRoute.Sitemap = [];
  try {
    const [{ projects }, { articles }] = await Promise.all([
      client.fetch<{ projects: { slug: string }[] }>(`{ "projects": ${CASE_STUDY_SLUGS} }`),
      client.fetch<{ articles: { slug: string }[] }>(`{ "articles": ${ARTICLE_SLUGS} }`),
    ]);
    dynamic = [
      ...(projects ?? []).map((p) => ({ url: `${base}/portfolio/${p.slug}`, lastModified: new Date() })),
      ...(articles ?? []).map((a) => ({ url: `${base}/journal/${a.slug}`, lastModified: new Date() })),
    ];
  } catch {
    // Sitemap ships with the static routes even if the Content Lake hiccups.
  }

  return [...routes, ...dynamic];
}
