import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Atoms/StatusIndicator', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const AllVariants: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-wrap:wrap;gap:16px';
    d.innerHTML = `
      <tarmac-status-indicator variant="success" label="Delivered"></tarmac-status-indicator>
      <tarmac-status-indicator variant="failed" label="Failed"></tarmac-status-indicator>
      <tarmac-status-indicator variant="warning" label="Delayed"></tarmac-status-indicator>
      <tarmac-status-indicator variant="information" label="In Transit"></tarmac-status-indicator>
      <tarmac-status-indicator variant="pending" label="Pending"></tarmac-status-indicator>
      <tarmac-status-indicator variant="scheduled" label="Scheduled"></tarmac-status-indicator>
      <tarmac-status-indicator variant="unknown" label="Unknown"></tarmac-status-indicator>
    `;
    return d;
  },
};
