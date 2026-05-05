<!--
  TarmacBadge — Vue 3 wrapper for <tarmac-badge>

  Provides:
  - Full TypeScript prop types
  - Named slots: leading-icon, trailing-icon, default
-->
<template>
  <tarmac-badge
    :variant="variant"
    :size="size"
    :badge-type="badgeType"
    :text="text"
    :show-status="showStatus || undefined"
    :is-disabled="isDisabled || undefined"
    :is-ghost="isGhost || undefined"
  >
    <slot name="leading-icon" />
    <slot />
    <slot name="trailing-icon" />
  </tarmac-badge>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type BadgeVariant = 'black' | 'white' | 'coal' | 'dlv_red' | 'info' | 'success' | 'warning' | 'error' | 'cardbox';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeType = 'solid' | 'subtle' | 'outlined';

export default defineComponent({
  name: 'TarmacBadge',
  props: {
    variant: { type: String as () => BadgeVariant, default: 'black' },
    size: { type: String as () => BadgeSize, default: 'md' },
    badgeType: { type: String as () => BadgeType, default: 'solid' },
    text: { type: String, default: '' },
    showStatus: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    isGhost: { type: Boolean, default: false },
  },
});
</script>
