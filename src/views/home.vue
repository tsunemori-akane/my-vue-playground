<template>
  <div class="home">
    <test/>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, unref, computed, onUpdated } from 'vue';
import useDanmu from "@/hooks/useDamnu/useDanmu";
import test from "./test.vue"

onMounted(() => {
  console.log("mounted")
  handleUseDanmu()
})
onUpdated(() => {
  console.log("updated")
  handleUseDanmu()
})

const handleUseDanmu = () => {
  useDanmu(".home", computed(() => unref([
    // {
    //   Message: "nihaoxuanyi",
    //   BarrageSeq: 0,
    //   Id: 1
    // },
    // {
    //   Message: "nihaoxuanyi",
    //   BarrageSeq: 1,
    //   Id: 2
    // },
  ])), {tracks: 5})
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  position: relative;
}
.loader {
    margin: auto;
    border: 16px solid #bdc3c7;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    animation: coloredspin 4s linear infinite;
}
 
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>