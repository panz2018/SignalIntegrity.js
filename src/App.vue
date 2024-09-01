<template>
  <Toast />
  <MenuBar></MenuBar>
  <FlowGraph class="main" />
</template>

<script setup lang="ts">
// Toast is used to display messages in an overlay
import Toast from 'primevue/toast'

import MenuBar from '@/MenuBar/MenuBar.vue'
import FlowGraph from '@/FlowGraph/FlowGraph.vue'
</script>

<style scoped>
.main {
  position: absolute;
  width: 100%;
  top: 54px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: auto;
}
</style>
