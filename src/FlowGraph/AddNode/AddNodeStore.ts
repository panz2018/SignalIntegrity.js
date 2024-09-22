import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useAddNodeStore = defineStore('AddNode', () => {
  const visible: Ref<true | false> = ref(false)
  const menu = {
    label: 'Add Node',
    icon: 'pi pi-plus-circle',
    command: () => {
      visible.value = true
    }
  }
  return { visible, menu }
})
