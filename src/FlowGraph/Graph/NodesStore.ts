import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Position } from '@vue-flow/core'
import type { Node } from '@vue-flow/core'

export const useNodesStore = () => {
  const innerStore = defineStore('nodes', () => {
    const defaults = { dimensions: { width: 150, height: 50 } }
    const nodes: Ref<Node[]> = ref([])

    return { defaults, nodes }
  })

  const store = innerStore()
  store.nodes = [
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
      style: { '--vf-node-color': 'green' }
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
  ]
  return store
}
