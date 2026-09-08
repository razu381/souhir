'use client';

/**
 * NewsletterSection — home's Correspondence chapter, THE GUEST REGISTER:
 * between the interlude and closing films, the flat newsletter band was the
 * page's one template moment. The section holds one registration card — the
 * letterpress lockup of hotel stationery, the form as the card's single ruled
 * entry line. Same server action as the contact form (honeypot +
 * kind=newsletter); /contact keeps the shared sf-news field grammar.
 *
 * The grounds are inverted from the first build — an umber card on a bone
 * sheet rather than a bone card on the umber night. That is a decision about
 * the PAGE, not this section: see the note on .sf-register in site.css.
 */
import { useActionState } from 'react';
import { submitMessage, type FormState } from '@/app/actions';
import Reveal from './Reveal';
import { Chapter, Headed } from './HomeSections';
import { CHAPTER } from '@/content/chapters';
import type { Head } from '@/content/seed';

const initial: FormState = { status: 'idle' };

export default function NewsletterSection({ head, text }: { head: Head; text: string }) {
  const [state, action, pending] = useActionState(submitMessage, initial);

  return (
    <section className="sf-section sf-register" id="news">
      <div className="sf-container">
        <Chapter label="(Correspondence)" num={CHAPTER.correspondence} />

        <Reveal className="sf-register__hold">
          <div className="sf-register__card">
            <p className="sf-register__brand">Dar SF</p>
            <span className="sf-register__rule" aria-hidden="true" />
            <p className="sf-register__sub">(Correspondence — Paris)</p>

            <h2 className="sf-register__head">
              <Headed head={head} />
            </h2>
            <p className="sf-register__text">{text}</p>

            {state.status === 'sent' ? (
              <p className="sf-register__confirm" role="status">
                Received. Thank you.
              </p>
            ) : (
              <form className="sf-register__form" action={action}>
                <input type="hidden" name="kind" value="newsletter" />
                {/* Honeypot — off-screen and tab-irrelevant for people. */}
                <div aria-hidden="true" className="sf-register__hp">
                  <label>
                    Company
                    <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <div className="sf-register__field">
                  <label className="sf-register__label" htmlFor="sf-register-email">
                    Email Address
                  </label>
                  <input
                    className="sf-register__input"
                    id="sf-register-email"
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
                  <p className="sf-register__error" role="alert">
                    {state.message}
                  </p>
                )}
              </form>
            )}

            <p className="sf-register__fine">Est. MMXXVI — Paris</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
