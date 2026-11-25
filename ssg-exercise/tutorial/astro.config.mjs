// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Output research.html instead of research/index.html so the pages' links work.
  build: { format: 'file' },
});
