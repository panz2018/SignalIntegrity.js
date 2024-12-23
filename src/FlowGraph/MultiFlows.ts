import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useFlowsStore } from '@/FlowGraph/FlowsStore'

export const useMultiFlows = defineStore('MultiFlows', () => {
  let index = 0
  const titles = ref<Record<number, string>>({})
  const { storages } = useFlowsStore()

  // Current flow
  const current = ref<number>(0)
  let watcherCurrent = () => {} // Stop watch for current flow changes
  function startWatcherCurrent() {
    watcherCurrent = watch(
      current,
      () => {
        storages.titles.put(current.value, 'current')
      },
      { immediate: true }
    )
  }
  function stopWatcherCurrent() {
    watcherCurrent()
    if (storages.titles.isnull) {
      storages.titles.remove('current')
    }
  }

  // Initialize
  function init(): void {
    if (storages.titles.isnull) {
      if (Object.keys(titles.value).length === 0) {
        newFlow()
      }
    } else {
      // Read from storage
      storages.titles.get('current').then((c) => {
        storages.titles.keys().then((keys) => {
          // Read old indexes
          const keysOld = keys.filter((k) => k !== 'current')
          // Generate new indexes
          const keysNew = Object.keys(keysOld).map((d) => parseInt(d))
          // Update index
          index = keysNew.length
          // Read flows from storage
          storages.flows.bulkGet(keysOld).then((array) => {
            // Clear storage
            storages.flows.clear().then(() => {
              // Update storage with new indexes
              storages.flows.bulkAdd(array, keysNew)
            })
          })
          // Read titles from storage
          storages.titles.bulkGet(keysOld).then((array) => {
            // Clear storage
            storages.titles.clear().then(() => {
              // Update storage with new indexes
              storages.titles.bulkAdd(array, keysNew)
            })
            // Assign data from stroage with update indexes to titles
            keysNew.forEach((k) => (titles.value[k] = array[k] as string))
            if (c !== undefined) {
              // Update current.value
              current.value = keysNew[keysOld.indexOf(c as never)]
            }
            // If no titles, create a new one
            if (keysNew.length === 0) {
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
    if (!storages.titles.isnull) {
      storages.titles.add(titles.value[current.value], current.value)
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
    if (!storages.titles.isnull) {
      storages.titles.remove(id)
    }
    if (!storages.flows.isnull) {
      storages.flows.remove(id)
    }
  }

  // Watch for IndexedDB table changes
  watch(
    () => storages.titles.isnull,
    (value) => {
      if (!value) {
        // Watch for current.value changes
        startWatcherCurrent()
        // Save titles into storage
        const keys = Object.keys(titles.value).map((d) => parseInt(d))
        const items = Object.values(titles.value)
        storages.titles.bulkAdd(items, keys)
      } else {
        // Stop watch for current.value changes
        stopWatcherCurrent()
      }
    }
  )

  return { current, titles, newFlow, closeFlow }
})
