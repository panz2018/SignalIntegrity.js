<template>
  <Controls position="top-left" :showZoom="false" :showFitView="false" :showInteractive="false">
    <FitView />
    <ZoomIn />
    <ZoomOut />
    <ModificationSwitcher />
  </Controls>
</template>

<script setup lang="ts">
// Setup controls from VueFlow
import { Controls } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'

// Setup buttons for the toolbar
import FitView from '@/FlowGraph/ToolBar/FitView/FitView.vue'
import ZoomIn from '@/FlowGraph/ToolBar/ZoomIn/ZoomIn.vue'
import ZoomOut from '@/FlowGraph/ToolBar/ZoomOut/ZoomOut.vue'
import ModificationSwitcher from '@/FlowGraph/ToolBar/Modification/ModificationSwitcher.vue'
</script>

<style scoped>
.vue-flow__controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.dark .vue-flow__controls {
  border: 1px solid #fffffb;
}

.vue-flow__controls .vue-flow__controls-button {
  border: none;
  border-right: 1px solid #eee;
}

.dark .vue-flow__controls .vue-flow__controls-button {
  border: none;
  border-right: 1px solid #666;
}

.vue-flow__controls .vue-flow__controls-button svg {
  height: 100%;
  width: 100%;
}

.vue-flow__controls .vue-flow__controls-button {
  fill: #222;
  stroke: #222;
}

.dark .vue-flow__controls .vue-flow__controls-button {
  background: hsl(0, 0%, 20%);
  fill: #fffffb;
  stroke: #fffffb;
}

.vue-flow__controls .vue-flow__controls-button:hover {
  background: hsl(0, 0%, 80%);
}

.dark .vue-flow__controls .vue-flow__controls-button:hover {
  background: hsl(0, 0%, 50%);
}
</style>
