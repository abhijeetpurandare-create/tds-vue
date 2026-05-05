import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pill } from '@delhivery/tarmac';

const meta: Meta<typeof Pill> = {
  title: 'Atoms/Pill',
  component: Pill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the pill',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'danger', 'warning', 'info'],
      description: 'The visual style of the pill',
      defaultValue: 'default',
    },
    color: {
      control: 'color',
      description: 'Custom text color for the pill',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color for the pill',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color for the pill',
    },
    text: {
      control: 'text',
      description: 'Text content for the pill',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the pill can be closed',
      defaultValue: false,
    },
    visible: {
      control: 'boolean',
      description: 'Whether the pill is visible',
      defaultValue: true,
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the pill has a border',
      defaultValue: true,
    },
    onClick: {
      description: 'Callback function when pill is clicked',
    },
    onClose: {
      description: 'Callback function when close button is clicked',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

// Icon for examples
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// Basic Examples
export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Pill {...args} text="Default Pill" />
        <Pill {...args} variant="success" text="Success Pill" />
        <Pill {...args} variant="danger" text="Danger Pill" />
        <Pill {...args} variant="warning" text="Warning Pill" />
        <Pill {...args} variant="info" text="Info Pill" />
      </div>
    </div>
  ),
};

// Size Examples
export const Sizes: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Pill {...args} size="sm" text="Small Pill" />
        <Pill {...args} size="md" text="Medium Pill" />
        <Pill {...args} size="lg" text="Large Pill" />
      </div>
    </div>
  ),
};

// With Icon
export const WithIcon: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Pill {...args} icon={<InfoIcon />} text="Pill with Icon" />
        <Pill {...args} text="Pill without Icon" />
      </div>
    </div>
  ),
};

// Closable Examples
export const Closable: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Pill {...args} closable text="Closable Pill" />
        <Pill {...args} closable closeIcon={<span>×</span>} text="Custom Close Icon" />
        <Pill {...args} text="Non-closable Pill" />
      </div>
    </div>
  ),
};

// Border Examples
export const Borders: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Pill {...args} bordered text="With Border" />
        <Pill {...args} bordered={false} text="No Border" />
      </div>
    </div>
  ),
};

// Custom Colors
export const CustomColors: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Pill {...args} backgroundColor="#8B5CF6" color="#FFFFFF" borderColor="#7C3AED" text="Custom Colors" />
        <Pill {...args} text="Default Colors" />
      </div>
    </div>
  ),
};

// Interactive Examples
export const Interactive: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Pill {...args} onClick={() => alert('Pill clicked!')} text="Clickable Pill" />
        <Pill {...args} visible={false} text="Hidden Pill" />
      </div>
    </div>
  ),
};