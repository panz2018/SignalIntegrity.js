import { nextTick } from 'vue'
import dagre from '@dagrejs/dagre'
import { Position, useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'

type Direction = 'LR' | 'RL' | 'TB' | 'BT'

export const useAutolayout = () => {
  // Auto layout the graph
  function autoLayout(direction: Direction): void {
    const flows = useMultiFlows()
    const flow = useVueFlow(flows.current.toString())

    // Create a new graph instance, in case some nodes/edges were removed
    // Otherwise dagre would act as if they were still there
    const dagreGraph = new dagre.graphlib.Graph()
    // Remove default edge labels
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    // Set graph layout direction
    dagreGraph.setGraph({ rankdir: direction })
    // Assign the width and height of nodes
    for (const node of flow.getNodes.value) {
      const graphNode = flow.findNode(node.id)
      dagreGraph.setNode(node.id, {
        width: graphNode?.dimensions.width || 150,
        height: graphNode?.dimensions.height || 37
      })
    }
    // Assign edges to the graph
    for (const edge of flow.getEdges.value) {
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
    flow.getNodes.value.forEach((node) => {
      const position = dagreGraph.node(node.id)
      flow.updateNode(node.id, {
        targetPosition: target,
        sourcePosition: source,
        position: { x: position.x, y: position.y }
      })
    })

    nextTick(() => {
      flow.fitView()
    })
  }

  const autolayoutMenu = {
    label: 'Auto Layout',
    icon: 'pi pi-objects-column',
    items: [
      {
        label: 'Left => Right',
        command: () => {
          autoLayout('LR')
        }
      },
      {
        label: 'Right => Left',
        command: () => {
          autoLayout('RL')
        }
      },
      {
        label: 'Top => Bottom',
        command: () => {
          autoLayout('TB')
        }
      },
      {
        label: 'Bottom => Top',
        command: () => {
          autoLayout('BT')
        }
      }
    ]
  }

  return { autolayoutMenu }
}
