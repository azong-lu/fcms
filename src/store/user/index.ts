import { getTokenApi, getUserInfoApi, logoutApi } from '@/api/login/loginApi'
import { defineStore } from 'pinia'
import { setToken, removeToken } from '@/utils/auth'
import type { IGetTokenParams, IGetTokenResonse, IUsersStore } from './type'
import router from '@/router'
import { mapAuthToRoutes } from '@/utils'

export const useUsersStore = defineStore('users', {
  state: (): IUsersStore => {
    return {
      token: undefined,
      userInfo: undefined
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['token', 'userInfo']
      }
    ]
  },
  actions: {
    async getTokenAction(params: IGetTokenParams) {
      // 获取token
      const res = await getTokenApi<IGetTokenResonse>({ ...params })
      const { result: { token = '' } = {} } = res || {}
      if (token) {
        this.token = token
        setToken(token)
      }
      return res
    },
    // 获取用户详细信息
    async getUserInfoAction() {
      const res = await getUserInfoApi()
      const { result } = res || {}
      this.userInfo = result
      const allRoutes = mapAuthToRoutes(result?.auths || [])
      allRoutes.forEach((item) => {
        router.addRoute('/', item)
      })
      // 跳转首页
      router.push('/home')
    },
    async logoutAction() {
      const res = await logoutApi()
      const { code } = res || {}
      if (code === 200) {
        this.$reset()
        removeToken()
      }
      router.push('/login')
    }
  }
})
