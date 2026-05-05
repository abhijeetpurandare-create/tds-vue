import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Navigation/TabCell', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:0';
    d.innerHTML = `
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="All Orders" is-pressed></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="In Transit"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="Delivered"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="Returned"></tarmac-tab-cell>
    `;
    return d;
  },
};

export const ButtonType: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:8px';
    d.innerHTML = `
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Active" is-pressed></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Inactive"></tarmac-tab-cell>
      <tarmac-tab-cell tab-type="button" tab-style="blue" size="lg" title="Disabled" is-disabled></tarmac-tab-cell>
    `;
    return d;
  },
};
