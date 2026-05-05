import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Atoms/Chip', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Standard: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    d.innerHTML = `
      <tarmac-chip chip-type="black">Black</tarmac-chip>
      <tarmac-chip chip-type="blue">Blue</tarmac-chip>
      <tarmac-chip chip-type="success">Success</tarmac-chip>
      <tarmac-chip chip-type="error">Error</tarmac-chip>
      <tarmac-chip chip-type="warning">Warning</tarmac-chip>
      <tarmac-chip chip-type="coal">Coal</tarmac-chip>
      <tarmac-chip chip-type="dlv_red">DLV Red</tarmac-chip>
    `;
    return d;
  },
};

export const Outlined: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    d.innerHTML = `
      <tarmac-chip chip-type="black" chip-variant="outlined">Black</tarmac-chip>
      <tarmac-chip chip-type="blue" chip-variant="outlined">Blue</tarmac-chip>
      <tarmac-chip chip-type="success" chip-variant="outlined">Success</tarmac-chip>
      <tarmac-chip chip-type="error" chip-variant="outlined">Error</tarmac-chip>
    `;
    return d;
  },
};

export const Sizes: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px;align-items:center';
    d.innerHTML = `
      <tarmac-chip chip-type="blue" size="sm">Small</tarmac-chip>
      <tarmac-chip chip-type="blue" size="md">Medium</tarmac-chip>
      <tarmac-chip chip-type="blue" size="lg">Large</tarmac-chip>
    `;
    return d;
  },
};
