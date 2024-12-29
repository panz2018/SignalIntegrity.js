import { describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import AutoSave from './AutoSave.vue'

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

describe('AutoSave.vue', () => {
  it('Valid', () => {
    expect(AutoSave).toBeTruthy()
  })
  it('localStorage: empty', async () => {
    // Initialize autosave
    localStorage.clear()
    expect(localStorage.getItem('AutoSave')).toBeNull()
    const wrapper = mount(AutoSave, {
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
    // Find the button
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(1)
    const button = buttons.at(0)
    expect(button).toBeTruthy()
    const spy = vi.spyOn(button, 'trigger' as never)
    // Click once
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('true')
    expect(spy).toHaveBeenCalledTimes(1)
    // Click twice
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('false')
    expect(spy).toHaveBeenCalledTimes(2)
    // Click three times
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('true')
    expect(spy).toHaveBeenCalledTimes(3)
  })
  it('localStorage: false', async () => {
    // Initialize autosave
    localStorage.clear()
    localStorage.setItem('AutoSave', 'false')
    expect(localStorage.getItem('AutoSave')).toBe('false')
    const wrapper = mount(AutoSave, {
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
    // Find the button
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(1)
    const button = buttons.at(0)
    expect(button).toBeTruthy()
    const spy = vi.spyOn(button, 'trigger' as never)
    // Click once
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('true')
    expect(spy).toHaveBeenCalledTimes(1)
    // Click twice
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('false')
    expect(spy).toHaveBeenCalledTimes(2)
    // Click three times
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('true')
    expect(spy).toHaveBeenCalledTimes(3)
  })
  it('localStorage: true', async () => {
    // Initialize autosave
    localStorage.clear()
    localStorage.setItem('AutoSave', 'true')
    expect(localStorage.getItem('AutoSave')).toBe('true')
    const wrapper = mount(AutoSave, {
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
    // Find the button
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(1)
    const button = buttons.at(0)
    expect(button).toBeTruthy()
    const spy = vi.spyOn(button, 'trigger' as never)
    // Click once
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('false')
    expect(spy).toHaveBeenCalledTimes(1)
    // Click twice
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('true')
    expect(spy).toHaveBeenCalledTimes(2)
    // Click three times
    await button!.trigger('click')
    expect(localStorage.getItem('AutoSave')).toBe('false')
    expect(spy).toHaveBeenCalledTimes(3)
  })
})
