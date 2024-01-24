import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import i18n from '../plugins/i18n'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition)
      return savedPosition

    return { top: 0 }
  },
})

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})
router.afterEach((to) => {
  NProgress.done()
  if (to.meta.title)
    document.title = i18n.global.t(to.meta.title)
})

router.onError((error) => {
  throw new Error(error)
})

export default router
