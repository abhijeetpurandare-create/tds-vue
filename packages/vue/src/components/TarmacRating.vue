<template>
  <tarmac-rating
    :value="modelValue"
    :max-stars="maxStars"
    :size="size"
    :read-only="readOnly || undefined"
    :allow-half="allowHalf || undefined"
    @tarmac-change="handleChange"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export type RatingSize = 'lg' | 'md' | 'sm';

export default defineComponent({
  name: 'TarmacRating',
  props: {
    modelValue: { type: Number, default: 0 },
    maxStars: { type: Number, default: 5 },
    size: { type: String as () => RatingSize, default: 'md' },
    readOnly: { type: Boolean, default: false },
    allowHalf: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change'],
  methods: {
    handleChange(e: CustomEvent) {
      const value = e.detail?.value ?? 0;
      this.$emit('update:modelValue', value);
      this.$emit('change', { value });
    },
  },
});
</script>
