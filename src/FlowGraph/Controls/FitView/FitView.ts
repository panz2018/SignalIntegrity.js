import { useVueFlow } from '@vue-flow/core'
const flow = useVueFlow('FlowGraph')

export default {
  label: 'Fit View',
  icon: 'pi pi-window-maximize',
  command: flow.fitView
}
