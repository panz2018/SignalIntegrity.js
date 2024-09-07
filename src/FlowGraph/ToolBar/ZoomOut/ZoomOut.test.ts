import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import ZoomOut from './ZoomOut.vue'
import zoomout from './ZoomOut'

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

describe.concurrent('ZoomIn.ts', () => {
  it('Valid', () => {
    expect(zoomout).toBeTruthy()
  })
  it('Initialized', () => {
    expect(Object.keys(zoomout)).toStrictEqual(['label', 'icon', 'command'])
    expect(zoomout.label).toBe('Zoom Out')
    expect(zoomout.icon).toBe('pi pi-search-minus')
  })
})

describe.concurrent('ZoomIn.Vue', () => {
  it('Valid', () => {
    expect(ZoomOut).toBeTruthy()
  })
  it('Initialized', () => {
    const wrapper = mount(ZoomOut, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(Object.keys(wrapper.attributes())).toContain('class')
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(Object.keys(wrapper.find('i').attributes())).toStrictEqual(['class'])
    expect(wrapper.find('i').attributes('class')).toBe('pi pi-search-minus')
  })
  it('click', async () => {
    const wrapper = mount(ZoomOut, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    await wrapper.find('button').trigger('click')
  })
})
