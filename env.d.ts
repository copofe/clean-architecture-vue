/// <reference types="vite/client" />

import 'vue-router'
import type { Permission } from './src/entities/app'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    permission?: Permission
  }
}
