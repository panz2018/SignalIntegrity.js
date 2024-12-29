import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import 'fake-indexeddb/auto'
import { Dexie } from 'dexie'
import { IDBFactory } from 'fake-indexeddb'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import Button from 'primevue/button'
import { useAutoSaveStore } from './AutoSave/AutoSaveStore'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'
import { useFlowsStore } from './FlowsStore'
import FlowTitle from './FlowTitle.vue'

describe('FlowTitle.vue', async () => {
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
    expect(useAutoSaveStore).toBeTruthy()
    expect(useMultiFlows).toBeTruthy()
    expect(useFlowsStore).toBeTruthy()
    expect(FlowTitle).toBeTruthy()
  })
  it('AutoSave.state: null', async () => {
    // Initialize
    const autosave = useAutoSaveStore()
    expect(autosave.state).toBe(null)
    const { storages } = useFlowsStore()
    const flows = useMultiFlows()
    await vi.waitUntil(async () => Object.keys(flows.titles).length > 0)
    expect(flows.titles).toStrictEqual({ 0: 'Flow-0' })
    const wrapper = initWrapper({ flowID: 0, focused: false, flows: flows })
    const label = getLabel(wrapper)
    const input = getInput(wrapper)
    const button = getButton(wrapper)
    const spyLabelClick = vi.spyOn(label, 'trigger')
    expect(spyLabelClick).toHaveBeenCalledTimes(0)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Flow-0')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-0')
    expect(button!.element.style.display).toBe('none')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-0' })
    expect(storages.flows.isnull).toBeTruthy()
    expect(storages.titles.isnull).toBeTruthy()
    await expect(async () => storages.titles.keys()).rejects.toThrowError('Table is not existed')
    // Update the prop: focused=true
    await wrapper.setProps({ focused: true })
    expect(spyLabelClick).toHaveBeenCalledTimes(0)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Flow-0')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-0')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-0' })
    expect(storages.flows.isnull).toBeTruthy()
    expect(storages.titles.isnull).toBeTruthy()
    await expect(async () => storages.titles.keys()).rejects.toThrowError('Table is not existed')
    // Click label
    await label.trigger('click')
    expect(spyLabelClick).toHaveBeenCalledTimes(1)
    expect(label.element.style.display).toBe('none')
    expect(label.text()).toBe('Flow-0')
    expect(input.element.style.display).toBe('')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-0')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-0' })
    expect(storages.flows.isnull).toBeTruthy()
    expect(storages.titles.isnull).toBeTruthy()
    await expect(async () => storages.titles.keys()).rejects.toThrowError('Table is not existed')
    // Update input
    await input.setValue('Test')
    expect(spyLabelClick).toHaveBeenCalledTimes(1)
    expect(label.element.style.display).toBe('none')
    expect(label.text()).toBe('Test')
    expect(input.element.style.display).toBe('')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Test')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Test' })
    expect(storages.flows.isnull).toBeTruthy()
    expect(storages.titles.isnull).toBeTruthy()
    await expect(async () => storages.titles.keys()).rejects.toThrowError('Table is not existed')
    // Keyup: ESC
    await input.trigger('keyup.esc')
    await nextTick()
    expect(spyLabelClick).toHaveBeenCalledTimes(1)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Flow-0')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-0')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-0' })
    expect(storages.flows.isnull).toBeTruthy()
    expect(storages.titles.isnull).toBeTruthy()
    await expect(async () => storages.titles.keys()).rejects.toThrowError('Table is not existed')
    // AutoSave: true
    autosave.state = true
    await nextTick()
    expect(spyLabelClick).toHaveBeenCalledTimes(1)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Flow-0')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-0')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-0' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 'current'])
    expect(await storages.titles.bulkGet([0, 'current'])).toStrictEqual(['Flow-0', 0])
    // Click label
    await label.trigger('click')
    expect(spyLabelClick).toHaveBeenCalledTimes(2)
    expect(label.element.style.display).toBe('none')
    expect(label.text()).toBe('Flow-0')
    expect(input.element.style.display).toBe('')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-0')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-0' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 'current'])
    expect(await storages.titles.bulkGet([0, 'current'])).toStrictEqual(['Flow-0', 0])
    // Update input
    await input.setValue('Test1')
    expect(spyLabelClick).toHaveBeenCalledTimes(2)
    expect(label.element.style.display).toBe('none')
    expect(label.text()).toBe('Test1')
    expect(input.element.style.display).toBe('')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Test1')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Test1' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 'current'])
    expect(await storages.titles.bulkGet([0, 'current'])).toStrictEqual(['Flow-0', 0])
    // Keyup: Enter
    await input.trigger('keyup.enter')
    expect(spyLabelClick).toHaveBeenCalledTimes(2)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Test1')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Test1')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Test1' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 'current'])
    expect(await storages.titles.bulkGet([0, 'current'])).toStrictEqual(['Test1', 0])
    // Close the tab
    await button.trigger('click')
    expect(spyLabelClick).toHaveBeenCalledTimes(2)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Test1')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Test1')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 1: 'Flow-1' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([1, 'current'])
    expect(await storages.titles.bulkGet([1, 'current'])).toStrictEqual(['Flow-1', 1])
  })
  it('AutoSave.state: true (has data in IndexedDB)', async () => {
    // Initialize
    const autosave = useAutoSaveStore()
    autosave.state = true
    await nextTick()
    expect(autosave.state).toBe(true)
    const { storages } = useFlowsStore()
    await storages.titles.bulkAdd(['Flow-2', 'Flow-5', 'Flow-4', 5], [2, 5, 4, 'current'])
    const flows = useMultiFlows()
    await vi.waitUntil(async () => Object.keys(flows.titles).length > 0)
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Flow-5' })
    const wrapper = initWrapper({ flowID: 2, focused: false, flows: flows })
    const label = getLabel(wrapper)
    const input = getInput(wrapper)
    const button = getButton(wrapper)
    const spyLabelClick = vi.spyOn(label, 'trigger')
    expect(spyLabelClick).toHaveBeenCalledTimes(0)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Flow-5')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-5')
    expect(button!.element.style.display).toBe('none')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Flow-5' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 2, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      'Flow-5',
      2
    ])
    // Update the prop: focused=true
    await wrapper.setProps({ focused: true })
    expect(spyLabelClick).toHaveBeenCalledTimes(0)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Flow-5')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-5')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Flow-5' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 2, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      'Flow-5',
      2
    ])
    // Click label
    await label.trigger('click')
    expect(spyLabelClick).toHaveBeenCalledTimes(1)
    expect(label.element.style.display).toBe('none')
    expect(label.text()).toBe('Flow-5')
    expect(input.element.style.display).toBe('')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-5')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Flow-5' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 2, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      'Flow-5',
      2
    ])
    // Update input
    await input.setValue('Test')
    expect(spyLabelClick).toHaveBeenCalledTimes(1)
    expect(label.element.style.display).toBe('none')
    expect(label.text()).toBe('Test')
    expect(input.element.style.display).toBe('')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Test')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Test' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 2, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      'Flow-5',
      2
    ])
    // Keyup: ESC
    await input.trigger('keyup.esc')
    await nextTick()
    expect(spyLabelClick).toHaveBeenCalledTimes(1)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Flow-5')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-5')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Flow-5' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 2, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      'Flow-5',
      2
    ])
    // Click label
    await label.trigger('click')
    expect(spyLabelClick).toHaveBeenCalledTimes(2)
    expect(label.element.style.display).toBe('none')
    expect(label.text()).toBe('Flow-5')
    expect(input.element.style.display).toBe('')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Flow-5')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Flow-5' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 2, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      'Flow-5',
      2
    ])
    // Update input
    await input.setValue('Test1')
    expect(spyLabelClick).toHaveBeenCalledTimes(2)
    expect(label.element.style.display).toBe('none')
    expect(label.text()).toBe('Test1')
    expect(input.element.style.display).toBe('')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Test1')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Test1' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 2, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      'Flow-5',
      2
    ])
    // Keyup: Enter
    await input.trigger('keyup.enter')
    expect(spyLabelClick).toHaveBeenCalledTimes(2)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Test1')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Test1')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4', 2: 'Test1' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 2, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      'Test1',
      2
    ])
    // Close the tab
    await button.trigger('click')
    expect(spyLabelClick).toHaveBeenCalledTimes(2)
    expect(label.element.style.display).toBe('')
    expect(label.text()).toBe('Test1')
    expect(input.element.style.display).toBe('none')
    expect(input.element.style.color).toBe('')
    expect(input.element.value).toBe('Test1')
    expect(button!.element.style.display).toBe('')
    expect(flows.titles).toStrictEqual({ 0: 'Flow-2', 1: 'Flow-4' })
    expect(storages.flows.isnull).toBe(false)
    expect(storages.titles.isnull).toBe(false)
    expect(await storages.titles.keys()).toStrictEqual([0, 1, 'current'])
    expect(await storages.titles.bulkGet([0, 1, 2, 'current'])).toStrictEqual([
      'Flow-2',
      'Flow-4',
      undefined,
      1
    ])
  })
})

function initWrapper({
  flowID,
  focused,
  flows
}: {
  flowID: number
  focused: boolean
  flows: ReturnType<typeof useMultiFlows>
}) {
  const wrapper = mount(FlowTitle, {
    props: {
      flowID: flowID,
      focused: focused,
      modelValue: flows.titles[flowID],
      'onUpdate:modelValue': (e) => {
        wrapper.setProps({ modelValue: e })
        flows.titles[flowID] = e
      }
    },
    global: {
      directives: {
        ripple: Ripple,
        tooltip: Tooltip
      }
    }
  })
  expect(wrapper.element.tagName).toBe('DIV')
  expect(wrapper.isVisible()).toBeTruthy()
  expect(wrapper.attributes('disabled')).toBeUndefined()
  expect(Object.keys(wrapper.attributes())).toContain('class')
  expect(wrapper.attributes('class')).toContain('container')
  return wrapper
}

function getLabel(wrapper: ReturnType<typeof initWrapper>) {
  // Find span element
  const span = wrapper.get('span')
  expect(span).toBeTruthy()
  expect(span!.isVisible()).toBeTruthy()
  expect(span!.attributes('disabled')).toBeUndefined()
  return span
}

function getInput(wrapper: ReturnType<typeof initWrapper>) {
  // Find input element
  const input = wrapper.get('input')
  expect(input).toBeTruthy()
  expect(input!.isVisible()).toBeTruthy()
  expect(input!.attributes('disabled')).toBeUndefined()
  expect(Object.keys(input!.attributes())).toContain('class')
  expect(input!.attributes('class')).toContain('input')
  expect(Object.keys(input!.attributes())).toContain('type')
  expect(input!.attributes('type')).toBe('text')
  return input
}

function getButton(wrapper: ReturnType<typeof initWrapper>) {
  // Find button element
  const button = wrapper.getComponent(Button)
  expect(button!.isVisible()).toBeTruthy()
  expect(button!.attributes('disabled')).toBeUndefined()
  expect(Object.keys(button!.attributes())).toContain('class')
  expect(button!.attributes('class')).toContain('button')
  expect((button!.vm as any).icon).toBe('pi pi-times-circle')
  return button
}
