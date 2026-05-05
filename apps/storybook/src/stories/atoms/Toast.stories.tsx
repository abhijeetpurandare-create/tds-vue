import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, toast, ToastManager } from '@delhivery/tarmac';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faCircleCheck, 
  faCircleExclamation, 
  faCircleInfo 
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Toast> = {
  title: 'Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top', 'bottom'],
    },
    duration: {
      control: 'number',
    },
    closable: {
      control: 'boolean',
    },
    pauseOnHover: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Basic Toast
export const Default: Story = {
  args: {
    message: 'This is a default toast message',
  },
};

// Toast with title
export const WithTitle: Story = {
  args: {
    title: 'Toast Title',
    message: 'This is a toast message with a title',
  },
};

// Toast variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast variant="default" message="Default toast message" />
      <Toast variant="success" message="Success toast message" />
      <Toast variant="error" message="Error toast message" />
      <Toast variant="warning" message="Warning toast message" />
      <Toast variant="info" message="Info toast message" />
    </div>
  ),
};

// Toast sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast size="sm" message="Small toast message" />
      <Toast size="md" message="Medium toast message" />
      <Toast size="lg" message="Large toast message" />
    </div>
  ),
};

// Toast with custom icon
export const CustomIcon: Story = {
  args: {
    icon: <FontAwesomeIcon icon={faBell} />,
    message: 'Toast with custom icon',
  },
};

// Toast with all features
export const AllFeatures: Story = {
  args: {
    title: 'Complete Toast',
    message: 'This toast has all features enabled',
    variant: 'success',
    size: 'lg',
    icon: <FontAwesomeIcon icon={faCircleCheck} />,
    closable: true,
    pauseOnHover: true,
    duration: 5000,
  },
};

// Programmatic Toast Usage
export const ProgrammaticToast = {
  render: () => {
    const showDefaultToast = () => {
      toast.show({
        message: 'This is a default toast',
      });
    };

    const showSuccessToast = () => {
      toast.success('Operation completed successfully', {
        title: 'Success',
      });
    };

    const showErrorToast = () => {
      toast.error('An error occurred', {
        title: 'Error',
        duration: 5000,
      });
    };

    const showWarningToast = () => {
      toast.warning('Please review your information', {
        title: 'Warning',
        position: 'top',
      });
    };

    const showInfoToast = () => {
      toast.info('New updates are available', {
        title: 'Information',
        icon: <FontAwesomeIcon icon={faCircleInfo} />,
      });
    };

    const showCustomToast = () => {
      toast.show({
        title: 'Custom Toast',
        message: 'This is a fully customized toast',
        variant: 'success',
        icon: <FontAwesomeIcon icon={faCircleExclamation} />,
        position: 'bottom-left',
        duration: 8000,
        size: 'lg',
      });
    };

    const removeAllToasts = () => {
      toast.removeAll();
    };

    return (
      <div className="space-y-4">
        <ToastManager />
        <h3 className="text-lg font-semibold">Programmatic Toast Examples</h3>
        <p className="text-sm mb-4">Click the buttons below to trigger different toast notifications.</p>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={showDefaultToast}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Show Default Toast
          </button>
          
          <button 
            onClick={showSuccessToast}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Show Success Toast
          </button>
          
          <button 
            onClick={showErrorToast}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Show Error Toast
          </button>
          
          <button 
            onClick={showWarningToast}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Show Warning Toast
          </button>
          
          <button 
            onClick={showInfoToast}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Info Toast
          </button>
          
          <button 
            onClick={showCustomToast}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Show Custom Toast
          </button>
          
          <button 
            onClick={removeAllToasts}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Remove All Toasts
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h4 className="font-medium mb-2">Code Example:</h4>
          <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
            {`// Basic usage
toast.show({ message: 'Basic toast message' });

// Variant shortcuts
toast.success('Operation completed successfully');
toast.error('An error occurred');
toast.warning('Please review your information');
toast.info('New updates are available');

// With title and other options
toast.success('Operation completed successfully', {
  title: 'Success',
  duration: 5000,
  position: 'top-right',
  pauseOnHover: true,
});

// Custom configuration
toast.show({
  title: 'Custom Toast',
  message: 'This is a fully customized toast',
  variant: 'success',
  icon: <CustomIcon />,
  position: 'bottom-left',
  duration: 8000,
  size: 'lg',
});

// Remove all toasts
toast.removeAll();`}
          </pre>
        </div>
      </div>
    );
  },
};

// Different positions
export const Positions = {
  render: () => {
    const showPositionedToast = (position) => {
      toast.show({
        message: `Toast at ${position} position`,
        position,
        variant: position.includes('top') ? 'success' : 'info',
      });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Toast Positions</h3>
        <p className="text-sm mb-4">Click the buttons to show toasts at different positions.</p>
        
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => showPositionedToast('top-left')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Top Left
          </button>
          
          <button 
            onClick={() => showPositionedToast('top')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Top
          </button>
          
          <button 
            onClick={() => showPositionedToast('top-right')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Top Right
          </button>
          
          <button 
            onClick={() => showPositionedToast('bottom-left')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Bottom Left
          </button>
          
          <button 
            onClick={() => showPositionedToast('bottom')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Bottom
          </button>
          
          <button 
            onClick={() => showPositionedToast('bottom-right')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Bottom Right
          </button>
        </div>
      </div>
    );
  },
};

