<template>
  <tarmac-radio
    :tarmac-variant="tarmacVariant"
    :tarmac-style="tarmacStyle"
    :size="size"
    :checked="modelValue || undefined"
    :disabled="disabled || undefined"
    :value="value"
    :name="name"
    :subtext="subtext"
    @tarmac-change="handleChange"
  >
    <slot />
  </tarmac-radio>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacRadio',
  props: {
    modelValue: { type: Boolean, default: false },
    tarmacVariant: { type: String, default: 'standard' },
    tarmacStyle: { type: String, default: 'box' },
    size: { type: String, default: 'md' },
    disabled: { type: Boolean, default: false },
    value: { type: String, default: '' },
    name: { type: String, default: '' },
    subtext: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'change'],
  methods: {
    handleChange(e: CustomEvent) {
      const checked = e.detail?.checked ?? false;
      this.$emit('update:modelValue', checked);
      this.$emit('change', { checked, value: e.detail?.value });
    },
  },
});
</script>
