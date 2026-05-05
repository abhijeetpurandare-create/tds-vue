import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import {resolve} from "path";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [
    react(),
    federation({
      name: "molecules",
      filename: "remoteEntry.js",
      exposes: {
        "./Card": "./src/card",
        "./Footer": "./src/customerAppsFooter",
        "./Header": "./src/customerAppsHeader",
        "./AnimatedJumbotron": "./src/animatedJumbotron",
        "./marqueeBanner": "./src/marqueeBanner",
        "./BusinessPill": "./src/businessPill",
        "./OtpInput": "./src/otpInput",
      },
      shared: ["react", "react-dom"],
    }),
    tailwindcss(),
  ],
  css: {
    // Process CSS
    postcss: "./postcss.config.js",
    // Extract CSS to separate files
    extract: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "molecules",
      formats: ["es"],
      fileName: (format) => `molecules.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom" , "vue"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
           vue: "Vue"
        },
        // Ensure CSS is extracted to a separate file
        assetFileNames: "molecules.[ext]",
      },
    },
  },
});
