import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar, ThemeProvider } from "@delhivery/tarmac";
import type { ProgressBarProps } from "@delhivery/tarmac";

const VARIANTS = ["black", "coal", "blue", "green", "dlv_red"] as const;
const SIZES = ["sm", "lg"] as const;
const BAR_TYPES = ["filled", "line"] as const;

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

const meta: Meta<ProgressBarProps> = {
  title: "Tarmac TDS/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<ProgressBarProps>;

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    value: 50,
    variant: "black",
    size: "lg",
    barType: "filled",
  },
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
    barType: { control: "select", options: [...BAR_TYPES] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  render: (args) => (
    <div style={{ width: 300 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const PlaygroundWithText: Story = {
  name: "Playground with Text",
  parameters: { layout: "centered" },
  args: {
    value: 50,
    variant: "black",
    size: "lg",
    barType: "filled",
    title: "Title here",
    titleNumber: "02",
    subtext: "Subtext here",
    subtextNumber: "50/100",
  },
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
    barType: { control: "select", options: [...BAR_TYPES] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showTitle: { control: "boolean" },
    showTitleNumber: { control: "boolean" },
    showSubtext: { control: "boolean" },
    showSubtextNumber: { control: "boolean" },
  },
  render: (args) => (
    <div style={{ width: 300 }}>
      <ProgressBar {...args} />
    </div>
  ),
} as Story

const VariantSection: React.FC<{ variant: string }> = ({ variant }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: "capitalize" }}>{variant}</h3>
    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "8px 16px", alignItems: "center" }}>
      <div />
      <div style={{ fontSize: 11, color: "#888" }}>Filled</div>
      <div style={{ fontSize: 11, color: "#888" }}>Line</div>
      {SIZES.map((sz) =>
        [0, 25, 50, 75, 100].map((val) => (
          <React.Fragment key={`${sz}-${val}`}>
            <div style={{ fontSize: 11, color: "#888" }}>{sz}/{val}%</div>
            {BAR_TYPES.map((bt) => (
              <div key={bt}>
                <ProgressBar value={val} variant={variant as ProgressBarProps["variant"]} size={sz} barType={bt} />
              </div>
            ))}
          </React.Fragment>
        ))
      )}
    </div>
  </div>
);

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24 }}>
      {VARIANTS.map((v) => <VariantSection key={v} variant={v} />)}
    </div>
  ),
};

const WithTextSection: React.FC<{ variant: string }> = ({ variant }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: "capitalize" }}>{variant}</h3>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {SIZES.map((sz) => (
        <div key={sz}>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Size: {sz}</div>
          <ProgressBar
            value={50}
            variant={variant as ProgressBarProps["variant"]}
            size={sz}
            barType="filled"
            title="Title here"
            titleNumber="02"
            subtext="Subtext here"
            subtextNumber="50/100"
          />
        </div>
      ))}
    </div>
  </div>
);

export const WithText: Story = {
  name: "Progress Bar + Text",
  render: () => (
    <div style={{ padding: 24, maxWidth: 600 }}>
      {VARIANTS.map((v) => <WithTextSection key={v} variant={v} />)}
    </div>
  ),
};

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24 }}>
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Light</h3>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <ProgressBar key={v} value={60} variant={v} size="lg" barType="filled" title={v} subtextNumber="60/100" />
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Dark</h3>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <ProgressBar key={v} value={60} variant={v} size="lg" barType="filled" title={v} subtextNumber="60/100" />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
