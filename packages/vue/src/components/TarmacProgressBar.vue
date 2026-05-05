<template>
  <tarmac-progress-bar
    :value="value"
    :size="size"
    :variant="variant"
    :show-percentage="showPercentage || undefined"
    :track-color="trackColor"
    :text-color="textColor"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';

export default defineComponent({
  name: 'TarmacProgressBar',
  props: {
    value: { type: Number, default: 0 },
    size: { type: String as () => ProgressBarSize, default: 'md' },
    variant: { type: String as () => ProgressBarVariant, default: 'primary' },
    showPercentage: { type: Boolean, default: false },
    trackColor: { type: String, default: undefined },
    textColor: { type: String, default: undefined },
  },
});
</script>
