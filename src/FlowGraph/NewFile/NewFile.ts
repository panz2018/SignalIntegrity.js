import { useMultiFlows } from '@/FlowGraph/MultiFlows'

export const useNewfile = () => {
  const flows = useMultiFlows()

  function newFile(): void {
    flows.addTab()
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
