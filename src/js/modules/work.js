/**
 * Selected Works — the collection register's filter rail (section 06).
 *
 * Six categories, one rail. The buttons carry `data-sf-filter`; the plates
 * carry `data-sf-cat`. JS only ever flips classes and ARIA state — the
 * hidden/visible treatment lives in CSS (AGENT.md §5), and without JavaScript
 * the rail renders inert with every plate shown, which is exactly the
 * "All" state: the failure mode is "no filtering", never "no work".
 *
 * In Elementor: the rail is a button group, the plates are container widgets,
 * both tagged through Attributes — the module re-binds on editor rebuilds
 * like everything else (§1 Rule 3).
 */
export function initWork(root = document) {
  // Own sentinel, not the shared data-sf-init: the rail itself carries a
  // data-sf-reveal for its entrance, and reveal.js would stamp the shared
  // sentinel first — silently disqualifying this selector. Two behaviours on
  // one element means two gates.
  const rails = root.querySelectorAll('[data-sf-work]:not([data-sf-work-init])');

  rails.forEach((rail) => {
    rail.setAttribute('data-sf-work-init', '');

    const scope = rail.closest('[data-sf-work-scope]') || root;
    const buttons = Array.from(rail.querySelectorAll('[data-sf-filter]'));
    const items = Array.from(scope.querySelectorAll('[data-sf-cat]'));
    if (!buttons.length || !items.length) return;

    const apply = (cat) => {
      buttons.forEach((btn) => {
        const active = btn.dataset.sfFilter === cat;
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      items.forEach((item) => {
        // "all" is the rail's own state, not a category any plate carries.
        // Tokens are space-separated so a plate may hang in more than one room.
        const cats = ` ${item.dataset.sfCat} `;
        item.classList.toggle('is-filtered', cat !== 'all' && !cats.includes(` ${cat} `));
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => apply(btn.dataset.sfFilter));
    });

    // The opening state is "All" — make it true in the ARIA as well.
    if (!buttons.some((b) => b.getAttribute('aria-pressed') === 'true')) {
      const all = buttons.find((b) => b.dataset.sfFilter === 'all');
      if (all) all.setAttribute('aria-pressed', 'true');
    }
  });
}
