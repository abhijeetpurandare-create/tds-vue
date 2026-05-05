<template>
  <tarmac-slider
    :variant="variant"
    :size="size"
    :slider-type="sliderType"
    :value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :is-disabled="isDisabled || undefined"
    @tarmac-change="handleChange"
    @tarmac-change-end="handleChangeEnd"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export type SliderVariant = 'black' | 'coal' | 'dlv_red';
export type SliderSize = 'sm' | 'lg';
export type SliderType = 'single' | 'dual';

export default defineComponent({
  name: 'TarmacSlider',
  props: {
    modelValue: { type: Number, default: 0 },
    variant: { type: String as () => SliderVariant, default: 'black' },
    size: { type: String as () => SliderSize, default: 'lg' },
    sliderType: { type: String as () => SliderType, default: 'single' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    isDisabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change', 'change-end'],
  methods: {
    handleChange(e: CustomEvent) {
      const value = e.detail?.value ?? 0;
      this.$emit('update:modelValue', value);
      this.$emit('change', { value });
    },
    handleChangeEnd(e: CustomEvent) {
      const value = e.detail?.value ?? 0;
      this.$emit('change-end', { value });
    },
  },
});
</script>
