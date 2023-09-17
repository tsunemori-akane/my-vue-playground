<template>
  <vue-tree style="width: 800px; height: 400px; border: 1px solid gray;" :dataset="vehicules" :config="treeConfig"
    linkStyle="straight" :collapseEnabled="false" horizonalMove>
    <template v-slot:node="{ node, collapsed }">
      <el-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-avatar>
          <span style="color:black">{{ node.name }}</span>
        </el-avatar>
      </template>
      <template #default>
        <div
          class="demo-rich-conent"
          style="display: flex; gap: 16px; flex-direction: column"
        >
          <el-avatar
            :size="60"
            style="margin-bottom: 8px"
          />
          <div>
            <p
              class="demo-rich-content__name"
              style="margin: 0; font-weight: 500"
            >
              Element Plus
            </p>
            <p
              class="demo-rich-content__mention"
              style="margin: 0; font-size: 14px; color: var(--el-color-info)"
            >
              @element-plus
            </p>
          </div>

          <p class="demo-rich-content__desc" style="margin: 0">
            Element Plus, a Vue 3 based component library for developers,
            designers and product managers
          </p>
        </div>
      </template>
    </el-popover>
    </template>
  </vue-tree>
</template>

<script setup lang="ts">
// import VueTree from "@ssthouse/vue3-tree-chart";
// import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";

import VueTree from "@/components/tree-chart/index.vue"
import  "@/components/tree-chart/style.css"

const vehicules = {
  name: 'Wheels',
  children: [
    {
      name: 'Wings',
      children: [
        {
          name: 'Plane'
        }
      ]
    },
    {
      name: 'Piston',
      customID: 3
    },
    {
      name: 'Carburetor',
      children: [
        {
          name: 'Truck',
          customID: 2
        },
        {
          name: 'Car',
          customID: 2
        }
      ]
    },
    {
      name: 'Valve',
      customID: 4
    },
    {
      name: 'Crankshaft',
      customID: 1
    }
  ],
  // links: [
  //   { parent: 1, child: 2 },
  //   { parent: 3, child: 2 },
  //   { parent: 4, child: 2 }
  // ],
  identifier: 'customID'
}
const treeConfig = { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
</script>

<style scoped lang="scss">
.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
</style>