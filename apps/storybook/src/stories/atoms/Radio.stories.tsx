import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
// Import directly from local source
import Radio, {
  RadioGroup,
} from "../../../../../packages/atoms/src/components/Radio";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the radio button",
      defaultValue: "md",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio is disabled",
      defaultValue: false,
    },
    checked: {
      control: "boolean",
      description: "Whether the radio is checked",
    },
    defaultChecked: {
      control: "boolean",
      description: "Whether the radio is checked by default",
      defaultValue: false,
    },
    children: {
      control: "text",
      description: "Label text for the radio",
    },
    required: {
      control: "boolean",
      description: "Whether the radio is required",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Basic Radio Examples
export const Basic: Story = {
  args: {
    size: "md",
    children: "Radio Option",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Radio {...args} size="sm">
          Small Radio
        </Radio>
        <Radio {...args} size="md">
          Medium Radio
        </Radio>
        <Radio {...args} size="lg">
          Large Radio
        </Radio>
      </div>
    </div>
  ),
};

// Radio States
export const States: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Radio {...args} defaultChecked>
        Checked Radio
      </Radio>
      <Radio {...args}>Unchecked Radio</Radio>
      <Radio {...args} disabled>
        Disabled Radio
      </Radio>
      <Radio {...args} disabled defaultChecked>
        Disabled Checked Radio
      </Radio>
    </div>
  ),
};

// Radio Group - Default
export const RadioGroupDefault: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Horizontal Group</h3>
        <RadioGroup {...args} defaultValue="option1">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Vertical Group</h3>
        <RadioGroup {...args} defaultValue="option1" orientation="vertical">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Radio Group - With Options
export const RadioGroupWithOptions: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[700px]">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">String Options</h3>
        <RadioGroup
          {...args}
          options={["Apple", "Banana", "Orange"]}
          size="lg"
          styles={{
            group: {
              flexWrap: "wrap",
            },
            radio: {
              borderRadius: "8px",
              borderWidth: "1px",
              padding: "16px",
              flex: "1 1 calc(50% - 6px)",
              minWidth: 0,
              maxWidth: "calc(50% - 6px)",
            },
          }}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Number Options</h3>
        <RadioGroup {...args} options={[1, 2, 3]} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Object Options</h3>
        <RadioGroup
          {...args}
          options={[
            { label: "Option A", value: "a" },
            { label: "Option B", value: "b" },
            { label: "Option C", value: "c", disabled: true },
          ]}
        />
      </div>
    </div>
  ),
};

// Radio Group - Button Style
export const RadioGroupButton: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">
          Button Style - Outline
        </h3>
        <RadioGroup
          {...args}
          optionType="button"
          buttonStyle="outline"
          defaultValue="option1"
        >
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">
          Button Style - Solid
        </h3>
        <RadioGroup
          {...args}
          optionType="button"
          buttonStyle="solid"
          defaultValue="option1"
        >
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">
          Button Style - Vertical
        </h3>
        <RadioGroup
          {...args}
          optionType="button"
          buttonStyle="outline"
          orientation="vertical"
          defaultValue="option1"
        >
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Radio Group - Pill Style
export const RadioGroupPill: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[400px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">
          Pill Style - Horizontal
        </h3>
        <RadioGroup {...args} optionType="pill" defaultValue="option1">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">
          Pill Style - Vertical
        </h3>
        <RadioGroup
          {...args}
          optionType="pill"
          orientation="vertical"
          defaultValue="option1"
        >
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Radio Group - Sizes
export const RadioGroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Small Size</h3>
        <RadioGroup size="sm" defaultValue="option1">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Medium Size</h3>
        <RadioGroup size="md" defaultValue="option1">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Large Size</h3>
        <RadioGroup size="lg" defaultValue="option1">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Radio Group - Disabled
export const RadioGroupDisabled: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Group Disabled</h3>
        <RadioGroup {...args} disabled defaultValue="option1">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">
          Individual Disabled
        </h3>
        <RadioGroup {...args} defaultValue="option1">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2" disabled>
            Option 2 (Disabled)
          </Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Radio Group - Block
export const RadioGroupBlock: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Block Layout</h3>
        <RadioGroup {...args} block defaultValue="option1">
          <Radio value="option1">Option 1</Radio>
          <Radio value="option2">Option 2</Radio>
          <Radio value="option3">Option 3</Radio>
        </RadioGroup>
      </div>
    </div>
  ),
};
