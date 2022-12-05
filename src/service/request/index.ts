import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { ElLoading, ElNotification } from 'element-plus'
import type { IRequestConfig, RequestInterceptor, IResponse } from './type'
import { getToken, hasToken, TokenPrefix } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { showMessage } from './message'

const DEFAULT_LOADING = true

class Request {
  instance: AxiosInstance
  interceptor?: RequestInterceptor
  showLoading: boolean
  loading?: any
  constructor(config: IRequestConfig) {
    // 单例全局设计defalut_url等
    this.instance = axios.create(config)
    this.interceptor = config.interceptor
    this.showLoading = DEFAULT_LOADING ?? true
    // 外面传入
    // 请求成功全局拦截
    this.instance.interceptors.request.use(
      this.interceptor?.requestIntercetor,
      this.interceptor?.requestIntercetorErr
    )
    // 响应成功全局拦截
    this.instance.interceptors.response.use(
      this.interceptor?.responseIntercetor,
      this.interceptor?.responseIntercetorErr
    )
    // 所有实例全局拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        this.showLoading = DEFAULT_LOADING
        if (res.status === 200) {
          return res.data
        }
        ElNotification({
          title: 'Error',
          message: showMessage(res.status),
          type: 'error'
        })
        return res
      },
      (err) => {
        this.showLoading = DEFAULT_LOADING
        const { response } = err
        ElNotification({
          title: 'Error',
          message: showMessage(response.status),
          type: 'error'
        })

        return err
      }
    )
  }

  request<T>(config: IRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求成功拦截
      if (config.interceptor?.requestIntercetor) {
        config = config.interceptor.requestIntercetor(config)
      }
      if (hasToken()) {
        config.headers = {
          ...config.headers,
          Authorization: `${TokenPrefix}${getToken()}`
        }
      } else {
        useRouter().push('/login')
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      axios
        .request<any, AxiosResponse<T>>(config)
        .then((res) => {
          if (config.interceptor?.responseIntercetor) {
            res = config.interceptor.responseIntercetor(res)
          }
          this.showLoading = DEFAULT_LOADING
          const { data } = res
          resolve(data)
          return data
        })
        .catch((err) => {
          reject(err)
          this.showLoading = DEFAULT_LOADING
          return err
        })
    })
  }

  get<T = IResponse>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = IResponse>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}

export default Request
