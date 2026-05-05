<template>
  <tarmac-tab-group
    :orientation="orientation"
    :size="size"
    @tarmac-tab-change="handleTabChange"
  >
    <slot />
  </tarmac-tab-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacTabGroup',
  props: {
    orientation: { type: String, default: 'horizontal' },
    size: { type: String, default: 'lg' },
  },
  emits: ['tab-change'],
  methods: {
    handleTabChange(e: CustomEvent) {
      this.$emit('tab-change', { index: e.detail?.index });
    },
  },
});
</script>
