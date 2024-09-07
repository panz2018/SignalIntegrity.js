import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import ModificationSwitcher from './ModificationSwitcher.vue'
import { useModificationStore } from './Modification'

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

describe.concurrent('Modification.ts', () => {
  it('Valid', () => {
    expect(useModificationStore).toBeTruthy()
  })
  it('Initialized', () => {
    const modification = useModificationStore()
    expect(Object.keys(modification)).toStrictEqual(['label', 'icon', 'command'])
    expect(modification.label).toBe('Enable modification')
    expect(modification.icon).toBe('pi pi-lock-open')
    modification.command()
    expect(Object.keys(modification)).toStrictEqual(['label', 'icon', 'command'])
    expect(modification.label).toBe('Disable modification')
    expect(modification.icon).toBe('pi pi-lock')
    modification.command()
    expect(Object.keys(modification)).toStrictEqual(['label', 'icon', 'command'])
    expect(modification.label).toBe('Enable modification')
    expect(modification.icon).toBe('pi pi-lock-open')
  })
})

describe.concurrent('ModificationSwitcher.Vue', () => {
  it('Valid', () => {
    expect(ModificationSwitcher).toBeTruthy()
  })
  it('Initialized', () => {
    const wrapper = mount(ModificationSwitcher, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(Object.keys(wrapper.attributes())).toContain('class')
    expect(Object.keys(wrapper.find('i').attributes())).toStrictEqual(['class'])
    expect(wrapper.find('i').attributes('class')).toBe('pi pi-lock-open')
  })
  it('click', async () => {
    const wrapper = mount(ModificationSwitcher, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    const spy = vi.spyOn(wrapper, 'trigger')
    // Click once
    await wrapper.trigger('click')
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(Object.keys(wrapper.attributes())).toContain('class')
    expect(Object.keys(wrapper.find('i').attributes())).toStrictEqual(['class'])
    expect(wrapper.find('i').attributes('class')).toBe('pi pi-lock')
    expect(spy).toHaveBeenCalledTimes(1)
    // Click twice
    await wrapper.trigger('click')
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(Object.keys(wrapper.attributes())).toContain('class')
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(Object.keys(wrapper.find('i').attributes())).toStrictEqual(['class'])
    expect(wrapper.find('i').attributes('class')).toBe('pi pi-lock-open')
    expect(spy).toHaveBeenCalledTimes(2)
    // Click third time
    await wrapper.trigger('click')
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(Object.keys(wrapper.attributes())).toContain('class')
    expect(Object.keys(wrapper.find('i').attributes())).toStrictEqual(['class'])
    expect(wrapper.find('i').attributes('class')).toBe('pi pi-lock')
    expect(spy).toHaveBeenCalledTimes(3)
  })
})
