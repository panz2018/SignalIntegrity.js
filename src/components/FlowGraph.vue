<template>
  <div>
    <div class="main">
      <relation-graph ref="graph" :options="options" :on-node-click="onNodeClick">
        <template #node="{ node }">
          <div style="padding-top: 20px">Node: {{ node.text }}</div>
        </template>
      </relation-graph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RelationGraph, { type RGOptions, type RGNode } from 'relation-graph/vue3'
const graph = ref<RelationGraph>()
const options: RGOptions = {
  defaultExpandHolderPosition: 'right'
  // defaultLineShape: 4
  // debug: true,
  // showDebugPanel: true
}
const onNodeClick = (node: RGNode) => {
  console.log('onNodeClick:', node.id)
  return true
}
const data = {
  rootId: 'a',
  nodes: [
    { id: 'a', text: 'a' },
    { id: 'b', text: 'b' },
    { id: 'c', text: 'c' },
    { id: 'd', text: 'd' },
    { id: 'e', text: 'e' },
    { id: 'f', text: 'f' }
  ],
  lines: [
    { from: 'a', to: 'b', text: 'a -> b' },
    { from: 'a', to: 'c', text: 'a -> c' },
    { from: 'a', to: 'd', text: 'a -> d' },
    { from: 'a', to: 'e', text: 'a -> e' },
    { from: 'a', to: 'f', text: 'a -> f' }
  ]
}
onMounted(async () => {
  if (graph.value !== undefined) {
    graph.value.setJsonData(data)
    // const graphInstance = graph.value.getInstance()
    // graphInstance.addNodes(data.nodes)
    // graphInstance.addLines(data.lines)
    // graphInstance.rootNode = graphInstance.getNodeById(data.rootId)
    // await graphInstance.doLayout() // Layout using the layouter set in graphOptions
    // await graphInstance.moveToCenter() // Find the center based on node distribution and center the view
    // await graphInstance.zoomToFit() // Zoom to fit, so that all nodes can be displayed in the visible area
  }
})
</script>

<style scoped>
.main {
  height: calc(100% - 4px);
  width: calc(100%);
}
</style>
