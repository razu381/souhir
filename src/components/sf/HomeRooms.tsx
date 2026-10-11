/**
 * HomeRooms — the homepage's sections after the client's round-2 feedback
 * (Oct 2026). Plan: docs/plans/11-homepage-round-2.md; decisions:
 * DECISION-LOG.md 2026-10-09 / 2026-10-10.
 *
 * Each room is composed for its own content rather than one structure
 * repeated: image sides alternate down the page, the grounds alternate warm
 * ivory and charcoal (deep brown once, for the founder), and every text block
 * follows the client's reference setting (DESIGN-DIRECTION §02 addendum).
 * Styles live in sf/home.css, scoped to <main class="sf-homepage">.
 *
 * These are homepage-only. The round-1 sections in HomeSections.tsx still
 * hang on /journal, /editorial and the /home-v* labs, untouched.
 */
import Link from 'next/link';
import Reveal from './Reveal';
import WordReveal from './WordReveal';
import Picture from './Picture';
import WorkGrid from './WorkGrid';
import ClientIcon, { type ClientIconName } from './ClientIcon';
import Lines from './Lines';
import { Chapter } from './HomeSections';
import type { HomeContent } from '@/sanity/fetch';
import { CHAPTER } from '@/content/chapters';
import { clientele as seedClientele, journal as seedJournal } from '@/content/seed';

/* --- 01 — EXPLORE SF MUSE (ivory) -------------------------------------------
   One photograph (the client: two photos for a slot were alternatives), hung
   left so the room answers the hero's text-left setting; the copy's heading,
   its first sentence as the lead, the two paragraphs in the reading voice. */
export function HomeExplore({ data }: { data: HomeContent['explore'] }) {
  return (
    <section className="sf-section sf-room sf-room--ivory sf-hp-explore" id="explore">
      <div className="sf-container">
        <Chapter label="" num={CHAPTER.explore} />
        <div className="sf-hp-explore__grid">
          <Reveal as="figure" className="sf-hp-explore__figure" curtain>
            <Picture plate={data.image} />
          </Reveal>
          <div className="sf-hp-explore__body">
            <Reveal as="h2" className="sf-hp-head">
              {data.heading}
            </Reveal>
            <WordReveal className="sf-hp-lead sf-hp-explore__lead" text={data.statement} />
            {data.body.map((text, i) => (
              <Reveal as="p" className="sf-hp-body" key={text.slice(0, 24)} delay={i * 90}>
                {text}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- 02 — WHAT WE CREATE (charcoal) ------------------------------------------
   The doc's label is the section's headline (since the Services update it
   gives no other). The four services as visual cards: the photograph
   uncovered at the top, the numeral, title, line and an always-visible
   Learn More on a raised panel beneath — the whole card is the way in. */
export function HomeServices({
  data,
  intro,
}: {
  data: HomeContent['services'];
  intro: HomeContent['servicesIntro'];
}) {
  return (
    <section className="sf-section sf-room sf-room--charcoal sf-hp-services" id="services">
      <div className="sf-container">
        <Chapter label="" num={CHAPTER.services} />
        <div className="sf-hp-masthead">
          <Reveal as="h2" className="sf-hp-head">
            {intro.label}
          </Reveal>
        </div>
        <ul className="sf-hp-cards">
          {data.map((s, i) => (
            <Reveal as="li" className="sf-hp-card" key={s.slug} delay={i * 90}>
              <Link className="sf-hp-card__link" href={`/services#${s.slug}`}>
                <span className="sf-hp-card__media" aria-hidden="true">
                  <Picture plate={s.tile} />
                </span>
                <span className="sf-hp-card__body">
                  <span className="sf-hp-card__num">{s.num}</span>
                  <h3 className="sf-hp-card__title">{s.title}</h3>
                  <span className="sf-hp-card__desc">{s.summary}</span>
                  <span className="sf-hp-more">
                    {intro.more} <span aria-hidden="true">&#8594;</span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --- 03 — WHO WE WORK WITH (ivory) --------------------------------------------
   All seven categories, compact: a three-column grid whose first row gives
   two cells to the heading and statement, so 2 + 7 fills three rows exactly.
   Each category carries a line icon, its title and its description. */
export function HomeClients({ data }: { data: HomeContent['clientele'] }) {
  const icons = (data.icons ?? seedClientele.icons) as readonly ClientIconName[];
  return (
    <section className="sf-section sf-room sf-room--ivory sf-hp-clients" id="clientele">
      <div className="sf-container">
        <Chapter label="(Who We Work With)" num={CHAPTER.clientele} />
        <div className="sf-hp-clients__grid">
          <div className="sf-hp-clients__intro">
            <Reveal as="h2" className="sf-hp-head">
              <Lines head={data.head} />
            </Reveal>
            <Reveal as="p" className="sf-hp-lead" delay={90}>
              {data.statement}
            </Reveal>
          </div>
          <ul className="sf-hp-clients__list">
            {data.rows.map(([label, description], i) => (
              <Reveal as="li" className="sf-hp-client" key={label} delay={(i % 3) * 70}>
                <ClientIcon name={icons[i] ?? 'diamond'} className="sf-hp-client__icon" />
                <h3 className="sf-hp-client__title">{label}</h3>
                <p className="sf-hp-client__desc">{description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --- 04 — ABOUT SF MUSE (deep brown) ------------------------------------------
   One composition: the portrait (its treatment unchanged), and beside it the
   refrain, the sentence, her own signature over her name and role, and the
   way to the philosophy — the text block sits on the portrait's foot. */
export function HomeFounder({ data }: { data: HomeContent['founder'] }) {
  return (
    <section className="sf-section sf-room sf-room--brown sf-hp-founder" id="founder">
      <div className="sf-container">
        <Chapter label="(About SF Muse)" num={CHAPTER.founder} />
        <div className="sf-hp-founder__grid">
          <Reveal as="figure" className="sf-hp-founder__figure" curtain>
            <Picture plate={data.image} />
          </Reveal>
          <div className="sf-hp-founder__body">
            <Reveal as="h2" className="sf-hp-head">
              <Lines head={data.refrain} />
            </Reveal>
            {data.texts.map((t) => (
              <Reveal as="p" className="sf-hp-lead" key={t.slice(0, 24)}>
                {t}
              </Reveal>
            ))}
            <Reveal className="sf-hp-founder__sign">
              <Picture plate={data.signature} className="sf-hp-founder__signature" />
              <p className="sf-hp-founder__name">{data.name}</p>
              <p className="sf-hp-founder__role">{data.role}</p>
            </Reveal>
            <Reveal>
              <Link className="sf-btn" href={data.cta.href}>
                {data.cta.label} <span aria-hidden="true">&#8599;</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- 05 — SELECTED WORKS (ivory) ----------------------------------------------
   The shared hang (WorkGrid), on the light wall: every caption on one
   anatomy and the rows aligned across (components.css), filters with no
   project left off the rail, the photographs without the round-1 grade. */
export function HomeWork({ data }: { data: HomeContent['work'] }) {
  return (
    <section className="sf-section sf-room sf-room--ivory sf-work sf-hp-work" id="work">
      <div className="sf-container">
        <Chapter label={`(${data.label})`} num={CHAPTER.work} />
        <Reveal as="h2" className="sf-hp-head sf-hp-work__head">
          {data.head}
        </Reveal>
        <WorkGrid statement={data.statement} filters={data.filters} items={data.items} />
      </div>
    </section>
  );
}

/* --- 06 — EDITORIAL RECOGNITION (charcoal) -------------------------------------
   The covers given presence: one row, equal height, deliberate spacing, each
   captioned by publication and issue. The chapter label is the room's name
   (the copy gives it no other headline). */
export function HomePress({ data }: { data: HomeContent['press'] }) {
  return (
    <section className="sf-section sf-room sf-room--charcoal sf-hp-press" id="press">
      <div className="sf-container">
        <Chapter label={`(${data.label})`} num={CHAPTER.press} heading />
        <Reveal as="p" className="sf-hp-lead sf-hp-press__statement">
          {data.statement}
        </Reveal>
        <ul className="sf-hp-press__covers">
          {data.covers.map((c, i) => {
            const issue = c.issue ?? c.caption;
            return (
              <Reveal as="li" className="sf-hp-cover" key={c.image.src} delay={i * 120}>
                <figure className="sf-hp-cover__figure">
                  <span className="sf-hp-cover__print">
                    <Picture plate={c.image} />
                  </span>
                  <figcaption className="sf-hp-cover__caption">
                    <span className="sf-hp-cover__pub">{c.publication}</span>
                    <span className="sf-hp-cover__issue">{issue}</span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* --- 07 — THE SF MUSE JOURNAL (ivory) -------------------------------------------
   An editorial preview: one featured article, three cards, every one a link.
   The thin desk banner is gone (its delivery is an 8:1 strip). Until the
   article pages are built (DECISION-LOG Q1), a card without its own page
   opens the journal. */
export function HomeJournal({ data }: { data: HomeContent['journal'] }) {
  // The copy: "use the same images that you [are] going to use for the
  // journal page for each article". The studio's articles still carry their
  // round-1 hero images, so the preview pins the Journal delivery's image to
  // each title the copy names (as the hero pins its plate); a new article the
  // copy doesn't name keeps its own.
  const pinned = (title: string) =>
    [seedJournal.featured, ...seedJournal.rows].find((a) => a.title === title)?.image;
  const lead = { ...data.featured, image: pinned(data.featured.title) ?? data.featured.image };
  const rows = data.rows.map((r) => ({ ...r, image: pinned(r.title) ?? r.image }));
  return (
    <section className="sf-section sf-room sf-room--ivory sf-hp-journal" id="journal">
      <div className="sf-container">
        <Chapter label="(The Journal)" num={CHAPTER.journal} />
        <div className="sf-hp-masthead">
          <Reveal as="h2" className="sf-hp-head">
            {data.head}
          </Reveal>
          <Reveal as="p" className="sf-hp-body sf-hp-masthead__text" delay={90}>
            {data.statement}
          </Reveal>
        </div>

        <h3 className="sf-hp-kicker sf-hp-journal__label">{data.featuredLabel}</h3>
        <Reveal className="sf-hp-feature">
          <Link className="sf-hp-feature__link" href={lead.href ?? data.more.href}>
            <span className="sf-hp-feature__media">
              <Picture plate={lead.image} />
            </span>
            <span className="sf-hp-feature__body">
              <span className="sf-hp-feature__title">{lead.title}</span>
              <span className="sf-hp-feature__desc">{lead.desc}</span>
              <span className="sf-hp-more">
                {lead.read} <span aria-hidden="true">&#8594;</span>
              </span>
            </span>
          </Link>
        </Reveal>

        <h3 className="sf-hp-kicker sf-hp-journal__label">{data.moreLabel}</h3>
        <ul className="sf-hp-articles">
          {rows.map((row, i) => (
            <Reveal as="li" className="sf-hp-article" key={row.title} delay={i * 90}>
              <Link className="sf-hp-article__link" href={row.href ?? data.more.href}>
                <span className="sf-hp-article__media">
                  <Picture plate={row.image} />
                </span>
                <span className="sf-hp-article__title">{row.title}</span>
                <span className="sf-hp-article__desc">{row.desc}</span>
                <span className="sf-hp-more">
                  {lead.read} <span aria-hidden="true">&#8594;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="sf-hp-journal__more">
          <Link className="sf-btn" href={data.more.href}>
            {data.more.label} <span aria-hidden="true">&#8599;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* --- THE SIGNATURE QUOTE (photograph) -------------------------------------------
   The colonnade stays a photograph: the cover is laid only where the quote
   sits, at about half its round-1 strength, and both lines are set in ivory
   at a measure that never reaches the bright columns. */
export function HomeQuote({ data }: { data: HomeContent['interlude'] }) {
  return (
    <section className="sf-section sf-hp-quote" aria-label="Founder's quote">
      <figure className="sf-hp-quote__media">
        <Picture plate={data.image} />
      </figure>
      <div className="sf-hp-quote__scrim" aria-hidden="true" />
      <div className="sf-container sf-hp-quote__inner">
        <Reveal as="blockquote" className="sf-hp-quote__text">
          <p className="sf-hp-quote__line">{data.quote[0]}</p>
          <p className="sf-hp-quote__line">
            <em>{data.quote[1]}</em>
          </p>
          <footer className="sf-hp-quote__cite">
            <cite className="sf-hp-quote__name">{data.cite}</cite>
            {data.role && <span className="sf-hp-quote__role">{data.role}</span>}
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
