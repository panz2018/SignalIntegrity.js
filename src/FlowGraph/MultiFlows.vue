<template>
  <Tabs v-model:value="current">
    <TabList>
      <Tab v-for="tab in tabs" :key="tab.flow" :value="tab.flow">
        <FlowTitle v-model="tab.title" :focused="current === tab.flow" />
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="tab in tabs" :key="tab.flow" :value="tab.flow">
        <FlowGraph :flow="tab.flow" class="graph" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import FlowGraph from './FlowGraph.vue'
import FlowTitle from './FlowTitle.vue'

// Setup tabs
import { storeToRefs } from 'pinia'
import { useMultiFlows } from './MultiFlows'
const { current, tabs } = storeToRefs(useMultiFlows())
</script>

<style scoped>
.graph {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: calc(100vh - 130px);
}
</style>
