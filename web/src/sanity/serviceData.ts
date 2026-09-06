import { client } from './client';
import { SERVICE } from './queries';

/** One service with its detail chapters (tag-wired for revalidation). */
export async function safeFetchService(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await client.fetch<Record<string, any> | null>(SERVICE, { slug }, { next: { tags: ['services'] } });
  } catch {
    return null;
  }
}
