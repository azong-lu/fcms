import { baseInstance } from '../../service/index'
import { IGetTokenParams } from '@/store/user/type'

enum IUrl {
  login = '/user/login',
  userInfo = '/user/getUserInfo',
  logout = '/user/logout'
}

export function getTokenApi<T>(params: IGetTokenParams) {
  return baseInstance.post<T>({
    url: IUrl.login,
    data: params
  })
}

export function getUserInfoApi() {
  return baseInstance.post({
    url: IUrl.userInfo,
    data: {}
  })
}

export function logoutApi() {
  return baseInstance.post({
    url: IUrl.logout,
    data: {}
  })
}
