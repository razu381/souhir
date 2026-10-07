import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('next').NextConfig} */
export default {
  // Load-bearing: the workspace-root detector walks up looking for lockfiles
  // and can latch onto one outside the repo (Next's warning prescribes this
  // exact fix when it does). Pins the project to this directory.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] },
  // The per-service pages are retired: each service is now a section of
  // /services, anchored by its slug. The old URLs were live, so they answer
  // with a permanent redirect to their section rather than a 404 — the two
  // the final copy (Oct 2026) renamed first, then every other slug as-is.
  redirects() {
    return [
      { source: '/services/art-of-brand-presence', destination: '/services#luxury-visual-storytelling', permanent: true },
      { source: '/services/creative-direction-identity', destination: '/services#creative-direction', permanent: true },
      { source: '/services/:slug', destination: '/services#:slug', permanent: true },
    ];
  },
};
