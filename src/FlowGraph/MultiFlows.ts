import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useStorage } from '@/FlowGraph/AutoSave/Storage'

export const useMultiFlows = defineStore('MultiFlows', () => {
  let num = 0
  const current = ref<string>('')
  const titles = ref<Record<string, string>>({})
  const { table } = storeToRefs(useStorage()) // Local IndexedDB storage
  // let watchCurrent = null // Watch for current flow changes
  // Watch for title changes

  // Initialize
  function init(): void {
    if (table.value === null) {
      if (Object.keys(titles.value).length === 0) {
        newFlow()
      }
    } else {
      // Read titles from IndexedDB table
      table.value.toArray().then((items) => {
        // Clear existing IndexedDB table
        table.value!.clear().then(() => {
          // Read IndexedDB table into titles.value
          const keys: string[] = []
          items.forEach((v, k) => {
            const key = k.toString()
            keys.push(key)
            titles.value[key] = v.title
          })
          // Save titles into IndexedDB table wiht new keys
          table.value!.bulkAdd(items, keys)
          // Update num for next index
          num = items.length
        })
      })

      // Save current into localStorage
      // watch(current, (key) => {
      //   console.log(key)
      // })
    }
  }
  init()

  function newFlow(): void {
    titles.value[num] = `Flow-${num}`
    current.value = num.toString()
    num += 1

    if (table.value !== null) {
      // Add new flow into IndexedDB
      table.value.add({ title: titles.value[current.value] }, current.value as never)
    }
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

    if (table.value !== null) {
      // Delete flow from IndexedDB
      table.value.delete(id as never)
    }
  }

  // Watch for IndexedDB table changes
  watch(table, (value) => {
    if (value !== null) {
      // Save titles into IndexedDB table
      const items = Object.values(titles.value).map((d) => ({ title: d }))
      const keys = Object.keys(titles.value)
      value.bulkAdd(items, keys)
    }
  })

  return { current, titles, newFlow, closeFlow }
})
