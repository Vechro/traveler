import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";
import minifyHTML from "rollup-plugin-html-literals";

// https://astro.build/config
export default defineConfig({
  integrations: [lit()],
  vite: {
    resolve: {
      // <model-viewer> depends on three.js as well
      dedupe: ["three"],
    },
    plugins: [minifyHTML()],
  },
  server: {
    host: true,
    port: 5173,
  },
});
