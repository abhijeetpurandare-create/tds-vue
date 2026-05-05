<template>
  <tarmac-divider :divider-type="dividerType" :size="size" :color="color" :orientation="orientation" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TarmacDivider',
  props: {
    dividerType: { type: String, default: 'line' }, size: { type: String, default: '1' },
    color: { type: String, default: undefined }, orientation: { type: String, default: 'horizontal' },
  },
});
</script>
