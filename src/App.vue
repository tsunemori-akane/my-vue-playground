<script setup lang="ts">
import { routes } from "@/router"
import { transformRouteToMenu } from "@/utils/handleRoutes";
import type { AppRouteRecordRaw } from "@/types/route-type"
import { pipe } from "@/utils/my-utils";
import { useRoute } from "vue-router";
const route = useRoute();

const menuFilter = (items: AppRouteRecordRaw[]) => {
  return items.filter((item) => {
    const show = !item.meta?.hideMenu && !item.hideMenu;
    if (show && item.children) {
      item.children = menuFilter(item.children)
    }
    return show;
  })
}
const menuList = pipe(transformRouteToMenu, menuFilter)(routes as AppRouteRecordRaw[])

</script>

<template>
  <el-container>
    <el-aside>
      <el-menu router :default-active="route.path">
        <el-menu-item v-for="item in menuList" :index="item.path">
          <span>{{ item.meta.title || item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scope lang="scss">
.el-container {
  height: 100%;

  .el-aside {
    background-color: #fff;
    width: 150px;
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>

