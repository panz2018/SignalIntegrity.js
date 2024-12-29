import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useNewfile } from './NewFile'
import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'

const app = createApp({})
app.use(createPinia())

describe.concurrent('NewFile.ts', () => {
  it('Valid', () => {
    expect(useNewfile).toBeTruthy()
    const { newfileMenu } = useNewfile()
    expect(Object.keys(newfileMenu)).toStrictEqual(['label', 'icon', 'command'])
    expect(newfileMenu.label).toBe('New')
    expect(newfileMenu.icon).toBe('pi pi-file-plus')
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
    // Create new file
    const { newfileMenu } = useNewfile()
    newfileMenu.command()
    // Check previous flow graph
    expect(flow.getNodes.value.length).toBe(2)
    expect(flow.getEdges.value.length).toBe(1)
    expect(flow.id).not.toBe(flows.current.toString())
    // Check the new flow graph
    const newFlow = useVueFlow(flows.current.toString())
    expect(newFlow.id).toBe(flows.current.toString())
    expect(newFlow.getNodes.value).toStrictEqual([])
    expect(newFlow.getEdges.value).toStrictEqual([])
  })
})
