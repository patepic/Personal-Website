import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Astro configuration
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
  ],
});
