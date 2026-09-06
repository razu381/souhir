import { defineConfig } from 'sanity';
import { structureTool, type StructureResolver } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, sectionTypes } from './schemas';

/** The desk mirrors the site's shape, not the schema dump — the client sees
 * the pages they are editing (plan §4.2). */
const structure: StructureResolver = (S) =>
  S.list()
    .title('Dar SF')
    .items([
      S.listItem()
        .title('Home page')
        .child(S.document().schemaType('home').documentId('home')),
      S.listItem()
        .title('Site settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('workItem').title('Work items'),
      S.documentTypeListItem('caseStudy').title('Case studies'),
      S.documentTypeListItem('journalArticle').title('Journal'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('pressFeature').title('Press'),
      S.divider(),
      S.documentTypeListItem('message').title('Correspondence'),
    ]);

export default defineConfig({
  name: 'dar-sf',
  title: 'Dar SF',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: [...schemaTypes, ...sectionTypes],
  },
});
