import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {  FloatingButton } from '@delhivery/tarmac';

const meta: Meta<typeof FloatingButton> = {
  title: 'Atoms/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'The visual style of the button',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      defaultValue: 'md',
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'The position of the floating button',
      defaultValue: 'bottom-right',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      defaultValue: false,
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    isRounded: {
      control: 'boolean',
      description: 'Whether the button has rounded corners',
      defaultValue: true,
    },
    text: {
      control: 'text',
      description: 'Text content for the button',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color for the button',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color for the button',
    },
    hoverColor: {
      control: 'color',
      description: 'Custom hover color for the button',
    },
    disabledColor: {
      control: 'color',
      description: 'Custom disabled color for the button',
    },
    radius: {
      control: 'text',
      description: 'Custom border radius for the button',
    },
    border: {
      control: 'text',
      description: 'Custom border style for the button',
    },
    shadow: {
      control: 'text',
      description: 'Custom shadow style for the button',
    },
    zIndex: {
      control: 'number',
      description: 'Custom z-index for the button',
      defaultValue: 10,
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingButton>;

// Icon for examples
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Basic Button Examples
export const Default: Story = {
  args: {
    icon: <PlusIcon />,
  },
};

export const WithText: Story = {
  args: {
    icon: <PlusIcon />,
    text: 'Add New',
  },
};

// Variant Examples
export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: <PlusIcon />,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    icon: <PlusIcon />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    icon: <PlusIcon />,
  },
};

// Size Examples
export const Small: Story = {
  args: {
    size: 'sm',
    icon: <PlusIcon />,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    icon: <PlusIcon />,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    icon: <PlusIcon />,
  },
};

// Position Examples
export const TopLeft: Story = {
  args: {
    position: 'top-left',
    icon: <PlusIcon />,
  },
};

export const TopRight: Story = {
  args: {
    position: 'top-right',
    icon: <PlusIcon />,
  },
};

export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
    icon: <PlusIcon />,
  },
};

export const BottomRight: Story = {
  args: {
    position: 'bottom-right',
    icon: <PlusIcon />,
  },
};

// State Examples
export const Loading: Story = {
  args: {
    isLoading: true,
    icon: <PlusIcon />,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    icon: <PlusIcon />,
  },
};

// Custom Styling Examples
export const CustomColors: Story = {
  args: {
    backgroundColor: '#8B5CF6',
    hoverColor: '#7C3AED',
    icon: <PlusIcon />,
  },
};

export const CustomBorder: Story = {
  args: {
    border: '2px dashed #E5E7EB',
    icon: <PlusIcon />,
  },
};

export const CustomShadow: Story = {
  args: {
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    icon: <PlusIcon />,
  },
};

export const CustomRadius: Story = {
  args: {
    radius: '1rem',
    icon: <PlusIcon />,
  },
};

// With Custom Icon
export const CustomIcon: Story = {
  args: {
    icon: <span style={{ fontSize: '1.5rem' }}>+</span>,
  },
};