# `/contact` — Correspondence

The letter-writing page: a mailto line and the project form.

| | |
| --- | --- |
| File | `src/app/contact/page.tsx` |
| Rendering | `force-static` — no data fetches on request; fully prerenderable |
| Data | `getSettings()` (contact email, tag `settings`) |
| Metadata | title "Contact", fixed description |

## Sections in order

| # | Section | Component | Content source |
| --- | --- | --- | --- |
| 01 | **Title band** | `PageTitle` | "(Correspondence)" · "Start With *A Letter.*" · intro is fixed copy |
| 02 | Write To Us (noir) | inline chapter + `ContactForm` | the mailto line uses `siteSettings.contactEmail` (seed fallback `hello@darsf.com`) |

No closing card — the form is the close.

## The form (`ContactForm.tsx`, client component)

- Fields: Name (optional), Email (required), The Project (textarea).
- Tracked-caps labels over hairline underlines — no boxed fields.
- Submits to the shared server action `submitMessage` (`src/app/actions.ts`)
  with `kind: "contact"`:
  1. honeypot (`company` field) → silent drop,
  2. email validated,
  3. a `message` document is created via the **create-only** write token.
- States: `Sending…` while pending → **"Received. We reply within two days."**
  on success; inline error line otherwise (with the mailto escape hatch if the
  write token isn't configured).

## Editing

- The email address: **Site settings → contactEmail**.
- The intro, heading and the "two days" promise are fixed copy in the page
  file; change them in code if the studio's SLA ever changes.

## Notes

- Submissions appear in the studio under **Correspondence**; they are not
  emailed (a daily forwarder is a planned extra).
- The newsletter form on the home page shares this action and styling — see
  `pages/home.md` §09.
