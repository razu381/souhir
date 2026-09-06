'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/config';

/** The embedded Studio — the client's editor, shipped with the site (plan D1).
 * The hosted studio at darsf.sanity.studio serves the same config. */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
