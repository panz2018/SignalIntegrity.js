import { createApp } from 'vue'
import { describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useThemeStore } from '@/stores/theme'

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
describe.concurrent('ThemeSwitcher.Vue', () => {
  it('valid', () => {
    expect(ThemeSwitcher).toBeTruthy()
  })
  it('attributes', () => {
    const wrapper = mount(ThemeSwitcher, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect(Object.keys(wrapper.attributes())).toContain('class')
    expect(Object.keys(wrapper.attributes())).toContain('type')
    expect(wrapper.attributes('type')).toEqual('button')
  })
  it('Internal Vue instance', () => {
    const wrapper = mount(ThemeSwitcher, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect(wrapper.vm).toEqual({})
  })
  it('visible', () => {
    const wrapper = mount(ThemeSwitcher, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect(wrapper.isVisible()).toBeTruthy()
  })
  it('disabled', () => {
    const wrapper = mount(ThemeSwitcher, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect(wrapper.attributes('disabled')).toBeUndefined()
  })
  it('click', async () => {
    localStorage.setItem('theme', 'Bright')
    expect(localStorage.getItem('theme')).toEqual('Bright')
    const theme = useThemeStore()
    expect(theme.theme).toBe('Bright')
    const wrapper = mount(ThemeSwitcher, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect((wrapper.vm as any).tooltip).toBe('Bright theme')
    expect((wrapper.vm as any).icon).toBe('pi-sun')
    expect(Object.keys(wrapper.find('i').attributes())).toContain('class')
    expect(wrapper.find('i').attributes('class')).toBe('dark:text-white pi pi-sun')
    // Click button once
    await wrapper.find('button').trigger('click')
    expect(theme.theme).toBe('Dark')
    expect((wrapper.vm as any).tooltip).toBe('Dark theme')
    expect((wrapper.vm as any).icon).toBe('pi-moon')
    expect(wrapper.find('i').attributes('class')).toBe('dark:text-white pi pi-moon')
    // Click button second time
    await wrapper.find('button').trigger('click')
    expect(theme.theme).toBe('Bright')
    expect((wrapper.vm as any).tooltip).toBe('Bright theme')
    expect((wrapper.vm as any).icon).toBe('pi-sun')
    expect(wrapper.find('i').attributes('class')).toBe('dark:text-white pi pi-sun')
  })
})
