import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import jsxTable from "./components/jsxTable";

createApp(App).use(router).use(ElementPlus).use(jsxTable).mount("#app");
