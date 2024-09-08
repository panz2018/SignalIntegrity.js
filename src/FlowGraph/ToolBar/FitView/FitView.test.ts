import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import FitView from './FitView.vue'
import fitview from './FitView'

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

describe.concurrent('FitView.ts', () => {
  it('Valid', () => {
    expect(fitview).toBeTruthy()
  })
  it('Initialized', () => {
    expect(Object.keys(fitview)).toStrictEqual(['label', 'icon', 'command'])
    expect(fitview.label).toBe('Fit View')
    expect(fitview.icon).toBe('pi pi-window-maximize')
  })
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
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(Object.keys(wrapper.attributes())).toContain('class')
    expect(Object.keys(wrapper.find('i').attributes())).toStrictEqual(['class'])
    expect(wrapper.find('i').attributes('class')).toBe('pi pi-window-maximize')
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
    const spy = vi.spyOn(wrapper, 'trigger')
    await wrapper.trigger('click')
    expect(spy).toHaveBeenCalledTimes(1)
    await wrapper.trigger('click')
    expect(spy).toHaveBeenCalledTimes(2)
    await wrapper.trigger('click')
    expect(spy).toHaveBeenCalledTimes(3)
  })
})
