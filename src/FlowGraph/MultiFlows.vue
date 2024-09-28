<template>
  <Tabs value="flow-0">
    <TabList>
      <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
        <FlowGraph class="graph" />
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

// Setup tabs
import { ref } from 'vue'
const tabs = ref([{ title: 'flow-0', content: 'Tab 1 Content', value: 'flow-0' }])
</script>

<style scoped>
.graph {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: calc(100vh - 130px);
}
</style>
