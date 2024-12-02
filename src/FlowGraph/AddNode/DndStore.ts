import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useVueFlow } from '@vue-flow/core'
import type { Node } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlows'

type NodeType = null | 'input' | 'default' | 'output'

export const useDnDStore = defineStore('DnD', () => {
  // Define properties
  const draggedType: Ref<NodeType> = ref(null)
  const isDragging: Ref<boolean> = ref(false)
  const isDragOver: Ref<boolean> = ref(false)

  // Watch for dragging
  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event: DragEvent, type: NodeType): void {
    if (event.dataTransfer && type !== null) {
      event.dataTransfer.setData('FlowGraph/FlowGraph', type)
      event.dataTransfer.effectAllowed = 'move'
    }
    draggedType.value = type
    isDragging.value = true
    document.addEventListener('drop', onDragEnd)
  }

  function onDragEnd(): void {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  function checkDrop(event: DragEvent): boolean {
    if (!draggedType.value) {
      return false
    }
    const target = event.target as Element
    if (target.tagName !== 'DIV') {
      return false
    }
    const classList = target.classList
    if (classList.contains('vue-flow__pane') && classList.contains('vue-flow__container')) {
      return true
    } else {
      return false
    }
  }

  function onDragOver(event: DragEvent): false | void {
    const status = checkDrop(event)
    if (status === false) {
      return false
    }

    event.preventDefault()
    isDragOver.value = true
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
  }

  function onDragLeave(event: DragEvent): false | void {
    const status = checkDrop(event)
    if (status === false) {
      return false
    }

    isDragOver.value = false
  }

  // Properties to add new nodes
  let id = 0
  const getId = () => `node-${id++}`

  function onDrop(event: DragEvent): false | void {
    const flows = useMultiFlows()
    const flow = useVueFlow(flows.current.toString())

    const status = checkDrop(event)
    if (status === false) {
      return false
    }

    const nodeId = getId()
    const position = flow.screenToFlowCoordinate({ x: event.clientX, y: event.clientY })
    const newNode: Node = {
      id: nodeId,
      type: draggedType.value as string,
      position,
      data: { label: draggedType.value }
    }
    const { off } = flow.onNodesInitialized(() => {
      // Align node position after drop, so it's centered to the mouse
      flow.updateNode(nodeId, (node) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2
        }
      }))

      // Hook into events even in a callback, and remove the event listener after it's been called
      off()
    })

    flow.addNodes(newNode)
  }

  return { isDragOver, onDragStart, onDragOver, onDragLeave, onDrop }
})
