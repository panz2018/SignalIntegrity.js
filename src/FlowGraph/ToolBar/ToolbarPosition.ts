import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useToolbarPosition = () => {
  const innerStore = defineStore('ToolbarPosition', () => {
    const toolbarPosition: Ref<
      'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
    > = ref('top-left')

    const toolbarPositionMenu: Ref<
      { label: string; icon: string; command: (...args: any[]) => void }[]
    > = ref([
      {
        label: 'top-left',
        icon: 'pi pi-check',
        command: () => {
          toolbarPosition.value = 'top-left'
          update('top-left')
          save()
        }
      }
    ])

    function update(
      position:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right'
    ): void {
      console.log(position)
      // if (status.value) {
      //   toolbar.value.icon = 'pi pi-check'
      // } else {
      //   toolbar.value.icon = 'pi pi-times'
      // }
    }

    function read() {
      const storage = localStorage.getItem('ToolbarPosition') ?? 'top-left'
      if (
        ![
          'top-left',
          'top-center',
          'top-right',
          'bottom-left',
          'bottom-center',
          'bottom-right'
        ].includes(storage)
      ) {
        toolbarPosition.value = 'top-left'
      } else {
        toolbarPosition.value = storage as
          | 'top-left'
          | 'top-center'
          | 'top-right'
          | 'bottom-left'
          | 'bottom-center'
          | 'bottom-right'
      }
    }

    function save() {
      localStorage.setItem('ToolbarPosition', toolbarPosition.value)
    }

    return { toolbarPosition, toolbarPositionMenu, read, save }
  })

  const store = innerStore()
  store.read()
  store.save()
  return store
}
