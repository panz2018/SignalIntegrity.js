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
events.emit('CursorWait')
onMounted(() => {
  events.emit('CursorDefault')
})
</script>
