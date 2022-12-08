import { getTokenApi, getUserInfoApi } from '@/api/login/loginApi'
import { defineStore } from 'pinia'
import { setToken } from '@/utils/auth'
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
      // {
      //   key: 'userInfo',
      //   storage: localStorage,
      //   paths: ['userInfo']
      // }
    ]
  },
  actions: {
    async getTokenAction(params: IGetTokenParams) {
      // 获取token
      const res = await getTokenApi<IGetTokenResonse>({ ...params })
      const { result: { token } = {} } = res
      if (token) {
        this.token = token
        setToken(token)
      }
      this.getUserInfoAction()
    },
    // 获取用户详细信息
    async getUserInfoAction() {
      const res = await getUserInfoApi()
      const { result } = res
      this.userInfo = result
      mapAuthToRoutes(result.auths).forEach((item) => {
        router.addRoute('/', item)
      })
      // 跳转首页
      router.push('/home')
    }
  }
})
