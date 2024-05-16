import type { App } from 'vue'

import gesture from './gesture'
import i18n from './i18n'
import pinia from './pinia'
import query, { queryConfig } from './query'

export function setupPlugins(app: App) {
  app.use(gesture)
    .use(i18n)
    .use(pinia)
    .use(query, queryConfig)
}
