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
    port: 5173,
    proxy: {
      "/api": {
        // target: "http://localhost:3001",
        target: "http://www.wrappedplus.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
