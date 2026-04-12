// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

const site = process.env.SITE_URL;
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  integrations: [react({ jsxRuntime: 'classic' })],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react/jsx-dev-runtime', 'react/jsx-runtime']
    }
  },
});
