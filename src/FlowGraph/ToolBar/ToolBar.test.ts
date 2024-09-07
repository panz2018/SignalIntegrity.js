import { describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import ToolBar from './ToolBar.vue'

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

describe.concurrent('ToolBar.Vue', () => {
  it('Valid', () => {
    expect(ToolBar).toBeTruthy()
  })
  it('Initialized', async () => {
    const wrapper = mount(ToolBar, {
      props: {},
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
    expect(Object.keys(wrapper.attributes())).toContain('style')
    expect(Object.keys(wrapper.attributes())).toContain('class')
    // Test the buttons
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(4)
    // Test FitView
    const fitview = buttons.at(0)
    expect(fitview).toBeTruthy()
    if (fitview) {
      expect(fitview.isVisible()).toBeTruthy()
      expect(fitview.attributes('disabled')).toBeUndefined()
      expect(Object.keys(fitview.find('i').attributes())).toStrictEqual(['class'])
      expect(fitview.find('i').attributes('class')).toBe('pi pi-window-maximize')
      const spy = vi.spyOn(fitview, 'trigger')
      await fitview.trigger('click')
      expect(spy).toHaveBeenCalledOnce()
      await fitview.trigger('click')
      expect(spy).toHaveBeenCalledTimes(2)
      await fitview.trigger('click')
      expect(spy).toHaveBeenCalledTimes(3)
    }
    // Test ZoomIn
    const zoomin = buttons.at(1)
    expect(zoomin).toBeTruthy()
    if (zoomin) {
      expect(zoomin.isVisible()).toBeTruthy()
      expect(zoomin.attributes('disabled')).toBeUndefined()
      expect(Object.keys(zoomin.attributes())).toContain('class')
      expect(Object.keys(zoomin.find('i').attributes())).toStrictEqual(['class'])
      expect(zoomin.find('i').attributes('class')).toBe('pi pi-search-plus')
      const spy = vi.spyOn(zoomin, 'trigger')
      await zoomin.trigger('click')
      expect(spy).toHaveBeenCalledOnce()
      await zoomin.trigger('click')
      expect(spy).toHaveBeenCalledTimes(2)
      await zoomin.trigger('click')
      expect(spy).toHaveBeenCalledTimes(3)
    }
    // Test ZoomOut
    const zoomout = buttons.at(2)
    expect(zoomout).toBeTruthy()
    if (zoomout) {
      expect(zoomout.isVisible()).toBeTruthy()
      expect(zoomout.attributes('disabled')).toBeUndefined()
      expect(Object.keys(zoomout.attributes())).toContain('class')
      expect(Object.keys(zoomout.find('i').attributes())).toStrictEqual(['class'])
      expect(zoomout.find('i').attributes('class')).toBe('pi pi-search-minus')
      const spy = vi.spyOn(zoomout, 'trigger')
      await zoomout.trigger('click')
      expect(spy).toHaveBeenCalledOnce()
      await zoomout.trigger('click')
      expect(spy).toHaveBeenCalledTimes(2)
      await zoomout.trigger('click')
      expect(spy).toHaveBeenCalledTimes(3)
    }
    // Test ModificationSwitcher
    const modification = buttons.at(3)
    expect(modification).toBeTruthy()
    if (modification) {
      expect(modification.isVisible()).toBeTruthy()
      expect(modification.attributes('disabled')).toBeUndefined()
      expect(Object.keys(modification.attributes())).toContain('class')
      expect(Object.keys(modification.find('i').attributes())).toStrictEqual(['class'])
      expect(modification.find('i').attributes('class')).toBe('pi pi-lock-open')
      const spy = vi.spyOn(modification, 'trigger')
      await modification.trigger('click')
      expect(modification.find('i').attributes('class')).toBe('pi pi-lock')
      expect(spy).toHaveBeenCalledOnce()
      await modification.trigger('click')
      expect(modification.find('i').attributes('class')).toBe('pi pi-lock-open')
      expect(spy).toHaveBeenCalledTimes(2)
      await modification.trigger('click')
      expect(modification.find('i').attributes('class')).toBe('pi pi-lock')
      expect(spy).toHaveBeenCalledTimes(3)
    }
  })
})
