import type { App } from "vue";
import { createI18n } from "vue-i18n";
import { useLocaleStoreWithOut } from "@/stores/modules/locale";
import type { I18n, I18nOptions } from "vue-i18n";
import { setHtmlPageLang } from "./helper";

// 语言包
export let i18n: ReturnType<typeof createI18n>;

// 初始化国际化
const createI18Options = async (): Promise<I18nOptions> => {
  const localeStore = useLocaleStoreWithOut(); // 获取语言包
  const locale = localeStore.getCurrentLocale; // 获取当前语言
  const localeMap = localeStore.getLocaleMap; // 获取语言包列表
  const defaultLocal = await import(`./modules/${locale.lang}.ts`); // 导入语言包
  const message = defaultLocal.default?.message; // 获取语言包内容

  setHtmlPageLang(locale.lang); // 设置 html 标签的 lang 属性

  localeStore.setCurrentLocale({
    lang: locale.lang
  });

  return {
    legacy: false,
    locale: locale.lang, // 默认显示的语言
    fallbackLocale: locale.lang, // 当找不到对应的语言包时，使用的语言
    messages: {
      [locale.lang]: message // 语言包
    },
    availableLocales: localeMap.map((item) => item.lang), // 可用的语言包
    sync: true, // 如果当前语言不存在，则使用默认语言
    silentTranslationWarn: true, // 关闭警告
    missingWarn: false, // 关闭警告
    silentFallbackWarn: true // 关闭警告
  };
};

export const setupI18n = async (app: App) => {
  const options = await createI18Options(); // 获取国际化配置
  i18n = createI18n(options) as I18n; // 创建国际化实例
  app.use(i18n); // 挂载国际化实例
};
