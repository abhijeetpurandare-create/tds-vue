<template>
  <tarmac-toast
    :message="message"
    :title="title"
    :variant="variant"
    :size="size"
    :duration="duration"
    :closable="closable || undefined"
    :position="position"
    @tarmac-close="handleClose"
  >
    <slot name="icon" slot="icon" />
  </tarmac-toast>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacToast',
  props: {
    message: { type: String, default: '' },
    title: { type: String, default: '' },
    variant: { type: String, default: 'default' },
    size: { type: String, default: 'md' },
    duration: { type: Number, default: 3000 },
    closable: { type: Boolean, default: false },
    position: { type: String, default: 'top-right' },
  },
  emits: ['close'],
  methods: {
    handleClose() { this.$emit('close'); },
  },
});
</script>
