import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-10-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

/** Sanity's CDN does the resizing, so no build-time image pipeline is needed. */
export function urlFor(source: unknown) {
  return builder.image(source as never);
}
