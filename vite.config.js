import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import htmlTemplate from "vite-plugin-html-template";
import EnvironmentPlugin from "vite-plugin-environment";
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      store: "/src/store",
    },
  },
  plugins: [
    vue(),
    /*由于我们需要同时支持 Webpack 和 Vite，在处理我们最终输出的 html 的时候(SPA 应用总会有一个出口 html)
        我们需要让 Vite 与 Webpack 保持一致，做代码上的兼容，这个插件帮我们完成了这件事情。*/
    htmlTemplate(),
    /*在某一次 Vite 的迭代中环境变量process变成了import.meta但 Webpack 上还是用的process，
        与 html 一样我们需要做一个兼容，让 Webpack 和 Vite 都可以运行，这个插件可以帮我们做这件事情：*/
    EnvironmentPlugin("all", { prefix: "VUE_APP_" }),
    AutoImport({
      imports: ["vue", "vue-router"],
      eslintrc: {
        enabled: true,
      },
      dts: "./src/types/auto-imports.d.ts",
    }),
  ],
});
