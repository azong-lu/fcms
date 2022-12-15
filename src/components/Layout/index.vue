<script setup lang="ts">
import SideBar from '@/components/NavSideBar/index.vue'
import NavHeader from '@/components/NavHeader/index.vue'
import { ref } from 'vue'

const isCollapse = ref<boolean>(false)

const folderClick = (flag: boolean) => {
  isCollapse.value = flag
}
</script>

<template>
  <el-container>
    <el-aside :width="isCollapse ? '4.1667rem' : '13.889rem'">
      <side-bar :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header><nav-header @folderClick="folderClick" /></el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    transition: width 0.35s linear;
    overflow-x: hidden;
  }
  .el-header {
    height: 4.1667rem;
    padding: 0;
  }
}
</style>
