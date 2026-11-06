import type { Metadata } from 'next';
import Link from 'next/link';
import { HeaderSentinel } from '@/components/sf/PageTitle';
import Picture from '@/components/sf/Picture';
import Reveal from '@/components/sf/Reveal';
import ValueIcon from '@/components/sf/ValueIcon';
import * as about from '@/content/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'SF Muse exists at the intersection of creativity, strategy, and human connection, crafting brands and experiences designed to inspire, resonate, and endure.',
};

/** Hand-broken heading lines: one block per line, with a space between them
 *  so the accessible name reads as the sentence it is. */
function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span className="sf-about-line" key={line}>
          {line}
          {i < lines.length - 1 && ' '}
        </span>
      ))}
    </>
  );
}

/**
 * More Than A Studio — the client's final About copy
 * (SF_Muse_Website_Copy_Shorter_Updated.docx, ABOUT PAGE), section for
 * section, in round 2's presentation (docs/plans/12-about-round-2.md): her
 * colour flow — charcoal, ivory, charcoal, ivory, deep brown, ivory, brown —
 * and a composition of its own for each section (about.css).
 */
export default function AboutPage() {
  const { hero, founder, philosophy, way, difference, vision, values, closing } = about;

  return (
    <main id="main" className="sf-about">
      {/* HERO — the studio fills the background, with words on its shadowed left. */}
      <section className="sf-section sf-room sf-room--charcoal sf-about-hero">
        <figure className="sf-about-hero__figure">
          <Picture plate={hero.image} loading="eager" />
        </figure>
        <div className="sf-container">
          <div className="sf-about-hero__words">
            <h1 className="sf-about-hero__title">
              <span className="sf-about-hero__lines">
                <Lines lines={hero.lines} />
              </span>{' '}
              <em className="sf-about-hero__voice">
                <Lines lines={hero.voice} />
              </em>
            </h1>
            <p className="sf-about-hero__lead">{hero.lead}</p>
            {hero.texts.map((t) => (
              <p className="sf-about-body" key={t.slice(0, 24)}>
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>
      <HeaderSentinel />

      {/* FOUNDER STORY — the headline across the top; the portrait and the
          story beneath it, the same height, her signature on the portrait's
          foot. */}
      <section className="sf-section sf-room sf-room--ivory sf-about-founder" id="founder-story">
        <div className="sf-container">
          <Reveal as="p" className="sf-about-kicker">
            {founder.label}
          </Reveal>
          <Reveal as="h2" className="sf-about-head sf-about-founder__head">
            <Lines lines={founder.head} />
          </Reveal>
          <div className="sf-about-founder__grid">
            <Reveal as="figure" className="sf-about-founder__figure" curtain>
              <Picture plate={founder.image} />
            </Reveal>
            <div className="sf-about-founder__body">
              <Reveal as="h3" className="sf-about-subhead">
                {founder.subhead}
              </Reveal>
              <Reveal className="sf-about-founder__story" delay={90}>
                {founder.texts.map((t, i) => (
                  <p className={i === 0 ? 'sf-about-founder__lead' : 'sf-about-body'} key={t.slice(0, 24)}>
                    {t}
                  </p>
                ))}
              </Reveal>
              <Reveal className="sf-about-founder__sign" delay={180}>
                <Picture plate={founder.signature} className="sf-about-founder__signature" />
                <p className="sf-about-founder__name">
                  <span className="sf-about-founder__who">{founder.name}</span>{' '}
                  <span className="sf-about-founder__role">— {founder.role}</span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* THE PHILOSOPHY — the colonnade, whole, bleeding off the LEFT edge
          beside a charcoal panel. The homepage's "Explore Our Philosophy"
          lands here. */}
      <section className="sf-section sf-room sf-room--charcoal sf-about-philo" id="philosophy">
        <Reveal as="figure" className="sf-about-philo__figure" curtain>
          <Picture plate={philosophy.image} />
        </Reveal>
        <div className="sf-about-philo__panel">
          <Reveal as="p" className="sf-about-kicker">
            {philosophy.label}
          </Reveal>
          <Reveal as="h2" className="sf-about-philo__statement" delay={90}>
            <span className="sf-about-line">{philosophy.statement[0]}</span>{' '}
            <span className="sf-about-line sf-about-philo__second">{philosophy.statement[1]}</span>
          </Reveal>
          {philosophy.texts.map((t, i) => (
            <Reveal as="p" className="sf-about-body" key={t.slice(0, 24)} delay={180 + i * 90}>
              {t}
            </Reveal>
          ))}
        </div>
      </section>

      {/* THE SF MUSE WAY — the heading and the creed on one baseline, then
          the six principles, three by two, aligned row by row. */}
      <section className="sf-section sf-room sf-room--ivory sf-about-way" id="the-sf-muse-way">
        <div className="sf-container">
          <div className="sf-about-masthead">
            <Reveal as="h2" className="sf-about-head">
              {way.title}
            </Reveal>
            <Reveal as="p" className="sf-about-way__intro" delay={90}>
              {way.intro}
            </Reveal>
          </div>
          <ol className="sf-about-way__list">
            {way.principles.map(([num, title, text], i) => (
              <Reveal as="li" className="sf-about-way__item" key={num} delay={(i % 3) * 60}>
                <span className="sf-about-way__num" aria-hidden="true">
                  {num}
                </span>
                <h3 className="sf-about-cell-title">{title}</h3>
                <p className="sf-about-cell-text">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* THE SF MUSE DIFFERENCE — one compact, centred pause on deep brown. */}
      <section className="sf-section sf-room sf-room--brown sf-about-diff">
        <div className="sf-container sf-about-diff__inner">
          <Reveal as="p" className="sf-about-kicker">
            {difference.label}
          </Reveal>
          <Reveal as="h2" className="sf-about-diff__head" delay={90}>
            {difference.head}
          </Reveal>
          <Reveal className="sf-about-diff__ask" delay={180}>
            <p className="sf-about-diff__lead">{difference.lead}</p>
            <p className="sf-about-diff__question">{difference.question}</p>
          </Reveal>
        </div>
      </section>

      {/* THE VISION · OUR VALUES — one ivory room: the headings down a left
          column, the sentence and the six values to their right. */}
      <section className="sf-section sf-room sf-room--ivory sf-about-vision" aria-labelledby="the-vision">
        <div className="sf-container sf-about-rail">
          <Reveal as="h2" className="sf-about-head sf-about-rail__head">
            <span id="the-vision">{vision.title}</span>
          </Reveal>
          <Reveal as="p" className="sf-about-vision__statement" delay={90}>
            {vision.statement.split('—').map((part, i) => (
              <span key={part.slice(0, 12)}>
                {i > 0 && <span className="sf-about-dash">—</span>}
                {part}
              </span>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="sf-section sf-room sf-room--ivory sf-about-values" aria-labelledby="our-values">
        <div className="sf-container sf-about-rail">
          <Reveal as="h2" className="sf-about-head sf-about-rail__head">
            <span id="our-values">{values.title}</span>
          </Reveal>
          <ul className="sf-about-values__grid">
            {values.items.map((v, i) => (
              <Reveal as="li" className="sf-about-values__item" key={v.title} delay={(i % 2) * 60}>
                <ValueIcon name={v.icon} className="sf-about-values__icon" />
                <h3 className="sf-about-cell-title">{v.title}</h3>
                <p className="sf-about-cell-text">
                  {v.text.map((line, j) => (
                    <span key={line}>
                      {j > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CLOSING — the invitation on deep brown, the notebook and pen hung
          beside it, bleeding off the right edge. */}
      <section className="sf-section sf-room sf-room--brown sf-about-close" aria-labelledby="about-close">
        <div className="sf-container">
          <div className="sf-about-close__words">
            <Reveal as="h2" className="sf-about-close__title">
              <span id="about-close">
                <span className="sf-about-line">{closing.head[0]}</span>{' '}
                <em className="sf-about-line">{closing.head[1]}</em>
              </span>
            </Reveal>
            <Reveal className="sf-about-close__text" delay={90}>
              {closing.texts.map((t) => (
                <p className="sf-about-body" key={t.slice(0, 24)}>
                  {t}
                </p>
              ))}
            </Reveal>
            <Reveal className="sf-about-close__action" delay={180}>
              <Link className="sf-btn" href={closing.cta.href}>
                {closing.cta.label} <span aria-hidden="true">&#8599;</span>
              </Link>
            </Reveal>
          </div>
        </div>
        <Reveal as="figure" className="sf-about-close__figure" curtain>
          <Picture plate={closing.image} />
        </Reveal>
      </section>
    </main>
  );
}
