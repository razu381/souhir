import Link from 'next/link';
import { client, urlFor } from '@/sanity/client';
import { INDEX } from '@/sanity/queries';
import { Nav, Foot } from './nav';

export const revalidate = 60;

type Row = Record<string, any>;

export default async function Home() {
  const { projects, articles } = await client.fetch<{
    projects: Row[];
    articles: Row[];
  }>(INDEX);

  return (
    <div className="sf-container">
      <Nav />

      <header className="sfd-titles">
        <span className="sfd-titles__eyebrow sfd-label">Content demonstration</span>
        <h1 className="sfd-titles__title">
          Everything below was <em>typed into the editor.</em>
        </h1>
        <p className="sfd-titles__tagline">
          No page was coded for these entries. Each one was written in Dar SF&rsquo;s
          content editor and published — the design applies itself.
        </p>
      </header>

      <h2 className="sfd-heading">
        Selected <em>Work</em>
      </h2>
      <div className="sfd-index">
        {projects.map((p) => {
          const img = p.thumbnail ?? p.heroImage;
          return (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="sfd-card">
              {img && (
                <div className="sfd-card__media">
                  <img
                    src={urlFor(img).width(800).height(600).fit('crop').auto('format').url()}
                    alt={img.alt ?? ''}
                    width={800}
                    height={600}
                  />
                </div>
              )}
              <span className="sfd-card__eyebrow sfd-label">{p.category}</span>
              <h3 className="sfd-card__title">{p.title}</h3>
              <p className="sfd-card__text">{p.tagline}</p>
            </Link>
          );
        })}
      </div>

      <h2 className="sfd-heading">
        The <em>Journal</em>
      </h2>
      <div className="sfd-index">
        {articles.map((a) => (
          <Link key={a.slug} href={`/journal/${a.slug}`} className="sfd-card">
            {a.heroImage && (
              <div className="sfd-card__media">
                <img
                  src={urlFor(a.heroImage).width(800).height(600).fit('crop').auto('format').url()}
                  alt={a.heroImage.alt ?? ''}
                  width={800}
                  height={600}
                />
              </div>
            )}
            <span className="sfd-card__eyebrow sfd-label">
              {a.featured ? 'Featured editorial' : a.category}
            </span>
            <h3 className="sfd-card__title">{a.title}</h3>
            <p className="sfd-card__text">{a.excerpt}</p>
          </Link>
        ))}
      </div>

      <Foot />
    </div>
  );
}
