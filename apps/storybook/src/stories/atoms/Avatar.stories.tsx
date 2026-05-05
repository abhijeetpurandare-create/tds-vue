import React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {Avatar, ThemeProvider} from "@delhivery/tarmac";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the avatar component",
      defaultValue: "md",
    },
    shape: {
      control: {type: "select"},
      options: ["circle", "square"],
      description: "Shape of the avatar",
      defaultValue: "circle",
    },
    src: {
      control: "text",
      description: "Source URL for the avatar image",
    },
    icon: {
      control: "text",
      description: "Icon to display inside the avatar",
    },
    alt: {
      control: "text",
      description: "Alt text for the avatar image",
      defaultValue: "avatar",
    },
    bordered: {
      control: "boolean",
      description: "Whether the avatar has a border",
      defaultValue: false,
    },
    borderColor: {
      control: "text",
      description: "Border color of the avatar",
    },
    backgroundColor: {
      control: "text",
      description: "Background color of the avatar",
    },
    color: {
      control: "text",
      description: "Text color inside the avatar",
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "rounded-full"],
      description: "Border radius of the avatar",
      defaultValue: "rounded-full",
    },
    textFontSize: {
      control: "text",
      description: "Font size of the text inside the avatar",
      defaultValue: "text-base",
    },
    fontWeight: {
      control: "text",
      description: "Font weight of the text inside the avatar",
      defaultValue: "font-medium",
    },
    onClick: {action: "clicked"},
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic avatar example
export const Default: Story = {
  args: {
    children: "A",
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ThemeProvider>
        <Avatar size="sm" shape="circle">
          S
        </Avatar>
        <Avatar size="md" shape="circle">
          M
        </Avatar>
        <Avatar size="lg" shape="circle">
          L
        </Avatar>
        <Avatar size="xl" shape="circle">
          XL
        </Avatar>
      </ThemeProvider>
    </div>
  ),
};

// Shape variants
export const Shapes: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex flex-wrap gap-4">
        <Avatar size="lg" shape="circle">
          Round
        </Avatar>
        <Avatar size="lg" shape="square">
          Square
        </Avatar>
      </div>
    </ThemeProvider>
  ),
};

// With images
export const WithImages: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex flex-wrap gap-4">
        <Avatar
          size="sm"
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000"
          alt="Small Avatar"
        />
        <Avatar
          size="md"
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000"
          alt="Medium Avatar"
        />
        <Avatar
          size="lg"
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000"
          alt="Large Avatar"
        />
        <Avatar
          size="xl"
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000"
          alt="XL Avatar"
        />
      </div>
    </ThemeProvider>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex flex-wrap gap-4">
        <Avatar size="sm" icon="👤" />
        <Avatar size="md" icon="⭐" />
        <Avatar size="lg" icon="🔥" />
        <Avatar size="xl" icon="🚀" />
      </div>
    </ThemeProvider>
  ),
};

// Custom styled avatars
export const CustomStyles: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex flex-wrap gap-4">
        <Avatar
          size="md"
          backgroundColor="bg-purple-100"
          color="text-purple-700"
          borderColor="border-purple-300"
          bordered
        >
          C
        </Avatar>
        <Avatar
          size="lg"
          radius="rounded-md"
          backgroundColor="bg-blue-100"
          color="text-blue-700"
        >
          R
        </Avatar>
        <Avatar size="xl" backgroundColor="bg-gray-200">
          N
        </Avatar>
      </div>
    </ThemeProvider>
  ),
};

// Interactive avatar
export const Interactive: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex flex-wrap gap-4">
        <Avatar
          size="md"
          backgroundColor="bg-gray-100"
          className="cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={() => alert("Avatar clicked!")}
        >
          Click
        </Avatar>
      </div>
    </ThemeProvider>
  ),
};

// Avatars with custom children
// export const WithChildren: Story = {
//   render: () => (
//     <ThemeProvider>
//       <div className="flex flex-wrap gap-4">
//         <Avatar backgroundColor="bg-gray-100">
//           <span className="font-bold">John</span>
//           <span className="text-xs text-gray-500">Doe</span>
//         </Avatar>
//       </div>
//     </ThemeProvider>
//   ),
// };

// Use case examples
export const UseCases: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex flex-col gap-4">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">User Profile Avatars</h3>
          <div className="flex gap-2">
            <Avatar
              size="md"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000"
              alt="User 1"
            />
            <Avatar
              size="md"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000"
              alt="User 2"
            />
            <Avatar size="md">JD</Avatar>
          </div>
        </div>
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium mb-2">Interactive Avatars</h3>
          <div className="flex gap-2">
            <Avatar
              size="lg"
              className="cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => alert("Avatar clicked!")}
            >
              Click
            </Avatar>
          </div>
        </div>
      </div>
    </ThemeProvider>
  ),
};
