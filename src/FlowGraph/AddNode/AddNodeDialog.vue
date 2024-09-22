<template>
  <Dialog
    v-model:visible="visible"
    header="Add Node"
    :maximizable="true"
    class="dialog"
    appendTo="self"
    style="
      min-width: 400px;
      max-width: 100vw;
      min-height: 30vh;
      max-height: 50vh;
      resize: both;
      overflow: auto;
    "
  >
    <div class="description">You can drag these nodes to the pane.</div>
    <div class="nodes">
      <div class="vue-flow__node-input" draggable="true" @dragstart="onDragStart($event, 'input')">
        Input Node
      </div>
      <div
        class="vue-flow__node-default"
        draggable="true"
        @dragstart="onDragStart($event, 'default')"
      >
        Default Node
      </div>
      <div
        class="vue-flow__node-output"
        draggable="true"
        @dragstart="onDragStart($event, 'output')"
      >
        Output Node
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Dialog from 'primevue/dialog'

// Get visible state from AddNodeStore
import { useAddNodeStore } from './AddNodeStore'
const { visible } = storeToRefs(useAddNodeStore())

// Start drag and drop
import { useDnDStore } from './DndStore'
const { onDragStart } = useDnDStore()
</script>

<style scoped>
.description {
  margin-bottom: 10px;
}

.nodes {
  margin-bottom: 10px;
  cursor: grab;
  font-weight: 500;
  -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px 10px 2px #00000040;
  display: flex;
  justify-content: center;
}
</style>
