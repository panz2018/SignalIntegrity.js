import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useMultiFlows = () => {
  const innerStore = defineStore('MultiFlows', () => {
    let num = 0
    const current: Ref<string> = ref('')
    const titles: Ref<Record<string, string>> = ref({})

    function newFlow(): void {
      const flow = `Flow-${num++}`
      titles.value[flow] = flow
      current.value = flow
    }

    function closeFlow(id: string): void {
      const keys = Object.keys(titles.value)
      const index = keys.indexOf(id)
      if (keys.length === 1 && index === 0) {
        newFlow()
      } else if (index === keys.length - 1) {
        current.value = keys[index - 1]
      } else {
        current.value = keys[index + 1]
      }
      delete titles.value[id]
    }

    return { current, titles, newFlow, closeFlow }
  })

  const store = innerStore()
  if (Object.keys(store.titles).length === 0) {
    store.newFlow()
  }
  return store
}
