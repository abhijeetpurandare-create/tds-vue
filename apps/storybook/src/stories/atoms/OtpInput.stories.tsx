import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { OtpInput } from "@delhivery/tarmac";

const meta: Meta<typeof OtpInput> = {
  title: 'Atoms/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An OTP (One-Time Password) input component that provides a series of individual input fields for entering verification codes.

## Features
- Configurable number of digits
- Auto-focus and navigation between inputs
- Keyboard navigation with arrow keys
- Paste support with validation
- Support for text, password, and number input types
- Various sizes and visual variants
- Status states (error, warning, success)
- Accessibility features with proper ARIA labels
        `,
      },
    },
  },
  argTypes: {
    value: { 
      control: 'text', 
      description: 'Current OTP value' 
    },
    onChange: { 
      action: 'changed',
      description: 'Callback when OTP value changes'
    },
    numDigits: { 
      control: 'number', 
      description: 'Number of OTP digits',
      defaultValue: 6
    },
    autoFocus: { 
      control: 'boolean', 
      description: 'Auto focus first input on mount',
      defaultValue: false
    },
    isDisabled: { 
      control: 'boolean', 
      description: 'Disabled state of inputs',
      defaultValue: false
    },
    placeholder: { 
      control: 'text', 
      description: 'Placeholder character for empty inputs',
      defaultValue: ''
    },
    inputType: { 
      control: { type: 'select', options: ['text', 'password', 'number'] },
      description: 'Type of input field',
      defaultValue: 'text'
    },
    size: {
      control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      description: 'Size of input fields',
      defaultValue: 'md'
    },
    variant: {
      control: { type: 'select', options: ['outlined', 'borderless', 'filled', 'underlined'] },
      description: 'Visual variant of input fields',
      defaultValue: 'outlined'
    },
    status: {
      control: { type: 'select', options: ['default', 'error', 'warning', 'success'] },
      description: 'Status state of input fields',
      defaultValue: 'default'
    },
    label: { 
      control: 'text', 
      description: 'Label text for the input' 
    },
    helperText: { 
      control: 'text', 
      description: 'Helper text below the input' 
    },
    onComplete: { 
      action: 'completed',
      description: 'Callback when OTP is fully entered'
    }
  }
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

// Basic Examples
export const Default: Story = {
  args: {
    numDigits: 6
  },
};

export const WithLabel: Story = {
  args: {
    numDigits: 6,
    label: 'Enter verification code',
    helperText: 'Code sent to your phone number'
  },
};

// Input Types
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Text Input (Default)</label>
        <OtpInput numDigits={6} label="Text OTP" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Password Input</label>
        <OtpInput numDigits={6} inputType="password" label="Secure OTP" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Number Only Input</label>
        <OtpInput numDigits={6} inputType="number" label="Numeric OTP" />
      </div>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Extra Small (xs)</label>
        <OtpInput numDigits={4} size="xs" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Small (sm)</label>
        <OtpInput numDigits={4} size="sm" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Medium (md) - Default</label>
        <OtpInput numDigits={4} size="md" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Large (lg)</label>
        <OtpInput numDigits={4} size="lg" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Extra Large (xl)</label>
        <OtpInput numDigits={4} size="xl" />
      </div>
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Outlined (Default)</label>
        <OtpInput numDigits={4} variant="outlined" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Filled</label>
        <OtpInput numDigits={4} variant="filled" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Borderless</label>
        <OtpInput numDigits={4} variant="borderless" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Underlined</label>
        <OtpInput numDigits={4} variant="underlined" />
      </div>
    </div>
  ),
};

// Status States
export const StatusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Default</label>
        <OtpInput 
          numDigits={4} 
          status="default" 
          label="Enter OTP" 
          helperText="Enter the 4-digit code"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Success</label>
        <OtpInput 
          numDigits={4} 
          status="success" 
          label="OTP Verified" 
          helperText="Code verified successfully" 
          value="1234"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Warning</label>
        <OtpInput 
          numDigits={4} 
          status="warning" 
          label="OTP Expiring" 
          helperText="Code will expire in 30 seconds"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Error</label>
        <OtpInput 
          numDigits={4} 
          status="error" 
          label="Invalid OTP" 
          helperText="Please enter the correct OTP"
        />
      </div>
    </div>
  ),
};

// Different Digit Lengths
export const DigitLengths: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">3 Digits</label>
        <OtpInput numDigits={3} label="3-Digit Code" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">4 Digits</label>
        <OtpInput numDigits={4} label="4-Digit Code" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">6 Digits (Default)</label>
        <OtpInput numDigits={6} label="6-Digit Code" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">8 Digits</label>
        <OtpInput numDigits={8} label="8-Digit Code" />
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Auto Focus</label>
        <OtpInput numDigits={4} autoFocus={true} label="Auto-focused OTP" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled</label>
        <OtpInput numDigits={4} isDisabled={true} label="Disabled OTP" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">With Placeholder</label>
        <OtpInput numDigits={4} placeholder="•" label="OTP with placeholder" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Pre-filled Value</label>
        <OtpInput numDigits={4} value="12" label="Partially filled OTP" />
      </div>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [otpValue, setOtpValue] = React.useState("");
    const [isComplete, setIsComplete] = React.useState(false);
    
    const handleChange = (value: string) => {
      setOtpValue(value);
      setIsComplete(false);
    };
    
    const handleComplete = (value: string) => {
      setIsComplete(true);
      console.log("OTP Completed:", value);
    };
    
    return (
      <div className="space-y-4">
        <OtpInput
          numDigits={6}
          value={otpValue}
          onChange={handleChange}
          onComplete={handleComplete}
          label="Enter 6-digit verification code"
          helperText={
            isComplete 
              ? "✅ OTP completed successfully!" 
              : "Enter the code sent to your phone"
          }
          status={isComplete ? "success" : "default"}
          autoFocus={true}
        />
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Debug Info:</h3>
          <p className="text-sm">Current value: "{otpValue}"</p>
          <p className="text-sm">Length: {otpValue.length}</p>
          <p className="text-sm">Complete: {isComplete ? "Yes" : "No"}</p>
        </div>
        
        <button
          onClick={() => {
            setOtpValue("");
            setIsComplete(false);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset
        </button>
      </div>
    );
  },
};

// Use Cases
export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Phone Verification</h3>
        <div className="p-4 border rounded-lg">
          <OtpInput
            numDigits={6}
            inputType="number"
            size="lg"
            label="Verify your phone number"
            helperText="Enter the 6-digit code sent to +1 (555) 123-4567"
            autoFocus={true}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
        <div className="p-4 border rounded-lg">
          <OtpInput
            numDigits={6}
            inputType="number"
            variant="filled"
            label="Enter authenticator code"
            helperText="Enter the 6-digit code from your authenticator app"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">PIN Entry</h3>
        <div className="p-4 border rounded-lg">
          <OtpInput
            numDigits={4}
            inputType="password"
            size="xl"
            label="Enter your PIN"
            helperText="Enter your 4-digit security PIN"
          />
        </div>
      </div>
    </div>
  ),
}; 