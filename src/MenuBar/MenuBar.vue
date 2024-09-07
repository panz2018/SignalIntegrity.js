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
import MenuLogo from '@/MenuBar/MenuLogo.vue'
import ThemeSwitcher from '@/MenuBar/ThemeSwitcher.vue'

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
import fitview from '@/FlowGraph/Controls/FitView/FitView'
import zoomin from '@/FlowGraph/Controls/ZoomIn/ZoomIn'
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
      {
        label: 'Zoom Out',
        icon: 'pi pi-minus',
        command: command
      }
    ]
  },
  {
    separator: true
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
