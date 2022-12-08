import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/store/user'
import type { RouteRecordRaw } from 'vue-router'
import { mapAuthToRoutes } from '@/utils'
import { hasToken } from '@/utils/auth'
import { useTagsStore } from '@/store/tags'

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
      // 没有登录去登录
      return '/login'
    } else {
      // 避免刷新丢失路由
      if (!to.meta?.require) {
        const { userInfo: { auths = [] } = {} } = useUsersStore()
        const allRoutes = mapAuthToRoutes(auths)
        allRoutes.forEach((item) => {
          router.addRoute('/', item)
        })
        // 刷新标签处理
        const currentRoute: RouteRecordRaw | undefined = allRoutes.find(
          (item) => item.path === to.path
        )
        const { meta, path } = currentRoute || {}
        useTagsStore().addTagAction({ title: meta?.title, path } as any)

        return to.path
      } else return
    }
  }
})

export default router
