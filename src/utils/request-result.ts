import { Recoverable } from 'repl'

export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

export function getRequestToken({
  headers
}: requestParams): string | undefined {
  return headers?.authorization
}

export function errorResult(
  message = 'Request failed',
  { code = -1, result = null } = {}
) {
  return {
    code,
    result,
    message,
    status: 'fail'
  }
}

// 返回统一格式的接口数据类型定义
export function successResult<T = Recoverable>(
  result: T,
  { message = 'Request success' } = {}
) {
  return {
    code: 200,
    result,
    message,
    status: 'ok'
  }
}
