import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useMultiFlows } from './MultiFlows'

const app = createApp({})
app.use(createPinia())

describe.concurrent('MultiFlows.ts', () => {
  it('MultiFlows', () => {
    // Valid
    expect(useMultiFlows).toBeTruthy()
    // Initialize
    const flows = useMultiFlows()
    expect(flows.current).toBe('Flow-0')
    expect(flows.tabs).toStrictEqual([{ flow: 'Flow-0', title: 'Flow-0' }])
    expect(flows.addTab.constructor).toBe(Function)
    // Add a new tab
    flows.addTab()
    expect(flows.current).toBe('Flow-1')
    expect(flows.tabs).toStrictEqual([
      { flow: 'Flow-0', title: 'Flow-0' },
      { flow: 'Flow-1', title: 'Flow-1' }
    ])
    expect(flows.addTab.constructor).toBe(Function)
    // Add another tab
    flows.addTab()
    expect(flows.current).toBe('Flow-2')
    expect(flows.tabs).toStrictEqual([
      { flow: 'Flow-0', title: 'Flow-0' },
      { flow: 'Flow-1', title: 'Flow-1' },
      { flow: 'Flow-2', title: 'Flow-2' }
    ])
    expect(flows.addTab.constructor).toBe(Function)
  })
})
