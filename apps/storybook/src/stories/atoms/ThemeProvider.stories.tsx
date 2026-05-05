import React, {Component} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {Button, ThemeProvider, useTheme} from "@delhivery/tarmac";

const meta: Meta<typeof ThemeProvider> = {
  title: "Atoms/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialTheme: {
      control: "object",
      description: "Initial theme object",
    },
    initialSource: {
      control: "text",
      description: "Source URL or path to load theme from",
    },
    initialOverrides: {
      control: "object",
      description: "Theme overrides to apply",
    },
    activeTheme: {
      control: "select",
      options: ["light", "dark"],
      description: "Active theme type",
      defaultValue: "light",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// Example theme data
const lightTheme = {
  components: {
    button: {
      base: {
        "fontFamily": "sans-serif",
        fontWeight: "500",
        transition: "all 0.15s ease-in-out",
        focus: {
          outline: "none",
          ring: "0 0 0 3px rgba(237, 65, 54, 0.5)",
        },
        radius: {
          default: "0.375rem",
          rounded: "9999px",
        },
      },
      variants: {
        primary: {
          backgroundColor: "red",
          textColor: "#FFFFFF",
          hoverColor: "#1A365D",
          hoverTextColor: "#FFFFFF",
          focusRingColor: "#ED4136",
        },
      },
    },
  },
};

const darkTheme = {
  components: {
    button: {
      base: {
        "fontFamily": "sans-serif",
        fontWeight: "500",
        transition: "all 0.15s ease-in-out",
        focus: {
          outline: "none",
          ring: "0 0 0 3px rgba(237, 65, 54, 0.5)",
        },
        radius: {
          default: "0.375rem",
          rounded: "9999px",
        },
      },
      variants: {
        primary: {
          backgroundColor: "blue",
          textColor: "white",
          hoverColor: "#1A365D",
          hoverTextColor: "#FFFFFF",
          focusRingColor: "#ED4136",
        },
      },
    },
  },
};

// Theme Toggle Component
const ThemeToggle = () => {
  const {activeTheme, updateTheme} = useTheme();

  const toggleTheme = () => {
    const newTheme = activeTheme === "light" ? "dark" : "light";
    updateTheme({
       ...(newTheme === "light" ? lightTheme : darkTheme),
    });
  };

  return (
    <Button
      onClick={toggleTheme}
    >
      Switch to {activeTheme === "light" ? "Dark" : "Light"} Theme
    </Button>
  );
};

// Basic Examples
export const Default: Story = {
  args: {
    initialTheme: lightTheme,
    activeTheme:"light"
  },
  render: (args) => (
    <ThemeProvider initialTheme={lightTheme}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Theme Provider Example</h1>
        <ThemeToggle />
        <div className="mt-4 p-4 border rounded-md">
          <Button variant="primary">Sample Button</Button>
        </div>
      </div>
    </ThemeProvider>
  ),
};

export const WithDarkTheme: Story = {
  args: {
    initialTheme: darkTheme,
    activeTheme: "dark",
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dark Theme Example</h1>
        <ThemeToggle />
        <div className="mt-4 p-4 border rounded-md">
          <p>This is a sample content that will change with the theme.</p>
          <Button variant="primary">Sample Button</Button>
        </div>
      </div>
    </ThemeProvider>
  ),
};

export const WithThemeSource: Story = {
  args: {
    initialSource: "Orca18/apps/storybook/public/Theme_Red.json",
    activeTheme: "light",
  },
  render: (args) => (
    
    <ThemeProvider {...args}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Theme from Source Example</h1>
        <ThemeToggle />
        <div className="mt-4 p-4 border rounded-md">
          <p>This theme is loaded from a source file.</p>
          <Button variant="primary">Sample Button</Button>
        </div>
      </div>
    </ThemeProvider>
  ),
};

export const WithThemeOverrides: Story = {
  args: {
    initialOverrides: {
      components: {
        button: {
          base: {
            "fontFamily": "Arial",
            fontWeight: "500",
            transition: "all 0.15s ease-in-out",
            focus: {
              outline: "none",
              ring: "0 0 0 3px rgba(237, 65, 54, 0.5)",
            },
            radius: {
              default: "0.375rem",
              rounded: "9999px",
            },
          },
          variants: {
            primary: {
              backgroundColor: "green",
              textColor: "white",
              hoverColor: "#1A365D",
              hoverTextColor: "#FFFFFF",
              focusRingColor: "#ED4136",
            },
          },
        },
      },
    },
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Theme with Overrides Example
        </h1>
        <ThemeToggle />
        <div className="mt-4 p-4 border rounded-md">
          <p>This theme has custom overrides applied.</p>
          <button className="mt-2 px-4 py-2 bg-primary text-white rounded-md">
            Sample Button
          </button>
        </div>
      </div>
    </ThemeProvider>
  ),
};
