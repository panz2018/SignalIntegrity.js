import { useMultiFlows } from '@/FlowGraph/MultiFlowsStore'

export const useNewfile = () => {
  const flows = useMultiFlows()

  function newFile(): void {
    flows.newFlow()
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
