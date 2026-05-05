import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Overlay/Tooltip', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:24px;padding:60px';
    d.innerHTML = `
      <tarmac-tooltip content="Track your shipment" placement="top" variant="black"><tarmac-button text="Hover me (top)" size="sm"></tarmac-button></tarmac-tooltip>
      <tarmac-tooltip content="View order details" placement="bottom" variant="white"><tarmac-button text="Hover me (bottom)" size="sm"></tarmac-button></tarmac-tooltip>
      <tarmac-tooltip content="Delivery info" placement="right" variant="coal"><tarmac-button text="Hover me (right)" size="sm"></tarmac-button></tarmac-tooltip>
    `;
    return d;
  },
};
