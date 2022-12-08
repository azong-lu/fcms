<script setup lang="ts">
import { useTagsStore } from '@/store/tags'

const tagsStore = useTagsStore()
const { tagsView = [] } = tagsStore
</script>

<template>
  <el-tag v-for="tag in tagsView" :key="tag.path" class="mx-1" closable>
    {{ tag.title }}
  </el-tag>
</template>

<style scoped></style>
