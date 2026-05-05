import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {Switch} from "@delhivery/tarmac";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
      description: "The visual style of the switch",
      defaultValue: "primary",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the switch",
      defaultValue: "md",
    },
    loading: {
      control: "boolean",
      description: "Whether the switch is in a loading state",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
      defaultValue: false,
    },
    checked: {
      control: "boolean",
      description: "Whether the switch is checked",
      defaultValue: false,
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state",
      defaultValue: false,
    },
    checkedChildren: {
      control: "text",
      description: "Content to show when checked",
    },
    unCheckedChildren: {
      control: "text",
      description: "Content to show when unchecked",
    },
    backgroundColor: {
      control: "color",
      description: "Custom background color for the switch",
    },
    borderColor: {
      control: "color",
      description: "Custom border color for the switch",
    },
    hoverColor: {
      control: "color",
      description: "Custom hover color for the switch",
    },
    radius: {
      control: "text",
      description: "Custom border radius",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Basic Switch Examples
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch {...args} size="sm" />
        <Switch {...args} size="md" />
        <Switch {...args} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Switch {...args} checkedChildren="ON" unCheckedChildren="OFF" />
        <Switch {...args} checkedChildren="1" unCheckedChildren="0" />
        <Switch {...args} checkedChildren="✓" unCheckedChildren="✕" />
      </div>
      <div className="flex items-center gap-4">
        <Switch {...args} loading={true} />
        <Switch {...args} disabled={true} />
        <Switch {...args} checked={true} />
      </div>
      <div className="flex items-center gap-4">
        <Switch
          {...args}
          backgroundColor="purple"
          borderColor="red"
          hoverColor="pink"
        />
        <Switch
          {...args}
          radius="9999px"
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch {...args} size="sm" />
        <Switch {...args} size="md" />
        <Switch {...args} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Switch {...args} checkedChildren="ON" unCheckedChildren="OFF" />
        <Switch {...args} checkedChildren="1" unCheckedChildren="0" />
        <Switch {...args} checkedChildren="✓" unCheckedChildren="✕" />
      </div>
      <div className="flex items-center gap-4">
        <Switch {...args} loading={true} />
        <Switch {...args} disabled={true} />
        <Switch {...args} checked={true} />
      </div>
      <div className="flex items-center gap-4">
        <Switch
          {...args}
          backgroundColor="purple"
          borderColor="red"
          hoverColor="pink"
        />
        <Switch
          {...args}
          radius="9999px"
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch {...args} size="sm" />
        <Switch {...args} size="md" />
        <Switch {...args} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <Switch {...args} checkedChildren="ON" unCheckedChildren="OFF" />
        <Switch {...args} checkedChildren="1" unCheckedChildren="0" />
        <Switch {...args} checkedChildren="✓" unCheckedChildren="✕" />
      </div>
      <div className="flex items-center gap-4">
        <Switch {...args} loading={true} />
        <Switch {...args} disabled={true} />
        <Switch {...args} checked={true} />
      </div>
      <div className="flex items-center gap-4">
        <Switch
          {...args}
          backgroundColor="purple"
          borderColor="red"
          hoverColor="pink"
        />
        <Switch
          {...args}
          radius="9999px"
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};