<template>
  <tarmac-collapse
    :accordion="accordion || undefined"
    :active-key="activeKey"
    @tarmac-change="handleChange"
  >
    <slot />
  </tarmac-collapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacCollapse',
  props: {
    accordion: { type: Boolean, default: false },
    activeKey: { type: String, default: '' },
  },
  emits: ['change'],
  methods: {
    handleChange(e: CustomEvent) {
      this.$emit('change', { activeKey: e.detail?.activeKey });
    },
  },
});
</script>
