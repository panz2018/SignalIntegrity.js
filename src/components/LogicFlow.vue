<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
// Initialize Vue
import { ref, onMounted } from 'vue'
const container = ref(null)

// Prepare graph data
const data = {
  // Nodes
  nodes: [
    {
      id: '21',
      type: 'rect',
      x: 100,
      y: 200,
      text: 'rect node'
    },
    {
      id: '50',
      type: 'circle',
      x: 300,
      y: 400,
      text: 'circle node'
    }
  ],
  // Edges
  edges: [
    {
      type: 'polyline',
      sourceNodeId: '50',
      targetNodeId: '21'
    }
  ]
}

// Initialize LogicFlow
import LogicFlow from '@logicflow/core'
import '@logicflow/core/lib/style/index.css'
import { DndPanel, Menu, SelectionSelect } from '@logicflow/extension'
const lf = ref<LogicFlow>()
onMounted(() => {
  if (container.value !== null) {
    lf.value = new LogicFlow({
      container: container.value as HTMLElement,
      grid: true,
      plugins: [DndPanel, Menu, SelectionSelect]
    })
    console.log(lf.value.extension.menu)
    lf.value.extension.menu.setMenuConfig({
      nodeMenu: [
        {
          text: 'Delete',
          callback(node) {
            console.log(node)
          }
        }
      ],
      edgeMenu: [],
      graphMenu: []
    })

    lf.value.render(data)
  }
})

// https://www.yuque.com/xxtx/zeots5/ddq1vwsvgr2alv6c
// https://1024code.com/codecubes/pa3KWw7
// https://site.logic-flow.cn/
// https://site-logic--flow-cn.translate.goog/?_x_tr_sl=zh-CN&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=sc
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
