<script setup lang="ts">
import { useUsersStore } from '@/store/user'
import { IAuth } from '@/store/user/type'
import { useRouter } from 'vue-router'
const router = useRouter()

const { userInfo: { auths = [] } = {} } = useUsersStore()

const handleMenuItemClick = (item: IAuth) => {
  router.push(item.path)
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
          <el-sub-menu :index="item.path">
            <template #title>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.path"
                @click="handleMenuItemClick(subitem)"
              >
                <span>{{ subitem.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.path">
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.nav-side-bar {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #001529;
  .loge-wrapper {
    height: 4.1667rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.0417rem;
    font-weight: bold;
    span {
      margin-left: 0.3472rem;
      color: #fff;
    }
  }
  .el-menu-vertical {
    flex: 1;
    border-right: none;

    .el-sub-menu {
      .el-sub-menu__title {
        background-color: #001529 !important;
        font-weight: 500;
      }
      .el-menu-item {
        background-color: #001a29 !important;
      }
    }
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
    .el-menu-item:hover {
      color: #fff !important; // 菜单
    }
    .el-menu-item.is-active {
      color: #fff !important;
      background-color: #0a60bd !important;
    }
  }
}
</style>
