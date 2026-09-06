import { PortableText, type PortableTextComponents } from 'next-sanity';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/sanity/client';
import { ARTICLE, ARTICLE_SLUGS } from '@/sanity/queries';
import { Nav, Foot } from '../../nav';

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = await client
    .withConfig({ useCdn: false })
    .fetch<{ slug: string }[]>(ARTICLE_SLUGS);
  return rows.map((r) => ({ slug: r.slug }));
}

/** Images and pull quotes she inserts mid-article render as their own blocks. */
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure>
        <img
          src={urlFor(value).width(1400).auto('format').url()}
          alt={value.alt ?? ''}
          width={1400}
          height={933}
          loading="lazy"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    closingQuote: ({ value }) => (
      <aside className="sfd-pull">
        <p className="sfd-pull__text">“{value.quote}”</p>
        {value.attribution && (
          <span className="sfd-pull__by sfd-label">{value.attribution}</span>
        )}
      </aside>
    ),
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

  return (
    <>
      <div className="sf-container">
        <Nav back={{ href: '/', label: 'The Journal' }} />
      </div>

      {article.heroImage && (
        <div className="sfd-hero">
          <figure className="sfd-hero__media">
            <img
              src={urlFor(article.heroImage).width(2000).auto('format').url()}
              alt={article.heroImage.alt ?? ''}
              width={2000}
              height={900}
            />
          </figure>
        </div>
      )}

      <div className="sf-container">
        <header className="sfd-titles">
          <span className="sfd-titles__eyebrow sfd-label">{article.category}</span>
          <h1 className="sfd-titles__title">{article.title}</h1>
          {article.excerpt && (
            <p className="sfd-titles__tagline">{article.excerpt}</p>
          )}
          {date && (
            <div className="sfd-titles__meta sfd-label">
              <span>{date}</span>
            </div>
          )}
        </header>

        <article className="sfd-article sfd-measure">
          <PortableText value={article.body ?? []} components={components} />
        </article>

        <Foot />
      </div>
    </>
  );
}
