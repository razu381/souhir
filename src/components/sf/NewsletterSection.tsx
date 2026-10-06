'use client';

/**
 * NewsletterSection — the final copy asks for a "different visual concept —
 * large dark banner": the register's spread is now set INSIDE a dark banner
 * hung within the page margins, the library lounge as its ground (art-
 * directed: the chair at the right on desktop, a 4:3 crop above the words on
 * handsets). The section's own ground stays bone, so the page still
 * alternates light and dark into the closing film.
 *
 * Earlier notes — home's Correspondence chapter, THE GUEST REGISTER:
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
import Picture from './Picture';
import { Chapter, Headed } from './HomeSections';
import { CHAPTER } from '@/content/chapters';
import type { Head, Plate } from '@/content/seed';

const initial: FormState = { status: 'idle' };

export default function NewsletterSection({
  head,
  text,
  image,
}: {
  head: Head;
  text: string;
  image?: Plate;
}) {
  const [state, action, pending] = useActionState(submitMessage, initial);

  return (
    <section className="sf-section sf-register" id="news">
      <div className="sf-container">
        <Chapter label="(Newsletter)" num={CHAPTER.correspondence} />
        <div className={`sf-register__banner${image ? ' sf-register__banner--image' : ''}`}>
          {image && (
            <figure className="sf-register__media">
              <Picture plate={image} />
            </figure>
          )}
          <div className="sf-register__spread">
            <Reveal className="sf-register__voice">
              <h2 className="sf-register__head">
                <Headed head={head} />
              </h2>
              <p className="sf-register__text">{text}</p>
            </Reveal>
            <Reveal className="sf-register__entry" delay={120}>
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
                    {/* The copy's "Email Field": the label stays for screen
                        readers, the placeholder speaks for it on the line. */}
                    <label className="sf-register__label sf-sr-only" htmlFor="sf-register-email">
                      Email
                    </label>
                    <input
                      className="sf-register__input"
                      id="sf-register-email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
