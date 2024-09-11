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
    <Panel position="top-left">
      <button type="button" @click="addNode">Add a node</button>
      <button type="button" @click="layoutGraph('RL')">layoutGraph('LR')</button>
    </Panel>
  </VueFlow>
</template>

<script setup lang="ts">
// Setup the VueFlow
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

// Setup nodes for VueFlow
import { storeToRefs } from 'pinia'
import { useNodesStore } from './Nodes/NodesStore'
const { nodes } = storeToRefs(useNodesStore())

// Setup edges for VueFlow
import { useEdgesStore } from './Edges/EdgesStore'
const { edges } = storeToRefs(useEdgesStore())

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

import dagre from '@dagrejs/dagre'
import { Position } from '@vue-flow/core'
import type { Node } from '@vue-flow/core'
import type { Edge } from '@vue-flow/core'
function layout(nodes: Node[], edges: Edge[], direction: 'LR' | 'RL' | 'TB' | 'BT') {
  // Create a new graph instance, in case some nodes/edges were removed
  // Otherwise dagre would act as if they were still there
  const dagreGraph = new dagre.graphlib.Graph()
  // Remove default edge labels
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  // Set graph layout direction
  dagreGraph.setGraph({ rankdir: direction })
  // Assign the widht and height of nodes
  for (const node of nodes) {
    const graphNode = flow.findNode(node.id)
    dagreGraph.setNode(node.id, {
      width: graphNode?.dimensions.width || 150,
      height: graphNode?.dimensions.height || 50
    })
  }
  // Assign edges to the graph
  for (const edge of edges) {
    dagreGraph.setEdge(edge.source, edge.target)
  }
  // Layout the graph
  dagre.layout(dagreGraph)

  // Assign targetPosition
  const targets = {
    LR: Position.Left,
    RL: Position.Right,
    TB: Position.Top,
    BT: Position.Bottom
  }
  const target = targets[direction]
  // Assign sourcePostion
  const sources = {
    LR: Position.Right,
    RL: Position.Left,
    TB: Position.Bottom,
    BT: Position.Top
  }
  const source = sources[direction]

  // Calculate new nodes with the updated positions
  return nodes.map((node) => {
    const position = dagreGraph.node(node.id)
    return {
      ...node,
      targetPosition: target,
      sourcePosition: source,
      position: { x: position.x, y: position.y }
    }
  })
}

import { nextTick } from 'vue'
function layoutGraph(direction: 'LR' | 'RL' | 'TB' | 'BT') {
  nodes.value = layout(nodes.value, edges.value, direction)

  nextTick(() => {
    flow.fitView()
  })
}
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
