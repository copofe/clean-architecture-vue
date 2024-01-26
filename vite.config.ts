/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '::': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    AutoImport({
      dts: true,
      imports: ['vue', 'vue-router', 'vue-i18n'],
      eslintrc: {
        enabled: true,
      },
    }),
    vue(),
    Components({
      dts: true,
      dirs: ['src/view/components'],
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    VueDevTools(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      include: [
        'src/entities/**/*',
        'src/repositories/**/*',
        'src/usecases/**/*',
        'src/view/components/ui/**/*.vue',
        'src/view/compositions/**/*.ts',
        'src/view/store/**/*.ts',
      ],
    },
  },
})
