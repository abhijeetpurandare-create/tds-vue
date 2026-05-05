// atoms/vite.config.ts
/// <reference types="vitest" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import {resolve} from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }) as any,
    tailwindcss(),
  ],
  build: {
    target: "es2022",
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        'Map': resolve(__dirname, "src/components/Map/index.tsx"),
        'MapPopup': resolve(__dirname, "src/components/Map/MapPopup.tsx"),
        'MapMarker': resolve(__dirname, "src/components/Map/MapMarker.tsx"),
        'AudioPlayer': resolve(__dirname, "src/components/AudioPlayer/index.tsx"),
        'hooks/useBoolean': resolve(__dirname, "src/hooks/useBoolean.ts"),
        'hooks/useClickAnyWhere': resolve(__dirname, "src/hooks/useClickAnyWhere.ts"),
        'hooks/useCopyToClipboard': resolve(__dirname, "src/hooks/useCopyToClipboard.ts"),
        'hooks/useCountdown': resolve(__dirname, "src/hooks/useCountdown.ts"),
        'hooks/useCounter': resolve(__dirname, "src/hooks/useCounter.ts"),
        'hooks/useDarkMode': resolve(__dirname, "src/hooks/useDarkMode.ts"),
        'hooks/useDebounceCallback': resolve(__dirname, "src/hooks/useDebounceCallback.ts"),
        'hooks/useDebounceValue': resolve(__dirname, "src/hooks/useDebounceValue.ts"),
        'hooks/useDocumentTitle': resolve(__dirname, "src/hooks/useDocumentTitle.ts"),
        'hooks/useEventCallback': resolve(__dirname, "src/hooks/useEventCallback.ts"),
        'hooks/useEventListener': resolve(__dirname, "src/hooks/useEventListener.ts"),
        'hooks/useHover': resolve(__dirname, "src/hooks/useHover.ts"),
        'hooks/useIntersectionObserver': resolve(__dirname, "src/hooks/useIntersectionObserver.ts"),
        'hooks/useInterval': resolve(__dirname, "src/hooks/useInterval.ts"),
        'hooks/useIsClient': resolve(__dirname, "src/hooks/useIsClient.ts"),
        'hooks/useIsMounted': resolve(__dirname, "src/hooks/useIsMounted.ts"),
        'hooks/useIsomorphicLayoutEffect': resolve(__dirname, "src/hooks/useIsomorphicLayoutEffect.ts"),
        'hooks/useLocalStorage': resolve(__dirname, "src/hooks/useLocalStorage.ts"),
        'hooks/useMap': resolve(__dirname, "src/hooks/useMap.ts"),
        'hooks/useMediaQuery': resolve(__dirname, "src/hooks/useMediaQuery.ts"),
        'hooks/useOnClickOutside': resolve(__dirname, "src/hooks/useOnClickOutside.ts"),
        'hooks/useReadLocalStorage': resolve(__dirname, "src/hooks/useReadLocalStorage.ts"),
        'hooks/useResizeObserver': resolve(__dirname, "src/hooks/useResizeObserver.ts"),
        'hooks/useScreen': resolve(__dirname, "src/hooks/useScreen.ts"),
        'hooks/useScript': resolve(__dirname, "src/hooks/useScript.ts"),
        'hooks/useScrollLock': resolve(__dirname, "src/hooks/useScrollLock.ts"),
        'hooks/useSessionStorage': resolve(__dirname, "src/hooks/useSessionStorage.ts"),
        'hooks/useStep': resolve(__dirname, "src/hooks/useStep.ts"),
        'hooks/useTernaryDarkMode': resolve(__dirname, "src/hooks/useTernaryDarkMode.ts"),
        'hooks/useTimeout': resolve(__dirname, "src/hooks/useTimeout.ts"),
        'hooks/useToggle': resolve(__dirname, "src/hooks/useToggle.ts"),
        'hooks/useUnmount': resolve(__dirname, "src/hooks/useUnmount.ts"),
        'hooks/useWindowSize': resolve(__dirname, "src/hooks/useWindowSize.ts"),
      },
      name: "@delhivery/tarmac",
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  optimizeDeps: {
  include: ["maplibre-gl"]
},
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
