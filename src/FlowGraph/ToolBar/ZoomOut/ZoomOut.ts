import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'

export default {
  label: 'Zoom Out',
  icon: 'pi pi-search-minus',
  command: () => {
    const flows = useMultiFlows()
    const flow = useVueFlow(flows.current.toString())
    flow.zoomOut()
  }
}
