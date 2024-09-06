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
    expect(localStorage.getItem('theme')).to.eq(null)
    const rootClass = document.getElementsByTagName('html')[0].classList
    expect(rootClass.contains('p-dark')).to.eq(false)
  })
  it('localStorage: empty', () => {
    const rootClass = document.getElementsByTagName('html')[0].classList
    // Initialize theme when no local stroage parameter
    localStorage.clear()
    expect(localStorage.getItem('theme')).to.eq(null)
    const theme = useThemeStore()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
    expect(rootClass.contains('p-dark')).to.eq(true)
    // Toggle theme once
    theme.toggle()
    expect(theme.theme).to.eq('Bright')
    expect(localStorage.getItem('theme')).to.eq('Bright')
    expect(rootClass.contains('p-dark')).to.eq(false)
    // Toggle theme twice
    theme.toggle()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
    expect(rootClass.contains('p-dark')).to.eq(true)
  })
  it('localStorage: Dark', () => {
    const rootClass = document.getElementsByTagName('html')[0].classList
    // Initialize theme with local storage value "Dark"
    localStorage.setItem('theme', 'Dark')
    expect(localStorage.getItem('theme')).to.eq('Dark')
    const theme = useThemeStore()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
    expect(rootClass.contains('p-dark')).to.eq(true)
    // Toggle theme once
    theme.toggle()
    expect(theme.theme).to.eq('Bright')
    expect(localStorage.getItem('theme')).to.eq('Bright')
    expect(rootClass.contains('p-dark')).to.eq(false)
    // Toggle theme twice
    theme.toggle()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
    expect(rootClass.contains('p-dark')).to.eq(true)
  })
  it('localStorage: Bright', () => {
    const rootClass = document.getElementsByTagName('html')[0].classList
    // Initialize theme with local storage value "Bright"
    localStorage.setItem('theme', 'Bright')
    expect(localStorage.getItem('theme')).to.eq('Bright')
    const theme = useThemeStore()
    expect(localStorage.getItem('theme')).to.eq('Bright')
    expect(theme.theme).to.eq('Bright')
    expect(rootClass.contains('p-dark')).to.eq(false)
    // Toggle theme once
    theme.toggle()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
    expect(rootClass.contains('p-dark')).to.eq(true)
    // Toggle theme twice
    theme.toggle()
    expect(theme.theme).to.eq('Bright')
    expect(localStorage.getItem('theme')).to.eq('Bright')
    expect(rootClass.contains('p-dark')).to.eq(false)
  })
  it('localStorage: other', () => {
    const rootClass = document.getElementsByTagName('html')[0].classList
    // Initialize theme with local storage value "other"
    localStorage.setItem('theme', 'other')
    expect(localStorage.getItem('theme')).to.eq('other')
    const theme = useThemeStore()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
    expect(rootClass.contains('p-dark')).to.eq(true)
    // Toggle theme once
    theme.toggle()
    expect(theme.theme).to.eq('Bright')
    expect(localStorage.getItem('theme')).to.eq('Bright')
    expect(rootClass.contains('p-dark')).to.eq(false)
    // Toggle theme twice
    theme.toggle()
    expect(localStorage.getItem('theme')).to.eq('Dark')
    expect(theme.theme).to.eq('Dark')
    expect(rootClass.contains('p-dark')).to.eq(true)
  })
})
