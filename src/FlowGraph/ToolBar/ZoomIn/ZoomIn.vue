<template>
  <ControlButton v-ripple v-tooltip.bottom="zoomin.label" @click="zoomin.command">
    <i :class="zoomin.icon" />
  </ControlButton>
</template>

<script setup lang="ts">
import { ControlButton } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'
import zoomin from './ZoomIn'
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
