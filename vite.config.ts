import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  base: "/portfolio",
  build: {
    cssCodeSplit: false,
  },
  server: {
    host: true,
    port: 3000
  },
  plugins: [vike({
    prerender: true
  }), react({})],
});
