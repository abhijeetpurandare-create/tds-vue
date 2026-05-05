<!--
  TarmacButton — Vue 3 wrapper for <tarmac-button>

  Provides:
  - Full TypeScript prop types
  - Vue-friendly @click event (re-emitted from tarmac-click)
  - Named slots: leading-icon, trailing-icon, default
-->
<template>
  <tarmac-button
    :variant="variant"
    :size="size"
    :button-style="buttonStyle"
    :button-type="buttonType"
    :is-loading="isLoading || undefined"
    :disabled="disabled || undefined"
    :is-rounded="isRounded || undefined"
    :is-ghost="isGhost || undefined"
    :text="text"
    :background-color="backgroundColor"
    :border-color="borderColor"
    :text-color="textColor"
    :hover-color="hoverColor"
    :radius="radius"
    :border="border"
    @tarmac-click="$emit('click', $event)"
  >
    <slot name="leading-icon" />
    <slot />
    <slot name="trailing-icon" />
  </tarmac-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export type ButtonVariant =
  | 'primary' | 'secondary' | 'outline'
  | 'black' | 'white' | 'info' | 'success' | 'error' | 'warning'
  | 'dlv_red' | 'coal';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonStyle = 'primary' | 'secondary' | 'tertiary';
export type ButtonType = 'button' | 'iconButton';

export default defineComponent({
  name: 'TarmacButton',
  props: {
    variant: { type: String as () => ButtonVariant, default: 'primary' },
    size: { type: String as () => ButtonSize, default: 'md' },
    buttonStyle: { type: String as () => ButtonStyle, default: 'primary' },
    buttonType: { type: String as () => ButtonType, default: 'button' },
    isLoading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    isRounded: { type: Boolean, default: false },
    isGhost: { type: Boolean, default: false },
    text: { type: String, default: '' },
    backgroundColor: { type: String, default: undefined },
    borderColor: { type: String, default: undefined },
    textColor: { type: String, default: undefined },
    hoverColor: { type: String, default: undefined },
    radius: { type: String, default: undefined },
    border: { type: String, default: undefined },
  },
  emits: ['click'],
});
</script>
