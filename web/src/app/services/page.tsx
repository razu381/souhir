import type { Metadata } from 'next';
import PageTitle, { HeaderSentinel } from '@/components/sf/PageTitle';
import { ServicesList } from '@/components/sf/HomeSections';
import ClosingCard from '@/components/sf/ClosingCard';
import Reveal from '@/components/sf/Reveal';
import { getHomeData } from '@/sanity/fetch';
import * as seed from '@/content/seed';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Brand presence, creative direction, digital experiences, and intelligent growth — the four disciplines of Dar SF.',
};

export default async function ServicesPage() {
  const data = await getHomeData();

  return (
    <main id="main">
      <PageTitle
        label="(Services)"
        title={['What We ', 'Create.']}
        intro="Four disciplines, one standard: work that is remembered."
        num="01"
      />
      <HeaderSentinel />

      <section className="sf-section sf-services sf-services--bone">
        <div className="sf-container">
          <div className="sf-chapter">
            <span className="sf-chapter__label">(The Disciplines)</span>
            <span className="sf-chapter__num">01</span>
          </div>
          <ServicesList data={data.services} />
        </div>
      </section>

      <section className="sf-section sf-clientele sf-clientele--nocturne">
        <div className="sf-container">
          <div className="sf-chapter">
            <span className="sf-chapter__label">(The Process)</span>
            <span className="sf-chapter__num">02</span>
          </div>
          <div className="sf-clientele__grid">
            <div className="sf-clientele__aside">
              <Reveal as="h2" className="sf-clientele__head">
                Six Steps. <em>Every Time.</em>
              </Reveal>
              <Reveal as="p" className="sf-clientele__statement">
                {seed.serviceProcess.intro}
              </Reveal>
            </div>
            <ul className="sf-clientele__register">
              {seed.serviceProcess.items.map((item, i) => (
                <Reveal as="li" className="sf-clientele__row" key={item} delay={i * 60}>
                  <span className="sf-clientele__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sf-clientele__label">{item.split(' — ')[0]}</span>
                  <span className="sf-clientele__desc">{item.split(' — ')[1]}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClosingCard
        image={seed.cta.image}
        head={seed.cta.head}
        text={seed.cta.text}
        cta={seed.cta.cta}
      />
    </main>
  );
}
