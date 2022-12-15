<script setup lang="ts">
import TagsView from '@/components/TagsView/index.vue'
import { useUsersStore } from '@/store/user'
import { ref } from 'vue'

const emits = defineEmits(['folderClick'])

const isCollapse = ref<boolean>(false)

const { userInfo } = useUsersStore()

const handleFolderClick = () => {
  isCollapse.value = !isCollapse.value
  emits('folderClick', isCollapse.value)
}

const handleLogout = () => {
  useUsersStore().logoutAction()
}
</script>

<template>
  <div class="nav-header-wrapper">
    <div class="nav-header-top">
      <div class="folder-icon" @click="handleFolderClick">
        <el-icon>
          <IEpExpand v-if="isCollapse" />
          <IEpFold v-else />
        </el-icon>
      </div>
      <div class="user-info-wrapper">
        <el-dropdown>
          <el-avatar :src="userInfo?.avatar" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>{{ userInfo?.account }}</span>
      </div>
    </div>
    <tags-view />
  </div>
</template>

<style scoped lang="less">
.nav-header-wrapper {
  margin: 0.3472rem;
  border-bottom: 1px solid rgb(247, 243, 243);
  .nav-header-top {
    display: flex;
    height: 2.7778rem;
    justify-content: space-between;
    align-items: center;

    padding: 0 0.3472rem;
    .folder-icon {
      font-size: 1.5278rem;
      cursor: pointer;
    }
    .user-info-wrapper {
      display: flex;
      align-items: center;
      .el-dropdown {
        margin-right: 0.6944rem;
      }
    }
  }
}
</style>
