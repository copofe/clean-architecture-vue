import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

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
      imports: ['vue', 'vue-router'],
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
  ],
  server: {
    port: 3030,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
