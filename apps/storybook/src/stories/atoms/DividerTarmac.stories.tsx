import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider, ThemeProvider } from "@delhivery/tarmac";
import type { DividerProps } from "@delhivery/tarmac";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider
    initialSource="./tarmac-theme.json"
    activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}
  >
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>
      {children}
    </div>
  </ThemeProvider>
);

const TYPES = ["line", "dash"] as const;
const SIZES = ["0.5", "1", "1.5"] as const;

const meta: Meta<DividerProps> = {
  title: "Tarmac TDS/Divider",
  component: Divider,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<DividerProps>;

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "padded" },
  args: { dividerType: "line", size: "1", orientation: "horizontal" },
  argTypes: {
    dividerType: { control: "select", options: [...TYPES] },
    size: { control: "select", options: [...SIZES] },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  render: (args) => (
    <div style={{ height: args.orientation === "vertical" ? 100 : "auto", display: "flex" }}>
      <Divider {...args} />
    </div>
  ),
};

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontSize: 12, color: "#666", fontFamily: "monospace", minWidth: 80 }}>
    {children}
  </span>
);

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 32 }}>
      {TYPES.map((type) => (
        <div key={type}>
          <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>
            Type: {type}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {SIZES.map((size) => (
              <div key={size} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <SectionLabel>Size {size}</SectionLabel>
                <div style={{ flex: 1 }}>
                  <Divider dividerType={type} size={size} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Line: Story = {
  name: "Line",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SectionLabel>Size {size}</SectionLabel>
          <div style={{ flex: 1 }}>
            <Divider dividerType="line" size={size} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Dash: Story = {
  name: "Dash",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SectionLabel>Size {size}</SectionLabel>
          <div style={{ flex: 1 }}>
            <Divider dividerType="dash" size={size} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  name: "Vertical",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 32 }}>
      {TYPES.map((type) => (
        <div key={type} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>{type}</span>
          <div style={{ display: "flex", gap: 16, height: 80 }}>
            {SIZES.map((size) => (
              <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Divider dividerType={type} size={size} orientation="vertical" />
                <span style={{ fontSize: 10, color: "#999" }}>{size}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Light</h3>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {TYPES.map((type) =>
              SIZES.map((size) => (
                <Divider key={`${type}-${size}`} dividerType={type} size={size} />
              ))
            )}
          </div>
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>Dark</h3>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {TYPES.map((type) =>
              SIZES.map((size) => (
                <Divider key={`${type}-${size}`} dividerType={type} size={size} />
              ))
            )}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
