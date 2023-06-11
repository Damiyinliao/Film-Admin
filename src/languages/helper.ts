// 设置 html 标签的 lang 属性
export const setHtmlPageLang = (locale: LocaleType) => {
  document.querySelector("html")?.setAttribute("lang", locale);
};
