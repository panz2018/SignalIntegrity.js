import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme: Ref<'Dark' | 'Bright'> = ref(
    (localStorage.getItem('theme') ?? 'Dark') === 'Bright' ? 'Bright' : 'Dark'
  )
  function toggle() {
    theme.value = theme.value === 'Dark' ? 'Bright' : 'Dark'
  }
  function save() {
    localStorage.setItem('theme', theme.value)
  }

  return { theme, toggle, save }
})
