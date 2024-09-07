<template>
  <ControlButton v-ripple v-tooltip.bottom="'Fit View'" @click="flow.fitView">
    <i class="pi pi-window-maximize" />
  </ControlButton>
</template>

<script setup lang="ts">
import { ControlButton } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'

import { useVueFlow } from '@vue-flow/core'
const flow = useVueFlow('FlowGraph')
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
