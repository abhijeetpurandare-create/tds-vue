import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { ChipProps } from "@delhivery/tarmac";

const CHIP_TYPES = ["black", "white", "coal", "blue", "success", "error", "warning", "legacy_blue", "dlv_red"] as const;
const VARIANTS = ["standard", "outlined"] as const;
const SIZES = ["lg", "md", "sm"] as const;
const STATES = ["default", "hover", "pressed", "focused", "disabled", "ghost"] as const;
type ShowcaseState = typeof STATES[number];

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);

const Ico = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-1 4a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V7z" clipRule="evenodd" />
  </svg>
);

const ShowcaseChip: React.FC<ChipProps & { showcaseState: ShowcaseState }> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.tag;
  const vc = cfg?.variants?.[props.chipVariant || "standard"]?.[props.chipType || "black"] || {};

  if (showcaseState === "default") return <Chip {...props} />;
  if (showcaseState === "disabled") return <Chip {...props} isDisabled />;
  if (showcaseState === "ghost") return <Chip {...props} isGhost />;

  const overrides: Record<string, string> = {};
  if (showcaseState === "hover") {
    if (vc.hoverColor) overrides.backgroundColor = vc.hoverColor;
    if (vc.hoverTextColor) overrides.color = vc.hoverTextColor;
    if (vc.hoverBorderColor) overrides.borderColor = vc.hoverBorderColor;
  } else if (showcaseState === "pressed") {
    if (vc.pressedColor) overrides.backgroundColor = vc.pressedColor;
    if (vc.pressedTextColor) overrides.color = vc.pressedTextColor;
    if (vc.hoverBorderColor) overrides.borderColor = vc.hoverBorderColor;
  } else if (showcaseState === "focused") {
    overrides.boxShadow = vc.focusRingColor ? `0 0 0 2px ${vc.focusRingColor}` : "0 0 0 2px rgba(0,0,0,0.4)";
  }
  return <Chip {...props} className={css(overrides)} />;
};

const meta: Meta<ChipProps> = {
  title: "Tarmac TDS/Chip",
  component: Chip,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<ChipProps>;

/* ═══ Story 1: Interactive Playground ═══ */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: { chipType: "black", chipVariant: "standard", size: "md", text: "Chip" },
  argTypes: {
    chipType: { control: "select", options: [...CHIP_TYPES] },
    chipVariant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
    text: { control: "text" },
    statusLeft: { control: "boolean" },
    statusRight: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
  },
  render: (args) => {
    const iconSize = args.size === "lg" ? 20 : args.size === "sm" ? 12 : 16;
    return (
      <Chip
        {...args}
        leadingIcon={<Ico s={iconSize} />}
        trailingIcon={<Ico s={iconSize} />}
      />
    );
  },
};

/* ═══ Story 2: Full Matrix ═══ */
const s: Record<string, React.CSSProperties> = {
  page: { padding: 24, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title: { fontSize: 15, fontWeight: 700, color: "#374151", margin: "28px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  grid: { display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", gap: "6px 12px", alignItems: "center" },
  colHdr: { fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, textAlign: "center" as const, padding: "4px 0" },
  rowLabel: { fontSize: 9, color: "#b0b0b0", textAlign: "right" as const, paddingRight: 8 },
  cell: { display: "flex", justifyContent: "center", alignItems: "center", padding: "4px 0" },
};

const VariantSection: React.FC<{ chipType: string }> = ({ chipType }) => {
  const dark = chipType === "white";
  const wrap: React.CSSProperties = dark ? { backgroundColor: "#1a1a2e", padding: 16, borderRadius: 8 } : {};
  return (
    <div>
      <div style={s.title}>
        {chipType}{dark && <span style={{ fontSize: 10, color: "#9ca3af", marginLeft: 8 }}>(dark bg)</span>}
      </div>
      <div style={wrap}>
        <div style={s.grid}>
          <div />
          {STATES.map((st) => <div key={st} style={s.colHdr}>{st}</div>)}
          {VARIANTS.flatMap((v) =>
            SIZES.map((sz) => {
              const iconSize = sz === "lg" ? 20 : sz === "sm" ? 12 : 16;
              return (
                <React.Fragment key={`${v}-${sz}`}>
                  <div style={{ ...s.rowLabel, ...(dark ? { color: "#6b7280" } : {}) }}>{v}/{sz}</div>
                  {STATES.map((st) => (
                    <div key={st} style={s.cell}>
                      <ShowcaseChip
                        showcaseState={st}
                        chipType={chipType as ChipProps["chipType"]}
                        chipVariant={v}
                        size={sz}
                        text="Chip"
                        leadingIcon={<Ico s={iconSize} />}
                        trailingIcon={<Ico s={iconSize} />}
                      />
                    </div>
                  ))}
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={s.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>9 Types × 2 Variants × 3 Sizes × 6 States = 324 chips</p>
      {CHIP_TYPES.map((t) => <VariantSection key={t} chipType={t} />)}
    </div>
  ),
};

/* ═══ Stories 3-11: Per-type ═══ */
const ts = (chipType: string): Story => ({
  render: () => <div style={s.page}><VariantSection chipType={chipType} /></div>,
});
export const Black: Story = { name: "Black", ...ts("black") };
export const White: Story = { name: "White", ...ts("white") };
export const Coal: Story = { name: "Coal", ...ts("coal") };
export const Blue: Story = { name: "Blue", ...ts("blue") };
export const Success: Story = { name: "Success", ...ts("success") };
export const Error_: Story = { name: "Error", ...ts("error") };
export const Warning: Story = { name: "Warning", ...ts("warning") };
export const LegacyBlue: Story = { name: "Legacy Blue", ...ts("legacy_blue") };
export const DlvRed: Story = { name: "DLV Red", ...ts("dlv_red") };

/* ═══ Status Dots ═══ */
export const StatusDots: Story = {
  name: "Status Dots",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 24 }}>
      <Chip text="Left Dot" statusLeft chipType="success" />
      <Chip text="Right Dot" statusRight chipType="error" />
      <Chip text="Both Dots" statusLeft statusRight chipType="blue" />
      <Chip text="Outlined" statusLeft chipVariant="outlined" chipType="coal" />
    </div>
  ),
};

/* ═══ Light vs Dark Mode ═══ */
const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {VARIANTS.map((v) => (
              <div key={v} style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                {CHIP_TYPES.filter((t) => t !== "white").map((t) => (
                  <Chip key={t} chipType={t} chipVariant={v} size="md" text={t} leadingIcon={<Ico />} />
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
            {VARIANTS.map((v) => (
              <div key={v} style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                {CHIP_TYPES.filter((t) => t !== "white").map((t) => (
                  <Chip key={t} chipType={t} chipVariant={v} size="md" text={t} leadingIcon={<Ico />} />
                ))}
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
