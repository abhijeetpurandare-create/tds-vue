<!--
  TarmacAlert — Vue 3 wrapper for <tarmac-alert>

  Provides:
  - Full TypeScript prop types
  - Vue-friendly events: @close, @cancel, @proceed
  - Named slots: leading-icon, trailing-icon, cta-actions, default
-->
<template>
  <tarmac-alert
    :variant="variant"
    :size="size"
    :title="title"
    :description="description"
    :closable="closable || undefined"
    :alert-style="alertStyle"
    :show-ctas="showCtas || undefined"
    :cancel-text="cancelText"
    :proceed-text="proceedText"
    :background-color="backgroundColor"
    :border-color="borderColor"
    :text-color="textColor"
    :icon-color="iconColor"
    @tarmac-close="$emit('close', $event)"
    @tarmac-cancel="$emit('cancel', $event)"
    @tarmac-proceed="$emit('proceed', $event)"
  >
    <slot name="leading-icon" />
    <slot name="trailing-icon" />
    <slot name="cta-actions" />
    <slot name="icon" />
    <slot />
  </tarmac-alert>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type AlertVariant =
  | 'default' | 'primary' | 'destructive' | 'success' | 'warning' | 'info'
  | 'white' | 'black' | 'coal' | 'error';
export type AlertSize = 'sm' | 'md' | 'lg';
export type AlertStyle = 'singleText' | 'dualText';

export default defineComponent({
  name: 'TarmacAlert',
  props: {
    variant: { type: String as () => AlertVariant, default: 'default' },
    size: { type: String as () => AlertSize, default: 'md' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    closable: { type: Boolean, default: false },
    alertStyle: { type: String as () => AlertStyle, default: 'singleText' },
    showCtas: { type: Boolean, default: false },
    cancelText: { type: String, default: 'Cancel' },
    proceedText: { type: String, default: 'Proceed' },
    backgroundColor: { type: String, default: undefined },
    borderColor: { type: String, default: undefined },
    textColor: { type: String, default: undefined },
    iconColor: { type: String, default: undefined },
  },
  emits: ['close', 'cancel', 'proceed'],
});
</script>
