import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { useToolbarStatus } from './ToolbarStatus'

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

describe.concurrent('ToolbarStatus.ts', () => {
  it('Valid', () => {
    expect(useToolbarStatus).toBeTruthy()
  })
  it('ToolbarStatus: empty', () => {
    localStorage.clear()
    expect(localStorage.getItem('ToolbarStatus')).toBeNull()
    const { toolbar, status } = storeToRefs(useToolbarStatus())
    expect(status.value).toBe(true)
    expect(localStorage.getItem('ToolbarStatus')).toBe('true')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
    // Click once
    toolbar.value.command()
    expect(status.value).toBe(false)
    expect(localStorage.getItem('ToolbarStatus')).toBe('false')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-times')
    // Click twice
    toolbar.value.command()
    expect(status.value).toBe(true)
    expect(localStorage.getItem('ToolbarStatus')).toBe('true')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
  })
  it('ToolbarStatus: true', () => {
    localStorage.setItem('ToolbarStatus', 'true')
    expect(localStorage.getItem('ToolbarStatus')).toBe('true')
    const { toolbar, status } = storeToRefs(useToolbarStatus())
    expect(status.value).toBe(true)
    expect(localStorage.getItem('ToolbarStatus')).toBe('true')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
    // Click once
    toolbar.value.command()
    expect(status.value).toBe(false)
    expect(localStorage.getItem('ToolbarStatus')).toBe('false')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-times')
    // Click twice
    toolbar.value.command()
    expect(status.value).toBe(true)
    expect(localStorage.getItem('ToolbarStatus')).toBe('true')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
  })
  it('ToolbarStatus: false', () => {
    localStorage.setItem('ToolbarStatus', 'false')
    expect(localStorage.getItem('ToolbarStatus')).toBe('false')
    const { toolbar, status } = storeToRefs(useToolbarStatus())
    expect(status.value).toBe(false)
    expect(localStorage.getItem('ToolbarStatus')).toBe('false')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-times')
    // Click once
    toolbar.value.command()
    expect(status.value).toBe(true)
    expect(localStorage.getItem('ToolbarStatus')).toBe('true')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
    // Click twice
    toolbar.value.command()
    expect(status.value).toBe(false)
    expect(localStorage.getItem('ToolbarStatus')).toBe('false')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-times')
  })
  it('ToolbarStatus: other', () => {
    localStorage.setItem('ToolbarStatus', 'other')
    expect(localStorage.getItem('ToolbarStatus')).toBe('other')
    const { toolbar, status } = storeToRefs(useToolbarStatus())
    expect(status.value).toBe(true)
    expect(localStorage.getItem('ToolbarStatus')).toBe('true')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
    // Click once
    toolbar.value.command()
    expect(status.value).toBe(false)
    expect(localStorage.getItem('ToolbarStatus')).toBe('false')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-times')
    // Click twice
    toolbar.value.command()
    expect(status.value).toBe(true)
    expect(localStorage.getItem('ToolbarStatus')).toBe('true')
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
  })
})
