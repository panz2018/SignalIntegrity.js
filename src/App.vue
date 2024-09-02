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

// Update favicon, rootclass and parent
// watch(theme, (value) => {
//   const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement
//   if (value === 'dark') {
//     if (favicon) {
//       favicon.href = import.meta.env.BASE_URL + '/src/assets/Nubis_Logo_dark.svg'
//     }
//   } else {
//     if (favicon) {
//       favicon.href = import.meta.env.BASE_URL + '/src/assets/Nubis_Logo_light.svg'
//     }
//   }
// })
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
