/**
 * The Services page — copy and plates.
 *
 * The copy is the client's final website copy
 * (SF_Muse_Website_Copy_Shorter_Updated.docx, SERVICES PAGE), verbatim and in
 * its order. The plates are baked from the client's delivery (Services/) by
 * scripts/home-assets.mjs into public/assets/services.
 *
 * There is no Services-page document in Sanity yet, so the page renders this
 * alone. (The homepage's service tiles keep their own copy — the doc gives
 * the homepage its own titles and summaries.)
 */
import type { Head, Plate } from './seed';

/** A Services rendition set — widths as baked by scripts/home-assets.mjs. */
function plate(
  slug: string,
  widths: number[],
  [width, height]: [number, number],
  sizes: string,
  alt: string,
): Plate {
  const at = (w: number) => `/assets/services/${slug}-${w}.webp`;
  return {
    src: at(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${at(w)} ${w}w`).join(', '),
    sizes,
    width,
    height,
    alt,
  };
}

const HERO_ALT = 'An empty photography studio — a spotlight throws a pool of warm light across the backdrop.';

export const hero = {
  title: ['Shaping Perception ', 'Through Experience'] as Head,
  texts: [
    'Luxury is no longer defined by products alone. It is defined by perception, atmosphere, and the stories people remember long after the moment has passed.',
    'Through visual storytelling, creative direction, digital experiences, and intelligent growth systems, SF Muse helps brands transform ideas into experiences designed to endure.',
  ],
  image: {
    ...plate('hero', [1600, 2400, 3200], [3200, 1800], '100vw', HERO_ALT),
    mobile: plate('hero-mobile', [800, 1200], [1200, 1800], '100vw', HERO_ALT),
  } as Plate,
};

export const create = {
  label: 'What we create',
  head: ['Experiences Shaped Through Strategy, ', 'Storytelling & Creative Intelligence'] as Head,
  text: 'SF Muse creates meaningful brand experiences through visual storytelling, creative direction, digital innovation, and intelligent growth—designed to inspire emotion, shape perception, and leave a lasting impression.',
};

const servicePlate = (slug: string, alt: string) =>
  plate(slug, [480, 800, 1200], [1200, 1500], '(min-width: 1025px) 36vw, 92vw', alt);

export type Service = {
  /** The anchor — the homepage tiles' slugs; their Learn More lands on /services#<slug>. */
  id: string;
  label: string;
  title: string;
  text: string;
  includesLabel: string;
  includes: string[];
  image: Plate;
};

export const services: Service[] = [
  {
    id: 'luxury-visual-storytelling',
    label: 'Service 1',
    title: 'Luxury Visual Storytelling',
    text: 'Cinematic photography and editorial visual content designed for hotels, spas, wellness spaces, aesthetic clinics, and luxury lifestyle brands.',
    includesLabel: 'Includes:',
    includes: ['Cinematic reels', 'Editorial photography', 'Hospitality storytelling', 'Beauty & wellness campaigns', 'Social media visuals', 'Guest-experience storytelling', 'Luxury lifestyle content', 'Short-form cinematic videos'],
    image: servicePlate('service-storytelling', 'A photographer at work in a studio between black flags and a softbox.'),
  },
  {
    id: 'creative-direction',
    label: 'Service 2',
    title: 'Creative Direction & Brand Identity',
    text: 'Luxury-focused creative direction crafted to strengthen visual identity and create emotionally immersive brand experiences.',
    includesLabel: 'Includes:',
    includes: ['Luxury brand positioning', 'Visual direction', 'Editorial campaigns', 'Moodboards & concepts', 'Aesthetic consistency', 'Social media identity', 'Launch campaigns', 'Brand storytelling'],
    image: servicePlate('service-creative-direction', 'A creative director crouched over editorial prints and an open magazine spread on the floor, in black and white.'),
  },
  {
    id: 'digital-experiences',
    label: 'Service 3',
    title: 'Digital Experiences',
    text: 'Elegant digital experiences designed to reflect the sophistication and atmosphere of modern luxury brands.',
    includesLabel: 'Includes:',
    includes: ['Luxury website design', 'Hotel, spa & clinic booking integrations', 'Airbnb presentation pages', 'Mobile optimization', 'Digital customer journeys', 'Premium UI/UX direction', 'Hospitality-focused digital experiences'],
    image: servicePlate('service-digital', 'A smartphone showing an editorial website, set in an oyster shell ringed with pearls.'),
  },
  {
    id: 'intelligent-brand-growth',
    label: 'Service 4',
    title: 'Intelligent Brand Growth',
    text: 'AI-powered marketing systems and refined digital strategies designed to strengthen visibility and elevate modern luxury brands.',
    includesLabel: 'Includes:',
    includes: ['AI content systems', 'Automated marketing workflows', 'AI-enhanced content strategy', 'CRM integration strategy', 'Content planning systems', 'Digital visibility support', 'Smart customer engagement', 'AI sales funnels'],
    image: servicePlate('service-growth', 'Pale, delicate mushrooms growing from a circuit board.'),
  },
];

const methodPlate = (slug: string, alt: string) =>
  plate(slug, [480, 800, 1200], [1200, 800], '(min-width: 1025px) 28vw, (min-width: 768px) 45vw, 92vw', alt);

export const method = {
  label: 'The SF Muse Method',
  head: ['From Vision ', 'To Experience.'] as Head,
  text: 'Through strategy, storytelling, design, and creative intelligence, we transform ideas into experiences designed to inspire, connect, and endure.',
  steps: [
    { num: '01', title: 'Discovery', text: 'Understanding the brand, audience, atmosphere, and creative vision.',
      image: methodPlate('method-discovery', 'A moodboard on black marble — magazines, sketches, material swatches and a compass.') },
    { num: '02', title: 'Creative Direction', text: 'Developing storytelling concepts, visual identity, and aesthetic alignment.',
      image: methodPlate('method-creative-direction', 'Material samples, colour cards and interior references laid out on a dark desk.') },
    { num: '03', title: 'Production', text: 'Creating cinematic visuals, editorial content, and immersive digital experiences designed to captivate and inspire.',
      image: methodPlate('method-production', 'A cinema camera and lights on set in a dimly lit hotel lounge.') },
    { num: '04', title: 'Refinement', text: 'Carefully curating every detail to ensure elegance, consistency, and emotional impact.',
      image: methodPlate('method-refinement', 'Hands marking up a printed interior photograph beside swatches and a brass lamp.') },
    { num: '05', title: 'Delivery', text: 'Providing refined visual assets and elevated digital experiences designed to strengthen luxury brand perception.',
      image: methodPlate('method-delivery', 'A black presentation box of printed photographs, sealed with wax, on black marble.') },
    { num: '06', title: 'Elevate', text: 'SF Muse continues to evolve and elevate your brand through ongoing creative direction, strategic refinement, innovation, and immersive luxury experiences.',
      image: methodPlate('method-elevate', 'A creative director writing at a desk strewn with photographs, in a dark study.') },
  ],
};
