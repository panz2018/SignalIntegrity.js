import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useToolbarStore = defineStore('ToolBar', () => {
  const status = ref(true)
  const toolbar: Ref<{ label: string; icon: string; command: (...args: any[]) => void }> = ref({
    label: 'Tool Bar',
    icon: 'pi pi-check',
    command: () => {
      status.value = !status.value
      if (status.value) {
        toolbar.value.icon = 'pi pi-check'
      } else {
        toolbar.value.icon = 'pi'
      }
    }
  })

  return { toolbar, status }
})
