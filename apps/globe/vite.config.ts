import minifyHTML from "rollup-plugin-html-literals";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    build: {
      rollupOptions: {
        // https://vitejs.dev/guide/build.html#multi-page-app
        input: "./index.html",
      },
    },
    base: "/",
    plugins: command === "build" ? [minifyHTML()] : [],
  };
});
