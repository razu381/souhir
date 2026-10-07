import type { ValueIcon as Key } from '@/content/about';

/**
 * ValueIcon — the client's values set, redrawn as single-weight line icons
 * (the copy's note: "use the same icons for values section", pointing at the
 * values mock-up): a chess king, a heart, a cut diamond, a pen nib, a
 * four-point star and a column. Drawn on a 48 grid in currentColor at one
 * hairline-heavy stroke, so the room's accent tints them. Decorative — the
 * value's title carries the meaning.
 */
const PATHS: Record<Key, React.ReactNode> = {
  king: (
    <>
      <path d="M24 4.5v5M21.5 7h5" />
      <circle cx="24" cy="14.5" r="4.25" />
      <path d="M18.5 21h11" />
      <path d="M20.5 21c0 6.5-.9 12.4-3 17.5h13c-2.1-5.1-3-11-3-17.5" />
      <path d="M15.5 38.5h17v4h-17z" />
    </>
  ),
  heart: (
    <path d="M24 40C13.5 32.6 8.5 26.4 8.5 19.6a7.6 7.6 0 0 1 15.5-2.9 7.6 7.6 0 0 1 15.5 2.9C39.5 26.4 34.5 32.6 24 40z" />
  ),
  diamond: (
    <>
      <path d="M16 10h16l6.5 8.5L24 40 9.5 18.5z" />
      <path d="M9.5 18.5h29" />
      <path d="M16 10l4 8.5L24 10l4 8.5L32 10" />
      <path d="M20 18.5 24 40l4-21.5" />
    </>
  ),
  nib: (
    <g transform="rotate(38 24 24)">
      <path d="M24 42.5 15.5 27.5c0-6 3.5-10.5 3.5-17.5h10c0 7 3.5 11.5 3.5 17.5z" />
      <path d="M24 42.5V27" />
      <circle cx="24" cy="24.5" r="2.25" />
      <path d="M18.5 6h11v4h-11z" />
    </g>
  ),
  star: (
    <path d="M24 5c.9 11.6 6.4 17.1 18 19-11.6.9-17.1 6.4-18 18-.9-11.6-6.4-17.1-18-18 11.6-1.9 17.1-7.4 18-19z" />
  ),
  column: (
    <>
      <path d="M10.5 8.5h27" />
      <path d="M12.5 8.5c0 3.4 2.3 5.5 5.5 5.5h12c3.2 0 5.5-2.1 5.5-5.5" />
      <path d="M17 14v24.5M31 14v24.5M21.7 14v24.5M26.3 14v24.5" />
      <path d="M15 38.5h18M12 42.5h24M15 38.5l-3 4M33 38.5l3 4" />
    </>
  ),
};

export default function ValueIcon({ name, className }: { name: Key; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
