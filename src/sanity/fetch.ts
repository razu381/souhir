/**
 * Data access — Sanity when the documents exist, seed when they don't.
 *
 * Every fetch is tag-wired (plan §9): publishing in the studio fires the GROQ
 * webhook → /api/revalidate → revalidateTag. The seed fallbacks mean a fresh
 * clone renders the complete Nocturne home before any content is entered;
 * the client's first publish takes over section by section.
 *
 * A failed Sanity fetch degrades to seed, never to a 500 — the editorial site
 * must render.
 */
import { client, urlFor } from './client';
import {
  HOME,
  SERVICES,
  PRESS_FEATURES,
  SETTINGS,
  WORK_ITEMS,
} from './queries';
import * as seed from '@/content/seed';
import type { Plate } from '@/content/seed';
import { CHAPTER, plateNum } from '@/content/chapters';

export type Settings = {
  tagline: string;
  contactEmail: string;
  socials: { label: string; href: string }[];
};

async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> | undefined,
  tags: string[],
): Promise<T | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await client.fetch<T>(query, params ?? {}, { next: { tags } });
  } catch {
    // Offline dev, missing dataset, CORS — the site still renders.
    return null;
  }
}

/* --- Image resolution ------------------------------------------------------
   Sanity rows become the same Plate shape the seed uses; the CDN does the
   crops to the ratio contract (DESIGN-DIRECTION §08). */

type SanityImage = { asset?: unknown; alt?: string; hotspot?: unknown } | null | undefined;

/** Sanity asset refs carry the source dimensions: `image-<sha>-1600x197-jpg`. */
function sourceDims(img: SanityImage): [number, number] | null {
  const ref = (img?.asset as { _ref?: string } | undefined)?._ref;
  const m = ref?.match(/-(\d+)x(\d+)-[a-z]+$/i);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

/**
 * Is this source honestly croppable to the ratio the layout asks for?
 *
 * The CDN will crop anything to anything, which is how the journal register
 * ended up showing a 148x197 sliver taken out of a 1600x197 banner and blown
 * up 4x to fill a 600x800 portrait thumb — visibly soft next to every other
 * row. The layout ratios in §08 are a contract; a source that cannot meet it
 * should fall through to the seed plate rather than be forced.
 *
 * `coverage` is the fraction of the source the crop can keep along its
 * constrained axis. Two 3:2 landscapes cropped to 3:4 keep 50% — fine. A
 * 6.4:1 banner cropped to 3:4 keeps 9% — not a crop, a sliver.
 */
function croppable(img: SanityImage, widths: number[], ratio: [number, number]): boolean {
  const dims = sourceDims(img);
  if (!dims) return true;   // unknown source — trust the CDN, as before
  const [sw, sh] = dims;
  const rs = sw / sh;
  const rt = ratio[0] / ratio[1];
  const coverage = Math.min(rs, rt) / Math.max(rs, rt);
  if (coverage < 1 / 3) return false;
  // …and the crop must not need upscaling past the largest width requested.
  const cropWidth = rs > rt ? sh * rt : sw;
  return cropWidth >= widths[widths.length - 1] * 0.6;
}

function sanityPlate(img: SanityImage, widths: number[], ratio: [number, number], sizes?: string): Plate | null {
  if (!img?.asset) return null;
  if (!croppable(img, widths, ratio)) return null;   // → the caller's seed plate
  const h = (w: number) => Math.round((w * ratio[1]) / ratio[0]);
  const base = urlFor(img)
    .width(widths[widths.length - 1])
    .height(h(widths[widths.length - 1]))
    .fit('crop')
    .auto('format')
    .quality(80);
  return {
    src: base.url(),
    srcSet: widths.map((w) => `${urlFor(img).width(w).height(h(w)).fit('crop').auto('format').quality(80).url()} ${w}w`).join(', '),
    sizes,
    width: widths[widths.length - 1],
    height: h(widths[widths.length - 1]),
    alt: img.alt ?? '',
  };
}

/* --- Settings (footer, layout) --------------------------------------------- */

export async function getSettings(): Promise<Settings | null> {
  const row = await safeFetch<{
    tagline?: string;
    contactEmail?: string;
    socials?: { label?: string; href?: string }[];
  }>(SETTINGS, undefined, ['settings']);
  if (!row) return null;
  return {
    tagline: row.tagline ?? seed.settings.tagline,
    contactEmail: row.contactEmail ?? seed.settings.contactEmail,
    socials: (row.socials ?? [])
      .filter((s) => s.label && s.href)
      .map((s) => ({ label: s.label!, href: s.href! })),
  };
}

/* --- Home ------------------------------------------------------------------- */

export type WorkItem = {
  num: string;
  title: string;
  category: string; // filter token, lowercase
  categoryLabel: string;
  href: string | null;
  desc: string;
  credits: [role: string, name: string][];
  image: Plate;
};

export type JournalRow = {
  num: string;
  category?: string;
  title: string;
  desc: string;
  href: string | null;
  image: Plate;
};

export type JournalFeature = Omit<JournalRow, 'num'> & { read: string };

export type PressCover = { publication: string; caption: string; image: Plate };

export type HomeContent = {
  hero: typeof seed.hero;
  explore: typeof seed.explore;
  servicesIntro: typeof seed.servicesIntro;
  services: { num: string; title: string; slug: string; summary: string; tile: Plate }[];
  clientele: typeof seed.clientele;
  founder: typeof seed.founder;
  work: {
    label: string;
    head: string;
    statement: string;
    filters: { slug: string; label: string }[];
    items: WorkItem[];
  };
  press: typeof seed.press & { covers: PressCover[] };
  journal: {
    head: string;
    statement: string;
    banner: Plate;
    featuredLabel: string;
    featured: JournalFeature;
    moreLabel: string;
    rows: JournalRow[];
    more: { label: string; href: string };
  };
  interlude: { image: Plate; quote: seed.Head; cite: string; role: string };
  news: { head: seed.Head; text: string; image: Plate };
  cta: { head: seed.Head; text: string; cta: { label: string; href: string }; image: Plate };
};

const categoryToken = (c?: string) => (c ?? '').toLowerCase().replace(/\s*&\s*/, '-').replace(/\s+/g, '-') || 'editorial';
const pad = (i: number) => String(i + 1).padStart(2, '0');

export async function getHomeData(): Promise<HomeContent> {
  const [home, worksRaw, pressRaw, servicesRaw] = await Promise.all([
    safeFetch<Record<string, any>>(HOME, undefined, ['home']),
    safeFetch<Record<string, any>[]>(WORK_ITEMS, undefined, ['work', 'home']),
    safeFetch<Record<string, any>[]>(PRESS_FEATURES, undefined, ['press', 'home']),
    safeFetch<Record<string, any>[]>(SERVICES, undefined, ['services', 'home']),
  ]);

  /* Services */
  const services = (servicesRaw?.length ? servicesRaw : seed.services).map((s, i) => ({
    num: s.num ?? pad(i),
    title: s.title,
    slug: s.slug,
    summary: s.summary ?? '',
    tile:
      sanityPlate(s.tile, [480, 800, 1200], [4, 5], seed.services[0].tile.sizes) ??
      seed.services[i % seed.services.length].tile,
  }));

  /* Work hang — a studio item is cropped to its declared ratio; the seed
     plates hang as shot (their width/height carry the frame). */
  const ratios: Record<string, [number, number]> = { std: [4, 3], tall: [4, 5], square: [1, 1] };
  const items: WorkItem[] = worksRaw?.length
    ? worksRaw.map((w, i) => ({
        num: plateNum(CHAPTER.work, i),
        title: w.title,
        category: categoryToken(w.category),
        categoryLabel: w.category ?? '',
        href: w.slug ? `/portfolio/${w.slug}` : null,
        desc: w.description ?? '',
        credits: (w.credits ?? [])
          .filter((c: { role?: string; name?: string }) => c.role && c.name)
          .map((c: { role: string; name: string }) => [c.role, c.name] as [string, string]),
        image:
          sanityPlate(w.image, [800, 1200], ratios[w.ratio ?? 'tall'] ?? ratios.tall, seed.work.items[0].image.sizes) ??
          seed.work.items[i % seed.work.items.length].image,
      }))
    : seed.work.items.map((w, i) => ({
        num: plateNum(CHAPTER.work, i),
        title: w.title,
        category: categoryToken(w.category),
        categoryLabel: w.category,
        href: w.href,
        desc: w.desc,
        credits: w.credits,
        image: w.image,
      }));

  /* Press salon */
  const covers: PressCover[] = pressRaw?.length
    ? pressRaw
        .filter((p) => p.cover?.asset)
        .map((p, i) => ({
          publication: p.publication ?? '',
          caption: p.caption ?? `Cover Feature — ${p.publication}${p.date ? `, ${p.date}` : ''}`,
          image:
            sanityPlate(p.cover, [600, 900], [3, 4], '(min-width: 1025px) 18vw, 30vw') ??
            seed.press.covers[i % seed.press.covers.length].image,
        }))
    : seed.press.covers;

  /* Journal — the featured editorial, then the three additional articles.
     Real articles when they exist (the one marked featured leads, else the
     newest), seed when they don't. */
  const articles = await safeFetch<
    { title: string; excerpt?: string; category?: string; slug?: string; featured?: boolean; heroImage?: SanityImage }[]
  >(
    `*[_type == "journalArticle"] | order(publishedAt desc){ title, excerpt, category, "slug": slug.current, featured, heroImage{asset, alt, hotspot} }`,
    undefined,
    ['journal', 'home']
  );

  const h = home ?? {};
  const sj = seed.journal;
  let journal: HomeContent['journal'] = {
    ...sj,
    statement: h.journalStatement ?? sj.statement,
    rows: sj.rows.map((r, i) => ({ ...r, num: plateNum(CHAPTER.journal, i + 1) })),
  };
  if (articles?.length) {
    const lead = articles.find((a) => a.featured) ?? articles[0];
    const rest = articles.filter((a) => a !== lead).slice(0, 3);
    journal = {
      ...journal,
      featured: {
        category: lead.category,
        title: lead.title,
        desc: lead.excerpt ?? '',
        href: lead.slug ? `/journal/${lead.slug}` : null,
        read: sj.featured.read,
        image: sanityPlate(lead.heroImage, [600, 900, 1200], [4, 5], sj.featured.image.sizes) ?? sj.featured.image,
      },
      rows: rest.map((a, i) => ({
        num: plateNum(CHAPTER.journal, i + 1),
        category: a.category,
        title: a.title,
        desc: a.excerpt ?? '',
        href: a.slug ? `/journal/${a.slug}` : null,
        image: sanityPlate(a.heroImage, [600], [3, 4], sj.rows[0].image.sizes) ?? sj.rows[i % sj.rows.length].image,
      })),
    };
  }

  /* Home singleton overrides, per section */
  const explorePlate = sanityPlate(h.exploreImage, [800, 1200, 1800], [2, 3], seed.explore.image.sizes);
  const founderPlate = sanityPlate(h.founderImage, [480, 800, 1200, 1800], [2, 3], seed.founder.image.sizes);
  const interludePlate = sanityPlate(h.interludeImage, [1600, 2400, 3200], [11, 5], '100vw');

  return {
    hero: {
      ...seed.hero,
      titleLines: [h.heroTitleA ?? seed.hero.titleLines[0], h.heroTitleB ?? seed.hero.titleLines[1]],
      labelMeta: h.heroLabelMeta ?? seed.hero.labelMeta,
    },
    explore: {
      ...seed.explore,
      statement: h.exploreStatement ?? seed.explore.statement,
      body: h.exploreBody?.length ? h.exploreBody : seed.explore.body,
      image: explorePlate ?? seed.explore.image,
    },
    servicesIntro: seed.servicesIntro,
    services,
    clientele: {
      ...seed.clientele,
      rows: h.clientele?.length
        ? h.clientele.map((r: { label?: string; description?: string }) => [r.label ?? '', r.description ?? ''])
        : seed.clientele.rows,
    },
    founder: {
      ...seed.founder,
      image: founderPlate ?? seed.founder.image,
      refrain: h.founderRefrain ? splitHead(h.founderRefrain) : seed.founder.refrain,
      texts: h.founderTexts?.length ? h.founderTexts : seed.founder.texts,
      name: h.founderName ?? seed.founder.name,
      role: h.founderRole ?? seed.founder.role,
    },
    work: {
      label: seed.work.label,
      head: seed.work.head,
      statement: h.workStatement ?? seed.work.statement,
      filters: seed.work.filters,
      items,
    },
    press: {
      ...seed.press,
      head: h.press?.heading ? splitHead(h.press.heading) : seed.press.head,
      statement: h.press?.statement ?? seed.press.statement,
      stats: h.press?.stats?.length
        ? h.press.stats.map((s: { figure?: string; label?: string }) => [s.figure ?? '', s.label ?? ''])
        : seed.press.stats,
      covers: covers.length ? covers : seed.press.covers,
    },
    journal,
    interlude: {
      // A studio image has no art-directed handset crop; the band's own
      // object-position carries it.
      image: interludePlate ?? seed.interlude.image,
      quote: h.interludeQuote ? splitHead(h.interludeQuote) : seed.interlude.quote,
      // A studio attribution is one line; the seed's runs name and role.
      cite: h.interludeAttribution ?? seed.interlude.cite,
      role: h.interludeAttribution ? '' : seed.interlude.role,
    },
    news: {
      head: h.newsHeading ? splitHead(h.newsHeading) : seed.news.head,
      text: h.newsText ?? seed.news.text,
      image: seed.news.image,
    },
    cta: {
      head: h.ctaHeading ? splitHead(h.ctaHeading) : seed.cta.head,
      text: h.ctaText ?? seed.cta.text,
      cta: seed.cta.cta,
      image: seed.cta.image,
    },
  };
}

/** "Curated Perspectives. Delivered Occasionally." → ["Curated Perspectives. ", "Delivered Occasionally."].
 * Splits at the last sentence break before an italic-feeling tail; when the
 * editor gives one line only, the whole line renders unitalicised. */
function splitHead(text: string): seed.Head {
  const dot = text.lastIndexOf('. ');
  if (dot === -1) return [text, ''];
  return [text.slice(0, dot + 2), text.slice(dot + 2)];
}
