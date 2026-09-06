import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('next').NextConfig} */
export default {
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] },
};
