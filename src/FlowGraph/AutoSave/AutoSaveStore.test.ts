import { beforeEach, describe, expect, it } from 'vitest'
import { createApp, nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { useAutoSaveStore } from './AutoSaveStore'

describe('AutoSaveStore.ts', () => {
  beforeEach(() => {
    // Set active pinia
    const app = createApp({})
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })
  it('Valid', () => {
    expect(useAutoSaveStore).toBeTruthy()
  })
  it('localStorage: empty', async () => {
    // Initialize autosave
    localStorage.clear()
    expect(localStorage.getItem('AutoSave')).toBeNull()
    const autosave = useAutoSaveStore()
    expect(autosave.state).toBeNull()
    expect(localStorage.getItem('AutoSave')).toBeNull()
    // Set state: false
    autosave.state = false
    expect(autosave.state).toBe(false)
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBe('false')
    // Set state: true
    autosave.state = true
    expect(autosave.state).toBe(true)
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBe('true')
    // Set state: null
    autosave.state = null
    expect(autosave.state).toBeNull()
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBeNull()
  })
  it('localStorage: false', async () => {
    // Initialize autosave
    localStorage.clear()
    localStorage.setItem('AutoSave', 'false')
    expect(localStorage.getItem('AutoSave')).toBe('false')
    const autosave = useAutoSaveStore()
    expect(autosave.state).toBe(false)
    expect(localStorage.getItem('AutoSave')).toBe('false')
    // Set state: null
    autosave.state = null
    expect(autosave.state).toBeNull()
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBeNull()
    // Set state: true
    autosave.state = true
    expect(autosave.state).toBe(true)
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBe('true')
    // Set state: false
    autosave.state = false
    expect(autosave.state).toBe(false)
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBe('false')
  })
  it('localStorage: true', async () => {
    // Initialize autosave
    localStorage.clear()
    localStorage.setItem('AutoSave', 'true')
    expect(localStorage.getItem('AutoSave')).toBe('true')
    const autosave = useAutoSaveStore()
    expect(autosave.state).toBe(true)
    expect(localStorage.getItem('AutoSave')).toBe('true')
    // Set state: false
    autosave.state = false
    expect(autosave.state).toBe(false)
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBe('false')
    // Set state: null
    autosave.state = null
    expect(autosave.state).toBeNull()
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBeNull()
    // Set state: true
    autosave.state = true
    expect(autosave.state).toBe(true)
    await nextTick()
    expect(localStorage.getItem('AutoSave')).toBe('true')
  })
})
