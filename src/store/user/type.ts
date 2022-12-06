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
  userInfo: any
}
