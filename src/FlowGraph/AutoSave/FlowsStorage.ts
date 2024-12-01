import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAutoSaveStore } from './AutoSave'

export interface Flow {
  title: string
  flow?: object
}

export const useFlowsStorage = defineStore('Storage', () => {
  // let database:
  //   | (Dexie & {
  //       flows: EntityTable<Flow, 'id'>
  //     })
  //   | null = null
  // const table = ref<EntityTable<Flow, 'id'> | null>(null)
  // // Create IndexedDB table
  // function create() {
  //   database = new Dexie('SignalIntegrity') as Dexie & {
  //     flows: EntityTable<Flow, 'id'>
  //   }
  //   database.version(1).stores({
  //     flows: '&id'
  //   })
  //   database.open()
  //   // Update the table
  //   table.value = database.flows
  //   // console.log(database.tables[table.value.name])
  //   database.open().then(() => {
  //     database.transaction('rw', table.value, async () => {
  //       table.value!.update(0, { title: 'test' })
  //       // table.value!.where(':id').equals('0').modify({ title: 'test' })
  //     })
  //   })
  // }
  // // Remove IndexedDB table
  // function remove() {
  //   if (table.value !== null && database !== null) {
  //     database.close()
  //     database.delete()
  //     table.value = null
  //   }
  // }
  // // Watch for AutoSave sate changes
  // const autosave = useAutoSaveStore()
  // watch(
  //   () => autosave.state,
  //   (value) => {
  //     if (value === true) {
  //       create()
  //     } else {
  //       remove()
  //     }
  //   },
  //   { immediate: true }
  // )
  // return { table }
})
