import lit from "@astrojs/lit";
import node from "@astrojs/node";
import { defineConfig } from "astro/config";
import minifyHTML from "rollup-plugin-html-literals";

// https://astro.build/config
export default defineConfig({
  integrations: [lit()],
  vite: {
    envDir: "../../",
    plugins: [minifyHTML()],
    resolve: {
      // <model-viewer> depends on three.js as well
      dedupe: ["three"],
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
