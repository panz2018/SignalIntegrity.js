<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
// Initialize Vue
import { ref, onMounted } from 'vue'
const container = ref(null)

// Prepare graph data
const data = {
  // Nodes
  nodes: [
    {
      id: '21',
      type: 'rect',
      x: 100,
      y: 200,
      text: 'rect node'
    },
    {
      id: '50',
      type: 'circle',
      x: 300,
      y: 400,
      text: 'circle node'
    }
  ],
  // Edges
  edges: [
    {
      type: 'polyline',
      sourceNodeId: '50',
      targetNodeId: '21'
    }
  ]
}

// Initialize LogicFlow
import LogicFlow from '@logicflow/core'
import '@logicflow/core/lib/style/index.css'
const lf = ref<LogicFlow>()
onMounted(() => {
  if (container.value !== null) {
    lf.value = new LogicFlow({
      container: container.value as HTMLElement,
      grid: true
    })
    lf.value.render(data)
  }
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
