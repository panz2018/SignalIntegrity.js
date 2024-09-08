import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { useNavigationStore } from './NavigationMap'

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

describe.concurrent('Navigation Map.ts', () => {
  it('Valid', () => {
    expect(useNavigationStore).toBeTruthy()
  })
  it('Pinia', () => {
    const { navigation, status } = storeToRefs(useNavigationStore())
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
    expect(status.value).toBe(true)
    // Click once
    navigation.value.command()
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-times')
    expect(status.value).toBe(false)
    // Click twice
    navigation.value.command()
    expect(Object.keys(navigation.value)).toStrictEqual(['label', 'icon', 'command'])
    expect(navigation.value.label).toBe('Navigation Map')
    expect(navigation.value.icon).toBe('pi pi-check')
    expect(status.value).toBe(true)
  })
})
