import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'
import { appUsecase } from '::/usecases/app'

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
  appUsecase.eventer.emit('route.change', to)
})

router.onError((error) => {
  throw new Error(error)
})

export default router
