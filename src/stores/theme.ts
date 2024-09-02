import { onMounted, ref, watch } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme: Ref<'Dark' | 'Bright'> = ref(
    (localStorage.getItem('theme') ?? 'Dark') === 'Bright' ? 'Bright' : 'Dark'
  )

  function toggle() {
    theme.value = theme.value === 'Dark' ? 'Bright' : 'Dark'
  }

  function update() {
    // Update theme for PrimeVue
    const rootClass = document.getElementsByTagName('html')[0].classList
    if (theme.value === 'Bright') {
      rootClass.remove('p-dark')
    } else {
      rootClass.add('p-dark')
    }
  }

  watch(theme, () => {
    update()
    // Save to local storage
    localStorage.setItem('theme', theme.value)
  })

  onMounted(() => update())

  return { theme, toggle }
})
