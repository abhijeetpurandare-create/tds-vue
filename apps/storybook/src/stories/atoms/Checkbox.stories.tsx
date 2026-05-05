import React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
// Import directly from local source
import Checkbox, { CheckboxGroup } from '../../../../../packages/atoms/src/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the checkbox",
      defaultValue: "md",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
      defaultValue: false,
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    defaultChecked: {
      control: "boolean",
      description: "Whether the checkbox is checked by default",
      defaultValue: false,
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in indeterminate state",
      defaultValue: false,
    },
    children: {
      control: "text",
      description: "Label text for the checkbox",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic Checkbox Examples
export const Basic: Story = {
  args: {
    size: "md",
    children: "Checkbox Option",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Checkbox {...args} size="sm">Small Checkbox</Checkbox>
        <Checkbox {...args} size="md">Medium Checkbox</Checkbox>
        <Checkbox {...args} size="lg">Large Checkbox</Checkbox>
      </div>
    </div>
  ),
};

// Checkbox States
export const States: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} defaultChecked>Checked Checkbox</Checkbox>
      <Checkbox {...args}>Unchecked Checkbox</Checkbox>
      <Checkbox {...args} indeterminate>Indeterminate Checkbox</Checkbox>
      <Checkbox {...args} disabled>Disabled Checkbox</Checkbox>
      <Checkbox {...args} disabled defaultChecked>Disabled Checked Checkbox</Checkbox>
    </div>
  ),
};

// Checkbox Group - Default
export const CheckboxGroupDefault: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Horizontal Group</h3>
        <CheckboxGroup {...args} defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Vertical Group</h3>
        <CheckboxGroup {...args} defaultValue={['option1']} orientation="vertical">
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  ),
};

// Checkbox Group - With Options
export const CheckboxGroupWithOptions: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">String Options</h3>
        <CheckboxGroup {...args} options={['Apple', 'Banana', 'Orange']} />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Number Options</h3>
        <CheckboxGroup {...args} options={[1, 2, 3]} />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Object Options</h3>
        <CheckboxGroup
          {...args}
          options={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c', disabled: true },
          ]}
        />
      </div>
    </div>
  ),
};

// Checkbox Group - Button Style
export const CheckboxGroupButton: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Button Style - Outline</h3>
        <CheckboxGroup {...args} optionType="button" buttonStyle="outline" defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Button Style - Solid</h3>
        <CheckboxGroup {...args} optionType="button" buttonStyle="solid" defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Button Style - Multiple Selection</h3>
        <CheckboxGroup {...args} optionType="button" buttonStyle="outline" defaultValue={['option1', 'option2']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Button Style - Vertical</h3>
        <CheckboxGroup {...args} optionType="button" buttonStyle="outline" orientation="vertical" defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  ),
};

// Checkbox Group - Sizes
export const CheckboxGroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Small Size</h3>
        <CheckboxGroup size="sm" defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Medium Size</h3>
        <CheckboxGroup size="md" defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Large Size</h3>
        <CheckboxGroup size="lg" defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  ),
};

// Checkbox Group - Disabled
export const CheckboxGroupDisabled: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Group Disabled</h3>
        <CheckboxGroup {...args} disabled defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Individual Disabled</h3>
        <CheckboxGroup {...args} defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2" disabled>Option 2 (Disabled)</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  ),
};

// Checkbox Group - Block
export const CheckboxGroupBlock: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Block Layout</h3>
        <CheckboxGroup {...args} block defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2">Option 2</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  ),
};

// Indeterminate State Examples
export const IndeterminateState: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Indeterminate Checkbox</h3>
        <Checkbox {...args} indeterminate>Indeterminate State</Checkbox>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Indeterminate in Group</h3>
        <CheckboxGroup {...args} defaultValue={['option1']}>
          <Checkbox value="option1">Option 1</Checkbox>
          <Checkbox value="option2" indeterminate>Option 2 (Indeterminate)</Checkbox>
          <Checkbox value="option3">Option 3</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  ),
};

