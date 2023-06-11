import { resolve } from "path";
import { PluginOption } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import eslintPlugin from "vite-plugin-eslint";
import viteCompression from "vite-plugin-compression";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
import progress from "vite-plugin-progress";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import PurgeIcons from "vite-plugin-purge-icons";
/**
 * 创建 vite 插件
 * @param viteEnv 环境变量
 */
export const createVitePlugins = (viteEnv: ViteEnv): PluginOption[] => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;
  return [
    vue(),
    // Vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // 显示打包进度
    progress(),
    // 移除未使用的 icon
    PurgeIcons(),
    // esLint 报错信息显示在浏览器界面上
    // eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 创建打包压缩配置
    // createCompression(viteEnv),
    // 将变量注入到 html 文件
    createHtmlPlugin({
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        "vue",
        "vue-router",
        // 可额外添加需要 autoImport 的组件
        {
          "@/hooks/web/useI18n": ["useI18n"],
          "@/hooks/web/useMessage": ["useMessage"],
          "@/hooks/web/useTable": ["useTable"],
          "@/hooks/web/useCrudSchemas": ["useCrudSchemas"],
          "@/utils/formRules": ["required"],
          "@/utils/dict": ["DICT_TYPE"]
        }
      ],
      dts: "src/types/auto-imports.d.ts",
      resolvers: [ElementPlusResolver()]
    }),
    // 自动导入组件
    Components({
      // 要搜索组件的目录的相对路径
      dirs: ["src/components"],
      // 组件的有效文件扩展名
      extensions: ["vue", "md"],
      // 搜索子目录
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/],
      // 生成自定义 `auto-components.d.ts` 全局声明
      dts: "src/types/auto-components.d.ts",
      // 自定义组件的解析器
      resolvers: [ElementPlusResolver()],
      exclude: [/[\\/]node_modules[\\/]/]
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svgs")],
      symbolId: "icon-[dir]-[name]",
      svgoOptions: true
    }),
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用
      threshold: 10240, // 体积大于 threshold 才会被压缩,单位 b
      algorithm: "gzip", // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: ".gz", // 生成的压缩包后缀
      deleteOriginFile: false //压缩后是否删除源文件
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && visualizer({ filename: "starts.html", gzipSize: true, brotliSize: true })
  ];
};

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv 环境变量
 */
// const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
//   const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE = false } = viteEnv;
//   const compressList = VITE_BUILD_COMPRESS.split(",");
//   const plugins: PluginOption[] = [];

//   if (compressList.includes("gzip")) {
//     plugins.push(
//       viteCompression({
//         ext: ".gz",
//         algorithm: "gzip",
//         deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
//       })
//     );
//   }
//   if (compressList.includes("brotli")) {
//     plugins.push(
//       viteCompression({
//         ext: ".br",
//         algorithm: "brotliCompress",
//         deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
//       })
//     );
//   }
//   return plugins;
// };

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  return VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  });
};
