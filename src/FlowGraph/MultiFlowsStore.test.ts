import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import 'fake-indexeddb/auto'
import { Dexie } from 'dexie'
import { IDBFactory } from 'fake-indexeddb'
import { useMultiFlows } from './MultiFlowsStore'
import { useFlowsStore } from './FlowsStore'
import { useAutoSaveStore } from './AutoSave/AutoSaveStore'

describe('MultiFlowsStore.ts', () => {
  beforeEach(() => {
    // Set Vue App
    const app = createApp({})
    // Clearn pinia
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
    // Clear localStorage
    localStorage.clear()
    // Clear IndexedDB
    Dexie.dependencies.indexedDB = new IDBFactory()
  })
  it('Valid', () => {
    expect(useMultiFlows).toBeTruthy()
    expect(useFlowsStore).toBeTruthy()
    expect(useAutoSaveStore).toBeTruthy()
  })
  it('AutoSave.state: null', async () => {
    // Initialize
    const autosave = useAutoSaveStore()
    const { storages } = useFlowsStore()
    const flows = useMultiFlows()
    expect(flows.newFlow.constructor).toBe(Function)
    await testMultiFlows({
      current: 0,
      titles: { 0: 'Flow-0' },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add a new tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 1,
      titles: { 0: 'Flow-0', 1: 'Flow-1' },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = false
    flows.newFlow()
    await testMultiFlows({
      current: 2,
      titles: {
        0: 'Flow-0',
        1: 'Flow-1',
        2: 'Flow-2'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 3,
      titles: {
        0: 'Flow-0',
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    autosave.state = null
    flows.closeFlow(0)
    await testMultiFlows({
      current: 1,
      titles: {
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3'
      },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    flows.newFlow()
    await testMultiFlows({
      current: 4,
      titles: {
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3',
        4: 'Flow-4'
      },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    autosave.state = false
    flows.closeFlow(2)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3',
        4: 'Flow-4'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(4)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 5,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3',
        5: 'Flow-5'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(5)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(3)
    await testMultiFlows({
      current: 1,
      titles: {
        1: 'Flow-1'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(1)
    await testMultiFlows({
      current: 6,
      titles: {
        6: 'Flow-6'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(6)
    await testMultiFlows({
      current: 7,
      titles: {
        7: 'Flow-7'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
  })
  it('AutoSave.state: false', async () => {
    // Initialize
    const autosave = useAutoSaveStore()
    autosave.state = false
    await nextTick()
    const { storages } = useFlowsStore()
    const flows = useMultiFlows()
    expect(flows.newFlow.constructor).toBe(Function)
    await testMultiFlows({
      current: 0,
      titles: { 0: 'Flow-0' },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add a new tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 1,
      titles: { 0: 'Flow-0', 1: 'Flow-1' },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = false
    flows.newFlow()
    await testMultiFlows({
      current: 2,
      titles: {
        0: 'Flow-0',
        1: 'Flow-1',
        2: 'Flow-2'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 3,
      titles: {
        0: 'Flow-0',
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    autosave.state = null
    flows.closeFlow(0)
    await testMultiFlows({
      current: 1,
      titles: {
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3'
      },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    flows.newFlow()
    await testMultiFlows({
      current: 4,
      titles: {
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3',
        4: 'Flow-4'
      },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    autosave.state = false
    flows.closeFlow(2)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3',
        4: 'Flow-4'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(4)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 5,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3',
        5: 'Flow-5'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(5)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(3)
    await testMultiFlows({
      current: 1,
      titles: {
        1: 'Flow-1'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(1)
    await testMultiFlows({
      current: 6,
      titles: {
        6: 'Flow-6'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(6)
    await testMultiFlows({
      current: 7,
      titles: {
        7: 'Flow-7'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
  })
  it('AutoSave.state: true (no data in IndexedDB)', async () => {
    // Initialize
    const autosave = useAutoSaveStore()
    autosave.state = true
    await nextTick()
    const { storages } = useFlowsStore()
    const flows = useMultiFlows()
    expect(flows.newFlow.constructor).toBe(Function)
    await vi.waitUntil(async () => Object.keys(flows.titles).length > 0)
    await testMultiFlows({
      current: 0,
      titles: { 0: 'Flow-0' },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add a new tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 1,
      titles: { 0: 'Flow-0', 1: 'Flow-1' },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = false
    flows.newFlow()
    await testMultiFlows({
      current: 2,
      titles: {
        0: 'Flow-0',
        1: 'Flow-1',
        2: 'Flow-2'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 3,
      titles: {
        0: 'Flow-0',
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    autosave.state = null
    flows.closeFlow(0)
    await testMultiFlows({
      current: 1,
      titles: {
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3'
      },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    flows.newFlow()
    await testMultiFlows({
      current: 4,
      titles: {
        1: 'Flow-1',
        2: 'Flow-2',
        3: 'Flow-3',
        4: 'Flow-4'
      },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    autosave.state = false
    flows.closeFlow(2)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3',
        4: 'Flow-4'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(4)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 5,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3',
        5: 'Flow-5'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(5)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-1',
        3: 'Flow-3'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(3)
    await testMultiFlows({
      current: 1,
      titles: {
        1: 'Flow-1'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(1)
    await testMultiFlows({
      current: 6,
      titles: {
        6: 'Flow-6'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(6)
    await testMultiFlows({
      current: 7,
      titles: {
        7: 'Flow-7'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
  })
  it('AutoSave.state: true (has data in IndexedDB)', async () => {
    // Initialize
    const autosave = useAutoSaveStore()
    autosave.state = true
    await nextTick()
    const { storages } = useFlowsStore()
    await storages.titles.bulkAdd(['Flow-2', 'Flow-5', 'Flow-4'], [2, 5, 4])
    const flows = useMultiFlows()
    expect(flows.newFlow.constructor).toBe(Function)
    await vi.waitUntil(async () => Object.keys(flows.titles).length > 0)
    await testMultiFlows({
      current: 0,
      titles: { 0: 'Flow-2', 1: 'Flow-4', 2: 'Flow-5' },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add a new tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 3,
      titles: { 0: 'Flow-2', 1: 'Flow-4', 2: 'Flow-5', 3: 'Flow-3' },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    autosave.state = null
    flows.closeFlow(0)
    await testMultiFlows({
      current: 1,
      titles: { 1: 'Flow-4', 2: 'Flow-5', 3: 'Flow-3' },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    flows.newFlow()
    await testMultiFlows({
      current: 4,
      titles: {
        1: 'Flow-4',
        2: 'Flow-5',
        3: 'Flow-3',
        4: 'Flow-4'
      },
      autoSaveState: null,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    autosave.state = false
    flows.closeFlow(2)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-4',
        3: 'Flow-3',
        4: 'Flow-4'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(4)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-4',
        3: 'Flow-3'
      },
      autoSaveState: false,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Add another tab
    autosave.state = true
    flows.newFlow()
    await testMultiFlows({
      current: 5,
      titles: {
        1: 'Flow-4',
        3: 'Flow-3',
        5: 'Flow-5'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(5)
    await testMultiFlows({
      current: 3,
      titles: {
        1: 'Flow-4',
        3: 'Flow-3'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(3)
    await testMultiFlows({
      current: 1,
      titles: {
        1: 'Flow-4'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(1)
    await testMultiFlows({
      current: 6,
      titles: {
        6: 'Flow-6'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
    // Close a flow
    flows.closeFlow(6)
    await testMultiFlows({
      current: 7,
      titles: {
        7: 'Flow-7'
      },
      autoSaveState: true,
      autosave: autosave,
      storages: storages,
      flows: flows
    })
  })
})

async function testMultiFlows({
  current,
  titles,
  autoSaveState,
  autosave,
  storages,
  flows
}: {
  current: number
  titles: Record<number, string>
  autoSaveState: boolean | null
  autosave: ReturnType<typeof useAutoSaveStore>
  storages: ReturnType<typeof useFlowsStore>['storages']
  flows: ReturnType<typeof useMultiFlows>
}) {
  await nextTick()
  expect(flows.current).toBe(current)
  expect(flows.titles).toStrictEqual(titles)
  expect(autosave.state).toBe(autoSaveState)
  expect(Object.keys(storages)).toStrictEqual(['titles', 'flows'])
  const keys = Object.keys(titles).map((d) => parseInt(d))
  if (autoSaveState === false || autoSaveState === null) {
    for (const name of ['titles', 'flows'] as const) {
      expect(storages[name].isnull).toBeTruthy()
      await expect(async () => storages[name].keys()).rejects.toThrowError('Table is not existed')
      await expect(async () => storages[name].bulkGet(keys)).rejects.toThrowError(
        'Table is not existed'
      )
      for (const key of [...keys, -1]) {
        await expect(async () => storages[name].get(key)).rejects.toThrowError(
          'Table is not existed'
        )
      }
    }
    await expect(async () => storages.titles.get('current')).rejects.toThrowError(
      'Table is not existed'
    )
  } else if (autoSaveState === true) {
    for (const name of ['titles', 'flows'] as const) {
      expect(storages[name].isnull).toBe(false)
    }
    expect(await storages.titles.keys()).toStrictEqual([...keys, 'current'])
    expect(await storages.titles.bulkGet([...keys, -1])).toStrictEqual([
      ...Object.values(titles),
      undefined
    ])
    for (const key of [...keys, -1]) {
      expect(await storages.titles.get(key)).toBe(titles[key])
    }
    expect(await storages.titles.get(-1)).toBe(undefined)
    expect(await storages.titles.get('current')).toBe(current)
  } else {
    throw new Error(`Unknown autosave state: ${autoSaveState}`)
  }
}
