import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    sourcemap: "hidden",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react-dom")) return "react-dom";
          if (id.includes("react-router-dom")) return "router";
          if (id.includes("react")) return "react";
          if (id.includes("i18next")) return "i18n";
        },
      },
    },
  },
});
