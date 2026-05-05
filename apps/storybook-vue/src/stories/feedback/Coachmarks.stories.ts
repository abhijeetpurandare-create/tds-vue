import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Feedback/Coachmarks', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;gap:24px;padding:40px';
    d.innerHTML = `
      <tarmac-coachmarks variant="white" size="lg" arrow-position="top-center" title="New Feature" description="Track your shipments in real-time with our updated dashboard."></tarmac-coachmarks>
      <tarmac-coachmarks variant="black" size="sm" arrow-position="bottom-center" title="Quick Tip" description="Click here to upload your manifest."></tarmac-coachmarks>
    `;
    return d;
  },
};
