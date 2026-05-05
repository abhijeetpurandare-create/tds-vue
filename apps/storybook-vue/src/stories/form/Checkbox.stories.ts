import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Form/Checkbox', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:12px';
    d.innerHTML = `
      <tarmac-checkbox tarmac-variant="standard" checked>Standard (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="blue" checked>Blue (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="green" checked>Green (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="dlv_red" checked>DLV Red (checked)</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard">Unchecked</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard" indeterminate>Indeterminate</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="standard" disabled>Disabled</tarmac-checkbox>
    `;
    return d;
  },
};

export const WithSubtext: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px';
    d.innerHTML = `
      <tarmac-checkbox tarmac-variant="standard" subtext="Receive SMS updates for this shipment">Enable notifications</tarmac-checkbox>
      <tarmac-checkbox tarmac-variant="blue" tarmac-style="rounded" subtext="I agree to the terms and conditions">Accept terms</tarmac-checkbox>
    `;
    return d;
  },
};
