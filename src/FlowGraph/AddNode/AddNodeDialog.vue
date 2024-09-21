<template>
  <Dialog
    v-model:visible="visible"
    header="Add Node"
    :maximizable="true"
    :style="{ width: '25rem' }"
    appendTo="self"
  >
    Add Node
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Dialog from 'primevue/dialog'
import { useAddNodeStore } from './AddNodeStore'
const { visible } = storeToRefs(useAddNodeStore())
</script>
