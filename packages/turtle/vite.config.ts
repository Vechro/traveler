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
    plugins: [minifyHTML()],
  };
});
