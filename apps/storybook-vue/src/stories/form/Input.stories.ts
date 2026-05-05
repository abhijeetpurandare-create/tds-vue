import type { Meta, StoryObj } from '@storybook/html';
const meta: Meta = { title: 'Form/Input', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Types: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:320px';
    d.innerHTML = `
      <tarmac-input label="Tracking ID" input-type="regular" placeholder="Enter AWB number" input-size="md"></tarmac-input>
      <tarmac-input label="Verified" input-type="success" placeholder="Valid AWB" input-size="md"></tarmac-input>
      <tarmac-input label="Invalid" input-type="error" placeholder="Invalid AWB" status-text="Please enter a valid AWB" input-size="md"></tarmac-input>
      <tarmac-input label="Info" input-type="infoBlue" placeholder="Info input" input-size="md"></tarmac-input>
    `;
    return d;
  },
};

export const Sizes: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:320px';
    d.innerHTML = `
      <tarmac-input label="Small" input-size="sm" placeholder="Small input"></tarmac-input>
      <tarmac-input label="Medium" input-size="md" placeholder="Medium input"></tarmac-input>
      <tarmac-input label="Large" input-size="lg" placeholder="Large input"></tarmac-input>
    `;
    return d;
  },
};

export const States: Story = {
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:320px';
    d.innerHTML = `
      <tarmac-input label="Disabled" is-disabled value="ORD-2024-78901" input-size="md"></tarmac-input>
      <tarmac-input label="Ghost" is-ghost placeholder="Loading..." input-size="md"></tarmac-input>
      <tarmac-input label="Mandatory" is-mandatory placeholder="Required field" input-size="md"></tarmac-input>
    `;
    return d;
  },
};
