import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Overlay/Modal', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    const btn = document.createElement('tarmac-button');
    btn.setAttribute('text', 'Open Modal');
    btn.setAttribute('variant', 'primary');
    btn.addEventListener('tarmac-click', () => {
      modal.setAttribute('is-open', '');
    });

    const modal = document.createElement('tarmac-modal');
    modal.setAttribute('size', 'md');
    modal.setAttribute('title', 'Shipment Details');
    modal.innerHTML = '<div style="padding:16px"><p>AWB: 1234567890</p><p>Status: In Transit</p><p>Origin: Mumbai Hub</p></div>';
    modal.addEventListener('tarmac-close', () => {
      modal.removeAttribute('is-open');
    });

    d.appendChild(btn);
    d.appendChild(modal);
    return d;
  },
};
