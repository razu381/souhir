import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { HeaderSentinel } from '@/components/sf/PageTitle';
import Picture from '@/components/sf/Picture';
import Reveal from '@/components/sf/Reveal';
import ValueIcon from '@/components/sf/ValueIcon';
import * as about from '@/content/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Discover the perspective behind SF Muse: creative direction, visual campaigns, brand identity, digital design and marketing strategy guided by clarity.',
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

export default function AboutPage() {
  const { hero, founder, way, difference, guides, closing } = about;

  return (
    <main id="main" className="sf-about">
      {/* HERO — the studio fills the background, with words on its shadowed left. */}
      <section className="sf-section sf-room sf-room--charcoal sf-about-hero">
        <figure className="sf-about-hero__figure">
          <Picture plate={hero.image} loading="eager" />
        </figure>
        <div className="sf-container">
          <div className="sf-about-hero__words">
            <p className="sf-about-kicker">{hero.label}</p>
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
                <p className="sf-about-founder__name">{founder.name}</p>
                <p className="sf-about-founder__role">{founder.role}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="sf-section sf-room sf-room--charcoal sf-about-way" id="the-sf-muse-way">
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

      <section className="sf-section sf-room sf-room--charcoal sf-about-diff" id="philosophy">
        <figure className="sf-about-diff__figure"><Picture plate={difference.image} /></figure>
        <div className="sf-container">
          <div className="sf-about-diff__words">
            <Reveal as="p" className="sf-about-kicker">{difference.label}</Reveal>
            <Reveal as="h2" className="sf-about-head">{difference.head}</Reveal>
            <Reveal className="sf-about-diff__statements">
              {difference.statements.map((text) => <p className="sf-about-body" key={text}>{text}</p>)}
            </Reveal>
            <Reveal as="p" className="sf-about-body">{difference.lead}</Reveal>
            <Reveal as="p" className="sf-about-diff__question">{difference.question}</Reveal>
            <Reveal as="p" className="sf-about-body">{difference.text}</Reveal>
          </div>
        </div>
      </section>

      <section className="sf-section sf-room sf-room--ivory sf-about-guides" aria-labelledby="work-guides">
        <div className="sf-container sf-about-guides__layout">
          <h2 className="sf-about-head" id="work-guides">{guides.title}</h2>
          <ul className="sf-about-guides__list">
            {guides.items.map((guide, i) => (
              <li className="sf-about-guides__item" key={guide.icon} style={{ '--guide-index': i } as CSSProperties}>
                <ValueIcon name={guide.icon} className="sf-about-guides__icon" />
                <div className="sf-about-guides__copy">
                  <h3 className="sf-about-cell-title">{guide.title}</h3>
                  <p className="sf-about-cell-text">{guide.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sf-section sf-room sf-room--charcoal sf-about-close" aria-labelledby="about-close">
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
