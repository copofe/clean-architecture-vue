import type { RouteRecordRaw } from 'vue-router'
import { proceedIfAuthenticated } from './guards'

// import { authenticate } from './guards'

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
              title: 'View.home',
            },
          },
          {
            path: 'components',
            name: 'Components',
            component: () => import('::/view/pages/Components.vue'),
            meta: {
              title: 'View.components',
            },
          },
          {
            path: 'pages',
            name: 'Pages',
            component: () => import('::/view/pages/Pages.vue'),
            meta: {
              title: 'View.pages',
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
      title: 'User.sign-in',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('::/view/pages/404.vue'),
    meta: {
      title: 'Error.page-not-found',
    },
  },
]

export default routes
