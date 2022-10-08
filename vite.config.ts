import { defineConfig } from "vite";
import vitePluginString from "vite-plugin-string";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
  base: "/globe/",
  // @ts-ignore-error https://stackoverflow.com/questions/70824882/vitepluginstring-is-not-a-function
  plugins: [vitePluginString.default()],
});
