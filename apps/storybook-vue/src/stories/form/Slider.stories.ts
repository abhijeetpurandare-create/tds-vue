import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Form/Slider', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:24px;width:400px';
    d.innerHTML = `
      <div><span style="font-size:13px;color:#6b6b6b">Black (lg):</span><tarmac-slider variant="black" size="lg" value="40"></tarmac-slider></div>
      <div><span style="font-size:13px;color:#6b6b6b">Coal (sm):</span><tarmac-slider variant="coal" size="sm" value="60"></tarmac-slider></div>
      <div><span style="font-size:13px;color:#6b6b6b">DLV Red (lg):</span><tarmac-slider variant="dlv_red" size="lg" value="75"></tarmac-slider></div>
      <div><span style="font-size:13px;color:#6b6b6b">Disabled:</span><tarmac-slider variant="black" size="lg" value="50" is-disabled></tarmac-slider></div>
    `;
    return d;
  },
};
