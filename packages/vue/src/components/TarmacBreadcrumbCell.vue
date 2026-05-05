<template>
  <tarmac-breadcrumb-cell
    :label="label"
    :cell-style="cellStyle"
    :size="size"
    :is-disabled="isDisabled || undefined"
    :is-ghost="isGhost || undefined"
    :is-current="isCurrent || undefined"
    :href="href"
    @tarmac-click="$emit('click', $event)"
  >
    <slot name="leading-icon" />
    <slot name="trailing-icon" />
    <slot name="pill" />
  </tarmac-breadcrumb-cell>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export type BreadcrumbCellStyle = 'black' | 'blue' | 'dlvRed';
export type BreadcrumbCellSize = 'lg' | 'sm';

export default defineComponent({
  name: 'TarmacBreadcrumbCell',
  props: {
    label: { type: String, default: '' },
    cellStyle: { type: String as () => BreadcrumbCellStyle, default: 'black' },
    size: { type: String as () => BreadcrumbCellSize, default: 'lg' },
    isDisabled: { type: Boolean, default: false },
    isGhost: { type: Boolean, default: false },
    isCurrent: { type: Boolean, default: false },
    href: { type: String, default: '' },
  },
  emits: ['click'],
});
</script>
