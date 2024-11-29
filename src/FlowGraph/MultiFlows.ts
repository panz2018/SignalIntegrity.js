import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@/FlowGraph/AutoSave/Storage'

export const useMultiFlows = () => {
  const innerStore = defineStore('MultiFlows', () => {
    let num = 1
    const current = ref<number>(1)
    const titles = ref<Record<number, string>>({})

    function newFlow(): void {
      titles.value[num] = `Flow-${num}`
      current.value = num
      num += 1
    }

    function closeFlow(id: number): void {
      const keys = Object.keys(titles.value).map((d) => parseInt(d))
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

    // AutoSave
    const storage = useStorage()
    watch(
      () => storage.table,
      (table) => {
        if (table !== null) {
          const items = Object.values(titles.value).map((d) => ({ title: d }))
          const keys = Object.keys(titles.value).map((k) => parseInt(k))
          table.bulkAdd(items, keys)
        }
      }
    )

    return { current, titles, newFlow, closeFlow }
  })

  const store = innerStore()
  if (Object.keys(store.titles).length === 0) {
    store.newFlow()
  }
  return store
}
