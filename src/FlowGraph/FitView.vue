<template>
  <ControlButton v-ripple v-tooltip.bottom="'Fit View'" @click="flow.fitView">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <g fill="none" stroke-linejoin="round" stroke-width="4">
        <path d="M44 4H4v40h40z" />
        <path stroke-linecap="round" d="M16 4v12H4m32 8v12H24m12 0L24 24M4 6v20M7 4h20" />
      </g>
    </svg>
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
