import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useStorage } from '@/FlowGraph/AutoSave/Storage'
import type { Flow } from './AutoSave/Storage'

export const useMultiFlows = defineStore('MultiFlows', () => {
  let num = 1
  const current = ref<number>(1)
  const titles = ref<Record<number, string>>({})
  const { table } = storeToRefs(useStorage()) // Local IndexDB storage

  // Initialize
  function init(): void {
    if (table.value === null) {
      if (Object.keys(titles.value).length === 0) {
        newFlow()
      }
    } else {
      table.value.toCollection().eachPrimaryKey((k) => {
        table.value!.get(k).then((v) => {
          titles.value[k] = (v as Flow).title
        })
      })
    }
  }
  init()

  function newFlow(): void {
    titles.value[num] = `Flow-${num}`
    current.value = num
    num += 1

    if (table.value !== null) {
      // Add new flow into IndexDB
      table.value.add({ title: titles.value[current.value] }, current.value as never)
    }
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

    if (table.value !== null) {
      // Delete flow from IndexDB
      table.value.delete(id as never)
    }
  }

  // Watch for IndexDb table changes
  watch(table, (value) => {
    if (value !== null) {
      const items = Object.values(titles.value).map((d) => ({ title: d }))
      const keys = Object.keys(titles.value).map((k) => parseInt(k))
      value.bulkAdd(items, keys)
    }
  })

  return { current, titles, newFlow, closeFlow }
})
