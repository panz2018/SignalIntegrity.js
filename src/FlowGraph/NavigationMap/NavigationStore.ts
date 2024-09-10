import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = () => {
  const innerStore = defineStore('Navigation', () => {
    // Default perperties
    const postions = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right'
    ]
    const init: {
      status: true | false
      position:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right'
    } = { status: true, position: 'bottom-right' }

    // Pinia store properties
    const navigation: Ref<{
      status: true | false
      position:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right'
    }> = ref(init)
    const navigationMenu: Ref<
      {
        label: string
        icon: string
        command?: (...args: any[]) => void
        items?: { label: string; icon: string; command: (...args: any[]) => void }[]
      }[]
    > = ref([])
    // ref({
    //   label: 'Navigation Map',
    //   icon: 'pi pi-check',
    //   command: () => {
    //     navigation.value.status = !navigation.value.status
    //     if (navigation.value) {
    //       navigationMenu.value.icon = 'pi pi-check'
    //     } else {
    //       navigationMenu.value.icon = 'pi pi-empty'
    //     }
    //     save()
    //   }
    // })

    function read() {
      // Read from local storage
      navigation.value = JSON.parse(
        localStorage.getItem('Navigation') ??
          JSON.stringify({ status: true, position: 'bottom-right' })
      )
      // Check if status is valid
      if (!Object.keys(navigation.value).includes('status') || navigation.value.status !== false) {
        navigation.value.status = true
      }
      // Check if position is valid
      if (
        !Object.keys(navigation.value).includes('position') ||
        !postions.includes(navigation.value.position)
      ) {
        // navigation.value.position =
      }

      // navigation.value.status =
      //   (localStorage.getItem('NavigationStatus') ?? 'true') === 'false' ? false : true
      // if (navigation.value.status) {
      //   navigationMenu.value.icon = 'pi pi-check'
      // } else {
      //   navigationMenu.value.icon = 'pi pi-empty'
      // }
    }

    function save() {
      // localStorage.setItem('NavigationStatus', navigation.value.status ? 'true' : 'false')
    }

    return { navigation, navigationMenu, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
