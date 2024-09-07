import { useVueFlow } from '@vue-flow/core'
const flow = useVueFlow('FlowGraph')

export default {
  label: 'Zoom Out',
  icon: 'pi pi-search-minus',
  command: flow.zoomOut
}
