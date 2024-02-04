import type { Permission } from '::/entities/app.model'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    permission?: Permission[]
  }
}
