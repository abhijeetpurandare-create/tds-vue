import React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {Button} from "@delhivery/tarmac";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
      description: "The visual style of the button",
      defaultValue: "primary",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
      defaultValue: "md",
    },
    isLoading: {
      control: "boolean",
      description: "Whether the button is in a loading state",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      defaultValue: false,
    },
    isDisabled: {
      control: "boolean",
      description: "Alternative prop for disabled state",
      defaultValue: false,
    },
    icon: {
      control: "object",
      description: "Icon element to display in the button",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon relative to the text",
      defaultValue: "left",
    },
    children: {
      control: "text",
      description: "Text content for the button",
    },
    isRounded: {
      control: "boolean",
      description: "Whether the button has rounded corners",
      defaultValue: false,
    },
    backgroundColor: {
      control: "color",
      description: "Custom background color for the button",
    },
    textColor: {
      control: "color",
      description: "Custom text color for the button",
    },
    borderColor: {
      control: "color",
      description: "Custom border color for the button",
    },
    hoverColor: {
      control: "color",
      description: "Custom hover color for the button",
    },
    radius: {
      control: "text",
      description: 'Custom border radius (e.g., "md", "lg")',
    },
    border: {
      control: "text",
      description: "Custom border style",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Icon for examples
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Basic Button Examples
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button {...args} size="sm" text="Small" />
        <Button {...args} size="md" text="Medium" />
        <Button {...args} size="lg" text="Large" />
      </div>
      <div className="flex items-center gap-4">
        <Button
          {...args}
          icon={<ArrowIcon />}
          iconPosition="left"
          text="With Left Icon"
        />
        <Button
          {...args}
          icon={<ArrowIcon />}
          iconPosition="right"
          text="With Right Icon"
        />
        <Button {...args} icon={<ArrowIcon />} />
        <Button {...args} text="Only Text" />
      </div>
      <div className="flex items-center gap-4">
        <Button {...args} isRounded={true} text="is Rounded" />
        <Button {...args} radius="rounded-xl" text="Custom radius" />
      </div>
      <div className="flex items-center gap-4">
        <Button {...args} isLoading={true} text="Is Loading" />
        <Button {...args} isDisabled={true} text="Disabled" />
      </div>
      <div className="flex items-center gap-4">
        <Button
          {...args}
          backgroundColor="purple"
          textColor="white"
          borderColor="red"
          text="Custom Backgroung"
        />
        <Button
          text={"Complex Button"}
          variant="primary"
          size="lg"
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button {...args} size="sm" text="Small" />
        <Button {...args} size="md" text="Medium" />
        <Button {...args} size="lg" text="Large" />
      </div>
      <div className="flex items-center gap-4">
        <Button {...args} icon={<ArrowIcon />} iconPosition="left" text="With Left Icon" />
        <Button {...args} icon={<ArrowIcon />} iconPosition="right" text="With Right Icon" />
        <Button {...args} icon={<ArrowIcon />} />
        <Button {...args} text="Only Text" />
      </div>
      <div className="flex items-center gap-4">
        <Button {...args} isRounded={true} text="is Rounded" />
        <Button {...args} radius="rounded-xl" text="Custom radius" />
      </div>
      <div className="flex items-center gap-4">
        <Button {...args} isLoading={true} text="Is Loading" />
        <Button {...args} isDisabled={true} text="Disabled" />
      </div>
      <div className="flex items-center gap-4">
        <Button
          {...args}
          backgroundColor="purple"
          textColor="white"
          borderColor="red"
          text="Custom Background"
        />
        <Button
          text="Complex Button"
          variant="secondary"
          size="lg"
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button {...args} size="sm" text="Small" />
        <Button {...args} size="md" text="Medium" />
        <Button {...args} size="lg" text="Large" />
      </div>
      <div className="flex items-center gap-4">
        <Button {...args} icon={<ArrowIcon />} iconPosition="left" text="With Left Icon" />
        <Button {...args} icon={<ArrowIcon />} iconPosition="right" text="With Right Icon" />
        <Button {...args} icon={<ArrowIcon />} />
        <Button {...args} text="Only Text" />
      </div>
      <div className="flex items-center gap-4">
        <Button {...args} isRounded={true} text="is Rounded" />
        <Button {...args} radius="rounded-xl" text="Custom radius" />
      </div>
      <div className="flex items-center gap-4">
        <Button {...args} isLoading={true} text="Is Loading" />
        <Button {...args} isDisabled={true} text="Disabled" />
      </div>
      <div className="flex items-center gap-4">
        <Button
          {...args}
          backgroundColor="purple"
          textColor="white"
          borderColor="red"
          text="Custom Background"
        />
        <Button
          text="Button with Shadow"
          variant="outline"
          size="lg"
          className="shadow-lg"
        />
      </div>
    </div>
  ),
};

export const Size: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button {...args} size="sm" text="Small" />
        <Button {...args} size="md" text="Medium" />
        <Button {...args} size="lg" text="Large" />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button {...args} icon={<ArrowIcon />} iconPosition="left" text="With Left Icon" />
        <Button {...args} icon={<ArrowIcon />} iconPosition="right" text="With Right Icon" />
        <Button {...args} icon={<ArrowIcon />} />
        <Button {...args} text="Only Text" />
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
      <Button {...args} isLoading={true} text="Is Loading" />
      <Button {...args} isDisabled={true} text="Disabled" />
      </div>
    </div>
  ),
};


export const Radius: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
      <Button {...args} isRounded={true} text="is Rounded" />
      <Button {...args} radius="rounded-xl" text="Custom radius" /> 
      
      </div>
    </div>
  ),
};

export const Border: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
      <Button {...args}  text="Default Border" />
      <Button {...args}  border="border-3 border-indigo-500" text="Custom Border" />
      </div>
    </div>
  ),
};


// Combined Features Example
export const CustomButton: Story = {
  args: {
    text: "Custom Button",
    variant: "primary",
    size: "lg",
    icon: <ArrowIcon />,
    iconPosition: "right",
    className: "shadow-lg",
    backgroundColor:"purple"
  },
};
