/**
 * ClientIcon — the seven "Who We Work With" categories as single-weight line
 * icons (client feedback, round 2: "a balanced grid with subtle icons rather
 * than another long list"). Drawn on ValueIcon's 48 grid at its stroke, so
 * the two sets read as one hand; currentColor, so the room's accent tints
 * them. Decorative — the category's title carries the meaning.
 */
export type ClientIconName = 'key' | 'cloche' | 'lotus' | 'drop' | 'diamond' | 'camera' | 'compass';

const PATHS: Record<ClientIconName, React.ReactNode> = {
  // Boutique Hotels — the room key.
  key: (
    <>
      <circle cx="15" cy="24" r="7.5" />
      <circle cx="15" cy="24" r="2.5" />
      <path d="M22.5 24H42" />
      <path d="M35.5 24v5M40 24v3.5" />
    </>
  ),
  // Luxury Hospitality Concepts — the cloche.
  cloche: (
    <>
      <path d="M10.5 33c0-8.1 6-14.5 13.5-14.5S37.5 24.9 37.5 33" />
      <path d="M7 33h34" />
      <path d="M11 37.5h26" />
      <path d="M24 18.5v-2.75" />
      <circle cx="24" cy="13.75" r="2" />
    </>
  ),
  // Wellness & Spa Brands — the lotus on still water.
  lotus: (
    <>
      <path d="M24 37c-4.1-3-6.2-7.6-6.2-12.4 0-4.2 2.3-8.2 6.2-11.6 3.9 3.4 6.2 7.4 6.2 11.6 0 4.8-2.1 9.4-6.2 12.4z" />
      <path d="M24 37c-6.6-.4-11.8-3.8-14.3-9.4 2.6-1.4 5.7-1.9 8.7-1.4" />
      <path d="M24 37c6.6-.4 11.8-3.8 14.3-9.4-2.6-1.4-5.7-1.9-8.7-1.4" />
      <path d="M13 42h22" />
    </>
  ),
  // Beauty & Aesthetic Clinics — the serum drop.
  drop: (
    <>
      <path d="M24 6.5S12.5 19.9 12.5 28.5a11.5 11.5 0 0 0 23 0C35.5 19.9 24 6.5 24 6.5z" />
      <path d="M18.5 29.5a5.5 5.5 0 0 0 5.5 5.5" />
    </>
  ),
  // Luxury Lifestyle Brands — the cut stone (ValueIcon's own diamond).
  diamond: (
    <>
      <path d="M16 10h16l6.5 8.5L24 40 9.5 18.5z" />
      <path d="M9.5 18.5h29" />
      <path d="M16 10l4 8.5L24 10l4 8.5L32 10" />
      <path d="M20 18.5 24 40l4-21.5" />
    </>
  ),
  // Editorial & Fashion Campaigns — the camera.
  camera: (
    <>
      <path d="M7.5 16.5h8l3-4.5h11l3 4.5h8v20.5h-33z" />
      <circle cx="24" cy="26.25" r="6.5" />
      <path d="M35 21h2" />
    </>
  ),
  // Elevated Travel Experiences — the compass.
  compass: (
    <>
      <circle cx="24" cy="24" r="16.5" />
      <path d="M29.5 18.5 26 26l-7.5 3.5L22 22z" />
      <path d="M24 7.5v3M24 37.5v3M7.5 24h3M37.5 24h3" />
    </>
  ),
};

export default function ClientIcon({ name, className }: { name: ClientIconName; className?: string }) {
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
