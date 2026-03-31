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
    assetsInlineLimit: 0,
    sourcemap: "hidden",
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        preserveModules: true,
      },
    },
  },
});
