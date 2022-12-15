<script setup lang="ts">
import { useUsersStore } from '@/store/user'
import { IAuth } from '@/store/user/type'
import { useTagsStore } from '@/store/tags'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
const router = useRouter()

const { userInfo: { auths = [] } = {} } = useUsersStore()
defineProps({
  isCollapse: Boolean
})

const currentPath = ref<string>()

watch(
  () => router,
  (newval) => {
    currentPath.value = newval.currentRoute.value.fullPath
  },
  {
    immediate: true
  }
)

const handleMenuItemClick = (item: IAuth) => {
  router.push(item.path)
  useTagsStore().addTagAction(item)
}
</script>

<template>
  <div class="nav-side-bar">
    <div class="loge-wrapper">
      <img src="~@/assets/vue.svg" />
      <span v-if="!isCollapse">Vite+Vue+Ts</span>
    </div>
    <el-menu
      :default-active="currentPath"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="isCollapse"
    >
      <template v-for="item in auths" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.path">
            <template #title>
              <el-icon><IEpInfoFilled /></el-icon>
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
          <el-menu-item :index="item.path" @click="handleMenuItemClick(item)">
            <el-icon><IEpInfoFilled /></el-icon>
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
      :deep(.el-sub-menu__title) {
        background-color: #001529 !important;
        font-weight: 500;
      }
      .el-menu-item {
        padding-left: 3.4722rem !important;
        background-color: #001a29 !important;
      }
    }
    .el-menu-item {
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
