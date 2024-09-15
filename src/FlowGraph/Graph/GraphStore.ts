import { nextTick } from 'vue'
import type { Ref } from 'vue'
import dagre from '@dagrejs/dagre'
import { defineStore, storeToRefs } from 'pinia'
import type { Edge, Node } from '@vue-flow/core'
import { Position, useVueFlow } from '@vue-flow/core'
import { useNodesStore } from './NodesStore'
import { useEdgesStore } from './EdgesStore'

// Default perperties
const directions = ['LR', 'RL', 'TB', 'BT'] as const
type Direction = (typeof directions)[number]

export const useGraphStore = defineStore(
  'graph',
  (): {
    nodes: Ref<Node[]>
    edges: Ref<Edge[]>
    reset: () => void
    autoLayout: (direction: Direction) => void
  } => {
    const nodes = storeToRefs(useNodesStore())
    const edges = storeToRefs(useEdgesStore())
    const flow = useVueFlow('FlowGraph')

    function reset(): void {
      nodes.nodes.value = []
      edges.edges.value = []
    }

    // Auto layout the graph
    function autoLayout(direction: Direction): void {
      // Create a new graph instance, in case some nodes/edges were removed
      // Otherwise dagre would act as if they were still there
      const dagreGraph = new dagre.graphlib.Graph()
      // Remove default edge labels
      dagreGraph.setDefaultEdgeLabel(() => ({}))
      // Set graph layout direction
      dagreGraph.setGraph({ rankdir: direction })
      // Assign the width and height of nodes
      for (const node of nodes.nodes.value) {
        const graphNode = flow.findNode(node.id)
        dagreGraph.setNode(node.id, {
          width: graphNode?.dimensions.width || 150,
          height: graphNode?.dimensions.height || 50
        })
      }
      // Assign edges to the graph
      for (const edge of edges.edges.value) {
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
      nodes.nodes.value = nodes.nodes.value.map((node) => {
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

    return {
      nodes: nodes.nodes,
      edges: edges.edges,
      reset,
      autoLayout
    }
  }
)
