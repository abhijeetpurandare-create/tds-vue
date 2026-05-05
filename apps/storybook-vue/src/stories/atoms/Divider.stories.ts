import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Atoms/Divider', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:400px';
    d.innerHTML = `
      <p>Content above</p>
      <tarmac-divider></tarmac-divider>
      <p>Content below</p>
      <tarmac-divider divider-type="dash"></tarmac-divider>
      <p>After dashed divider</p>
      <tarmac-divider size="1.5" color="#ED4136"></tarmac-divider>
      <p>After colored divider</p>
    `;
    return d;
  },
};

export const Vertical: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:16px;align-items:center;height:40px';
    d.innerHTML = `
      <span>Left</span>
      <tarmac-divider orientation="vertical"></tarmac-divider>
      <span>Center</span>
      <tarmac-divider orientation="vertical" divider-type="dash"></tarmac-divider>
      <span>Right</span>
    `;
    return d;
  },
};
