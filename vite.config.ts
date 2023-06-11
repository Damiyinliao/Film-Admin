import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
import { wrapperEnv } from "./build/getEnv";
import { createVitePlugins } from "./build/plugins";
import { createProxy } from "./build/proxy";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(); // 项目根目录
  const env = loadEnv(mode, root); // 环境变量
  const viteEnv = wrapperEnv(env);
  return {
    base: env.VITE_BASE_URL, // 部署时的路径
    root, // 项目根目录
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 设置别名
        "~": resolve(__dirname, "public") // 设置别名
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";` // 全局引入
        }
      }
    },
    server: {
      host: "0.0.0.0", // 设置服务器启动的 IP
      port: viteEnv.VITE_PORT, // 设置服务器启动的端口号
      open: viteEnv.VITE_OPEN, // 设置服务器启动时是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: createProxy(viteEnv.VITE_PROXY) // 设置代理
    },
    plugins: createVitePlugins(viteEnv), // 插件
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [] // 去除console.log
    },
    build: {
      outDir: "dist", // 打包输出目录
      minify: "esbuild", // 压缩
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小界限，默认值是 500kb
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js", // 非入口 chunk 的文件名
          entryFileNames: "assets/js/[name]-[hash].js", // 非入口 chunk 的文件名
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]" // 静态资源的文件名
        }
      }
    }
  };
});
