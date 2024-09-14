import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Node } from '@vue-flow/core'

export const useNodesStore = () => {
  const innerStore = defineStore('nodes', () => {
    const nodes: Ref<Node[]> = ref([])

    return { nodes }
  })

  const store = innerStore()
  store.nodes = [
    {
      id: '1',
      type: 'input',
      position: { x: 250, y: 0 },
      data: { label: 'Node 1' },
      style: { color: 'white', backgroundColor: 'green', width: '100px', height: '50px' }
    },
    {
      id: '2',
      type: 'output',
      position: { x: 100, y: 100 },
      data: { label: 'Node 2' },
      style: { '--vf-node-color': 'green' }
    },
    {
      id: '3',
      type: 'default',
      position: { x: 400, y: 100 },
      data: { label: 'Node 3' }
    },
    { id: '4', type: 'default', position: { x: 150, y: 200 }, data: { label: 'Node 4' } },
    { id: '5', type: 'output', position: { x: 300, y: 300 }, data: { label: 'Node 5' } }
  ]
  return store
}
