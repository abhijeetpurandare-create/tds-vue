import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from '@delhivery/tarmac';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
      defaultValue: 50,
    },
    type: {
      control: 'select',
      options: ['horizontal', 'circular'],
      description: 'Progress bar type',
      defaultValue: 'horizontal',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress bar',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info', 'default'],
      description: 'Color variant',
      defaultValue: 'primary',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage label',
      defaultValue: true,
    },
    icon: {
      control: false,
      description: 'Optional icon (used if showPercentage is false)',
    },
    gradientFrom: {
      control: 'color',
      description: 'Custom gradient start color',
    },
    gradientTo: {
      control: 'color',
      description: 'Custom gradient end color',
    },
    trackColor: {
      control: 'color',
      description: 'Track background color',
    },
    textColor: {
      control: 'color',
      description: 'Text color for label',
    },
    strokeWidth: {
      control: 'number',
      description: 'Stroke width for circular type',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    style: {
      control: 'object',
      description: 'Custom style object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

// ✅ Fixed: Wrap in container to ensure width in Docs tab
export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <ProgressBar {...args} />
    </div>
  ),
  args: {
    value: 60,
    type: 'horizontal',
    size: 'md',
    variant: 'primary',
    showPercentage: true,
  },
};

export const Circular: Story = {
  args: {
    value: 75,
    type: 'circular',
    size: 'md',
    variant: 'success',
    showPercentage: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 200 }}>
      <ProgressBar {...args} size="sm" value={30} />
      <ProgressBar {...args} size="md" value={60} />
      <ProgressBar {...args} size="lg" value={90} />
    </div>
  ),
  args: {
    type: 'horizontal',
    variant: 'info',
    showPercentage: true,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 200 }}>
      <ProgressBar {...args} variant="primary" value={20} />
      <ProgressBar {...args} variant="success" value={40} />
      <ProgressBar {...args} variant="warning" value={60} />
      <ProgressBar {...args} variant="error" value={80} />
      <ProgressBar {...args} variant="info" value={100} />
      <ProgressBar {...args} variant="default" value={50} />
    </div>
  ),
  args: {
    type: 'horizontal',
    showPercentage: true,
  },
};

// Local icon component for story
const UserIcon = ({ colored }: { colored?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke={colored ? '#2b74e4' : 'currentColor'}
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0v.75H4.5v-.75z"
    />
  </svg>
);

export const WithUserIcon: Story = {
  args: {
    value: 100,
    type: 'circular',
    size: 'md',
    variant: 'success',
    showPercentage: false,
    icon: <UserIcon colored={false} />, // or true for colored version
  },
};

export const CustomColors: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <ProgressBar {...args} />
    </div>
  ),
  args: {
    value: 70,
    type: 'horizontal',
    size: 'lg',
    gradientFrom: '#ff7e5f',
    gradientTo: '#feb47b',
    trackColor: '#eee',
    textColor: '#222',
    showPercentage: true,
  },
};
