import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@view": path.resolve(__dirname, "./src/view"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
  ],
});
