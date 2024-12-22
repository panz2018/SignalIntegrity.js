import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import Dexie, { type EntityTable } from 'dexie'
import { useAutoSaveStore } from './AutoSave/AutoSave'
import events from '@/events'

function useStorage<K, V>() {
  const table = ref<EntityTable<V> | null>(null)

  const isnull = computed(() => {
    return table.value === null
  })

  function init(entity: EntityTable<V>) {
    table.value = entity
  }

  function destroy() {
    table.value = null
  }

  async function put(item: V, key: K) {
    if (table.value) {
      // Update cursor to wait
      events.emit('CursorWait')

      return table.value.put(item as never, key as never).then(() => {
        // Update cursor to default
        events.emit('CursorDefault')
      })
    } else {
      return Promise.reject(new Error('Table is not existed'))
    }
  }

  async function bulkAdd(items: (V | undefined)[], keys: K[]) {
    if (table.value) {
      // Update cursor to wait
      events.emit('CursorWait')

      return table.value.bulkAdd(items as any[], keys as never[]).then(() => {
        // Update cursor to default
        events.emit('CursorDefault')
      })
    } else {
      return Promise.reject(new Error('Table is not existed'))
    }
  }

  async function remove(key: K) {
    if (table.value) {
      // Update cursor to wait
      events.emit('CursorWait')

      return table.value.delete(key as never).then(() => {
        // Update cursor to default
        events.emit('CursorDefault')
      })
    } else {
      return Promise.reject(new Error('Table is not existed'))
    }
  }

  async function clear() {
    if (table.value) {
      // Update cursor to wait
      events.emit('CursorWait')

      return table.value.clear().then(() => {
        // Update cursor to default
        events.emit('CursorDefault')
      })
    } else {
      return Promise.reject(new Error('Table is not existed'))
    }
  }

  async function get(key: K) {
    if (table.value) {
      // Update cursor to wait
      events.emit('CursorWait')

      return table.value.get(key as never).then((val) => {
        // Update cursor to default
        events.emit('CursorDefault')

        return val
      })
    } else {
      return Promise.reject(new Error('Table is not existed'))
    }
  }

  async function bulkGet(keys: K[]) {
    if (table.value) {
      // Update cursor to wait
      events.emit('CursorWait')

      return table.value.bulkGet(keys as never[]).then((array) => {
        // Update cursor to default
        events.emit('CursorDefault')

        return array
      })
    } else {
      return Promise.reject(new Error('Table is not existed'))
    }
  }

  async function keys() {
    if (table.value) {
      // Update cursor to wait
      events.emit('CursorWait')

      return table.value
        .toCollection()
        .primaryKeys()
        .then((keys) => {
          // Update cursor to default
          events.emit('CursorDefault')

          return keys
        })
    } else {
      return Promise.reject(new Error('Table is not existed'))
    }
  }

  // Remove table from returned variables
  return { isnull, init, destroy, put, bulkAdd, remove, clear, get, bulkGet, keys, table }
}

export const useFlowsStore = defineStore('Storage', () => {
  let database:
    | (Dexie & {
        titles: EntityTable<string | number>
        flows: EntityTable<object>
      })
    | null = null
  const storages = {
    titles: useStorage<string | number, string | number>(),
    flows: useStorage<number, object>()
  }

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
    storages.titles.init(database.titles)
    storages.flows.init(database.flows)

    // Update cursor to default
    events.emit('CursorDefault')
  }

  // Destroy IndexedDB table
  function destroy() {
    // Update cursor to wait
    events.emit('CursorWait')

    if (database !== null) {
      database.close()
      database.delete()
      storages.titles.destroy()
      storages.flows.destroy()
    }

    // Update cursor to default
    events.emit('CursorDefault')
  }

  // Watch for AutoSave sate changes
  const autosave = useAutoSaveStore()
  watch(
    () => autosave.state,
    (value) => {
      if (value === true) {
        create()
      } else {
        destroy()
      }
    },
    { immediate: true }
  )

  // Remove titles and flows
  const titles = storages.titles.table
  const flows = storages.flows.table

  return { storages, titles, flows }
})
