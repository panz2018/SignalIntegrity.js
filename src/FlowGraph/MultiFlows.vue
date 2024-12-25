<template>
  <Tabs v-model:value="flows.current" scrollable>
    <TabList>
      <Tab v-for="key in Object.keys(flows.titles).map((d) => parseInt(d))" :key="key" :value="key">
        <FlowTitle v-model="flows.titles[key]" :flowID="key" :focused="flows.current === key" />
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel
        v-for="key in Object.keys(flows.titles).map((d) => parseInt(d))"
        :key="key"
        :value="key"
      >
        <FlowGraph :flowID="key" class="graph" />
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
import { useMultiFlows } from './MultiFlowsStore'
const flows = useMultiFlows()
</script>

<style scoped>
.graph {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: calc(100vh - 130px);
}
</style>
