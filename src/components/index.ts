import type { App } from "vue";
import { SvgIcon } from "./SvgIcon";

// 全局组件
export const setupGlobCom = (app: App<Element>) => {
  app.component("SvgIcon", SvgIcon);
};
