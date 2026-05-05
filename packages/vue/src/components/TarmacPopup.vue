<template>
  <tarmac-popup
    :is-open="isOpen || undefined"
    :size="size"
    :title="title"
    :subtext="subtext"
    :show-footer="showFooter || undefined"
    :close-on-overlay="closeOnOverlay || undefined"
    :close-on-esc="closeOnEsc || undefined"
    @tarmac-close="handleClose"
  >
    <slot />
    <slot name="footer" slot="footer" />
    <slot name="leading-icon" slot="leading-icon" />
    <slot name="trailing-icon" slot="trailing-icon" />
  </tarmac-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacPopup',
  props: {
    isOpen: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    title: { type: String, default: '' },
    subtext: { type: String, default: '' },
    showFooter: { type: Boolean, default: false },
    closeOnOverlay: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true },
  },
  emits: ['close'],
  methods: {
    handleClose() { this.$emit('close'); },
  },
});
</script>
