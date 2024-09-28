import { ref, watch } from 'vue'
import { type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlows'

export const useModificationStore = () => {
  const innerStore = defineStore('modification', () => {
    const { current } = storeToRefs(useMultiFlows())
    watch(current, () => {
      update()
    })

    const modification: Ref<{ label: string; icon: string; command: (...args: any[]) => void }> =
      ref({
        label: 'Enable modification',
        icon: 'pi pi-lock-open',
        command: () => {
          const flow = useVueFlow(current.value)
          const state =
            flow.nodesDraggable.value ||
            flow.nodesConnectable.value ||
            flow.elementsSelectable.value
          flow.setInteractive(!state)
          update()
        }
      })

    function update() {
      const flow = useVueFlow(current.value)
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
