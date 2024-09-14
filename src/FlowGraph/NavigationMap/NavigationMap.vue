<template>
  <MiniMap
    v-show="navigation.status"
    :position="navigation.position"
    :pannable="true"
    :zoomable="true"
  />
</template>

<script setup lang="ts">
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/minimap/dist/style.css'

// Determine to show/hide NavigationMap
import { storeToRefs } from 'pinia'
import { useNavigationStore } from './NavigationStore'
const { navigation } = storeToRefs(useNavigationStore())
</script>
