import type { UserConfig } from "vite";
// https://vitejs.dev/config/
export default <UserConfig>{
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
  base: "/globe/"
};
