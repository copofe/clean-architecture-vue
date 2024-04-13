import { type NavigationGuard, type RouteRecordNormalized, type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import i18n from '../plugins/i18n'
import { userRepo } from '::/repositories/user'

// eslint-disable-next-line unused-imports/no-unused-vars
const authenticate: NavigationGuard = async (to) => {
  const token = await userRepo.getToken()
  if (!token) {
    return {
      name: 'SignIn',
      query: { redirect: encodeURIComponent(to.fullPath) },
    }
  }
}

async function proceedIfAuthenticated() {
  const token = await userRepo.getToken()
  if (token) {
    toast.info('you already signed in.')
    return {
      name: 'Home',
    }
  }
}

const { t } = i18n.global

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Private',
    beforeEnter: async (_to) => {
      // disable authenticate for demo
      // return await authenticate(to)
    },
    children: [
      {
        path: '',
        name: 'Entry',
        component: () => import('::/view/routes/Entry.vue'),
        children: [
          {
            path: '',
            name: 'Home',
            component: () => import('::/view/routes/Home.vue'),
            meta: {
              title: () => t('View.home'),
            },
          },
          {
            path: 'components',
            name: 'Components',
            component: () => import('::/view/routes/Components.vue'),
            meta: {
              title: () => t('View.components'),
            },
          },
          {
            path: 'pages',
            name: 'Pages',
            component: () => import('::/view/routes/Pages.vue'),
            meta: {
              title: () => t('View.pages'),
            },
          },
        ],
      },
      {
        path: 'infinite-scroll',
        name: 'InfiniteScroll',
        component: () => import('::/view/routes/components/InfiniteScrollDemo.vue'),
      },
      {
        path: 'error-boundary',
        name: 'ErrorBoundary',
        component: () => import('::/view/routes/components/ErrorDemo.vue'),
      },
      {
        path: 'pay',
        name: 'Pay',
        component: () => import('::/view/routes/pages/Pay.vue'),
      },
    ],
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('::/view/routes/pages/SignIn.vue'),
    beforeEnter: proceedIfAuthenticated,
    meta: {
      title: () => t('User.sign-in'),
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('::/view/routes/pages/404.vue'),
    meta: {
      title: () => t('Error.page-not-found'),
    },
  },
]

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

// router.onError((error) => {
//   throw new Error(error)
// })

export default router
