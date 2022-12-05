import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { hasToken } from '@/utils/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/secondpage',
    redirect: '/secondpage/one',
    meta: { title: '一级标题' },
    children: [
      {
        path: '/secondpage/one',
        component: () => import('@/views/secondpage/SecondPageOne.vue'),
        meta: { title: '二级标题一' }
      },
      {
        path: '/secondpage/two',
        component: () => import('@/views/secondpage/SecondPageTwo.vue'),
        meta: { title: '二级标题二' }
      },
      {
        path: '/secondpage/three',
        component: () => import('@/views/secondpage/SecondPageThree.vue'),
        meta: { title: '二级标题三' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login' && !hasToken()) {
    return '/login'
  }
})

export default router
