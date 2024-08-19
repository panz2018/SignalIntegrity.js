<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const container = ref(null)
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
