/**
 * hero-lab-v2-assets — bakes the /hero-lab-v2 review plates.
 *
 * `sorted/` is gitignored (the originals stay local), so nothing under it can
 * reach the browser: the renditions are derived into public/assets and
 * committed, exactly as public/assets/hero/*.webp already is. Run:
 *
 *     npm run assets:hero-lab-v2
 *
 * The rules, recorded here rather than performed once by hand:
 *
 *   · NEVER upscale. Steps below the source width only — a soft hero is not a
 *     hero you can judge, and two of these sources are 843px wide.
 *   · The native width is appended as a top step only if it beats the largest
 *     standard step by >15%; otherwise an 843px source would ship a file
 *     indistinguishable from its own 800px one.
 *   · `.rotate()` with no angle bakes in EXIF orientation. Three sources
 *     report `orientation=0` (invalid), which sharp treats as a no-op — so
 *     spot-check all thirteen upright after a run.
 *
 * DESIGN-DIRECTION §08 asks for webp at 480/800/1200w; the backdrops reach
 * 1600 because they are the only plates rendered at a full 100vw.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'sorted', 'hero exp images');
const OUT = join(ROOT, 'public', 'assets', 'hero-lab-v2');

/** source filename → slug. The names are camera/export junk; the slugs are
 *  what the review page and the CSS crop classes are keyed on. */
const PLATES = [
  ['statue-shadow.jpg',                                 'statue-shadow'],
  ['man-reflection.jpg',                                'man-reflection'],
  ['1E0C72CF-4F2A-4832-B2BE-F27584B51DE5.PNG',          'desk-late'],
  ['4DB3AD56-15C2-4B3C-AE77-B1C5DA40C4D8.PNG',          'desk-spread'],
  ['ChatGPT Image Jun 15_ 2026 at 08_46_39 AM.png',     'light-shaft'],
  ['ChatGPT Image Jun 15_ 2026 at 08_15_37 AM.png',     'moodboard'],
  ['6EC80F89-F202-47BB-971B-4B904F389252.JPG',          'staircase-shoulder'],
  ['9796B41F-1ABD-45B4-AFD1-885607CCCC29.JPG',          'staircase-seated'],
  ['E8F84474-3244-4FB3-8A7F-BE46B872E3FA.JPG',          'gallery-standing'],
  ['F7916FA8-0DC5-4DB0-AFA2-CCEC383222BF 3.JPG',        'gallery-gilt'],
  ['Polish_20240824_235756327.JPG',                     'blazer-noir'],
  ['Polish_20240825_002516678 2.JPG',                   'window-portrait'],
  ['Polish_20240826_131227952.JPG',                     'window-shadow'],
  ['71098134-C4B1-4771-AC51-4F8D836B4A22.JPG',          'balustrade'],
  ['F032F136-6D39-4192-8967-109069AFDA6E.JPG',          'mosaic-floor'],
];

const LANDSCAPE_STEPS = [800, 1200, 1600];
const PORTRAIT_STEPS = [480, 800, 1200];
const QUALITY = 76;
/** How much a native width must beat the largest step by to earn its own file. */
const NATIVE_MARGIN = 1.15;

function stepsFor(width, landscape) {
  const steps = (landscape ? LANDSCAPE_STEPS : PORTRAIT_STEPS).filter((w) => w < width);
  const largest = steps.at(-1) ?? 0;
  if (width > largest * NATIVE_MARGIN) steps.push(width);
  return steps;
}

await mkdir(OUT, { recursive: true });

let total = 0;
const manifest = [];

for (const [file, slug] of PLATES) {
  const buf = await readFile(join(SRC, file));
  const meta = await sharp(buf).metadata();
  // EXIF orientations 5–8 swap the axes; `.rotate()` will bake that in, so the
  // dimensions we plan against are the POST-rotation ones.
  const swap = (meta.orientation ?? 0) >= 5;
  const width = swap ? meta.height : meta.width;
  const height = swap ? meta.width : meta.height;
  const landscape = width >= height;

  const emitted = [];
  for (const w of stepsFor(width, landscape)) {
    const { data, info } = await sharp(buf)
      .rotate()
      .resize({ width: w })
      .webp({ quality: QUALITY })
      .toBuffer({ resolveWithObject: true });
    if (info.width > width) throw new Error(`upscaled ${slug} to ${info.width} from ${width}`);
    await writeFile(join(OUT, `${slug}-${w}.webp`), data);
    emitted.push({ w: info.width, h: info.height, kb: Math.round(data.length / 1024) });
    total += data.length;
  }

  manifest.push({ slug, width, height, emitted });
  const steps = emitted.map((e) => `${e.w}×${e.h} ${e.kb}k`).join('  ');
  console.log(`${landscape ? 'L' : 'P'} ${slug.padEnd(20)} ${width}×${height}  →  ${steps}`);
}

console.log(`\n${manifest.reduce((n, p) => n + p.emitted.length, 0)} files, ${(total / 1024 / 1024).toFixed(2)} MB → public/assets/hero-lab-v2/`);
