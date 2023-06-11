<template>
  <!-- 组件 ConfigProvider 用于全局配置国际化的设置。 -->
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { LanguageType } from "./stores/interface";
import { useGlobalStore } from "@/stores/modules/global";
import { useTheme } from "@/hooks/web/useTheme";

const globalStore = useGlobalStore();

// 初始化主题
const { initTheme } = useTheme();
initTheme();

// 初始化语言
const i18n = useI18n();
onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState("language", language as LanguageType);
});

// 根据语言设置国际化
const locale = computed(() => {
  if (globalStore.language == "zh") return zhCn;
  if (globalStore.language == "en") return en;
  return getBrowserLang() == "zh" ? zhCn : en;
});
// 设置组件大小
const assemblySize = computed(() => globalStore.assemblySize);
// 设置按钮配置
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
