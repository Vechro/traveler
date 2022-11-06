import minifyHTML from "rollup-plugin-html-literals";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: "src/index.ts",
        name: "Turtle",
        formats: ["es"],
      },
    },
    base: "/",
    plugins: [minifyHTML(), dts({
      outputDir: "./dist/types",
    })],
    server: {
      port: 5174,
      host: "0.0.0.0",
      watch: {
        usePolling: true,
      },
    },
  };
});
