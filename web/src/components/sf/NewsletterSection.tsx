'use client';

/**
 * NewsletterSection — home §09 (Correspondence). The form is tracked caps
 * over a hairline underline, no boxed fields; the confirmation is a quiet
 * inline line in the same voice. The honeypot field is visually hidden.
 */
import { useActionState } from 'react';
import { submitMessage, type FormState } from '@/app/actions';
import Reveal from './Reveal';
import { Chapter, Headed } from './HomeSections';
import type { Head } from '@/content/seed';

const initial: FormState = { status: 'idle' };

export default function NewsletterSection({ head, text }: { head: Head; text: string }) {
  const [state, action, pending] = useActionState(submitMessage, initial);

  return (
    <section className="sf-section sf-news sf-news--nocturne" id="news">
      <div className="sf-container">
        <Chapter label="(Correspondence)" num={9} />

        <Reveal as="h2" className="sf-news__head">
          <Headed head={head} />
        </Reveal>
        <Reveal as="p" className="sf-news__text">
          {text}
        </Reveal>

        {state.status === 'sent' ? (
          <p className="sf-news__confirm" role="status">
            Received. Thank you.
          </p>
        ) : (
          <Reveal>
            <form className="sf-news__form" action={action}>
              <input type="hidden" name="kind" value="newsletter" />
              {/* Honeypot — off-screen and tab-irrelevant for people. */}
              <div aria-hidden="true" className="sf-news__hp">
                <label>
                  Company
                  <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="sf-news__field">
                <label className="sf-news__label" htmlFor="sf-news-email">
                  Email Address
                </label>
                <input
                  className="sf-news__input"
                  id="sf-news-email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  required
                />
              </div>
              <button className="sf-btn" type="submit" disabled={pending}>
                {pending ? 'Sending' : 'Subscribe'}
              </button>
              {state.status === 'error' && (
                <p className="sf-news__error" role="alert">
                  {state.message}
                </p>
              )}
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
