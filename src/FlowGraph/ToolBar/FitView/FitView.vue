<template>
  <ControlButton v-ripple v-tooltip.bottom="fitview.label" @click="fitview.command">
    <i :class="fitview.icon" />
  </ControlButton>
</template>

<script setup lang="ts">
import { ControlButton } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'
import fitview from './FitView'

// Fit viewport
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlows'
const { current } = storeToRefs(useMultiFlows())
const flow = useVueFlow(current.value)
onMounted(() => {
  flow.fitView()
})
flow.onInit(() => {
  flow.fitView()
})
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
