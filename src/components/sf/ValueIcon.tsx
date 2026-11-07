import type { ValueIcon as Key } from '@/content/about';

/** Decorative line icons; the adjacent title carries the meaning. */
const PATHS: Record<Key, React.ReactNode> = {
  target: (
    <>
      <circle cx="22" cy="26" r="17" /><circle cx="22" cy="26" r="11" /><circle cx="22" cy="26" r="4" />
      <path d="m22 26 19-19m-7 0V3l-5 5v7h7l5-5h-4" />
    </>
  ),
  layers: <path d="m24 5 20 11-20 11L4 16Zm-20 20 20 11 20-11M4 34l20 11 20-11" />,
  diamond: (
    <>
      <path d="M16 10h16l6.5 8.5L24 40 9.5 18.5z" />
      <path d="M9.5 18.5h29" />
      <path d="M16 10l4 8.5L24 10l4 8.5L32 10" />
      <path d="M20 18.5 24 40l4-21.5" />
    </>
  ),
  people: (
    <>
      <circle cx="24" cy="12" r="6" /><circle cx="10" cy="17" r="4" /><circle cx="38" cy="17" r="4" />
      <path d="M13 43V32a11 11 0 0 1 22 0v11M3 42v-9a7 7 0 0 1 10-6m22 0a7 7 0 0 1 10 6v9" />
    </>
  ),
  laptop: <path d="M7 9h34v25H7Zm0 25-4 5v2h42v-2l-4-5M19 38h10" />,
  infinity: <path d="M24 24C17 13 5 11 3 21c-3 15 11 19 21 3s25-12 21 0c-3 13-14 12-21 0Z" />,

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
