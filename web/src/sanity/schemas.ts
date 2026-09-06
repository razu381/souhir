/**
 * The Dar SF content model.
 *
 * `caseStudy` and `journalArticle` match the dataset's existing documents
 * field-for-field (the web/ demo already renders them) — do not rename or
 * the live content orphans. The rest are new (plan §4.1).
 *
 * Editors own words and pictures; the studio never offers layout. Section
 * order, chapter numbering and the six work categories stay in code.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';

/** Portable Text: rich blocks + the two editorial interrupts. */
const bodyBlocks = [
  defineArrayMember({
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'Quote', value: 'blockquote' },
    ],
    marks: {
      decorators: [
        { title: 'Italic', value: 'em' },
        { title: 'Strong', value: 'strong' },
        { title: 'Underline', value: 'underline' },
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [{ name: 'href', type: 'url', title: 'URL' }],
        },
      ],
    },
  }),
  defineArrayMember({
    type: 'image',
    options: { hotspot: true },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alt text',
        description: 'Required. One sentence, in the editorial voice.',
        validation: (rule) => rule.required().error('Every plate needs alt text.'),
      },
      { name: 'caption', type: 'string', title: 'Caption' },
    ],
  }),
  defineArrayMember({
    type: 'object',
    name: 'closingQuote',
    title: 'Pull quote',
    icon: () => '❝',
    fields: [
      { name: 'quote', type: 'string', title: 'Quote', validation: (r) => r.required() },
      { name: 'attribution', type: 'string', title: 'Attribution' },
    ],
    preview: {
      select: { title: 'quote', subtitle: 'attribution' },
    },
  }),
];

const slugField = (source: string) =>
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    options: { source, maxLength: 96 },
    validation: (rule) => rule.required().error('A slug is required to publish.'),
  });

/** The brief's ratio contract (DESIGN-DIRECTION §08) is enforced at render
 * time by the CDN crop, not in the studio — editors can upload any ratio
 * and set the hotspot; the plate crops true. */
const image = (name = 'image', title = 'Image') =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alt text',
        validation: (rule) => rule.required().error('Every plate needs alt text.'),
      },
    ],
  });

/* ------------------------------------------------------------------ */
/* Collection documents                                                */
/* ------------------------------------------------------------------ */

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    slugField('title'),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: ['Hospitality', 'Beauty', 'Wellness', 'Editorial', 'Lifestyle'],
      },
    }),
    defineField({ name: 'tagline', type: 'string', title: 'Tagline' }),
    defineField({ name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    image('heroImage', 'Hero image'),
    defineField({ name: 'overview', type: 'array', of: bodyBlocks }),
    defineField({
      name: 'sections',
      title: 'Chapters',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'richSection',
        }),
        defineArrayMember({
          type: 'pillarSection',
        }),
        defineArrayMember({
          type: 'listSection',
        }),
        defineArrayMember({
          type: 'resultsSection',
        }),
        defineArrayMember({
          type: 'gallerySection',
        }),
        defineArrayMember({
          type: 'plateSection',
        }),
        defineArrayMember({
          type: 'quoteSection',
        }),
      ],
    }),
    defineField({
      name: 'projectDetails',
      title: 'Project details',
      type: 'object',
      fields: [
        { name: 'industry', type: 'string' },
        { name: 'projectType', type: 'string' },
        { name: 'services', type: 'array', of: [{ type: 'string' }] },
        { name: 'location', type: 'string' },
      ],
    }),
    defineField({
      name: 'closingQuote',
      title: 'Closing quote',
      type: 'object',
      fields: [
        { name: 'quote', type: 'string' },
        { name: 'attribution', type: 'string' },
      ],
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
});

export const journalArticle = defineType({
  name: 'journalArticle',
  title: 'Journal article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    slugField('title'),
    defineField({ name: 'excerpt', type: 'text', rows: 2 }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          'Luxury & Culture',
          'Visual Storytelling',
          'Hospitality & Experience',
          'Creative Intelligence',
        ],
      },
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured editorial',
      initialValue: false,
    }),
    defineField({ name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    image('heroImage', 'Hero image'),
    defineField({ name: 'body', type: 'array', of: bodyBlocks }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'heroImage' },
  },
});

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    slugField('title'),
    defineField({
      name: 'num',
      title: 'Catalogue number',
      type: 'string',
      description: 'Position in the home list — 01 to 04. Order carries meaning.',
      validation: (r) => r.required(),
    }),
    image('tile', 'Preview tile (4:5)'),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
      description: 'The one-line description under the title on the home list.',
    }),
    defineField({
      name: 'chapters',
      title: 'Detail chapters',
      type: 'array',
      of: [
        defineArrayMember({ type: 'richSection' }),
        defineArrayMember({ type: 'listSection' }),
        defineArrayMember({ type: 'gallerySection' }),
        defineArrayMember({ type: 'plateSection' }),
      ],
    }),
    defineField({ name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
  orderings: [{ title: 'By catalogue number', name: 'numAsc', by: [{ field: 'num', direction: 'asc' }] }],
});

export const pressFeature = defineType({
  name: 'pressFeature',
  title: 'Press feature',
  type: 'document',
  fields: [
    defineField({ name: 'publication', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', type: 'string', description: 'As printed — “Dec 2025”.' }),
    image('cover', 'Cover (3:4)'),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'url', type: 'url' }),
  ],
});

export const workItem = defineType({
  name: 'workItem',
  title: 'Work item',
  type: 'document',
  description: 'A plate in the home hang. A case study is optional — a plate can exist before the write-up.',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: ['Hospitality', 'Beauty', 'Wellness', 'Editorial', 'Lifestyle'],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    image('image'),
    defineField({
      name: 'ratio',
      title: 'Plate ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Standard (4:3)', value: 'std' },
          { title: 'Tall (4:5)', value: 'tall' },
          { title: 'Square (1:1)', value: 'square' },
        ],
        layout: 'radio',
      },
      initialValue: 'std',
    }),
    defineField({
      name: 'caseStudy',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
    }),
    defineField({ name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
});

export const message = defineType({
  name: 'message',
  title: 'Message',
  type: 'document',
  description: 'Contact and newsletter submissions. Created by the site, read here.',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({
      name: 'kind',
      type: 'string',
      options: { list: ['contact', 'newsletter'], layout: 'radio' },
    }),
    defineField({ name: 'createdAt', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: { title: 'email', subtitle: 'kind', media: 'kind' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Correspondence — ${subtitle ?? 'message'}` };
    },
  },
});

/* ------------------------------------------------------------------ */
/* Singletons                                                          */
/* ------------------------------------------------------------------ */

export const home = defineType({
  name: 'home',
  title: 'Home page',
  type: 'document',
  description: 'All home copy that is not owned by its own document. Section order lives in code.',
  fields: [
    // 01 — hero
    defineField({ name: 'heroTitleA', title: 'Hero title, line 1', type: 'string' }),
    defineField({ name: 'heroTitleB', title: 'Hero title, line 2', type: 'string' }),
    image('heroImage', 'Hero plate'),
    defineField({ name: 'heroLabelMeta', title: 'Hero figure label', type: 'string' }),
    // 02 — explore
    defineField({ name: 'exploreStatement', type: 'text', rows: 4 }),
    defineField({ name: 'exploreFelt', title: 'Felt line', type: 'string' }),
    image('exploreImage', 'Explore plate'),
    // 04 — clientele
    defineField({
      name: 'clientele',
      title: 'Who we work with',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
    // 05 — founder
    image('founderImage', 'Founder plate'),
    defineField({ name: 'founderRefrain', type: 'string' }),
    defineField({ name: 'founderTexts', type: 'array', of: [{ type: 'text', rows: 3 }] }),
    defineField({ name: 'founderFelt', title: 'Founder felt line', type: 'string' }),
    defineField({ name: 'founderName', type: 'string' }),
    defineField({ name: 'founderRole', type: 'string' }),
    // 06 — work
    defineField({ name: 'workStatement', type: 'text', rows: 2 }),
    // 07 — press
    defineField({
      name: 'press',
      title: 'Press stats',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'statement', type: 'text', rows: 2 },
        {
          name: 'stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'figure', type: 'string' },
                { name: 'label', type: 'string' },
              ],
              preview: { select: { title: 'label', subtitle: 'figure' } },
            }),
          ],
        },
      ],
    }),
    // 08 — journal masthead
    defineField({ name: 'journalStatement', type: 'text', rows: 2 }),
    defineField({ name: 'journalSub', type: 'text', rows: 2 }),
    // interlude
    image('interludeImage', 'Interlude banner (6.4:1)'),
    defineField({ name: 'interludeQuote', type: 'string' }),
    defineField({ name: 'interludeAttribution', type: 'string' }),
    // 09 — correspondence
    defineField({ name: 'newsHeading', type: 'string' }),
    defineField({ name: 'newsText', type: 'text', rows: 2 }),
    // CTA
    image('ctaImage', 'Closing banner (6.4:1)'),
    defineField({ name: 'ctaHeading', type: 'string' }),
    defineField({ name: 'ctaText', type: 'text', rows: 3 }),
  ],
});

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'contactEmail', type: 'string' }),
    defineField({
      name: 'socials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'url' },
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
    defineField({ name: 'metaTitle', title: 'Default meta title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Default meta description', type: 'text', rows: 2 }),
  ],
});

export const schemaTypes = [
  // documents
  caseStudy,
  journalArticle,
  service,
  pressFeature,
  workItem,
  message,
  // singletons
  home,
  siteSettings,
];

/* ------------------------------------------------------------------ */
/* The composable section types (case-study chapters & service pages)  */
/* ------------------------------------------------------------------ */

export const sectionTypes = [
  defineType({
    name: 'richSection',
    title: 'Rich text',
    type: 'object',
    fields: [
      { name: 'heading', type: 'string' },
      { name: 'intro', type: 'text', rows: 2 },
      { name: 'body', type: 'array', of: bodyBlocks },
    ],
    preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Rich text' }) },
  }),
  defineType({
    name: 'pillarSection',
    title: 'Pillars',
    type: 'object',
    fields: [
      { name: 'heading', type: 'string' },
      { name: 'intro', type: 'text', rows: 2 },
      {
        name: 'pillars',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              { name: 'title', type: 'string' },
              { name: 'description', type: 'text', rows: 2 },
            ],
            preview: { select: { title: 'title' } },
          }),
        ],
      },
    ],
    preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Pillars' }) },
  }),
  defineType({
    name: 'listSection',
    title: 'List',
    type: 'object',
    fields: [
      { name: 'heading', type: 'string' },
      { name: 'intro', type: 'text', rows: 2 },
      { name: 'items', type: 'array', of: [{ type: 'string' }] },
    ],
    preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'List' }) },
  }),
  defineType({
    name: 'resultsSection',
    title: 'Results',
    type: 'object',
    fields: [
      { name: 'heading', type: 'string' },
      {
        name: 'results',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              { name: 'figure', type: 'string' },
              { name: 'label', type: 'string' },
            ],
            preview: { select: { title: 'label', subtitle: 'figure' } },
          }),
        ],
      },
    ],
    preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Results' }) },
  }),
  defineType({
    name: 'gallerySection',
    title: 'Gallery',
    type: 'object',
    fields: [
      { name: 'heading', type: 'string' },
      {
        name: 'layout',
        type: 'string',
        options: { list: ['Two up', 'Three up'], layout: 'radio' },
      },
      {
        name: 'images',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'image',
            options: { hotspot: true },
            fields: [{ name: 'alt', type: 'string' }],
          }),
        ],
      },
    ],
    preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Gallery' }) },
  }),
  defineType({
    name: 'plateSection',
    title: 'Plate',
    type: 'object',
    fields: [
      image('image', 'Plate'),
      { name: 'caption', type: 'string' },
      {
        name: 'width',
        type: 'string',
        options: { list: ['Full bleed', 'Inset'], layout: 'radio' },
      },
    ],
    preview: { select: { title: 'caption' }, prepare: ({ title }) => ({ title: title || 'Plate' }) },
  }),
  defineType({
    name: 'quoteSection',
    title: 'Quote banner',
    type: 'object',
    fields: [
      image('image', 'Banner (6.4:1)'),
      { name: 'quote', type: 'string' },
      { name: 'attribution', type: 'string' },
    ],
    preview: { select: { title: 'quote' }, prepare: ({ title }) => ({ title: title || 'Quote banner' }) },
  }),
];
