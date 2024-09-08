<template>
  <div v-html="icon"></div>
</template>

<script setup lang="ts">
// Setup bright/dark theme
import { useThemeStore } from '@/MenuBar/Theme/theme'
const theme = useThemeStore()

// Compute the them icon
import { computed } from 'vue'
import { logo } from '@/logo/logo'
const icon = computed(() => {
  if (theme.theme === 'Bright') {
    return logo({ dark: false })
  } else {
    return logo({ dark: true })
  }
})
</script>

<style scoped>
div {
  width: 30px;
  height: 30px;
}
</style>
