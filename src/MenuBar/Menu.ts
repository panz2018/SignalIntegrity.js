import { storeToRefs } from 'pinia'
import fitview from '@/FlowGraph/ToolBar/FitView/FitView'
import zoomin from '@/FlowGraph/ToolBar/ZoomIn/ZoomIn'
import zoomout from '@/FlowGraph/ToolBar/ZoomOut/ZoomOut'
import { useModificationStore } from '@/FlowGraph/ToolBar/Modification/Modification'
import { useToolbarStore } from '@/FlowGraph/ToolBar/ToolbarStore'
import { useNavigationStatus } from '@/FlowGraph/NavigationMap/NavigationStatus'

import { useToast } from 'primevue/usetoast'

export const useMenuStore = () => {
  const toast = useToast()
  const command = () => {
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
  const { navigation } = storeToRefs(useNavigationStatus())
  const menu = [
    {
      label: 'File',
      icon: 'pi pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-file-plus',
          command: command
        },
        {
          label: 'Export',
          icon: 'pi pi-camera',
          command: command
        }
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
        modification,
        {
          separator: true
        },
        ...toolbarMenu.value,
        {
          separator: true
        },
        navigation.value
      ]
    },
    {
      label: 'Calculate',
      icon: 'pi pi-calculator',
      items: [
        {
          label: 'S-parameter Viewer',
          icon: 'pi pi-th-large',
          command: command
        }
      ]
    }
  ]
  return menu
}
