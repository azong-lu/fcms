# Vue 3 + TypeScript + Vite

一个基于 Vue3 + Vite3 + TypeScript+...后台模板框架。集成了各类插件，并进行了按需加载的优化。

# 功能亮点

## 大厂协作-代码规范

目前多数大厂团队一般使用[husky](https://github.com/typicode/husky)和  [lint-staged](https://github.com/okonet/lint-staged) 来约束代码规范，

- 通过`pre-commit`实现 lint 检查、单元测试、代码格式化等。
- 结合 VsCode 编辑器（保存时自动执行格式化：editor.formatOnSave: true）
- 配合 Git hooks 钩子（commit 前或提交前执行：pre-commit => npm run lint）
- IDE 配置（`.editorconfig`）、ESLint 配置（`.eslintrc.js`  和  `.eslintignore`）、StyleLint 配置（`.stylelintrc`  和  `.stylelintignore`），详细请看对应的配置文件。

🔌 关闭代码规范  
将  `src/`  目录分别加入  `.eslintignore`  和  `.stylelintignore`  进行忽略即可。

## 目录结构

以下是系统的目录结构

```
├── postcss.config.cjs //postcss配置
├── src
│   ├── App.vue                //vue模板入口
│   ├── api                    // 请求文件
│   ├── assets                 //静态资源文件
│   ├── auto-imports.d.ts      //Element-plus类型
│   ├── components             //公共组件
│   ├── components.d.ts        //Element-plus类型
│   ├── hooks                  //公共hooks
│   ├── main.ts                //入口ts
│   ├── mock                   //模拟数据
│   ├── router                 //路由文件
│   ├── service                //请求封装
│   ├── store                  //状态管理
│   ├── style                  //全局样式
│   ├── utils                  //工具类
│   ├── views                  //业务组件
│   └── vite-env.d.ts          //全局类型声明
├── tsconfig.json              //ts配置
├── tsconfig.node.json         //ts配置
└── vite.config.ts             //vite配置
```

## UI 组件按需加载，自动导入

```
AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
}),
Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
}),
<!--自动导入图标-->
 Icons({
      autoInstall: true
}),
```

## 支持 Mock 数据

使用`vite-plugin-mock`插件，支持数据模拟

```
viteMockServe({
      supportTs: true,
      mockPath: './src/mock/',
      localEnabled: true,
      prodEnabled: true,
      logger: true
}),
```

## 支持`Pinia`

创建文件`src/store/index.ts`

```
// 引入持久化插件
import piniaPluginPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia'

const pinia = createPinia()

pinia.use(piniaPluginPersist)

export default pinia
```

## 支持`axios(ts版)`

基于 class 封装了主流的拦截器，请求调用等方法，支持同项目不同 baseUrl，以及单个请求自定义拦截器等功能，区分了模块`index.ts`/`status.ts`/`type.ts/config.ts`

```
//封装src/api/login/loginApi.ts
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
...
```

```typescript
//调用
import { getTokenApi, getUserInfoApi, logoutApi } from '@/api/login/loginApi'
// setup模式下组件可以直接引用
const res = await getTokenApi<IGetTokenResonse>({ ...params })
```

## 配置`router`

支持`vue-router4.0`的模块化，并支持动态路由

```typescript
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (!hasToken()) {
      // 没有登录去登录
      return '/login'
    } else {
      // 避免刷新丢失路由
      if (!to.meta?.require) {
        const { userInfo: { auths = [] } = {} } = useUsersStore()
        const allRoutes = mapAuthToRoutes(auths)
        allRoutes.forEach((item) => {
          router.addRoute('/', item)
        })
        // 刷新标签处理
        const currentRoute: RouteRecordRaw | undefined = allRoutes.find(
          (item) => item.path === to.path
        )
        const { meta, path } = currentRoute || {}
        useTagsStore().addTagAction({ title: meta?.title, path } as any)

        return to.path
      } else return
    }
  }
})
```

## 其他

使用 rem 配合媒体查询实现元素动态大小变化，兼容不同分辨率屏幕
