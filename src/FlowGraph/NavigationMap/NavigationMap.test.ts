import { describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import NavigationMap from './NavigationMap.vue'

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

describe.concurrent('NavigationMap.Vue', () => {
  it('Valid', () => {
    expect(NavigationMap).toBeTruthy()
  })
  it('NavigationStatus: empty', async () => {
    localStorage.clear()
    expect(localStorage.getItem('NavigationStatus')).toBeNull()
    const wrapper = mount(NavigationMap, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect((wrapper.vm as any).status).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(Object.keys(wrapper.attributes())).toContain('style')
    expect(Object.keys(wrapper.attributes())).toContain('class')
  })
  it('NavigationStatus: true', async () => {
    localStorage.setItem('NavigationStatus', 'true')
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    const wrapper = mount(NavigationMap, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect((wrapper.vm as any).status).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.isVisible()).toBeTruthy()
  })
  it('NavigationStatus: false', async () => {
    localStorage.setItem('NavigationStatus', 'false')
    expect(localStorage.getItem('NavigationStatus')).toBe('false')
    const wrapper = mount(NavigationMap, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect((wrapper.vm as any).status).toBe(false)
    expect(localStorage.getItem('NavigationStatus')).toBe('false')
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.isVisible()).toBeFalsy()
  })
  it('NavigationStatus: other', async () => {
    localStorage.setItem('NavigationStatus', 'other')
    expect(localStorage.getItem('NavigationStatus')).toBe('other')
    const wrapper = mount(NavigationMap, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect((wrapper.vm as any).status).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.isVisible()).toBeTruthy()
  })
})
