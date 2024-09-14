import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useToolbarStore = () => {
  const innerStore = defineStore('Toolbar', () => {
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
    } = { status: true, position: 'top-left' }

    // Pinia store properties
    const toolbar: Ref<{
      status: Status
      position: Position
    }> = ref(init)
    const toolbarMenu: Ref<
      {
        label: string
        icon: string
        command?: (...args: any[]) => void
        items?: { label: string; icon: string; command: (...args: any[]) => void }[]
      }[]
    > = ref([])

    function read() {
      // Read from local storage
      toolbar.value = JSON.parse(localStorage.getItem('Toolbar') ?? JSON.stringify(init))
      // Check if status is valid
      if (!Object.keys(toolbar.value).includes('status') || toolbar.value.status !== false) {
        toolbar.value.status = init.status
      }
      // Check if position is valid
      if (
        !Object.keys(toolbar.value).includes('position') ||
        !positions.includes(toolbar.value.position)
      ) {
        toolbar.value.position = init.position
      }
      update()
    }

    function save() {
      localStorage.setItem('Toolbar', JSON.stringify(toolbar.value))
    }

    function update(): void {
      updateStatusMenu()
      updatePositionMenu()
      // Save to the current status and position
      save()

      function updateStatusMenu(): void {
        // Find menu
        let menu = toolbarMenu.value.find((item) => item.label === 'Tool Bar')
        // Add menu if not found
        if (menu === undefined) {
          menu = {
            label: 'Tool Bar',
            icon: 'pi pi-check',
            command: () => {
              toolbar.value.status = !toolbar.value.status
              update()
            }
          }
          toolbarMenu.value.push(menu)
        }
        // Update status menu
        if (toolbar.value.status) {
          menu.icon = 'pi pi-check'
        } else {
          menu.icon = 'pi pi-empty'
        }
      }

      function updatePositionMenu(): void {
        // Find menu
        let menu = toolbarMenu.value.find((item) => item.label === 'Tool Bar Position')
        // Add menu if not found
        if (menu === undefined) {
          menu = {
            label: 'Tool Bar Position',
            icon: 'pi pi-empty',
            items: []
          }
          toolbarMenu.value.push(menu)
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
                toolbar.value.position = label2position(event.item.label)
                update()
              }
            }
            menu.items!.push(item)
          }
          // Update position item
          if (toolbar.value.position === position) {
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

    return { toolbar, toolbarMenu, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
