import { defineStore } from 'pinia'

export const useTagsStore = defineStore('tags', {
  state: () => {
    return {
      tagsView: [
        {
          path: '/home',
          name: 'home',
          title: '来吧，展示'
        }
      ]
    }
  }
})
