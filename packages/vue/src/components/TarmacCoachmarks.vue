<template>
  <tarmac-coachmarks
    :variant="variant"
    :size="size"
    :arrow-position="arrowPosition"
    :title="title"
    :description="description"
  >
    <slot name="image" slot="image" />
    <slot name="badges" slot="badges" />
    <slot name="ctas" slot="ctas" />
  </tarmac-coachmarks>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TarmacCoachmarks',
  props: {
    variant: { type: String, default: 'white' },
    size: { type: String, default: 'lg' },
    arrowPosition: { type: String, default: 'bottom-center' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
});
</script>
