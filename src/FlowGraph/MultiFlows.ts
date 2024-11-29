import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAutoSaveStore } from '@/FlowGraph/AutoSave/AutoSave'

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
    const autosave = useAutoSaveStore()
    watch(
      () => autosave.state,
      (save) => {
        console.log('AutoSave:', save)
        console.log('Titles:', titles.value)
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
