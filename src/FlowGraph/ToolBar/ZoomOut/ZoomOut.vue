<template>
  <ControlButton v-ripple v-tooltip.bottom="zoomout.label" @click="zoomout.command">
    <i :class="zoomout.icon" />
  </ControlButton>
</template>

<script setup lang="ts">
import { ControlButton } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'
import zoomout from './ZoomOut'
</script>

<style scope>
.vue-flow__controls-button {
  width: 20px;
  height: 20px;
}

.vue-flow__controls-button svg {
  max-width: 20px;
  max-height: 20px;
}
</style>
