import { describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import ThemeSwitcher from './ThemeSwitcher.vue'

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
  it('Valid', () => {
    expect(ThemeSwitcher).toBeTruthy()
  })
  it('Initialized', () => {
    expect(localStorage.getItem('theme')).toBe(null)
    const wrapper = mount(ThemeSwitcher, {
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
    expect(Object.keys(wrapper.attributes())).toContain('type')
    expect(wrapper.attributes('type')).toEqual('button')
    expect((wrapper.vm as any).theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
    expect((wrapper.vm as any).tooltip).toBe('Dark theme')
    expect((wrapper.vm as any).icon).toBe('pi-moon')
    expect(wrapper.find('i').attributes('class')).toBe('dark:text-white pi pi-moon')
  })
  it('click', async () => {
    localStorage.setItem('theme', 'Bright')
    expect(localStorage.getItem('theme')).toEqual('Bright')
    const wrapper = mount(ThemeSwitcher, {
      props: {},
      global: {
        directives: {
          ripple: Ripple,
          tooltip: Tooltip
        }
      }
    })
    expect((wrapper.vm as any).theme.theme).toEqual('Bright')
    expect(localStorage.getItem('theme')).toEqual('Bright')
    expect((wrapper.vm as any).tooltip).toBe('Bright theme')
    expect((wrapper.vm as any).icon).toBe('pi-sun')
    expect(Object.keys(wrapper.find('i').attributes())).toContain('class')
    expect(wrapper.find('i').attributes('class')).toBe('dark:text-white pi pi-sun')
    const spy = vi.spyOn(wrapper, 'trigger')
    // Click button once
    await wrapper.trigger('click')
    expect((wrapper.vm as any).theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
    expect((wrapper.vm as any).tooltip).toBe('Dark theme')
    expect((wrapper.vm as any).icon).toBe('pi-moon')
    expect(wrapper.find('i').attributes('class')).toBe('dark:text-white pi pi-moon')
    expect(spy).toHaveBeenCalledTimes(1)
    // Click button second time
    await wrapper.trigger('click')
    expect((wrapper.vm as any).theme.theme).toEqual('Bright')
    expect(localStorage.getItem('theme')).toEqual('Bright')
    expect((wrapper.vm as any).tooltip).toBe('Bright theme')
    expect((wrapper.vm as any).icon).toBe('pi-sun')
    expect(wrapper.find('i').attributes('class')).toBe('dark:text-white pi pi-sun')
    expect(spy).toHaveBeenCalledTimes(2)
    // Click button thrid time
    await wrapper.trigger('click')
    expect((wrapper.vm as any).theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
    expect((wrapper.vm as any).tooltip).toBe('Dark theme')
    expect((wrapper.vm as any).icon).toBe('pi-moon')
    expect(wrapper.find('i').attributes('class')).toBe('dark:text-white pi pi-moon')
    expect(spy).toHaveBeenCalledTimes(3)
  })
})
