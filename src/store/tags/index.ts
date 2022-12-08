import { defineStore } from 'pinia'
import { Itags, ItagStore } from './type'

export const useTagsStore = defineStore('tags', {
  state: (): ItagStore => {
    return {
      tagsView: [
        {
          path: '/home',
          title: '来吧，展示',
          notCloseable: true
        }
      ]
    }
  },
  actions: {
    addTagAction(item: Itags) {
      if (!this.tagsView.some((i) => i.path === item.path)) {
        this.tagsView.push(item)
      }
    },
    delTagAction(path: string) {
      this.tagsView = this.tagsView.filter((i) => i.path !== path)
    }
  }
})
