import type { App } from 'vue'
import { GesturePlugin } from '@vueuse/gesture'
import i18n from '::/view/plugins/i18n'
import store from '::/view/plugins/pinia'

export function setupPlugins(app: App) {
  app.use(store)
    .use(i18n)
    .use(GesturePlugin)
}
