import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Noir from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import { useToolbarStore } from './ToolbarStore'

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

describe.concurrent('ToolbarStore.ts', () => {
  it('Valid', () => {
    expect(useToolbarStore).toBeTruthy()
  })
  it('ToolbarStore: empty', () => {
    localStorage.clear()
    expect(localStorage.getItem('Toolbar')).toBeNull()
    const { toolbarMenu } = testToolbar({ status: true, position: 'top-left' })
    // Click enable/disable once
    toolbarMenu.value.at(0)?.command!()
    for (const row of toolbarMenu.value.at(1)!.items!) {
      row.command({ item: row })
      testToolbar({ status: false, position: label2position(row.label) })
    }
    // Click twice
    toolbarMenu.value.at(0)?.command!()
    for (const row of toolbarMenu.value.at(1)!.items!) {
      row.command({ item: row })
      testToolbar({ status: true, position: label2position(row.label) })
    }
  })
  // it('ToolbarStore: true', () => {
  //   localStorage.setItem('ToolbarStatus', 'true')
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('true')
  //   const { toolbar, status } = storeToRefs(useToolbarStore())
  //   expect(status.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  //   // Click once
  //   toolbar.value.command()
  //   expect(status.value).toBe(false)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('false')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-times')
  //   // Click twice
  //   toolbar.value.command()
  //   expect(status.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  // })
  // it('ToolbarStore: false', () => {
  //   localStorage.setItem('ToolbarStatus', 'false')
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('false')
  //   const { toolbar, status } = storeToRefs(useToolbarStore())
  //   expect(status.value).toBe(false)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('false')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-times')
  //   // Click once
  //   toolbar.value.command()
  //   expect(status.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  //   // Click twice
  //   toolbar.value.command()
  //   expect(status.value).toBe(false)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('false')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-times')
  // })
  // it('ToolbarStore: other', () => {
  //   localStorage.setItem('ToolbarStatus', 'other')
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('other')
  //   const { toolbar, status } = storeToRefs(useToolbarStore())
  //   expect(status.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  //   // Click once
  //   toolbar.value.command()
  //   expect(status.value).toBe(false)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('false')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-times')
  //   // Click twice
  //   toolbar.value.command()
  //   expect(status.value).toBe(true)
  //   expect(localStorage.getItem('ToolbarStatus')).toBe('true')
  //   expect(Object.keys(toolbar.value)).toStrictEqual(['label', 'icon', 'command'])
  //   expect(toolbar.value.label).toBe('Tool Bar')
  //   expect(toolbar.value.icon).toBe('pi pi-check')
  // })
})

function testToolbar(anticipate: { status: boolean; position: string }) {
  const store = useToolbarStore()
  const { toolbar, toolbarMenu } = storeToRefs(store)
  expect(localStorage.getItem('Toolbar')).toBe(JSON.stringify(anticipate))
  expect(toolbar.value).toStrictEqual(anticipate)
  expect(toolbarMenu.value.length).toBe(2)
  checkMenuStatus()
  checkMenuPosition()
  return { toolbar, toolbarMenu }

  function checkMenuStatus() {
    const menuStatus = toolbarMenu.value.at(0)
    expect(menuStatus).toBeTruthy()
    expect(Object.keys(menuStatus as Object)).toStrictEqual(['label', 'icon', 'command'])
    expect(menuStatus?.label).toBe('Tool Bar')
    if (anticipate.status) {
      expect(menuStatus?.icon).toBe('pi pi-check')
    } else {
      expect(menuStatus?.icon).toBe('pi pi-empty')
    }
  }

  function checkMenuPosition() {
    const menuPosition = toolbarMenu.value.at(1)
    expect(menuPosition).toBeTruthy()
    expect(Object.keys(menuPosition as Object)).toStrictEqual(['label', 'icon', 'items'])
    expect(menuPosition?.label).toBe('Tool Bar Position')
    expect(menuPosition?.icon).toBe('pi pi-empty')
    const items = menuPosition?.items
    expect(items).toBeTruthy()
    const positions = {
      'top-left': 0,
      'top-center': 0,
      'top-right': 0,
      'bottom-left': 0,
      'bottom-center': 0,
      'bottom-right': 0
    }
    expect(items?.length).toBe(Object.keys(positions).length)
    for (const row of items!) {
      expect(Object.keys(row as Object)).toStrictEqual(['label', 'icon', 'command'])
      const label = row.label
      const position = label2position(label)
      expect(position2label(position)).toBe(label)
      expect(Object.keys(positions)).toContain(position)
      positions[position as keyof typeof positions] += 1
      if (anticipate.position === position) {
        expect(row.icon).toBe('pi pi-check')
      } else {
        expect(row.icon).toBe('pi pi-empty')
      }
    }
    for (const number of Object.values(positions)) {
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
