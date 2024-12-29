import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useResetFlow } from './ResetFlow'
import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'

const app = createApp({})
app.use(createPinia())

describe.concurrent('NewFile.ts', () => {
  it('Valid', () => {
    expect(useResetFlow).toBeTruthy()
    const { resetMenu } = useResetFlow()
    expect(Object.keys(resetMenu)).toStrictEqual(['label', 'icon', 'command'])
    expect(resetMenu.label).toBe('Reset Graph')
    expect(resetMenu.icon).toBe('pi pi-refresh')
  })
  it('VueFlow', () => {
    // Initialize VueFlow
    const flows = useMultiFlows()
    const flow = useVueFlow(flows.current.toString())
    expect(flow.getNodes.value).toStrictEqual([])
    expect(flow.getEdges.value).toStrictEqual([])
    // Add nodes to VueFlow
    flow.addNodes([
      {
        id: '1',
        type: 'input',
        position: { x: 250, y: 0 }
      },
      {
        id: '2',
        type: 'output',
        position: { x: 100, y: 100 }
      }
    ])
    expect(flow.getNodes.value.length).toBe(2)
    // Add edges to VueFlow
    flow.addEdges([
      {
        id: 'e1->2',
        source: '1',
        target: '2'
      }
    ])
    expect(flow.getEdges.value.length).toBe(1)
    // Create new file to reset Vueflow
    const { resetMenu } = useResetFlow()
    resetMenu.command()
    expect(flow.getNodes.value).toStrictEqual([])
    expect(flow.getEdges.value).toStrictEqual([])
  })
})
