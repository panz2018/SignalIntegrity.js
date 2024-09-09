import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useToolbarStatus = () => {
  const innerStore = defineStore('ToolbarStatus', () => {
    const status = ref(true)
    const toolbar: Ref<{ label: string; icon: string; command: (...args: any[]) => void }> = ref({
      label: 'Tool Bar',
      icon: 'pi pi-check',
      command: () => {
        status.value = !status.value
        if (status.value) {
          toolbar.value.icon = 'pi pi-check'
        } else {
          toolbar.value.icon = 'pi pi-empty'
        }
        save()
      }
    })

    function read() {
      status.value = (localStorage.getItem('ToolbarStatus') ?? 'true') === 'false' ? false : true
      if (status.value) {
        toolbar.value.icon = 'pi pi-check'
      } else {
        toolbar.value.icon = 'pi pi-empty'
      }
    }

    function save() {
      localStorage.setItem('ToolbarStatus', status.value ? 'true' : 'false')
    }

    return { toolbar, status, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
