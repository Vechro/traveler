import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";
import minifyHTML from "rollup-plugin-html-literals";

// https://astro.build/config
export default defineConfig({
  integrations: [lit()],
  vite: {
    plugins: [minifyHTML()],
  },
  server: {
    port: 5173
  }
});
