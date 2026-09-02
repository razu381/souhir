/**
 * Hero sequence gating (01-hero.md D8).
 *
 * The hero image is the LCP element, so it is never faded or clipped — the
 * only thing animated on it is `transform: scale()`, which is compositor-only
 * and does not delay paint.
 *
 * Ordering matters more than choreography. Revision 1 started the sequence on
 * "DOMContentLoaded or image load, whichever fires first", which on a slow
 * connection meant white Didone over a bare noir block, with the photograph
 * arriving afterwards — text-then-image reads as an error, not as slowness.
 *
 * So: wait for the image to decode. If that happens within DECODE_BUDGET, run
 * the full sequence. If it does not, jump straight to the final state with no
 * animation and let the photograph simply appear when it arrives. The failure
 * mode is "no animation", never "wrong order".
 */

const DECODE_BUDGET = 600; // ms

export function initHero(root = document) {
  const heroes = root.querySelectorAll('[data-sf-hero]:not([data-sf-init])');

  heroes.forEach((hero) => {
    hero.setAttribute('data-sf-init', '');

    const img = hero.querySelector('img');
    let settled = false;

    const play = (instant) => {
      if (settled) return;
      settled = true;
      // rAF so the initial state is painted before the class flips, otherwise
      // the browser may coalesce both frames and skip the transition entirely.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          hero.classList.add(instant ? 'is-instant' : 'is-ready');
        });
      });
    };

    if (!img) { play(false); return; }

    const timer = setTimeout(() => play(true), DECODE_BUDGET);
    const ready = () => { clearTimeout(timer); play(false); };

    const decode = img.decode
      ? img.decode()
      : (img.complete ? Promise.resolve() : new Promise((res, rej) => {
          img.addEventListener('load', res, { once: true });
          img.addEventListener('error', rej, { once: true });
        }));

    decode.then(ready).catch(() => { clearTimeout(timer); play(true); });

    // Scroll-linked drift for heroes that ask for it (data-sf-parallax): the
    // photograph holds while the page moves. JS writes ONE custom property;
    // CSS owns the transform (§5). Never bound under reduced motion.
    const parallax = hero.querySelector('[data-sf-parallax]');
    if (parallax && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let ticking = false;
      const update = () => {
        ticking = false;
        const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
        hero.style.setProperty('--sf-px', p.toFixed(4));
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
    }
  });
}
