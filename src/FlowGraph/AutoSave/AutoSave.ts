import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAutoSaveStore = () => {
  const innerStore = defineStore('AutoSave', () => {
    const state = ref<boolean | null>(null)

    function toggle() {
      state.value = !state.value
      save()
    }

    function read() {
      // autosave.value = (localStorage.getItem('AutoSave') ?? 'Dark') === 'Bright' ? 'Bright' : 'Dark'
    }

    function save() {
      // // Update theme for PrimeVue
      // const rootClass = document.getElementsByTagName('html')[0].classList
      // if (theme.value === 'Bright') {
      //   rootClass.remove('p-dark')
      // } else {
      //   rootClass.add('p-dark')
      // }
      // // Save to local storage
      // localStorage.setItem('theme', theme.value)
    }

    return { state, toggle, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
