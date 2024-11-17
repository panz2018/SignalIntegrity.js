<template>
  <span ref="label" v-show="showLabel" @click="showLabel = false">{{ title }}</span>
  <input
    ref="editor"
    v-show="!showLabel"
    type="text"
    v-model="title"
    @keyup.enter="showLabel = true"
  />
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
const title = defineModel({ required: true })

const showLabel = ref(true)
const label = useTemplateRef('label')
const editor = useTemplateRef('editor')
window.addEventListener('click', (event) => {
  if (showLabel.value) return
  if (!label.value) return
  if (label.value.style.display !== 'none') return
  if (!editor.value) return
  if (editor.value.style.display === 'none') return
  if (!event.target) return
  if (label.value.contains(event.target as Node)) return
  if (editor.value.contains(event.target as Node)) return

  //   Close editor and show the label instead
  showLabel.value = true
})
</script>
