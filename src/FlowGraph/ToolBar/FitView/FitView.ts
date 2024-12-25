import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'

export default {
  label: 'Fit View',
  icon: 'pi pi-window-maximize',
  command: () => {
    const flows = useMultiFlows()
    const flow = useVueFlow(flows.current.toString())
    flow.fitView()
  }
}
