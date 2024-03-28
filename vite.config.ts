/// <reference types="vitest" />

import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, process.cwd())
  const mockEnable = ENV.VITE_MOCK_ENABLE === 'true'

  return {
    resolve: {
      alias: {
        '::': path.resolve(__dirname, './src'),
      },
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
    plugins: [
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          {
            'vue-sonner': ['toast'],
          },
        ],
        dirs: [
          'src/view/composables',
          'src/view/store',
        ],
        eslintrc: {
          enabled: true,
        },
      }),
      vue(),
      Components({
        dts: 'types/components.d.ts',
        dirs: ['src/view/components'],
        resolvers: [
          (componentName) => {
            if (componentName === 'FormField')
              return { name: componentName.slice(4), from: 'vee-validate' }
          },
        ],
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
      VitePWA({
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: 'frontend-clean-architecture',
          short_name: 'FCA',
          description: 'A front-end template designed for building web applications with Vue.js',
          start_url: '/',
          scope: '/',
          dir: 'ltr',
          lang: 'en-US',
          display: 'standalone',
          orientation: 'natural',
          display_override: [
            'window-controls-overlay',
          ],
          theme_color: '#ffffff',
          icons: [
            {
              src: 'logo.svg',
              sizes: '150x150',
              type: 'image/svg+xml',
            },
          ],
          screenshots: [
            {
              src: 'screenshot.png',
              sizes: '1170x2532',
              type: 'image/png',
            },
          ],
          edge_side_panel: {
            preferred_width: 480,
          },
        },
      }),
    ],
    server: {
      proxy: {
        '/api': mockEnable ? ENV.VITE_MOCK_SERVER : ENV.VITE_API_BASE_URL,
      },
    },
    test: {
      environment: 'jsdom',
      coverage: {
        reporter: 'html',
        include: [
          'src/entities/**/*',
          'src/view/components/**/*.vue',
          'src/view/compositions/**/*.ts',
          'src/view/store/**/*.ts',
        ],
      },
    },
  }
})
