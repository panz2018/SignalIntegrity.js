<template>
  <ControlButton v-ripple v-tooltip.bottom="addnode.menu.label" @click="addnode.menu.command">
    <i :class="addnode.menu.icon" />
  </ControlButton>
</template>

<script setup lang="ts">
import { ControlButton } from '@vue-flow/controls'
import '@vue-flow/controls/dist/style.css'
import { useAddNodeStore } from './AddNodeStore'
const addnode = useAddNodeStore()
</script>

<style scope>
.vue-flow__controls-button {
  width: 20px;
  height: 20px;
}

.vue-flow__controls-button svg {
  max-width: 20px;
  max-height: 20px;
}
</style>
