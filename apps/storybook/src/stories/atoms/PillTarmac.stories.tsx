import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pill, ThemeProvider } from "@delhivery/tarmac";
import type { PillProps } from "@delhivery/tarmac";

/** Figma types — Disabled and Ghost are types in Pill, not states */
const ALL_TYPES = ["solid", "subtle", "outlined", "disabled", "ghost"] as const;
const INTERACTIVE_TYPES = ["solid", "subtle", "outlined"] as const;
const VARIANTS = ["black", "white", "coal", "blue", "success", "error", "warning", "legacy_blue"] as const;
const SIZES = ["lg", "md", "sm"] as const;
const SIZE_MAP: Record<string, string> = { lg: "Large", md: "Medium", sm: "Small" };

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);
const Ico = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
  </svg>
);

/** Renders a pill for any of the 5 Figma types including disabled/ghost */
const TypedPill: React.FC<
  Omit<PillProps, "pillType" | "isDisabled" | "isGhost"> & { figmaType: typeof ALL_TYPES[number] }
> = ({ figmaType, ...props }) => {
  if (figmaType === "disabled") return <Pill {...props} pillType="solid" isDisabled />;
  if (figmaType === "ghost") return <Pill {...props} isGhost />;
  return <Pill {...props} pillType={figmaType as "solid" | "subtle" | "outlined"} />;
};

const meta: Meta<any> = {
  title: "Tarmac TDS/Pill",
  component: Pill,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<any>;

/* ═══ Story 1: Interactive Playground ═══ */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    pillVariant: "black",
    size: "md",
    pillType: "solid",
    text: "Pill",
    showStatus: false,
  },
  argTypes: {
    pillVariant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
    pillType: { control: "select", options: [...INTERACTIVE_TYPES] },
    text: { control: "text" },
    showStatus: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
  },
  render: (args) => (
    <Pill
      {...args}
      leadingIcon={<Ico />}
      trailingIcon={<Ico />}
    />
  ),
} as Story

/* ═══ Story 2: Full 120 Matrix (matches Figma Playground layout) ═══ */
/* Columns: Solid | Subtle | Outlined | Disabled | Ghost (5 types)   */
/* Rows per variant: Large | Medium | Small (3 sizes)                */
const s: Record<string, React.CSSProperties> = {
  page: { padding: 24, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title: { fontSize: 15, fontWeight: 700, color: "#374151", margin: "28px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  grid: { display: "grid", gridTemplateColumns: "80px repeat(5, 1fr)", gap: "6px 12px", alignItems: "center" },
  colHdr: { fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, textAlign: "center" as const, padding: "4px 0" },
  rowLabel: { fontSize: 9, color: "#b0b0b0", textAlign: "right" as const, paddingRight: 8 },
  cell: { display: "flex", justifyContent: "center", alignItems: "center", padding: "4px 0" },
};

const VariantSection: React.FC<{ variant: typeof VARIANTS[number] }> = ({ variant }) => {
  const dark = variant === "white";
  const wrap: React.CSSProperties = dark ? { backgroundColor: "#1a1a2e", padding: 16, borderRadius: 8 } : {};
  return (
    <div>
      <div style={s.title}>
        {variant}{dark && <span style={{ fontSize: 10, color: "#9ca3af", marginLeft: 8 }}>(dark bg)</span>}
      </div>
      <div style={wrap}>
        <div style={s.grid}>
          <div />
          {ALL_TYPES.map((t) => <div key={t} style={s.colHdr}>{t}</div>)}
          {SIZES.map((sz) => (
            <React.Fragment key={sz}>
              <div style={{ ...s.rowLabel, ...(dark ? { color: "#6b7280" } : {}) }}>{SIZE_MAP[sz]}</div>
              {ALL_TYPES.map((t) => (
                <div key={t} style={s.cell}>
                  <TypedPill
                    figmaType={t}
                    pillVariant={variant}
                    size={sz}
                    leadingIcon={<Ico />}
                    text="Pill"
                    trailingIcon={<Ico />}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FullMatrix: Story = {
  name: "Full 120 Matrix",
  render: () => (
    <div style={s.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>8 Variants × 5 Types × 3 Sizes = 120 pills (matches Figma Playground)</p>
      {VARIANTS.map((v) => <VariantSection key={v} variant={v} />)}
    </div>
  ),
};

/* ═══ Stories 3-10: Per-variant ═══ */
const vs = (variant: typeof VARIANTS[number]): Story => ({
  render: () => <div style={s.page}><VariantSection variant={variant} /></div>,
});
export const Black: Story = { name: "Black", ...vs("black") };
export const White: Story = { name: "White", ...vs("white") };
export const Coal: Story = { name: "Coal", ...vs("coal") };
export const Blue: Story = { name: "Blue", ...vs("blue") };
export const Success: Story = { name: "Success", ...vs("success") };
export const Error_: Story = { name: "Error", ...vs("error") };
export const Warning: Story = { name: "Warning", ...vs("warning") };
export const LegacyBlue: Story = { name: "Legacy Blue", ...vs("legacy_blue") };

/* ═══ Dark Mode Comparison ═══ */
const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ALL_TYPES.map((t) => (
              <div key={t} style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                {VARIANTS.filter(v => v !== "white").map((v) => (
                  <Pill
                    key={v}
                    pillVariant={v}
                    pillType={t === "disabled" || t === "ghost" ? "solid" : t}
                    isDisabled={t === "disabled"}
                    isGhost={t === "ghost"}
                    size="lg"
                    text={v}
                    leadingIcon={<Ico />}
                  />
                ))}
              </div>
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ALL_TYPES.map((t) => (
              <div key={t} style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                {VARIANTS.filter(v => v !== "white").map((v) => (
                  <Pill
                    key={v}
                    pillVariant={v}
                    pillType={t === "disabled" || t === "ghost" ? "solid" : t}
                    isDisabled={t === "disabled"}
                    isGhost={t === "ghost"}
                    size="lg"
                    text={v}
                    leadingIcon={<Ico />}
                  />
                ))}
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
