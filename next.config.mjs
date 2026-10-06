import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('next').NextConfig} */
export default {
  // Load-bearing: the workspace-root detector walks up looking for lockfiles
  // and can latch onto one outside the repo (Next's warning prescribes this
  // exact fix when it does). Pins the project to this directory.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] },
  // The final copy (Oct 2026) renamed two service URLs; the old ones were
  // live, so they answer with a permanent redirect rather than a 404.
  redirects() {
    return [
      { source: '/services/art-of-brand-presence', destination: '/services/luxury-visual-storytelling', permanent: true },
      { source: '/services/creative-direction-identity', destination: '/services/creative-direction', permanent: true },
    ];
  },
};
