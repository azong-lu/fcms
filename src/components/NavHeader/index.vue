<script setup lang="ts">
import TagsView from '@/components/TagsView/index.vue'
import { useUsersStore } from '@/store/user'

const { userInfo } = useUsersStore()
</script>

<template>
  <div class="nav-header-wrapper">
    <div class="nav-header-top">
      <div class="folder-icon">
        <!-- <el-icon><Fold /></el-icon> -->
      </div>
      <div class="user-info-wrapper">
        <el-avatar :src="userInfo?.avatar" />
        <span>{{ userInfo?.account }}</span>
      </div>
    </div>
    <tags-view />
  </div>
</template>
