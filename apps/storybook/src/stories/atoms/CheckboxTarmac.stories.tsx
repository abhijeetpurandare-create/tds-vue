import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { CheckboxProps, TarmacCheckboxVariant, TarmacCheckboxStyle, TarmacCheckboxSize } from "@delhivery/tarmac";

const VARIANTS: TarmacCheckboxVariant[] = ["standard", "blue", "green", "dlv_red"];
const STYLES: TarmacCheckboxStyle[] = ["box", "rounded"];
const SIZES: TarmacCheckboxSize[] = ["lg", "md", "sm"];
const VARIANT_LABELS: Record<string, string> = { standard: "Standard", blue: "Blue", green: "Green", dlv_red: "DLV Red" };

type ShowcaseState = "default" | "hover" | "checked" | "partial" | "disabled";
const STATES: ShowcaseState[] = ["default", "hover", "checked", "partial", "disabled"];

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

/** Showcase wrapper — forces visual states for the static matrix */
const ShowcaseCheckbox: React.FC<
  CheckboxProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.checkbox_tarmac;
  const vc = cfg?.variants?.[props.tarmacVariant || "standard"] || {};

  if (showcaseState === "default") return <Checkbox {...props} />;
  if (showcaseState === "disabled") return <Checkbox {...props} disabled />;
  if (showcaseState === "checked") return <Checkbox {...props} checked />;
  if (showcaseState === "partial") return <Checkbox {...props} indeterminate />;

  // Hover — apply color overrides
  if (showcaseState === "hover") {
    const overrides = css({
      '& > span:first-of-type': {
        borderColor: `${vc.hoverBorderColor || vc.borderColor} !important`,
        backgroundColor: `${vc.hoverBackgroundColor || vc.backgroundColor || '#fff'} !important`,
      },
    });
    return <Checkbox {...props} className={overrides} />;
  }

  return <Checkbox {...props} />;
};

const meta: Meta<CheckboxProps> = {
  title: "Tarmac TDS/Checkbox",
  component: Checkbox,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<CheckboxProps>;

/* ═══ Story 1: Interactive Playground ═══ */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    tarmacVariant: "standard",
    tarmacStyle: "box",
    size: "lg",
    children: "Label text",
  },
  argTypes: {
    tarmacVariant: { control: "select", options: VARIANTS },
    tarmacStyle: { control: "select", options: STYLES },
    size: { control: "select", options: SIZES },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    children: { control: "text" },
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

/* ═══ Story 2: Checkbox Only Matrix (matches Figma Playground) ═══ */
const CheckboxOnlySection: React.FC<{ variant: TarmacCheckboxVariant }> = ({ variant }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#666" }}>
      {VARIANT_LABELS[variant]}
    </h3>
    <div style={{ display: "grid", gridTemplateColumns: "80px repeat(5, 1fr)", gap: "8px 16px", alignItems: "center" }}>
      <div />
      {STATES.map((s) => (
        <div key={s} style={{ fontSize: 11, color: "#999", textTransform: "capitalize" }}>{s}</div>
      ))}
      {STYLES.flatMap((style) =>
        SIZES.map((size) => (
          <React.Fragment key={`${style}-${size}`}>
            <div style={{ fontSize: 11, color: "#999" }}>{style}/{size}</div>
            {STATES.map((state) => (
              <div key={state} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShowcaseCheckbox
                  showcaseState={state}
                  tarmacVariant={variant}
                  tarmacStyle={style}
                  size={size}
                />
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
      {VARIANTS.map((v) => (
        <CheckboxOnlySection key={v} variant={v} />
      ))}
    </div>
  ),
};

/* ═══ Story 3: Checkbox + Text (with label and subtext) ═══ */
const CheckboxWithTextSection: React.FC<{ variant: TarmacCheckboxVariant }> = ({ variant }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#666" }}>
      {VARIANT_LABELS[variant]}
    </h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
      {STYLES.map((style) => (
        <div key={style}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 8, textTransform: "capitalize" }}>{style}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SIZES.map((size) => {
              const [checked, setChecked] = React.useState(false);
              return (
                <Checkbox
                  key={size}
                  tarmacVariant={variant}
                  tarmacStyle={style}
                  size={size}
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  subtext="Title here"
                >
                  Title here
                </Checkbox>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const WithText: Story = {
  name: "Checkbox + Text",
  render: () => (
    <div style={{ padding: 24 }}>
      {VARIANTS.map((v) => (
        <CheckboxWithTextSection key={v} variant={v} />
      ))}
    </div>
  ),
};

/* ═══ Story 4-7: Per-variant stories ═══ */
const vs = (variant: TarmacCheckboxVariant): Story => ({
  render: () => (
    <div style={{ padding: 24 }}>
      <CheckboxOnlySection variant={variant} />
    </div>
  ),
});

export const Standard: Story = { name: "Standard", ...vs("standard") };
export const Blue: Story = { name: "Blue", ...vs("blue") };
export const Green: Story = { name: "Green", ...vs("green") };
export const DLVRed: Story = { name: "DLV Red", ...vs("dlv_red") };

/* ═══ Story 8: Light vs Dark Mode ═══ */
export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24 }}>
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Light Mode</h3>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Checkbox key={v} tarmacVariant={v} tarmacStyle="box" size="lg" checked>
                {VARIANT_LABELS[v]} checked
              </Checkbox>
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Dark Mode</h3>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Checkbox key={v} tarmacVariant={v} tarmacStyle="box" size="lg" checked>
                {VARIANT_LABELS[v]} checked
              </Checkbox>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
