<template>
  <tarmac-link
    :link-style="linkStyle"
    :size="size"
    :is-disabled="isDisabled || undefined"
    :text="text"
    :href="href"
    :target="target"
    :rel="rel"
    @tarmac-click="$emit('click', $event)"
  >
    <slot name="leading-icon" />
    <slot />
    <slot name="trailing-icon" />
  </tarmac-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export type LinkStyle = 'blue' | 'black' | 'white';
export type LinkSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export default defineComponent({
  name: 'TarmacLink',
  props: {
    linkStyle: { type: String as () => LinkStyle, default: 'blue' },
    size: { type: String as () => LinkSize, default: 'md' },
    isDisabled: { type: Boolean, default: false },
    text: { type: String, default: '' },
    href: { type: String, default: '' },
    target: { type: String, default: '' },
    rel: { type: String, default: '' },
  },
  emits: ['click'],
});
</script>
