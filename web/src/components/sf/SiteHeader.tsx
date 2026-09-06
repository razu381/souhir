'use client';

/**
 * SiteHeader — port of src/js/modules/header.js, plus the menu overlay the
 * prototype's button never had (a one-page site only needed the anchor rail;
 * this one has seven routes).
 *
 * Over the opening dark band the header is transparent; past the band it
 * takes a solid noir ground — the sentinel sits at the end of each page's
 * opening band, exactly as in the prototype's markup.
 */

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/journal', label: 'Journal' },
  { href: '/editorial', label: 'Editorial' },
  { href: '/contact', label: 'Contact' },
];

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  // Solid ground once the opening band leaves the viewport (header.js's
  // IntersectionObserver, unchanged).
  useEffect(() => {
    const root = rootRef.current;
    const sentinel = document.querySelector('[data-sf-header-sentinel]');
    if (!root || !sentinel || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => root.classList.toggle('is-scrolled', !entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Scroll lock while the overlay is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Escape closes; focus returns to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="sf-header" ref={rootRef} data-sf-header>
        <Link className="sf-header__brand" href="/" aria-label="Dar SF — home">
          Dar <em>SF</em>
        </Link>
        <button
          className="sf-header__menu"
          type="button"
          aria-expanded={open}
          aria-controls="sf-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}{' '}
          <span className="sf-header__menu-rule" aria-hidden="true" />
        </button>
      </header>

      {open && (
        <nav className="sf-menu" id="sf-nav" aria-label="Main">
          <div className="sf-container">
            <ul className="sf-menu__list">
              {NAV.map((item, i) => (
                <li className="sf-menu__item" key={item.href}>
                  <Link
                    className="sf-menu__link"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sf-menu__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="sf-menu__foot">
              <span>Luxury Visual Presence — Paris</span>
              <a href="mailto:hello@darsf.com">hello@darsf.com</a>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
