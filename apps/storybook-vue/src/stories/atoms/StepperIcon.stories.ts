import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Atoms/StepperIcon', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const ColorStyles: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center';
    d.innerHTML = `
      <tarmac-stepper-icon stepper-style="black" variant="solid" size="lg"></tarmac-stepper-icon>
      <tarmac-stepper-icon stepper-style="blue" variant="solid" size="lg"></tarmac-stepper-icon>
      <tarmac-stepper-icon stepper-style="green" variant="solid" size="lg"></tarmac-stepper-icon>
      <tarmac-stepper-icon stepper-style="dlv_red" variant="solid" size="lg"></tarmac-stepper-icon>
      <tarmac-stepper-icon stepper-style="coal" variant="solid" size="lg"></tarmac-stepper-icon>
    `;
    return d;
  },
};

export const Numeric: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center';
    d.innerHTML = `
      <tarmac-stepper-icon stepper-style="numeric" variant="solid" size="lg" step-number="1"></tarmac-stepper-icon>
      <tarmac-stepper-icon stepper-style="numeric" variant="outlined" size="lg" step-number="2"></tarmac-stepper-icon>
      <tarmac-stepper-icon stepper-style="numeric" variant="focused" size="lg" step-number="3"></tarmac-stepper-icon>
      <tarmac-stepper-icon stepper-style="numeric" variant="disabled" size="lg" step-number="4"></tarmac-stepper-icon>
      <tarmac-stepper-icon stepper-style="numeric" variant="ghost" size="lg"></tarmac-stepper-icon>
    `;
    return d;
  },
};
