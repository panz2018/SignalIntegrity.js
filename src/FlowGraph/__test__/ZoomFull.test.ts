import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ZoomFull from '../ZoomFull.vue'

describe.concurrent('ZoomFull.Vue', () => {
  it('valid', () => {
    expect(ZoomFull).toBeTruthy()
  })
  it('attributes', () => {
    const wrapper = mount(ZoomFull, { props: {} })
    expect(Object.keys(wrapper.attributes())).toEqual(['class', 'title'])
  })
  it('class', () => {
    const wrapper = mount(ZoomFull, { props: {} })
    expect(wrapper.classes()).toEqual(['vue-flow__controls-button'])
  })
  it('title', () => {
    const wrapper = mount(ZoomFull, { props: {} })
    expect(wrapper.attributes('title')).toEqual('Zoom full')
  })
  it('Internal Vue instance', () => {
    const wrapper = mount(ZoomFull, { props: {} })
    expect(wrapper.vm).toEqual({})
  })
  it('visible', () => {
    const wrapper = mount(ZoomFull, { props: {} })
    expect(wrapper.isVisible()).toBeTruthy()
  })
  it('disabled', () => {
    const wrapper = mount(ZoomFull, { props: {} })
    expect(wrapper.attributes('disabled')).toBeUndefined()
  })
  it('click', async () => {
    const wrapper = mount(ZoomFull, { props: {} })
    await wrapper.find('button').trigger('click')
  })
})
