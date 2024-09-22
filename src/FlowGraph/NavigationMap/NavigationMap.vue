<template>
  <MiniMap
    v-show="navigation.status"
    :position="navigation.position"
    :pannable="true"
    :zoomable="true"
    :maskColor="theme.theme === 'Dark' ? '#4d5656DD' : undefined"
    :style="{ backgroundColor: theme.theme === 'Dark' ? 'black' : undefined }"
  />
</template>

<script setup lang="ts">
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/minimap/dist/style.css'

// Determine to show/hide NavigationMap
import { storeToRefs } from 'pinia'
import { useNavigationStore } from './NavigationStore'
const { navigation } = storeToRefs(useNavigationStore())

// Dark/Bright theme
import { useThemeStore } from '@/MenuBar/Theme/theme'
const theme = useThemeStore()
</script>
