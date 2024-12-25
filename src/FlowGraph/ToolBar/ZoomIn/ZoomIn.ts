import { useVueFlow } from '@vue-flow/core'
import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'

export default {
  label: 'Zoom In',
  icon: 'pi pi-search-plus',
  command: () => {
    const flows = useMultiFlows()
    const flow = useVueFlow(flows.current.toString())
    flow.zoomIn()
  }
}
