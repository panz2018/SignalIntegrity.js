import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

import { useThemeStore } from './theme'

describe('theme.ts', () => {
  beforeEach(() => {
    const app = createApp({})
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })
  it('valid', () => {
    expect(useThemeStore).to.exist
  })
  it('localStorage: empty', () => {
    localStorage.clear()
    expect(localStorage.getItem('theme')).to.eq(null)
    const theme = useThemeStore()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
  })
  it('localStorage: Dark', () => {
    localStorage.setItem('theme', 'Dark')
    expect(localStorage.getItem('theme')).to.eq('Dark')
    const theme = useThemeStore()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
  })
  it('localStorage: Bright', () => {
    localStorage.setItem('theme', 'Bright')
    expect(localStorage.getItem('theme')).to.eq('Bright')
    const theme = useThemeStore()
    expect(localStorage.getItem('theme')).to.eq('Bright')
    expect(theme.theme).to.eq('Bright')
  })
  it('localStorage: other', () => {
    localStorage.setItem('theme', 'other')
    expect(localStorage.getItem('theme')).to.eq('other')
    const theme = useThemeStore()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
  })
})
