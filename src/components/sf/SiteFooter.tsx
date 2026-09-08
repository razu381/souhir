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

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function SiteFooter({ settings }: { settings: Settings | null }) {
  const socials = settings?.socials?.length ? settings.socials : SOCIALS;

  return (
    <footer className="sf-footer">
      <div className="sf-container">
        <div className="sf-footer__grid">
          <div>
            <p className="sf-footer__brand">
              Dar <em>SF</em>
            </p>
            <p className="sf-footer__tagline">
              {settings?.tagline ?? 'Luxury Visual Presence — Paris'}
            </p>
          </div>
          <nav aria-label="Footer">
            <h3 className="sf-footer__heading">Navigate</h3>
            <ul className="sf-footer__list">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link className="sf-footer__link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="sf-footer__heading">Follow</h3>
            <ul className="sf-footer__list">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    className="sf-footer__link"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sf-footer__heading">Contact</h3>
            <ul className="sf-footer__list">
              <li>
                <a
                  className="sf-footer__link"
                  href={`mailto:${settings?.contactEmail ?? 'hello@darsf.com'}`}
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="sf-footer__bar">
          <span>&copy; MMXXVI Dar SF</span>
          <a className="sf-footer__top-link" href="#main">
            Back to top <span aria-hidden="true">&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
