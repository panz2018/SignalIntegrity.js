<template>
  <VueFlow
    :nodes="graph.nodes"
    :edges="graph.edges"
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
      <button type="button" @click="console.log(flow.getNodes.value)">VueFlow Nodes</button>
      <button type="button" @click="console.log(graph.nodes)">Graph Nodes</button>
    </Panel>
  </VueFlow>
</template>

<script setup lang="ts">
// Setup the VueFlow
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import { Background } from '@vue-flow/background'
import ToolBar from './ToolBar/ToolBar.vue'
import NavigationMap from './NavigationMap/NavigationMap.vue'
// Setup graph for VueFlow
import { useGraphStore } from './Graph/graphStore'
const graph = useGraphStore()
// Dark/Bright theme
import { useThemeStore } from '@/MenuBar/Theme/theme'
const theme = useThemeStore()

// Setup panel for VueFlow
import { Panel } from '@vue-flow/core'
function addNode() {
  const id = Date.now().toString()
  graph.nodes.push({
    id: id,
    position: { x: 150, y: 50 },
    data: { label: `Node ${id}` }
  })
}

// Setup useVueFlow
import { useVueFlow } from '@vue-flow/core'
const flow = useVueFlow('FlowGraph')
flow.snapToGrid.value = true // to enable snapping to grid
flow.onConnect((connection) => {
  flow.addEdges(connection)
})
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
