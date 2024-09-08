import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('Navigation', () => {
  const status = ref(true)
  const navigation: Ref<{ label: string; icon: string; command: (...args: any[]) => void }> = ref({
    label: 'Navigation Map',
    icon: 'pi pi-check',
    command: () => {
      status.value = !status.value
      if (status.value) {
        navigation.value.icon = 'pi pi-check'
      } else {
        navigation.value.icon = 'pi pi-times'
      }
    }
  })

  return { navigation, status }
})
