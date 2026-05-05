<template>
  <tarmac-dialog-box
    :is-open="isOpen || undefined"
    :type="type"
    :size="size"
    :title="title"
    :subtext="subtext"
    :heading="heading"
    :description="description"
    :show-header="showHeader || undefined"
    :show-footer="showFooter || undefined"
    :show-checkbox="showCheckbox || undefined"
    :checkbox-label="checkboxLabel"
    :checkbox-checked="checkboxChecked || undefined"
    @tarmac-close="handleClose"
    @tarmac-checkbox-change="handleCheckboxChange"
  >
    <slot />
    <slot name="illustration" slot="illustration" />
    <slot name="snackbar" slot="snackbar" />
    <slot name="footer" slot="footer" />
  </tarmac-dialog-box>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacDialogBox',
  props: {
    isOpen: { type: Boolean, default: false },
    type: { type: String, default: 'standard' },
    size: { type: String, default: 'web' },
    title: { type: String, default: '' },
    subtext: { type: String, default: '' },
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    showHeader: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    showCheckbox: { type: Boolean, default: false },
    checkboxLabel: { type: String, default: '' },
    checkboxChecked: { type: Boolean, default: false },
  },
  emits: ['close', 'checkbox-change'],
  methods: {
    handleClose() { this.$emit('close'); },
    handleCheckboxChange(e: CustomEvent) {
      this.$emit('checkbox-change', { checked: e.detail?.checked });
    },
  },
});
</script>
