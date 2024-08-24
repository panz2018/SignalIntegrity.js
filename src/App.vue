<template>
  <div></div>
  <FlowGraph class="main" />
</template>

<script setup lang="ts">
import FlowGraph from './components/FlowGraph.vue'
</script>

<style scoped>
.main {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: auto;
}
</style>
