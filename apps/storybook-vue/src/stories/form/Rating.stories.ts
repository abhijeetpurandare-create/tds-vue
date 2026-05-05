import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Form/Rating', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px';
    d.innerHTML = `
      <div><span style="font-size:13px;color:#6b6b6b">Interactive:</span><br/><tarmac-rating value="3" size="lg"></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Read-only:</span><br/><tarmac-rating value="4" size="lg" read-only></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Half stars:</span><br/><tarmac-rating value="3.5" size="lg" allow-half read-only></tarmac-rating></div>
      <div><span style="font-size:13px;color:#6b6b6b">Sizes:</span><br/>
        <div style="display:flex;gap:16px;align-items:center">
          <tarmac-rating value="4" size="sm" read-only></tarmac-rating>
          <tarmac-rating value="4" size="md" read-only></tarmac-rating>
          <tarmac-rating value="4" size="lg" read-only></tarmac-rating>
        </div>
      </div>
    `;
    return d;
  },
};
