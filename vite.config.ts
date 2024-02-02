/// <reference types="vitest" />

import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

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
    ],
    server: {
      proxy: {
        '/api': mockEnable ? ENV.VITE_MOCK_SERVER : ENV.VITE_API_BASE_URL,
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        include: [
          'src/entities/**/*',
          'src/repositories/**/*',
          'src/usecases/**/*',
          'src/view/components/**/*.vue',
          'src/view/compositions/**/*.ts',
          'src/view/store/**/*.ts',
        ],
      },
    },
  }
})
