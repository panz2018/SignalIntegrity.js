import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Edge } from '@vue-flow/core'
import { MarkerType } from '@vue-flow/core'

export const useEdgesStore = () => {
  const innerStore = defineStore('edges', () => {
    const edges: Ref<Edge[]> = ref([])

    return { edges }
  })

  const store = innerStore()
  store.edges = [
    {
      id: 'e1->2',
      source: '1',
      target: '2',
      type: 'default',
      label: undefined,
      markerEnd: undefined,
      animated: true,
      style: {}
    },
    {
      id: 'e1->3',
      source: '1',
      target: '3',
      type: 'default',
      label: 'edge with arrowhead',
      markerEnd: MarkerType.ArrowClosed,
      animated: false,
      style: {}
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      type: 'smoothstep',
      label: 'smoothstep-edge',
      markerEnd: undefined,
      animated: false,
      style: {}
    },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      type: 'step',
      label: 'Node 2',
      markerEnd: undefined,
      animated: false,
      style: { stroke: 'orange' },
      labelBgStyle: { fill: 'orange' }
    }
  ]
  return store
}
