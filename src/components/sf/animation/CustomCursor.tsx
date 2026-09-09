'use client';

/**
 * CustomCursor — the maison's pointer: a champagne orb with a trailing
 * hairline orbit ring.
 *
 * The orb is a small filled disc in champagne — the house's own accent,
 * sampled from the logo — with a soft outer aura (the one sanctioned glow
 * in the system, borrowed from the picture-light treatment). A thin bone
 * ring trails behind on the house long-tail, like a planet with its orbit.
 * Over links the pointer never covers what it points at: the orb grows a
 * touch, warms one step brighter and its aura swells — the wick turned up —
 * while the ring breathes outward and holds.
 *
 * Isolation contract (this is the one component that can be deleted with
 * the site unchanged): no markup depends on it, and the only footprint is
 * the `sf-cursor` class it adds to <html> plus the CSS block in site.css.
 *
 * Invariants:
 * - The wrapper NEVER receives a transform — orb and ring are moved by
 *   `gsap.quickTo` as direct children (position:fixed breaks if an
 *   ancestor gains a transform; nothing may ever transform <html>/<body>).
 * - `:focus-visible` outlines are untouched; the cursor is decoration,
 *   never an affordance.
 *
 * Gates (all live, re-evaluated without reload): `(pointer: fine)`,
 * `prefers-reduced-motion: no-preference`, not `/studio`, and no prior
 * kill. Escape hides it for the session and restores the native cursor —
 * the OS cursor-size / high-contrast accommodations win over the effect.
 */
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from './gsap';

const KILL_KEY = 'sf-cursor-off';

export default function CustomCursor() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Gate evaluation — both conditions re-checked on OS/device changes.
  useEffect(() => {
    if (window.sessionStorage?.getItem(KILL_KEY) === '1') return;
    const fine = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const evaluate = () => setEnabled(fine.matches && !reduced.matches);
    evaluate();
    fine.addEventListener('change', evaluate);
    reduced.addEventListener('change', evaluate);
    return () => {
      fine.removeEventListener('change', evaluate);
      reduced.removeEventListener('change', evaluate);
    };
  }, []);

  const active = enabled && !pathname.startsWith('/studio');

  useEffect(() => {
    const root = rootRef.current;
    if (!active || !root) return;

    const orb = root.querySelector<HTMLElement>('.sf-cursor__orb');
    const ring = root.querySelector<HTMLElement>('.sf-cursor__ring');
    if (!orb || !ring) return;

    document.documentElement.classList.add('sf-cursor');
    root.dataset.state = 'hidden';

    // Orb leads, ring drifts behind — the house long-tail as a follow.
    const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'sf' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'sf' });
    const ox = gsap.quickTo(orb, 'x', { duration: 0.12, ease: 'sf' });
    const oy = gsap.quickTo(orb, 'y', { duration: 0.12, ease: 'sf' });

    let placed = false;
    const onMove = (e: PointerEvent) => {
      if (!placed) {
        // First appearance: materialise under the pointer, don't glide in.
        placed = true;
        gsap.set([orb, ring], { x: e.clientX, y: e.clientY });
        root.dataset.state = 'default';
        return;
      }
      rx(e.clientX);
      ry(e.clientY);
      ox(e.clientX);
      oy(e.clientY);
    };

    const INTERACTIVE = 'a, button, [data-sf-cursor], label, summary';
    const TYPING = 'input, textarea, select, [contenteditable]';
    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.(`${INTERACTIVE}, ${TYPING}`);
      root.dataset.state = !t ? 'default' : t.closest(TYPING) ? 'text' : 'link';
    };

    const onDown = () => {
      root.dataset.pressed = '1';
    };
    const onUp = () => {
      delete root.dataset.pressed;
    };
    const onLeave = () => {
      root.dataset.state = 'hidden';
    };
    const onEnter = () => {
      if (placed) root.dataset.state = 'default';
    };

    // The kill-switch: one Escape restores the native cursor for the
    // session (OS cursor accommodations outrank the effect).
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      window.sessionStorage?.setItem(KILL_KEY, '1');
      setEnabled(false);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);
    window.addEventListener('keydown', onKey);

    return () => {
      document.documentElement.classList.remove('sf-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="sf-pointer" data-state="hidden" ref={rootRef}>
      <span className="sf-cursor__ring" />
      <span className="sf-cursor__orb" />
    </div>
  );
}
