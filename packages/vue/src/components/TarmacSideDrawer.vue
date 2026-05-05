<template>
  <tarmac-side-drawer
    :is-open="isOpen || undefined"
    :variant="variant"
    :close-on-overlay="closeOnOverlay || undefined"
    :close-on-esc="closeOnEsc || undefined"
    @tarmac-close="handleClose"
  >
    <slot />
  </tarmac-side-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacSideDrawer',
  props: {
    isOpen: { type: Boolean, default: false },
    variant: { type: String, default: 'narrow' },
    closeOnOverlay: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true },
  },
  emits: ['close'],
  methods: {
    handleClose() { this.$emit('close'); },
  },
});
</script>
