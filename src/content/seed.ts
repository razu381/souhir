/**
 * Seed content — the home page's copy and plates.
 *
 * The copy is the client's final website copy
 * (SF_Muse_Website_Copy_Shorter_Updated.docx, HOME PAGE), verbatim: every
 * heading, sentence and label the page shows comes from that document, and
 * the design follows it. The plates are baked from the client's delivery by
 * scripts/home-assets.mjs into public/assets/home.
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
  /** An art-directed crop for handsets (≤ 767px), served through <picture>.
   *  The banners are 6–9:1 strips: a band taller than the strip, filled by
   *  object-fit, picks its candidate by WIDTH and blows the strip up by
   *  height — so each band carries its own crop at its own ratio. */
  mobile?: Plate;
};

/** [before, emphasised] — the system's mixed-Didone pattern: <h2>{before}<em>{em}</em></h2> */
export type Head = [before: string, em: string];

/** A homepage rendition set — widths as baked by scripts/home-assets.mjs. */
function plate(
  slug: string,
  widths: number[],
  [width, height]: [number, number],
  sizes: string,
  alt: string,
): Plate {
  const at = (w: number) => `/assets/home/${slug}-${w}.webp`;
  return {
    src: at(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${at(w)} ${w}w`).join(', '),
    sizes,
    width,
    height,
    alt,
  };
}

export const hero = {
  label: '(SF Muse)',
  note: '',
  titleLines: ['Beyond', 'Visibility.'],
  labelTitle: 'Into Memory.',
  labelMeta: '',   // the museum label retired from the homepage hero (Sept 2026)
  image: {
    src: '/assets/hero/statue-shadow-1920.webp',
    srcSet:
      '/assets/hero/statue-shadow-800.webp 800w, /assets/hero/statue-shadow-1200.webp 1200w, /assets/hero/statue-shadow-1600.webp 1600w, /assets/hero/statue-shadow-1920.webp 1920w',
    sizes: '100vw',
    width: 1920,
    height: 1080,
    alt: 'A woman in a beaded gown at a tall arched window at night, the shadow of a classical statue cast large on the wall beside her; half the frame is black.',
  } as Plate,
  mark: '',
  sub: 'Crafting Experiences Designed To Be Remembered',
  intro: [
    'SF Muse is a creative studio dedicated to shaping perception through storytelling, design, and experience.',
    'Working at the intersection of luxury, culture, and innovation, we create visual worlds that inspire emotion, elevate presence, and leave a lasting impression.',
  ],
  cta: { label: 'Explore SF Muse', href: '#explore' },
};

export const explore = {
  heading: 'Explore SF Muse',
  statement:
    'SF Muse is a luxury creative studio dedicated to shaping perception through visual storytelling, creative direction, and immersive brand experiences.',
  body: [
    'Working at the intersection of strategy, aesthetics, and innovation, the studio creates distinctive brand worlds for hospitality, wellness, beauty, lifestyle, and contemporary luxury brands seeking more than visibility.',
    'From cinematic imagery and editorial narratives to digital experiences and intelligent brand growth, every project is guided by a simple belief: the most memorable brands are not defined by what they show, but by what they make people feel.',
  ],
  image: plate('explore-wall', [800, 1200, 1800], [1800, 2700], '(min-width: 1025px) 30vw, 88vw',
    'A studio wall hung with black-and-white portrait prints, director’s chairs standing beside it.'),
  inset: plate('explore-shoot', [480, 800, 1200], [1200, 1500], '(min-width: 1025px) 14vw, 44vw',
    'A photographer moving through a bright white studio, the lights and reflector blurred in motion.'),
};

/** "What we create" — the services chapter's own headline and standfirst. */
export const servicesIntro = {
  label: 'What We Create',
  head: 'The Art of Brand Presence',
  text: 'SF Muse creates luxury brand experiences through the convergence of storytelling, strategy, design, and intelligent innovation. Every service is designed to elevate perception, create emotional connection, and leave a lasting impression.',
  more: 'Learn More',
};

const tile = (slug: string) =>
  plate(slug, [480, 800, 1200], [1200, 1500], '(min-width: 1025px) 22vw, (min-width: 768px) 45vw, 88vw', '');

export const services = [
  {
    num: '01',
    title: 'The Art of Brand Presence',
    slug: 'luxury-visual-storytelling',
    summary:
      'Cinematic narratives crafted to shape perception, evoke emotion, and transform brands into experiences worth remembering.',
    tile: tile('service-brand-presence'),
  },
  {
    num: '02',
    title: 'Creative Direction & Identity',
    slug: 'creative-direction',
    summary:
      'Defining the visual and emotional language of brands through thoughtful strategy, refined aesthetics, and creative vision.',
    tile: tile('service-creative-direction'),
  },
  {
    num: '03',
    title: 'Digital Experiences',
    slug: 'digital-experiences',
    summary:
      'Designing immersive digital environments that combine elegance, functionality, and meaningful user engagement.',
    tile: tile('service-digital'),
  },
  {
    num: '04',
    title: 'Intelligent Brand Growth',
    slug: 'intelligent-brand-growth',
    summary:
      'Combining creativity, data, and intelligent systems to help brands strengthen visibility, build influence, and grow with purpose.',
    tile: tile('service-growth'),
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
  head: ['Created For Those Building ', 'More Than Brands'] as Head,
  statement:
    'We collaborate with brands, founders, and destinations who understand that luxury is not created through appearance alone.',
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
  image: plate('founder-staircase', [480, 800, 1200, 1800], [1800, 2700], '(min-width: 1025px) 26vw, 78vw',
    'Souhir Fhima in a tweed jacket, seated on a carved wooden grand staircase, in black and white.'),
  refrain: ['Beyond Visibility. ', 'Into Memory.'] as Head,
  texts: [
    'SF Muse brings together creative intelligence, visual storytelling, and strategic thinking to craft brands and experiences designed to inspire, connect, and endure.',
  ],
  name: 'Souhir Fhima',
  role: 'Founder & Creative Director',
  signature: { src: '/assets/explore/signature-ink-600.webp', width: 600, height: 205, alt: '' } as Plate,
  cta: { label: 'Explore Our Philosophy', href: '/about' },
};

/** Portraits hang three-up in a 2:3 frame; a landscape hangs wide, across two. */
const workPlate = (slug: string, widths: number[], dims: [number, number], alt: string) =>
  plate(slug, widths, dims,
    dims[0] > dims[1] ? '(min-width: 768px) 60vw, 92vw' : '(min-width: 1025px) 28vw, (min-width: 768px) 45vw, 92vw',
    alt);

export const work = {
  label: 'Featured Work',
  head: 'Selected Works',
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
      title: 'Botanical Contrast',
      category: 'Beauty',
      href: null,
      desc: 'A beauty portrait exploring the contrast between sculpted hair, expressive makeup and natural foliage. Dark styling and rich green tones create a mood of confidence and understated drama.',
      credits: [
        ['Hair styling', 'Souhir Fhima'],
        ['Makeup', 'Souhir Fhima, with assistance from Jesmine Ferdause'],
        ['Photography', 'Clarence Gabriel'],
        ['Location', 'London'],
        ['Project type', 'Creative collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-beauty', [800, 1200], [1200, 1800],
        'A beauty portrait — sculpted hair and dramatic makeup framed by dark green foliage and white blossom.'),
    },
    {
      title: 'A Moment in Residence',
      category: 'Hospitality',
      href: null,
      desc: 'A styled editorial set within a hotel lounge, bringing fashion into conversation with the interior. Colour, texture and setting come together to evoke the character of a refined stay.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Wardrobe styling, hair & makeup', 'Souhir Fhima'],
        ['Photography', 'Gil D’entrecasteaux'],
        ['Location', 'Henley'],
        ['Project type', 'Creative collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-hospitality', [800, 1200], [1200, 1800],
        'A woman in a black blouse and lime skirt standing in a hotel lounge of books, velvet and lamplight.'),
    },
    {
      title: 'Strength & Expression',
      category: 'Editorial',
      href: null,
      desc: 'An editorial portrait pairing dramatic beauty styling with boxing gloves. The concept explores strength and elegance, using a close composition and dark backdrop to create an assertive visual presence.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Wardrobe styling, hair & makeup', 'Souhir Fhima'],
        ['Photography', 'John Miller'],
        ['Location', 'Swindon'],
        ['Project type', 'Creative collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-editorial', [800, 1200], [1200, 1789],
        'A close portrait in dramatic makeup, a black boxing glove raised to the face against a dark backdrop.'),
    },
    {
      title: 'After Hours',
      category: 'Fashion',
      href: null,
      desc: 'A fashion story framed by the sculptural lines of a luxury car. Statement styling, an evening setting and a confident pose create a bold, cinematic mood.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Wardrobe styling, hair & makeup', 'Souhir Fhima'],
        ['Photography', 'Humberto Mayorga'],
        ['Location', 'Oxford'],
        ['Project type', 'Creative collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-fashion', [800, 1152], [1152, 1728],
        'A woman in statement black styling and sunglasses seated in the open door of a luxury car at dusk.'),
    },
    {
      title: 'The Art of Slowing Down',
      category: 'Lifestyle',
      href: null,
      desc: 'A quiet lifestyle story centred on a moment of reading in a lounge. Black-and-white photography draws attention to light, texture and gesture, expressing luxury through ease and atmosphere.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Wardrobe styling, hair & makeup', 'Souhir Fhima'],
        ['Location', 'Henley'],
        ['Project type', 'Creative collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-lifestyle', [800, 1200], [1200, 800],
        'A woman reading on a leather sofa by the lounge window, coffee and newspapers on the table, in black and white.'),
    },
  ],
};

const cover = (slug: string, alt: string) =>
  plate(slug, [600, 900], [900, 1165], '(min-width: 1025px) 18vw, 30vw', alt);

export const press = {
  label: 'Editorial Recognition',
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
      publication: 'Artego',
      caption: 'Cover Feature — Artego, Dec 2025',
      image: cover('press-artego-dec',
        'Artego magazine cover, Portrait December, issue 1170 — a portrait in black lace and sunglasses.'),
    },
    {
      publication: 'Artego',
      caption: 'Cover Feature — Artego, Feb 2026',
      image: cover('press-artego-feb',
        'Artego magazine cover, Portrait February, issue 1249 — a black-and-white portrait on a chair at the shoreline.'),
    },
    {
      publication: 'Quadro',
      caption: 'Cover Feature — Quadro, Dec 2025',
      image: cover('press-quadro-dec',
        'Quadro magazine cover, Portrait December, issue 1395 — a portrait in a black feather stole beside a tree.'),
    },
  ],
  sharedCaption: 'Cover Features — Artego · Artego · Quadro',
};

const thumb = (slug: string, alt: string) =>
  plate(slug, [600], [600, 800], '(min-width: 1025px) 220px, 34vw', alt);

export const journal = {
  head: 'The SF Muse Journal',
  statement:
    'Perspectives on luxury, creativity, hospitality, branding, and the evolving relationship between culture, technology, and human experience.',
  banner: {
    ...plate('journal-banner', [1600, 2400, 3200], [3200, 394], '(min-width: 1440px) 1440px, 100vw',
      'An editorial desk at sunset — contact sheets, an open notebook and a camera above the city skyline.'),
    mobile: plate('journal-banner-mobile', [800, 1200], [1200, 400], '100vw', ''),
  } as Plate,
  featuredLabel: 'Featured Editorial',
  featured: {
    title: 'The Invisible Luxury',
    desc: 'What truly makes an experience unforgettable? Exploring the intangible elements that transform products, spaces, and brands into lasting memories.',
    href: null as string | null,
    read: 'Read Article',
    image: plate('journal-invisible-luxury', [600, 900, 1200], [1200, 1500], '(min-width: 1025px) 34vw, 88vw',
      'A woman in a long dark gown at open doors in a sunlit, pale-panelled interior.'),
  },
  moreLabel: 'Additional Articles',
  rows: [
    {
      title: 'Why Luxury Is No Longer About Price',
      desc: 'Experience. Emotion. Meaning. The new language of luxury.',
      href: null as string | null,
      image: thumb('journal-luxury-price', 'A woman in a tweed jacket and beret taking tea at a garden table.'),
    },
    {
      title: 'The Psychology of Visual Desire',
      desc: 'How imagery shapes perception, influences behaviour, and creates emotional resonance.',
      href: null as string | null,
      image: thumb('journal-visual-desire', 'A blurred figure in black framed between studio clamps against a pale wall.'),
    },
    {
      title: 'When AI Meets Creativity',
      desc: 'Exploring the intersection of human imagination and intelligent technology.',
      href: null as string | null,
      image: thumb('journal-ai-creativity', 'A woman in profile wearing fractured, glass-like digital glasses and a sequinned top.'),
    },
  ],
  more: { label: 'Explore The Journal', href: '/journal' },
};

export const interlude = {
  image: {
    ...plate('quote', [1600, 2400, 3200], [3200, 1455], '100vw',
      'A woman in a white gown standing alone at the end of a long marble colonnade.'),
    mobile: plate('quote-mobile', [800, 1200], [1200, 1600], '100vw',
      'A woman in a white gown standing alone at the end of a long marble colonnade.'),
  } as Plate,
  quote: ['People rarely remember what they saw.', 'They remember how they felt.'] as Head,
  cite: 'Souhir Fhima',
  role: 'Founder, SF Muse',
};

export const news = {
  head: ['Curated Perspectives. ', 'Delivered Occasionally.'] as Head,
  text: 'Receive thoughtful insights exploring luxury, creativity, hospitality, branding, innovation, and the future of experience.',
  image: {
    ...plate('newsletter', [1600, 2400], [2400, 1000], '(min-width: 1440px) 1440px, 100vw',
      'A dark library lounge — a leather armchair, a reading lamp and softly lit bookshelves.'),
    mobile: plate('newsletter-mobile', [800, 1200], [1200, 900], '100vw',
      'A dark library lounge — a leather armchair, a reading lamp and softly lit bookshelves.'),
  } as Plate,
};

export const cta = {
  head: ['Let’s Create Something ', 'Worth Remembering.'] as Head,
  text: 'Whether developing a hospitality destination, a wellness concept, an editorial campaign, or a refined digital experience, every memorable story begins with a clear vision.',
  cta: { label: 'Start a Project', href: '/contact' },
  image: {
    ...plate('cta', [1600, 2324], [2324, 1033], '100vw',
      'A lounge at night above the city lights — an armchair, a low table with an open book, a brass lamp.'),
    mobile: plate('cta-mobile', [775], [775, 1033], '100vw',
      'A lounge at night above the city lights — an armchair, a low table with an open book, a brass lamp.'),
  } as Plate,
};

export const settings = {
  tagline: '',
  contactEmail: 'contact@souhirfhima.com',
};
