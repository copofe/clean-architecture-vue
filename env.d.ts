/// <reference types="vite/client" />

import 'vue-router'
import type { Permission } from './src/entities/app'

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_MOCK_ENABLE: string
  readonly VITE_MOCK_GLOBAL: string
  readonly VITE_MOCK_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    permission?: Permission
  }
}
