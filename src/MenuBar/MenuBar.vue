<template>
  <PrimeMenu :model="items" breakpoint="450px"></PrimeMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PrimeMenu from 'primevue/menubar'

import { useToast } from 'primevue/usetoast'
const toast = useToast()

const items = ref([
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          toast.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 })
        }
      },
      {
        label: 'Print',
        icon: 'pi pi-print',
        command: () => {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No printer connected',
            life: 3000
          })
        }
      }
    ]
  },
  {
    label: 'Search',
    icon: 'pi pi-search',
    command: () => {
      toast.add({
        severity: 'warn',
        summary: 'Search Results',
        detail: 'No results found',
        life: 3000
      })
    }
  },
  {
    separator: true
  },
  {
    label: 'Sync',
    icon: 'pi pi-cloud',
    items: [
      {
        label: 'Import',
        icon: 'pi pi-cloud-download',
        command: () => {
          toast.add({
            severity: 'info',
            summary: 'Downloads',
            detail: 'Downloaded from cloud',
            life: 3000
          })
        }
      },
      {
        label: 'Export',
        icon: 'pi pi-cloud-upload',
        command: () => {
          toast.add({
            severity: 'info',
            summary: 'Shared',
            detail: 'Exported to cloud',
            life: 3000
          })
        }
      }
    ]
  }
])
</script>
