<template>
  <div
    class="background"
    :style="{
      backgroundColor: isDragOver ? (theme === 'Bright' ? '#e7f3ff' : '#4d5656') : 'transparent'
    }"
  >
    <Background pattern-color="#81818a" :gap="20" :size="1.0" :x="0" :y="0" />
    <div v-if="isDragOver" class="overlay">
      <div>Drop here</div>
      <div>Drop here</div>
      <div>Drop here</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Background } from '@vue-flow/background'

// Drag and drop to add new nodes
import { storeToRefs } from 'pinia'
import { useDnDStore } from './AddNode/DndStore'
const { isDragOver } = storeToRefs(useDnDStore())

// Dark/Bright theme
import { useThemeStore } from '@/MenuBar/Theme/theme'
const { theme } = storeToRefs(useThemeStore())
</script>

<style scoped>
.background {
  position: relative;
  height: 100%;
  width: 100%;
}

.background .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1;
  pointer-events: none;
}

.background .overlay > div {
  text-align: center;
  font-size: 30px;
}
</style>
