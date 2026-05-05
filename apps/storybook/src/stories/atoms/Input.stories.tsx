import React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {Input} from "@delhivery/tarmac";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the input field",
      defaultValue: "md",
    },
    variant: {
      control: "select",
      options: ["outlined", "borderless", "filled", "underlined"],
      description: "The visual style of the input",
      defaultValue: "outlined",
    },
    status: {
      control: "select",
      options: ["error", "warning", "success", "default"],
      description: "The status state of the input",
      defaultValue: "default",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
      defaultValue: false,
    },
    isMobileNumberField: {
      control: "boolean",
      description: "Whether the input field is Phone Number",
      defaultValue: false,
    },
    multiline: {
      control: "boolean",
      description: "Whether the input is a textarea",
      defaultValue: false,
    },
    allowClear: {
      control: "boolean",
      description: "Whether to show clear button",
      defaultValue: false,
    },
    showCount: {
      control: "boolean",
      description: "Whether to show character count",
      defaultValue: false,
    },
    count: {
      control: "number",
      description: "Maximum character count",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    helperText: {
      control: "text",
      description: "Helper text below the input",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
      defaultValue: false,
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Icon for examples
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

// Basic Input Examples
export const Basic: Story = {
  args: {
    variant: "outlined",
    size: "md",
    placeholder: "Type something...",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <div className="flex flex-col gap-4">
        <Input {...args} size="sm" placeholder="Small" />
        <Input {...args} size="md" placeholder="Medium" />
        <Input {...args} size="lg" placeholder="Large" />
      </div>
    </div>
  ),
};

// Input Variants
export const Variants: Story = {
  args: {
    size: "md",
    placeholder: "Type something...",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input {...args} variant="outlined" placeholder="Outlined Input" />
      <Input {...args} variant="filled" placeholder="Filled Input" />
    </div>
  ),
};

// Input States
export const States: Story = {
  args: {
    size: "md",
    placeholder: "Type something...",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input {...args} status="default" placeholder="Default Input" />
      <Input {...args} status="error" placeholder="Error Input" />
      <Input {...args} status="warning" placeholder="Warning Input" />
      <Input {...args} status="success" placeholder="Success Input" />
      <Input {...args} disabled placeholder="Disabled Input" />
    </div>
  ),
};

// Mobile Number Input
export const MobileNumberInput: Story = {
  args: {
    isMobileNumberField: true,
    placeholder: "Enter mobile number",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input {...args} />
    </div>
  ),
};

// Input with Addons
export const WithAddons: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input
        {...args}
        prefixIcon={<SearchIcon />}
        placeholder="With prefix icon"
      />
      <Input
        {...args}
        suffixIcon={<SearchIcon />}
        placeholder="With suffix icon"
      />
      <Input
        {...args}
        addonBefore="https://"
        addonAfter=".com"
        placeholder="domain"
      />
      <Input {...args} allowClear placeholder="With clear button" />
    </div>
  ),
};

// Input with Label and Helper
export const WithLabelAndHelper: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input {...args} label="Username" required placeholder="Enter username" />
      <Input
        {...args}
        label="Email"
        helperText="We'll never share your email"
        placeholder="Enter email"
      />
      <Input
        {...args}
        label="Password"
        type="password"
        helperText="Must be at least 8 characters"
        placeholder="Enter password"
      />
    </div>
  ),
};

// Textarea Input
export const Textarea: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input {...args} multiline rows={4} placeholder="Type your message..." />
      <Input
        {...args}
        multiline
        rows={4}
        showCount
        count={100}
        placeholder="With character count..."
      />
    </div>
  ),
};

// Input with Width Constraints and Suffix Icon
export const WithWidthConstraints: Story = {
  args: {
    size: "md",
    suffixIcon: <SearchIcon />,
    placeholder: "Type something...",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Full Width (w-full)</h3>
          <Input {...args} className="w-full" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Fixed Width (w-64) - 256px</h3>
          <Input {...args} className="w-64" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Small Width (w-32) - 128px</h3>
          <Input {...args} className="w-32" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Very Small Width (w-24) - 96px</h3>
          <Input {...args} className="w-24" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">With Clear Button + Suffix Icon (w-48) - 192px</h3>
          <Input {...args} allowClear className="w-48" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Custom Width (w-80) - 320px</h3>
          <Input {...args} className="w-80" />
      </div>
    </div>
  ),
};
