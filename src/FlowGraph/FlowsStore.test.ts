import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { useFlowsStore } from './FlowsStore'
import { useAutoSaveStore } from './AutoSave/AutoSaveStore'

// Set active pinia
const app = createApp({})
const pinia = createPinia()
app.use(pinia)
setActivePinia(pinia)

describe('FlowsStore.ts', () => {
  it('Valid', () => {
    expect(useFlowsStore).toBeTruthy()
    expect(useAutoSaveStore).toBeTruthy()
  })
  it('AutoSave: False', () => {
    const { storages } = useFlowsStore()
    expect(Object.keys(storages)).toStrictEqual(['titles', 'flows'])
    for (const name of ['titles', 'flows'] as const) {
      expect(storages[name].isnull).toBeTruthy()
    }
  })
})
