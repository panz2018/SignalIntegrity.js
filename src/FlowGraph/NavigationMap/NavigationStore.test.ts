import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { useNavigationStatus } from './NavigationStore'

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

describe.concurrent('NavigationStatus.ts', () => {
  it('Valid', () => {
    expect(useNavigationStatus).toBeTruthy()
  })
  it('NavigationStatus: empty', () => {
    localStorage.clear()
    expect(localStorage.getItem('NavigationStatus')).toBeNull()
    const { navigation, status } = storeToRefs(useNavigationStatus())
    expect(status.value).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
    // Click once
    navigation.value.command()
    expect(status.value).toBe(false)
    expect(localStorage.getItem('NavigationStatus')).toBe('false')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-empty')
    // Click twice
    navigation.value.command()
    expect(status.value).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
  })
  it('NavigationStatus: true', () => {
    localStorage.setItem('NavigationStatus', 'true')
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    const { navigation, status } = storeToRefs(useNavigationStatus())
    expect(status.value).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
    // Click once
    navigation.value.command()
    expect(status.value).toBe(false)
    expect(localStorage.getItem('NavigationStatus')).toBe('false')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-empty')
    // Click twice
    navigation.value.command()
    expect(status.value).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
  })
  it('NavigationStatus: false', () => {
    localStorage.setItem('NavigationStatus', 'false')
    expect(localStorage.getItem('NavigationStatus')).toBe('false')
    const { navigation, status } = storeToRefs(useNavigationStatus())
    expect(status.value).toBe(false)
    expect(localStorage.getItem('NavigationStatus')).toBe('false')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-empty')
    // Click once
    navigation.value.command()
    expect(status.value).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
    // Click twice
    navigation.value.command()
    expect(status.value).toBe(false)
    expect(localStorage.getItem('NavigationStatus')).toBe('false')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-empty')
  })
  it('NavigationStatus: other', () => {
    localStorage.setItem('NavigationStatus', 'other')
    expect(localStorage.getItem('NavigationStatus')).toBe('other')
    const { navigation, status } = storeToRefs(useNavigationStatus())
    expect(status.value).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
    // Click once
    navigation.value.command()
    expect(status.value).toBe(false)
    expect(localStorage.getItem('NavigationStatus')).toBe('false')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-empty')
    // Click twice
    navigation.value.command()
    expect(status.value).toBe(true)
    expect(localStorage.getItem('NavigationStatus')).toBe('true')
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
  })
})
