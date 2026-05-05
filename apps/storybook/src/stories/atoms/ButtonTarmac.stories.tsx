import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { ButtonStyle, ButtonType, ButtonProps } from "@delhivery/tarmac";

type ShowcaseState = "default" | "hover" | "pressed" | "focused" | "disabled" | "ghost";

const VARIANTS = ["black", "white", "info", "success", "error", "warning", "dlv_red", "coal"] as const;
const SIZES = ["lg", "md", "sm"] as const;
const STYLES: ButtonStyle[] = ["primary", "secondary", "tertiary"];
const TYPES: ButtonType[] = ["button", "iconButton"];
const STATES: ShowcaseState[] = ["default", "hover", "pressed", "focused", "disabled", "ghost"];
const SIZE_MAP: Record<string, string> = { lg: "Large", md: "Regular", sm: "Small" };
const STYLE_MAP: Record<string, string> = { primary: "Primary", secondary: "Secondary", tertiary: "Tertiary" };
const TYPE_MAP: Record<string, string> = { button: "Button", iconButton: "Icon Btn" };

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);
const Ico = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
  </svg>
);

/**
 * ShowcaseButton — storybook-only wrapper that forces a visual state
 * by reading theme tokens and applying inline style overrides.
 * This keeps the actual Button component clean of showcase logic.
 */
const ShowcaseButton: React.FC<ButtonProps & { showcaseState: ShowcaseState }> = ({ showcaseState, ...btnProps }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.button;
  const style = btnProps.buttonStyle || "primary";
  const variant = btnProps.variant || "black";
  const vc = cfg?.styles?.[style]?.[variant] || cfg?.variants?.[variant] || {};
  const dis = style === "secondary" ? cfg?.states?.disabledSecondary : style === "tertiary" ? cfg?.states?.disabledTertiary : cfg?.states?.disabled;
  const ghost = cfg?.states?.ghost;

  if (showcaseState === "default") return <Button {...btnProps} />;
  if (showcaseState === "disabled") return <Button {...btnProps} isDisabled />;
  if (showcaseState === "ghost") return <Button {...btnProps} isGhost />;

  // For hover/pressed/focused we apply inline style overrides
  const overrides: React.CSSProperties = {};
  if (showcaseState === "hover") {
    overrides.backgroundColor = vc.hoverColor || vc.backgroundColor;
    overrides.color = vc.hoverTextColor || vc.textColor;
    if (vc.hoverBorderColor) overrides.borderColor = vc.hoverBorderColor;
  } else if (showcaseState === "pressed") {
    overrides.backgroundColor = vc.pressedColor || vc.hoverColor || vc.backgroundColor;
    overrides.color = vc.pressedTextColor || vc.hoverTextColor || vc.textColor;
  } else if (showcaseState === "focused") {
    overrides.boxShadow = vc.focusRingColor
      ? `0 0 0 2px ${vc.focusRingColor}`
      : "0 0 0 2px rgba(0,0,0,0.4)";
  }

  const overrideCls = css(overrides as Record<string, string>);
  return <Button {...btnProps} className={`${btnProps.className || ""} ${overrideCls}`.trim()} />;
};

const meta: Meta<any> = {
  title: "Tarmac TDS/Button",
  component: Button,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<any>;

/* ═══ Story 1: Interactive Playground (no showcase state — real button) ═══ */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: { variant: "black", size: "md", buttonStyle: "primary", buttonType: "button", text: "Button" },
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
    buttonStyle: { control: "select", options: [...STYLES] },
    buttonType: { control: "select", options: [...TYPES] },
    text: { control: "text" },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
    isLoading: { control: "boolean" },
    isRounded: { control: "boolean" },
  },
  render: (args) => {
    const isIcon = args.buttonType === "iconButton";
    return <Button {...args} leadingIcon={<Ico />} trailingIcon={isIcon ? undefined : <Ico />} text={isIcon ? undefined : args.text} />;
  },
} as Story

/* ═══ Story 2: Full 648 Matrix ═══ */
const st: Record<string, React.CSSProperties> = {
  page: { padding: 24, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title: { fontSize: 15, fontWeight: 700, color: "#374151", margin: "32px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  grid: { display: "grid", gridTemplateColumns: "130px repeat(6, 1fr)", gap: "4px 8px", alignItems: "center" },
  colHdr: { fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, textAlign: "center" as const, padding: "4px 0" },
  rowLabel: { fontSize: 9, color: "#b0b0b0", textAlign: "right" as const, paddingRight: 8 },
  cell: { display: "flex", justifyContent: "center", alignItems: "center", padding: "3px 0" },
};

const VariantSection: React.FC<{ variant: typeof VARIANTS[number] }> = ({ variant }) => {
  const dark = variant === "white";
  const wrap: React.CSSProperties = dark ? { backgroundColor: "#1a1a2e", padding: 16, borderRadius: 8 } : {};
  return (
    <div>
      <div style={st.title}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)}
        {dark && <span style={{ fontSize: 10, color: "#9ca3af", marginLeft: 8 }}>(dark bg)</span>}
      </div>
      <div style={wrap}>
        <div style={st.grid}>
          <div />
          {STATES.map((s) => <div key={s} style={st.colHdr}>{s}</div>)}
          {STYLES.flatMap((bStyle) =>
            TYPES.flatMap((bType) =>
              SIZES.map((bSize) => (
                <React.Fragment key={`${bStyle}-${bType}-${bSize}`}>
                  <div style={{ ...st.rowLabel, ...(dark ? { color: "#6b7280" } : {}) }}>
                    {STYLE_MAP[bStyle]} / {TYPE_MAP[bType]} / {SIZE_MAP[bSize]}
                  </div>
                  {STATES.map((state) => (
                    <div key={state} style={st.cell}>
                      <ShowcaseButton
                        showcaseState={state}
                        variant={variant}
                        buttonStyle={bStyle}
                        buttonType={bType}
                        size={bSize}
                        leadingIcon={<Ico />}
                        trailingIcon={bType === "button" ? <Ico /> : undefined}
                        text={bType === "button" ? "Button" : undefined}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export const FullMatrix: Story = {
  name: "Full 648 Matrix",
  render: () => (
    <div style={st.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>
        3 Styles × 2 Types × 3 Sizes × 6 States × 6 Variants = 648 buttons
      </p>
      {VARIANTS.map((v) => <VariantSection key={v} variant={v} />)}
    </div>
  ),
};

/* ═══ Stories 3-8: Per-variant ═══ */
const vs = (variant: typeof VARIANTS[number]): Story => ({
  render: () => <div style={st.page}><VariantSection variant={variant} /></div>,
});
export const Black: Story = { name: "Black", ...vs("black") };
export const White: Story = { name: "White", ...vs("white") };
export const Info: Story = { name: "Info (Blue)", ...vs("info") };
export const Success: Story = { name: "Success", ...vs("success") };
export const Error_: Story = { name: "Error", ...vs("error") };
export const Warning: Story = { name: "Warning", ...vs("warning") };
export const DLVRed: Story = { name: "DLV Red", ...vs("dlv_red") };
export const Coal: Story = { name: "Coal", ...vs("coal") };


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
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {STYLES.map((style) => (
              <div key={style} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {VARIANTS.filter(v => v !== "white").map((v) => (
                  <Button key={v} variant={v} buttonStyle={style} size="md" text={v} leadingIcon={<Ico />} />
                ))}
              </div>
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {STYLES.map((style) => (
              <div key={style} style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {VARIANTS.filter(v => v !== "white").map((v) => (
                  <Button key={v} variant={v} buttonStyle={style} size="md" text={v} leadingIcon={<Ico />} />
                ))}
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
