<template>
  <MiniMap v-show="status" :pannable="true" :zoomable="true" />
</template>

<script setup lang="ts">
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/minimap/dist/style.css'

// Determine to show/hide NavigationMap
import { storeToRefs } from 'pinia'
import { useNavigationStatus } from './NavigationStatus'
const { status } = storeToRefs(useNavigationStatus())
</script>
