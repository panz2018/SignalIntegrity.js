import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { useToolbarStore } from './ToolBar'

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

describe.concurrent('ToolBar.ts', () => {
  it('Valid', () => {
    expect(useToolbarStore).toBeTruthy()
  })
  it('Pinia', () => {
    const { toolbar, status } = storeToRefs(useToolbarStore())
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
    expect(status.value).toBe(true)
    // Click once
    toolbar.value.command()
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-times')
    expect(status.value).toBe(false)
    // Click twice
    toolbar.value.command()
    expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(toolbar.value.label).toBe('Tool Bar')
    expect(toolbar.value.icon).toBe('pi pi-check')
    expect(status.value).toBe(true)
  })
})
