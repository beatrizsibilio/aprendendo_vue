// Composables
import { getAuth } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../../src/firebase'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/chat',
        name: 'chat',
        component: () => import('../../src/views/Chat.vue'),
        meta: {
          requiresAuth: true
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../../src/views/Login.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  if(to.name == 'login') {
    return true;
  }

  if(to.matched.some((record) => record.meta.requiresAuth) == false || !!!auth.currentUser) {
    return {name: 'login'};
  }

  return true
})

export default router
