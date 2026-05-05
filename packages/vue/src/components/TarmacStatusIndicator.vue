<template>
  <tarmac-status-indicator
    :variant="variant"
    :size="size"
    :label="label"
  >
    <slot name="icon" />
  </tarmac-status-indicator>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export type StatusVariant = 'success' | 'failed' | 'warning' | 'information' | 'synced' | 'scheduled' | 'unknown' | 'pause' | 'play' | 'downloading' | 'pending';
export type StatusSize = 'lg' | 'md' | 'sm' | 'xs';

export default defineComponent({
  name: 'TarmacStatusIndicator',
  props: {
    variant: { type: String as () => StatusVariant, default: 'success' },
    size: { type: String as () => StatusSize, default: 'md' },
    label: { type: String, default: '' },
  },
});
</script>
