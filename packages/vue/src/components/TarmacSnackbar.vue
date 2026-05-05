<template>
  <tarmac-snackbar
    :message="message"
    :title="title"
    :variant="variant"
    :snackbar-style="snackbarStyle"
    :size="size"
    :trailing-icon="trailingIcon || undefined"
    :ct-as="ctAs || undefined"
    :deny-text="denyText"
    :approve-text="approveText"
    :duration="duration"
    :position="position"
    @tarmac-close="handleClose"
    @tarmac-deny="handleDeny"
    @tarmac-approve="handleApprove"
  >
    <slot name="leading-icon" slot="leading-icon" />
  </tarmac-snackbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacSnackbar',
  props: {
    message: { type: String, default: '' },
    title: { type: String, default: '' },
    variant: { type: String, default: 'black' },
    snackbarStyle: { type: String, default: 'singleText' },
    size: { type: String, default: 'lg' },
    trailingIcon: { type: Boolean, default: false },
    ctAs: { type: Boolean, default: false },
    denyText: { type: String, default: '' },
    approveText: { type: String, default: '' },
    duration: { type: Number, default: 5000 },
    position: { type: String, default: 'bottom' },
  },
  emits: ['close', 'deny', 'approve'],
  methods: {
    handleClose() { this.$emit('close'); },
    handleDeny() { this.$emit('deny'); },
    handleApprove() { this.$emit('approve'); },
  },
});
</script>
