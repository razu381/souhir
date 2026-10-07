import type { Metadata } from 'next';
import { Chapter, Headed } from '@/components/sf/HomeSections';
import { HeaderSentinel } from '@/components/sf/PageTitle';
import ClosingCard from '@/components/sf/ClosingCard';
import Picture from '@/components/sf/Picture';
import Reveal from '@/components/sf/Reveal';
import ValueIcon from '@/components/sf/ValueIcon';
import WordReveal from '@/components/sf/WordReveal';
import * as about from '@/content/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'SF Muse exists at the intersection of creativity, strategy, and human connection, crafting brands and experiences designed to inspire, resonate, and endure.',
};

/**
 * More Than A Studio — the client's final About copy
 * (SF_Muse_Website_Copy_Shorter_Updated.docx, ABOUT PAGE), section for
 * section. The frame is the homepage's: a black hero, then rooms alternating
 * champagne and sable (about.css), the footer black.
 */
export default function AboutPage() {
  const { hero, founder, philosophy, way, difference, vision, values, closing } = about;

  return (
    <main id="main" className="sf-about">
      {/* HERO — the title and its three lines left, the alcove hung right. */}
      <section className="sf-about-hero">
        <div className="sf-container sf-about-hero__grid">
          <h1 className="sf-about-hero__title">
            <Headed head={hero.title} />
          </h1>
          <Reveal as="figure" className="sf-about-hero__figure" curtain>
            <Picture plate={hero.image} loading="eager" />
          </Reveal>
          <div className="sf-about-hero__body">
            <p className="sf-about-hero__lead">{hero.lead}</p>
            {hero.texts.map((t) => (
              <p className="sf-about-hero__text" key={t.slice(0, 24)}>
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>
      <HeaderSentinel />

      {/* 01 — FOUNDER STORY: the portrait holds left while the story reads. */}
      <section className="sf-section sf-room sf-about-founder" id="founder-story">
        <div className="sf-container">
          <Chapter label={`(${founder.label})`} num={1} />
          <div className="sf-about-split">
            <Reveal as="figure" className="sf-about-split__figure" delay={150} curtain>
              <Picture plate={founder.image} />
            </Reveal>
            <div className="sf-about-split__body">
              <Reveal as="h2" className="sf-room__head">
                <Headed head={founder.head} />
              </Reveal>
              <Reveal as="h3" className="sf-room__subhead" delay={90}>
                {founder.subhead}
              </Reveal>
              {founder.texts.map((t, i) => (
                <Reveal
                  as="p"
                  className={i === 0 ? 'sf-room__lead' : 'sf-room__text'}
                  key={t.slice(0, 24)}
                >
                  {t}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — THE PHILOSOPHY: mirrored, the plate right. The homepage's
          "Explore Our Philosophy" lands here. */}
      <section className="sf-section sf-room sf-room--sable" id="philosophy">
        <div className="sf-container">
          <Chapter label={`(${philosophy.label})`} num={2} heading />
          <div className="sf-about-split sf-about-split--mirror">
            <div className="sf-about-split__body">
              <Reveal as="p" className="sf-room__statement">
                <Headed head={philosophy.statement} />
              </Reveal>
              {philosophy.texts.map((t) => (
                <Reveal as="p" className="sf-room__text" key={t.slice(0, 24)}>
                  {t}
                </Reveal>
              ))}
            </div>
            <Reveal as="figure" className="sf-about-split__figure" delay={150} curtain>
              <Picture plate={philosophy.image} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — THE SF MUSE WAY: the creed, then six principles. */}
      <section className="sf-section sf-room sf-about-way" id="the-sf-muse-way">
        <div className="sf-container">
          <Chapter label={`(${way.label})`} num={3} heading />
          <WordReveal className="sf-about-way__intro" text={way.intro} />
          <ol className="sf-about-way__list">
            {way.principles.map(([num, title, text], i) => (
              <Reveal as="li" className="sf-about-way__item" key={num} delay={(i % 3) * 90}>
                <span className="sf-about-way__num" aria-hidden="true">
                  {num}
                </span>
                <h3 className="sf-about-way__title">{title}</h3>
                <p className="sf-about-way__text">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — THE SF MUSE DIFFERENCE: one question, at the scale of the page. */}
      <section className="sf-section sf-room sf-room--sable sf-about-diff">
        <div className="sf-container">
          <Chapter label={`(${difference.label})`} num={4} />
          <Reveal as="h2" className="sf-room__head sf-about-diff__head">
            <Headed head={difference.head} />
          </Reveal>
          <Reveal as="p" className="sf-about-diff__lead" delay={90}>
            {difference.lead}
          </Reveal>
          <Reveal as="p" className="sf-about-diff__question" delay={180}>
            {difference.question}
          </Reveal>
        </div>
      </section>

      {/* 05 — THE VISION: one sentence, read word by word. */}
      <section className="sf-section sf-room sf-about-vision">
        <div className="sf-container">
          <Chapter label={`(${vision.label})`} num={5} heading />
          <WordReveal className="sf-about-vision__statement" text={vision.statement} />
        </div>
      </section>

      {/* 06 — OUR VALUES: the client's icon set, three by two. */}
      <section className="sf-section sf-room sf-room--sable sf-about-values">
        <div className="sf-container">
          <Chapter label={`(${values.label})`} num={6} heading />
          <ul className="sf-about-values__grid">
            {values.items.map((v, i) => (
              <Reveal as="li" className="sf-about-values__item" key={v.title} delay={(i % 3) * 90}>
                <ValueIcon name={v.icon} className="sf-about-values__icon" />
                <div>
                  <h3 className="sf-about-values__title">{v.title}</h3>
                  <p className="sf-about-values__text">
                    {v.text.map((line, j) => (
                      <span key={line}>
                        {j > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCard head={closing.head} text={closing.texts} cta={closing.cta} rule={false} />
    </main>
  );
}
