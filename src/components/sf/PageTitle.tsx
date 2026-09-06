/**
 * PageTitle — the inner-page title card. Every page opens on the umber band
 * so the paper-on-transparent header stays legible and the site "opens in
 * the dark" (site.css §2).
 */
import { Headed } from './HomeSections';
import type { Head } from '@/content/seed';

export default function PageTitle({
  label,
  title,
  intro,
  num,
}: {
  label: string;
  title: Head;
  intro?: string;
  num?: string;
}) {
  return (
    <section className="sf-pagetitle">
      <div className="sf-container">
        <div className="sf-pagetitle__rule">
          <span>{label}</span>
          <span className="sf-pagetitle__num">{num ?? '(Dar SF)'}</span>
        </div>
        <h1 className="sf-pagetitle__title">
          <Headed head={title} />
        </h1>
        {intro && <p className="sf-pagetitle__intro">{intro}</p>}
      </div>
    </section>
  );
}

/** The header's solid-ground trigger: place directly after the opening band. */
export function HeaderSentinel() {
  return <span data-sf-header-sentinel aria-hidden="true" />;
}
