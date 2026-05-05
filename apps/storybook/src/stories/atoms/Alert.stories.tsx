import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from  "@delhivery/tarmac";

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'destructive', 'success', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    closable: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Icons for examples
const InfoIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const Default: Story = {
  args: {
    children: 'This is a default alert',
  },
};

export const WithVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default">This is a default alert</Alert>
      <Alert variant="primary">This is a primary alert</Alert>
      <Alert variant="destructive">This is a destructive alert</Alert>
      <Alert variant="success">This is a success alert</Alert>
      <Alert variant="warning">This is a warning alert</Alert>
      <Alert variant="info">This is an info alert</Alert>
    </div>
  ),
};

export const WithSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert size="sm">This is a small alert</Alert>
      <Alert size="md">This is a medium alert</Alert>
      <Alert size="lg">This is a large alert</Alert>
    </div>
  ),
};

export const WithTitleAndDescription: Story = {
  args: {
    title: 'Alert Title',
    description: 'This is a more detailed description of the alert that provides additional context.',
    variant: 'primary',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <InfoIcon />,
    title: 'Alert with Icon',
    description: 'This alert includes an icon to draw attention.',
    variant: 'info',
  },
};

export const Closable: Story = {
  args: {
    title: 'Closable Alert',
    description: 'This alert can be dismissed by clicking the close button.',
    closable: true,
    onClose: () => console.log('Alert closed'),
    variant: 'warning',
  },
};

export const AllFeatures: Story = {
  render: () => (
    <div className="space-y-4">
      {/* Simple Alert */}
      <Alert>A simple alert</Alert>

      {/* Alert with title and description */}
      <Alert
        variant="primary"
        title="Important Update"
        description="This is an important update about your account."
      />

      {/* Alert with icon */}
      <Alert
        variant="info"
        icon={<InfoIcon />}
        title="Information"
        description="Here's some useful information for you."
      />

      {/* Closable Alert */}
      <Alert
        variant="warning"
        title="Warning"
        description="This is a warning that you can dismiss."
        closable
        onClose={() => console.log('Alert closed')}
      />

      {/* Success Alert with all features */}
      <Alert
        variant="success"
        size="lg"
        icon={<InfoIcon />}
        title="Operation Successful"
        description="Your changes have been saved successfully."
        closable
        onClose={() => console.log('Success alert closed')}
      />

      {/* Destructive Alert with all features */}
      <Alert
        variant="destructive"
        size="sm"
        icon={<InfoIcon />}
        title="Error Occurred"
        description="Something went wrong. Please try again."
        closable
        onClose={() => console.log('Error alert closed')}
      />
    </div>
  ),
}; 