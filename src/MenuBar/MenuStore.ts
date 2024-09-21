import { storeToRefs } from 'pinia'
import fitview from '@/FlowGraph/ToolBar/FitView/FitView'
import zoomin from '@/FlowGraph/ToolBar/ZoomIn/ZoomIn'
import zoomout from '@/FlowGraph/ToolBar/ZoomOut/ZoomOut'
import AddNode from '@/FlowGraph/AddNode/AddNode'
import { useModificationStore } from '@/FlowGraph/ToolBar/Modification/Modification'
import { useToolbarStore } from '@/FlowGraph/ToolBar/ToolbarStore'
import { useNavigationStore } from '@/FlowGraph/NavigationMap/NavigationStore'
import { useAutolayout } from '@/FlowGraph/AutoLayout/AutoLayout'
import { useNewfile } from '@/FlowGraph/NewFile/NewFile'

import { useToast } from 'primevue/usetoast'

export const useMenuStore = () => {
  const toast = useToast()
  const warning = () => {
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Under construction',
      life: 3000
    })
  }

  // Menu items
  const modification = useModificationStore()
  const { toolbarMenu } = storeToRefs(useToolbarStore())
  const { navigationMenu } = storeToRefs(useNavigationStore())
  const { autolayoutMenu } = useAutolayout()
  const { newfileMenu } = useNewfile()
  const menu = [
    {
      label: 'File',
      icon: 'pi pi-file',
      items: [
        newfileMenu,
        {
          label: 'Export',
          icon: 'pi pi-camera',
          command: warning
        }
      ]
    },
    {
      label: 'Edit',
      icon: 'pi pi-pen-to-square',
      items: [
        AddNode,
        {
          separator: true
        },
        autolayoutMenu
      ]
    },
    {
      label: 'View',
      icon: 'pi pi-eye',
      items: [
        fitview,
        zoomin,
        zoomout,
        {
          separator: true
        },
        ...toolbarMenu.value,
        {
          separator: true
        },
        ...navigationMenu.value,
        {
          separator: true
        },
        modification
      ]
    },
    {
      label: 'Calculate',
      icon: 'pi pi-calculator',
      items: [
        {
          label: 'S-parameter Viewer',
          icon: 'pi pi-th-large',
          command: warning
        }
      ]
    }
  ]
  return menu
}
