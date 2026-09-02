import { build } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';

await build({
  entryPoints: ['src/js/main.js'],
  bundle: true, minify: true, format: 'iife',
  target: ['es2019'], outfile: 'dist/sf.js',
});

// dist/ must be self-contained: sf.css resolves fonts as ./fonts/*, and the
// same relative shape is what the WordPress child theme will use.
await mkdir('dist/fonts', { recursive: true });
await cp('src/fonts', 'dist/fonts', { recursive: true });

console.log('  dist/sf.js + dist/fonts written');
