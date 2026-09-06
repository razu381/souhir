import { defineQuery } from 'next-sanity';

export const CASE_STUDY_SLUGS = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)]{"slug": slug.current}`
);

export const ARTICLE_SLUGS = defineQuery(
  `*[_type == "journalArticle" && defined(slug.current)]{"slug": slug.current}`
);

export const CASE_STUDY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    title, category, tagline, publishedAt,
    heroImage, overview,
    projectDetails, closingQuote,
    sections[]{
      _type, _key, heading, intro, items, body, layout,
      pillars[]{ _key, title, description },
      results[]{ _key, figure, label },
      images[]{ _key, alt, asset },
      image, caption, width,
      quote, attribution
    }
  }
`);

export const ARTICLE = defineQuery(`
  *[_type == "journalArticle" && slug.current == $slug][0]{
    title, excerpt, category, publishedAt, heroImage, body
  }
`);

/** The portfolio register — everything the case-study rows render. */
export const INDEX = defineQuery(`{
  "projects": *[_type == "caseStudy"] | order(publishedAt desc){
    title, category, tagline, "slug": slug.current
  }
}`);

/* --- Home-page queries (tagged for webhook revalidation, plan §9) ---------- */

export const HOME = defineQuery(`*[_type == "home" && !(_id in path("drafts.**"))][0]{
  heroTitleA, heroTitleB, heroLabelMeta,
  heroImage{asset, alt, hotspot},
  exploreStatement, exploreFelt, exploreImage{asset, alt, hotspot},
  clientele[]{ _key, label, description },
  founderImage{asset, alt, hotspot}, founderRefrain, founderTexts, founderFelt,
  founderName, founderRole,
  workStatement,
  press{ heading, statement, stats[]{ _key, figure, label } },
  journalStatement, journalSub,
  interludeImage{asset, alt, hotspot}, interludeQuote, interludeAttribution,
  newsHeading, newsText,
  ctaImage{asset, alt, hotspot}, ctaHeading, ctaText
}`);

export const WORK_ITEMS = defineQuery(
  `*[_type == "workItem"] | order(publishedAt desc){
    title, category, ratio, "slug": caseStudy->slug.current, image{asset, alt, hotspot}
  }`
);

export const PRESS_FEATURES = defineQuery(
  `*[_type == "pressFeature"] | order(date desc){
    publication, date, caption, url, cover{asset, alt, hotspot}
  }`
);

export const SERVICES = defineQuery(
  `*[_type == "service"] | order(num asc){
    title, "slug": slug.current, num, summary, tile{asset, alt},
    chapters[]{
      _type, _key, heading, intro, items, layout,
      pillars[]{ _key, title, description },
      images[]{ _key, alt, asset },
      image, caption, width
    }
  }`
);

export const SERVICE = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    title, num, summary, tile{asset, alt}, chapters[]{
      _type, _key, heading, intro, items, layout,
      pillars[]{ _key, title, description },
      images[]{ _key, alt, asset },
      image, caption, width
    }
  }
`);

export const SETTINGS = defineQuery(
  `*[_type == "siteSettings"][0]{ tagline, contactEmail, socials[]{ _key, label, href } }`
);
