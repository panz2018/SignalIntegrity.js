import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

type Tab = { flow: string; title: string }

export const useMultiFlows = () => {
  const innerStore = defineStore('MultiFlows', () => {
    let id = 0
    const getId = () => `Flow-${id++}`
    const current: Ref<string> = ref('')
    const tabs: Ref<Tab[]> = ref([])

    function addTab(): void {
      const flowId = getId()
      tabs.value.push({ flow: flowId, title: flowId })
      current.value = flowId
    }

    return { current, tabs, addTab }
  })

  const store = innerStore()
  if (store.tabs.length === 0) {
    store.addTab()
  }
  return store
}
