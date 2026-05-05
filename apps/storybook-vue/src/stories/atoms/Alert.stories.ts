import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Alert',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'error', 'warning', 'info', 'white', 'black', 'coal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    alertStyle: { control: 'select', options: ['singleText', 'dualText'] },
    title: { control: 'text' },
    description: { control: 'text' },
    closable: { control: 'boolean' },
    showCtas: { control: 'boolean' },
  },
  render: (args) => {
    const el = document.createElement('tarmac-alert');
    if (args.variant) el.setAttribute('variant', args.variant);
    if (args.size) el.setAttribute('size', args.size);
    if (args.alertStyle) el.setAttribute('alert-style', args.alertStyle);
    if (args.title) el.setAttribute('title', args.title);
    if (args.description) el.setAttribute('description', args.description);
    if (args.closable) el.setAttribute('closable', '');
    if (args.showCtas) el.setAttribute('show-ctas', '');
    return el;
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { args: { variant: 'info', title: 'Shipment is in transit', size: 'lg' } };

export const AllVariants: Story = {
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-direction:column;gap:12px;max-width:480px';
    div.innerHTML = `
      <tarmac-alert variant="success" title="Order delivered successfully"></tarmac-alert>
      <tarmac-alert variant="error" title="Delivery attempt failed"></tarmac-alert>
      <tarmac-alert variant="info" title="Shipment is in transit"></tarmac-alert>
      <tarmac-alert variant="warning" title="Address verification pending"></tarmac-alert>
    `;
    return div;
  },
};

export const DualText: Story = {
  args: { variant: 'warning', alertStyle: 'dualText', title: 'Shipment Delayed', description: 'Your package is delayed due to weather conditions. Expected delivery by tomorrow.', size: 'lg' },
};

export const Closable: Story = {
  args: { variant: 'success', title: 'Manifest uploaded — 245 orders added', closable: true },
};

export const WithCTAs: Story = {
  args: { variant: 'error', alertStyle: 'dualText', title: 'Shipment Delayed', description: 'This shipment has exceeded the expected delivery window.', showCtas: true, size: 'lg' },
};
