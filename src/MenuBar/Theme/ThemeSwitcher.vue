<template>
  <Button v-ripple v-tooltip.bottom="tooltip" @click="theme.toggle" outlined>
    <i :class="`dark:text-white pi ${icon}`" />
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'

// Setup bright/dark theme
import { useThemeStore } from './theme'
const theme = useThemeStore()

// Compute the theme mode
const tooltip = computed(() => {
  return theme.theme === 'Bright' ? 'Bright theme' : 'Dark theme'
})

// Compute the them icon
const icon = computed(() => {
  if (theme.theme === 'Bright') {
    return 'pi-sun'
  } else {
    return 'pi-moon'
  }
})
</script>

<style scoped>
Button {
  width: 30px;
  height: 30px;
  padding: 2px;
  border-radius: 5px;
}
</style>
