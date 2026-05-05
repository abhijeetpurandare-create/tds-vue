import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '@delhivery/tarmac';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the spinner',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'The visual style of the spinner',
      defaultValue: 'default',
    },
    color: {
      control: 'color',
      description: 'Custom color for the spinner',
    },
    trackColor: {
      control: 'color',
      description: 'Custom color for the spinner track',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    style: {
      control: 'object',
      description: 'Custom styles for the spinner',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// Size Examples
export const Sizes: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} size="sm" />
        <span className="text-sm">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} size="md" />
        <span className="text-sm">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} size="lg" />
        <span className="text-sm">Large</span>
      </div>
    </div>
  ),
};

// Variant Examples
export const Variants: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} variant="default" />
        <span className="text-sm">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} variant="primary" />
        <span className="text-sm">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} variant="secondary" />
        <span className="text-sm">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} variant="success" />
        <span className="text-sm">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} variant="error" />
        <span className="text-sm">Error</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} variant="warning" />
        <span className="text-sm">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} variant="info" />
        <span className="text-sm">Info</span>
      </div>
    </div>
  ),
};

// Custom Styling Examples
export const CustomStyling: Story = {
  args: {
    size: 'md',
    variant: 'default',
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} color="#FF5733" trackColor="#FFE5E0" />
        <span className="text-sm">Custom Colors</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} style={{ transform: 'scale(1.5)' }} />
        <span className="text-sm">Custom Scale</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner {...args} className="shadow-lg" />
        <span className="text-sm">With Shadow</span>
      </div>
    </div>
  ),
}; 