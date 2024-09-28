import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAddNodeStore } from './AddNodeStore'

const app = createApp({})
app.use(createPinia())

describe.concurrent('useAddNodeStore.ts', () => {
  it('useAddNodeStore', () => {
    expect(useAddNodeStore).toBeTruthy()
    // Initialize
    const store = useAddNodeStore()
    expect(Object.keys(store.menu)).toStrictEqual(['label', 'icon', 'command'])
    expect(store.menu.label).toBe('Add Node')
    expect(store.menu.icon).toBe('pi pi-plus-circle')
    expect(store.visible).toBe(false)
    // Run the command
    store.menu.command()
    store.menu.command()
    expect(Object.keys(store.menu)).toStrictEqual(['label', 'icon', 'command'])
    expect(store.menu.label).toBe('Add Node')
    expect(store.menu.icon).toBe('pi pi-plus-circle')
    expect(store.visible).toBe(true)
  })
})
