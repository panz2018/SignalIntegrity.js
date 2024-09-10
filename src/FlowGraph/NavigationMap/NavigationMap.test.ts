import { describe, expect, it } from 'vitest'
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
  it('localStorage: empty', async () => {
    localStorage.clear()
    const wrapper = mount(NavigationMap, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect((wrapper.vm as any).navigation.status).toBe(true)
    expect((wrapper.vm as any).navigation.position).toBe('bottom-right')
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(Object.keys(wrapper.attributes())).toContain('style')
    expect(Object.keys(wrapper.attributes())).toContain('class')
  })
})
