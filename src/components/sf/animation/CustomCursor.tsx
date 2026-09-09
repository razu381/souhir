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
 * The whole visible circle is the hot spot, not the orb's exact pixel: the
 * link state lights whenever the circle overlaps a clickable, and a click
 * landing on plain ground within the circle's reach is re-dispatched to the
 * nearest clickable it covers (form fields and direct hits untouched).
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

    const INTERACTIVE = 'a, button, [data-sf-cursor], label, summary';
    const TYPING = 'input, textarea, select, [contenteditable]';

    // The whole visible circle is the pointer's hot spot: the reach is the
    // ring's radius (--sf-cursor-reach in site.css), so hover light and click
    // both cover everything under the circle, not just the orb's exact pixel.
    const reach = parseFloat(getComputedStyle(root).getPropertyValue('--sf-cursor-reach')) || 20;
    const nearestInteractive = (x: number, y: number): HTMLElement | null => {
      let best: HTMLElement | null = null;
      let bestDist = reach;
      for (const el of document.querySelectorAll<HTMLElement>(INTERACTIVE)) {
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue; // hidden or filtered out
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        const d = Math.hypot(dx, dy);
        if (d < bestDist) {
          bestDist = d;
          best = el;
        }
      }
      return best;
    };

    const updateState = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.(`${INTERACTIVE}, ${TYPING}`);
      let next = !t ? 'default' : t.closest(TYPING) ? 'text' : 'link';
      if (next === 'default' && nearestInteractive(e.clientX, e.clientY)) next = 'link';
      root.dataset.state = next;
    };

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
      updateState(e);
    };

    // DOM changes can move interactive ground under a still pointer.
    const onOver = (e: PointerEvent) => {
      if (placed) updateState(e);
    };

    // Click forgiveness: a click anywhere in the circle lands on the nearest
    // clickable it covers. Direct hits and form fields are left alone; the
    // re-dispatched click re-enters this handler and takes the direct path.
    const onClick = (e: MouseEvent) => {
      if (e.detail === 0 || !(e.clientX || e.clientY)) return; // keyboard / synthetic
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      if (t.closest(INTERACTIVE) || t.closest(TYPING)) return;
      const near = nearestInteractive(e.clientX, e.clientY);
      if (!near) return;
      e.preventDefault();
      e.stopPropagation();
      near.click();
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
    window.addEventListener('click', onClick, { capture: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);
    window.addEventListener('keydown', onKey);

    return () => {
      document.documentElement.classList.remove('sf-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('click', onClick, { capture: true });
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
