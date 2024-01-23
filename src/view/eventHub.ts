import type { RouteLocationNormalized } from 'vue-router'
import { useStore } from './store'
import i18n, { loadLanguageAsync } from './plugins/i18n'
import router from './router'
import { appUsecase } from '::/usecases/app'

export function registerEventHub() {
  const { eventer } = appUsecase
  const store = useStore()

  eventer.on('user.login', (user) => {
    store.user = user
  })

  eventer.on('user.logout', () => {
    store.user = undefined
  })

  eventer.on('view.language.change', (language) => {
    store.language = language
    loadLanguageAsync(language).then(() => {
      eventer.emit('route.change', router.currentRoute.value)
    })
  })

  eventer.on('route.change', (route: RouteLocationNormalized) => {
    if (route.meta.title)
      document.title = i18n.global.t(route.meta.title)
  })
}
