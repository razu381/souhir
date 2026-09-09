import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darsf.netlify.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api', '/hero-lab', '/home-lab', '/home-v1', '/home-v2', '/home-v3', '/home-v4', '/home-v5'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
