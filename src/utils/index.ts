import type { RouteRecordRaw } from 'vue-router'

import type { IAuth } from '@/store/user/type'
import { route } from '@/router/routes'

export function mapAuthToRoutes(auths: IAuth[]) {
  const allRoutes: RouteRecordRaw[] = []
  const setRoute = (auths: IAuth[]) => {
    auths.map((item) => {
      if (item.type === 2) {
        const router = route.find((i) => i.path === item.path)
        if (router)
          allRoutes.push({ ...router, meta: { ...router.meta, require: true } })
      } else {
        setRoute(item.children)
      }
    })
  }
  setRoute(auths)
  return allRoutes
}
