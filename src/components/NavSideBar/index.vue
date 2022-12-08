<script setup lang="ts">
import { useUsersStore } from '@/store/user'
import { IAuth } from '@/store/user/type'
import { useRouter } from 'vue-router'

const { userInfo: { auths = [] } = {} } = useUsersStore()

const handleMenuItemClick = (item: IAuth) => {
  useRouter().push(item.path)
}
</script>

<template>
  <div class="nav-side-bar">
    <div class="loge-wrapper">
      <img src="~@/assets/vue.svg" />
      <span>Vite+Vue+Ts</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in auths" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-submenu :index="item.path">
            <template #title>
              <span>{{ item.title }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.path"
                @click="handleMenuItemClick(subitem)"
              >
                <span>{{ subitem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.nav-side-bar {
  height: 100%;
  display: flex;
  flex-direction: column;
  .loge-wrapper {
    height: 4.1667rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-menu-vertical {
    flex: 1;
  }
}
</style>
