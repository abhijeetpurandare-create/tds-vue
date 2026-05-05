import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, ThemeProvider } from "@delhivery/tarmac";
import type { AlertProps } from "@delhivery/tarmac";

const VARIANTS = ["white", "black", "coal", "success", "error", "info", "warning"] as const;
const STYLES = ["singleText", "dualText"] as const;
const SIZES = ["lg", "sm"] as const;
type V = (typeof VARIANTS)[number];

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

const SampleIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const meta: Meta<AlertProps> = {
  title: "Tarmac TDS/Alert",
  component: Alert,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    alertStyle: { control: "select", options: [...STYLES] },
    size: { control: "select", options: [...SIZES] },
    title: { control: "text" },
    description: { control: "text" },
    closable: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<AlertProps>;

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    variant: "white",
    alertStyle: "dualText",
    size: "lg",
    title: "Update available !",
    description: "Something needs your review. Resolve the highlighted items to avoid issues.",
    closable: true,
  },
  render: (args) => (
    <div style={{ width: 380 }}>
      <Alert
        {...args}
        leadingIcon={<SampleIcon size={args.size === "sm" ? 20 : 24} />}
        showCtas
      />
    </div>
  ),
};

const VariantSection: React.FC<{ variant: V }> = ({ variant }) => {
  const isDark = variant === "black";
  const wrapStyle: React.CSSProperties = isDark
    ? { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 } : {};

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#333", marginBottom: 12, textTransform: "capitalize" }}>
        {variant}
      </div>
      <div style={wrapStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {STYLES.map((sty) =>
            SIZES.map((sz) => (
              <div key={`${sty}-${sz}`}>
                <div style={{ fontSize: 10, color: "#999", marginBottom: 4 }}>{sty} / {sz}</div>
                <Alert
                  variant={variant}
                  alertStyle={sty}
                  size={sz}
                  title={sty === "dualText" ? "Update available !" : undefined}
                  description={sty === "dualText"
                    ? "Something needs your review. Resolve the highlighted items to avoid issues."
                    : "Something needs your review. Resolve the highlighted items to avoid issues."}
                  leadingIcon={<SampleIcon size={sz === "sm" ? 20 : 24} />}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 32 }}>
      {VARIANTS.map((v) => <VariantSection key={v} variant={v} />)}
    </div>
  ),
};

const vs = (variant: V): Story => ({
  render: () => <div style={{ padding: 32 }}><VariantSection variant={variant} /></div>,
});
export const White: Story = { name: "White", ...vs("white") };
export const Black: Story = { name: "Black", ...vs("black") };
export const Coal: Story = { name: "Coal", ...vs("coal") };
export const Success: Story = { name: "Success", ...vs("success") };
export const Error_: Story = { name: "Error", ...vs("error") };
export const Info: Story = { name: "Info", ...vs("info") };
export const Warning: Story = { name: "Warning", ...vs("warning") };

export const WithCTAs: Story = {
  name: "With CTAs",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      {VARIANTS.map((v) => (
        <Alert key={v} variant={v} alertStyle="dualText" size="lg"
          title="Update available !"
          description="Something needs your review."
          leadingIcon={<SampleIcon />}
          showCtas
        />
      ))}
    </div>
  ),
};

export const WithCTAsSmall: Story = {
  name: "With CTAs (Small)",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, maxWidth: 340 }}>
      {VARIANTS.map((v) => (
        <Alert key={v} variant={v} alertStyle="dualText" size="sm"
          title="Update available !"
          description="Something needs your review."
          leadingIcon={<SampleIcon size={20} />}
          showCtas
        />
      ))}
    </div>
  ),
};

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 32 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Light Mode</div>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Alert key={v} variant={v} alertStyle="dualText" size="lg"
                title={`${v} alert`} description="Description text"
                leadingIcon={<SampleIcon />} />
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Dark Mode</div>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Alert key={v} variant={v} alertStyle="dualText" size="lg"
                title={`${v} alert`} description="Description text"
                leadingIcon={<SampleIcon />} />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
