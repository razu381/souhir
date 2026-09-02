/**
 * Word-by-word statement reveal (DESIGN-DIRECTION.md §05 — "the most editorial
 * moment in the system; run it slow").
 *
 * Scroll-LINKED, not on-enter: the paragraph's words light from dim to ink as
 * the section travels through the viewport, and reverse if the reader scrolls
 * back. JS only ever writes ONE custom property (--sf-p, 0→1) on the
 * paragraph; CSS mixes each word's colour from that progress (AGENT.md §5 —
 * custom properties, never inline geometry). Per-word ramp width lives in CSS,
 * so the pacing is tunable without touching this file.
 *
 * The word spans are created here rather than authored. Unlike the hero
 * headline (plan D9 — Elementor's editor would destroy authored spans on every
 * content edit, so those are hand-written and never split), a body paragraph
 * cannot hand-author sixty spans, and re-splitting on every init costs
 * nothing: the source text stays the widget's content, the spans are a
 * render-time artifact. Idempotent per §1 Rule 3.
 *
 * No JavaScript → no spans → the paragraph renders in its final colour
 * (CSS defaults --sf-p to 1). Reduced motion → CSS forces the final colour.
 */
export function initWords(root = document) {
  const els = root.querySelectorAll('[data-sf-reveal="words"]:not([data-sf-init])');
  if (!els.length) return;

  els.forEach((el) => {
    el.setAttribute('data-sf-init', '');

    const text = el.textContent.trim().replace(/\s+/g, ' ');
    const words = text.split(' ');
    el.textContent = '';
    const frag = document.createDocumentFragment();
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'sf-w';
      span.style.setProperty('--sf-i', i);
      span.textContent = word;
      frag.appendChild(span);
      frag.appendChild(document.createTextNode(' '));
    });
    el.appendChild(frag);
    el.style.setProperty('--sf-n', words.length);

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--sf-p', 1);
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Dim until the paragraph's top reaches 88% of the viewport; fully lit
      // by the time its bottom passes 45%. Slow, per the direction.
      const span = vh * 0.88 - vh * 0.45;
      const p = (vh * 0.88 - r.top) / (r.height + span);
      el.style.setProperty('--sf-p', Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    // Only listen while the paragraph is near the viewport.
    new IntersectionObserver((entries, io) => {
      let visible = false;
      entries.forEach((entry) => { if (entry.isIntersecting) visible = true; });
      if (visible) {
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    }, { rootMargin: '30% 0px 30% 0px' }).observe(el);
  });
}
