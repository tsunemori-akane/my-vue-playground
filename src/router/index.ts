// src/router/index.ts
import {
  createRouter,
  createWebHashHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      title: "首页",
      hideMenu: true,
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/jsxTable",
    name: "jsxTable",
    component: () => import("@/views/jsxTableDemo/index.vue"),
    meta: {
      title: "jsxTable",
    },
  },
  {
    path: "/gridLayout",
    name: "gridLayout",
    component: () => import("@/views/gridLayout/index.vue"),
    meta: {
      title: "gridLayout",
    },
  },
  {
    path: "/tree-chart",
    name: "treeChart",
    component: () => import("@/views/tree-chart/index.vue"),
    meta: {
      title: "tree-chart",
    },
  },
];

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes,
};

const router: Router = createRouter(options);

export default router;
