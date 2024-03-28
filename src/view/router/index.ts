import { type RouteRecordNormalized, createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'
import { eventer } from '::/internal/eventer'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition)
      return savedPosition

    return { top: 0 }
  },
})

export function setRouteDocumentTitle(title: RouteRecordNormalized['meta']['title']) {
  if (title)
    document.title = typeof (title) === 'string' ? title : title()
}

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})
router.afterEach((to) => {
  NProgress.done()
  setRouteDocumentTitle(to.meta.title)
})

eventer.on('update.language', () => {
  setRouteDocumentTitle(router.currentRoute.value.meta.title)
})

// router.onError((error) => {
//   throw new Error(error)
// })

export default router
