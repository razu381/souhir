'use client';

/**
 * WordReveal — port of src/js/modules/words.js (DESIGN-DIRECTION §05, "the
 * most editorial moment in the system; run it slow").
 *
 * Scroll-LINKED, not on-enter: JS writes ONE custom property (--sf-p, 0→1)
 * on the paragraph; CSS mixes each word's colour from that progress against
 * --sf-i / --sf-n. The word spans are a render-time artifact here too —
 * React re-splits whenever the text changes (keyed by content), and without
 * JS the paragraph renders plain ink (CSS defaults --sf-p to 1).
 */
import { useEffect, useRef } from 'react';

export default function WordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = text.trim().replace(/\s+/g, ' ').split(' ');
    el.textContent = '';
    const frag = document.createDocumentFragment();
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'sf-w';
      span.style.setProperty('--sf-i', String(i));
      span.textContent = word;
      frag.appendChild(span);
      frag.appendChild(document.createTextNode(' '));
    });
    el.appendChild(frag);
    el.style.setProperty('--sf-n', String(words.length));

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.style.setProperty('--sf-p', '1');
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Dim until the top reaches 88% of the viewport; fully lit by the time
      // the bottom passes 45%. Slow, per the direction.
      const span = vh * 0.88 - vh * 0.45;
      const p = (vh * 0.88 - r.top) / (r.height + span);
      el.style.setProperty('--sf-p', Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    // Listen only while the paragraph is near the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          update();
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      },
      { rootMargin: '30% 0px 30% 0px' },
    );
    io.observe(el);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [text]);

  return (
    <p ref={ref} className={className} data-sf-reveal="words">
      {text}
    </p>
  );
}
