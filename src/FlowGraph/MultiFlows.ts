import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useFlowsStore } from '@/FlowGraph/FlowsStore'

export const useMultiFlows = defineStore('MultiFlows', () => {
  let index = 0
  const titles = ref<Record<number, string>>({})
  const { titles: storage } = storeToRefs(useFlowsStore())
  const indexes: number[] = []

  // Current flow
  const current = ref<number>(0)
  let watcherCurrent = () => {} // Stop watch for current flow changes
  function startWatcherCurrent() {
    watcherCurrent = watch(
      current,
      () => {
        storage.value?.put(current.value, 'current' as any)
      },
      { immediate: true }
    )
  }
  function stopWatcherCurrent() {
    watcherCurrent()
    storage.value?.delete('current' as never)
  }

  // Initialize
  function init(): void {
    if (storage.value === null) {
      if (Object.keys(titles.value).length === 0) {
        newFlow()
      }
    } else {
      storage.value
        .toCollection()
        .eachPrimaryKey((k) => {
          if (k === 'current') {
            return
          }
          indexes.push(k)
          storage.value!.get(k).then((v) => {
            titles.value[k] = v as string
          })
        })
        .then(() => {
          // Read current from storage
          storage.value!.get('current' as any).then((v) => {
            current.value = v as number
            // Watch for current.value changes
            startWatcherCurrent()
          })
        })
    }
  }
  init()

  function newFlow(): void {
    // Find if index already exists in keys
    while (indexes.includes(index)) {
      index += 1
    }
    // Generate a new title
    titles.value[index] = `Flow-${index}`
    current.value = index
    index += 1

    // Add new title into storage
    if (storage.value !== null) {
      storage.value.add(titles.value[current.value], current.value as any)
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

    // Remove id from storage
    if (storage.value !== null) {
      storage.value.delete(id as never)
    }
  }

  // Watch for IndexedDB table changes
  watch(
    () => storage.value,
    (value) => {
      if (value !== null) {
        // Watch for current.value changes
        startWatcherCurrent()
        // Save titles into storage
        const keys = Object.keys(titles.value).map((d) => parseInt(d))
        const items = Object.values(titles.value)
        value.bulkAdd(items, keys)
      } else {
        // Stop watch for current.value changes
        stopWatcherCurrent()
      }
    }
  )

  return { current, titles, newFlow, closeFlow }
})
