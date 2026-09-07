/**
 * Home sections — ports of src/hero-nocturne.html (commit 7a7bced), section
 * by section, same class names, same grounds, same chapter numbering. All
 * server components; motion enters only via the Reveal / WordReveal wrappers.
 */
import Link from 'next/link';
import Reveal from './Reveal';
import WordReveal from './WordReveal';
import type { Head, Plate } from '@/content/seed';
import type { HomeContent, PressCover } from '@/sanity/fetch';

/** The system's signature device (§06): hairline, label left, numeral right. */
export function Chapter({ label, num }: { label: string; num: number | string }) {
  return (
    <div className="sf-chapter">
      <span className="sf-chapter__label">{label}</span>
      <span className="sf-chapter__num">
        {typeof num === 'number' ? String(num).padStart(2, '0') : num}
      </span>
    </div>
  );
}

/** "Beyond Visibility. <em>Into Memory.</em>" — the felt half in italic. */
export function Headed({ head }: { head: Head }) {
  return (
    <>
      {head[0]}
      {head[1] && <em>{head[1]}</em>}
    </>
  );
}

/* --- 02 — EXPLORE DAR SF (bone salon, amber plate) ------------------------- */

export function Explore({ data }: { data: HomeContent['explore'] }) {
  return (
    <section className="sf-section sf-explore sf-explore--bone" id="explore">
      <div className="sf-container">
        <Chapter label="(Explore Dar SF)" num={2} />
        <div className="sf-explore__grid">
          <div className="sf-explore__body">
            <WordReveal className="sf-explore__statement" text={data.statement} />
            <Reveal as="p" className="sf-explore__felt">
              {data.felt}
            </Reveal>
            <Reveal>
              <Link className="sf-btn" href={data.cta.href}>
                {data.cta.label} <span aria-hidden="true">&#8599;</span>
              </Link>
            </Reveal>
          </div>
          <Reveal as="figure" className="sf-explore__figure" delay={200}>
            <img
              src={data.image.src}
              srcSet={data.image.srcSet}
              sizes={data.image.sizes}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="sf-explore__caption">{data.caption}</figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --- 03 — THE ART OF BRAND PRESENCE (the service catalogue) ---------------- */

export function ServicesList({ data }: { data: HomeContent['services'] }) {
  return (
    <section className="sf-section sf-services sf-services--bone" id="services">
      <div className="sf-container">
        <Chapter label="(Services)" num={3} />
        <div className="sf-services__list">
          {data.map((s) => (
            <Link className="sf-service-row" href={`/services/${s.slug}`} key={s.slug}>
              <span className="sf-service-row__num">{s.num}</span>
              <span className="sf-service-row__tile" aria-hidden="true">
                <img
                  src={s.tile.src}
                  alt=""
                  width={s.tile.width}
                  height={s.tile.height}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="sf-service-row__label">{s.title}</span>
              <span className="sf-service-row__desc">{s.summary}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 04 — WHO WE WORK WITH (the register by lamplight) --------------------- */

export function Clientele({ data }: { data: HomeContent['clientele'] }) {
  return (
    <section className="sf-section sf-clientele sf-clientele--nocturne" id="clientele">
      <div className="sf-container">
        <Chapter label="(Who We Work With)" num={4} />
        <div className="sf-clientele__grid">
          <div className="sf-clientele__aside">
            <Reveal as="h2" className="sf-clientele__head">
              <Headed head={data.head} />
            </Reveal>
            <WordReveal className="sf-clientele__statement" text={data.statement} />
          </div>
          <ul className="sf-clientele__register">
            {data.rows.map(([label, description], i) => (
              <Reveal as="li" className="sf-clientele__row" key={label}>
                <span className="sf-clientele__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sf-clientele__label">{label}</span>
                <span className="sf-clientele__desc">{description}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --- 05 — ABOUT DAR SF (the founder, the signature) ------------------------ */

export function Founder({ data }: { data: HomeContent['founder'] }) {
  return (
    <section className="sf-section sf-founder sf-founder--bone" id="founder">
      <div className="sf-container">
        <Chapter label="(About Dar SF)" num={5} />
        <div className="sf-founder__grid">
          <Reveal as="figure" className="sf-founder__figure" delay={200}>
            <img
              src={data.image.src}
              srcSet={data.image.srcSet}
              sizes={data.image.sizes}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="sf-founder__caption">{data.caption}</figcaption>
          </Reveal>

          <div className="sf-founder__body">
            <Reveal as="h2" className="sf-founder__refrain">
              <Headed head={data.refrain} />
            </Reveal>
            {data.texts.map((t) => (
              <Reveal as="p" className="sf-founder__text" key={t.slice(0, 24)}>
                {t}
              </Reveal>
            ))}
            <Reveal as="p" className="sf-founder__felt">
              {data.felt}
            </Reveal>

            {/* THE SIGNATURE: the rule spans the column; the name at the left
                hand, the founder's hand at the right. */}
            <Reveal className="sf-founder__foot">
              <div className="sf-founder__credit">
                <span className="sf-founder__name">{data.name}</span>
                <span className="sf-founder__role">{data.role}</span>
              </div>
              <img
                className="sf-founder__signature"
                src={data.signature.src}
                alt=""
                width={data.signature.width}
                height={data.signature.height}
                loading="lazy"
                decoding="async"
              />
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

/* --- 07 — EDITORIAL RECOGNITION (the press salon) --------------------------- */

export function PressSalon({
  data,
  chapter = 7,
}: {
  data: HomeContent['press'];
  chapter?: number | string;
}) {
  return (
    <section className="sf-section sf-press" id="press">
      <div className="sf-container">
        <Chapter label="(Editorial Recognition)" num={chapter} />
        <div className="sf-press__grid">
          <div className="sf-press__spine">
            <Reveal as="h2" className="sf-press__head">
              <Headed head={data.head} />
            </Reveal>
            <Reveal as="p" className="sf-press__statement">
              {data.statement}
            </Reveal>
            <div className="sf-press__stats">
              {data.stats.map(([figure, label], i) => (
                <Reveal className="sf-press__stat" key={label} delay={i * 90}>
                  <span className="sf-press__stat-num">
                    {figure.replace(/\++$/, '')}
                    <em>+</em>
                  </span>
                  <span className="sf-press__stat-label">{label}</span>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="sf-press__covers">
              {data.covers.map((cover, i) => (
                <CoverPlate key={cover.caption} cover={cover} delay={i * 90} mod={i} />
              ))}
            </div>
            <Reveal as="p" className="sf-press__caption sf-press__caption--shared">
              {data.sharedCaption}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverPlate({ cover, delay, mod }: { cover: PressCover; delay?: number; mod?: number }) {
  const modClass =
    mod === 1 ? ' sf-press__cover--b' : mod === 2 ? ' sf-press__cover--c' : '';
  return (
    <Reveal as="figure" className={`sf-press__cover${modClass}`} delay={delay}>
      <img
        src={cover.image.src}
        srcSet={cover.image.srcSet}
        sizes={cover.image.sizes}
        alt={cover.image.alt}
        width={cover.image.width}
        height={cover.image.height}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="sf-press__caption">{cover.caption}</figcaption>
    </Reveal>
  );
}

/* --- 08 — THE DAR SF JOURNAL (the contents page) ---------------------------- */

export function JournalIndex({ data }: { data: HomeContent['journal'] }) {
  return (
    <section className="sf-section sf-journal" id="journal">
      <div className="sf-container">
        <Chapter label="(The Journal)" num={8} />

        <div className="sf-journal__masthead">
          <Reveal as="h2" className="sf-journal__head">
            {data.head}
          </Reveal>
          <Reveal className="sf-journal__intro" delay={90}>
            <p className="sf-journal__statement">{data.statement}</p>
            <p className="sf-journal__sub">{data.sub}</p>
          </Reveal>
        </div>

        <Reveal>
          {data.lead.href ? (
            <Link className="sf-feature" href={data.lead.href}>
              <FeatureInner lead={data.lead} withLink />
            </Link>
          ) : (
            <div className="sf-feature">
              <FeatureInner lead={data.lead} />
            </div>
          )}
        </Reveal>

        <div className="sf-journal__index">
          {data.rows.map((row, i) => (
            <Row key={row.num} row={row} last={i === data.rows.length - 1} delay={i * 90} />
          ))}
        </div>

        <Reveal>
          <Link className="sf-journal__more" href="/journal">
            Explore The Journal <span aria-hidden="true">&#8599;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* The screening room: the featured editorial as a cinemascope still hung in
 * an umber panel — the hero's frame, grade and crossing title at journal
 * scale. The whole panel is the link; the title is said once. */
function FeatureInner({
  lead,
  withLink = false,
}: {
  lead: HomeContent['journal']['lead'];
  withLink?: boolean;
}) {
  return (
    <>
      <div className="sf-feature__rule">
        <span className="sf-feature__label">(Featured Editorial)</span>
        <span className="sf-feature__num">{lead.num}</span>
      </div>

      <figure className="sf-feature__plate">
        <img
          src={lead.image.src}
          srcSet={lead.image.srcSet}
          sizes={lead.image.sizes}
          alt={lead.image.alt}
          width={lead.image.width}
          height={lead.image.height}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <h3 className="sf-feature__title">
        <Headed head={lead.title} />
      </h3>

      <div className="sf-feature__foot">
        <p className="sf-feature__desc">{lead.desc}</p>
        {withLink && (
          <span className="sf-feature__more">
            Read Article <span aria-hidden="true">&#8599;</span>
          </span>
        )}
      </div>
    </>
  );
}

function Row({
  row,
  last,
  delay,
}: {
  row: HomeContent['journal']['rows'][number];
  last: boolean;
  delay?: number;
}) {
  const cls = `sf-journal__row${last ? ' sf-journal__row--last' : ''}`;
  const inner = (
    <>
      <span className="sf-journal__row-num">{row.num}</span>
      <figure className="sf-journal__row-thumb">
        <img
          src={row.image.src}
          srcSet={row.image.srcSet}
          sizes={row.image.sizes}
          alt={row.image.alt}
          width={row.image.width}
          height={row.image.height}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="sf-journal__row-text">
        <span className="sf-journal__cat">{row.category}</span>
        <span className="sf-journal__row-title">{row.title}</span>
        <span className="sf-journal__row-desc">{row.desc}</span>
      </div>
      <span className="sf-journal__row-read">
        Read <span aria-hidden="true">&#8594;</span>
      </span>
    </>
  );
  return (
    <Reveal delay={delay}>
      {row.href ? (
        <Link className={cls} href={row.href}>
          {inner}
        </Link>
      ) : (
        <span className={cls}>{inner}</span>
      )}
    </Reveal>
  );
}

/* --- INTERLUDE — the signature quote (the page's held breath) --------------- */

export function Interlude({
  image,
  quote,
  cite,
}: {
  image: Plate;
  quote: Head;
  cite: string;
}) {
  return (
    <section className="sf-section sf-interlude" aria-label="Founder's quote">
      <figure className="sf-interlude__media">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="sf-interlude__scrim" aria-hidden="true" />
      <Reveal as="blockquote" className="sf-interlude__quote">
        {quote[0]} <em>{quote[1]}</em>{' '}
        <cite className="sf-interlude__cite">{cite}</cite>
      </Reveal>
    </section>
  );
}

/* --- 09 — CORRESPONDENCE + CTA (import the form from its own client file) --- */

export { default as NewsletterSection } from './NewsletterSection';
export { default as ClosingCard } from './ClosingCard';
