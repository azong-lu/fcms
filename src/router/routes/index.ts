import type { RouteRecordRaw } from 'vue-router'

export const route: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('@/views/home/Home.vue')
  },
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
