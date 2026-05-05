import React, { lazy, Suspense } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite'; // Import Storybook types

const BusinessPill = lazy(() => import('component-library/BusinessPill')
  .catch(err => {
    console.error('Error loading BusinessPill component:', err);
    return { default: () => <div className="error-fallback">Failed to load BusinessPill component</div> };
  })
);

// Wrapper component to handle loading and error states
const BusinessPillWrapper = (props: any) => (
  <Suspense fallback={<div>Loading BusinessPill component...</div>}>
    <BusinessPill {...props} />
  </Suspense>
);

const meta: Meta<typeof BusinessPill> = {
  title: 'Molecule/BusinessPill',
  component: BusinessPillWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content for the pill',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BusinessPill>;

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
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <BusinessPill {...args} text="Default" />
        <BusinessPill {...args} text="Delivered" />
        <BusinessPill {...args} text="Cancelled" />
        <BusinessPill {...args} text="Out for delivery" />
        <BusinessPill {...args} text="In Transit" />
      </div>
    </div>
  ),
};

// Size Examples
export const Sizes: Story = {
  args: {
    text: 'default',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <BusinessPill {...args} size="sm" text="Delivered" />
        <BusinessPill {...args} size="md" text="Delivered" />
        <BusinessPill {...args} size="lg" text="Delivered" />
      </div>
    </div>
  ),
};

// With Icon
export const WithIcon: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <BusinessPill {...args} icon={<InfoIcon />} text="In Transit" />
        <BusinessPill {...args} text="In Transit" />

      </div>
    </div>
  ),
};

// Closable Examples
export const status: Story = {
  args: {
    variant: 'default',
    size: 'sm',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className='flex flex-col gap-4'>
          <span>Out For Delivery</span>
          <BusinessPill text="Out For Delivery" closeable {...args}  />
        </div>
        <div className='flex flex-col gap-4'>
          <span>Out for Delivery</span>
          <BusinessPill text="Out for Delivery" {...args}  />
        </div>
        <div className='flex flex-col gap-4'>
          <span>Out_For_Delivery</span>
          <BusinessPill text="Out_For_Delivery" {...args}  />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className='flex flex-col gap-4'>
          <span>COD</span>
          <BusinessPill text="COD" closeable {...args}  />
        </div>
        <div className='flex flex-col gap-4'>
          <span>Cash on delivery</span>
          <BusinessPill text="Cash on delivery" {...args}  />
        </div>
        <div className='flex flex-col gap-4'>
          <span>cash_on_delivery</span>
          <BusinessPill text="cash_on_delivery" {...args}  />
        </div>

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
      <BusinessPill {...args} closable  text="Out for Delivery" />
      <BusinessPill {...args} text="Out for Delivery" />
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
        <BusinessPill {...args} backgroundColor="red" color="#FFFFFF" text="Delivered" />
        <BusinessPill {...args} radius="rounded" text="Default" />
        <BusinessPill {...args} borderColor="#7C3AED" text="In Transit" />
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
        <BusinessPill {...args} onClick={() => alert('Pill clicked!')} text="Cancelled" />
      </div>
    </div>
  ),
};