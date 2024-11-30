import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import Dexie from 'dexie'
import type { EntityTable } from 'dexie'
import { useAutoSaveStore } from './AutoSave'

export interface Flow {
  title: string
  flow?: object
}

export const useStorage = defineStore('Storage', () => {
  let database:
    | (Dexie & {
        flows: EntityTable<Flow>
      })
    | null = null
  const table = ref<EntityTable<Flow> | null>(null)

  // Create IndexedDB table
  function create() {
    database = new Dexie('SignalIntegrity') as Dexie & {
      flows: EntityTable<Flow>
    }
    database.version(1).stores({
      flows: ''
    })
    database.open()

    // Update the table
    table.value = database.flows
  }

  // Remove IndexedDB table
  function remove() {
    if (table.value !== null && database !== null) {
      database.close()
      database.delete()
      table.value = null
    }
  }

  // Watch for AutoSave sate changes
  const autosave = useAutoSaveStore()
  watch(
    () => autosave.state,
    (value) => {
      if (value === true) {
        create()
      } else {
        remove()
      }
    },
    { immediate: true }
  )

  return { table }
})
