import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp, nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { useFlowsStore } from './FlowsStore'
import { useAutoSaveStore } from './AutoSave/AutoSaveStore'
import { Dexie } from 'dexie'
import { IDBFactory } from 'fake-indexeddb'

// Set active pinia
const app = createApp({})
const pinia = createPinia()
app.use(pinia)
setActivePinia(pinia)

async function testAutoSaveFalse(storages: ReturnType<typeof useFlowsStore>['storages']) {
  for (const name of ['titles', 'flows'] as const) {
    expect(storages[name].isnull).toBeTruthy()
    await expect(async () => storages[name].clear()).rejects.toThrowError('Table is not existed')
    await expect(async () => storages[name].keys()).rejects.toThrowError('Table is not existed')
  }
  //   Test for titles table
  await expect(async () => storages.titles.put('', '')).rejects.toThrowError('Table is not existed')
  await expect(async () => storages.titles.add('', '')).rejects.toThrowError('Table is not existed')
  await expect(async () => storages.titles.bulkAdd([''], [''])).rejects.toThrowError(
    'Table is not existed'
  )
  await expect(async () => storages.titles.remove('')).rejects.toThrowError('Table is not existed')
  await expect(async () => storages.titles.get('')).rejects.toThrowError('Table is not existed')
  await expect(async () => storages.titles.bulkGet([''])).rejects.toThrowError(
    'Table is not existed'
  )
  //   Test for flows table
  await expect(async () => storages.flows.put([], 0)).rejects.toThrowError('Table is not existed')
  await expect(async () => storages.flows.add([], 0)).rejects.toThrowError('Table is not existed')
  await expect(async () => storages.flows.bulkAdd([{}], [0])).rejects.toThrowError(
    'Table is not existed'
  )
  await expect(async () => storages.flows.remove(0)).rejects.toThrowError('Table is not existed')
  await expect(async () => storages.flows.get(0)).rejects.toThrowError('Table is not existed')
  await expect(async () => storages.flows.bulkGet([0])).rejects.toThrowError('Table is not existed')
}

async function testAutoSaveTrue(storages: ReturnType<typeof useFlowsStore>['storages']) {
  for (const name of ['titles', 'flows'] as const) {
    expect(storages[name].isnull).toBe(false)
  }
  // Test for titles table
  await storages.titles.clear()
  expect(await storages.titles.keys()).toStrictEqual([])
  await storages.titles.put('a', 0)
  expect(await storages.titles.keys()).toStrictEqual([0])
  expect(await storages.titles.get(0)).toBe('a')
  await storages.titles.add('b', 1)
  expect(await storages.titles.keys()).toStrictEqual([0, 1])
  expect(await storages.titles.bulkGet([1, 0])).toStrictEqual(['b', 'a'])
  await expect(async () => storages.titles.add('c', 1)).rejects.toThrowError('ConstraintError')
  expect(await storages.titles.keys()).toStrictEqual([0, 1])
  expect(await storages.titles.bulkGet([1, 0])).toStrictEqual(['b', 'a'])
  await storages.titles.put('c', 1)
  expect(await storages.titles.keys()).toStrictEqual([0, 1])
  expect(await storages.titles.bulkGet([1, 0])).toStrictEqual(['c', 'a'])
  await storages.titles.clear()
  expect(await storages.titles.keys()).toStrictEqual([])
  await storages.titles.bulkAdd([10, 12], ['a', 'b'])
  expect(await storages.titles.keys()).toStrictEqual(['a', 'b'])
  expect(await storages.titles.bulkGet(['a', 'b', 'c'])).toStrictEqual([10, 12, undefined])
  await expect(async () => storages.titles.bulkAdd([10, 11], ['a', 'c'])).rejects.toThrowError(
    'ConstraintError'
  )
  expect(await storages.titles.keys()).toStrictEqual(['a', 'b', 'c'])
  expect(await storages.titles.bulkGet(['a', 'b', 'c'])).toStrictEqual([10, 12, 11])
  await storages.titles.remove('a')
  expect(await storages.titles.keys()).toStrictEqual(['b', 'c'])
  expect(await storages.titles.bulkGet(['a', 'b', 'c'])).toStrictEqual([undefined, 12, 11])
  // //   Test for flows table
  await storages.flows.clear()
  expect(await storages.flows.keys()).toStrictEqual([])
  await storages.flows.put({ a: 'b' }, 0)
  expect(await storages.flows.keys()).toStrictEqual([0])
  expect(await storages.flows.get(0)).toStrictEqual({ a: 'b' })
  await storages.flows.add({ b: 'c' }, 1)
  expect(await storages.flows.keys()).toStrictEqual([0, 1])
  expect(await storages.flows.bulkGet([1, 0])).toStrictEqual([{ b: 'c' }, { a: 'b' }])
  await expect(async () => storages.flows.add({ c: 'd' }, 1)).rejects.toThrowError(
    'ConstraintError'
  )
  expect(await storages.flows.keys()).toStrictEqual([0, 1])
  expect(await storages.flows.bulkGet([1, 0])).toStrictEqual([{ b: 'c' }, { a: 'b' }])
  await storages.flows.put({ c: 'd' }, 1)
  expect(await storages.flows.keys()).toStrictEqual([0, 1])
  expect(await storages.flows.bulkGet([1, 0])).toStrictEqual([{ c: 'd' }, { a: 'b' }])
  await storages.flows.clear()
  expect(await storages.flows.keys()).toStrictEqual([])
  await storages.flows.bulkAdd([{ x: 'x' }, { y: 'y' }], [11, 12])
  expect(await storages.flows.keys()).toStrictEqual([11, 12])
  expect(await storages.flows.bulkGet([12, 11, 10])).toStrictEqual([
    { y: 'y' },
    { x: 'x' },
    undefined
  ])
  await expect(async () =>
    storages.flows.bulkAdd([{ z: 'z' }, { u: 'u' }], [12, 13])
  ).rejects.toThrowError('ConstraintError')
  expect(await storages.flows.keys()).toStrictEqual([11, 12, 13])
  expect(await storages.flows.bulkGet([11, 12, 13, 14])).toStrictEqual([
    { x: 'x' },
    { y: 'y' },
    { u: 'u' },
    undefined
  ])
  await storages.flows.remove(11)
  expect(await storages.flows.keys()).toStrictEqual([12, 13])
  expect(await storages.flows.bulkGet([11, 12, 13, 14])).toStrictEqual([
    undefined,
    { y: 'y' },
    { u: 'u' },
    undefined
  ])
}

describe('FlowsStore.ts', () => {
  beforeEach(() => {
    Dexie.dependencies.indexedDB = new IDBFactory()
  })
  it('Valid', () => {
    expect(useFlowsStore).toBeTruthy()
    expect(useAutoSaveStore).toBeTruthy()
  })
  it('AutoSave.state: null', async () => {
    // Initialize AutoSaveStore
    const autosave = useAutoSaveStore()
    expect(autosave.state).toBe(null)
    // Initialize FlowsStore
    const { storages } = useFlowsStore()
    expect(Object.keys(storages)).toStrictEqual(['titles', 'flows'])
    // Test storages when AutoSave.state is null
    await testAutoSaveFalse(storages)
    // Test storages when AutoSave.state if false
    autosave.state = false
    expect(autosave.state).toBe(false)
    await nextTick()
    await testAutoSaveFalse(storages)
    // Test storages when AutoSave.state if true
    autosave.state = true
    expect(autosave.state).toBe(true)
    await nextTick()
    await testAutoSaveTrue(storages)
  })
  it('AutoSave.state: false', async () => {
    // Initialize AutoSaveStore
    const autosave = useAutoSaveStore()
    autosave.state = false
    expect(autosave.state).toBe(false)
    // Initialize FlowsStore
    const { storages } = useFlowsStore()
    expect(Object.keys(storages)).toStrictEqual(['titles', 'flows'])
    // Test storages when AutoSave.state if false
    await nextTick()
    await testAutoSaveFalse(storages)
    // Test storages when AutoSave.state is null
    autosave.state = null
    expect(autosave.state).toBe(null)
    await nextTick()
    await testAutoSaveFalse(storages)
    // Test storages when AutoSave.state if true
    autosave.state = true
    expect(autosave.state).toBe(true)
    await nextTick()
    await testAutoSaveTrue(storages)
  })
  it('AutoSave.state: true', async () => {
    // Initialize AutoSaveStore
    const autosave = useAutoSaveStore()
    autosave.state = true
    expect(autosave.state).toBe(true)
    // Initialize FlowsStore
    const { storages } = useFlowsStore()
    expect(Object.keys(storages)).toStrictEqual(['titles', 'flows'])
    // Test storages when AutoSave.state if true
    await nextTick()
    await testAutoSaveTrue(storages)
    // Test storages when AutoSave.state if false
    autosave.state = false
    expect(autosave.state).toBe(false)
    await nextTick()
    await testAutoSaveFalse(storages)
    // Test storages when AutoSave.state is null
    autosave.state = null
    expect(autosave.state).toBe(null)
    await nextTick()
    await testAutoSaveFalse(storages)
  })
})
