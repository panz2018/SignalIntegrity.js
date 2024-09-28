<template>
  <VueFlow
    :class="{ dark: theme.theme === 'Bright' ? false : true }"
    :default-viewport="{ zoom: 1.0 }"
    :min-zoom="0.1"
    :max-zoom="10"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <BackGround />
    <ToolBar />
    <NavigationMap />
    <Panel position="top-right">
      <button type="button" @click="testGraph">Add Test Graph</button>
      <button type="button" @click="console.log(flow.toObject())">VueFlow</button>
    </Panel>
    <AddNodeDialog />
  </VueFlow>
</template>

<script setup lang="ts">
// Setup the VueFlow
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import BackGround from './BackGround.vue'
import ToolBar from './ToolBar/ToolBar.vue'
import NavigationMap from './NavigationMap/NavigationMap.vue'
// Dark/Bright theme
import { useThemeStore } from '@/MenuBar/Theme/theme'
const theme = useThemeStore()

// Drag and drop to add new nodes
import AddNodeDialog from './AddNode/AddNodeDialog.vue'
import { useDnDStore } from './AddNode/DndStore'
const { onDragOver, onDragLeave, onDrop } = useDnDStore()

// Setup useVueFlow
import { useVueFlow } from '@vue-flow/core'
const { flow: flowId } = defineProps({
  flow: String
})
const flow = useVueFlow(flowId)
flow.snapToGrid.value = true // to enable snapping to grid
flow.onConnect((connection) => {
  flow.addEdges(connection)
})

// Handle errors
import { isErrorOfType, ErrorCode, VueFlowError } from '@vue-flow/core'
flow.onError(handleError)
function handleError(error: VueFlowError) {
  if (!isErrorOfType(error, ErrorCode.MISSING_VIEWPORT_DIMENSIONS)) {
    throw error
  }
}

// Setup panel for VueFlow
import { Panel } from '@vue-flow/core'
import { Position } from '@vue-flow/core'
import { MarkerType } from '@vue-flow/core'
function testGraph() {
  flow.addNodes([
    {
      id: '1',
      type: 'input',
      sourcePosition: Position.Bottom,
      position: { x: 250, y: 0 },
      data: { label: 'Node 1' },
      style: { color: 'white', backgroundColor: 'green', width: '100px', height: '50px' }
    },
    {
      id: '2',
      type: 'output',
      targetPosition: Position.Top,
      position: { x: 100, y: 100 },
      data: { label: 'Node 2' },
      style: { '--vf-node-color': 'green' },
      width: 200,
      height: 60
    },
    {
      id: '3',
      type: 'default',
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: { x: 400, y: 100 },
      data: { label: 'Node 3' }
    },
    {
      id: '4',
      type: 'default',
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: { x: 150, y: 200 },
      data: { label: 'Node 4' }
    },
    {
      id: '5',
      type: 'output',
      targetPosition: Position.Top,
      position: { x: 300, y: 300 },
      data: { label: 'Node 5' }
    }
  ])
  flow.addEdges([
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
