<template>
  <VueFlow
    :class="{ dark: theme.theme === 'Bright' ? false : true }"
    :default-viewport="{ zoom: 1.0 }"
    :min-zoom="0.1"
    :max-zoom="10"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    :apply-default="false"
  >
    <BackGround />
    <ToolBar />
    <NavigationMap />
    <Panel position="top-right">
      <button type="button" @click="testGraph">Add Test Graph</button>
      <button type="button" @click="console.log(JSON.stringify(flow.toObject()))">VueFlow</button>
      <button type="button" @click="onAdd">Add</button>
    </Panel>
    <AddNodeDialog />
  </VueFlow>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import BackGround from './BackGround.vue'
import ToolBar from './ToolBar/ToolBar.vue'
import NavigationMap from './NavigationMap/NavigationMap.vue'
import events from '@/events'

// Dark/Bright theme
import { useThemeStore } from '@/MenuBar/Theme/theme'
const theme = useThemeStore()

// Drag and drop to add new nodes
import AddNodeDialog from './AddNode/AddNodeDialog.vue'
import { useDnDStore } from './AddNode/DndStore'
const { onDragOver, onDragLeave, onDrop } = useDnDStore()

// Setup useVueFlow
import { useVueFlow } from '@vue-flow/core'
import type { FlowExportObject } from '@vue-flow/core'
const { flowID } = defineProps({
  flowID: { type: Number, required: true }
})
const flow = useVueFlow(flowID.toString())
flow.snapToGrid.value = true // to enable snapping to grid
flow.onConnect((connection) => {
  flow.addEdges(connection)
})

// Wait for ready
onMounted(() => {
  events.emit('CursorWait')
})
flow.onPaneReady(() => {
  events.emit('CursorDefault')
})

// Handle errors
import { isErrorOfType, ErrorCode, VueFlowError } from '@vue-flow/core'
flow.onError((error: VueFlowError) => {
  if (!isErrorOfType(error, ErrorCode.MISSING_VIEWPORT_DIMENSIONS)) {
    throw error
  }
})

// Handle node changes
flow.onNodesChange(async (changes) => {
  const nextChanges = []
  for (const change of changes) {
    if (['add', 'dimensions', 'position', 'select', 'remove'].includes(change.type)) {
      nextChanges.push(change)
    } else {
      throw new Error(`Unknow node operation: ${change.type}`)
    }
  }
  flow.applyNodeChanges(nextChanges)

  if (storage.value) {
    // Save flow changes into storage
    startWatcher()
  }
})

// Handle edge changes
flow.onEdgesChange(async (changes) => {
  const nextChanges = []
  for (const change of changes) {
    if (['add', 'remove'].includes(change.type)) {
      nextChanges.push(change)
    } else {
      throw new Error(`Unknown edge operation: ${change.type}`)
    }
  }
  flow.applyEdgeChanges(nextChanges)

  if (storage.value) {
    // Save flow changes into storage
    startWatcher()
  }
})

// Read and save the flow
import { liveQuery } from 'dexie'
import { storeToRefs } from 'pinia'
import { useFlowsStore } from '@/FlowGraph/FlowsStore'
const { flows: storage } = storeToRefs(useFlowsStore())
let watcher: (() => void) | null = null // Stop the watcher for flow change
function startWatcher() {
  if (!watcher) {
    watcher = watch(
      () => flow.toObject(),
      (data) => {
        storage.value!.put(data, flowID as never)
      },
      { deep: true, immediate: true }
    )
  }
}
function stopWatcher() {
  if (watcher) {
    watcher()
    watcher = null
  }
  if (storage.value) {
    storage.value.delete(flowID as never)
  }
}
watch(
  () => storage.value,
  (db) => {
    if (db !== null) {
      startWatcher()
    } else {
      stopWatcher()
    }
  }
)
if (storage.value) {
  const observable = liveQuery(() => storage.value!.get(flowID as never))
  // Subscribe
  const subscription = observable.subscribe({
    next: (o) => {
      if (o) {
        // Read from storage to Vue-flow
        flow.fromObject(o as FlowExportObject).then((status) => {
          if (status) {
            // Unsubscribe
            subscription.unsubscribe()
            // // Start watcher for flow changes
            startWatcher()
          } else {
            throw new Error(`Unable to load flow: ${JSON.stringify(o)}`)
          }
        })
      }
    },
    error: (error) => {
      throw error
    }
  })
}

function onAdd() {
  const id = flow.nodes.value.length + 1

  const newNode = {
    id: `random_node-${id}`,
    label: `Node ${id}`,
    position: {
      x: Math.random() * flow.dimensions.value.width,
      y: Math.random() * flow.dimensions.value.height
    }
  }

  flow.addNodes([newNode])
}

// Setup panel for VueFlow
import { Panel } from '@vue-flow/core'
import { Position } from '@vue-flow/core'
import { MarkerType } from '@vue-flow/core'
function testGraph() {
  flow.addNodes([
    {
      id: 'A',
      type: 'input',
      sourcePosition: Position.Bottom,
      position: { x: 250, y: 0 },
      data: { label: 'Node 1' },
      style: { color: 'white', backgroundColor: 'green', width: '100px', height: '50px' }
    },
    {
      id: 'B',
      type: 'output',
      targetPosition: Position.Top,
      position: { x: 100, y: 100 },
      data: { label: 'Node 2' },
      style: { '--vf-node-color': 'green' },
      width: 200,
      height: 60
    },
    {
      id: 'C',
      type: 'default',
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: { x: 400, y: 100 },
      data: { label: 'Node 3' }
    },
    {
      id: 'D',
      type: 'default',
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: { x: 150, y: 200 },
      data: { label: 'Node 4' }
    },
    {
      id: 'E',
      type: 'output',
      targetPosition: Position.Top,
      position: { x: 300, y: 300 },
      data: { label: 'Node 5' }
    }
  ])
  flow.addEdges([
    {
      id: 'e1->2',
      source: 'A',
      target: 'B',
      type: 'default',
      label: undefined,
      markerEnd: undefined,
      animated: true,
      style: {}
    },
    {
      id: 'e1->3',
      source: 'A',
      target: 'C',
      type: 'default',
      label: 'edge with arrowhead',
      markerEnd: MarkerType.ArrowClosed,
      animated: false,
      style: {}
    },
    {
      id: 'e3-4',
      source: 'C',
      target: 'D',
      type: 'smoothstep',
      label: 'smoothstep-edge',
      markerEnd: undefined,
      animated: false,
      style: {}
    },
    {
      id: 'e4-5',
      source: 'D',
      target: 'E',
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
