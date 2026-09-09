'use client';

/**
 * SmoothScroll — Lenis, but only where choreography exists.
 *
 * The wheel glide is mounted on the routes that carry scrubbed motion
 * (/, /home-v1…v5, /editorial, /journal) and nowhere else: long-form
 * reading pages keep the browser's native scroll, which is both the most
 * accessible default and the smallest QA surface. `/studio` runs its own
 * application and is never touched.
 *
 * Navigation discipline (App Router + a virtual wheel):
 * - Push navigations reset to the top THROUGH Lenis (`scrollTo(0,
 *   {immediate:true})`) so its internal target can't fight Next's own
 *   scroll-to-top and land "already scrolled".
 * - Back/forward lets Next restore first, then adopts whatever it restored
 *   (`scrollTo(window.scrollY, {immediate:true})`) a frame later.
 * - The menu overlay locks scroll via `overflow:hidden` on <html> (see
 *   SiteHeader); a MutationObserver translates that into lenis.stop/start
 *   so the page can't glide behind the open menu.
 *
 * Reduced motion: Lenis is never created at all.
 */
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

const CHOREOGRAPHED = [/^\/$/, /^\/home-v\d+$/, /^\/editorial$/, /^\/journal$/];

/** Fixed header clearance for hash targets — the .sf-header band (~88px)
 *  plus a hair of air, same family as the clientele sticky offset. */
const HASH_OFFSET = -96;

export default function SmoothScroll() {
  const pathname = usePathname();
  const prev = useRef<string | null>(null);
  const pop = useRef(false);

  // Mark history navigations (back/forward) so the pathname effect knows
  // who owns scroll restoration.
  useEffect(() => {
    const onPop = () => {
      pop.current = true;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const navigated = prev.current !== null && prev.current !== pathname;
    prev.current = pathname;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !CHOREOGRAPHED.some((r) => r.test(pathname))) return;

    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({
      // The wheel equivalent of the house long-tail: about 1.15s to settle,
      // quartic-out — no bounce, no rubber-banding.
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: false, // touch keeps the browser's own (best) scrolling
      wheelMultiplier: 1,
    });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // -- Navigation scroll discipline -------------------------------------
    if (navigated) {
      if (pop.current) {
        // Next restored the cached position; adopt it and clear the flag.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            lenis.scrollTo(window.scrollY, { immediate: true });
            ScrollTrigger.refresh();
          });
        });
        pop.current = false;
      } else {
        lenis.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    // -- Menu lock: <html style="overflow:hidden"> → stop the glide -------
    const mo = new MutationObserver(() => {
      if (document.documentElement.style.overflow.includes('hidden')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    // -- Same-document hash links glide, and clear the fixed header -------
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (!url.hash || url.pathname !== window.location.pathname || url.search !== window.location.search) {
        return; // cross-page (or bare) — native behaviour, resynced above
      }
      e.preventDefault();
      lenis.scrollTo(url.hash, { offset: HASH_OFFSET });
      history.pushState(history.state, '', url.hash);
    };
    document.addEventListener('click', onClick, true);

    // -- Late layout: fonts and images shift triggers -----------------------
    const fontsReady = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(fontsReady);
    window.addEventListener('load', fontsReady);

    return () => {
      window.removeEventListener('load', fontsReady);
      document.removeEventListener('click', onClick, true);
      mo.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
