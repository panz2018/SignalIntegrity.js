import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

const nodeTypes = [null, 'input', 'default', 'output'] as const
type NodeType = (typeof nodeTypes)[number]

export const useDnDStore = defineStore('DnD', () => {
  // Define properties
  const draggedType: Ref<NodeType> = ref(null)
  const isDragging: Ref<Boolean> = ref(false)
  const isDragOver: Ref<Boolean> = ref(false)

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

  function onDragOver(event: DragEvent): void {
    event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  return { isDragOver, onDragStart, onDragOver }
})
