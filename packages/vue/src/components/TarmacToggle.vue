<template>
  <tarmac-toggle :tarmac-color="tarmacColor" :tarmac-style="tarmacStyle" :tarmac-size="tarmacSize" :checked="modelValue||undefined" :disabled="disabled||undefined" :is-ghost="isGhost||undefined" @tarmac-change="handleChange" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TarmacToggle',
  props: {
    modelValue: { type: Boolean, default: false }, tarmacColor: { type: String, default: 'black' },
    tarmacStyle: { type: String, default: 'filled' }, tarmacSize: { type: String, default: 'lg' },
    disabled: { type: Boolean, default: false }, isGhost: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change'],
  methods: {
    handleChange(e: CustomEvent) {
      const checked = e.detail?.checked ?? false;
      this.$emit('update:modelValue', checked);
      this.$emit('change', { checked });
    },
  },
});
</script>
