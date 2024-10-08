import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { useNavigationStore } from './NavigationStore'

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

// Default perperties
const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
] as const

describe.concurrent('NavigationStore.ts', () => {
  it('Valid', () => {
    expect(useNavigationStore).toBeTruthy()
  })
  it('NavigationStore: empty', () => {
    localStorage.clear()
    expect(localStorage.getItem('Navigation')).toBeNull()
    testNavigation({ status: true, position: 'bottom-left' })
  })
  for (const status of [true, false, 'other']) {
    for (const position of [...positions, 'other']) {
      const string = JSON.stringify({ status: status, position: position })
      it(string, () => {
        localStorage.setItem('Navigation', string)
        expect(localStorage.getItem('Navigation')).toBe(string)
        testNavigation({
          status: status === false ? false : true,
          position: positions.includes(position as any) ? position : 'bottom-left'
        })
      })
    }
  }

  function testNavigation(anticipate: { status: boolean; position: string }) {
    const store = useNavigationStore()
    const { navigation, navigationMenu } = storeToRefs(store)
    check(anticipate)
    // Click enable/disable once
    navigationMenu.value.at(0)?.command!()
    for (const row of navigationMenu.value.at(1)!.items!) {
      row.command({ item: row })
      check({ status: !anticipate.status, position: label2position(row.label) })
    }
    // Click twice
    navigationMenu.value.at(0)?.command!()
    for (const row of navigationMenu.value.at(1)!.items!) {
      row.command({ item: row })
      check({ status: anticipate.status, position: label2position(row.label) })
    }

    function check(anticipate: { status: boolean; position: string }) {
      expect(localStorage.getItem('Navigation')).toBe(JSON.stringify(anticipate))
      expect(navigation.value).toStrictEqual(anticipate)
      expect(navigationMenu.value.length).toBe(2)
      checkMenuStatus(anticipate)
      checkMenuPosition(anticipate)

      function checkMenuStatus(anticipate: { status: boolean; position: string }) {
        const menuStatus = navigationMenu.value.at(0)
        expect(menuStatus).toBeTruthy()
        expect(Object.keys(menuStatus as object)).toStrictEqual(['label', 'icon', 'command'])
        expect(menuStatus?.label).toBe('Navigation Map')
        if (anticipate.status) {
          expect(menuStatus?.icon).toBe('pi pi-check')
        } else {
          expect(menuStatus?.icon).toBe('pi pi-empty')
        }
      }

      function checkMenuPosition(anticipate: { status: boolean; position: string }) {
        const menuPosition = navigationMenu.value.at(1)
        expect(menuPosition).toBeTruthy()
        expect(Object.keys(menuPosition as object)).toStrictEqual(['label', 'icon', 'items'])
        expect(menuPosition?.label).toBe('Navigation Map Position')
        expect(menuPosition?.icon).toBe('pi pi-empty')
        const items = menuPosition?.items
        expect(items).toBeTruthy()
        const numPositions = {
          'top-left': 0,
          'top-center': 0,
          'top-right': 0,
          'bottom-left': 0,
          'bottom-center': 0,
          'bottom-right': 0
        }
        expect(items?.length).toBe(Object.keys(numPositions).length)
        for (const row of items!) {
          expect(Object.keys(row as object)).toStrictEqual(['label', 'icon', 'command'])
          const label = row.label
          const position = label2position(label)
          expect(position2label(position)).toBe(label)
          expect(Object.keys(numPositions)).toContain(position)
          numPositions[position as keyof typeof numPositions] += 1
          if (anticipate.position === position) {
            expect(row.icon).toBe('pi pi-check')
          } else {
            expect(row.icon).toBe('pi pi-empty')
          }
        }
        for (const number of Object.values(numPositions)) {
          expect(number).toBe(1)
        }
      }
    }

    function position2label(position: string): string {
      return position
        .split('-')
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join(' ')
    }

    function label2position(label: string): string {
      return label
        .split(' ')
        .map((x) => x.toLowerCase())
        .join('-')
    }
  }
})
