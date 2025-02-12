import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'

export const useResetFlow = () => {
  const flows = useMultiFlows()

  function reset(): void {
    const flow = useVueFlow(flows.current.toString())
    flow.removeEdges(flow.getEdges.value.map((edge) => edge.id))
    flow.removeNodes(flow.getNodes.value.map((node) => node.id))
    flow.zoomTo(1)
  }

  const resetMenu = {
    label: 'Reset Graph',
    icon: 'pi pi-refresh',
    command: reset
  }

  return {
    resetMenu
  }
}
