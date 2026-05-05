<template>
  <tarmac-tooltip
    :content="content"
    :placement="placement"
    :trigger="trigger"
    :variant="variant"
    :size="size"
    :visible="visible || undefined"
    @tarmac-visible-change="handleVisibleChange"
  >
    <slot />
  </tarmac-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacTooltip',
  props: {
    content: { type: String, default: '' },
    placement: { type: String, default: 'top' },
    trigger: { type: String, default: 'hover' },
    variant: { type: String, default: 'black' },
    size: { type: String, default: 'md' },
    visible: { type: Boolean, default: false },
  },
  emits: ['visible-change'],
  methods: {
    handleVisibleChange(e: CustomEvent) {
      this.$emit('visible-change', { visible: e.detail?.visible });
    },
  },
});
</script>
