import { nextTick } from 'vue'
import dagre from '@dagrejs/dagre'
import { defineStore, storeToRefs } from 'pinia'
import { Position, useVueFlow } from '@vue-flow/core'
import { useNodesStore } from './NodesStore'
import { useEdgesStore } from './EdgesStore'

export const useGraphStore = defineStore('graph', () => {
  const { nodes } = storeToRefs(useNodesStore())
  const { edges } = storeToRefs(useEdgesStore())
  const flow = useVueFlow('FlowGraph')

  // Auto layout the graph
  function autolayout(direction: 'LR' | 'RL' | 'TB' | 'BT'): void {
    // Create a new graph instance, in case some nodes/edges were removed
    // Otherwise dagre would act as if they were still there
    const dagreGraph = new dagre.graphlib.Graph()
    // Remove default edge labels
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    // Set graph layout direction
    dagreGraph.setGraph({ rankdir: direction })
    // Assign the width and height of nodes
    for (const node of nodes.value) {
      const graphNode = flow.findNode(node.id)
      dagreGraph.setNode(node.id, {
        width: graphNode?.dimensions.width || 150,
        height: graphNode?.dimensions.height || 50
      })
    }
    // Assign edges to the graph
    for (const edge of edges.value) {
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
    nodes.value = nodes.value.map((node) => {
      const position = dagreGraph.node(node.id)
      return {
        ...node,
        targetPosition: target,
        sourcePosition: source,
        position: { x: position.x, y: position.y }
      }
    })

    nextTick(() => {
      flow.fitView()
    })
  }
  return { nodes, edges, autolayout }
})
