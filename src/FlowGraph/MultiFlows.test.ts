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
    expect(flows.titles).toStrictEqual({ 'Flow-0': 'Flow-0' })
    expect(flows.newFlow.constructor).toBe(Function)
    // Add a new tab
    flows.newFlow()
    expect(flows.current).toBe('Flow-1')
    expect(flows.titles).toStrictEqual({ 'Flow-0': 'Flow-0', 'Flow-1': 'Flow-1' })
    expect(flows.newFlow.constructor).toBe(Function)
    // Add another tab
    flows.newFlow()
    expect(flows.current).toBe('Flow-2')
    expect(flows.titles).toStrictEqual({
      'Flow-0': 'Flow-0',
      'Flow-1': 'Flow-1',
      'Flow-2': 'Flow-2'
    })
    expect(flows.newFlow.constructor).toBe(Function)
    // Add another tab
    flows.newFlow()
    expect(flows.current).toBe('Flow-3')
    expect(flows.titles).toStrictEqual({
      'Flow-0': 'Flow-0',
      'Flow-1': 'Flow-1',
      'Flow-2': 'Flow-2',
      'Flow-3': 'Flow-3'
    })
    expect(flows.newFlow.constructor).toBe(Function)
    // Close Flow-0
    expect(flows.closeFlow.constructor).toBe(Function)
    flows.closeFlow('Flow-0')
    expect(flows.current).toBe('Flow-1')
    expect(flows.titles).toStrictEqual({
      'Flow-1': 'Flow-1',
      'Flow-2': 'Flow-2',
      'Flow-3': 'Flow-3'
    })
    // Add another tab
    flows.newFlow()
    expect(flows.current).toBe('Flow-4')
    expect(flows.titles).toStrictEqual({
      'Flow-1': 'Flow-1',
      'Flow-2': 'Flow-2',
      'Flow-3': 'Flow-3',
      'Flow-4': 'Flow-4'
    })
    // Close Flow-2
    flows.closeFlow('Flow-2')
    expect(flows.current).toBe('Flow-3')
    expect(flows.titles).toStrictEqual({
      'Flow-1': 'Flow-1',
      'Flow-3': 'Flow-3',
      'Flow-4': 'Flow-4'
    })
    // Close Flow-4
    flows.closeFlow('Flow-4')
    expect(flows.current).toBe('Flow-3')
    expect(flows.titles).toStrictEqual({
      'Flow-1': 'Flow-1',
      'Flow-3': 'Flow-3'
    })
    // Add another tab
    flows.newFlow()
    expect(flows.current).toBe('Flow-5')
    expect(flows.titles).toStrictEqual({
      'Flow-1': 'Flow-1',
      'Flow-3': 'Flow-3',
      'Flow-5': 'Flow-5'
    })
    // Close Flow-5
    flows.closeFlow('Flow-5')
    expect(flows.current).toBe('Flow-3')
    expect(flows.titles).toStrictEqual({
      'Flow-1': 'Flow-1',
      'Flow-3': 'Flow-3'
    })
    // Close Flow-3
    flows.closeFlow('Flow-3')
    expect(flows.current).toBe('Flow-1')
    expect(flows.titles).toStrictEqual({
      'Flow-1': 'Flow-1'
    })
    // Close Flow-1
    flows.closeFlow('Flow-1')
    expect(flows.current).toBe('Flow-6')
    expect(flows.titles).toStrictEqual({
      'Flow-6': 'Flow-6'
    })
    // Close Flow-1
    flows.closeFlow('Flow-6')
    expect(flows.current).toBe('Flow-7')
    expect(flows.titles).toStrictEqual({
      'Flow-7': 'Flow-7'
    })
  })
})
