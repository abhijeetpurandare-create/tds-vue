<template>
  <tarmac-modal
    :is-open="isOpen || undefined"
    :size="size"
    :title="title"
    :closable="closable || undefined"
    :mask-closable="maskClosable || undefined"
    :width="width"
    :centered="centered || undefined"
    @tarmac-close="handleClose"
    @tarmac-ok="handleOk"
  >
    <slot />
    <slot name="footer" slot="footer" />
  </tarmac-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacModal',
  props: {
    isOpen: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    title: { type: String, default: '' },
    closable: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: true },
    width: { type: String, default: '' },
    centered: { type: Boolean, default: false },
  },
  emits: ['close', 'ok'],
  methods: {
    handleClose() { this.$emit('close'); },
    handleOk() { this.$emit('ok'); },
  },
});
</script>
