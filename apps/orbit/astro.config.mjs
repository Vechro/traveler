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
