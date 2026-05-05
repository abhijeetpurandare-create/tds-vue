<!--
  TarmacThemeProvider — Vue 3 wrapper for <tarmac-theme-provider>

  Provides:
  - Theme loading from JSON source
  - @theme-loaded event
-->
<template>
  <tarmac-theme-provider
    :source="source"
    :active-theme="activeTheme"
    @tarmac-theme-loaded="$emit('theme-loaded', $event)"
  >
    <slot />
  </tarmac-theme-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacThemeProvider',
  props: {
    source: { type: String, default: '' },
    activeTheme: { type: String, default: 'light' },
  },
  emits: ['theme-loaded'],
});
</script>
