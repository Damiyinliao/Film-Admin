import { defineStore } from "pinia";
import { store } from "../index";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { CACHE_KEY, useCache } from "@/hooks/web/useCache";
import { LocaleDropdownType } from "@/types/localeDropdown";
import piniaPersistConfig from "@/config/piniaPersist";

const { wsCache } = useCache();
// 默认语言
const elLocaleMap = {
  "zh-CN": zhCn,
  en: en
};
// 多语言
interface LocaleState {
  currentLocale: LocaleDropdownType;
  localeMap: LocaleDropdownType[];
}
//
export const useLocaleStore = defineStore({
  id: "locale",
  state: (): LocaleState => {
    return {
      currentLocale: {
        lang: wsCache.get(CACHE_KEY.LANG) || "zh-CN"
        // elLocale: elLocaleMap[wsCache.get(CACHE_KEY.LANG) || "zh-CN"]
      },
      // 多语言
      localeMap: [
        {
          lang: "zh-CN",
          name: "简体中文"
        },
        {
          lang: "en",
          name: "English"
        }
      ]
    };
  },
  getters: {
    //
    getCurrentLocale(): LocaleDropdownType {
      return this.currentLocale;
    },
    //
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap;
    }
  },
  actions: {
    setCurrentLocale(localeMap: LocaleDropdownType) {
      this.currentLocale.lang = localeMap.lang;
      this.currentLocale.elLocale = elLocaleMap[localeMap.lang];
      wsCache.set(CACHE_KEY.LANG, localeMap.lang);
    }
  },
  persist: piniaPersistConfig("exam-locale")
});
// Need to be used outside the setup
export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store);
};
