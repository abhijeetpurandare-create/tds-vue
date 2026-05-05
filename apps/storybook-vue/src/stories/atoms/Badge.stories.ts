import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = { title: 'Atoms/Badge', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const AllVariants: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;align-items:center';
    d.innerHTML = `
      <tarmac-badge variant="black">Black</tarmac-badge>
      <tarmac-badge variant="white">White</tarmac-badge>
      <tarmac-badge variant="coal">Coal</tarmac-badge>
      <tarmac-badge variant="dlv_red">DLV Red</tarmac-badge>
      <tarmac-badge variant="info">Info</tarmac-badge>
      <tarmac-badge variant="success">Success</tarmac-badge>
      <tarmac-badge variant="warning">Warning</tarmac-badge>
      <tarmac-badge variant="error">Error</tarmac-badge>
      <tarmac-badge variant="cardbox">Cardbox</tarmac-badge>
    `;
    return d;
  },
};

export const Sizes: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px;align-items:center';
    d.innerHTML = `
      <tarmac-badge variant="info" size="sm">Small</tarmac-badge>
      <tarmac-badge variant="info" size="md">Medium</tarmac-badge>
      <tarmac-badge variant="info" size="lg">Large</tarmac-badge>
    `;
    return d;
  },
};

export const States: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px;align-items:center';
    d.innerHTML = `
      <tarmac-badge variant="success">Normal</tarmac-badge>
      <tarmac-badge variant="success" show-status>With Status</tarmac-badge>
      <tarmac-badge variant="success" is-disabled>Disabled</tarmac-badge>
      <tarmac-badge variant="success" is-ghost>Ghost</tarmac-badge>
    `;
    return d;
  },
};
