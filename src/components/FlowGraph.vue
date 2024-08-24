<template>
  <div><VueFlow :nodes="nodes" :edges="edges"></VueFlow></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Setup the VueFlow
import { VueFlow } from '@vue-flow/core'
import type { Node, Edge } from '@vue-flow/core'
const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' }
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' }
  },
  {
    id: '3',
    type: 'output',
    position: { x: 400, y: 200 },
    data: { label: 'Node 3' }
  }
])
const edges = ref<Edge[]>([
  {
    id: 'e1->2',
    source: '1',
    target: '2'
  },
  {
    id: 'e2->3',
    source: '2',
    target: '3',
    animated: true
  }
])
</script>

<style scoped></style>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
</style>
