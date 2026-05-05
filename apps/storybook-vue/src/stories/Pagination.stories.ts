import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Tarmac TDS/Pagination',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'centered' },
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'padding:48px;text-align:center;color:#6b6b6b;font-family:Noto Sans,sans-serif;';
    div.innerHTML = `
      <h2 style="color:#2b2b2b;">Pagination</h2>
      <p>Complex compound component — see React Storybook for full showcase.</p>
      <p style="font-size:12px;">This component requires React-specific patterns (portals, context, compound children) that don't map directly to Web Components.</p>
    `;
    return div;
  },
};
