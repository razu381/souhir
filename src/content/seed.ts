/**
 * Seed content — the Nocturne home page's copy and plates, extracted verbatim
 * from src/hero-nocturne.html @ 7a7bced (plan §1.1).
 *
 * The site renders Sanity content when the documents exist and this when they
 * don't — so a fresh clone renders the full page before a single document is
 * entered, and the client's first publish takes over (plan §3, D8).
 */

export type Plate = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
  alt: string;
};

/** [before, emphasised] — the system's mixed-Didone pattern: <h2>{before}<em>{em}</em></h2> */
export type Head = [before: string, em: string];

export const hero = {
  label: '(Dar SF)',
  note: 'Luxury Visual Presence',
  titleLines: ['Beyond', 'Visibility.'],
  labelTitle: '— Into Memory.',
  labelMeta: 'Fig. 01 — Grand Staircase, Paris',
  image: {
    src: '/assets/hero/staircase-warm-1200.webp',
    srcSet:
      '/assets/hero/staircase-warm-800.webp 800w, /assets/hero/staircase-warm-1200.webp 1200w, /assets/hero/staircase-warm-1800.webp 1800w',
    sizes: '(min-width: 1025px) 32vw, 88vw',
    width: 1200,
    height: 1800,
    alt: 'A woman in a tweed suit seated on the grand staircase of a Parisian hôtel particulier, in warm-toned black and white.',
  } as Plate,
  mark: 'Est. MMXXVI',
  sub: 'Crafting experiences designed to be remembered',
};

export const explore = {
  statement:
    'Dar SF is a creative studio dedicated to shaping perception through storytelling, design, and experience. Working at the intersection of luxury, culture, and innovation, we create visual worlds that inspire emotion, elevate presence, and leave a lasting impression. Because the most memorable brands are not built through visibility alone.',
  felt: 'They are remembered through feeling.',
  image: {
    src: '/assets/explore/spa-1200.webp',
    srcSet:
      '/assets/explore/spa-800.webp 800w, /assets/explore/spa-1200.webp 1200w, /assets/explore/spa-1800.webp 1800w',
    sizes: '(min-width: 1025px) 40vw, 100vw',
    width: 1200,
    height: 1800,
    alt: 'A woman receiving a candlelit spa treatment, warm amber light against deep shadow.',
  } as Plate,
  caption: 'Fig. 02 — Candlelight, Paris',
  cta: { label: 'Explore Dar SF', href: '/about' },
};

export const services = [
  {
    num: '01',
    title: 'The Art of Brand Presence',
    slug: 'art-of-brand-presence',
    summary:
      'Cinematic narratives crafted to shape perception, evoke emotion, and transform brands into experiences worth remembering.',
    tile: { src: '/assets/services/tile-moodboard-480.webp', width: 480, height: 600, alt: '' } as Plate,
  },
  {
    num: '02',
    title: 'Creative Direction & Identity',
    slug: 'creative-direction-identity',
    summary:
      'Defining the visual and emotional language of brands through thoughtful strategy, refined aesthetics, and creative vision.',
    tile: { src: '/assets/services/tile-flatlay-480.webp', width: 480, height: 600, alt: '' } as Plate,
  },
  {
    num: '03',
    title: 'Digital Experiences',
    slug: 'digital-experiences',
    summary:
      'Designing immersive digital environments that combine elegance, functionality, and meaningful user engagement.',
    tile: { src: '/assets/services/tile-workspace-480.webp', width: 480, height: 600, alt: '' } as Plate,
  },
  {
    num: '04',
    title: 'Intelligent Brand Growth',
    slug: 'intelligent-brand-growth',
    summary:
      'Combining creativity, data, and intelligent systems to help brands strengthen visibility, build influence, and grow with purpose.',
    tile: { src: '/assets/services/tile-notebook-480.webp', width: 480, height: 600, alt: '' } as Plate,
  },
];

/** The service page's process sequence (DESIGN-DIRECTION §07). */
export const serviceProcess = {
  heading: 'The process',
  intro:
    'Six steps, in order, on every engagement — the sequence is the discipline.',
  items: [
    'Discovery — we begin with understanding',
    'Creative Direction — details create distinction',
    'Production — creativity with purpose',
    'Refinement — collaboration is part of the craft',
    'Delivery — technology should feel invisible',
    'Elevate — we build for longevity',
  ],
};

export const clientele = {
  head: ['Created For Those Building ', 'More Than Brands.'] as Head,
  statement:
    'We collaborate with brands, founders, and destinations who understand that luxury is not created through appearance alone. It is shaped through atmosphere, meaning, and the experiences people carry with them long after the moment has passed.',
  rows: [
    ['Boutique Hotels', 'Luxury hotels, boutique properties, retreats, and destination experiences designed to create memorable guest journeys.'],
    ['Luxury Hospitality Concepts', 'Restaurants, private clubs, hospitality groups, and experience-led venues shaping modern luxury culture.'],
    ['Wellness & Spa Brands', 'Wellness destinations, spas, retreats, and wellbeing concepts focused on transformation, balance, and elevated experiences.'],
    ['Beauty & Aesthetic Clinics', 'Aesthetic clinics, cosmetic practitioners, skincare brands, and beauty businesses seeking premium positioning.'],
    ['Luxury Lifestyle Brands', 'Fashion, jewellery, interiors, luxury products, and lifestyle brands built around aspiration, craftsmanship, and identity.'],
    ['Editorial & Fashion Campaigns', 'Editorial productions, fashion brands, creative collaborations, and campaigns where storytelling and visual impact matter.'],
    ['Elevated Travel Experiences', 'Luxury travel concepts, curated journeys, private experiences, and destination-led brands.'],
  ] as [label: string, description: string][],
};

export const founder = {
  image: {
    src: '/assets/hero/hands-pockets-800.webp',
    srcSet:
      '/assets/hero/hands-pockets-480.webp 480w, /assets/hero/hands-pockets-800.webp 800w, /assets/hero/hands-pockets-1200.webp 1200w, /assets/explore/hands-pockets-1800.webp 1800w',
    sizes: '(min-width: 1025px) 40vw, 100vw',
    width: 1200,
    height: 1800,
    alt: 'A woman in a black tailored suit, hands in pockets, standing in a Parisian street at dusk.',
  } as Plate,
  caption: 'Fig. 03 — The Founder, at Dusk',
  refrain: ['Beyond Visibility. ', 'Into Memory.'] as Head,
  texts: [
    'They exist in atmosphere, emotion, perception, and the experiences people carry with them long after the moment has passed.',
    'Dar SF brings together creative intelligence, visual storytelling, and strategic thinking to craft brands and experiences designed to inspire, connect, and endure.',
  ],
  felt: 'The most powerful expressions of luxury are often invisible.',
  name: 'Souhir Fhima',
  role: 'Founder & Creative Director',
  signature: { src: '/assets/explore/signature-ink-600.webp', width: 600, height: 205, alt: '' } as Plate,
  cta: { label: 'Explore Our Philosophy', href: '/about' },
};

export const work = {
  statement:
    'A curated collection of visual stories and brand experiences shaped through atmosphere, perception, and creative intelligence.',
  filters: [
    { slug: 'all', label: 'All' },
    { slug: 'hospitality', label: 'Hospitality' },
    { slug: 'beauty', label: 'Beauty' },
    { slug: 'wellness', label: 'Wellness' },
    { slug: 'editorial', label: 'Editorial' },
    { slug: 'lifestyle', label: 'Lifestyle' },
  ],
  items: [
    {
      num: '05.1',
      title: 'The Ocean Suite',
      category: 'hospitality',
      ratio: 'std',
      href: null,
      image: {
        src: '/assets/work/suite-800.webp',
        srcSet: '/assets/work/suite-800.webp 800w, /assets/work/suite-1200.webp 1200w',
        sizes: '(min-width: 1025px) 28vw, 100vw',
        width: 800,
        height: 600,
        alt: 'A luxury hotel suite at sunset with an ocean view, warm golden light across the room.',
      } as Plate,
    },
    {
      num: '05.2',
      title: 'Velocity Noir',
      category: 'editorial',
      ratio: 'tall',
      href: '/portfolio/velocity-noir',
      image: {
        src: '/assets/work/velocity-800.webp',
        srcSet: '/assets/work/velocity-800.webp 800w, /assets/work/velocity-1200.webp 1200w',
        sizes: '(min-width: 1025px) 28vw, 100vw',
        width: 800,
        height: 1000,
        alt: 'A woman beside a vintage sports car on a Parisian street at night, in warm-toned black and white.',
      } as Plate,
    },
    {
      num: '05.3',
      title: 'Candlelit Ritual',
      category: 'wellness',
      ratio: 'square',
      href: null,
      image: {
        src: '/assets/work/ritual-800.webp',
        srcSet: '/assets/work/ritual-800.webp 800w, /assets/work/ritual-1200.webp 1200w',
        sizes: '(min-width: 1025px) 28vw, 100vw',
        width: 800,
        height: 800,
        alt: 'A candlelit spa treatment, warm amber light against deep shadow.',
      } as Plate,
    },
    {
      num: '05.4',
      title: 'Marble & Rose',
      category: 'beauty',
      ratio: 'std',
      href: null,
      image: {
        src: '/assets/work/marble-800.webp',
        srcSet: '/assets/work/marble-800.webp 800w, /assets/work/marble-1200.webp 1200w',
        sizes: '(min-width: 1025px) 28vw, 100vw',
        width: 800,
        height: 600,
        alt: 'Luxury beauty products arranged on a marble surface in warm light.',
      } as Plate,
    },
    {
      num: '05.5',
      title: 'Parisian Reverie',
      category: 'editorial',
      ratio: 'tall',
      href: null,
      image: {
        src: '/assets/work/reverie-800.webp',
        srcSet: '/assets/work/reverie-800.webp 800w, /assets/work/reverie-1200.webp 1200w',
        sizes: '(min-width: 1025px) 28vw, 100vw',
        width: 800,
        height: 1000,
        alt: 'A woman in a black tailored suit on a rain-wet Parisian street at night.',
      } as Plate,
    },
    {
      num: '05.6',
      title: 'Champagne Altitude',
      category: 'lifestyle',
      ratio: 'square',
      href: null,
      image: {
        src: '/assets/work/altitude-800.webp',
        srcSet: '/assets/work/altitude-800.webp 800w, /assets/work/altitude-1200.webp 1200w',
        sizes: '(min-width: 1025px) 28vw, 100vw',
        width: 800,
        height: 800,
        alt: 'Champagne and private-jet interiors at sunset, warm golden light.',
      } as Plate,
    },
  ],
};

export const press = {
  head: ['Where Vision ', 'Earns Recognition.'] as Head,
  statement:
    'Featured across international editorial publications celebrating visual storytelling, creativity, and contemporary culture.',
  stats: [
    ['15+', 'International Publications'],
    ['100+', 'Published Editorial Images'],
    ['8+', 'Original Creative Collaborations'],
  ] as [figure: string, label: string][],
  covers: [
    {
      caption: 'Cover Feature — Artego, Dec 2025',
      image: {
        src: '/assets/press/cover-artego-dec-600.webp',
        srcSet: '/assets/press/cover-artego-dec-600.webp 600w, /assets/press/cover-artego-dec-900.webp 900w',
        sizes: '(min-width: 1025px) 24vw, 30vw',
        width: 600,
        height: 776,
        alt: 'Artego Magazine cover — portrait editorial.',
      } as Plate,
    },
    {
      caption: 'Cover Feature — Artego, Feb 2026',
      image: {
        src: '/assets/press/cover-artego-feb-600.webp',
        srcSet: '/assets/press/cover-artego-feb-600.webp 600w, /assets/press/cover-artego-feb-900.webp 900w',
        sizes: '(min-width: 1025px) 24vw, 30vw',
        width: 600,
        height: 776,
        alt: 'Artego Magazine cover — beach editorial.',
      } as Plate,
    },
    {
      caption: 'Cover Feature — Quadro, Dec 2025',
      image: {
        src: '/assets/press/cover-quadro-dec-600.webp',
        srcSet: '/assets/press/cover-quadro-dec-600.webp 600w, /assets/press/cover-quadro-dec-900.webp 900w',
        sizes: '(min-width: 1025px) 24vw, 30vw',
        width: 600,
        height: 776,
        alt: 'Quadro Magazine cover — portrait editorial.',
      } as Plate,
    },
  ],
  sharedCaption: 'Cover Features — Artego · Artego · Quadro',
};

export const journal = {
  head: 'The Dar SF Journal',
  statement:
    'Perspectives on luxury, creativity, hospitality, branding, and the evolving relationship between culture, technology, and human experience.',
  sub: 'A curated collection of essays, observations, and creative reflections exploring the invisible elements that shape perception, emotion, and lasting brand value.',
  rows: [
    {
      num: '07.1',
      category: 'Luxury & Culture',
      title: 'The Invisible Luxury',
      desc: 'What truly makes an experience unforgettable? Exploring the intangible elements that transform products, spaces, and brands into lasting memories.',
      href: null,
      image: {
        src: '/assets/journal/desk-800.webp',
        sizes: '(min-width: 1025px) 220px, 34vw',
        width: 600,
        height: 800,
        alt: 'A creative director writing in a notebook at a lamplit desk, warm amber light against deep shadow.',
      } as Plate,
    },
    {
      num: '07.2',
      category: 'Luxury & Culture',
      title: 'Why Luxury Is No Longer About Price',
      desc: 'Experience. Emotion. Meaning. The new language of luxury.',
      href: null,
      image: {
        src: '/assets/journal/price-600.webp',
        sizes: '(min-width: 1025px) 220px, 34vw',
        width: 600,
        height: 800,
        alt: 'A luxury lifestyle flatlay of fashion and beauty objects.',
      } as Plate,
    },
    {
      num: '07.3',
      category: 'Visual Storytelling',
      title: 'The Psychology of Visual Desire',
      desc: 'How imagery shapes perception, influences behaviour, and creates emotional resonance.',
      href: null,
      image: {
        src: '/assets/journal/desire-600.webp',
        sizes: '(min-width: 1025px) 220px, 34vw',
        width: 600,
        height: 800,
        alt: 'A woman in a veil and hat with earrings, in warm-toned black and white.',
      } as Plate,
    },
    {
      num: '07.4',
      category: 'Creative Intelligence',
      title: 'When AI Meets Creativity',
      desc: 'Exploring the intersection of human imagination and intelligent technology.',
      href: null,
      image: {
        src: '/assets/journal/ai-600.webp',
        sizes: '(min-width: 1025px) 220px, 34vw',
        width: 600,
        height: 800,
        alt: 'A creative workspace with a laptop and camera, evening light.',
      } as Plate,
    },
  ],
};

export const interlude = {
  image: {
    src: '/assets/banners/quote-1600.webp',
    srcSet: '/assets/banners/quote-1600.webp 1600w, /assets/banners/quote-2400.webp 2400w',
    sizes: '100vw',
    width: 2400,
    height: 390,
    alt: 'A silhouetted figure walking toward window light at the end of a hotel corridor.',
  } as Plate,
  quote: ['People rarely remember what they saw.', 'They remember how they felt.'] as Head,
  cite: 'Souhir Fhima — Founder, Dar SF',
};

export const news = {
  head: ['Curated Perspectives. ', 'Delivered Occasionally.'] as Head,
  text: 'Receive thoughtful insights exploring luxury, creativity, hospitality, branding, innovation, and the future of experience.',
};

export const cta = {
  head: ['Let’s Create Something ', 'Worth Remembering.'] as Head,
  text: 'Whether developing a hospitality destination, a wellness concept, an editorial campaign, or a refined digital experience, every memorable story begins with a clear vision.',
  cta: { label: 'Start a Project', href: '/contact' },
};

export const settings = {
  tagline: 'Luxury Visual Presence — Paris',
  contactEmail: 'hello@darsf.com',
};
