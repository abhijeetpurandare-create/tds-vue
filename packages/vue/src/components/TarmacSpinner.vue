<template>
  <tarmac-spinner
    :variant="variant"
    :size="size"
    :tarmac-variant="tarmacVariant"
    :tarmac-size="tarmacSize"
    :color="color"
    :track-color="trackColor"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacSpinner',
  props: {
    size: { type: String, default: 'md' },
    variant: { type: String, default: 'default' },
    tarmacVariant: { type: String, default: undefined },
    tarmacSize: { type: String, default: '24px' },
    color: { type: String, default: undefined },
    trackColor: { type: String, default: undefined },
  },
});
</script>
