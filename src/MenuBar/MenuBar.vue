<template>
  <PrimeMenu :model="items" breakpoint="480px">
    <template #start>
      <MenuLogo />
    </template>
    <template #end>
      <ThemeSwitcher />
    </template>
  </PrimeMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PrimeMenu from 'primevue/menubar'
import MenuLogo from './MenuLogo/MenuLogo.vue'
import ThemeSwitcher from './Theme/ThemeSwitcher.vue'

import { useToast } from 'primevue/usetoast'
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
import fitview from '@/FlowGraph/ToolBar/FitView/FitView'
import zoomin from '@/FlowGraph/ToolBar/ZoomIn/ZoomIn'
import zoomout from '@/FlowGraph/ToolBar/ZoomOut/ZoomOut'
import { useModificationStore } from '@/FlowGraph/ToolBar/Modification/Modification'
const modification = useModificationStore()
import { storeToRefs } from 'pinia'
import { useToolbarStatus } from '@/FlowGraph/ToolBar/ToolbarStatus'
const { toolbar } = storeToRefs(useToolbarStatus())
import { useNavigationStatus } from '@/FlowGraph/NavigationMap/NavigationStatus'
const { navigation } = storeToRefs(useNavigationStatus())
const items = ref([
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
      toolbar.value,
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
])
</script>
