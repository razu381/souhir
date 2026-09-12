import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darsfsouhir.netlify.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api', '/hero-lab', '/hero-lab-v2', '/home-lab', '/home-v1', '/home-v2', '/home-v3', '/home-v4', '/home-v5'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
