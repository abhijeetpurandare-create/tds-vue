<template>
  <tarmac-tab-cell
    :tab-type="tabType"
    :orientation="orientation"
    :tab-style="tabStyle"
    :size="size"
    :is-pressed="isPressed || undefined"
    :is-selected="isSelected || undefined"
    :is-disabled="isDisabled || undefined"
    :is-ghost="isGhost || undefined"
    :title="title"
    :subtext="subtext"
    @tarmac-click="$emit('click', $event)"
  >
    <slot name="leading-icon" />
    <slot name="trailing-icon" />
    <slot name="badge" />
    <slot name="pill" />
    <slot name="status" />
  </tarmac-tab-cell>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export type TabType = 'regular' | 'button';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabStyle = 'black' | 'blue' | 'dlvRed';
export type TabSize = 'lg' | 'sm';

export default defineComponent({
  name: 'TarmacTabCell',
  props: {
    tabType: { type: String as () => TabType, default: 'regular' },
    orientation: { type: String as () => TabOrientation, default: 'horizontal' },
    tabStyle: { type: String as () => TabStyle, default: 'black' },
    size: { type: String as () => TabSize, default: 'lg' },
    isPressed: { type: Boolean, default: false },
    isSelected: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    isGhost: { type: Boolean, default: false },
    title: { type: String, default: '' },
    subtext: { type: String, default: '' },
  },
  emits: ['click'],
});
</script>
