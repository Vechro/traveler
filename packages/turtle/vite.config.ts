import minifyHTML from "rollup-plugin-html-literals";
import { defineConfig } from "vite";

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
    plugins: [minifyHTML()],
    server: {
      port: 5174,
      host: "0.0.0.0",
      watch: {
        usePolling: true,
      },
    },
  };
});
