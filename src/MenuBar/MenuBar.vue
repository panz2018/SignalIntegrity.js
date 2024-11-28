<template>
  <PrimeMenu
    :model="menu"
    breakpoint="575px"
    :pt="{
      end: {
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }
    }"
  >
    <template #start>
      <MenuLogo />
    </template>
    <template #end>
      <AutoSave />
      <ThemeSwitcher />
    </template>
  </PrimeMenu>
</template>

<script setup lang="ts">
import PrimeMenu from 'primevue/menubar'
import MenuLogo from './MenuLogo/MenuLogo.vue'
import AutoSave from '@/FlowGraph/AutoSave/AutoSave.vue'
import ThemeSwitcher from './Theme/ThemeSwitcher.vue'

import { useMenuStore } from './MenuStore'
const menu = useMenuStore()
</script>

<style>
.pi-empty {
  width: var(--p-icon-size);
  height: var(--p-icon-size);
}
</style>
