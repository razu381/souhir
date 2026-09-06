'use client';

/**
 * ContactForm — the correspondence form on /contact. Same treatment as the
 * newsletter (tracked caps over hairline underlines, umber ground), plus
 * name and message fields.
 */
import { useActionState } from 'react';
import { submitMessage, type FormState } from '@/app/actions';

const initial: FormState = { status: 'idle' };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitMessage, initial);

  if (state.status === 'sent') {
    return (
      <p className="sf-news__confirm" role="status">
        Received. We reply within two days.
      </p>
    );
  }

  return (
    <form className="sf-news__form sf-news__form--wide" action={action}>
      <input type="hidden" name="kind" value="contact" />
      <div aria-hidden="true" className="sf-news__hp">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sf-news__field">
        <label className="sf-news__label" htmlFor="sf-contact-name">
          Name
        </label>
        <input
          className="sf-news__input"
          id="sf-contact-name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
        />
      </div>
      <div className="sf-news__field">
        <label className="sf-news__label" htmlFor="sf-contact-email">
          Email Address
        </label>
        <input
          className="sf-news__input"
          id="sf-contact-email"
          name="email"
          type="email"
          placeholder="Your email address"
          required
          autoComplete="email"
        />
      </div>
      <div className="sf-news__field">
        <label className="sf-news__label" htmlFor="sf-contact-message">
          The Project
        </label>
        <textarea
          className="sf-news__input sf-news__input--area"
          id="sf-contact-message"
          name="message"
          placeholder="Tell us what you are building"
          rows={5}
        />
      </div>

      <button className="sf-btn" type="submit" disabled={pending}>
        {pending ? 'Sending' : 'Send'}
      </button>
      {state.status === 'error' && (
        <p className="sf-news__error" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
