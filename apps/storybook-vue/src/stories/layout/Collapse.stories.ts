import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Layout/Collapse', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'width:400px';
    d.innerHTML = `
      <tarmac-collapse active-key="p1">
        <div data-key="p1" data-title="Shipment Details">AWB: 1234567890 — In Transit from Mumbai Hub</div>
        <div data-key="p2" data-title="Delivery Address">123 Main Street, Sector 5, Delhi NCR 110001</div>
        <div data-key="p3" data-title="Payment Info">COD — ₹1,250.00</div>
      </tarmac-collapse>
    `;
    return d;
  },
};

export const Accordion: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'width:400px';
    d.innerHTML = `
      <tarmac-collapse accordion>
        <div data-key="faq1" data-title="How do I track my order?">Use the AWB number on our tracking page.</div>
        <div data-key="faq2" data-title="What is the delivery time?">Standard delivery takes 3-5 business days.</div>
        <div data-key="faq3" data-title="Can I reschedule delivery?">Yes, contact support or use the app.</div>
      </tarmac-collapse>
    `;
    return d;
  },
};
