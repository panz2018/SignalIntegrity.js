import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAutoSaveStore } from './AutoSave'

export interface Flow {
  title: string
  flow?: object
}

export const useFlowsStorage = defineStore('Storage', () => {
  const database = ref(null)

  function open() {
    return new Promise<void>((resolve, reject) => {
      // Check browser support
      if (!indexedDB) {
        reject('Your browser does not support IndexedDB. Please use the newest version.')
      }

      // Open the database
      const request = indexedDB.open('SignalIntegrity', 1)
      request.onerror = (event) => {
        reject(event)
      }
      request.onsuccess = (event) => {
        database.value = (event.target as any).result
        resolve()
      }
      request.onupgradeneeded = (event) => {
        // Save the IndexedDB interface
        const db = (event.target as any).result
        // Create an objectStore for this database
        db.createObjectStore('flows')
      }
    })
  }
  open().then(() => {
    console.log(database.value)
  })

  // request.onsuccess = (event) => {
  //   const db = event.target.result
  //   db.error = (event) => {
  //     console.log(event)
  //   }
  //   const transaction = db.transaction('flows', 'readwrite') // (1)
  //   // get an object store to operate on it
  //   const table = transaction.objectStore('flows')
  //   const task1 = table.add(
  //     {
  //       title: 'Flow-0',
  //       flow: { flow: { a: [1, 2], b: ['a', 'b'] } }
  //     },
  //     '0'
  //   )
  //   task1.onerror = function (event) {
  //     // ConstraintError occurs when an object with the same id already exists
  //     if (task1.error.name == 'ConstraintError') {
  //       console.log('Book with such id already exists') // handle the error
  //       event.preventDefault() // don't abort the transaction
  //       // use another key for the book?
  //     } else {
  //       // unexpected error, can't handle it
  //       // the transaction will abort
  //     }
  //   }
  //   task1.onabort = function () {
  //     console.log('Error', transaction.error)
  //   }
  //   const task2 = table.add(
  //     {
  //       title: 'Flow-A',
  //       flow: { flow: { a: [1, 2], b: ['a', 'b'] } }
  //     },
  //     '1'
  //   )
  //   task2.onerror = function (event) {
  //     console.log(task2.error.name)
  //   }
  //   const task3 = table.delete('1')
  //   task3.onsuccess = () => {
  //     console.log('Key=1:', task3.result)
  //   }
  //   task3.onerror = (event) => {
  //     console.log('Key=1:', event)
  //   }
  //   transaction.oncomplete = function () {
  //     console.log('Transaction is complete')
  //   }
  // }

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
