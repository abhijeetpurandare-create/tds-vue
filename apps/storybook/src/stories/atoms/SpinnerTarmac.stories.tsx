import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner, ThemeProvider } from "@delhivery/tarmac";
import type { SpinnerProps } from "@delhivery/tarmac";

const VARIANTS = ["tarmac-01", "tarmac-02", "tarmac-03", "tarmac-04"] as const;
const SIZES = ["16px", "20px", "24px", "28px", "32px", "36px", "40px", "44px"] as const;
const VARIANT_LABELS: Record<string, string> = {
  "tarmac-01": "01 — Dark on Light",
  "tarmac-02": "02 — Light on Dark",
  "tarmac-03": "03 — White on Transparent",
  "tarmac-04": "04 — DLV Red on Light",
};

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
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

const meta: Meta<SpinnerProps> = {
  title: "Tarmac TDS/Spinner",
  component: Spinner,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<SpinnerProps>;

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    tarmacVariant: "tarmac-01",
    tarmacSize: "32px",
  },
  argTypes: {
    tarmacVariant: { control: "select", options: [...VARIANTS] },
    tarmacSize: { control: "select", options: [...SIZES] },
  },
  render: (args) => <Spinner {...args} />,
};

const Cell: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
      borderRadius: 6,
      backgroundColor: dark ? "#1a1a1a" : "transparent",
    }}
  >
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 11, color: "#888", textAlign: "center", padding: "4px 0" }}>{children}</div>
);

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `140px repeat(${SIZES.length}, 1fr)`,
          gap: "8px 12px",
          alignItems: "center",
        }}
      >
        <div />
        {SIZES.map((sz) => (
          <Label key={sz}>{sz}</Label>
        ))}

        {VARIANTS.map((v) => (
          <React.Fragment key={v}>
            <Label>{VARIANT_LABELS[v]}</Label>
            {SIZES.map((sz) => (
              <Cell key={sz} dark={v === "tarmac-03"}>
                <Spinner tarmacVariant={v} tarmacSize={sz} />
              </Cell>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
};

const vs = (variant: string): Story => ({
  render: () => (
    <div style={{ padding: 24 }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600 }}>{VARIANT_LABELS[variant]}</h3>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", ...(variant === "tarmac-03" ? { backgroundColor: "#1a1a1a", padding: 16, borderRadius: 8 } : {}) }}>
        {SIZES.map((sz) => (
          <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Spinner tarmacVariant={variant} tarmacSize={sz} />
            <span style={{ fontSize: 10, color: variant === "tarmac-03" ? "#aaa" : "#888" }}>{sz}</span>
          </div>
        ))}
      </div>
    </div>
  ),
});

export const Variant01: Story = { name: "01 — Dark on Light", ...vs("tarmac-01") };
export const Variant02: Story = { name: "02 — Light on Dark", ...vs("tarmac-02") };
export const Variant03: Story = { name: "03 — White on Transparent", ...vs("tarmac-03") };
export const Variant04: Story = { name: "04 — DLV Red on Light", ...vs("tarmac-04") };

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14 }}>Light Mode</h3>
        <Wrap>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {VARIANTS.map((v) => (
              <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, ...(v === "tarmac-03" ? { backgroundColor: "#1a1a1a", padding: 8, borderRadius: 6 } : {}) }}>
                <Spinner tarmacVariant={v} tarmacSize="32px" />
                <span style={{ fontSize: 10, color: v === "tarmac-03" ? "#aaa" : "#888" }}>{v}</span>
              </div>
            ))}
          </div>
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14 }}>Dark Mode</h3>
        <DarkWrap>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {VARIANTS.map((v) => (
              <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Spinner tarmacVariant={v} tarmacSize="32px" />
                <span style={{ fontSize: 10, color: "#aaa" }}>{v}</span>
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
