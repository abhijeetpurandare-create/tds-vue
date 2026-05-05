import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Atoms/Spinner', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:16px;align-items:center';
    d.innerHTML = `
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="24px"></tarmac-spinner>
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="32px"></tarmac-spinner>
      <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="44px"></tarmac-spinner>
    `;
    return d;
  },
};

export const Legacy: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:16px;align-items:center';
    d.innerHTML = `
      <tarmac-spinner variant="primary" size="sm"></tarmac-spinner>
      <tarmac-spinner variant="success" size="md"></tarmac-spinner>
      <tarmac-spinner variant="error" size="lg"></tarmac-spinner>
    `;
    return d;
  },
};
