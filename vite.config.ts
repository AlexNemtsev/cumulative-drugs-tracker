/// <reference types="vitest" />
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#F7F9FF',
        lang: 'ru',
        name: 'Трекер дозировок',
        short_name: 'Трекер',
        icons: [
          {
            src: '/icon-192x192-v2.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512-v2.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        cacheId: 'cumulative-drugs-tracker-v2',
        cleanupOutdatedCaches: true,
      },
    }),
    vanillaExtractPlugin(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx'],
    },
  },
  server: {
    open: true,
    host: true,
  },
});
