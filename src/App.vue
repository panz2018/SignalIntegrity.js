<template>
  <MenuBar />
  <MultiFlows />
  <Toast
    :pt="{
      closeButton: {
        autofocus: false
      }
    }"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import MenuBar from '@/MenuBar/MenuBar.vue'
import MultiFlows from '@/FlowGraph/MultiFlows.vue'
import events from '@/events'

// Toast is used to display messages in an overlay
const toast = useToast()
events.on('Error', (...args) => {
  toast.add(args[0])
})

// Cursor wait/default
let waits = 0
events.on('CursorWait', () => {
  waits += 1
  if (waits > 0) {
    document.body.style.cursor = 'wait'
    // Update cursor for FlowGraph
    const panes = document.querySelectorAll('.vue-flow__pane')
    panes.forEach((pane) => {
      ;(pane as HTMLElement).style.cursor = 'wait'
    })
  }
})
events.on('CursorDefault', () => {
  waits -= 1
  if (waits <= 0) {
    document.body.style.cursor = 'default'
    // Update cursor for FlowGraph
    const panes = document.querySelectorAll('.vue-flow__pane')
    panes.forEach((pane) => {
      ;(pane as HTMLElement).style.cursor = 'grab'
    })
  }
})
events.emit('CursorWait')
onMounted(() => {
  events.emit('CursorDefault')
})
</script>
