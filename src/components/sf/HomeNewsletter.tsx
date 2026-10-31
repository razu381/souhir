'use client';

/**
 * HomeNewsletter — v4 (client, 31 Oct 2026): option D from the /home-v6
 * review, "the ivory background and horizontal layout". The voice on the
 * left, the entry on the right: a visible label over one joined row, a
 * filled field and a solid noir button (champagne would vanish on the light
 * wall). The row stacks on handsets so the field keeps its width. Beneath
 * it, the explicit opt-in (her consent request, 1 Nov 2026).
 * Same server action as before (honeypot + kind=newsletter).
 */
import { useActionState } from 'react';
import { submitMessage, type FormState } from '@/app/actions';
import Reveal from './Reveal';
import Lines from './Lines';
import { Chapter } from './HomeSections';
import { CHAPTER } from '@/content/chapters';
import type { Head } from '@/content/seed';

const initial: FormState = { status: 'idle' };

export default function HomeNewsletter({ head, text, consent }: { head: Head; text: string; consent: string }) {
  const [state, action, pending] = useActionState(submitMessage, initial);

  return (
    <section className="sf-section sf-room sf-room--ivory sf-hp-news" id="news">
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
                    placeholder="Email address"
                    autoComplete="email"
                    required
                  />
                  <button className="sf-hp-news__submit" type="submit" disabled={pending}>
                    {pending ? 'Sending' : 'Subscribe'}
                  </button>
                </div>
                <label className="sf-hp-news__consent">
                  <input type="checkbox" name="consent" value="yes" required />
                  <span>{consent}</span>
                </label>
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
