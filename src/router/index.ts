import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { hasToken } from '@/utils/auth'
import { useUsersStore } from '@/store/user'
import { mapAuthToRoutes } from '@/utils'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/components/Layout/index.vue'),
    children: []
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (!hasToken()) {
      return '/login'
    } else {
      if (!to.meta.require) {
        const { userInfo: { auths = [] } = {} } = useUsersStore()
        mapAuthToRoutes(auths).forEach((item) => {
          router.addRoute('/', item)
        })

        // return to.path
      } else return
    }
  }
})

export default router
