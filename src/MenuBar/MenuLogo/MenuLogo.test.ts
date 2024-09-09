import { createApp } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import MenuLogo from './MenuLogo.vue'

const app = createApp({})
const pinia = createPinia()
app.use(pinia)
setActivePinia(pinia)
describe.concurrent('MenuLogo.Vue', () => {
  it('Valid', () => {
    expect(MenuLogo).toBeTruthy()
  })
  it('Initialized', async () => {
    localStorage.clear()
    expect(localStorage.getItem('theme')).toBe(null)
    const wrapper = mount(MenuLogo, {
      props: {}
    })
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect((wrapper.vm as any).theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
    expect(wrapper.find('div')).toBeTruthy()
    // Check svg
    expect(wrapper.find('svg')).toBeTruthy()
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24')
    // Check path
    const path = wrapper.find('path')
    expect(path).toBeTruthy()
    expect(path.attributes('d')).toBeTruthy()
    expect(path.attributes('fill')).toBe('white')
    // Spy click event
    const spy = vi.spyOn((wrapper.vm as any).theme, 'toggle')
    // Click once
    ;(wrapper.vm as any).theme.toggle()
    expect((wrapper.vm as any).theme.theme).toEqual('Bright')
    expect(spy).toHaveBeenCalledTimes(1)
    // Click twice
    ;(wrapper.vm as any).theme.toggle()
    expect((wrapper.vm as any).theme.theme).toEqual('Dark')
    expect(spy).toHaveBeenCalledTimes(2)
    // Click third time
    ;(wrapper.vm as any).theme.toggle()
    expect((wrapper.vm as any).theme.theme).toEqual('Bright')
    expect(spy).toHaveBeenCalledTimes(3)
  })
  it('localstorage: Dark', () => {
    localStorage.setItem('theme', 'Dark')
    expect(localStorage.getItem('theme')).to.eq('Dark')
    const wrapper = mount(MenuLogo, {
      props: {}
    })
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect((wrapper.vm as any).theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
    expect(wrapper.find('div')).toBeTruthy()
    // Check svg
    expect(wrapper.find('svg')).toBeTruthy()
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24')
    // Check path
    const path = wrapper.find('path')
    expect(path).toBeTruthy()
    expect(path.attributes('d')).toBeTruthy()
    expect(path.attributes('fill')).toBe('white')
  })
  it('localstorage: Bright', () => {
    localStorage.setItem('theme', 'Bright')
    expect(localStorage.getItem('theme')).to.eq('Bright')
    const wrapper = mount(MenuLogo, {
      props: {}
    })
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect((wrapper.vm as any).theme.theme).toEqual('Bright')
    expect(localStorage.getItem('theme')).toEqual('Bright')
    expect(wrapper.find('div')).toBeTruthy()
    // Check svg
    expect(wrapper.find('svg')).toBeTruthy()
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24')
    // Check path
    const path = wrapper.find('path')
    expect(path).toBeTruthy()
    expect(path.attributes('d')).toBeTruthy()
    expect(path.attributes('fill')).toBe('black')
  })
  it('localstorage: other', () => {
    localStorage.setItem('theme', 'other')
    expect(localStorage.getItem('theme')).to.eq('other')
    const wrapper = mount(MenuLogo, {
      props: {}
    })
    expect(wrapper.isVisible()).toBeTruthy()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect((wrapper.vm as any).theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
    expect(wrapper.find('div')).toBeTruthy()
    // Check svg
    expect(wrapper.find('svg')).toBeTruthy()
    expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 24 24')
    // Check path
    const path = wrapper.find('path')
    expect(path).toBeTruthy()
    expect(path.attributes('d')).toBeTruthy()
    expect(path.attributes('fill')).toBe('white')
  })
})
