<template>
  <div>
    <div style="border: #efefef solid 1px; height: calc(100% - 5px); width: calc(100% - 2px)">
      <relation-graph ref="graphRef" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RelationGraph, { type RGOptions } from 'relation-graph-vue3'
const graphRef = ref<RelationGraph>()
const options: RGOptions = {
  defaultExpandHolderPosition: 'right'
  // defaultLineShape: 4,
  // debug: true,
  // showDebugPanel: true
}
const jsonData = {
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
    { from: 'a', to: 'b' },
    { from: 'a', to: 'c' },
    { from: 'a', to: 'd' },
    { from: 'a', to: 'e' },
    { from: 'a', to: 'f' }
  ]
}
onMounted(() => {
  // The node and line in the above data can refer to the options in "Node" and "Link & Line" for configuration.
  // Node: https://www.relation-graph.com/#/docs/node
  // Link & Line: https://www.relation-graph.com/#/docs/link
  if (graphRef.value !== undefined) {
    graphRef.value.setJsonData(jsonData)
  }
  // The graphRef$.value.setJsonData(jsonData, callback) method is a convenient method that is equivalent to the following code:
  //  const graphInstance = graphRef$.value.getInstance();
  //  graphInstance.addNodes(jsonData.nodes);
  //  graphInstance.addLines(jsonData.lines);
  //  graphInstance.rootNode = graphInstance.getNodeById(jsonData.rootId);
  //  await graphInstance.doLayout(); // Layout using the layouter set in graphOptions
  //  await graphInstance.moveToCenter(); // Find the center based on node distribution and center the view
  //  await graphInstance.zoomToFit(); // Zoom to fit, so that all nodes can be displayed in the visible area
})
</script>

<style scoped></style>
