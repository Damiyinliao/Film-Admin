/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */
import WebStorageCache from "web-storage-cache";

type CacheType = "localStorage" | "sessionStorage";
// 本地存储的key
export const CACHE_KEY = {
  IS_DARK: "isDark",
  USER: "user",
  LANG: "lang",
  THEME: "theme",
  LAYOUT: "layout",
  ROLE_ROUTERS: "roleRouters",
  DICT_CACHE: "dictCache"
};
// 本地存储的过期时间
export const useCache = (type: CacheType = "localStorage") => {
  const wsCache: WebStorageCache = new WebStorageCache({
    storage: type
  });

  return {
    wsCache
  };
};
