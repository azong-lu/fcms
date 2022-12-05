import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface IResponse {
  code: number
  message: string
  result?: any
  status: string
}

interface RequestInterceptor<T = IResponse> {
  requestIntercetor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestIntercetorErr?: (res: any) => any
  responseIntercetor?: (res: AxiosResponse<T>) => AxiosResponse<T>
  responseIntercetorErr?: (res: any) => any
}

interface IRequestConfig<T = IResponse> extends AxiosRequestConfig {
  interceptor?: RequestInterceptor<T>
  showLoading?: boolean
}

export type { IRequestConfig, RequestInterceptor, IResponse }
