import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('next').NextConfig} */
export default {
  // Load-bearing: the workspace-root detector walks up looking for lockfiles
  // and can latch onto one outside the repo (Next's warning prescribes this
  // exact fix when it does). Pins the project to this directory.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] },
};
