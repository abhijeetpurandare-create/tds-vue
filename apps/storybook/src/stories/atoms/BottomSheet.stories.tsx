import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {  BottomSheet } from '@delhivery/tarmac';

const meta: Meta<typeof BottomSheet> = {
  title: 'Atoms/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the bottom sheet is visible',
      defaultValue: false,
    },
    title: {
      control: 'text',
      description: 'Title of the bottom sheet',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the bottom sheet can be closed',
      defaultValue: true,
    },
    maskClosable: {
      control: 'boolean',
      description: 'Whether clicking the mask closes the bottom sheet',
      defaultValue: true,
    },
    loading: {
      control: 'boolean',
      description: 'Whether the bottom sheet is in a loading state',
      defaultValue: false,
    },
    zIndex: {
      control: 'number',
      description: 'Custom z-index of the bottom sheet',
      defaultValue: 1000,
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

// Basic BottomSheet Examples
export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Basic Bottom Sheet',
    children: 'This is a basic bottom sheet content.',
  },
};

export const WithTitle: Story = {
  args: {
    isOpen: true,
    title: 'Bottom Sheet with Title',
    children: 'This bottom sheet has a title.',
  },
};

// State Examples
export const Loading: Story = {
  args: {
    isOpen: true,
    title: 'Loading Bottom Sheet',
    loading: true,
    children: 'This bottom sheet is loading.',
  },
};

export const NotClosable: Story = {
  args: {
    isOpen: true,
    title: 'Not Closable Bottom Sheet',
    closable: false,
    children: 'This bottom sheet cannot be closed.',
  },
};

export const MaskNotClosable: Story = {
  args: {
    isOpen: true,
    title: 'Mask Not Closable Bottom Sheet',
    maskClosable: false,
    children: 'Clicking the mask will not close this bottom sheet.',
  },
};

// With Footer
export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Bottom Sheet with Footer',
    children: 'This bottom sheet has a footer.',
    footer: (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button onClick={() => {}}>Cancel</button>
        <button onClick={() => {}}>OK</button>
      </div>
    ),
  },
};

// With Custom Close Icon
export const CustomCloseIcon: Story = {
  args: {
    isOpen: true,
    title: 'Custom Close Icon',
    closeIcon: <span>×</span>,
    children: 'This bottom sheet has a custom close icon.',
  },
};

// With Loading Button
export const WithLoadingButton: Story = {
  args: {
    isOpen: true,
    title: 'Loading Button Bottom Sheet',
    children: 'This bottom sheet has a loading button.',
    okButtonProps: {
      loading: true,
      text: 'Loading...',
    },
  },
};

// With Disabled Buttons
export const WithDisabledButtons: Story = {
  args: {
    isOpen: true,
    title: 'Disabled Buttons Bottom Sheet',
    children: 'This bottom sheet has disabled buttons.',
    okButtonProps: {
      disabled: true,
      text: 'OK',
    },
    cancelButtonProps: {
      disabled: true,
      text: 'Cancel',
    },
  },
};

// With Long Content
export const LongContent: Story = {
  args: {
    isOpen: true,
    title: 'Long Content Bottom Sheet',
    children: (
      <div style={{ padding: '20px' }}>
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index}>This is line {index + 1} of the bottom sheet content.</p>
        ))}
      </div>
    ),
  },
}; 