import type { Metadata } from 'next';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import ContactForm from '@/components/sf/ContactForm';
import { getSettings } from '@/sanity/fetch';
import * as seed from '@/content/seed';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with Dar SF — hospitality destinations, wellness concepts, editorial campaigns, and refined digital experiences.',
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <main id="main">
      <PageTitle
        label="(Correspondence)"
        title={['Start With ', 'A Letter.']}
        intro="Whether developing a hospitality destination, a wellness concept, an editorial campaign, or a refined digital experience — every memorable story begins with a clear vision."
        num="01"
      />
      <HeaderSentinel />

      <section className="sf-section sf-news sf-news--nocturne">
        <div className="sf-container">
          <div className="sf-chapter">
            <span className="sf-chapter__label">(Write To Us)</span>
            <span className="sf-chapter__num">02</span>
          </div>
          <h2 className="sf-news__head">
            Every Memorable Story <em>Begins With A Letter.</em>
          </h2>
          <p className="sf-news__text">
            Write directly to{' '}
            <a href={`mailto:${settings?.contactEmail ?? seed.settings.contactEmail}`}>
              {settings?.contactEmail ?? seed.settings.contactEmail}
            </a>{' '}
            — or leave the project here, and we reply within two days.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
