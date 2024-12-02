import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAutolayout } from './AutoLayout'
import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlows'

const app = createApp({})
app.use(createPinia())

describe.concurrent('AutoLayout.ts', () => {
  it('Valid', () => {
    expect(useAutolayout).toBeTruthy()
    const { autolayoutMenu } = useAutolayout()
    expect(Object.keys(autolayoutMenu)).toStrictEqual(['label', 'icon', 'items'])
    expect(autolayoutMenu.label).toBe('Auto Layout')
    expect(autolayoutMenu.icon).toBe('pi pi-objects-column')
    expect(autolayoutMenu.items.length).toBe(4)
    for (const item of autolayoutMenu.items) {
      expect(Object.keys(item)).toStrictEqual(['label', 'command'])
    }
    expect(autolayoutMenu.items[0].label).toBe('Left => Right')
    expect(autolayoutMenu.items[1].label).toBe('Right => Left')
    expect(autolayoutMenu.items[2].label).toBe('Top => Bottom')
    expect(autolayoutMenu.items[3].label).toBe('Bottom => Top')
  })
  it('VueFlow', () => {
    // Initialize VueFlow
    const flows = useMultiFlows()
    const flow = useVueFlow(flows.current.toString())
    expect(flow.getNodes.value).toStrictEqual([])
    expect(flow.getEdges.value).toStrictEqual([])
    // Add nodes to VueFlow
    const initNodes = [
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
    ]
    flow.addNodes(initNodes)
    expect(flow.getNodes.value.length).toBe(2)
    // Add edges to VueFlow
    const initEdges = [
      {
        id: 'e1->2',
        source: '1',
        target: '2'
      }
    ]
    flow.addEdges(initEdges)
    expect(flow.getEdges.value.length).toBe(1)
    // Auto layout: left => right
    const { autolayoutMenu } = useAutolayout()
    autolayoutMenu.items[0].command()
    expect(flow.getNodes.value.length).toBe(2)
    const LR = JSON.parse(JSON.stringify(flow.getNodes.value))
    for (let num = 0; num < 2; num++) {
      expect(LR[num].id).toBe(initNodes[num].id)
      expect(LR[num].type).toBe(initNodes[num].type)
      expect(LR[num].position.x).not.toBe(initNodes[num].position.x)
      expect(LR[num].position.y).not.toBe(initNodes[num].position.y)
    }
    // Auto layout: right => left
    autolayoutMenu.items[1].command()
    expect(flow.getNodes.value.length).toBe(2)
    const RL = JSON.parse(JSON.stringify(flow.getNodes.value))
    for (let num = 0; num < 2; num++) {
      expect(RL[num].id).toBe(initNodes[num].id)
      expect(RL[num].type).toBe(initNodes[num].type)
      expect(RL[num].position.x).not.toBe(initNodes[num].position.x)
      expect(RL[num].position.y).not.toBe(initNodes[num].position.y)
      expect(RL[num].position.x).not.toBe(LR[num].position.x)
      expect(RL[num].position.y).toBe(LR[num].position.y)
    }
    // Auto layout: top => botom
    autolayoutMenu.items[2].command()
    expect(flow.getNodes.value.length).toBe(2)
    const TB = JSON.parse(JSON.stringify(flow.getNodes.value))
    for (let num = 0; num < 2; num++) {
      expect(TB[num].id).toBe(initNodes[num].id)
      expect(TB[num].type).toBe(initNodes[num].type)
      expect(TB[num].position.x).not.toBe(initNodes[num].position.x)
      expect(TB[num].position.y).not.toBe(initNodes[num].position.y)
      if (num === 0) {
        expect(TB[num].position.x).toBe(LR[num].position.x)
        expect(TB[num].position.y).toBe(LR[num].position.y)
        expect(TB[num].position.x).not.toBe(RL[num].position.x)
        expect(TB[num].position.y).toBe(RL[num].position.y)
      } else {
        expect(TB[num].position.x).not.toBe(LR[num].position.x)
        expect(TB[num].position.y).not.toBe(LR[num].position.y)
        expect(TB[num].position.x).toBe(RL[num].position.x)
        expect(TB[num].position.y).not.toBe(RL[num].position.y)
      }
    }
    // Auto layout: bottom => top
    autolayoutMenu.items[3].command()
    expect(flow.getNodes.value.length).toBe(2)
    const BT = JSON.parse(JSON.stringify(flow.getNodes.value))
    for (let num = 0; num < 2; num++) {
      expect(BT[num].id).toBe(initNodes[num].id)
      expect(BT[num].type).toBe(initNodes[num].type)
      expect(BT[num].position.x).not.toBe(initNodes[num].position.x)
      expect(BT[num].position.y).not.toBe(initNodes[num].position.y)
      if (num === 0) {
        expect(BT[num].position.x).toBe(LR[num].position.x)
        expect(BT[num].position.y).not.toBe(LR[num].position.y)
        expect(BT[num].position.x).not.toBe(RL[num].position.x)
        expect(BT[num].position.y).not.toBe(RL[num].position.y)
        expect(BT[num].position.x).toBe(TB[num].position.x)
        expect(BT[num].position.y).not.toBe(TB[num].position.y)
      } else {
        expect(BT[num].position.x).not.toBe(LR[num].position.x)
        expect(BT[num].position.y).toBe(LR[num].position.y)
        expect(BT[num].position.x).toBe(RL[num].position.x)
        expect(BT[num].position.y).toBe(RL[num].position.y)
        expect(BT[num].position.x).toBe(TB[num].position.x)
        expect(BT[num].position.y).not.toBe(TB[num].position.y)
      }
    }
  })
})
