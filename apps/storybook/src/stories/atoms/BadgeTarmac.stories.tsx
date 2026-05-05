import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge, ThemeProvider } from "@delhivery/tarmac";
import type { BadgeProps } from "@delhivery/tarmac";

/** Figma types — Disabled and Ghost are types in Badge, not states */
const ALL_TYPES = ["solid", "subtle", "outlined", "disabled", "ghost"] as const;
const INTERACTIVE_TYPES = ["solid", "subtle", "outlined"] as const;
const VARIANTS = ["black", "white", "coal", "dlv_red", "info", "success", "warning", "error", "cardbox"] as const;
const SIZES = ["lg", "md", "sm"] as const;
const SIZE_MAP: Record<string, string> = { lg: "Large", md: "Medium", sm: "Small" };

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);
const Ico = ({ s = 12 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-1 4a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V7z" clipRule="evenodd" />
  </svg>
);

/** Renders a badge for any of the 5 Figma types including disabled/ghost */
const TypedBadge: React.FC<Omit<BadgeProps, "badgeType" | "isDisabled" | "isGhost"> & { figmaType: typeof ALL_TYPES[number] }> = ({ figmaType, ...props }) => {
  if (figmaType === "disabled") return <Badge {...props} badgeType="solid" isDisabled />;
  if (figmaType === "ghost") return <Badge {...props} isGhost />;
  return <Badge {...props} badgeType={figmaType} />;
};

const meta: Meta<any> = {
  title: "Tarmac TDS/Badge",
  component: Badge,
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
  args: { variant: "black", size: "md", badgeType: "solid", text: "Badge", showStatus: false },
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
    badgeType: { control: "select", options: [...INTERACTIVE_TYPES] },
    text: { control: "text" },
    showStatus: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
  },
  render: (args: any) => (
    <Badge {...args} leadingIcon={<Ico s={args.size === "lg" ? 16 : 12} />} trailingIcon={<Ico s={args.size === "lg" ? 16 : 12} />} />
  ),
};

/* ═══ Story 2: Full 135 Matrix (matches Figma Playground layout) ═══ */
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
                  <TypedBadge
                    figmaType={t}
                    variant={variant}
                    size={sz}
                    leadingIcon={<Ico s={sz === "lg" ? 16 : 12} />}
                    text="Badge"
                    trailingIcon={<Ico s={sz === "lg" ? 16 : 12} />}
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
  name: "Full 135 Matrix",
  render: () => (
    <div style={s.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>9 Variants × 5 Types × 3 Sizes = 135 badges (matches Figma Playground)</p>
      {VARIANTS.map((v) => <VariantSection key={v} variant={v} />)}
    </div>
  ),
};

/* ═══ Stories 3-11: Per-variant ═══ */
const vs = (variant: typeof VARIANTS[number]): Story => ({
  render: () => <div style={s.page}><VariantSection variant={variant} /></div>,
});
export const Black: Story = { name: "Black", ...vs("black") };
export const White: Story = { name: "White", ...vs("white") };
export const Coal: Story = { name: "Coal", ...vs("coal") };
export const DlvRed: Story = { name: "DLV Red", ...vs("dlv_red") };
export const Info: Story = { name: "Info (Blue)", ...vs("info") };
export const Success: Story = { name: "Success", ...vs("success") };
export const Warning: Story = { name: "Warning", ...vs("warning") };
export const Error_: Story = { name: "Error", ...vs("error") };
export const Cardbox: Story = { name: "Cardbox", ...vs("cardbox") };


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
                  <Badge key={v} variant={v} badgeType={t === "disabled" || t === "ghost" ? "solid" : t} isDisabled={t === "disabled"} isGhost={t === "ghost"} size="lg" text={v} leadingIcon={<Ico />} />
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
                  <Badge key={v} variant={v} badgeType={t === "disabled" || t === "ghost" ? "solid" : t} isDisabled={t === "disabled"} isGhost={t === "ghost"} size="lg" text={v} leadingIcon={<Ico />} />
                ))}
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
