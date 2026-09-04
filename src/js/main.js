/**
 * Dar SF — entry point.
 *
 * Every init takes a root and refuses to double-bind (AGENT.md §1 Rule 3),
 * because Elementor's editor destroys and rebuilds DOM nodes live. In
 * WordPress this same bundle is enqueued unchanged and bridged with:
 *
 *   jQuery(window).on('elementor/frontend/init', () => {
 *     elementorFrontend.hooks.addAction('frontend/element_ready/global',
 *       ($el) => window.SF.initAll($el[0]));
 *   });
 */
import { initHero }   from './modules/hero.js';
import { initHeader } from './modules/header.js';
import { initReveal } from './modules/reveal.js';
import { initWords }  from './modules/words.js';
import { initWork }   from './modules/work.js';

export function initAll(root = document) {
  initHero(root);
  initHeader(root);
  initReveal(root);
  initWords(root);
  initWork(root);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initAll());
} else {
  initAll();
}

window.SF = { initAll };
