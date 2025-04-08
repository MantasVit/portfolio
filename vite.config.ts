import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  base: "/portfolio",
  build: {
    cssCodeSplit: false,
  },
  plugins: [vike({
    prerender: true
  }), react({})],
});
