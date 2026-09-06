import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PortableText, type PortableTextComponents } from 'next-sanity';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import Reveal from '@/components/sf/Reveal';
import { client, urlFor } from '@/sanity/client';
import { ARTICLE, ARTICLE_SLUGS } from '@/sanity/queries';

export const revalidate = 600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(ARTICLE_SLUGS)
    .catch(() => []);
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await client
    .fetch<{ title: string; excerpt?: string } | null>(ARTICLE, { slug })
    .catch(() => null);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

/** Images and pull quotes she inserts mid-article render as their own blocks. */
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="sf-plate">
        <img
          src={urlFor(value).width(1400).height(933).fit('crop').auto('format').url()}
          alt={value.alt ?? ''}
          width={1400}
          height={933}
          loading="lazy"
        />
        {value.caption && <figcaption className="sf-plate__caption">{value.caption}</figcaption>}
      </figure>
    ),
    closingQuote: ({ value }) => (
      <aside className="sf-pull">
        <p className="sf-pull__text">&ldquo;{value.quote}&rdquo;</p>
        {value.attribution && <span className="sf-pull__by">{value.attribution}</span>}
      </aside>
    ),
  },
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await client.fetch<Record<string, any> | null>(ARTICLE, { slug });
  if (!article) notFound();

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const title = article.title as string;
  const split: [string, string] = title.startsWith('The ')
    ? ['The ', title.slice(4)]
    : title.includes(' ')
      ? [`${title.split(' ')[0]} `, title.split(' ').slice(1).join(' ')]
      : [title, ''];

  return (
    <main id="main">
      <PageTitle
        label={`(The Journal — ${article.category ?? 'Essay'})`}
        title={split}
        intro={article.excerpt}
        num={date ?? undefined}
      />
      <HeaderSentinel />

      {article.heroImage?.asset && (
        <figure className="sf-plate">
          <img
            src={urlFor(article.heroImage).width(2000).height(1125).fit('crop').auto('format').url()}
            alt={article.heroImage.alt ?? ''}
            width={2000}
            height={1125}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      )}

      <div className="sf-container">
        <div className="sf-sections">
          <article className="sf-prose sf-prose--article">
            <PortableText value={article.body ?? []} components={components} />
          </article>

          <Reveal>
            <Link className="sf-btn" href="/journal">
              The Journal <span aria-hidden="true">&#8599;</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
