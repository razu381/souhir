'use client';

/**
 * GSAP registration — the one place the site's animation engine is wired.
 *
 * Ease policy (see the DESIGN-DIRECTION §05 addendum):
 * - Scrubbed tweens (scroll-linked) run `ease: 'none'` — the reader's hand
 *   is the easing curve, and `scrub: 1` supplies the catch-up glide. No
 *   token-fidelity claim is made for hand-driven motion.
 * - Time-driven tweens (the cursor's follow, any on-enter entrance) use the
 *   `sf` ease below — the SVG-path form of tokens.css `--ease`
 *   (cubic-bezier(0.16, 1, 0.30, 1)), mirrored once, cross-referenced here.
 *   tokens.css stays the single source; if the token changes, change it here.
 *
 * `registerPlugin(useGSAP)` follows @gsap/react's own README (it silences
 * the hook's registration warning and is their documented pattern).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

CustomEase.create('sf', 'M0,0 C0.16,1 0.3,1 1,1');

export { gsap, ScrollTrigger, useGSAP };
