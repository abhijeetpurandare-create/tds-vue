<template>
  <tarmac-pill :pill-variant="pillVariant" :pill-type="pillType" :size="size" :text="text" :show-status="showStatus||undefined" :is-disabled="isDisabled||undefined" :is-ghost="isGhost||undefined">
    <slot name="leading-icon" /><slot /><slot name="trailing-icon" />
  </tarmac-pill>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TarmacPill',
  props: {
    pillVariant: { type: String, default: 'black' }, pillType: { type: String, default: 'solid' },
    size: { type: String, default: 'md' }, text: { type: String, default: '' },
    showStatus: { type: Boolean, default: false }, isDisabled: { type: Boolean, default: false }, isGhost: { type: Boolean, default: false },
  },
});
</script>
