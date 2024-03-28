import type { RouteRecordRaw } from 'vue-router'
import i18n from '../plugins/i18n'
import { proceedIfAuthenticated } from './guards'

// import { authenticate } from './guards'

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
        component: () => import('::/view/pages/Entry.vue'),
        children: [
          {
            path: '',
            name: 'Home',
            component: () => import('::/view/pages/Home.vue'),
            meta: {
              title: () => t('View.home'),
            },
          },
          {
            path: 'components',
            name: 'Components',
            component: () => import('::/view/pages/Components.vue'),
            meta: {
              title: () => t('View.components'),
            },
          },
          {
            path: 'pages',
            name: 'Pages',
            component: () => import('::/view/pages/Pages.vue'),
            meta: {
              title: () => t('View.pages'),
            },
          },
        ],
      },
      {
        path: 'infinite-scroll',
        name: 'InfiniteScroll',
        component: () => import('::/view/pages/InfiniteScrollDemo.vue'),
      },
      {
        path: 'error-boundary',
        name: 'ErrorBoundary',
        component: () => import('::/view/pages/ErrorDemo.vue'),
      },
      {
        path: 'pay',
        name: 'Pay',
        component: () => import('::/view/pages/Pay.vue'),
      },
    ],
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('::/view/pages/SignIn.vue'),
    beforeEnter: proceedIfAuthenticated,
    meta: {
      title: () => t('User.sign-in'),
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('::/view/pages/404.vue'),
    meta: {
      title: () => t('Error.page-not-found'),
    },
  },
]

export default routes
