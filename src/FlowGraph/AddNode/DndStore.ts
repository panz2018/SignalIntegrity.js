import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useVueFlow } from '@vue-flow/core'

const nodeTypes = [null, 'input', 'default', 'output'] as const
type NodeType = (typeof nodeTypes)[number]

export const useDnDStore = defineStore('DnD', () => {
  // Define properties
  const draggedType: Ref<NodeType> = ref(null)
  const isDragging: Ref<Boolean> = ref(false)
  const isDragOver: Ref<Boolean> = ref(false)
  const flow = useVueFlow('FlowGraph')

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

  function onDragOver(event: DragEvent): false | void {
    const classList = (event.target as Element).classList
    if (
      draggedType.value &&
      classList.contains('vue-flow__pane') &&
      classList.contains('vue-flow__container')
    ) {
      event.preventDefault()
      isDragOver.value = true
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    } else {
      return false
    }
  }

  function onDragLeave(event: DragEvent): false | void {
    const classList = (event.target as Element).classList
    if (
      draggedType.value &&
      classList.contains('vue-flow__pane') &&
      classList.contains('vue-flow__container')
    ) {
      isDragOver.value = false
    } else {
      return false
    }
  }

  return { isDragOver, onDragStart, onDragOver, onDragLeave }
})
