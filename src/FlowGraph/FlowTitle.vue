<template>
  <div class="container">
    <span v-show="showLabel" ref="label" @click="onEdit">{{ title }}</span>
    <input
      v-show="!showLabel"
      ref="input"
      v-model="title"
      type="text"
      class="input"
      @keyup.enter="submit"
      @keyup.esc="cancel"
    />
    <Button
      v-show="focused"
      v-tooltip.bottom="'Close'"
      icon="pi pi-times-circle"
      class="button"
      @click.stop="onClose"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import Button from 'primevue/button'
import events from '@/events'
const title = defineModel({ type: String, required: true })
const { flowID, focused } = defineProps({
  flowID: { type: Number, required: true },
  focused: { type: Boolean, required: true }
})
const showLabel = ref(true)
const label = useTemplateRef('label')
const input = useTemplateRef('input')

// Error message
function error() {
  events.emit('Error', {
    severity: 'error',
    summary: 'Error',
    detail: 'Flow name cannot be empty',
    life: 3000
  })
}

// Event to enter the input
function onEdit() {
  if (focused === false) return
  if (!label.value) return
  if (!input.value) return

  // Remove validation
  input.value.style.removeProperty('color')
  // Adjust the width of input
  input.value.style.width = label.value.offsetWidth + 20 + 'px'
  // Hide label, and show the input
  showLabel.value = false
  nextTick(() => {
    if (document.activeElement) {
      // Remove focus from the current element
      ;(document.activeElement as HTMLElement).blur()
    }
    if (input.value) {
      // Focus on input
      input.value.focus()
    }
  })
}

// Validate the input input
watch(title, (newVal, oldVal) => {
  if (!input.value) return

  if (newVal.length === 0) {
    title.value = oldVal
    input.value!.style.color = 'red'
    error()
  } else if (oldVal.length !== 0) {
    input.value!.style.removeProperty('color')
  }
})

// Cancel the edit
const previous = ref(title.value)
function cancel() {
  if (previous.value.length > 0) {
    // Assign the title from previous
    title.value = previous.value
    // Close editor and show the label instead
    showLabel.value = true
  } else {
    error()
  }
}

// Event to hide input and show label
import { useFlowsStore } from '@/FlowGraph/FlowsStore'
const { storages } = useFlowsStore()
function submit() {
  if (title.value.length > 0) {
    // Assign the title to previous
    previous.value = title.value
    // Close editor and show the label instead
    showLabel.value = true
    // Save title in IndexedDB
    if (!storages.titles.isnull) {
      storages.titles.put(title.value, flowID)
    }
  } else {
    error()
  }
}
window.addEventListener('click', (event) => {
  if (showLabel.value) return
  if (!label.value) return
  if (label.value.style.display !== 'none') return
  if (!input.value) return
  if (input.value.style.display === 'none') return
  if (!event.target) return
  if (label.value.contains(event.target as Node)) return
  if (input.value.contains(event.target as Node)) return
  submit()
})

// Close the flow
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'
const flows = useMultiFlows()
function onClose() {
  flows.closeFlow(flowID)
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}

.input {
  border: 0;
  outline: 0;
  padding: 0;
  height: 20px;
}

.button {
  border: 0;
  outline: 0;
  padding: 0;
  margin-left: 10px;
  margin-right: 0px;
  width: 20px;
  height: 20px;
}
</style>
