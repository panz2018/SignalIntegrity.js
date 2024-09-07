import { useVueFlow } from '@vue-flow/core'
const flow = useVueFlow('FlowGraph')

export default {
  label: 'Zoom In',
  icon: 'pi pi-search-plus',
  command: flow.zoomIn
}
