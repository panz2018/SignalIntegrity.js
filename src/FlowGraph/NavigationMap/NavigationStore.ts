import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = () => {
  const innerStore = defineStore('Navigation', () => {
    // Default perperties
    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right'
    ] as const
    type Status = true | false
    type Position = (typeof positions)[number]
    const init: {
      status: Status
      position: Position
    } = { status: true, position: 'bottom-left' }

    // Pinia store properties
    const navigation: Ref<{
      status: Status
      position: Position
    }> = ref(init)
    const navigationMenu: Ref<
      {
        label: string
        icon: string
        command?: (...args: any[]) => void
        items?: { label: string; icon: string; command: (...args: any[]) => void }[]
      }[]
    > = ref([])

    function read() {
      // Read from local storage
      navigation.value = JSON.parse(localStorage.getItem('Navigation') ?? JSON.stringify(init))
      // Check if status is valid
      if (!Object.keys(navigation.value).includes('status') || navigation.value.status !== false) {
        navigation.value.status = init.status
      }
      // Check if position is valid
      if (
        !Object.keys(navigation.value).includes('position') ||
        !positions.includes(navigation.value.position)
      ) {
        navigation.value.position = init.position
      }
      update()
    }

    function save() {
      localStorage.setItem('Navigation', JSON.stringify(navigation.value))
    }

    function update(): void {
      updateStatusMenu()
      updatePositionMenu()
      // Save to the current status and position
      save()

      function updateStatusMenu(): void {
        // Find menu
        let menu = navigationMenu.value.find((item) => item.label === 'Navigation Map')
        // Add menu if not found
        if (menu === undefined) {
          menu = {
            label: 'Navigation Map',
            icon: 'pi pi-check',
            command: () => {
              navigation.value.status = !navigation.value.status
              update()
            }
          }
          navigationMenu.value.push(menu)
        }
        // Update status menu
        if (navigation.value.status) {
          menu.icon = 'pi pi-check'
        } else {
          menu.icon = 'pi pi-empty'
        }
      }

      function updatePositionMenu(): void {
        // Find position menu
        let menu = navigationMenu.value.find((item) => item.label === 'Navigation Map Position')
        // Add menu if not found
        if (menu === undefined) {
          menu = {
            label: 'Navigation Map Position',
            icon: 'pi pi-empty',
            items: []
          }
          navigationMenu.value.push(menu)
        }
        // Update each menu item for the corresponding position
        for (const position of positions) {
          // Find item
          let item = menu.items!.find((row) => row.label === position2label(position))
          // Add item if not found
          if (item === undefined) {
            item = {
              label: position2label(position),
              icon: 'pi pi-empty',
              command: (event) => {
                navigation.value.position = label2position(event.item.label)
                update()
              }
            }
            menu.items!.push(item)
          }
          // Update position item
          if (navigation.value.position === position) {
            item.icon = 'pi pi-check'
          } else {
            item.icon = 'pi pi-empty'
          }
        }

        function position2label(position: string): string {
          return position
            .split('-')
            .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
            .join(' ')
        }

        function label2position(label: string): Position {
          return label
            .split(' ')
            .map((x) => x.toLowerCase())
            .join('-') as Position
        }
      }
    }

    return { navigation, navigationMenu, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
