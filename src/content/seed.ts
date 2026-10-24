/**
 * Seed content — the home page's copy and plates.
 *
 * The copy is the client's final website copy
 * (SF_Muse_Final_Content_For - v3.docx, 01 HOME, 13 Oct 2026), verbatim: every
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
  label: 'SF Muse | Luxury Creative & Marketing Studio',
  note: '',
  titleLines: ['Beyond', 'Visibility.'],
  labelTitle: 'Into Memory.',
  labelMeta: '',   // the museum label retired from the homepage hero (Sept 2026)
  // The delivery's own hero file, midtones lifted in the bake (round 2) so
  // her figure reads without a dimmer laid over it.
  image: plate('hero', [800, 1200, 1600, 1920], [1920, 1080], '100vw',
    'A woman in a beaded gown at a tall arched window at night, the shadow of a classical statue cast large on the wall beside her; half the frame is black.'),
  mark: '',
  sub: 'Expressive in style. Clear in strategy. Made to be remembered.',
  intro: [
    'Creative direction, visual storytelling, digital experiences and marketing strategy for luxury and premium brands.',
  ],
  cta: { label: 'Start a Project', href: '/contact' },
  cta2: { label: 'Explore Our Work', href: '/portfolio' },
};

export const explore = {
  label: 'Explore SF Muse',
  heading: 'Where Creativity Becomes Presence.',
  statement:
    'Some brands are seen. Others are felt. SF Muse works in the space between the two — where creative expression becomes a recognisable identity, where digital experiences carry the story forward and where marketing with a clear purpose helps that story reach the right people.',
  body: [
    'Founder-led in vision and collaborative in execution, our work joins artistic judgement to clear objectives. From first concept to final campaign, every detail should feel coherent and intentional.',
  ],
  cta: { label: 'Discover Our Approach', href: '/about' },
  // ONE photograph (round 2): the client's two Explore photos were
  // alternatives. The studio wall, hung 4:5.
  image: plate('explore-studio', [800, 1200, 1600], [1600, 2000], '(min-width: 1025px) 40vw, 92vw',
    'A studio wall hung with black-and-white portrait prints, director’s chairs standing beside it.'),
  inset: plate('explore-shoot', [480, 800, 1200], [1200, 1500], '(min-width: 1025px) 14vw, 44vw',
    'A photographer moving through a bright white studio, the lights and reflector blurred in motion.'),
};

/** "What we create" — the services chapter. Since the Services update
 *  (Oct 2026) the doc gives it no headline or standfirst of its own: the
 *  label names the section and the four cards follow. */
export const servicesIntro = {
  label: 'What We Create',
  more: '',   // v3 drops "Learn More": the whole card is the way in
};

/** The service cards, 3:4 (round 2): the photograph fills the card and the
 *  words ride its foot. */
const tile = (slug: string) =>
  plate(`service-card-${slug}`, [480, 800, 1200], [1200, 1600], '(min-width: 1200px) 24vw, (min-width: 768px) 46vw, 92vw', '');

export const services = [
  {
    num: '01',
    title: 'Visual Storytelling',
    slug: 'luxury-visual-storytelling',
    summary:
      'Campaign concepts, editorial photography, film and content that reveal a brand’s character and leave images people remember.',
    tile: tile('brand-presence'),
  },
  {
    num: '02',
    title: 'Creative Direction & Identity',
    slug: 'creative-direction',
    summary:
      'Brand narrative, positioning and visual systems that give every expression a distinctive, consistent point of view.',
    tile: tile('creative-direction'),
  },
  {
    num: '03',
    title: 'Digital Experiences',
    slug: 'digital-experiences',
    summary:
      'Websites, e-commerce and digital journeys that turn a brand’s world into elegant, intuitive experiences for real customers.',
    tile: tile('digital'),
  },
  {
    num: '04',
    title: 'Intelligent Brand Growth',
    slug: 'intelligent-brand-growth',
    summary:
      'Marketing strategy, social content, search and paid campaigns that link a strong creative presence to the audiences and goals that matter.',
    tile: tile('growth'),
  },
];

export const clientele = {
  head: ['Created For Those Building ', 'More Than Brands'] as Head,
  statement:
    'We collaborate with brands, founders and destinations who know that luxury is defined less by appearance than by the emotion it evokes and the impression it leaves behind.',
  // v3: exactly six. (The doc also asks for a photo per card; the cards
  // keep their line icons until the client supplies six — DECISION-LOG.)
  rows: [
    ['Fashion & Luxury Brands', 'For fashion houses, emerging designers and luxury labels expressing their individuality through strong visual identities, compelling campaigns and editorial storytelling that turns style into desire.'],
    ['Beauty & Aesthetic Clinics', 'For beauty, skincare and aesthetic brands where artistry, expression and confidence meet. We create refined identities, striking imagery and digital experiences that honour individuality and build trust.'],
    ['Boutique Hotels & Hospitality', 'For boutique hotels, intimate restaurants and hospitality destinations where every detail shapes the experience. We capture the atmosphere, character and quiet elegance that make a beautiful space one guests remember.'],
    ['Wellness & Spa', 'For wellness retreats, spas and restorative spaces devoted to balance, beauty and wellbeing. Through storytelling and sensory imagery, we convey tranquillity, authenticity and the feeling of being renewed.'],
    ['Automotive & Luxury Lifestyle', 'For automotive and premium lifestyle brands where craftsmanship, design and aspiration come together. We create bold visual narratives that express character, stir emotion and celebrate the relationship between elegance, movement and individuality.'],
    ['Luxury Travel & Experiences', 'For luxury travel brands, curated journeys and exceptional experiences inspired by discovery and a sense of place. Through vivid imagery and refined storytelling, we bring destinations and meaningful moments to life, with the promise of something unforgettable.'],
  ] as [label: string, description: string][],
  /** One line icon per row, in row order (round 2 — see ClientIcon.tsx). The
   *  v3 worlds keep the old pairings: fashion the camera, luxury lifestyle
   *  the diamond. */
  icons: ['camera', 'drop', 'key', 'lotus', 'diamond', 'compass'] as const,
  /** "Different Worlds. Shared Ambitions." — beside the heading and
   *  statement (the first row's third cell); the six categories follow. */
  worlds: {
    title: 'Different Worlds. Shared Ambitions.',
    text: [
      'From the artistry of fashion and beauty to the atmosphere of remarkable places and experiences, our work champions individuality, careful design and the power of story.',
      'Across all six, we bring creative vision and strategy together to shape identities that resonate, experiences that inspire and stories that last.',
    ],
  },
};

export const founder = {
  image: plate('founder-staircase', [480, 800, 1200, 1800], [1800, 2700], '(min-width: 1025px) 26vw, 78vw',
    'Souhir Fhima in a tweed jacket, seated on a carved wooden grand staircase, in black and white.'),
  refrain: ['The Perspective Behind SF Muse', ''] as Head,
  texts: [
    'Founded by Souhir Fhima, SF Muse brings together an eye for visual expression and a grounding in marketing and business strategy. The studio is built on one conviction: creative work should stir emotion, communicate a clear identity and serve a real purpose.',
  ],
  name: 'Souhir Fhima',
  role: 'Founder & Creative Director',
  // Her supplied signature, used as is (a transparent PNG, champagne
  // strokes; the bake only crops it) — round 2 replaced the prototype's
  // redrawn ink.
  signature: plate('signature', [640, 1010], [1010, 395], '(min-width: 1025px) 340px, 70vw', ''),
  cta: { label: 'Discover Our Story', href: '/about' },
};

/** Portraits hang three-up in a 2:3 frame; a landscape hangs wide, across two. */
const workPlate = (slug: string, widths: number[], dims: [number, number], alt: string) =>
  plate(slug, widths, dims,
    dims[0] > dims[1] ? '(min-width: 768px) 60vw, 92vw' : '(min-width: 1025px) 28vw, (min-width: 768px) 45vw, 92vw',
    alt);

/** "The Art of Brand Presence" (v3) — six studies, one per world of Who We
 *  Work With, from the delivery's Featured work folder. The copy gives no
 *  filters. Each caption keeps the round-2 anatomy: "World — Title", the
 *  paragraph (the doc's line, then its description), the credits. */
export const work = {
  label: 'Featured Work',
  head: 'The Art of Brand Presence',
  statement:
    'Six worlds. Six expressions of luxury. A curated look at visual storytelling, atmosphere and creative identity across the industries that inspire us. Creative studies and editorial perspectives, each exploring the character of its own world.',
  filters: [] as { slug: string; label: string }[],
  items: [
    {
      title: 'The Language of Desire',
      category: 'Fashion & Luxury Brands',
      href: null,
      desc: 'Style is more than what we wear. It is the impression we leave behind. A study in attitude, styling and visual identity. Through confident expression, careful detail and a striking sense of presence, fashion stops being an image and becomes a statement.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Wardrobe styling & hair', 'Souhir Fhima'],
        ['Makeup', 'Jesmin Ferdause'],
        ['Photography', 'Clarence Gabriel'],
        ['Location', 'London'],
        ['Project type', 'Creative Collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-fashion', [800, 1200], [1200, 1800],
        'A woman in round sunglasses and a black leather top, leaning out from a dark beam against a red riveted wall.'),
    },
    {
      title: 'Beauty in Detail',
      category: 'Beauty & Aesthetic Clinics',
      href: null,
      desc: 'Beauty begins with the details — a glance, a texture, the delicate interplay of light and expression. An exploration of beauty as expression — where artistry, precision and individuality come together to inspire confidence. A visual study of the details that shape not only how we look, but how we feel and see ourselves.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Makeup & hair', 'Jesmin Ferdause'],
        ['Photography', 'Clarence Gabriel'],
        ['Location', 'London'],
        ['Project type', 'Creative Collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-beauty', [800, 1017], [1017, 1526],
        'A close beauty portrait — a jewelled eye, side-swept blonde hair and a deep red lip.'),
    },
    {
      title: 'The Art of Hospitality',
      category: 'Boutique Hotels & Hospitality',
      href: null,
      desc: 'Some places stay with us long after the evening ends. An intimate portrait of hospitality at its most refined. Warm light, thoughtful interiors and the quiet rituals of dining create atmosphere, belonging and a sense of place that lingers.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Wardrobe styling, hair & makeup', 'Souhir Fhima'],
        ['Location', 'Bath'],
        ['Project type', 'Personal Editorial'],
      ] as [role: string, name: string][],
      image: workPlate('work-hospitality', [800, 1200], [1200, 1800],
        'A woman in a cream tweed jacket at a candlelit restaurant table, her chin resting on her hand.'),
    },
    {
      title: 'The Art of Stillness',
      category: 'Wellness & Spa',
      href: null,
      desc: 'Stillness has its own visual language. A quiet study of water, light and restorative space. Reflections, natural textures and gentle warmth show how an environment can communicate calm, comfort and the promise of escape.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Photography', 'Souhir Fhima'],
        ['Location', 'Scotland'],
        ['Project type', 'Editorial Study'],
      ] as [role: string, name: string][],
      image: workPlate('work-wellness', [800, 1200], [1200, 1800],
        'An indoor pool under a timber-beamed roof, warmly lit and empty, its water reflecting the windows.'),
    },
    {
      title: 'After Hours',
      category: 'Automotive & Luxury Lifestyle',
      href: null,
      desc: 'An encounter between sculptural design, confident style and the evening light. A cinematic exploration of automotive elegance and modern luxury. Sculptural lines, statement styling and the last light of day set a mood where design meets desire.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Wardrobe styling, hair & makeup', 'Souhir Fhima'],
        ['Photography', 'Humberto Mayorga'],
        ['Location', 'Oxford'],
        ['Project type', 'Creative Collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-automotive', [800, 1125], [1125, 1688],
        'A woman in sunglasses seated in the raised door of a sports car at dusk.'),
    },
    {
      title: 'The Freedom to Escape',
      category: 'Luxury Travel & Experiences',
      href: null,
      desc: 'Journeys are remembered for how they made us feel. A waterside editorial inspired by elegant escapes and the freedom to explore. A study of movement and personal style, and of the experiences that stay with us long after the journey ends.',
      credits: [
        ['Concept & creative direction', 'Souhir Fhima'],
        ['Wardrobe styling, hair & makeup', 'Souhir Fhima'],
        ['Photography', 'Gil D’entrecasteaux'],
        ['Location', 'Henley-on-Thames'],
        ['Project type', 'Creative Collaboration'],
      ] as [role: string, name: string][],
      image: workPlate('work-travel', [800, 1200], [1200, 1800],
        'A woman in a black blazer and sunglasses on a riverside jetty beside moored boats.'),
    },
  ],
};

const cover = (slug: string, alt: string) =>
  plate(slug, [600, 900], [900, 1165], '(min-width: 1025px) 28vw, (min-width: 768px) 30vw, 72vw', alt);

export const press = {
  label: 'Editorial Recognition',
  head: ['Where Vision ', 'Earns Recognition.'] as Head,
  statement:
    'Selected international editorial recognition.',
  stats: [
    ['15+', 'International Publications'],
    ['100+', 'Published Editorial Images'],
    ['8+', 'Original Creative Collaborations'],
  ] as [figure: string, label: string][],
  covers: [
    {
      publication: 'Artego',
      caption: 'Cover Feature — Artego, Dec 2025',
      issue: 'Portrait — December 2025',
      image: cover('press-artego-dec',
        'Artego magazine cover, Portrait December, issue 1170 — a portrait in black lace and sunglasses.'),
    },
    {
      publication: 'Artego',
      caption: 'Cover Feature — Artego, Feb 2026',
      issue: 'Portrait — February 2026',
      image: cover('press-artego-feb',
        'Artego magazine cover, Portrait February, issue 1249 — a black-and-white portrait on a chair at the shoreline.'),
    },
    {
      publication: 'Quadro',
      caption: 'Cover Feature — Quadro, Dec 2025',
      issue: 'Portrait — December 2025',
      image: cover('press-quadro-dec',
        'Quadro magazine cover, Portrait December, issue 1395 — a portrait in a black feather stole beside a tree.'),
    },
  ],
  sharedCaption: 'Cover Features — Artego · Artego · Quadro',
};

/** The journal's article images, 4:5, from the Journal delivery — the copy:
 *  "use the same images … for the journal page" (round 2). */
const thumb = (slug: string, alt: string) =>
  plate(`journal-card-${slug}`, [600, 900], [900, 1125], '(min-width: 1025px) 30vw, (min-width: 768px) 46vw, 92vw', alt);

export const journal = {
  head: 'Perspectives on Creativity, Culture & Luxury',
  statement:
    'Ideas and observations on how visual storytelling, human emotion and intelligent technology are changing the meaning of luxury.',
  banner: {
    ...plate('journal-banner', [1600, 2400, 3200], [3200, 394], '(min-width: 1440px) 1440px, 100vw',
      'An editorial desk at sunset — contact sheets, an open notebook and a camera above the city skyline.'),
    mobile: plate('journal-banner-mobile', [800, 1200], [1200, 400], '100vw', ''),
  } as Plate,
  featuredLabel: 'Featured Article',
  featured: {
    title: 'The Invisible Luxury',
    desc: 'What makes an experience unforgettable? An exploration of the intangible elements that turn products, spaces and brands into lasting memories.',
    href: null as string | null,
    read: 'Read Article',
    image: plate('journal-card-invisible-luxury', [600, 900, 1200, 1600], [1600, 2000], '(min-width: 1025px) 44vw, 92vw',
      'A woman in a long dark gown at open doors in a sunlit, pale-panelled interior.'),
  },
  moreLabel: 'Additional Articles',
  rows: [
    {
      title: 'Why Luxury Is No Longer About Price',
      desc: 'Experience. Emotion. Meaning. The new language of luxury.',
      href: null as string | null,
      image: thumb('luxury-culture', 'A long gallery corridor of marble floors, sculpture and gilt-framed paintings.'),
    },
    {
      title: 'The Psychology of Visual Desire',
      desc: 'How imagery shapes perception, influences behaviour, and creates emotional resonance.',
      href: null as string | null,
      image: thumb('visual-desire', 'A blurred figure in black framed between studio clamps against a pale wall.'),
    },
    {
      title: 'When AI Meets Creativity',
      desc: 'Exploring the intersection of human imagination and intelligent technology.',
      href: null as string | null,
      image: thumb('creative-intelligence', 'A woman in profile wearing fractured, glass-like digital glasses and a sequinned top.'),
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
  role: '',   // v3: "— Souhir Fhima", no role line
};

export const news = {
  head: ['Curated Perspectives. ', 'Delivered Occasionally.'] as Head,
  text: 'A few reflections on luxury, creativity and brand presence. Subscribe for Journal updates.',
  image: {
    ...plate('newsletter', [1600, 2400], [2400, 1000], '(min-width: 1440px) 1440px, 100vw',
      'A dark library lounge — a leather armchair, a reading lamp and softly lit bookshelves.'),
    mobile: plate('newsletter-mobile', [800, 1200], [1200, 900], '100vw',
      'A dark library lounge — a leather armchair, a reading lamp and softly lit bookshelves.'),
  } as Plate,
};

export const cta = {
  head: ['Let’s Create Something ', 'Worth Remembering.'] as Head,
  text: 'Whether you are launching an identity, commissioning a campaign, developing a website or seeking a more coherent marketing presence, we would love to hear what you are building.',
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
