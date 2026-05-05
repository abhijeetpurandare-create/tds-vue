import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "@delhivery/tarmac";
import type { StepsProps, StepProps } from "@delhivery/tarmac";

// Icon components for the steps
const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.4134 6.91439L9.08521 0.58617C8.76305 0.264009 8.12669 0.000488281 7.671 0.000488281H0.999944C0.447832 0.000488281 0 0.44832 0 1.00043V7.67149C0 8.12718 0.263592 8.76357 0.585682 9.0857L6.9139 15.4139C7.30316 15.8032 7.81742 15.9996 8.32811 15.9996C8.83986 15.9996 9.35162 15.8043 9.74231 15.4139L15.4134 9.7428C16.1955 8.9607 16.1955 7.69649 15.4134 6.91439ZM14.5742 8.93571L8.90308 14.6068C8.77094 14.7675 8.55667 14.8568 8.32811 14.8568C8.09912 14.8568 7.88385 14.7677 7.72207 14.6058L1.39385 8.2786C1.286 8.17146 1.14279 7.82505 1.14279 7.67149V1.14328H7.671C7.8236 1.14328 8.16919 1.28635 8.27704 1.3943L14.6053 7.72252C14.767 7.88576 14.8563 8.10004 14.8563 8.3286C14.8563 8.55715 14.767 8.77143 14.5742 8.93571ZM3.96764 3.14317C3.49445 3.14317 3.11054 3.52672 3.11054 4.00027C3.11054 4.47381 3.49445 4.85736 3.96764 4.85736C4.44082 4.85736 4.82473 4.47381 4.82473 4.00027C4.82473 3.52672 4.47118 3.14317 3.96764 3.14317Z"/>
</svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6 13.1936H17.2V9.79271C17.2 9.31664 17.0289 8.85554 16.7188 8.494L14.9432 6.42655C14.715 6.15982 14.3825 6.00762 14.0325 6.00762H12.4V5.20918C12.4 4.32716 11.6838 3.6123 10.8 3.6123H3.6C2.71625 3.6123 2 4.32716 2 5.20918V12.3951C2 13.2771 2.71625 13.992 3.6 13.992C3.6 15.3129 4.6765 16.3873 6 16.3873C7.3235 16.3873 8.4 15.3129 8.4 13.992H11.6C11.6 15.3129 12.6765 16.3873 14 16.3873C15.3235 16.3873 16.4 15.3129 16.4 13.992H17.6C17.8211 13.992 18 13.8134 18 13.5928C18 13.3721 17.82 13.1936 17.6 13.1936ZM12.4 6.80605H14.032C14.1492 6.80605 14.2597 6.85673 14.3355 6.94523L16.1113 9.01269C16.1625 9.07162 16.205 9.134 16.2425 9.20137H12.4V6.80605ZM6 15.5889C5.1175 15.5889 4.4 14.8728 4.4 13.992C4.4 13.1112 5.1175 12.3951 6 12.3951C6.8825 12.3951 7.6 13.1112 7.6 13.992C7.6 14.8728 6.8825 15.5889 6 15.5889ZM14 15.5889C13.1175 15.5889 12.4 14.8728 12.4 13.992C12.4 13.1112 13.1175 12.3951 14 12.3951C14.8825 12.3951 15.6 13.1112 15.6 13.992C15.6 14.8728 14.8825 15.5889 14 15.5889ZM16.4 13.1936H16.26C15.93 12.2654 15.0425 11.5967 14 11.5967C12.9575 11.5967 12.0705 12.2646 11.74 13.1936H8.26C7.93 12.2654 7.0425 11.5967 6 11.5967C4.9575 11.5967 4.0705 12.2646 3.74 13.1936H3.6C3.15825 13.1936 2.8 12.836 2.8 12.3951V5.20918C2.8 4.76829 3.15825 4.41074 3.6 4.41074H10.8C11.2417 4.41074 11.6 4.76829 11.6 5.20918V10.7982C11.6 11.0187 11.7791 11.1975 12 11.1975C12.22 11.1975 12.4 11.0178 12.4 10.7982V9.9998H16.4V13.1936Z"/>
</svg>
);

const NetworkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.6 9.6001C2.893 9.6001 2 10.1461 2 11.2001C2 12.0813 2.71875 12.8001 3.6 12.8001C4.48125 12.8001 5.2 12.0813 5.2 11.2001C5.2 10.1526 4.317 9.6001 3.6 9.6001ZM3.6 12.0001C3.1595 12.0001 2.8 11.6406 2.8 11.2001C2.8 10.7596 3.1595 10.4001 3.6 10.4001C4.0405 10.4001 4.4 10.7596 4.4 11.2001C4.4 11.6406 4.04075 12.0001 3.6 12.0001ZM6.6 10.8001H6.1775C5.98 10.8001 5.8 10.9801 5.8 11.1776C5.8 11.3751 5.98 11.6001 6.1775 11.6001H6.57875C6.82 11.6001 7 11.4201 7 11.2001C7 10.9801 6.82 10.8001 6.6 10.8001ZM16.4 8.4001C17.107 8.4001 18 7.8541 18 6.8001C18 5.74985 17.1095 5.2001 16.4 5.2001C15.693 5.2001 14.8 5.7461 14.8 6.8001C14.8 7.6826 15.52 8.4001 16.4 8.4001ZM16.4 6.0001C16.8405 6.0001 17.2 6.3596 17.2 6.8001C17.2 7.2406 16.8405 7.6001 16.4 7.6001C15.9595 7.6001 15.6 7.2406 15.6 6.8001C15.6 6.3596 15.96 6.0001 16.4 6.0001ZM16.4 13.2001C16.0688 13.2001 15.7595 13.3001 15.5063 13.4721C15.4219 13.5283 15.3469 13.5908 15.2781 13.6596L12.9811 12.2813C13.1225 11.9501 13.2 11.5826 13.2 11.2001C13.2 9.6526 11.9475 8.4001 10.4 8.4001C10.1188 8.4001 9.853 8.45635 9.59375 8.53135L8.6125 6.4276C8.97 6.1351 9.2 5.6971 9.2 5.2001C9.2 4.15185 8.317 3.6001 7.6 3.6001C6.5525 3.6001 6 4.48285 6 5.2001C6 6.08135 6.71875 6.8001 7.6 6.8001C7.7 6.8001 7.79688 6.7876 7.89375 6.76885L8.86875 8.8596C8.1075 9.3601 7.6 10.2201 7.6 11.2001C7.6 12.7471 8.85325 14.0001 10.4 14.0001C11.275 14.0001 12.0438 13.5906 12.5595 12.9626L14.869 14.3471C14.8275 14.4951 14.8 14.6451 14.8 14.8001C14.8 15.6813 15.5155 16.4001 16.4 16.4001C17.455 16.4001 18 15.5101 18 14.8001C18 14.1126 17.46 13.2001 16.4 13.2001ZM7.6 6.0001C7.16 6.0001 6.8 5.64085 6.8 5.2001C6.8 4.75935 7.1595 4.4001 7.6 4.4001C8.0405 4.4001 8.4 4.7596 8.4 5.2001C8.4 5.6406 8.04 6.0001 7.6 6.0001ZM10.4 13.2001C9.2975 13.2001 8.4 12.3026 8.4 11.2001C8.4 10.0976 9.2975 9.2001 10.4 9.2001C11.5025 9.2001 12.4 10.0976 12.4 11.2001C12.4 12.3026 11.5025 13.2001 10.4 13.2001ZM16.4 15.6001C15.9595 15.6001 15.6 15.2406 15.6 14.8001C15.6 14.3596 15.9595 14.0001 16.4 14.0001C16.8405 14.0001 17.2 14.3596 17.2 14.8001C17.2 15.2406 16.84 15.6001 16.4 15.6001ZM13.96 9.3301L14.521 8.90935C14.6979 8.77667 14.7333 8.5256 14.6002 8.3491C14.4675 8.17347 14.2179 8.1382 14.0416 8.27025L13.4807 8.691C13.3038 8.82362 13.2683 9.07475 13.4015 9.251C13.5325 9.4276 13.7825 9.4626 13.96 9.3301Z"/>
</svg>
);

const BankIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
  <path d="M15.4999 15H0.499996C0.223873 15 0 15.225 0 15.5C0 15.775 0.223873 16 0.499996 16H15.4999C15.776 16 15.9999 15.7761 15.9999 15.5C15.9999 15.225 15.7749 15 15.4999 15ZM14.7499 14C15.026 14 15.2499 13.7761 15.2499 13.5C15.2499 13.2238 15.026 13 14.7499 13H1.24999C0.973868 13 0.749994 13.2238 0.749994 13.5C0.749994 13.7761 0.973868 14 1.24999 14H14.7499ZM15.5374 3.05666L8.28744 0.0566839C8.19369 0.018678 8.09681 0 7.99994 0C7.90306 0 7.80619 0.018678 7.71244 0.0567464L0.462496 3.05672C0.182624 3.17197 0 3.44697 0 3.75009V5.25008C0 5.6657 0.335935 6.00008 0.749994 6.00008H1.99998V11C1.72386 11 1.49999 11.2238 1.49999 11.5C1.49999 11.775 1.72374 12 1.99998 12H13.9999C14.276 12 14.4999 11.7762 14.4999 11.5C14.4999 11.2238 14.276 11 13.9999 11V6.00008H15.2499C15.6655 6.00008 15.9999 5.6657 15.9999 5.25008V3.75009C15.9999 3.44697 15.8186 3.17197 15.5374 3.05666ZM5.49996 11H2.99998V6.00008H5.49996V11ZM9.49993 11H6.49995V6.00008H9.49993V11ZM7.24994 4.25009C7.24994 3.83759 7.58744 3.5001 7.99994 3.5001C8.41244 3.5001 8.74993 3.83697 8.74993 4.25009C8.74993 4.66321 8.41244 5.00008 7.99994 5.00008C7.58744 5.00008 7.24994 4.66259 7.24994 4.25009ZM12.9999 11H10.4999V6.00008H12.9999V11ZM14.9999 5.00008H9.57493C9.6843 4.77196 9.74993 4.51884 9.74993 4.25009C9.74993 3.2851 8.96493 2.5001 7.99994 2.5001C7.03495 2.5001 6.24995 3.28447 6.24995 4.25009C6.24995 4.51949 6.31623 4.77196 6.42548 5.00008H0.999992V3.91572L7.99994 1.01918L14.9999 3.91572V5.00008Z"/>
  </svg>
  
);

// Mock data for stories - matching Figma design
const basicStepsData: StepProps[] = [
  {
    title: "Brand info",
    description: "This is the brand info step",
    icon: <TagIcon />,
  },
  {
    title: "Shipping needs", 
    description: "This is the shipping needs step",
    icon: <TruckIcon />,
  },
  {
    title: "Sales channels",
    description: "This is the sales channels step",
    icon: <NetworkIcon />,
  },
  {
    title: "Bank details",
    description: "This is the bank details step",
    icon: <BankIcon />,
  },
];

const processStepsData: StepProps[] = [
  {
    title: "Brand info",
    icon: <TagIcon />,
    status: "finish",
  },
  {
    title: "Shipping needs",
    icon: <TruckIcon />,
    status: "process",
  },
  {
    title: "Sales channels",
    icon: <NetworkIcon />,
    status: "wait",
  },
  {
    title: "Bank details",
    icon: <BankIcon />,
    status: "wait",
  },
];

const errorStepsData: StepProps[] = [
  {
    title: "Brand info",
    icon: <TagIcon />,
    status: "finish",
  },
  {
    title: "Shipping needs",
    icon: <TruckIcon />,
    status: "error",
  },
  {
    title: "Sales channels",
    icon: <NetworkIcon />,
    status: "wait",
  },
  {
    title: "Bank details",
    icon: <BankIcon />,
    status: "wait",
  },
];

// Steps without icons to test fallback numbers
const stepsWithoutIcons: StepProps[] = [
  { title: "Step One" },
  { title: "Step Two" },
  { title: "Step Three" },
  { title: "Step Four" },
];

// Mixed steps - some with icons, some without
const mixedStepsData: StepProps[] = [
  { title: "Brand info", icon: <TagIcon /> },
  { title: "Shipping needs" }, // No icon - should show number
  { title: "Sales channels", icon: <NetworkIcon /> },
  { title: "Bank details" }, // No icon - should show number
];

const meta: Meta<typeof Steps> = {
  title: "Atoms/Steps",
  component: Steps,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A Steps component for showing progress through a sequence of steps. Supports both horizontal and vertical layouts, multiple sizes, configurable styling, and fallback numbers when icons are not provided.",
      },
    },
  },
  argTypes: {
    current: {
      control: { type: "number", min: 0, max: 4 },
      description: "Current active step index",
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Direction of the steps layout",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the steps component",
    },
    status: {
      control: { type: "select" },
      options: ["wait", "process", "finish", "error"],
      description: "Override status for current step",
    },
    backgroundColor: {
      control: { type: "color" },
      description: "Background color for the wrapper container",
    },
    titleSize: {
      control: { type: "text" },
      description: "Font size for step titles",
    },
    titleWeight: {
      control: { type: "text" },
      description: "Font weight for step titles",
    },
    titleColor: {
      control: { type: "color" },
      description: "Color for step titles",
    },
    titleFont: {
      control: { type: "text" },
      description: "Font family for step titles",
    },
    descriptionSize: {
      control: { type: "text" },
      description: "Font size for step descriptions",
    },
    descriptionWeight: {
      control: { type: "text" },
      description: "Font weight for step descriptions",
    },
    descriptionColor: {
      control: { type: "color" },
      description: "Color for step descriptions",
    },
    descriptionFont: {
      control: { type: "text" },
      description: "Font family for step descriptions",
    },
    connectorVariant: {
      control: { type: "select" },
      options: ["solid", "dotted"],
      description: "Connector line style between steps",
    },
    iconBorderRadius: {
      control: { type: "text" },
      description: "Border radius for icon wrapper",
    },
    iconSize: {
      control: { type: "text" },
      description: "Size of icon wrapper",
    },
    primaryColor: {
      control: { type: "color" },
      description: "Primary color for active/highlighted states",
    },
    activeLineColor: {
      control: { type: "color" },
      description: "Color for active connector lines",
    },
    inactiveLineColor: {
      control: { type: "color" },
      description: "Color for inactive connector lines",
    },
    onChange: {
      action: "onChange",
      description: "Callback when step is clicked",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Steps>;

// Interactive Steps component for stories
const InteractiveSteps: React.FC<StepsProps> = (props) => {
  const [current, setCurrent] = useState(props.current || 0);

  return (
    <Steps
      {...props}
      current={current}
      onChange={(step) => {
        setCurrent(step);
        props.onChange?.(step);
      }}
    />
  );
};

// Default story - horizontal layout
export const Default: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    items: basicStepsData,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
    </div>
  ),
};

// Size variations
export const Sizes: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    items: basicStepsData,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>Small Size</h4>
        <Steps {...args} size="small" />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>Medium Size (Default)</h4>
        <Steps {...args} size="medium" />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>Large Size</h4>
        <Steps {...args} size="large" />
      </div>
    </div>
  ),
};

// Vertical layout
export const Vertical: Story = {
  args: {
    current: 1,
    direction: "vertical",
    size: "medium",
    items: basicStepsData,
    titleSize: "10px",
    titleWeight: "600",
    titleColor: "#2D3748",
    descriptionColor: "red",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <Steps {...args} />
    </div>
  ),
};

// Vertical with sizes
export const VerticalSizes: Story = {
  args: {
    current: 1,
    direction: "vertical",
    items: basicStepsData,
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "32px", width: "100%" }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#666" }}>Small</h4>
        <Steps {...args} size="small" />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#666" }}>Medium</h4>
        <Steps {...args} size="medium" />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#666" }}>Large</h4>
        <Steps {...args} size="large" />
      </div>
    </div>
  ),
};

// Status override test - this should fix the storybook status issue
export const StatusOverride: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    status: "error", // This should override the current step status
    items: basicStepsData,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        Current step should show error status (red) instead of default process status
      </p>
    </div>
  ),
};

// Fallback numbers when no icons provided
export const FallbackNumbers: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    items: stepsWithoutIcons,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        Steps without icons should show numbers instead
      </p>
    </div>
  ),
};

// Mixed icons and numbers
export const MixedIconsAndNumbers: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    items: mixedStepsData,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        Steps 2 and 4 have no icons and should show numbers (2, 4)
      </p>
    </div>
  ),
};

// Custom styling with intuitive prop names
export const CustomStyling: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    items: basicStepsData,
    titleSize: "16px",
    titleWeight: "600",
    titleColor: "#2D3748",
    titleFont: "Georgia, serif",
    iconBorderRadius: "8px",
    iconSize: "40px",
    primaryColor: "#FF6B6B",
    activeLineColor: "#FF6B6B",
    inactiveLineColor: "#E2E8F0",
    backgroundColor: "#F7FAFC",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        Custom styling: larger square icons, different colors, custom typography
      </p>
    </div>
  ),
};

// Interactive version
export const Interactive: Story = {
  args: {
    current: 0,
    direction: "horizontal",
    size: "medium",
    items: basicStepsData,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <InteractiveSteps {...args} />
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        Click on steps to navigate
      </p>
    </div>
  ),
};

// All completed
export const AllCompleted: Story = {
  args: {
    current: 4,
    direction: "horizontal",
    size: "medium",
    items: basicStepsData,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
    </div>
  ),
};

// With explicit status
export const WithStatus: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    items: processStepsData,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
    </div>
  ),
};

// Error state
export const WithError: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    items: errorStepsData,
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
    </div>
  ),
};

// Vertical with custom styling
export const VerticalCustom: Story = {
  args: {
    current: 2,
    direction: "vertical",
    size: "large",
    items: mixedStepsData,
    titleSize: "18px",
    titleWeight: "500",
    iconBorderRadius: "50%",
    iconSize: "48px",
    primaryColor: "#8B5CF6",
    backgroundColor: "#F3F4F6",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <Steps {...args} />
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        Vertical layout with larger circular icons and custom purple theme
      </p>
    </div>
  ),
};

// Connector positioning test
export const ConnectorTest: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    items: basicStepsData,
    iconSize: "50px",
    iconBorderRadius: "15px",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
        Different icon dimensions to test connector positioning
      </p>
    </div>
  ),
};

// Clickable steps
export const Clickable: Story = {
  args: {
    current: 0,
    direction: "horizontal",
    size: "medium",
    items: basicStepsData.map(step => ({
      ...step,
      onClick: () => console.log(`Clicked step: ${step.title}`)
    })),
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <InteractiveSteps {...args} />
    </div>
  ),
};

// Location timeline icon
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C4.817 0 2.222 2.595 2.222 5.778C2.222 10.389 8 16 8 16S13.778 10.389 13.778 5.778C13.778 2.595 11.183 0 8 0ZM8 8C6.773 8 5.778 7.005 5.778 5.778C5.778 4.551 6.773 3.556 8 3.556C9.227 3.556 10.222 4.551 10.222 5.778C10.222 7.005 9.227 8 8 8Z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM8 14.4C4.467 14.4 1.6 11.533 1.6 8C1.6 4.467 4.467 1.6 8 1.6C11.533 1.6 14.4 4.467 14.4 8C14.4 11.533 11.533 14.4 8 14.4ZM8.4 4H7.2V8.8L11.36 11.28L12 10.232L8.4 8.12V4Z" />
  </svg>
);

const CrossCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM11.536 10.464L10.464 11.536L8 9.072L5.536 11.536L4.464 10.464L6.928 8L4.464 5.536L5.536 4.464L8 6.928L10.464 4.464L11.536 5.536L9.072 8L11.536 10.464Z" />
  </svg>
);

const PhoneOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.293 10.293L11.293 8.293C10.902 7.902 10.268 7.902 9.878 8.293L9.17 9.001C8.47 8.601 7.87 8.101 7.37 7.501L6.37 6.501C6.77 5.801 6.37 5.001 5.77 4.401L3.77 2.401C3.38 2.01 2.75 2.01 2.36 2.401L1.07 3.691C0.58 4.181 0.38 4.891 0.55 5.561C1.33 8.561 3.5 11.561 6.5 13.561C7.17 13.961 7.97 13.961 8.56 13.461L10.15 11.871L13.293 10.293Z" />
  </svg>
);

const locationTimelineData: StepProps[] = [
  {
    title: "Arrived at delivery location",
    description: "Mon | 26 Jan 2025 | 18:22 PM",
    icon: <LocationIcon />,
  },
  {
    title: "Attempted delivery",
    description: "Mon | 26 Jan 2025",
    icon: <LocationIcon />,
  },
];

const callTimelineData: StepProps[] = [
  {
    title: "Call attempt time",
    description: "10:24 AM | Sep 26, 2026",
    icon: <ClockIcon />,
  },
  {
    title: "Call not connected",
    description: "This call was not answered by the consignee",
    icon: <CrossCircleIcon />,
    status: "error",
  },
  {
    title: "Call duration",
    description: "No connection established",
    icon: <PhoneOffIcon />,
  },
];

// Dotted connector - Vertical (Location Timeline)
export const DottedConnector: Story = {
  args: {
    current: 0,
    direction: "vertical",
    size: "medium",
    items: locationTimelineData,
    connectorVariant: "dotted",
    backgroundColor: "#F3F4F6",
    titleWeight: "600",
    descriptionColor: "#6B7280",
    descriptionSize: "12px",
    inactiveLineColor: "#9CA3AF",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <Steps {...args} />
    </div>
  ),
};

// Dotted connector - Vertical (Call Timeline)
export const DottedCallTimeline: Story = {
  args: {
    current: -1,
    direction: "vertical",
    size: "medium",
    items: callTimelineData,
    connectorVariant: "dotted",
    backgroundColor: "#FAFAFA",
    titleWeight: "600",
    descriptionSize: "12px",
    inactiveLineColor: "#D1D5DB",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <Steps {...args} />
    </div>
  ),
};

// Dotted connector - Horizontal
export const DottedHorizontal: Story = {
  args: {
    current: 1,
    direction: "horizontal",
    size: "medium",
    items: basicStepsData,
    connectorVariant: "dotted",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Steps {...args} />
    </div>
  ),
};

export const HowToUse: Story = {
  render: () => (
    <div style={{ 
      fontFamily: 'monospace', 
      fontSize: '14px', 
      lineHeight: '1.5',
      whiteSpace: 'pre-wrap',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      maxWidth: '800px'
    }}>
      {`1. Default Steps (Large Size)

<Steps 
  current={1} 
  size="large"
  items={stepItems}
/>

2. Horizontal Steps with Custom Styling

<Steps
  current={1}
  size="medium"
  direction="horizontal"
  backgroundColor="#F7FAFC"
  primaryColor="#FF6B6B"
  titleSize="16px"
  titleWeight="600"
  iconSize="40px"
  iconBorderRadius="8px"
  items={stepItems}
/>

3. Vertical Steps with Custom Colors

<Steps
  direction="vertical"
  size="large"
  primaryColor="#8B5CF6"
  activeLineColor="#8B5CF6"
  inactiveLineColor="#E2E8F0"
  items={stepItems}
/>

4. Status Override Example

<Steps
  current={1}
  status="error"
  items={statusOverrideStepItems}
/>

5. Clickable Steps with Navigation

<Steps
  current={0}
  onChange={(step) => console.log('Clicked step:', step)}
  items={clickableStepItems}
/>

6. Using Children API

<Steps current={1}>
  <Steps.Step title="First" description="Start here" />
  <Steps.Step title="Second" description="Continue here" />
  <Steps.Step title="Third" description="Finish here" />
</Steps>

---

STEP ITEMS EXAMPLES:

1. Basic stepItems (titles only)
const stepItems = [
  { title: 'Login' },
  { title: 'Verification' },
  { title: 'Pay' },
  { title: 'Done' }
];

2. StepItems with descriptions
const detailedStepItems = [
  { 
    title: 'Account Setup', 
    description: 'Create your account and verify email' 
  },
  { 
    title: 'Profile Information', 
    description: 'Add your personal details and preferences' 
  },
  { 
    title: 'Payment Method', 
    description: 'Choose your billing and payment options' 
  },
  { 
    title: 'Confirmation', 
    description: 'Review and confirm your setup' 
  }
];

3. StepItems with custom icons
const iconStepItems = [
  { 
    title: 'Start', 
    icon: <PlayIcon />,
    description: 'Begin the process' 
  },
  { 
    title: 'Configure', 
    icon: <SettingsIcon />,
    description: 'Set your preferences' 
  },
  { 
    title: 'Deploy', 
    icon: <RocketIcon />,
    description: 'Launch your application' 
  }
];

4. StepItems with mixed icons and numbers (fallback)
const mixedStepItems = [
  { 
    title: 'Welcome', 
    icon: <WelcomeIcon />,
    description: 'Get started with our platform' 
  },
  { 
    title: 'Setup', 
    // No icon provided - will show number "2"
    description: 'Configure your settings' 
  },
  { 
    title: 'Complete', 
    icon: <CheckIcon />,
    description: 'Finish the onboarding' 
  }
];

5. StepItems with status override
const statusOverrideStepItems = [
  { 
    title: 'Step 1', 
    status: 'finish' 
  },
  { 
    title: 'Step 2', 
    status: 'error',
    description: 'This step failed' 
  },
  { 
    title: 'Step 3', 
    status: 'wait' 
  }
];

6. StepItems with click handlers
const clickableStepItems = [
  { 
    title: 'Dashboard', 
    onClick: () => navigate('/dashboard'),
    description: 'View your overview' 
  },
  { 
    title: 'Settings', 
    onClick: () => navigate('/settings'),
    description: 'Manage preferences' 
  },
  { 
    title: 'Profile', 
    onClick: () => navigate('/profile'),
    description: 'Edit your profile' 
  }
];

7. Dotted Connector (Timeline Style)

<Steps
  direction="vertical"
  connectorVariant="dotted"
  backgroundColor="#F3F4F6"
  titleWeight="600"
  descriptionColor="#6B7280"
  descriptionSize="12px"
  inactiveLineColor="#9CA3AF"
  items={timelineItems}
/>

8. Custom Description Styling

<Steps
  current={1}
  descriptionSize="11px"
  descriptionWeight="500"
  descriptionColor="#EF4444"
  descriptionFont="monospace"
  items={stepItems}
/>

---

Props:

• current?: number - Current active step (0-based index)
• direction?: 'horizontal' | 'vertical' - Layout direction
• size?: 'small' | 'medium' | 'large' - Component size
• status?: 'wait' | 'process' | 'finish' | 'error' - Global status
• items?: StepProps[] - Array of step configurations
• onChange?: (current: number) => void - Click handler
• backgroundColor?: string - Background color
• titleSize?: string - Title font size
• titleWeight?: string - Title font weight  
• titleColor?: string - Title text color
• titleFont?: string - Title font family
• descriptionSize?: string - Description font size
• descriptionWeight?: string - Description font weight
• descriptionColor?: string - Description text color
• descriptionFont?: string - Description font family
• connectorVariant?: 'solid' | 'dotted' - Connector line style
• iconBorderRadius?: string - Icon wrapper border radius
• iconSize?: string - Icon wrapper dimensions
• primaryColor?: string - Main theme color
• activeLineColor?: string - Active connector color
• inactiveLineColor?: string - Inactive connector color`}
    </div>
  ),
};