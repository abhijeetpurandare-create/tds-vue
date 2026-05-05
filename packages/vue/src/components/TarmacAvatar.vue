<template>
  <tarmac-avatar :avatar-type="avatarType" :shape="shape" :size="size" :src="src" :alt="alt" :show-status="showStatus||undefined" :status-type="statusType" :is-disabled="isDisabled||undefined" :is-ghost="isGhost||undefined">
    <slot name="icon" /><slot />
  </tarmac-avatar>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TarmacAvatar',
  props: {
    avatarType: { type: String, default: 'initials' }, shape: { type: String, default: 'round' },
    size: { type: String, default: 'md' }, src: { type: String, default: '' }, alt: { type: String, default: 'avatar' },
    showStatus: { type: Boolean, default: false }, statusType: { type: String, default: 'active' },
    isDisabled: { type: Boolean, default: false }, isGhost: { type: Boolean, default: false },
  },
});
</script>
