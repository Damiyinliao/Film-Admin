// ElLoading的配置项
import { ElLoading } from "element-plus";

// 全局请求 loading
let loadingInstance: ReturnType<typeof ElLoading.service>;

/**
 * @description: 开启全局loading
 */
const startLoading = () => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
};

/**
 * @description: 关闭全局loading
 */
const endLoading = () => {
  loadingInstance.close();
};

/**
 * @description: 显示全局loading加载动画
 */
let needLoadingRequestCount = 0; // 当前正在请求的数量
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

/**
 * @description: 隐藏全局loading加载动画
 */
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};
