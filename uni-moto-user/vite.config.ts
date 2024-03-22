import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        // 配置全局sass变量注入
        additionalData: '@import "@/common/app.scss";',
      },
    },
  },
});
