<template>
  <MenuBar />
  <MultiFlows />
  <Toast />
</template>

<script setup lang="ts">
import MenuBar from '@/MenuBar/MenuBar.vue'
import MultiFlows from '@/FlowGraph/MultiFlows.vue'

// Toast is used to display messages in an overlay
import Toast from 'primevue/toast'
</script>
