import { getTokenApi, getUserInfoApi } from '@/api/login/indexApi'
import { defineStore } from 'pinia'
import { setToken } from '@/utils/auth'
import type { IGetTokenParams, IGetTokenResonse, IUsersStore } from './type'
import { useRouter } from 'vue-router'

const router = useRouter()

export const useUsersStore = defineStore('users', {
  state: (): IUsersStore => {
    return {
      token: undefined,
      userInfo: {}
    }
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
      localStorage.setItem('userInfo', result)
      // 跳转首页
      router.push('/home')
    }
  }
})
