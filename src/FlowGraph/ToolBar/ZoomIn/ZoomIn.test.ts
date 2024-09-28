import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import ZoomIn from './ZoomIn.vue'
import zoomin from './ZoomIn'

const app = createApp({})
app.directive('ripple', Ripple)
app.directive('tooltip', Tooltip)
app.use(createPinia())
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

describe.concurrent('ZoomIn.ts', () => {
  it('Valid', () => {
    expect(zoomin).toBeTruthy()
  })
  it('Initialized', () => {
    expect(Object.keys(zoomin)).toStrictEqual(['label', 'icon', 'command'])
    expect(zoomin.label).toBe('Zoom In')
    expect(zoomin.icon).toBe('pi pi-search-plus')
  })
})

describe.concurrent('ZoomIn.Vue', () => {
  it('Valid', () => {
    expect(ZoomIn).toBeTruthy()
  })
  it('Initialized', () => {
    const wrapper = mount(ZoomIn, {
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
    expect(wrapper.find('i').attributes('class')).toBe('pi pi-search-plus')
  })
  it('click', async () => {
    const wrapper = mount(ZoomIn, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    const spy = vi.spyOn(wrapper, 'trigger')
    await wrapper.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    await wrapper.trigger('click')
    expect(spy).toHaveBeenCalledTimes(2)
    await wrapper.trigger('click')
    expect(spy).toHaveBeenCalledTimes(3)
  })
})
