import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Atoms/Avatar', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Initials: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center';
    d.innerHTML = `
      <tarmac-avatar size="sm">AB</tarmac-avatar>
      <tarmac-avatar size="md">CD</tarmac-avatar>
      <tarmac-avatar size="lg">EF</tarmac-avatar>
      <tarmac-avatar size="xl">GH</tarmac-avatar>
    `;
    return d;
  },
};

export const Shapes: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center';
    d.innerHTML = `
      <tarmac-avatar size="lg" shape="round">RD</tarmac-avatar>
      <tarmac-avatar size="lg" shape="square">SQ</tarmac-avatar>
    `;
    return d;
  },
};

export const StatusDot: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:16px;align-items:center';
    d.innerHTML = `
      <tarmac-avatar size="lg" show-status status-type="active">ON</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="inactive">OF</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="idle">ID</tarmac-avatar>
      <tarmac-avatar size="lg" show-status status-type="brand">BR</tarmac-avatar>
    `;
    return d;
  },
};

export const States: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:12px;align-items:center';
    d.innerHTML = `
      <tarmac-avatar size="lg">OK</tarmac-avatar>
      <tarmac-avatar size="lg" is-disabled>DI</tarmac-avatar>
      <tarmac-avatar size="lg" is-ghost>GH</tarmac-avatar>
    `;
    return d;
  },
};
