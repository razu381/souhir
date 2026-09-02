/**
 * Generic scroll reveal for sections BELOW the fold.
 *
 * The hero does not use this — it is above the fold and is driven by its own
 * decode gating in hero.js. This exists for sections 02+ and is included now
 * so the pattern is established: behaviour is attached by `data-sf-reveal`,
 * never by tag or position, so in Elementor it is added through the widget's
 * Attributes field.
 */
export function initReveal(root = document) {
  const els = root.querySelectorAll('[data-sf-reveal]:not([data-sf-init])');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => { el.setAttribute('data-sf-init', ''); el.classList.add('is-revealed'); });
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  els.forEach((el) => {
    // Inside the hero the sequence owns the timing — do not double-drive it.
    if (el.closest('[data-sf-hero]')) { el.setAttribute('data-sf-init', ''); return; }
    el.setAttribute('data-sf-init', '');
    io.observe(el);
  });
}
