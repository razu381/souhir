import type { Metadata, Viewport } from 'next';
import './globals.css';
import './sf/site.css';
import SiteHeader from '@/components/sf/SiteHeader';
import SiteFooter from '@/components/sf/SiteFooter';
import { getSettings } from '@/sanity/fetch';

/** The prototype's progressive-enhancement gate: hidden initial states in the
 * CSS are scoped to .sf-js, so a page with JavaScript disabled renders
 * complete. Same inline one-liner as src/hero-nocturne.html. */
const SF_JS = `document.documentElement.classList.add('sf-js')`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darsf.netlify.app'),
  title: {
    default: 'Dar SF — Beyond Visibility. Into Memory.',
    template: '%s — Dar SF',
  },
  description:
    'Dar SF is a luxury creative studio shaping perception through storytelling, design and experience.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1F1A17',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <head>
        {/* DESIGN-DIRECTION §10 — preload the display cut only. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/bodoni-moda-normal-latin.woff2"
        />
        <script dangerouslySetInnerHTML={{ __html: SF_JS }} />
      </head>
      <body>
        <a className="sf-skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
