/**
 * Header state.
 *
 * Over the hero the header is transparent with its own gradient backdrop
 * (01-hero.md D6 — protection lives on the header, not as a hero top scrim).
 * Once scrolled past the hero it takes a solid ground.
 *
 * IntersectionObserver rather than a scroll listener: no main-thread work per
 * frame, which matters because the hero is the LCP screen.
 */
export function initHeader(root = document) {
  const headers = root.querySelectorAll('[data-sf-header]:not([data-sf-init])');

  headers.forEach((header) => {
    header.setAttribute('data-sf-init', '');

    const toggle = header.querySelector('[data-sf-menu-toggle]');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        header.classList.toggle('is-open', !open);
      });
    }

    const sentinel = document.querySelector('[data-sf-header-sentinel]');
    if (!sentinel || !('IntersectionObserver' in window)) return;

    new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' }
    ).observe(sentinel);
  });
}
