import { defineStore, storeToRefs } from 'pinia'
import { useNodesStore } from './NodesStore'
import { useEdgesStore } from './EdgesStore'

export const useGraphStore = defineStore('graph', () => {
  const { nodes } = storeToRefs(useNodesStore())
  const { edges } = storeToRefs(useEdgesStore())

  return { nodes, edges }
})
