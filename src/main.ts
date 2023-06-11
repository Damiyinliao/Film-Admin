import { createApp } from "vue";
import App from "./App.vue";

// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark css
import "@/styles/theme/element-dark.scss";
// custom element css
import "@/styles/element.scss";

// element icons
import * as Icons from "@element-plus/icons-vue";
// 路由
import router, { setupRouter } from "@/routers";
// 初始化多语言
import { setupI18n } from "@/languages";
// 引入状态管理
import { setupStore } from "@/stores";
// 导入element-plus
import { setupElementPlus } from "@/plugins/elementPlus";
// 导入全局组件
import { setupGlobCom } from "@/components";
// 创建实例
const setupAll = async () => {
  const app = createApp(App);

  await setupI18n(app);

  setupStore(app);

  setupGlobCom(app);

  setupElementPlus(app);

  // setupFormCreate(app);

  // register the element Icons component
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });

  setupRouter(app);

  // setupAuth(app);

  await router.isReady();

  app.mount("#app");
};

setupAll();
