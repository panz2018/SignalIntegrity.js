import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = () => {
  const innerStore = defineStore('theme', () => {
    const theme: Ref<'Dark' | 'Bright'> = ref('Dark')

    function toggle() {
      theme.value = theme.value === 'Dark' ? 'Bright' : 'Dark'
      save()
    }

    function read() {
      theme.value = (localStorage.getItem('theme') ?? 'Dark') === 'Bright' ? 'Bright' : 'Dark'
    }

    function save() {
      // Update theme for PrimeVue
      const rootClass = document.getElementsByTagName('html')[0].classList
      if (theme.value === 'Bright') {
        rootClass.remove('p-dark')
      } else {
        rootClass.add('p-dark')
      }
      // Save to local storage
      localStorage.setItem('theme', theme.value)
    }

    return { theme, toggle, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
