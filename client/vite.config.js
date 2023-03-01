import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    host: true,
    proxy: {
      "/api": {
        // target: "http://localhost:3001",
        target: "https://spotify-wrapped-plus.herokuapp.com/",
        changeOrigin: true,
      },
    },
  },
});
