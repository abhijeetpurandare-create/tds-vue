import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '@delhivery/tarmac';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'The visual style of the card',
      defaultValue: 'elevated',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the card',
      defaultValue: 'md',
    },
    title: {
      control: 'text',
      description: 'Title of the card',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the card is in a loading state',
      defaultValue: false,
    },
    isHoverable: {
      control: 'boolean',
      description: 'Whether the card has hover effects',
      defaultValue: false,
    },
    isRounded: {
      control: 'boolean',
      description: 'Whether the card has rounded corners',
      defaultValue: false,
    },
    width: {
      control: 'text',
      description: 'Custom width of the card',
    },
    height: {
      control: 'text',
      description: 'Custom height of the card',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color for the card',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color for the card',
    },
    shadow: {
      control: 'text',
      description: 'Custom shadow style for the card',
    },
    radius: {
      control: 'text',
      description: 'Custom border radius for the card',
    },
    border: {
      control: 'text',
      description: 'Custom border style for the card',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card Examples
export const Default: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Card {...args}>Basic card content</Card>
        <Card {...args} title="Card Title">Card with a title</Card>
        <Card {...args} title="Card Title" extra={<span>Extra Content</span>}>Card with extra content in header</Card>
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Card {...args} variant="elevated" title="Elevated Card">This card has elevation</Card>
        <Card {...args} variant="outlined" title="Outlined Card">This card has a border</Card>
        <Card {...args} variant="flat" title="Flat Card">This card has no elevation or border</Card>
      </div>
    </div>
  ),
};

// Size Examples
export const Sizes: Story = {
  args: {
    variant: 'elevated',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Card {...args} size="sm" title="Small Card">This is a small card</Card>
        <Card {...args} size="md" title="Medium Card">This is a medium card</Card>
        <Card {...args} size="lg" title="Large Card">This is a large card</Card>
      </div>
    </div>
  ),
};

// State Examples
export const States: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Card {...args} title="Loading Card" isLoading={true}>This card is loading</Card>
        <Card {...args} title="Hoverable Card" isHoverable={true}>Hover over this card to see the effect</Card>
      </div>
    </div>
  ),
};

// With Cover Image
export const WithCover: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Card
          {...args}
          title="Card with Cover"
          cover={
            <img
              src="https://via.placeholder.com/300x200"
              alt="Cover"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          }
        >
          This card has a cover image
        </Card>
      </div>
    </div>
  ),
};

// With Actions
export const WithActions: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Card
          {...args}
          title="Card with Actions"
          actions={[
            <button key="1">Action 1</button>,
            <button key="2">Action 2</button>,
            <button key="3">Action 3</button>,
          ]}
        >
          This card has action buttons in the footer
        </Card>
      </div>
    </div>
  ),
};

// Custom Styling Examples
export const CustomStyling: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Card
          {...args}
          title="Custom Colors"
          backgroundColor="#F3F4F6"
          borderColor="#E5E7EB"
        >
          Card with custom colors
        </Card>
        <Card
          {...args}
          title="Custom Shadow"
          shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        >
          Card with custom shadow
        </Card>
        <Card
          {...args}
          title="Custom Border"
          border="2px dashed #E5E7EB"
        >
          Card with custom border style
        </Card>
      </div>
    </div>
  ),
};

// Custom Message Card
export const CustomMessageCard: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
    className: "w-2/4",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Card
          {...args}
        >
          <div className="p-4 bg-indigo-200 w-full rounded-md">
            <div className="flex justify-between">
              <div>
                <div className="text-[14px] font-medium text-default-black">Write the AWB on the package</div>
                <p className="text-[12px]">Please write <span className="font-medium">AWB# 1221910110563</span> on your package.</p>
              </div>
              <img src="data:image/png;base64,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" alt="write awb" />
              </div>
            </div>
        </Card>
      </div>
    </div>
  ),
};

 