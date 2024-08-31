<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :default-viewport="{ zoom: 1.0 }"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <Background patternColor="#81818a" :gap="20" :size="1.0" :x="0" :y="0" />
    <MiniMap :pannable="true" :zoomable="true" />
    <Controls position="top-left" :showZoom="true" :showFitView="true" :showInteractive="true">
      <!-- <ControlButton title="Rest Transform" @click="resetTransform"> </ControlButton> -->
    </Controls>
    <Panel position="top-right">
      <button type="button" @click="addNode">Add a node</button>
    </Panel>
  </VueFlow>
</template>

<script setup lang="ts">
// Setup Vue
import { ref } from 'vue'

// Setup the VueFlow
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

// Setup nodes for VueFlow
import type { Node } from '@vue-flow/core'
const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
    style: { color: 'white', backgroundColor: 'green', width: '100px', height: '50px' }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
    style: { '--vf-node-color': 'blue' }
  },
  {
    id: '3',
    type: 'output',
    position: { x: 400, y: 200 },
    data: { label: 'Node 3' }
  }
])

// Setup edges for VueFlow
import type { Edge } from '@vue-flow/core'
const edges = ref<Edge[]>([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
    // type: 'bezier',
    animated: false
  },
  {
    id: 'e2->3',
    source: '2',
    target: '3',
    // type: 'bezier',
    animated: true
  }
])

// Setup panel for VueFlow
import { Panel } from '@vue-flow/core'
function addNode() {
  const id = Date.now().toString()
  nodes.value.push({
    id: id,
    position: { x: 150, y: 50 },
    data: { label: `Node ${id}` }
  })
}

// Setup background for VueFlow
import { Background } from '@vue-flow/background'

// Setup minimap for VueFlow
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/minimap/dist/style.css'

// Setup toolbar for VueFlow
import { Controls } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'
// import { ControlButton, Controls } from '@vue-flow/controls'
// function resetTransform() {
//   setViewport({ x: 0, y: 0, zoom: 1 })
// }

// Setup useVueFlow
import { useVueFlow } from '@vue-flow/core'
const flow = useVueFlow()
flow.snapToGrid.value = true // to enable snapping to grid
flow.onInit((instance) => instance.fitView())
flow.onConnect((connection) => {
  flow.addEdges(connection)
})
</script>

<style scoped></style>
