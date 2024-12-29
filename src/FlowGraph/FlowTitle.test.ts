import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import 'fake-indexeddb/auto'
import { Dexie } from 'dexie'
import { IDBFactory } from 'fake-indexeddb'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { useAutoSaveStore } from './AutoSave/AutoSaveStore'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'
import FlowTitle from './FlowTitle.vue'

describe('FlowTitle.vue', async () => {
  beforeEach(() => {
    const app = createApp({})
    app.directive('ripple', Ripple)
    app.directive('tooltip', Tooltip)
    app.use(PrimeVue, {
      ripple: true,
      theme: {
        preset: Noir,
        options: {
          prefix: 'p',
          darkModeSelector: '.p-dark',
          cssLayer: false
        }
      }
    })
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
    expect(FlowTitle).toBeTruthy()
  })
  it('AutoSave.state: null', async () => {
    // Initialize
    const autosave = useAutoSaveStore()
    expect(autosave.state).toBe(null)
    const flows = useMultiFlows()
    await vi.waitUntil(async () => Object.keys(flows.titles).length > 0)
    expect(flows.titles).toStrictEqual({ 0: 'Flow-0' })
    const wrapper = mount(FlowTitle, {
      props: {
        modelValue: flows.titles[0],
        'onUpdate:modelValue': (e) => (flows.titles[0] = e),
        flowID: 0,
        focused: false
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
    // Find span element
    const spans = wrapper.findAll('span')
    expect(spans.length).toBeGreaterThan(0)
    const span = spans.at(0)
    expect(span).toBeTruthy()
    expect(span!.element.innerHTML).toBe('Flow-0')
    expect(span!.isVisible()).toBeTruthy()
    expect(span!.element.style.display).toBe('')
    // Find input element
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(1)
    const input = inputs.at(0)
    expect(input).toBeTruthy()
    expect(input!.isVisible()).toBeTruthy()
    expect(input!.element.style.display).toBe('none')
    expect(input!.element.value).toBe('Flow-0')
    expect(Object.keys(input!.attributes())).toContain('class')
    expect(input!.attributes('class')).toContain('input')
    expect(Object.keys(input!.attributes())).toContain('type')
    expect(input!.attributes('type')).toBe('text')
    // Find button element
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(1)
    const button = buttons.at(0)
    expect(button!.isVisible()).toBeTruthy()
    expect(button!.element.style.display).toBe('none')
    expect(Object.keys(button!.attributes())).toContain('class')
    expect(button!.attributes('class')).toContain('button')
  })
})
