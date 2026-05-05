import React from 'react';
import OtpInput from '../../../../../packages/molecules/src/otpInput'; // Adjust the import path as needed

export default {
  title: 'Test/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  argTypes: {
    value: { 
      control: 'text', 
      description: 'Current OTP value' 
    },
    onChange: { 
      action: 'changed' 
    },
    numDigits: { 
      control: 'number', 
      description: 'Number of OTP digits',
      defaultValue: 6
    },
    autoFocus: { 
      control: 'boolean', 
      description: 'Auto focus first input on mount',
      defaultValue: true
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
      action: 'completed' 
    }
  }
};

// Template for creating stories
const Template = (args) => <OtpInput {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  numDigits: 6
};

// With label and helper text
export const WithLabel = Template.bind({});
WithLabel.args = {
  numDigits: 6,
  label: 'Enter verification code',
  helperText: 'Code sent to your phone number'
};

// Password type input
export const PasswordType = Template.bind({});
PasswordType.args = {
  numDigits: 6,
  inputType: 'password',
  label: 'Enter secure code'
};

// Number only input
export const NumberOnly = Template.bind({});
NumberOnly.args = {
  numDigits: 6,
  inputType: 'number',
  label: 'Enter numeric OTP',
};

// Error state
export const Error = Template.bind({});
Error.args = {
  numDigits: 6,
  status: 'error',
  label: 'Invalid OTP',
  helperText: 'Please enter the correct OTP'
};

// Success state
export const Success = Template.bind({});
Success.args = {
  numDigits: 6,
  status: 'success',
  label: 'OTP verified',
  helperText: 'Successfully verified',
  value: '123456'
};

// 3 Digit OTP
export const ThreeDigits = Template.bind({});
ThreeDigits.args = {
  numDigits: 3,
  label: '3-Digit OTP'
};

// 4 Digit OTP
export const FourDigits = Template.bind({});
FourDigits.args = {
  numDigits: 4,
  label: '4-Digit OTP'
};

// 8 Digit OTP
export const EightDigits = Template.bind({});
EightDigits.args = {
  numDigits: 8,
  label: '8-Digit OTP'
};

// Custom size
export const LargeSize = Template.bind({});
LargeSize.args = {
  numDigits: 4,
  size: 'lg',
  label: 'Large 4-digit OTP'
}; 