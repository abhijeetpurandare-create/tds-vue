import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Atoms/Link', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:12px';
    d.innerHTML = `
      <tarmac-link link-style="blue" size="md" text="Track your shipment" href="#"></tarmac-link>
      <tarmac-link link-style="black" size="md" text="View order details" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="sm" text="Small link" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="lg" text="Large link" href="#"></tarmac-link>
      <tarmac-link link-style="blue" size="md" text="Disabled link" is-disabled href="#"></tarmac-link>
    `;
    return d;
  },
};
