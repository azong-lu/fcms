<script setup lang="ts">
import { useTagsStore } from '@/store/tags'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tagsStore = useTagsStore()
const { tagsView = [] } = tagsStore
const currentPath = ref<string>()
watch(
  () => router.currentRoute.value.fullPath,
  (newVal) => {
    currentPath.value = newVal
  },
  {
    immediate: true
  }
)
const handleTagClose = (path: string) => {
  if (currentPath.value === path) {
    const index = tagsView.findIndex((item) => item.path === path)
    router.push(tagsView[index - 1].path)
  }
  tagsStore.delTagAction(path)
}

const handleTagClick = (path: string) => {
  if (path !== currentPath.value) {
    router.push(path)
  }
}
</script>

<template>
  <el-tag
    v-for="tag in tagsStore.tagsView"
    :key="tag.path"
    :closable="!tag.notCloseable"
    @close="handleTagClose(tag.path)"
    effect="light"
    @click="handleTagClick(tag.path)"
    :class="['normal-tag', currentPath === tag.path ? 'active-tag' : '']"
  >
    <span class="tag-text">
      {{ tag.title }}
    </span>
  </el-tag>
</template>

<style scoped lang="less">
.normal-tag {
  border-bottom: none;
  background: #f7f3f3;
  border: 1px solid #f7f3f3;
  border-bottom: none;
  margin-right: 0.3472rem;
  .tag-text {
    text-decoration: none;
    color: #666;
  }
  :deep(.el-tag__close) {
    color: #000;
  }
}
.active-tag {
  background: #fff;
  color: #000;
}
</style>
