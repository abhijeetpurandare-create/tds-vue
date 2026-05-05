<template>
  <tarmac-textarea
    :textarea-style="textAreaStyle"
    :textarea-type="textAreaType"
    :textarea-size="textAreaSize"
    :is-disabled="isDisabled || undefined"
    :is-ghost="isGhost || undefined"
    :label="label"
    :placeholder="placeholder"
    :value="modelValue"
    :rows="rows"
    :resize="resize"
    :helper-text-top="helperTextTop"
    :helper-text-bottom="helperTextBottom"
    :status-text="statusText"
    @tarmac-input="handleInput"
    @tarmac-change="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacTextArea',
  props: {
    modelValue: { type: String, default: '' },
    textAreaStyle: { type: String, default: 'tarmac-01' },
    textAreaType: { type: String, default: 'regular' },
    textAreaSize: { type: String, default: 'md' },
    isDisabled: { type: Boolean, default: false },
    isGhost: { type: Boolean, default: false },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 4 },
    resize: { type: String, default: 'vertical' },
    helperTextTop: { type: String, default: '' },
    helperTextBottom: { type: String, default: '' },
    statusText: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'input', 'change'],
  methods: {
    handleInput(e: CustomEvent) {
      const value = e.detail?.value ?? '';
      this.$emit('update:modelValue', value);
      this.$emit('input', { value });
    },
    handleChange(e: CustomEvent) {
      const value = e.detail?.value ?? '';
      this.$emit('change', { value });
    },
  },
});
</script>
