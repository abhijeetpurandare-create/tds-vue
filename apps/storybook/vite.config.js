import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// When Storybook runs, it merges this config; federation breaks Rollup (parse error on HTML).
// Skip federation when STORYBOOK=true (set in package.json scripts) or when Vite mode is "storybook".
const isStorybook =
  process.env.STORYBOOK === "true" ||
  process.env.npm_lifecycle_event === "storybook" ||
  process.env.npm_lifecycle_event === "build-storybook";

export default defineConfig({
  plugins: [
    react(),
    ...(isStorybook
      ? []
      : [
          federation({
            name: "host-app",
            remotes: {
              "component-library":
                "https://v3.delhivery.com/Orca18-molecules/assets/remoteEntry.js",
            },
            shared: {
              react: { singleton: true, eager: true },
              "react-dom": { singleton: true, eager: true },
            },
          }),
        ]),
  ],
  build: {
    target: "esnext",
  },
});
