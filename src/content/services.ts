/**
 * The Services page — copy and plates.
 *
 * The copy is the client's final website copy
 * (SF_Muse_Website_Copy_Services_Updated.docx, SERVICES PAGE, Oct 2026),
 * verbatim and in its order. Each service's paragraph runs its packages
 * together in one sentence chain ("Signature Story — from £550 per session:
 * a creative brief, …"); here they are split into lead, packages and note,
 * the words unchanged but for the capital that now starts each piece. The plates are baked from the client's delivery (Services/) by
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
    'A distinctive brand presence is shaped by what people see, experience and remember.',
    'SF Muse connects creative direction with commercial thinking for hospitality, wellness, beauty and lifestyle businesses. We consider how your brand should feel, what makes your offer compelling, and how each image, message and digital experience guides people towards an enquiry, booking or purchase.',
  ],
  image: {
    ...plate('hero', [1600, 2400, 3200], [3200, 1800], '100vw', HERO_ALT),
    mobile: plate('hero-mobile', [800, 1200], [1200, 1800], '100vw', HERO_ALT),
  } as Plate,
};

export const create = {
  label: 'What we create',
  head: ['One Brand Story. ', 'A Clear Path To Action.'] as Head,
  /** The doc's paragraph: its first sentence is the invitation, the rest the
   *  terms every price below is read against. */
  text: 'Choose a focused package within one of our four service areas, or combine them in a tailored project.',
  terms: 'Prices shown are starting rates. Your final quote depends on project scope, deliverables and production requirements. Collaborator fees and usage rights are confirmed before booking, with additional costs itemised in your proposal.',
};

const servicePlate = (slug: string, alt: string) =>
  plate(slug, [480, 800, 1200], [1200, 1500], '(min-width: 1025px) 36vw, 92vw', alt);

/** A package and its starting rate, as the doc names them. */
export type Package = {
  name: string;
  price: string;
  text: string;
};

export type Service = {
  /** The anchor — the homepage tiles' slugs; their Learn More lands on /services#<slug>. */
  id: string;
  label: string;
  title: string;
  /** The paragraph's opening sentence. */
  text: string;
  packages: Package[];
  /** The paragraph's closing terms. */
  note: string;
  includesLabel: string;
  includes: string[];
  image: Plate;
};

export const services: Service[] = [
  {
    id: 'luxury-visual-storytelling',
    label: 'Service 1',
    title: 'The Art of Brand Presence',
    text: 'Creative direction and visual production that express your brand’s character.',
    packages: [
      { name: 'Signature Story', price: 'From £550 per session', text: 'A creative brief, visual direction and 15 edited photographs from a two-hour shoot.' },
      { name: 'Campaign World', price: 'From £1,250 per project', text: 'One campaign concept, 25 photographs and three short reels from a four-hour production session.' },
      { name: 'Muse Collaborations', price: 'Tailored quote', text: 'Photographer coordination, model sourcing or influencer partnerships for an agreed brief.' },
    ],
    note: 'Production, talent and usage requirements are confirmed before booking.',
    includesLabel: 'Includes:',
    includes: ['Brand, product & hospitality photography', 'Campaign concepts & art direction', 'Video & reels', 'Ad creative', 'Photographer coordination', 'Model sourcing', 'Influencer partnerships', 'AI-assisted visual concepts'],
    image: servicePlate('service-storytelling', 'A photographer at work in a studio between black flags and a softbox.'),
  },
  {
    id: 'creative-direction',
    label: 'Service 2',
    title: 'Creative Direction & Identity',
    text: 'Define what your brand stands for and how it should be recognised.',
    packages: [
      { name: 'Brand Essence', price: 'From £750', text: 'Positioning, audience insight, messaging, voice and a visual direction board.' },
      { name: 'Signature Identity', price: 'From £1,850', text: 'Brand Essence plus a logo system, colour and typography guidance, four social templates and a concise brand guide.' },
      { name: 'Creative Direction Atelier', price: 'From £950', text: 'A concept, moodboard, storyboard or shot list, and production brief for one campaign; production is quoted separately.' },
    ],
    note: 'Printed brand materials, including business cards, brochures, flyers, menus, posters, signage, labels and packaging, are quoted individually. Design, paper quality and texture, size, shape, finishes and quantity determine the final price.',
    includesLabel: 'Includes:',
    includes: ['Positioning & brand storytelling', 'Audience & competitor insight', 'Logo & visual identity', 'Brand guidelines', 'Naming & packaging direction', 'Campaign creative direction', 'Print design & production coordination'],
    image: servicePlate('service-creative-direction', 'A creative director crouched over editorial prints and an open magazine spread on the floor, in black and white.'),
  },
  {
    id: 'digital-experiences',
    label: 'Service 3',
    title: 'Digital Experiences',
    text: 'Make your brand easier to discover and easier to choose.',
    packages: [
      { name: 'Experience Website', price: 'From £2,250', text: 'A five-page website with copy, design, developer build and a clear enquiry journey.' },
      { name: 'Search & Discovery', price: 'From £650', text: 'An SEO audit, keyword map and agreed on-page improvements for priority pages.' },
      { name: 'App Concept', price: 'From £1,250', text: 'User journeys, a clickable prototype and a developer brief for one core use case.' },
    ],
    note: 'App development, e-commerce and complex integrations receive a tailored quote.',
    includesLabel: 'Includes:',
    includes: ['Websites & landing pages', 'Enquiry & booking journeys', 'E-commerce', 'SEO & local visibility', 'Website optimisation', 'App discovery & prototypes', 'Scoped app development'],
    image: servicePlate('service-digital', 'A smartphone showing an editorial website, set in an oyster shell ringed with pearls.'),
  },
  {
    id: 'intelligent-brand-growth',
    label: 'Service 4',
    title: 'Intelligent Brand Growth',
    text: 'Understand your market and turn a strong offer into a practical plan.',
    packages: [
      { name: 'Market Opportunity', price: 'From £850', text: 'Focused market research, customer insight, competitor analysis and opportunity recommendations.' },
      { name: 'Sales & Marketing Blueprint', price: 'From £1,450', text: 'A coordinated strategy with tailored customer journey, channel, lead qualification, follow-up and measurement frameworks, plus a 90-day action plan.' },
      { name: 'Business Launch Plan', price: 'From £1,100', text: 'A business plan, offer and business model, launch roadmap and a 12-month forecast built from agreed assumptions.' },
    ],
    note: 'Ongoing content starts from £450/month and social media management from £850/month; advertising and campaign delivery are scoped separately.',
    includesLabel: 'Includes:',
    includes: ['Market research', 'Sales & marketing strategy', 'Tailored frameworks', 'Business plans & startup support', 'Content creation & optimisation', 'Social media management', 'Email marketing', 'Paid advertising', 'Campaign planning, delivery & reporting'],
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
