import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'black', 'white', 'info', 'success', 'error', 'warning', 'dlv_red', 'coal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    buttonStyle: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    text: { control: 'text' },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    isRounded: { control: 'boolean' },
    isGhost: { control: 'boolean' },
  },
  render: (args) => {
    const el = document.createElement('tarmac-button');
    el.setAttribute('variant', args.variant || 'primary');
    el.setAttribute('size', args.size || 'md');
    el.setAttribute('button-style', args.buttonStyle || 'primary');
    if (args.text) el.setAttribute('text', args.text);
    if (args.disabled) el.setAttribute('disabled', '');
    if (args.isLoading) el.setAttribute('is-loading', '');
    if (args.isRounded) el.setAttribute('is-rounded', '');
    if (args.isGhost) el.setAttribute('is-ghost', '');
    if (!args.text) el.textContent = 'Button';
    return el;
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { args: { text: 'Track Shipment', variant: 'primary', size: 'md' } };

export const Sizes: Story = {
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;align-items:center;gap:12px';
    div.innerHTML = `
      <tarmac-button size="sm" text="Small"></tarmac-button>
      <tarmac-button size="md" text="Medium"></tarmac-button>
      <tarmac-button size="lg" text="Large"></tarmac-button>
    `;
    return div;
  },
};

export const Variants: Story = {
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px';
    div.innerHTML = `
      <tarmac-button variant="primary" text="Primary"></tarmac-button>
      <tarmac-button variant="secondary" text="Secondary"></tarmac-button>
      <tarmac-button variant="outline" text="Outline"></tarmac-button>
    `;
    return div;
  },
};

export const States: Story = {
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px';
    div.innerHTML = `
      <tarmac-button variant="primary" text="Normal"></tarmac-button>
      <tarmac-button variant="primary" text="Disabled" disabled></tarmac-button>
      <tarmac-button variant="primary" text="Loading" is-loading></tarmac-button>
      <tarmac-button variant="primary" text="Rounded" is-rounded></tarmac-button>
      <tarmac-button variant="primary" text="Ghost" is-ghost></tarmac-button>
    `;
    return div;
  },
};

export const CustomColors: Story = {
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;gap:12px';
    div.innerHTML = `
      <tarmac-button background-color="#ED4136" text-color="white" hover-color="#c4352c" text="Delhivery Red"></tarmac-button>
      <tarmac-button background-color="#5b80f7" text-color="white" hover-color="#4a6cd4" is-rounded text="Delhivery Blue"></tarmac-button>
    `;
    return div;
  },
};
