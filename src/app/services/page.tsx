import type { Metadata } from 'next';
import { Chapter, Headed } from '@/components/sf/HomeSections';
import { HeaderSentinel } from '@/components/sf/PageTitle';
import Picture from '@/components/sf/Picture';
import Reveal from '@/components/sf/Reveal';
import * as content from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Through visual storytelling, creative direction, digital experiences, and intelligent growth systems, SF Muse helps brands transform ideas into experiences designed to endure.',
};

/**
 * Shaping Perception Through Experience — the client's final Services copy
 * (SF_Muse_Website_Copy_Shorter_Updated.docx, SERVICES PAGE), section for
 * section, on the homepage's frame: a black hero, then rooms alternating
 * champagne and sable (services.css), the footer black.
 */
export default function ServicesPage() {
  const { hero, create, services, method } = content;

  return (
    <main id="main" className="sf-svc">
      {/* HERO — the studio under its spotlight, the words in its dark third. */}
      <section className="sf-svc-hero">
        <figure className="sf-svc-hero__media">
          <Picture plate={hero.image} loading="eager" />
        </figure>
        <div className="sf-svc-hero__scrim" aria-hidden="true" />
        <div className="sf-container sf-svc-hero__inner">
          <h1 className="sf-svc-hero__title">
            <Headed head={hero.title} />
          </h1>
          <div className="sf-svc-hero__body">
            {hero.texts.map((t) => (
              <p className="sf-svc-hero__text" key={t.slice(0, 24)}>
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>
      <HeaderSentinel />

      {/* 01 — WHAT WE CREATE: the masthead, then the four services, each its
          own room, the plate alternating sides. */}
      <section className="sf-section sf-room sf-svc-create">
        <div className="sf-container">
          <Chapter label={`(${create.label})`} num={1} />
          <div className="sf-svc-create__masthead">
            <Reveal as="h2" className="sf-room__head">
              <Headed head={create.head} />
            </Reveal>
            <Reveal as="p" className="sf-room__lead" delay={90}>
              {create.text}
            </Reveal>
          </div>
        </div>
      </section>

      {services.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`sf-section sf-room sf-svc-service${i % 2 === 0 ? ' sf-room--sable' : ' sf-svc-service--mirror'}`}
          aria-labelledby={`${s.id}-title`}
        >
          <div className="sf-container sf-svc-service__grid">
            <Reveal as="figure" className="sf-svc-service__figure" curtain>
              <Picture plate={s.image} />
            </Reveal>
            <div className="sf-svc-service__body">
              <Reveal as="p" className="sf-svc-service__label">
                {s.label}
              </Reveal>
              <Reveal as="h3" className="sf-svc-service__title" delay={60}>
                <span id={`${s.id}-title`}>{s.title}</span>
              </Reveal>
              <Reveal as="p" className="sf-room__text sf-svc-service__text" delay={120}>
                {s.text}
              </Reveal>
              <Reveal className="sf-svc-service__includes" delay={180}>
                <p className="sf-svc-service__includes-label">{s.includesLabel}</p>
                <ul className="sf-svc-service__list">
                  {s.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* 02 — THE SF MUSE METHOD: six steps, each with its plate. */}
      <section className="sf-section sf-room sf-room--sable sf-svc-method" id="method">
        <div className="sf-container">
          <Chapter label={`(${method.label})`} num={2} />
          <div className="sf-svc-method__masthead">
            <Reveal as="h2" className="sf-room__head">
              <Headed head={method.head} />
            </Reveal>
            <Reveal as="p" className="sf-room__lead" delay={90}>
              {method.text}
            </Reveal>
          </div>
          <ol className="sf-svc-method__steps">
            {method.steps.map((step, i) => (
              <Reveal as="li" className="sf-svc-method__step" key={step.num} delay={(i % 3) * 90}>
                <figure className="sf-svc-method__figure">
                  <Picture plate={step.image} />
                </figure>
                <span className="sf-svc-method__num" aria-hidden="true">
                  {step.num}
                </span>
                <h3 className="sf-svc-method__title">{step.title}</h3>
                <p className="sf-svc-method__text">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
