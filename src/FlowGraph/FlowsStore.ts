import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import Dexie, { type EntityTable } from 'dexie'
import { useAutoSaveStore } from './AutoSave/AutoSave'
import events from '@/events'

export const useFlowsStore = defineStore('Storage', () => {
  let database:
    | (Dexie & {
        titles: EntityTable<string | number>
        flows: EntityTable<object>
      })
    | null = null
  const titles = ref<EntityTable<string | number> | null>(null)
  const flows = ref<EntityTable<object> | null>(null)

  // Create IndexedDB table
  function create() {
    // Update cursor to wait
    events.emit('CursorWait')

    // Create the database tables
    database = new Dexie('SignalIntegrity') as Dexie & {
      titles: EntityTable<string | number>
      flows: EntityTable<object>
    }
    database.version(1 / 10).stores({
      titles: '',
      flows: ''
    })
    database.open()
    // Update the table
    titles.value = database.titles
    flows.value = database.flows

    // Update cursor to default
    events.emit('CursorDefault')
  }

  // Remove IndexedDB table
  function remove() {
    if (database !== null) {
      database.close()
      database.delete()
      titles.value = null
      flows.value = null
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

  return { titles, flows }
})
