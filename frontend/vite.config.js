import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		tailwindcss(),
	],
	build: {
		cssCodeSplit: true,
		sourcemap: 'hidden',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('react-router') || id.includes('@remix-run/router')) return 'router';
					if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) return 'react-vendor';
					if (id.includes('i18next')) return 'i18n';
				}
			}
		}
	}
});