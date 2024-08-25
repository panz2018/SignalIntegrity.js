<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :default-viewport="{ zoom: 1.0 }"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <Background pattern-color="#AAAAAA" :gap="16" />
    <MiniMap />
    <Controls position="top-left">
      <ControlButton title="Rest Transform" @click="resetTransform"> </ControlButton>
    </Controls>
    <Panel position="top-right">
      <button type="button" @click="addNode">Add a node</button>
    </Panel>
  </VueFlow>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Setup the VueFlow
import { VueFlow, useVueFlow } from '@vue-flow/core'
import type { Node, Edge } from '@vue-flow/core'
const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()
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

// Setup background, minimap for VueFlow
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'

// Setup toolbar for VueFlow
import { ControlButton, Controls } from '@vue-flow/controls'
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}
</script>

<style scoped></style>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';
</style>
