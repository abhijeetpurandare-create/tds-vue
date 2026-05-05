import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {Modal} from '@delhivery/tarmac';

const meta: Meta<typeof Modal> = {
  title: 'Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is visible',
      defaultValue: true,
    },
    title: {
      control: 'text',
      description: 'Title of the modal',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the modal can be closed',
      defaultValue: true,
    },
    loading: {
      control: 'boolean',
      description: 'Whether the modal is in a loading state',
      defaultValue: false,
    },
    onClose: {
      control: 'function',
      description: 'Function to close the modal',
    },
    modalStyle: {
      control: 'object',
      description: 'Custom styles for the modal',
    },
    bottomsheetStyle: {
      control: 'object',
      description: 'Custom styles for the bottomsheet',
    },
    modalCrossButtonStyle: {
      control: 'object',
      description: 'Custom styles for the modal close button',
    },
    bottomsheetCrossButtonStyle: {
      control: 'object',
      description: 'Custom styles for the bottomsheet close button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Basic Modal Examples
export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Basic Modal',
    onClose: () => {},
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Modal {...args}>
        <p>This is a basic modal with default settings.</p>
      </Modal>
    </div>
  ),
};

// Basic Modal Examples
export const WithoutFooter: Story = {
  args: {
    isOpen: true,
    title: 'Basic Modal',
    onClose: () => {},
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
     <Modal {...args} title="Modal Without Footer" closable={false} footer={null} centered>
        <p>This modal cannot be closed.</p>
      </Modal>
    </div>
  ),
};

// Basic Modal Examples
export const WithCustomWidth: Story = {
  args: {
    isOpen: true,
    title: 'Basic Modal',
    onClose: () => {},
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Modal {...args} title="Custom Width Modal" modalStyle={{ width: '800px' }}>
        <p>This modal has a custom width.</p>
      </Modal>
    </div>
  ),
};

// State Examples
export const States: Story = {
  args: {
    isOpen: true,
    title: 'Modal States',
    onClose: () => {},
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Modal {...args} title="Loading Modal" loading={true}>
        <p>This modal is in a loading state.</p>
      </Modal>
      <Modal {...args} title="Not Closable Modal" closable={false}>
        <p>This modal cannot be closed.</p>
      </Modal>
      <Modal {...args} title="Custom Styled Modal" modalStyle={{ backgroundColor: '#f0f0f0' }}>
        <p>This modal has custom styles.</p>
      </Modal>
    </div>
  ),
};

// Content Examples
export const Content: Story = {
  args: {
    isOpen: true,
    title: 'Modal Content',
    onClose: () => {},
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Modal {...args} title="Simple Content">
        <p>This modal contains simple text content.</p>
      </Modal>
    </div>
  ),
};
// Content Examples
export const ComplexContent: Story = {
  args: {
    isOpen: true,
    title: 'Modal Content',
    onClose: () => {},
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Modal {...args} title="Complex Content">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Section 1</h3>
          <p>This is the first section of content.</p>
          <h3 className="text-lg font-semibold">Section 2</h3>
          <p>This is the second section of content.</p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Action Button
            </button>
          </div>
        </div>
      </Modal>
    </div>
  ),
};

// Content Examples
export const FormContent: Story = {
  args: {
    isOpen: true,
    title: 'Modal Content',
    onClose: () => {},
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Modal {...args} title="Form Content">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </form>
      </Modal>
    </div>
  ),
};