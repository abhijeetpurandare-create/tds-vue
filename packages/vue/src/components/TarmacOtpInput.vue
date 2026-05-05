<template>
  <tarmac-otp-input
    :num-digits="numDigits"
    :otp-style="otpStyle"
    :otp-size="otpSize"
    :otp-variant="otpVariant"
    :is-disabled="isDisabled || undefined"
    :placeholder="placeholder"
    :input-type="inputType"
    :label="label"
    :helper-text="helperText"
    :value="modelValue"
    @tarmac-change="handleChange"
    @tarmac-complete="handleComplete"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacOtpInput',
  props: {
    modelValue: { type: String, default: '' },
    numDigits: { type: Number, default: 6 },
    otpStyle: { type: String, default: 'tarmac-01' },
    otpSize: { type: String, default: 'md' },
    otpVariant: { type: String, default: 'default' },
    isDisabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    inputType: { type: String, default: 'text' },
    label: { type: String, default: '' },
    helperText: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'change', 'complete'],
  methods: {
    handleChange(e: CustomEvent) {
      const value = e.detail?.value ?? '';
      this.$emit('update:modelValue', value);
      this.$emit('change', { value });
    },
    handleComplete(e: CustomEvent) {
      const value = e.detail?.value ?? '';
      this.$emit('complete', { value });
    },
  },
});
</script>
