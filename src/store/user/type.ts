import { IResponse } from '@/service/request/type'

export interface IGetTokenResonse extends IResponse {
  result: { token: string }
}

export interface IGetTokenParams {
  account: string
  password: string
}

export interface IUsersStore {
  token?: string
  userInfo?: IUserInfo
}

export interface IUserInfo {
  user_id: string
  account: string
  real_name: string
  avatar: string
  desc: string
  password: string
  token: string
  organization: string
  location: string
  email: string
  auths?: IAuth[]
  is_admin: number
  dev_languages: string
  blog_github: string
  blog_juejin: string
  blog_zhihu: string
  role: string
}

export interface IAuth {
  path: string
  title: string
  type: number
  children: IAuth[]
  id: number
}
