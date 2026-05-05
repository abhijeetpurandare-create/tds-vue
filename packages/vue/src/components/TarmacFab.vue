<template>
  <tarmac-fab
    :position="position"
    :variant="variant"
    :position-mode="positionMode"
    @tarmac-toggle="handleToggle"
  >
    <slot name="trigger" slot="trigger" />
    <slot name="menu" slot="menu" />
  </tarmac-fab>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacFab',
  props: {
    position: { type: String, default: 'bottom-right' },
    variant: { type: String, default: 'light' },
    positionMode: { type: String, default: 'fixed' },
  },
  emits: ['toggle'],
  methods: {
    handleToggle(e: CustomEvent) {
      this.$emit('toggle', { isOpen: e.detail?.isOpen });
    },
  },
});
</script>
