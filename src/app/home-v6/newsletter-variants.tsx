'use client';

/**
 * HomeNewsletterVariants — the V6 newsletter review (developer brief,
 * 2026-10-24): the section rendered four ways, A–D, each on its own ground
 * (sable, noir, ivory, champagne) so the client can tell them apart and
 * choose one. Every variant carries the same copy and a working form (the
 * production server action, honeypot, kind=newsletter); only the
 * presentation differs. When she picks, the winner's markup folds back
 * into HomeNewsletter on the production page and this stack is deleted —
 * see DECISION-LOG 2026-10-24.
 *
 *   A — The Correspondence Line (sable): the /contact field grammar — a
 *       tracked-caps label over one full-width hairline underline, the
 *       subscribe a quiet caps link. No box, no pill.
 *   B — The Lit Entry (noir): the form alone as the room's hero, centred,
 *       champagne accents (the /home-v2 lab cut's register).
 *   C — The Letterpress Card (ivory): the round-1 guest register
 *       re-grounded — a bordered stationery card, centred lockup, the
 *       entry one ruled line, a fine-print mark.
 *   D — The Editorial Split Row (champagne): today's field re-proportioned
 *       — one joined row, the champagne button at the field's right end.
 *
 * No Reveal curtain here: these are review hangs, not the page's rhythm.
 * Styles: sf/home-v2.css §4, scoped .sf-homepage.sf-homepage-v2 .sf-nlv*.
 */
import { useActionState } from 'react';
import { submitMessage, type FormState } from '@/app/actions';
import Lines from '@/components/sf/Lines';
import { Chapter } from '@/components/sf/HomeSections';
import { CHAPTER } from '@/content/chapters';
import type { Head } from '@/content/seed';

const initial: FormState = { status: 'idle' };

/** One working entry, parameterised only by what the treatment changes:
 *  the input's id, the submit's class, and whether it carries the arrow. */
function EntryForm({ id, submit, arrow = false }: { id: string; submit: string; arrow?: boolean }) {
  const [state, action, pending] = useActionState(submitMessage, initial);
  if (state.status === 'sent') {
    return (
      <p className="sf-nlv__confirm" role="status">
        Received. Thank you.
      </p>
    );
  }
  return (
    <form className="sf-nlv__form" action={action}>
      <input type="hidden" name="kind" value="newsletter" />
      {/* Honeypot — off-screen and tab-irrelevant for people. */}
      <div aria-hidden="true" className="sf-register__hp">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="sf-nlv__label" htmlFor={id}>
        Email
      </label>
      <div className="sf-nlv__entry">
        <input
          className="sf-nlv__input"
          id={id}
          name="email"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          required
        />
        <button className={submit} type="submit" disabled={pending}>
          {pending ? 'Sending' : 'Subscribe'}
          {arrow && (
            <span className="sf-nlv__arrow" aria-hidden="true">
              &#8594;
            </span>
          )}
        </button>
      </div>
      {state.status === 'error' && (
        <p className="sf-nlv__error" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}

export default function HomeNewsletterVariants({ head, text }: { head: Head; text: string }) {
  return (
    <>
      {/* The chapter belongs to the section as a whole; it hangs once, on A. */}
      <section
        className="sf-section sf-room sf-nlv sf-nlv--a"
        aria-label="Newsletter A — the correspondence line, on sable"
      >
        <div className="sf-container">
          <Chapter label="(Newsletter)" num={CHAPTER.correspondence} />
          <p className="sf-nlv__tag">(A) — The Correspondence Line &middot; Sable</p>
          {/* Two columns on the desk — the voice left, the entry right — so
              the room keeps the production newsletter's balance; A and D
              differ from it in the field's treatment, not in a blank side. */}
          <div className="sf-nlv__grid">
            <div className="sf-nlv__voice">
              <h2 className="sf-hp-head">
                <Lines head={head} />
              </h2>
              <p className="sf-hp-body">{text}</p>
            </div>
            <EntryForm id="nlv-a" submit="sf-nlv__link" arrow />
          </div>
        </div>
      </section>

      <section
        className="sf-section sf-room sf-nlv sf-nlv--b"
        aria-label="Newsletter B — the lit entry, on black"
      >
        <div className="sf-container">
          <p className="sf-nlv__tag">(B) — The Lit Entry &middot; Black</p>
          <div className="sf-nlv__voice">
            <h2 className="sf-hp-head">
              <Lines head={head} />
            </h2>
            <p className="sf-hp-body">{text}</p>
          </div>
          <EntryForm id="nlv-b" submit="sf-btn sf-nlv__pill" />
        </div>
      </section>

      <section
        className="sf-section sf-room sf-nlv sf-nlv--c"
        aria-label="Newsletter C — the letterpress card, on ivory"
      >
        <div className="sf-container">
          <p className="sf-nlv__tag">(C) — The Letterpress Card &middot; Ivory</p>
          <div className="sf-nlv__card">
            <h2 className="sf-hp-head">
              <Lines head={head} />
            </h2>
            <p className="sf-hp-body">{text}</p>
            <EntryForm id="nlv-c" submit="sf-btn sf-nlv__pill" />
            <p className="sf-nlv__mark">&mdash; SF Muse &mdash;</p>
          </div>
        </div>
      </section>

      <section
        className="sf-section sf-room sf-nlv sf-nlv--d"
        aria-label="Newsletter D — the editorial split row, on champagne"
      >
        <div className="sf-container">
          <p className="sf-nlv__tag">(D) — The Editorial Split Row &middot; Champagne</p>
          <div className="sf-nlv__grid">
            <div className="sf-nlv__voice">
              <h2 className="sf-hp-head">
                <Lines head={head} />
              </h2>
              <p className="sf-hp-body">{text}</p>
            </div>
            <EntryForm id="nlv-d" submit="sf-nlv__solid" />
          </div>
        </div>
      </section>
    </>
  );
}
