import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStatus = () => {
  const innerStore = defineStore('NavigationStatus', () => {
    const status = ref(true)
    const navigation: Ref<{ label: string; icon: string; command: (...args: any[]) => void }> = ref(
      {
        label: 'Navigation Map',
        icon: 'pi pi-check',
        command: () => {
          status.value = !status.value
          if (status.value) {
            navigation.value.icon = 'pi pi-check'
          } else {
            navigation.value.icon = 'pi pi-times'
          }
          save()
        }
      }
    )

    function read() {
      status.value = (localStorage.getItem('NavigationStatus') ?? 'true') === 'false' ? false : true
      if (status.value) {
        navigation.value.icon = 'pi pi-check'
      } else {
        navigation.value.icon = 'pi pi-times'
      }
    }

    function save() {
      localStorage.setItem('NavigationStatus', status.value ? 'true' : 'false')
    }

    return { navigation, status, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
