import { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import {
  requestParams,
  getRequestToken,
  errorResult,
  successResult
} from '@/utils/request-result'
import { TokenPrefix } from '@/utils/auth'

export function createFakeUserList() {
  return [
    {
      user_id: '3306',
      account: 'blindmonk',
      real_name: '扫地盲僧',
      avatar: 'https://api.multiavatar.com/blindmonk.svg',
      desc: '达摩深寺扫地僧，盲崖盘坐思人生',
      password: 'blindmonk',
      token: 'P1DeqWBao0HTU47Q',
      organization: '某大型公司CTO',
      location: '中国',
      email: '896226896@qq.com',
      auths: [],
      is_admin: 1,
      dev_languages: 'JavaScript/Vue/React/Node/PHP',
      blog_github: 'https://github.com/MaleWeb',
      blog_juejin: 'https://juejin.cn/user/3016715636842622',
      blog_zhihu: 'https://www.zhihu.com/people/blind_monk',
      role: 'admin'
    },
    {
      user_id: '80',
      account: 'test001',
      real_name: '盲僧水友',
      avatar: 'https://api.multiavatar.com/test.svg',
      desc: '欢迎加入扫地盲僧水友群',
      password: 'test001',
      token: 'yg8bE8nZwiCL4nQg',
      organization: '某大型公司CTO',
      location: '中国',
      email: '8888@china.com',
      is_admin: 0,
      dev_languages: 'JavaScript/Vue/React/Node/PHP',
      blog_github: 'https://github.com/MaleWeb',
      blog_juejin: 'https://juejin.cn/user/3016715636842622',
      blog_zhihu: 'https://www.zhihu.com/people/blind_monk',
      role: 'user',
      auths: [
        {
          path: '/home',
          title: '来吧，展示',
          type: 2,
          id: Random.id()
        },
        {
          path: '/secondpage',
          title: '二级标题(大标题一)',
          type: 1,
          id: Random.id(),
          children: [
            {
              path: '/secondpage/one',
              title: '二级标题一',
              type: 2,
              id: Random.id()
            },
            {
              path: '/secondpage/two',
              title: '二级标题一',
              type: 2,
              id: Random.id()
            },
            {
              path: '/secondpage/three',
              title: '二级标题一',
              type: 2,
              id: Random.id()
            }
          ]
        },
        {
          path: '/pagethree',
          title: '二级标题(大标题二)',
          type: 1,
          id: Random.id(),
          children: [
            {
              path: '/pagethree/one',
              title: '二级标题一',
              type: 2,
              id: Random.id()
            },
            {
              path: '/pagethree/two',
              title: '二级标题一',
              type: 2,
              id: Random.id()
            },
            {
              path: '/pagethree/three',
              title: '二级标题一',
              type: 2,
              id: Random.id()
            }
          ]
        }
      ]
    }
  ]
}

export default [
  {
    url: '/user/login',
    timeout: 200,
    method: 'post',
    response: (request: requestParams) => {
      const { account, password } = request.body
      const checkUser = createFakeUserList().find(
        (item) => item.account === account && item.password === password
      )
      if (!checkUser) {
        return errorResult('不存在该用户')
      }
      return successResult({ token: checkUser.token })
    }
  },
  {
    url: '/user/getUserInfo',
    timeout: 200,
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return errorResult('Invalid token')
      const checkUser = createFakeUserList().find(
        (item) => `${TokenPrefix}${item.token}` === token
      )
      if (!checkUser) {
        return errorResult('未获得相应的用户信息')
      }
      return successResult(checkUser)
    }
  }
] as MockMethod[]
