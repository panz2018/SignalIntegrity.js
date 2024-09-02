import { createApp } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from './theme'

beforeEach(() => {
  const app = createApp({})
  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)
})
describe.concurrent('theme.ts', () => {
  it('valid', () => {
    expect(useThemeStore).toBeTruthy()
  })
  it('Empty localStorage', () => {
    localStorage.clear()
    expect(localStorage.getItem('theme')).toBeNull()
    const theme = useThemeStore()
    expect(theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
  })
  it('localStorage: Bright', () => {
    localStorage.setItem('theme', 'Bright')
    expect(localStorage.getItem('theme')).toEqual('Bright')
    const theme = useThemeStore()
    expect(theme.theme).toEqual('Bright')
    expect(localStorage.getItem('theme')).toEqual('Bright')
  })
  it('localStorage: Dark', () => {
    localStorage.setItem('theme', 'Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
    const theme = useThemeStore()
    expect(theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
  })
  it('localStorage: other', () => {
    localStorage.setItem('theme', 'other')
    expect(localStorage.getItem('theme')).toEqual('other')
    const theme = useThemeStore()
    expect(theme.theme).toEqual('Dark')
    expect(localStorage.getItem('theme')).toEqual('Dark')
  })
})
