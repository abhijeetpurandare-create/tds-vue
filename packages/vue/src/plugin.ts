/**
 * Tarmac Vue Plugin
 *
 * Registers the Tarmac Web Components as custom elements in Vue 3.
 * Also configures the Vue compiler to treat tarmac-* tags as custom elements.
 *
 * Usage:
 *   import { createApp } from 'vue';
 *   import { TarmacPlugin } from '@tarmac/vue';
 *   import App from './App.vue';
 *
 *   const app = createApp(App);
 *   app.use(TarmacPlugin);
 *   app.mount('#app');
 */

import type { Plugin } from 'vue';

// Side-effect import: registers all tarmac-* custom elements
import '@tarmac/web-components';

export const TarmacPlugin: Plugin = {
  install(app) {
    // Configure Vue to recognize tarmac-* tags as custom elements
    app.config.compilerOptions.isCustomElement = (tag: string) =>
      tag.startsWith('tarmac-');
  },
};
