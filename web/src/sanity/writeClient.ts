import { createClient } from 'next-sanity';

/**
 * The write client — used ONLY by server actions, only to create `message`
 * documents (plan D6). Its token must be a Sanity token whose role can
 * create but not read; it lives in Netlify env, never NEXT_PUBLIC_*.
 */
export function createWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!token || !projectId || !dataset) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-10-01',
    token,
    useCdn: false,
  });
}
