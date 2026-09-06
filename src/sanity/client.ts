import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

/* With no env vars (fresh clone, CI before secrets are set), construct against
   an inert placeholder instead of throwing at import — the whole seed-fallback
   architecture depends on the site building and rendering before any
   configuration exists. Real fetches are guarded anyway: safeFetch checks
   NEXT_PUBLIC_SANITY_PROJECT_ID before it ever calls this client, so the
   placeholder never sees traffic. */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'unconfigured';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

/** Sanity's CDN does the resizing, so no build-time image pipeline is needed. */
export function urlFor(source: unknown) {
  return builder.image(source as never);
}
