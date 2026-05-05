<template>
  <tarmac-stepper-icon :stepper-style="stepperStyle" :variant="variant" :size="size" :step-number="stepNumber">
    <slot name="icon" />
  </tarmac-stepper-icon>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TarmacStepperIcon',
  props: {
    stepperStyle: { type: String, default: 'numeric' }, variant: { type: String, default: 'solid' },
    size: { type: String, default: 'lg' }, stepNumber: { type: Number, default: 1 },
  },
});
</script>
