import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia 持久化参数配置
 * @param {string} key - 存储到持久化的 name
 * @param {Array<string>} paths - 需要持久化的模块
 * @return persist
 */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    paths
  };
  return persist;
};

export default piniaPersistConfig;
