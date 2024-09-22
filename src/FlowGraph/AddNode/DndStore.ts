import { defineStore } from 'pinia'

const nodeTypes = ['input', 'default', 'output'] as const
type NodeTypes = (typeof nodeTypes)[number]

export const useDnDStore = defineStore('DnD', () => {
  function onDragStart(event: DragEvent, type: NodeTypes): void {
    console.log(event)
    console.log(type)
  }

  return { onDragStart }
})
