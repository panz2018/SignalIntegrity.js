<template>
  <span ref="label" v-show="showLabel" @click="onClick">{{ title }}</span>
  <div ref="editor" v-show="!showLabel">
    <input ref="input" v-model="title" @keyup.enter="submit" type="text" class="input" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import events from '@/events'
const title = defineModel({ type: String, required: true })
const { focused } = defineProps({
  focused: { type: Boolean, required: true }
})
const showLabel = ref(true)
const label = useTemplateRef('label')
const editor = useTemplateRef('editor')
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
function onClick() {
  if (focused === false) return
  if (!label.value) return
  if (!input.value) return

  // Remove validation
  input.value.style.removeProperty('color')
  // Adjust the width of input
  input.value.style.width = label.value.offsetWidth + 20 + 'px'
  // Hide label, and show the editor
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

// Event to exit the editor
function submit() {
  if (title.value.length > 0) {
    // Close editor and show the label instead
    showLabel.value = true
  } else {
    error()
  }
}
window.addEventListener('click', (event) => {
  if (showLabel.value) return
  if (!label.value) return
  if (label.value.style.display !== 'none') return
  if (!editor.value) return
  if (editor.value.style.display === 'none') return
  if (!event.target) return
  if (label.value.contains(event.target as Node)) return
  if (editor.value.contains(event.target as Node)) return
  submit()
})
</script>

<style scoped>
.input {
  border: 0;
  outline: 0;
  padding: 0;
}
</style>
