/**
 * home-assets — bakes the homepage and About plates from the client's SF Muse
 * delivery.
 *
 * `images/` is gitignored (the originals stay local), so the renditions are
 * derived into public/assets/<page> and committed, exactly as the hero plates
 * are. Run:
 *
 *     npm run assets:home
 *     npm run assets:home -- home/work-   (only the plates under that prefix)
 *     npm run assets:about                (= -- about/)
 *     npm run assets:services             (= -- services/)
 *
 * The rules (the same as hero-lab-v2-assets.mjs, plus crops):
 *
 *   · NEVER upscale. Steps above the crop's own width are dropped, and the
 *     native width takes their place only if it beats the largest kept step
 *     by >15%.
 *   · Each plate is cropped HERE to the ratio the layout renders, around a
 *     focal point chosen by eye — not left to object-fit, which can only
 *     centre. `focus` is the point (0–1 of the source) the crop is centred
 *     on, clamped so the box stays inside the frame.
 *   · The banners are 6–9:1 strips. A band taller than a strip, filled with
 *     object-fit: cover, picks its srcset candidate by WIDTH and then blows
 *     the strip up by height — soft on every screen. So each band gets its
 *     own art-directed crops at the band's ratio: `desktop` and `mobile`,
 *     served through <picture>.
 *   · `grayscale` exists for one plate: the final copy describes Lifestyle —
 *     The Art of Slowing Down as black-and-white photography, and the copy
 *     is the spec.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// The delivery's folder names carry a double space and trailing spaces.
const DELIVERY = join(ROOT, 'images', 'SF images  new');
const PAGES = {
  home:  { src: join(DELIVERY, 'Home page '),  out: join(ROOT, 'public', 'assets', 'home') },
  about: { src: join(DELIVERY, 'About page '), out: join(ROOT, 'public', 'assets', 'about') },
  services: { src: join(DELIVERY, 'Services'), out: join(ROOT, 'public', 'assets', 'services') },
};

const QUALITY = 76;
const NATIVE_MARGIN = 1.15;

/**
 * page (default home), slug, source (relative to the page's folder), crop
 * ratio [w, h] or null (keep the frame), width steps, focus [x, y].
 */
const PLATES = [
  // 01 Explore — the studio wall (main) and the shoot in motion (inset).
  { slug: 'explore-wall',    src: 'Explore SF Muse.jpg', ratio: [2, 3], steps: [800, 1200, 1800] },
  { slug: 'explore-shoot',   src: 'Explore SF_.jpg',     ratio: [4, 5], steps: [480, 800, 1200] },

  // 02 What We Create — the four visual blocks.
  { slug: 'service-brand-presence',    src: 'services /Art_of_Brand.jpg',             ratio: [4, 5], steps: [480, 800, 1200] },
  { slug: 'service-creative-direction', src: 'services /Creative_Direction.jpg',      ratio: [4, 5], steps: [480, 800, 1200] },
  { slug: 'service-digital',           src: 'services /Digital experience.jpg',       ratio: [4, 5], steps: [480, 800, 1200] },
  { slug: 'service-growth',            src: 'services /Intelligent_Brand_Growth.jpg', ratio: [4, 5], steps: [480, 800, 1200] },

  // 04 About — the founder on the grand staircase.
  { slug: 'founder-staircase', src: 'about jpg.jpg', ratio: [2, 3], steps: [480, 800, 1200, 1800] },

  // 05 Featured Work — the portraits hang in one 2:3 frame (Hospitality and
  // Editorial are shot at it; Fashion's 9:16 is the tightest — hair at 22%,
  // heels at 87% — and only 2:3 holds both). Lifestyle hangs wide, as shot.
  { slug: 'work-beauty',      src: 'Featured work/Beauty.png',      ratio: [2, 3], steps: [800, 1200] },
  { slug: 'work-hospitality', src: 'Featured work/Hospitality.png', ratio: null,   steps: [800, 1200] },
  { slug: 'work-editorial',   src: 'Featured work/Editorial.JPG',   ratio: null,   steps: [800, 1200] },
  { slug: 'work-fashion',     src: 'Featured work/Fashion.png',     ratio: [2, 3], steps: [800, 1200], focus: [0.5, 0.5] },
  { slug: 'work-lifestyle',   src: 'Featured work/Lifestyle.png',   ratio: null,   steps: [800, 1200], grayscale: true },

  // 06 Editorial Recognition — covers keep their printed frame.
  { slug: 'press-artego-feb', src: 'Editorial features /Artego 1.jpg', ratio: null, steps: [600, 900] },
  { slug: 'press-artego-dec', src: 'Editorial features /Artego.jpg',   ratio: null, steps: [600, 900] },
  { slug: 'press-quadro-dec', src: 'Editorial features /Quadro.jpg',   ratio: null, steps: [600, 900] },

  // 07 Journal — the featured editorial and the three additional articles.
  { slug: 'journal-invisible-luxury', src: 'Articles /Invisible_Luxury.jpg',         ratio: [4, 5], steps: [600, 900, 1200], focus: [0.5, 0.6] },
  { slug: 'journal-luxury-price',     src: 'Articles /why luxury is not ...jpg',     ratio: [3, 4], steps: [600] },
  { slug: 'journal-visual-desire',    src: 'Articles /Visual_Desire.jpg',            ratio: [3, 4], steps: [600] },
  { slug: 'journal-ai-creativity',    src: 'Articles /When_AI_Meets_Creativity.jpg', ratio: [3, 4], steps: [600] },

  // Bands — art-directed desktop/mobile pairs.
  { slug: 'journal-banner',        src: 'Journal banner_home page .jpg', ratio: null,     steps: [1600, 2400, 3200] },
  { slug: 'journal-banner-mobile', src: 'Journal banner_home page .jpg', ratio: [3, 1],   steps: [800, 1200], focus: [0.55, 0.5] },
  // The figure stands ~72% across; the crop keeps the dark left half for the quote.
  { slug: 'quote',                 src: 'quote banner.jpg',              ratio: [11, 5],  steps: [1600, 2400, 3200], focus: [0.61, 0.5] },
  { slug: 'quote-mobile',          src: 'quote banner.jpg',              ratio: [3, 4],   steps: [800, 1200], focus: [0.72, 0.5] },
  { slug: 'newsletter',            src: 'Newsletters _ home page .jpg',  ratio: [12, 5],  steps: [1600, 2400], focus: [0.765, 0.5] },
  { slug: 'newsletter-mobile',     src: 'Newsletters _ home page .jpg',  ratio: [4, 3],   steps: [800, 1200], focus: [0.75, 0.5] },
  { slug: 'cta',                   src: 'CTA Banner _home page .jpg',    ratio: [9, 4],   steps: [1600, 2400], focus: [0.575, 0.5] },
  { slug: 'cta-mobile',            src: 'CTA Banner _home page .jpg',    ratio: [3, 4],   steps: [800, 1200], focus: [0.65, 0.5] },

  // ABOUT — the hero's draped alcove (a square delivery, hung 4:5 beside the
  // title), the founder in tweed and veil, and the colonnade in fur. The two
  // portraits keep their 3:4 frames as shot.
  { page: 'about', slug: 'hero',       src: 'About_Hero.jpg',    ratio: [4, 5], steps: [480, 800, 1200, 1600] },
  { page: 'about', slug: 'founder',    src: 'Founder_Story.jpg', ratio: null,   steps: [480, 800, 1200, 1600] },
  { page: 'about', slug: 'philosophy', src: 'Philosophy.jpg',    ratio: null,   steps: [480, 800, 1200, 1600] },

  // SERVICES — the studio under its spotlight: the delivery's 3:1 banner
  // cropped 16:9 for the desktop hero (the dark left third holds the words),
  // its portrait sibling for handsets.
  { page: 'services', slug: 'hero',        src: 'Banner_.jpg',     ratio: [16, 9], steps: [1600, 2400, 3200], focus: [0.6, 0.5] },
  { page: 'services', slug: 'hero-mobile', src: 'Hero page_.jpg',  ratio: [2, 3],  steps: [800, 1200] },
  // The four services, hung 4:5.
  { page: 'services', slug: 'service-storytelling',       src: 'Luxury visual story telling.jpg', ratio: [4, 5], steps: [480, 800, 1200], focus: [0.5, 0.55] },
  { page: 'services', slug: 'service-creative-direction', src: 'Creative_Direction.jpg',          ratio: [4, 5], steps: [480, 800, 1200], focus: [0.5, 0.6] },
  { page: 'services', slug: 'service-digital',            src: 'Digital experience.jpg',          ratio: [4, 5], steps: [480, 800, 1200] },
  { page: 'services', slug: 'service-growth',             src: 'Intelligent_Brand_Growth.jpg',    ratio: [4, 5], steps: [480, 800, 1200] },
  // The method, 3:2 as shot. The delivery names two plates "Discovery" and
  // none "Elevate": the research flat-lay opens the method, the director at
  // her desk — the ongoing creative direction — closes it.
  { page: 'services', slug: 'method-discovery',          src: 'Process/Discovery.jpg',          ratio: null, steps: [480, 800, 1200] },
  { page: 'services', slug: 'method-creative-direction', src: 'Process/Creative Direction .jpg', ratio: null, steps: [480, 800, 1200] },
  { page: 'services', slug: 'method-production',         src: 'Process/Production.jpg',         ratio: null, steps: [480, 800, 1200] },
  { page: 'services', slug: 'method-refinement',         src: 'Process/refinement .jpg',        ratio: null, steps: [480, 800, 1200] },
  { page: 'services', slug: 'method-delivery',           src: 'Process/Delivery.jpg',           ratio: null, steps: [480, 800, 1200] },
  { page: 'services', slug: 'method-elevate',            src: 'Process/Discovery 1 .jpg',       ratio: null, steps: [480, 800, 1200] },
];

/** The largest box of `ratio` inside w×h, centred on `focus`, kept in frame. */
function cropBox(w, h, ratio, [fx, fy] = [0.5, 0.5]) {
  if (!ratio) return { left: 0, top: 0, width: w, height: h };
  const target = ratio[0] / ratio[1];
  const width = w / h > target ? Math.round(h * target) : w;
  const height = w / h > target ? h : Math.round(w / target);
  const clamp = (v, max) => Math.min(Math.max(Math.round(v), 0), max);
  return {
    left: clamp(fx * w - width / 2, w - width),
    top: clamp(fy * h - height / 2, h - height),
    width,
    height,
  };
}

/** The native width stands in for a step only when the source was too narrow
 *  to reach one — a 7650px cover must not ship as a 2MB top step. */
function stepsFor(width, steps) {
  const out = steps.filter((s) => s < width);
  const largest = out.at(-1) ?? 0;
  if (out.length < steps.length && width > largest * NATIVE_MARGIN) out.push(width);
  return out;
}

let total = 0;
let count = 0;

// `npm run assets:home -- home/work-` re-bakes only the plates whose
// page/slug starts with that prefix.
const only = process.argv[2];

for (const plate of PLATES) {
  const page = plate.page ?? 'home';
  if (only && !`${page}/${plate.slug}`.startsWith(only)) continue;
  const { src: SRC, out: OUT } = PAGES[page];
  await mkdir(OUT, { recursive: true });
  const buf = await readFile(join(SRC, plate.src));
  // Bake EXIF orientation first so the crop is planned on the upright frame.
  const upright = await sharp(buf).rotate().toBuffer();
  const { width: w, height: h } = await sharp(upright).metadata();
  const box = cropBox(w, h, plate.ratio, plate.focus);

  const emitted = [];
  for (const step of stepsFor(box.width, plate.steps)) {
    let pipe = sharp(upright).extract(box);
    if (plate.grayscale) pipe = pipe.grayscale();
    const { data, info } = await pipe
      .resize({ width: step })
      .webp({ quality: QUALITY })
      .toBuffer({ resolveWithObject: true });
    if (info.width > box.width) throw new Error(`upscaled ${plate.slug} to ${info.width} from ${box.width}`);
    await writeFile(join(OUT, `${plate.slug}-${info.width}.webp`), data);
    emitted.push(`${info.width}×${info.height} ${Math.round(data.length / 1024)}k`);
    total += data.length;
    count += 1;
  }
  console.log(`${`${page}/${plate.slug}`.padEnd(33)} ${w}×${h} → crop ${box.width}×${box.height}  →  ${emitted.join('  ')}`);
}

console.log(`\n${count} files, ${(total / 1024 / 1024).toFixed(2)} MB → public/assets/`);
