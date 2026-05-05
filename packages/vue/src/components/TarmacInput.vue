<template>
  <tarmac-input
    :input-style="inputStyle"
    :input-type="inputType"
    :input-size="inputSize"
    :style-variant="styleVariant"
    :is-disabled="isDisabled || undefined"
    :is-ghost="isGhost || undefined"
    :label="label"
    :is-mandatory="isMandatory || undefined"
    :placeholder="placeholder"
    :value="modelValue"
    :helper-text-top="helperTextTop"
    :helper-text-bottom="helperTextBottom"
    :subtext="subtext"
    :status-text="statusText"
    @tarmac-input="handleInput"
    @tarmac-change="handleChange"
    @tarmac-focus="handleFocus"
    @tarmac-blur="handleBlur"
  >
    <slot name="leading-icon" slot="leading-icon" />
    <slot name="trailing-icon" slot="trailing-icon" />
    <slot name="addon" slot="addon" />
  </tarmac-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacInput',
  props: {
    modelValue: { type: String, default: '' },
    inputStyle: { type: String, default: 'tarmac-01' },
    inputType: { type: String, default: 'regular' },
    inputSize: { type: String, default: 'md' },
    styleVariant: { type: String, default: 'standard' },
    isDisabled: { type: Boolean, default: false },
    isGhost: { type: Boolean, default: false },
    label: { type: String, default: '' },
    isMandatory: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    helperTextTop: { type: String, default: '' },
    helperTextBottom: { type: String, default: '' },
    subtext: { type: String, default: '' },
    statusText: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur'],
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
    handleFocus() { this.$emit('focus'); },
    handleBlur() { this.$emit('blur'); },
  },
});
</script>
