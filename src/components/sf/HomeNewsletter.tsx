'use client';

/**
 * HomeNewsletter — round 2 (Oct 2026). The client: the newsletter and the
 * closing banner wore near-identical lounge photographs; "a clean charcoal
 * newsletter section with ivory text and a clearly visible email field would
 * work well, leaving the cinematic image for the final project invitation."
 *
 * So: no photograph. The voice on the left, the entry on the right — a
 * visible label, a filled field with a real border, a solid champagne
 * button. Same server action as before (honeypot + kind=newsletter).
 */
import { useActionState } from 'react';
import { submitMessage, type FormState } from '@/app/actions';
import Reveal from './Reveal';
import Lines from './Lines';
import { Chapter } from './HomeSections';
import { CHAPTER } from '@/content/chapters';
import type { Head } from '@/content/seed';

const initial: FormState = { status: 'idle' };

export default function HomeNewsletter({ head, text }: { head: Head; text: string }) {
  const [state, action, pending] = useActionState(submitMessage, initial);

  return (
    <section className="sf-section sf-room sf-room--charcoal sf-hp-news" id="news">
      <div className="sf-container">
        <Chapter label="(Newsletter)" num={CHAPTER.correspondence} />
        <div className="sf-hp-news__grid">
          <Reveal className="sf-hp-news__voice">
            <h2 className="sf-hp-head">
              <Lines head={head} />
            </h2>
            <p className="sf-hp-body">{text}</p>
          </Reveal>
          <Reveal className="sf-hp-news__entry" delay={120}>
            {state.status === 'sent' ? (
              <p className="sf-hp-news__confirm" role="status">
                Received. Thank you.
              </p>
            ) : (
              <form className="sf-hp-news__form" action={action}>
                <input type="hidden" name="kind" value="newsletter" />
                {/* Honeypot — off-screen and tab-irrelevant for people. */}
                <div aria-hidden="true" className="sf-register__hp">
                  <label>
                    Company
                    <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <label className="sf-hp-news__label" htmlFor="sf-hp-news-email">
                  Email
                </label>
                <div className="sf-hp-news__row">
                  <input
                    className="sf-hp-news__input"
                    id="sf-hp-news-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                  <button className="sf-hp-news__submit" type="submit" disabled={pending}>
                    {pending ? 'Sending' : 'Subscribe'}
                  </button>
                </div>
                {state.status === 'error' && (
                  <p className="sf-hp-news__error" role="alert">
                    {state.message}
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
