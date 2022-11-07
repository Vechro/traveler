import minifyHTML from "rollup-plugin-html-literals";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    build: {
      rollupOptions: {
        input: "./index.html",
      },
    },
    base: "/",
    plugins: command === "build" ? [minifyHTML()] : [],
  };
});
