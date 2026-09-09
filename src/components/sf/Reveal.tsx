'use client';

/**
 * Reveal — port of src/js/modules/reveal.js for sections below the fold.
 * The hero does not use this (its decode-gated sequence owns the timing).
 *
 * Hidden initial states stay gated on .sf-js in the CSS, so no-JS renders
 * complete — the same failure mode as the prototype ("no animation", never
 * "no content").
 */
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export default function Reveal({
  children,
  delay,
  className,
  curtain = false,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** §05 image reveal: wipe the frame open while the print settles —
   *  see the curtain variant in components.css. */
  curtain?: boolean;
  as?: 'div' | 'p' | 'span' | 'figure' | 'h2' | 'h3' | 'li' | 'a' | 'blockquote';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      el?.classList.add('is-revealed');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      data-sf-reveal={curtain ? 'curtain' : ''}
      style={delay ? ({ '--sf-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {/* The curtain clips an INNER frame, never the figure itself: a
          fully-clipped figure has zero visible area, so its own observer
          would never fire and the image would read as "missing". */}
      {curtain ? <span className="sf-curtain-frame">{children}</span> : children}
    </Tag>
  );
}
