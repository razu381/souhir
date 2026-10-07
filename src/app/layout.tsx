import type { Metadata, Viewport } from 'next';
import './globals.css';
import './sf/site.css';
import SiteHeader from '@/components/sf/SiteHeader';
import SiteFooter from '@/components/sf/SiteFooter';
import SmoothScroll from '@/components/sf/animation/SmoothScroll';
import CustomCursor from '@/components/sf/animation/CustomCursor';
import { getSettings } from '@/sanity/fetch';

/** The prototype's progressive-enhancement gate: hidden initial states in the
 * CSS are scoped to .sf-js, so a page with JavaScript disabled renders
 * complete. Same inline one-liner as src/hero-nocturne.html. The class lands
 * before React hydrates, hence suppressHydrationWarning on <html>.
 *
 * It runs as the first thing in <body>, not in <head>: React hydrates an
 * inline <head> script by walking the head's nodes in order, and a stray
 * text node there — Netlify injects a newline and a "hosted on Netlify"
 * comment after <meta charset> on every page — fails that walk (React #418)
 * and the whole page is thrown away and re-rendered on the client. At the
 * top of <body> it still runs before any content is parsed or painted. */
const SF_JS = `document.documentElement.classList.add('sf-js')`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darsfsouhir.netlify.app'),
  title: {
    default: 'SF Muse — Beyond Visibility. Into Memory.',
    template: '%s — SF Muse',
  },
  description:
    'SF Muse is a luxury creative studio dedicated to shaping perception through visual storytelling, creative direction, and immersive brand experiences.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1F1A17',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DESIGN-DIRECTION §10 — preload the display cut only. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/bodoni-moda-normal-latin.woff2"
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: SF_JS }} />
        <a className="sf-skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {/* The choreography layer — both null-render beside the cursor's
            frame, both gated (routes / motion / pointer) inside themselves. */}
        <SmoothScroll />
        <CustomCursor />
        {children}
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
