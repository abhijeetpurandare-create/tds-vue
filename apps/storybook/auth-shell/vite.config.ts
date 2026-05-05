import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/storybook/",
  plugins: [react()],
  envDir: "./env",
  server: {
    port: 4200,
  },
  build: {
    outDir: "dist",
  },
});
