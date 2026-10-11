import type { Head } from '@/content/seed';

/**
 * Lines — a two-part heading set on two hand-placed lines (round 2,
 * DESIGN-DIRECTION §02 addendum). Roman by default: the client asked for
 * italics "more selectively", so the second voice is italic only where the
 * copy has a natural second beat — the hero, the quote and the closer — and
 * those opt in with `italic`. The space between the lines is kept for the
 * accessible name.
 */
export default function Lines({ head, italic = false }: { head: Head; italic?: boolean }) {
  const [first, second] = head;
  return (
    <>
      <span className="sf-hp-line">{first.trim()}</span>{' '}
      {second && <span className="sf-hp-line">{italic ? <em>{second.trim()}</em> : second.trim()}</span>}
    </>
  );
}
