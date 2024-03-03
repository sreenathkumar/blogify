import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@icons": "/src/assets/icons",
      "@api": "/src/api",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@context": "/src/context",
      "@reducers": "/src/reducers",
      "@actions": "/src/actions",
    },
  },
});
