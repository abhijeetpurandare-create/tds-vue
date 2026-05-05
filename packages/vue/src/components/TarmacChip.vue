<template>
  <tarmac-chip
    :chip-type="chipType"
    :chip-variant="chipVariant"
    :size="size"
    :text="text"
    :status-left="statusLeft || undefined"
    :status-right="statusRight || undefined"
    :is-disabled="isDisabled || undefined"
    :is-ghost="isGhost || undefined"
    @tarmac-click="$emit('click', $event)"
  >
    <slot name="leading-icon" />
    <slot />
    <slot name="trailing-icon" />
  </tarmac-chip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacChip',
  props: {
    chipType: { type: String, default: 'black' },
    chipVariant: { type: String, default: 'standard' },
    size: { type: String, default: 'md' },
    text: { type: String, default: '' },
    statusLeft: { type: Boolean, default: false },
    statusRight: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    isGhost: { type: Boolean, default: false },
  },
  emits: ['click'],
});
</script>
