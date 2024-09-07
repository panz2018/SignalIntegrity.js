<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :class="{ dark: theme.theme === 'Bright' ? false : true }"
    :default-viewport="{ zoom: 1.0 }"
    :min-zoom="0.2"
    :max-zoom="4"
    fit-view-on-init
  >
    <Background patternColor="#81818a" :gap="20" :size="1.0" :x="0" :y="0" />
    <MiniMap :pannable="true" :zoomable="true" />
    <Controls position="top-left" :showZoom="false" :showFitView="false" :showInteractive="false">
      <FitView />
      <ZoomIn />
      <ControlButton v-tooltip.bottom="'Zoom out'" @click="flow.zoomOut">
        <ZoomOut />
      </ControlButton>
      <ControlButton
        :title="
          flow.nodesDraggable.value || flow.nodesConnectable.value || flow.elementsSelectable.value
            ? 'Enable modification'
            : 'Disable modification'
        "
        @click="
          flow.setInteractive(
            !(
              flow.nodesDraggable.value ||
              flow.nodesConnectable.value ||
              flow.elementsSelectable.value
            )
          )
        "
      >
        <LockSolid
          v-if="
            !(
              flow.nodesDraggable.value ||
              flow.nodesConnectable.value ||
              flow.elementsSelectable.value
            )
          "
        />
        <UnlockSolid
          v-if="
            flow.nodesDraggable.value ||
            flow.nodesConnectable.value ||
            flow.elementsSelectable.value
          "
        />
      </ControlButton>
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
import { ControlButton, Controls } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'

// Setup useVueFlow
import { useVueFlow } from '@vue-flow/core'
const flow = useVueFlow('FlowGraph')
flow.snapToGrid.value = true // to enable snapping to grid
flow.onConnect((connection) => {
  flow.addEdges(connection)
})

// Setup icons
import FitView from '@/FlowGraph/Controls/FitView/FitView.vue'
import ZoomIn from '@/FlowGraph/Controls/ZoomIn/ZoomIn.vue'
import ZoomOut from '@/assets/ZoomOut.vue'
import LockSolid from '@/assets/LockSolid.vue'
import UnlockSolid from '@/assets/UnlockSolid.vue'

import { useThemeStore } from '@/stores/theme'
const theme = useThemeStore()
</script>

<style scoped>
.vue-flow__controls-button {
  width: 20px;
  height: 20px;
}

.vue-flow__controls-button svg {
  max-width: 20px;
  max-height: 20px;
}

.dark {
  background: #18181b;
  color: #fffffb;
}

.dark .vue-flow__node {
  background: #4a5568;
  color: #fffffb;
}

.dark .vue-flow__node.selected {
  background: hsl(0, 0%, 20%);
  box-shadow: 0 0 0 2px #2563eb;
}

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
  border: none;
}

.dark .vue-flow__controls .vue-flow__controls-button:hover {
  background: hsl(0, 0%, 30%);
}

.dark .vue-flow__edge-textbg {
  fill: #292524;
}

.dark .vue-flow__edge-text {
  fill: #fffffb;
}
</style>
