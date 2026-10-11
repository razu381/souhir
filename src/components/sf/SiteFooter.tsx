/**
 * SiteFooter — the colophon (prototype footer, links now real routes).
 * Content from siteSettings, with the prototype's values as the fallback.
 */
import Link from 'next/link';
import type { Settings } from '@/sanity/fetch';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/journal', label: 'Journal' },
  { href: '/editorial', label: 'Editorial' },
  { href: '/contact', label: 'Contact' },
];

const SECTORS = ['Hospitality', 'Wellness', 'Beauty', 'Editorial', 'Luxury Lifestyle', 'AI Marketing'];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function SiteFooter({ settings }: { settings: Settings | null }) {
  const socials = settings?.socials?.length ? settings.socials : SOCIALS;

  const email = settings?.contactEmail ?? 'contact@souhirfhima.com';

  return (
    <footer className="sf-footer">
      <div className="sf-container">
        {/* Round 2 (client feedback, Oct 2026): "a more polished design, with
            a stronger SF Muse logo presence, clearly aligned navigation and
            contact details, and readable text." Three columns on one top
            line — the studio, the page register, the ways to reach it (the
            address shown, not just named) — then the wordmark at monument
            scale, the system's outro (DESIGN-DIRECTION §06), and the bar. */}
        <div className="sf-footer__grid">
          <div className="sf-footer__studio">
            <p className="sf-footer__brand">
              SF <em>Muse</em>
            </p>
            <p className="sf-footer__tagline">
              Luxury Visual Storytelling &amp; Brand Experiences
            </p>
            <p className="sf-footer__sectors">
              {SECTORS.map((sector, i) => (
                <span key={sector}>
                  {i > 0 && ' • '}
                  <span className="sf-footer__sector">{sector}</span>
                </span>
              ))}
            </p>
          </div>
          <nav aria-labelledby="sf-footer-nav">
            <h3 className="sf-footer__heading" id="sf-footer-nav">Navigation</h3>
            <ul className="sf-footer__list sf-footer__list--nav">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link className="sf-footer__link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sf-footer__connect">
            <h3 className="sf-footer__heading">
              <span className="sf-sr-only">Connect</span>
              <span aria-hidden="true">&nbsp;</span>
            </h3>
            <ul className="sf-footer__list">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    className="sf-footer__link"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label} <span aria-hidden="true">&#8599;</span>
                  </a>
                </li>
              ))}
              <li>
                <a className="sf-footer__link sf-footer__link--email" href={`mailto:${email}`}>
                  <span className="sf-footer__email-label">Email</span>
                  <span className="sf-footer__email">{email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="sf-footer__mark" aria-hidden="true">
          SF <em>Muse</em>
        </p>

        <div className="sf-footer__bar">
          <span>&copy; MMXXVI SF Muse</span>
          <a className="sf-footer__top-link" href="#main">
            Back to top <span aria-hidden="true">&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
