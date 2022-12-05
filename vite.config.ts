// vite3.1.1不支持commonJS
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    viteMockServe({
      // default
      supportTs: true,
      mockPath: './src/mock/',
      localEnabled: true,
      prodEnabled: true,
      logger: true
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: [
      //配置别名
      { find: '@', replacement: resolve(__dirname, 'src') }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
})
