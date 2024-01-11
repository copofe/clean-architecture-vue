import type { RouteRecordRaw } from 'vue-router'
import { auth } from './guards'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Private',
    beforeEnter: async (to) => {
      return await auth(to)
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('::/view/pages/home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('::/view/pages/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('::/view/pages/404.vue'),
  },
]

export default routes
