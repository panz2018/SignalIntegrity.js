import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAutoSaveStore = () => {
  const innerStore = defineStore('AutoSave', () => {
    const state = ref<boolean | null>(null)

    function toggle() {
      state.value = !state.value
      save()
    }

    function read() {
      const value = localStorage.getItem('AutoSave')
      if (value) {
        state.value = JSON.parse(value) === true ? true : false
      } else {
        state.value = null
      }
      // Watch for state changes and save to local storage
      watch(state, () => save())
    }

    function save() {
      // Save to local storage
      if (state.value !== null) {
        localStorage.setItem('AutoSave', JSON.stringify(state.value))
      } else {
        localStorage.removeItem('AutoSave')
      }
    }

    return { state, toggle, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
