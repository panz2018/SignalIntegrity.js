import { useVueFlow } from '@vue-flow/core'

export const useNewfile = () => {
  const flow = useVueFlow('FlowGraph')

  function newFile(): void {
    flow.removeEdges(flow.getEdges.value.map((edge) => edge.id))
    flow.removeNodes(flow.getNodes.value.map((node) => node.id))
    flow.zoomTo(1)
  }

  const newfileMenu = {
    label: 'New',
    icon: 'pi pi-file-plus',
    command: newFile
  }

  return {
    newfileMenu
  }
}
