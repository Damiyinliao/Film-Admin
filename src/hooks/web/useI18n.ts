import { i18n } from "@/languages";

type I18nGlobalTransition = {
  (key: string): string; // 重载
  (key: string, locale: string): string; // 重载
  (key: string, locale: string, list: unknown[]): string; // 重载
  (key: string, locale: string, named: Record<string, unknown>): string; // 重载
  (key: string, list: unknown[]): string; // 重载
  (key: string, named: Record<string, unknown>): string; // 重载
};

type I18nTranslationRestParameters = Parameters<I18nGlobalTransition>;

//  获取key
const getKey = (namespace: string | undefined, key: string) => {
  if (!namespace) return key;
  if (key.startsWith(namespace)) return key;
  return `${namespace}.${key}`;
};
//  获取i18n
export const useI18n = (namespace?: string): { t: I18nGlobalTransition } => {
  const normalFn = {
    t: (key: string) => getKey(namespace, key)
  };
  if (!i18n) return normalFn;
  const { t, ...methods } = i18n.global;
  const tFn: I18nGlobalTransition = (key: string, ...args: any[]) => {
    if (!key) return "";
    if (!key.includes(".") && !namespace) return key;
    //@ts-expect-error
    return t(getKey(namespace, key), ...(args as I18nTranslationRestParameters));
  };
  return {
    ...methods,
    t: tFn
  };
};

export const t = (key: string) => key;
