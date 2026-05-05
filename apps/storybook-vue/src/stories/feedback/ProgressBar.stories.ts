import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Feedback/ProgressBar', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:20px;width:400px';
    d.innerHTML = `
      <div><span style="font-size:13px;color:#6b6b6b">Primary 65%:</span><tarmac-progress-bar value="65" variant="primary" size="md" show-percentage></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Success 100%:</span><tarmac-progress-bar value="100" variant="success" size="md" show-percentage></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Error 30%:</span><tarmac-progress-bar value="30" variant="error" size="lg"></tarmac-progress-bar></div>
      <div><span style="font-size:13px;color:#6b6b6b">Warning 50%:</span><tarmac-progress-bar value="50" variant="warning" size="sm"></tarmac-progress-bar></div>
    `;
    return d;
  },
};
