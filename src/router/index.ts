import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/store/user'
import type { RouteRecordRaw } from 'vue-router'
import { mapAuthToRoutes } from '@/utils'
import { hasToken } from '@/utils/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/',
    name: '/',
    redirect: '/home',
    component: () => import('@/components/Layout/index.vue'),
    children: []
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
      // 避免刷新丢失路由
      if (!to.meta?.require) {
        const { userInfo: { auths = [] } = {} } = useUsersStore()
        mapAuthToRoutes(auths).forEach((item) => {
          router.addRoute('/', item)
        })
        return to.path
      } else return
    }
  }
})

export default router
