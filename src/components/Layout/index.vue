<script setup lang="ts">
import SideBar from '@/components/NavSideBar/index.vue'
import NavHeader from '@/components/NavHeader/index.vue'
</script>

<template>
  <el-container>
    <el-aside width="13.889rem">
      <side-bar />
    </el-aside>
    <el-container>
      <el-header><nav-header /></el-header>
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

  .el-header {
    height: 4.1667rem;
    padding: 0;
  }
}
</style>
