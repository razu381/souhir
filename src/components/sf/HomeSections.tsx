/**
 * Home sections — ports of src/hero-nocturne.html (commit 7a7bced), section
 * by section, same class names, same grounds, same chapter numbering, re-set
 * to the client's final copy (Oct 2026). All server components; motion
 * enters only via the Reveal / WordReveal wrappers.
 */
import Link from 'next/link';
import Reveal from './Reveal';
import WordReveal from './WordReveal';
import PressCovers from './PressCovers';
import JournalStack from './JournalStack';
import Picture from './Picture';
import type { Head, Plate } from '@/content/seed';
import type { HomeContent } from '@/sanity/fetch';
import { CHAPTER } from '@/content/chapters';

/**
 * The system's signature device (§06): hairline, label left, numeral right.
 *
 * `heading` promotes the label to the section's <h2>. Explore, Services and
 * Selected Works carry no display headline — their chapter label IS the only
 * name the section has — so without this they were absent from the document
 * outline entirely, and a reader navigating by heading skipped straight past
 * the service catalogue and the portfolio. The rendering is byte-identical;
 * only the element changes.
 */
export function Chapter({
  label,
  num,
  heading = false,
}: {
  label: string;
  num: number | string;
  heading?: boolean;
}) {
  const Label = heading ? 'h2' : 'span';
  return (
    <div className="sf-chapter">
      <Label className="sf-chapter__label">{label}</Label>
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

/* --- 01 — EXPLORE SF MUSE (bone salon, two plates) ------------------------- */

export function Explore({ data }: { data: HomeContent['explore'] }) {
  return (
    <section className="sf-section sf-explore sf-explore--bone" id="explore">
      <div className="sf-container">
        <Chapter label={`(${data.heading})`} num={CHAPTER.explore} heading />
        <div className="sf-explore__grid">
          <div className="sf-explore__body">
            <WordReveal className="sf-explore__statement" text={data.statement} />
            {data.body.map((text, i) => (
              <Reveal as="p" className="sf-explore__text" key={text.slice(0, 24)} delay={i * 90}>
                {text}
              </Reveal>
            ))}
          </div>
          {/* The studio wall hangs as the plate; the shoot in motion is pinned
              over its lower corner, a contact print laid on the wall. */}
          <div className="sf-explore__plates">
            <Reveal as="figure" className="sf-explore__figure" delay={200} curtain>
              <Picture plate={data.image} />
            </Reveal>
            <Reveal as="figure" className="sf-explore__inset" delay={420} curtain>
              <Picture plate={data.inset} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- 02 — WHAT WE CREATE (the service catalogue, as visual blocks) --------- */

/**
 * `intro` is the homepage's headline and standfirst. Without it (the
 * /services page) the chapter label stays the section's only name and is
 * promoted to its <h2>, as before.
 */
export function ServicesList({
  data,
  intro,
}: {
  data: HomeContent['services'];
  intro?: HomeContent['servicesIntro'];
}) {
  return (
    <section className="sf-section sf-services sf-services--bone" id="services">
      <div className="sf-container">
        <Chapter label={`(${intro?.label ?? 'Services'})`} num={CHAPTER.services} heading={!intro} />
        {intro && (
          <div className="sf-services__masthead">
            <Reveal as="h2" className="sf-services__head">
              {intro.head}
            </Reveal>
            <Reveal as="p" className="sf-services__intro" delay={90}>
              {intro.text}
            </Reveal>
          </div>
        )}
        <ul className="sf-services__blocks">
          {data.map((s, i) => (
            <Reveal as="li" className="sf-service-block" key={s.slug} delay={i * 90}>
              <Link className="sf-service-block__link" href={`/services#${s.slug}`}>
                <span className="sf-service-block__plate" aria-hidden="true">
                  <Picture plate={s.tile} />
                </span>
                <span className="sf-service-block__num">{s.num}</span>
                <h3 className="sf-service-block__title">{s.title}</h3>
                <p className="sf-service-block__desc">{s.summary}</p>
                <span className="sf-service-block__more">
                  {intro?.more ?? 'Learn More'} <span aria-hidden="true">&#8594;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --- 03 — WHO WE WORK WITH (the register by lamplight) --------------------- */

export function Clientele({ data }: { data: HomeContent['clientele'] }) {
  return (
    <section className="sf-section sf-clientele sf-clientele--nocturne" id="clientele">
      <div className="sf-container">
        <Chapter label="(Who We Work With)" num={CHAPTER.clientele} />
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

/* --- 04 — ABOUT SF MUSE (the founder, the signature) ----------------------- */

export function Founder({ data }: { data: HomeContent['founder'] }) {
  return (
    <section className="sf-section sf-founder sf-founder--bone" id="founder">
      <div className="sf-container">
        <Chapter label="(About SF Muse)" num={CHAPTER.founder} />
        <div className="sf-founder__grid">
          <Reveal as="figure" className="sf-founder__figure" delay={200} curtain>
            <Picture plate={data.image} />
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

/* --- 06 — EDITORIAL RECOGNITION (the press salon) --------------------------- */

/**
 * `compact` is the homepage's reading of the final copy: the chapter label
 * is the section's name (promoted to its <h2>), one sentence, the covers
 * captioned by publication. The /editorial page keeps the headline, the
 * register of numbers and the dated captions.
 */
export function PressSalon({
  data,
  chapter = CHAPTER.press,
  compact = false,
}: {
  data: HomeContent['press'];
  chapter?: number | string;
  compact?: boolean;
}) {
  const covers = compact
    ? data.covers.map((c) => ({ ...c, caption: c.publication || c.caption }))
    : data.covers;
  return (
    <section className={`sf-section sf-press${compact ? ' sf-press--compact' : ''}`} id="press">
      <div className="sf-container">
        <Chapter label={`(${data.label})`} num={chapter} heading={compact} />
        <div className="sf-press__grid">
          <div className="sf-press__spine">
            {!compact && (
              <Reveal as="h2" className="sf-press__head">
                <Headed head={data.head} />
              </Reveal>
            )}
            <Reveal as="p" className="sf-press__statement">
              {data.statement}
            </Reveal>
            {!compact && (
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
            )}
          </div>

          <div>
            <PressCovers covers={covers} />
            <Reveal as="p" className="sf-press__caption sf-press__caption--shared">
              {compact ? covers.map((c) => c.caption).join(' · ') : data.sharedCaption}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- 07 — THE SF MUSE JOURNAL (the contents page) --------------------------- */

/**
 * `categories={false}` is the homepage: its copy names the essays without
 * their perspectives. /journal keeps them.
 */
export function JournalIndex({
  data,
  categories = true,
}: {
  data: HomeContent['journal'];
  categories?: boolean;
}) {
  const lead = data.featured;
  const leadBody = (
    <>
      <figure className="sf-journal__lead-plate">
        <Picture plate={lead.image} />
      </figure>
      <div className="sf-journal__lead-text">
        {categories && lead.category && <span className="sf-journal__cat">{lead.category}</span>}
        <h4 className="sf-journal__lead-title">{lead.title}</h4>
        <p className="sf-journal__lead-desc">{lead.desc}</p>
        <span className="sf-journal__lead-read">
          {lead.read} <span aria-hidden="true">&#8594;</span>
        </span>
      </div>
    </>
  );

  return (
    <section className="sf-section sf-journal" id="journal">
      <div className="sf-container">
        <Chapter label="(The Journal)" num={CHAPTER.journal} />

        <div className="sf-journal__masthead">
          <Reveal as="h2" className="sf-journal__head">
            {data.head}
          </Reveal>
          <Reveal className="sf-journal__intro" delay={90}>
            <p className="sf-journal__statement">{data.statement}</p>
          </Reveal>
        </div>

        <Reveal as="figure" className="sf-journal__banner" curtain>
          <Picture plate={data.banner} />
        </Reveal>

        <h3 className="sf-journal__sublabel">{data.featuredLabel}</h3>
        <Reveal className="sf-journal__lead-wrap">
          {lead.href ? (
            <Link className="sf-journal__lead" href={lead.href}>
              {leadBody}
            </Link>
          ) : (
            <div className="sf-journal__lead">{leadBody}</div>
          )}
        </Reveal>

        <h3 className="sf-journal__sublabel">{data.moreLabel}</h3>
        <JournalStack>
          {data.rows.map((row, i) => (
            <Row
              key={row.num}
              row={categories ? row : { ...row, category: undefined }}
              last={i === data.rows.length - 1}
              delay={i * 90}
            />
          ))}
        </JournalStack>

        <Reveal>
          <Link className="sf-journal__more" href={data.more.href}>
            {data.more.label} <span aria-hidden="true">&#8599;</span>
          </Link>
        </Reveal>
      </div>
    </section>
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
        <Picture plate={row.image} />
      </figure>
      <div className="sf-journal__row-text">
        {row.category && <span className="sf-journal__cat">{row.category}</span>}
        <h4 className="sf-journal__row-title">{row.title}</h4>
        <span className="sf-journal__row-desc">{row.desc}</span>
      </div>
      <span className="sf-journal__row-read" aria-hidden="true">
        <span>&#8594;</span>
      </span>
    </>
  );
  return (
    /* The class rides the Reveal wrapper: it is the sticky card in the
       JournalStack (site.css), while the .sf-journal__row inside it is
       the opaque sheet that covers the previous card. */
    <Reveal className="sf-journal__card" delay={delay}>
      {row.href ? (
        <Link className={cls} href={row.href}>
          {inner}
        </Link>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </Reveal>
  );
}

/* --- INTERLUDE — the signature quote (the page's held breath) --------------- */

export function Interlude({
  image,
  quote,
  cite,
  role,
}: {
  image: Plate;
  quote: Head;
  cite: string;
  role?: string;
}) {
  return (
    <section className="sf-section sf-interlude" aria-label="Founder's quote">
      <figure className="sf-interlude__media">
        <Picture plate={image} />
      </figure>
      <div className="sf-interlude__scrim" aria-hidden="true" />
      {/* The quote sits in the page's own left column rather than centred on
          the band — see the note in components.css. */}
      <div className="sf-container sf-interlude__inner">
        <Reveal as="blockquote" className="sf-interlude__quote">
          <span className="sf-interlude__line">{quote[0]}</span>
          <em>{quote[1]}</em>
          <cite className="sf-interlude__cite">
            <span className="sf-interlude__cite-name">{cite}</span>
            {role && <span className="sf-interlude__cite-role">{role}</span>}
          </cite>
        </Reveal>
      </div>
    </section>
  );
}

/* --- 08 — NEWSLETTER + CTA (import the form from its own client file) ------ */

export { default as NewsletterSection } from './NewsletterSection';
export { default as ClosingCard } from './ClosingCard';
