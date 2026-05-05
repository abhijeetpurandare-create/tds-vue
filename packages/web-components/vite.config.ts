import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true }) as any,
  ],
  build: {
    target: 'es2022',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        // Atoms
        button: resolve(__dirname, 'src/components/button/index.ts'),
        alert: resolve(__dirname, 'src/components/alert/index.ts'),
        badge: resolve(__dirname, 'src/components/badge/index.ts'),
        spinner: resolve(__dirname, 'src/components/spinner/index.ts'),
        chip: resolve(__dirname, 'src/components/chip/index.ts'),
        checkbox: resolve(__dirname, 'src/components/checkbox/index.ts'),
        pill: resolve(__dirname, 'src/components/pill/index.ts'),
        avatar: resolve(__dirname, 'src/components/avatar/index.ts'),
        toggle: resolve(__dirname, 'src/components/toggle/index.ts'),
        divider: resolve(__dirname, 'src/components/divider/index.ts'),
        'stepper-icon': resolve(__dirname, 'src/components/stepper-icon/index.ts'),
        link: resolve(__dirname, 'src/components/link/index.ts'),
        'status-indicator': resolve(__dirname, 'src/components/status-indicator/index.ts'),
        rating: resolve(__dirname, 'src/components/rating/index.ts'),
        'progress-bar': resolve(__dirname, 'src/components/progress-bar/index.ts'),
        slider: resolve(__dirname, 'src/components/slider/index.ts'),
        'breadcrumb-cell': resolve(__dirname, 'src/components/breadcrumb-cell/index.ts'),
        breadcrumbs: resolve(__dirname, 'src/components/breadcrumbs/index.ts'),
        'tab-cell': resolve(__dirname, 'src/components/tab-cell/index.ts'),
        // Form inputs
        input: resolve(__dirname, 'src/components/input/index.ts'),
        textarea: resolve(__dirname, 'src/components/textarea/index.ts'),
        radio: resolve(__dirname, 'src/components/radio/index.ts'),
        'otp-input': resolve(__dirname, 'src/components/otp-input/index.ts'),
        // Overlays
        modal: resolve(__dirname, 'src/components/modal/index.ts'),
        toast: resolve(__dirname, 'src/components/toast/index.ts'),
        snackbar: resolve(__dirname, 'src/components/snackbar/index.ts'),
        tooltip: resolve(__dirname, 'src/components/tooltip/index.ts'),
        popup: resolve(__dirname, 'src/components/popup/index.ts'),
        'dialog-box': resolve(__dirname, 'src/components/dialog-box/index.ts'),
        'side-drawer': resolve(__dirname, 'src/components/side-drawer/index.ts'),
        // Compound
        collapse: resolve(__dirname, 'src/components/collapse/index.ts'),
        fab: resolve(__dirname, 'src/components/fab/index.ts'),
        coachmarks: resolve(__dirname, 'src/components/coachmarks/index.ts'),
        'tab-group': resolve(__dirname, 'src/components/tab-group/index.ts'),
        'filter-dropdown': resolve(__dirname, 'src/components/filter-dropdown/index.ts'),
        // Provider
        'theme-provider': resolve(__dirname, 'src/components/theme-provider/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
      output: { preserveModules: false },
    },
  },
});
