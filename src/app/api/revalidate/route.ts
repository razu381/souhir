import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Publish webhook (plan §9): the GROQ webhook in manage.sanity.io POSTs here
 * on publish/unpublish; we discard the affected tags and the pages regenerate
 * on their next request. No full rebuild, no polling.
 *
 * Configure the webhook with a custom header:
 *   x-sanity-webhook-secret: <SANITY_REVALIDATE_SECRET>
 * and the projection: { _type, "slug": slug.current }
 */

const TAGS_FOR_TYPE: Record<string, string[]> = {
  home: ['home'],
  workItem: ['work', 'home'],
  caseStudy: ['work'],
  journalArticle: ['journal', 'home'],
  service: ['services', 'home'],
  pressFeature: ['press', 'home'],
  siteSettings: ['settings'],
};

export async function POST(req: NextRequest) {
  const secret =
    req.headers.get('x-sanity-webhook-secret') ??
    req.nextUrl.searchParams.get('secret');

  if (
    !process.env.SANITY_REVALIDATE_SECRET ||
    secret !== process.env.SANITY_REVALIDATE_SECRET
  ) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  // The projection can deliver one document or, with "send all matching",
  // an array of them.
  const docs = Array.isArray(body) ? body : [body];
  const types = docs
    .map((d) => (d as { _type?: string } | null)?._type)
    .filter((t): t is string => Boolean(t));

  const tags = [...new Set(types.flatMap((t) => TAGS_FOR_TYPE[t] ?? []))];

  if (!tags.length) {
    return NextResponse.json({ message: 'Nothing to revalidate' });
  }

  // Next 16's revalidateTag takes the cacheLife profile; "max" expires the
  // tagged entries immediately for their next request.
  tags.forEach((tag) => revalidateTag(tag, 'max'));
  return NextResponse.json({ revalidated: tags, now: Date.now() });
}
