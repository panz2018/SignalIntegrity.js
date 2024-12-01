<template>
  <Button v-ripple id="button" v-tooltip.bottom="tooltip" @click="autosave.toggle" outlined>
    <svg v-show="autosave.state === true" viewBox="0 0 20 20">
      <path
        d="M3 5a2 2 0 0 1 2-2h1v3.5A1.5 1.5 0 0 0 7.5 8h4A1.5 1.5 0 0 0 13 6.5V3h.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V9.6c-.75-.384-1.6-.6-2.5-.6c-1.177 0-2.268.37-3.163 1H6.5A1.5 1.5 0 0 0 5 11.5V17a2 2 0 0 1-2-2V5zm6 9.5c0-1.33.472-2.55 1.257-3.5H6.5a.5.5 0 0 0-.5.5V17h3.6c-.384-.75-.6-1.6-.6-2.5zM12 3H7v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V3zm-2 11.5a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0zm6.5-3a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-.5.5H15a.5.5 0 0 1 0-1h.468a1.999 1.999 0 0 0-2.383.336a.5.5 0 0 1-.706-.707A3.001 3.001 0 0 1 16 12.152V12a.5.5 0 0 1 .5-.5zm-.876 5.532A2.999 2.999 0 0 1 13 16.848V17a.5.5 0 0 1-1 0v-1.5a.5.5 0 0 1 .5-.5H14a.5.5 0 0 1 0 1h-.468a1.999 1.999 0 0 0 2.383-.336a.5.5 0 0 1 .706.707c-.284.285-.624.51-.997.66z"
        fill="currentColor"
      />
    </svg>
    <svg v-show="autosave.state !== true" viewBox="0 0 24 24">
      <path
        d="M21.71,20.29l-18-18A1,1,0,0,0,2.29,3.71L4,5.41V19a3,3,0,0,0,3,3H17a3,3,0,0,0,2.39-1.2l.9.91a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM17,20H7a1,1,0,0,1-1-1V7.41L17.93,19.34A1,1,0,0,1,17,20ZM8.66,4H12V7a3,3,0,0,0,3,3h3v3.34a1,1,0,1,0,2,0V9s0,0,0-.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.09,0L13.06,2H8.66a1,1,0,0,0,0,2ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1Z"
        fill="currentColor"
      />
    </svg>
  </Button>
  <Popover
    ref="popover"
    :dismissable="false"
    appendTo="self"
    style="--p-popover-border-color: gray"
  >
    Would you like to automatically save flows in your local browser?
    <div style="display: flex; justify-content: end">
      <Button label="No" @click="onClickNo" severity="secondary" />
      <Button label="Yes" @click="onClickYes" severity="success" />
    </div>
  </Popover>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, useTemplateRef } from 'vue'
import Button from 'primevue/button'
import Popover from 'primevue/popover'

// Setup AutoSave state
import { useAutoSaveStore } from './AutoSave'
const autosave = useAutoSaveStore()
const tooltip = computed(() => {
  return autosave.state === true
    ? 'Automatically save in local browser'
    : 'Automatically save is disabled'
})

// Popover to confirm the AutoSave
const popover = useTemplateRef('popover')
onMounted(() => {
  if (autosave.state === null) {
    nextTick(() => {
      const target = document.getElementById('button')
      popover.value!.show({ currentTarget: target } as Event)
    })
  }
})
function onClickNo() {
  autosave.state = false
  popover.value!.hide()
}
function onClickYes() {
  autosave.state = true
  popover.value!.hide()
}
</script>

<style scoped>
Button {
  width: 30px;
  height: 30px;
  padding: 2px;
  border-radius: 5px;
  margin-right: 5px;
}
</style>
