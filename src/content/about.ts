/** About copy: client’s final revision, 7 November 2026; supersedes v4 where different. */
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

export const hero = {
  label: 'The Perspective Behind SF Muse',
  lines: ['The Art of Presence.'],
  voice: ['The Intelligence Behind It.'],
  lead: 'Luxury is not defined by appearance alone.',
  texts: [
    'It is shaped by atmosphere, emotion, perception, and the moments people remember long after an experience ends.',
    'SF Muse began with a belief: the most compelling brands are felt as well as seen. An image can win attention. A coherent identity, an intuitive digital experience and thoughtful marketing give that attention direction and meaning.',
  ],
  image: plate('presence-hero', [800, 1200, 1600, 2400, 3000], [3000, 1621], '100vw',
    'Behind the scenes of a fashion shoot, with a camera crew and model in a monochrome studio.'),
};

export const founder = {
  label: 'Founder Story',
  head: ['Where strategy', 'becomes desire'],
  subhead: 'The Language of Presence',
  texts: [
    'Founded by Souhir Fhima, the studio draws on experience in marketing and business strategy as well as creative direction, styling and visual collaboration. The combination defines our approach: imagination guided by clarity, with every aesthetic choice tied to a brand’s wider ambitions.',
    'Our work connects visual campaigns, brand identity, digital design and marketing strategy. Each engagement starts with the audience, the opportunity and the outcome, then shapes a creative response that is individual, useful and true to the brand.',
  ],
  image: plate('founder', PORTRAIT, [2000, 2667], '(min-width: 1025px) 38vw, 92vw',
    'Souhir Fhima in a white tweed jacket, a veiled hat and round sunglasses, leaning against a column, in black and white.'),
  // Her supplied signature, refilled in bronze for the ivory ground (her own
  // strokes and edges; her champagne reads 1.8 : 1 on ivory). The name
  // line beneath it carries the meaning, so the image is decorative.
  signature: plate('signature-ink', [640, 1010], [1010, 395], '(min-width: 1472px) 368px, (min-width: 960px) 25vw, 240px', ''),
  name: 'Souhir Fhima',
  role: 'Founder & Creative Director',
};

export const way = {
  title: 'Our approach — six stages',
  intro: 'Every project follows a considered process, bringing creative vision and strategic thinking together from discovery to delivery.',
  principles: [
    ['01', 'Discovery', 'Understand the brand, audience, objectives and opportunity.'],
    ['02', 'Creative Direction', 'Define the idea, visual language, message and experience.'],
    ['03', 'Production', 'Bring the direction to life through appropriate specialist production and design.'],
    ['04', 'Refinement', 'Review quality, consistency, usability and alignment with the brief.'],
    ['05', 'Delivery', 'Launch or hand over agreed assets, designs and digital experiences.'],
    ['06', 'Elevate', 'Review performance and explore ongoing creative or marketing support where useful.'],
  ],
};

export const difference = {
  label: 'The SF Muse Difference',
  head: 'Designing What Cannot Be Seen',
  statements: ['Many studios focus on visuals.', 'We focus on perception.'],
  lead: 'Every project begins with a simple question:',
  question: 'How should people feel?',
  text: 'Because what makes a brand memorable goes beyond what people see. It lies in the emotions, associations and experiences that stay with them.',
  image: {
    ...plate('presence-quote', [800, 1200, 1600, 2400, 3000], [3000, 1621], '100vw',
      'A monochrome portrait of a woman draping a jacket over her shoulder beside a studio light.'),
    mobile: plate('presence-quote-mobile', [800, 1200], [1200, 1200], '100vw',
      'A woman draping a jacket over her shoulder beside a studio light.'),
  },
};

export type ValueIcon = 'target' | 'layers' | 'diamond' | 'people' | 'laptop' | 'infinity';

export const guides = {
  title: 'What guides our work',
  items: [
    { icon: 'target', title: 'Clarity before complexity.', text: 'We begin with the real objective.' },
    { icon: 'layers', title: 'Creative direction with purpose.', text: 'Every choice should strengthen the brand story and experience.' },
    { icon: 'diamond', title: 'Details matter.', text: 'Strong work is built through careful execution.' },
    { icon: 'people', title: 'Collaboration is part of the craft.', text: 'We bring together appropriate skills for each project.' },
    { icon: 'laptop', title: 'Human-led creativity.', text: 'Technology supports, rather than replaces, judgement.' },
    { icon: 'infinity', title: 'Designed for longevity.', text: 'We favour coherent identity over short-lived trends.' },
  ] satisfies { icon: ValueIcon; title: string; text: string }[],
};

export const closing = {
  head: ['Let’s Create Something', 'Worth Remembering'],
  texts: [
    'Whether developing a hospitality destination, a wellness concept, an editorial campaign or a refined digital experience, every memorable story begins with a clear vision.',
    "Tell us what you're building and where you want to take it. Together, we'll explore how thoughtful creativity and strategic direction can bring that vision to life.",
  ],
  cta: { label: 'Start a Project', href: '/contact' },
  image: {
    ...plate('presence-cta', [800, 1200, 1600, 2400, 3000], [3000, 1500], '100vw',
      'A fashion silhouette in a sculptural black hat and flowing black gown.'),
    mobile: plate('presence-cta-mobile', [800, 1200], [1200, 1200], '100vw',
      'A fashion silhouette in a sculptural black hat and flowing black gown.'),
  },
};
