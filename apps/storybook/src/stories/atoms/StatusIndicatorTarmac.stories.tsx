import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusIndicator, ThemeProvider } from "@delhivery/tarmac";
import type { StatusIndicatorProps } from "@delhivery/tarmac";
import { css } from "@emotion/css";

// ============================================
// Theme Wrapper
// ============================================

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    <div style={{ padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      {children}
    </div>
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider
    initialSource="./tarmac-theme.json"
    activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}
  >
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: 24,
        borderRadius: 8,
        fontFamily: "Noto Sans, sans-serif",
      }}
    >
      {children}
    </div>
  </ThemeProvider>
);

// ============================================
// Constants
// ============================================

const VARIANTS = [
  "success", "failed", "warning", "information", "synced",
  "scheduled", "unknown", "pause", "play", "downloading", "pending",
] as const;

const SIZES = ["lg", "md", "sm", "xs"] as const;

const sectionTitle = css({
  fontSize: "16px",
  fontWeight: 600,
  marginBottom: "12px",
  marginTop: "24px",
  color: "#121212",
});

const gridRow = css({
  display: "flex",
  gap: "24px",
  alignItems: "center",
  flexWrap: "wrap",
});

const gridCol = css({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const labelText = css({
  fontSize: "10px",
  color: "#666",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

// ============================================
// Meta
// ============================================

const meta: Meta<StatusIndicatorProps> = {
  title: "Tarmac TDS/StatusIndicator",
  component: StatusIndicator,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<StatusIndicatorProps>;

// ============================================
// Story 1 — Playground
// ============================================

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    variant: "success",
    size: "md",
    label: "Success",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [...VARIANTS],
    },
    size: {
      control: "select",
      options: [...SIZES],
    },
    label: { control: "text" },
  },
  render: (args) => <StatusIndicator {...args} />,
};

// ============================================
// Story 2 — Full Matrix (all variants × all sizes)
// ============================================

const VariantRow: React.FC<{ variant: string }> = ({ variant }) => (
  <tr>
    <td style={{ padding: "6px 12px", fontWeight: 500, fontSize: 13, color: "#333" }}>
      {variant}
    </td>
    {SIZES.map((size) => (
      <td key={size} style={{ padding: "6px 12px" }}>
        <StatusIndicator
          variant={variant}
          size={size}
          label={variant.charAt(0).toUpperCase() + variant.slice(1)}
        />
      </td>
    ))}
  </tr>
);

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div>
      <p className={sectionTitle}>All Variants × All Sizes</p>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "6px 12px", textAlign: "left", fontSize: 11, color: "#999", borderBottom: "1px solid #eee" }}>
              Variant
            </th>
            {SIZES.map((s) => (
              <th key={s} style={{ padding: "6px 12px", textAlign: "left", fontSize: 11, color: "#999", borderBottom: "1px solid #eee" }}>
                {s.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VARIANTS.map((v) => (
            <VariantRow key={v} variant={v} />
          ))}
        </tbody>
      </table>
    </div>
  ),
};

// ============================================
// Story 3-13 — Per-Variant Stories
// ============================================

const variantStory = (variant: string): Story => ({
  render: () => (
    <div>
      <p className={sectionTitle}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</p>
      <div className={gridCol}>
        {SIZES.map((size) => (
          <div key={size} className={gridRow}>
            <span className={labelText} style={{ width: 30 }}>{size}</span>
            <StatusIndicator variant={variant} size={size} label={variant.charAt(0).toUpperCase() + variant.slice(1)} />
          </div>
        ))}
      </div>
    </div>
  ),
});

export const Success: Story = { name: "Success", ...variantStory("success") };
export const Failed: Story = { name: "Failed", ...variantStory("failed") };
export const Warning: Story = { name: "Warning", ...variantStory("warning") };
export const Information: Story = { name: "Information", ...variantStory("information") };
export const Synced: Story = { name: "Synced", ...variantStory("synced") };
export const Scheduled: Story = { name: "Scheduled", ...variantStory("scheduled") };
export const Unknown: Story = { name: "Unknown", ...variantStory("unknown") };
export const Pause: Story = { name: "Pause", ...variantStory("pause") };
export const Play: Story = { name: "Play", ...variantStory("play") };
export const Downloading: Story = { name: "Downloading", ...variantStory("downloading") };
export const Pending: Story = { name: "Pending", ...variantStory("pending") };

// ============================================
// Story 14 — Per-Size Stories
// ============================================

const sizeStory = (size: string): Story => ({
  render: () => (
    <div>
      <p className={sectionTitle}>Size: {size.toUpperCase()}</p>
      <div className={gridCol}>
        {VARIANTS.map((v) => (
          <StatusIndicator key={v} variant={v} size={size} label={v.charAt(0).toUpperCase() + v.slice(1)} />
        ))}
      </div>
    </div>
  ),
});

export const SizeLarge: Story = { name: "Size — Large", ...sizeStory("lg") };
export const SizeMedium: Story = { name: "Size — Medium", ...sizeStory("md") };
export const SizeSmall: Story = { name: "Size — Small", ...sizeStory("sm") };
export const SizeXSmall: Story = { name: "Size — XSmall", ...sizeStory("xs") };

// ============================================
// Story 15 — Custom Icon
// ============================================

const CustomCheckIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#1BA86E" />
  </svg>
);

const CustomWarningIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#F5C828" />
  </svg>
);

export const CustomIcons: Story = {
  name: "Custom Icons",
  render: () => (
    <div>
      <p className={sectionTitle}>Custom Icon Override</p>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        Pass a custom <code>icon</code> prop to override the default dot indicator.
      </p>
      <div className={gridCol}>
        <StatusIndicator variant="success" size="lg" label="Custom Check" icon={<CustomCheckIcon />} />
        <StatusIndicator variant="warning" size="lg" label="Custom Warning" icon={<CustomWarningIcon />} />
        <StatusIndicator variant="information" size="md" label="Default Dot (no icon prop)" />
      </div>
    </div>
  ),
};

// ============================================
// Story 16 — Without Label
// ============================================

export const WithoutLabel: Story = {
  name: "Without Label",
  render: () => (
    <div>
      <p className={sectionTitle}>Icon Only (no label)</p>
      <div className={gridRow}>
        {VARIANTS.map((v) => (
          <StatusIndicator key={v} variant={v} size="md" />
        ))}
      </div>
    </div>
  ),
};

// ============================================
// Story 17 — Light vs Dark Mode
// ============================================

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  decorators: [], // override default decorator
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1 }}>
        <Wrap>
          <p className={sectionTitle}>Light Mode</p>
          <div className={gridCol}>
            {VARIANTS.map((v) => (
              <StatusIndicator key={v} variant={v} size="md" label={v.charAt(0).toUpperCase() + v.slice(1)} />
            ))}
          </div>
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <DarkWrap>
          <p className={sectionTitle} style={{ color: "#e6e6e6" }}>Dark Mode</p>
          <div className={gridCol}>
            {VARIANTS.map((v) => (
              <StatusIndicator key={v} variant={v} size="md" label={v.charAt(0).toUpperCase() + v.slice(1)} />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
