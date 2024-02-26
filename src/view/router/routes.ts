import type { RouteRecordRaw } from 'vue-router'
import { auth } from './guards'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Private',
    beforeEnter: async (_to) => {
      // disable auth for demo
      // return await auth(to)
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
              title: 'home',
            },
          },
          {
            path: 'components',
            name: 'Components',
            component: () => import('::/view/pages/Components.vue'),
            meta: {
              title: 'components',
            },
          },
          {
            path: 'pages',
            name: 'Pages',
            component: () => import('::/view/pages/Pages.vue'),
            meta: {
              title: 'pages',
            },
          },
        ],
      },
      {
        path: 'infinite-scroll',
        name: 'InfiniteScroll',
        component: () => import('::/view/pages/InfiniteScrollDemo.vue'),
      },
    ],
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('::/view/pages/SignIn.vue'),
    meta: {
      title: 'user.sign-in',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('::/view/pages/404.vue'),
    meta: {
      title: 'page-not-found',
    },
  },
]

export default routes
