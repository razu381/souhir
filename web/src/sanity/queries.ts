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

export const INDEX = defineQuery(`{
  "projects": *[_type == "caseStudy"] | order(publishedAt desc){
    title, category, tagline, "slug": slug.current, heroImage, thumbnail
  },
  "articles": *[_type == "journalArticle"] | order(publishedAt desc){
    title, excerpt, category, featured, publishedAt, "slug": slug.current, heroImage
  }
}`);
