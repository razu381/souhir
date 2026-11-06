/**
 * The About page — copy and plates.
 *
 * The copy is the client's final website copy
 * (SF_Muse_Website_Copy_Shorter_Updated.docx, ABOUT PAGE), verbatim: every
 * heading, sentence and label the page shows comes from that document, in its
 * order. Two additions are the client's own request (About feedback,
 * 2026-10-09, point 2): her signature, and the line "Souhir Fhima — Founder &
 * Creative Director" under it. The plates are baked from the client's
 * delivery (About page/) by scripts/home-assets.mjs into public/assets/about.
 *
 * Headings are set as hand-broken lines (round 2 — docs/plans/
 * 12-about-round-2.md §2.2): each array entry is one line on desktop.
 *
 * There is no About document in Sanity yet, so the page renders this alone.
 */
import type { Plate } from './seed';

/** An About rendition set — widths as baked by scripts/home-assets.mjs. */
function plate(
  slug: string,
  widths: number[],
  [width, height]: [number, number],
  sizes: string,
  alt: string,
  format = 'webp',
): Plate {
  const at = (w: number) => `/assets/about/${slug}-${w}.${format}`;
  return {
    src: at(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${at(w)} ${w}w`).join(', '),
    sizes,
    width,
    height,
    alt,
  };
}

const PORTRAIT = [480, 800, 1200, 1600, 2000];

const HERO_ALT =
  'A creative studio with classical columns, a camera on stacked books, a draped mannequin, and a spotlight.';

export const hero = {
  /** The headline, then its second voice (italic, champagne). */
  lines: ['More Than', 'A Studio.'],
  voice: ['A Philosophy', 'Of Experience.'],
  lead: 'Luxury is not defined by appearance alone.',
  texts: [
    'It is shaped by atmosphere, emotion, perception, and the moments people remember long after an experience ends.',
    'SF Muse exists at the intersection of creativity, strategy, and human connection, crafting brands and experiences designed to inspire, resonate, and endure.',
  ],
  // Sizes account for cover scaling on tall screens; handsets use a portrait crop.
  image: {
    ...plate('hero', [1200, 1600, 2400, 3200], [3200, 1600], 'max(100vw, 200svh)', HERO_ALT, 'jpg'),
    mobile: plate('hero-mobile', [800, 1200], [1200, 1600], 'max(100vw, 75svh)', HERO_ALT, 'jpg'),
  } as Plate,
};

export const founder = {
  label: 'Founder Story',
  head: ['Where strategy', 'becomes desire'],
  subhead: 'The Language of Presence',
  texts: [
    'Founded by creative director Souhir Fhima, SF Muse exists at the intersection of storytelling, luxury, hospitality, beauty, wellness, and contemporary culture.',
    'SF Muse began with a simple belief: the most memorable brands are not built through visibility alone—they are remembered through feeling.',
    'Years of experience across marketing, business strategy, and creative direction revealed that the strongest brands rarely compete on products alone.',
    'Through creative direction, visual storytelling, and intelligent innovation, ideas are transformed into experiences that feel intentional, immersive, and enduring.',
    'Today, SF Muse partners with boutique hotels, wellness destinations, beauty brands, editorial projects, and experience-led businesses seeking to create meaningful distinction through storytelling, design, and perception.',
  ],
  image: plate('founder', PORTRAIT, [2000, 2667], '(min-width: 1025px) 38vw, 92vw',
    'Souhir Fhima in a white tweed jacket, a veiled hat and round sunglasses, leaning against a column, in black and white.'),
  // Her supplied signature, refilled in bronze for the ivory ground (her own
  // strokes and edges; her champagne reads 1.8 : 1 on ivory). The name
  // line beneath it carries the meaning, so the image is decorative.
  signature: plate('signature-ink', [640, 1010], [1010, 395], '(min-width: 1025px) 288px, 60vw', ''),
  name: 'Souhir Fhima',
  role: 'Founder & Creative Director',
};

export const philosophy = {
  label: 'The Philosophy',
  statement: ['Luxury is more than appearance.', 'It is atmosphere, emotion, and experience.'],
  texts: [
    'SF Muse was created from the belief that modern luxury brands should feel immersive, timeless, and emotionally engaging across every visual and digital touchpoint.',
    'We believe in creating stories that move beyond content — blending cinematic visuals, refined branding, intelligent marketing, and elevated digital experiences to shape how people feel, connect, and remember a brand.',
  ],
  // Never cropped: the client asked for the full figure, head to heels.
  image: plate('philosophy', [480, 800, 1200, 1600, 2000, 2400], [2400, 3200], '(min-width: 1025px) 46vw, 100vw',
    'A woman in a long fur coat leaning against a fluted stone column along a rain-wet colonnade.'),
};

export const way = {
  // The doc writes "The SF Muse way"; the client's feedback sets it in title
  // case, as every other section title (DECISION-LOG, 2026-10-09).
  title: 'The SF Muse Way',
  intro:
    'At SF Muse, creativity is guided by intention, curiosity, refinement, and genuine human connection. Remarkable work is created through trust, thoughtful collaboration, and an unwavering attention to detail.',
  principles: [
    ['01', 'We Begin With Understanding', 'Every collaboration starts by listening. We seek to understand the people, the vision, and the emotions behind every brand.'],
    ['02', 'Details Create Distinction', 'Luxury is created through hundreds of thoughtful decisions working together. Nothing is accidental.'],
    ['03', 'Creativity With Purpose', 'Every visual, every experience, and every interaction should strengthen perception and support a meaningful objective.'],
    ['04', 'Collaboration Is Part Of The Craft', 'The strongest ideas emerge through conversation. We value openness, trust, curiosity, and long-term partnerships.'],
    ['05', 'Technology Should Feel Invisible', 'Artificial intelligence, automation, and digital tools are used thoughtfully to create better experiences—not more complicated ones.'],
    ['06', 'We Build For Longevity', 'We create experiences intended to remain relevant long after they are launched.'],
  ] as [num: string, title: string, text: string][],
};

export const difference = {
  label: 'The SF Muse Difference',
  head: 'Designing What Cannot Be Seen',
  lead: 'Every project begins with a simple question:',
  question: 'How should people feel?',
};

export const vision = {
  title: 'The Vision',
  statement:
    'Our vision is to shape immersive experiences that connect emotion, aesthetics, and modern luxury — from boutique hospitality and beauty brands to curated travel experiences, editorial campaigns, and future lifestyle concepts.',
};

/** The icon keys are the client's own set (the values mock-up the copy's note
 *  points to): king, heart, diamond, nib, star, column. */
export type ValueIcon = 'king' | 'heart' | 'diamond' | 'nib' | 'star' | 'column';

export const values = {
  title: 'Our Values',
  items: [
    { icon: 'king', title: 'Strategic Elegance', text: ['Every detail is crafted with intention, precision, and refinement.'] },
    { icon: 'heart', title: 'Emotional Intelligence', text: ['We create experiences that inspire feeling, connection, and desire.'] },
    { icon: 'diamond', title: 'Timeless Aesthetics', text: ['SF Muse values elegance that transcends trends — refined, immersive, and enduring.'] },
    { icon: 'nib', title: 'Elevated Experiences', text: ['From visuals to digital presence, every interaction should feel atmospheric, immersive, and carefully considered.'] },
    { icon: 'star', title: 'Visionary Innovation', text: ['We blend creativity, storytelling, and intelligent digital strategy to shape the future of modern luxury experiences.'] },
    // The copy breaks this one across two lines.
    { icon: 'column', title: 'Authentic Presence', text: ['True luxury does not seek attention.', 'It carries quiet confidence, clarity, and identity.'] },
  ] as { icon: ValueIcon; title: string; text: string[] }[],
};

export const closing = {
  /** The second line keeps the closer's italic, as on the homepage. */
  head: ['Let’s Create Something', 'Worth Remembering'],
  texts: [
    'Whether developing a hospitality destination, a wellness concept, an editorial campaign, or a refined digital experience, every memorable story begins with a clear vision.',
    'SF Muse transforms ideas into experiences designed to inspire emotion, shape perception, and leave a lasting impression.',
  ],
  cta: { label: 'Start a Conversation', href: '/contact' },
  // Provisional (DECISION-LOG Q8): from the Contact delivery.
  image: plate('closing', [800, 1200, 1600, 2000], [2000, 2500], '(min-width: 1025px) 40vw, 100vw',
    'A black notebook embossed “SF Muse — Creative Intelligence” with a gold pen, on dark veined marble under a sprig of olive.'),
};
