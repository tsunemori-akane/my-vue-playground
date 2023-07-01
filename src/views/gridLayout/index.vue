<template>
  <section class="layout-grid1">
    <div v-for="item in list" :key="item.id" class="block"></div>
  </section>
  <section class="layout-grid2">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item item-4">4</div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const list = ref([
  {id:1},
  {id:2},
  {id:3},
  {id:4},
  {id:5},
  {id:6},
  {id:7},
])
</script>
<style scoped lang="scss">
section {
  border: 2px solid #a77;
}
.layout-grid1 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  .block {
    border: 2px solid rgb(125, 54, 232);
    height: 50px;
  }
}

.layout-grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, minmax(auto, 1fr));
  gap: 10px;
  background-color: #f2f2f2;
  padding:10px;

  .grid-item {
    background-color: #fff;
    border: 1px solid #e234f3;
    color:black;
    padding: 20px;
    font-size: 30px;
    text-align: center;
  }
  .item-4 {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
  }
}
</style>