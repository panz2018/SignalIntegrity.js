<template>
  <span ref="label" v-show="showLabel" @click="onClick">{{ title }}</span>
  <input
    ref="editor"
    v-show="!showLabel"
    v-model="title"
    @keyup.enter="submit"
    type="text"
    class="editor"
  />
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

// Error message
function error() {
  events.emit('Error', {
    severity: 'error',
    summary: 'Error',
    detail: 'Flow name cannot be empty',
    life: 3000
  })
}

// Event to enter the editor
function onClick() {
  if (focused === false) return
  if (!label.value) return
  if (!editor.value) return

  // Remove validation
  editor.value!.style.removeProperty('color')
  // Adjust the width of editor
  editor.value.style.width = label.value.offsetWidth + 20 + 'px'
  // Hide label, and show the editor
  showLabel.value = false

  // Focus on input
  nextTick(() => {
    if (editor.value) {
      editor.value.focus()
    }
  })
}

// Validate the editor input
watch(title, (newVal, oldVal) => {
  if (!editor.value) return
  if (newVal.length === 0) {
    title.value = oldVal
    editor.value!.style.color = 'red'
    error()
  } else if (oldVal.length !== 0) {
    editor.value!.style.removeProperty('color')
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
.editor {
  border: 0;
  outline: 0;
  padding: 0;
}
</style>
