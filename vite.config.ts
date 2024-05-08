import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/oz_02_collabo-005/",
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://118.67.135.218",
        changeOrigin: true,
      },
    },
  },
});
