import { describe, expect, it } from 'vitest'
import { useNewfile } from './NewFile'
import { useVueFlow } from '@vue-flow/core'

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
    const flow = useVueFlow('FlowGraph')
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
    const { newfileMenu } = useNewfile()
    newfileMenu.command()
    expect(flow.getNodes.value).toStrictEqual([])
    expect(flow.getEdges.value).toStrictEqual([])
  })
})
