import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { useToolbarPosition } from './ToolbarPosition'

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

describe.concurrent('useToolbarPosition.ts', () => {
  it('Valid', () => {
    expect(useToolbarPosition).toBeTruthy()
  })
  it('ToolbarPosition: empty', () => {
    localStorage.clear()
    expect(localStorage.getItem('ToolbarPosition')).toBeNull()
    const { toolbarPosition, toolbarPositionMenu } = storeToRefs(useToolbarPosition())
    expect(toolbarPosition.value).toBe('top-left')
    expect(localStorage.getItem('ToolbarPosition')).toBe('top-left')
    // expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    // expect(toolbar.value.label).toBe('Tool Bar')
    // expect(toolbar.value.icon).toBe('pi pi-check')
    // // Click once
    // toolbar.value.command()
    // expect(toolbarPosition.value).toBe(false)
    // expect(localStorage.getItem('ToolbarPosition')).toBe('false')
    // expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    // expect(toolbar.value.label).toBe('Tool Bar')
    // expect(toolbar.value.icon).toBe('pi pi-times')
    // // Click twice
    // toolbar.value.command()
    // expect(toolbarPosition.value).toBe(true)
    // expect(localStorage.getItem('ToolbarPosition')).toBe('true')
    // expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    // expect(toolbar.value.label).toBe('Tool Bar')
    // expect(toolbar.value.icon).toBe('pi pi-check')
  })
  // it('ToolbarPosition: true', () => {
  //   localStorage.setItem('ToolbarPosition', 'true')
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('true')
  //   const { toolbarPosition, ToolbarPositionMenu } = storeToRefs(useToolbarPosition())
  //   expect(toolbarPosition.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  //   // Click once
  //   toolbar.value.command()
  //   expect(toolbarPosition.value).toBe(false)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('false')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-times')
  //   // Click twice
  //   toolbar.value.command()
  //   expect(toolbarPosition.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  // })
  // it('ToolbarPosition: false', () => {
  //   localStorage.setItem('ToolbarPosition', 'false')
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('false')
  //   const { toolbarPosition, ToolbarPositionMenu } = storeToRefs(useToolbarPosition())
  //   expect(toolbarPosition.value).toBe(false)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('false')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-times')
  //   // Click once
  //   toolbar.value.command()
  //   expect(toolbarPosition.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  //   // Click twice
  //   toolbar.value.command()
  //   expect(toolbarPosition.value).toBe(false)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('false')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-times')
  // })
  // it('ToolbarPosition: other', () => {
  //   localStorage.setItem('ToolbarPosition', 'other')
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('other')
  //   const { toolbarPosition, ToolbarPositionMenu } = storeToRefs(useToolbarPosition())
  //   expect(toolbarPosition.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  //   // Click once
  //   toolbar.value.command()
  //   expect(toolbarPosition.value).toBe(false)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('false')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-times')
  //   // Click twice
  //   toolbar.value.command()
  //   expect(toolbarPosition.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarPosition')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  // })
})
