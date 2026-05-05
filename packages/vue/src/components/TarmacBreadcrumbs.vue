<template>
  <tarmac-breadcrumbs
    :divider-style="dividerStyle"
    :size="size"
    :show-divider="showDivider || undefined"
  >
    <slot />
  </tarmac-breadcrumbs>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export type DividerStyle = 'slash' | 'chevron';
export type BreadcrumbsSize = 'lg' | 'sm';

export default defineComponent({
  name: 'TarmacBreadcrumbs',
  props: {
    dividerStyle: { type: String as () => DividerStyle, default: 'slash' },
    size: { type: String as () => BreadcrumbsSize, default: 'lg' },
    showDivider: { type: Boolean, default: true },
  },
});
</script>
