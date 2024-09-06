<template>
  <MenuBar></MenuBar>
  <FlowGraph class="graph" />
  <Toast />
</template>

<script setup lang="ts">
// Toast is used to display messages in an overlay
import Toast from 'primevue/toast'

import MenuBar from '@/MenuBar/MenuBar.vue'
import FlowGraph from '@/FlowGraph/FlowGraph.vue'
</script>

<style scoped>
.graph {
  position: absolute;
  width: 100%;
  top: 58px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: auto;
  overflow-y: auto;
}
</style>
