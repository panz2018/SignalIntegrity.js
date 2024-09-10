<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :class="{ dark: theme.theme === 'Bright' ? false : true }"
    :default-viewport="{ zoom: 1.0 }"
    :min-zoom="0.1"
    :max-zoom="10"
  >
    <Background patternColor="#81818a" :gap="20" :size="1.0" :x="0" :y="0" />
    <ToolBar />
    <NavigationMap />
    <Panel position="top-right">
      <button type="button" @click="addNode">Add a node</button>
    </Panel>
  </VueFlow>
</template>

<script setup lang="ts">
// Setup the VueFlow
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

// Setup nodes for VueFlow
import { ref } from 'vue'
import type { Node } from '@vue-flow/core'
const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 0 },
    data: { label: 'Node 1' },
    style: { color: 'white', backgroundColor: 'green', width: '100px', height: '50px' }
  },
  {
    id: '2',
    type: 'output',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
    style: { '--vf-node-color': 'green' }
  },
  {
    id: '3',
    type: 'default',
    position: { x: 400, y: 100 },
    data: { label: 'Node 3' }
  },
  { id: '4', type: 'default', position: { x: 150, y: 200 }, data: { label: 'Node 4' } },
  { id: '5', type: 'output', position: { x: 300, y: 300 }, data: { label: 'Node 5' } }
])

// Setup edges for VueFlow
import type { Edge } from '@vue-flow/core'
import { MarkerType } from '@vue-flow/core'
const edges = ref<Edge[]>([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
    type: 'default',
    label: undefined,
    markerEnd: undefined,
    animated: true,
    style: {}
  },
  {
    id: 'e1->3',
    source: '1',
    target: '3',
    type: 'default',
    label: 'edge with arrowhead',
    markerEnd: MarkerType.ArrowClosed,
    animated: false,
    style: {}
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    label: 'smoothstep-edge',
    markerEnd: undefined,
    animated: false,
    style: {}
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'step',
    label: 'Node 2',
    markerEnd: undefined,
    animated: false,
    style: { stroke: 'orange' },
    labelBgStyle: { fill: 'orange' }
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

// Setup toolbar for VueFlow
import ToolBar from './ToolBar/ToolBar.vue'

// Setup minimap for VueFlow
import NavigationMap from './NavigationMap/NavigationMap.vue'

// Setup useVueFlow
import { useVueFlow } from '@vue-flow/core'
const flow = useVueFlow('FlowGraph')
flow.snapToGrid.value = true // to enable snapping to grid
flow.onConnect((connection) => {
  flow.addEdges(connection)
})

// Dark/Bright theme
import { useThemeStore } from '@/MenuBar/Theme/theme'
const theme = useThemeStore()
</script>

<style scoped>
.dark {
  background: #18181b;
  color: #fffffb;
}

.dark .vue-flow__node {
  background: #4a5568;
  color: #fffffb;
}

.vue-flow__node.selected {
  background: hsl(0, 0%, 100%);
  box-shadow: 50px 50px 0 2px #2563eb;
}

.dark .vue-flow__node.selected {
  background: hsl(0, 0%, 20%);
  box-shadow: 0 0 0 2px #2563eb;
}

.dark .vue-flow__edge-textbg {
  fill: #292524;
}

.dark .vue-flow__edge-text {
  fill: #fffffb;
}
</style>
