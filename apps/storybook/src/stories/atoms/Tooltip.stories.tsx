import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, Button, Modal } from '@delhivery/tarmac';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faGear, faCircleQuestion, faTrash, faPen, faDownload, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component that displays additional information on hover, click, or focus. Supports multiple placements, triggers, and customizable styling.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to display in the tooltip',
    },
    placement: {
      control: { type: 'select' },
      options: [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'
      ],
      description: 'Position of the tooltip relative to the trigger element',
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'How the tooltip is triggered',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Visual variant of the tooltip',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tooltip',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum width of the tooltip',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color',
    },
    arrowColor: {
      control: 'color',
      description: 'Custom arrow color',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tooltip
export const Default: Story = {
  args: {
    content: 'This is a basic tooltip',
    children: <Button>Hover me</Button>,
  },
};

// Different placements
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '40px' }}>
      <Tooltip content="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      
      <Tooltip content="Left tooltip" placement="left">
        <Button>Left</Button>
      </Tooltip>
      
      <Tooltip content="Right tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
      
      <Tooltip content="Top start tooltip" placement="top-start">
        <Button>Top Start</Button>
      </Tooltip>
      
      <Tooltip content="Top end tooltip" placement="top-end">
        <Button>Top End</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be positioned in 12 different placements around the trigger element.',
      },
    },
  },
};

// Different triggers
export const Triggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="Hover tooltip" trigger="hover">
        <Button>Hover</Button>
      </Tooltip>
      
      <Tooltip content="Click tooltip" trigger="click">
        <Button>Click</Button>
      </Tooltip>
      
      <Tooltip content="Focus tooltip" trigger="focus">
        <Button>Focus</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be triggered by hover, click, or focus events.',
      },
    },
  },
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="Default tooltip" variant="default">
        <Button>Default</Button>
      </Tooltip>
      
      <Tooltip content="Primary tooltip" variant="primary">
        <Button>Primary</Button>
      </Tooltip>
      
      <Tooltip content="Success tooltip" variant="success">
        <Button>Success</Button>
      </Tooltip>
      
      <Tooltip content="Warning tooltip" variant="warning">
        <Button>Warning</Button>
      </Tooltip>
      
      <Tooltip content="Error tooltip" variant="error">
        <Button>Error</Button>
      </Tooltip>
      
      <Tooltip content="Info tooltip" variant="info">
        <Button>Info</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips come in different color variants to match your design system.',
      },
    },
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="Small tooltip" size="sm">
        <Button>Small</Button>
      </Tooltip>
      
      <Tooltip content="Medium tooltip" size="md">
        <Button>Medium</Button>
      </Tooltip>
      
      <Tooltip content="Large tooltip" size="lg">
        <Button>Large</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips come in three sizes: small, medium, and large.',
      },
    },
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip 
        content="Custom colored tooltip" 
        backgroundColor="#8B5CF6"
        textColor="#FFFFFF"
        borderColor="#7C3AED"
        arrowColor="#8B5CF6"
      >
        <Button>Custom Colors</Button>
      </Tooltip>
      
      <Tooltip 
        content="Gradient-like tooltip" 
        backgroundColor="#F59E0B"
        textColor="#000000"
        borderColor="#D97706"
        arrowColor="#F59E0B"
      >
        <Button>Orange</Button>
      </Tooltip>
      
      <Tooltip 
        content="Dark tooltip" 
        backgroundColor="#111827"
        textColor="#F9FAFB"
        borderColor="#374151"
        arrowColor="#111827"
      >
        <Button>Dark</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be customized with custom colors for background, text, border, and arrow.',
      },
    },
  },
};

// Complex content
export const ComplexContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip 
        content={
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
              User Information
            </h3>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px' }}>
              John Doe
            </p>
            <p style={{ margin: '0', fontSize: '12px', opacity: 0.8 }}>
              john.doe@example.com
            </p>
          </div>
        }
        maxWidth={200}
      >
        <Button>User Info</Button>
      </Tooltip>
      
      <Tooltip 
        content={
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#10B981' }} />
              <span style={{ fontWeight: '600' }}>Success!</span>
            </div>
            <p style={{ margin: '0', fontSize: '12px' }}>
              Your action was completed successfully.
            </p>
          </div>
        }
        maxWidth={250}
      >
        <Button>Success Message</Button>
      </Tooltip>
      
      <Tooltip 
        content={
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: '#F59E0B' }} />
              <span style={{ fontWeight: '600' }}>Warning</span>
            </div>
            <p style={{ margin: '0', fontSize: '12px' }}>
              This action cannot be undone.
            </p>
            <button 
              style={{ 
                marginTop: '8px', 
                padding: '4px 8px', 
                fontSize: '11px', 
                backgroundColor: '#F59E0B', 
                color: '#000000', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Proceed
            </button>
          </div>
        }
        maxWidth={220}
      >
        <Button>Warning</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain complex content including headings, paragraphs, icons, and interactive elements.',
      },
    },
  },
};

// Icon with tooltip
export const IconWithTooltip: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="Settings">
        <FontAwesomeIcon icon={faGear} style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Tooltip>
      
      <Tooltip content="Help and documentation">
        <FontAwesomeIcon icon={faCircleQuestion} style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Tooltip>
      
      <Tooltip content="Delete item">
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: '24px', cursor: 'pointer', color: '#EF4444' }} />
      </Tooltip>
      
      <Tooltip content="Edit item">
        <FontAwesomeIcon icon={faPen} style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Tooltip>
      
      <Tooltip content="Download file">
        <FontAwesomeIcon icon={faDownload} style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips are commonly used with icons to provide additional context.',
      },
    },
  },
};

// Controlled tooltip
export const Controlled: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <Tooltip 
          content="This tooltip is controlled by a button" 
          visible={visible}
          onVisibleChange={setVisible}
        >
          <Button>Controlled Tooltip</Button>
        </Tooltip>
        
        <Button onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'Show'} Tooltip
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be controlled externally using the visible prop and onVisibleChange callback.',
      },
    },
  },
};

// Disabled tooltip
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip content="This tooltip is disabled" disabled>
        <Button>Disabled Tooltip</Button>
      </Tooltip>
      
      <Tooltip content="This tooltip works normally">
        <Button>Normal Tooltip</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be disabled to prevent them from showing.',
      },
    },
  },
};

// Long content with maxWidth
export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Tooltip 
        content="This is a very long tooltip content that demonstrates how the tooltip handles text wrapping and maximum width constraints. The content will wrap to multiple lines if it exceeds the specified maxWidth."
        maxWidth={200}
      >
        <Button>Long Content</Button>
      </Tooltip>
      
      <Tooltip 
        content="This tooltip has a larger maxWidth and will display more content on a single line before wrapping."
        maxWidth={300}
      >
        <Button>Wider Tooltip</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can handle long content with text wrapping and maximum width constraints.',
      },
    },
  },
};

// Tooltip inside a Modal
export const InsideModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Tooltip in Modal" footer={null}>
          <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
            <Tooltip content="This tooltip works inside a modal!" placement="top">
              <Button>Hover me (top)</Button>
            </Tooltip>
            <Tooltip content="Bottom placement inside modal" placement="bottom">
              <Button>Hover me (bottom)</Button>
            </Tooltip>
            <Tooltip content="Click trigger inside modal" trigger="click">
              <Button>Click me</Button>
            </Tooltip>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips render correctly inside a Modal by portaling to document.body, escaping the Modal stacking context.',
      },
    },
  },
};

// Ellipsis truncation on children
export const Ellipsis: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '40px', maxWidth: '600px' }}>
      {/* Plain text ellipsis */}
      <div>
        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>Plain text with ellipsis</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Tooltip content="Order #DLV-2026-03-19-00847291 — Mumbai to Delhi Express" ellipsis style={{ maxWidth: 180 }}>
            <span style={{ fontSize: '14px', color: '#3D445C' }}>Order #DLV-2026-03-19-00847291 — Mumbai to Delhi Express</span>
          </Tooltip>
          <Tooltip content="Short text" ellipsis style={{ maxWidth: 180 }}>
            <span style={{ fontSize: '14px', color: '#3D445C' }}>Short text</span>
          </Tooltip>
        </div>
      </div>


      {/* Comparison: ellipsis vs no ellipsis */}
      <div>
        <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>Comparison — ellipsis vs wrap</p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: '#A3AAC2' }}>ellipsis=true</span>
            <Tooltip content="Delhivery Express Logistics Pvt Ltd — Warehouse #42, Sector 18, Gurugram" ellipsis style={{ maxWidth: 200 }}>
              <span style={{ fontSize: '14px', color: '#3D445C' }}>Delhivery Express Logistics Pvt Ltd — Warehouse #42, Sector 18, Gurugram</span>
            </Tooltip>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: '#A3AAC2' }}>ellipsis=false (default)</span>
            <div style={{ maxWidth: 200 }}>
              <Tooltip content="Delhivery Express Logistics Pvt Ltd — Warehouse #42, Sector 18, Gurugram">
                <span style={{ fontSize: '14px', color: '#3D445C' }}>Delhivery Express Logistics Pvt Ltd — Warehouse #42, Sector 18, Gurugram</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When `ellipsis` is true, the trigger children text is truncated with an ellipsis. Hover to see the full text in the tooltip. Works with plain text, icons, and buttons.',
      },
    },
  },
};