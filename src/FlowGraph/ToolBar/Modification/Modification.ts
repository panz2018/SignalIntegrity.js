import { ref } from 'vue'
import { type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useVueFlow } from '@vue-flow/core'

export const useModificationStore = () => {
  const flow = useVueFlow('FlowGraph')

  const innerStore = defineStore('modification', () => {
    const modification: Ref<{ label: string; icon: string; command: (...args: any[]) => void }> =
      ref({
        label: 'Enable modification',
        icon: 'pi pi-lock-open',
        command: () => {
          const state =
            flow.nodesDraggable.value ||
            flow.nodesConnectable.value ||
            flow.elementsSelectable.value
          flow.setInteractive(!state)
          update()
        }
      })

    function update() {
      const state =
        flow.nodesDraggable.value || flow.nodesConnectable.value || flow.elementsSelectable.value
      if (state) {
        modification.value.label = 'Enable modification'
        modification.value.icon = 'pi pi-lock-open'
      } else {
        modification.value.label = 'Disable modification'
        modification.value.icon = 'pi pi-lock'
      }
    }

    return { modification, update }
  })

  const store = innerStore()
  store.update()
  return store.modification
}
