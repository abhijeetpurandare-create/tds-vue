<template>
  <tarmac-filter-dropdown
    :placeholder="placeholder"
    :size="size"
    :options="options"
    @tarmac-change="handleChange"
    @tarmac-apply="handleApply"
    @tarmac-clear="handleClear"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacFilterDropdown',
  props: {
    placeholder: { type: String, default: 'Select' },
    size: { type: String, default: 'lg' },
    options: { type: String, default: '[]' },
  },
  emits: ['change', 'apply', 'clear'],
  methods: {
    handleChange(e: CustomEvent) {
      this.$emit('change', { values: e.detail?.values });
    },
    handleApply(e: CustomEvent) {
      this.$emit('apply', { values: e.detail?.values });
    },
    handleClear() { this.$emit('clear'); },
  },
});
</script>
