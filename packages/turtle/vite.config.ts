import minifyHTML from "rollup-plugin-html-literals";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "Turtle",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
  plugins: [minifyHTML()],
});
