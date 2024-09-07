import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import FitView from './FitView.vue'

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
describe.concurrent('FitView.Vue', () => {
  it('Valid', () => {
    expect(FitView).toBeTruthy()
  })
  it('Initialized', () => {
    const wrapper = mount(FitView, {
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
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 48 48')
  })
  it('click', async () => {
    const wrapper = mount(FitView, {
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