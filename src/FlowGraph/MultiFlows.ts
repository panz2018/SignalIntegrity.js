import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useFlowsStore } from '@/FlowGraph/FlowsStore'

export const useMultiFlows = defineStore('MultiFlows', () => {
  let index = 0
  const titles = ref<Record<number, string>>({})
  const { titles: storage } = storeToRefs(useFlowsStore())

  // Current flow
  const current = ref<number>(0)
  let watcherCurrent = () => {} // Stop watch for current flow changes
  function startWatcherCurrent() {
    watcherCurrent = watch(
      current,
      () => {
        storage.value!.put(current.value, 'current' as any)
      },
      { immediate: true }
    )
  }
  function stopWatcherCurrent() {
    watcherCurrent()
    if (storage.value) {
      storage.value.delete('current' as never)
    }
  }

  // Initialize
  function init(): void {
    if (storage.value === null) {
      if (Object.keys(titles.value).length === 0) {
        newFlow()
      }
    } else {
      // Read from storage
      storage.value.get('current' as any).then((c) => {
        storage
          .value!.toCollection()
          .primaryKeys()
          .then((keys) => {
            // Read old indexes
            keys = keys.filter((k) => k !== 'current')
            // Generate new indexes
            const inds = Object.keys(keys).map((d) => parseInt(d))
            // Update index
            index = inds.length
            // Read titles from storage
            storage.value!.bulkGet(keys).then((array) => {
              // Clear storage
              storage.value!.clear().then(() => {
                // Update storage with new indexes
                storage.value!.bulkAdd(array as never, inds)
              })
              // Assign data from stroage with update indexes to titles
              inds.forEach((k) => (titles.value[k] = array[k] as string))
              if (c !== undefined) {
                // Update current.value
                current.value = inds[keys.indexOf(c as never)]
              }
              // If no titles, create a new one
              if (inds.length === 0) {
                newFlow()
              }
              // Watch for current.value changes
              startWatcherCurrent()
            })
          })
      })
    }
  }
  init()

  function newFlow(): void {
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
