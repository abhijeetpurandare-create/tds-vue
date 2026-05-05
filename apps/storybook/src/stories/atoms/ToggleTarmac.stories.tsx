import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { SwitchProps } from "@delhivery/tarmac";

const COLORS = ["black", "blue", "dlv_red", "green"] as const;
const STYLES = ["filled", "outlined"] as const;
const SIZES = ["lg", "sm"] as const;
type ShowcaseState = "default" | "hover" | "pressed" | "focused" | "disabled" | "ghost";
const STATES: ShowcaseState[] = ["default", "hover", "pressed", "focused", "disabled", "ghost"];

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

const ShowcaseToggle: React.FC<
  SwitchProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.toggle_tarmac;
  const style = props.tarmacStyle || "filled";
  const color = props.tarmacColor || "black";
  const vc = cfg?.styles?.[style]?.[color] || {};

  if (showcaseState === "default") return <Switch {...props} />;
  if (showcaseState === "disabled") return <Switch {...props} disabled />;
  if (showcaseState === "ghost") return <Switch {...props} isGhost />;

  const overrides: React.CSSProperties = {};
  if (showcaseState === "hover") {
    if (style === "filled") {
      overrides.backgroundColor = props.checked
        ? vc.hoverCheckedBackgroundColor
        : vc.hoverUncheckedBackgroundColor;
    } else {
      overrides.borderColor = props.checked
        ? vc.hoverCheckedBorderColor
        : vc.hoverUncheckedBorderColor;
    }
  } else if (showcaseState === "pressed") {
    if (style === "filled") {
      overrides.backgroundColor = props.checked
        ? vc.pressedCheckedBackgroundColor
        : vc.pressedUncheckedBackgroundColor;
    } else {
      overrides.borderColor = props.checked
        ? vc.pressedCheckedBorderColor
        : vc.pressedUncheckedBorderColor;
    }
  } else if (showcaseState === "focused") {
    overrides.boxShadow = `0 0 0 2px ${vc.focusRingColor || "rgba(0,0,0,0.4)"}`;
  }

  return <Switch {...props} className={css(overrides as Record<string, string>)} />;
};

const meta: Meta<SwitchProps> = {
  title: "Tarmac TDS/Toggle",
  component: Switch,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<SwitchProps>;

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    tarmacColor: "black",
    tarmacStyle: "filled",
    tarmacSize: "lg",
    disabled: false,
    isGhost: false,
  },
  argTypes: {
    tarmacColor: { control: "select", options: [...COLORS] },
    tarmacStyle: { control: "select", options: [...STYLES] },
    tarmacSize: { control: "select", options: [...SIZES] },
    disabled: { control: "boolean" },
    isGhost: { control: "boolean" },
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Switch
          {...args}
          checked={checked}
          onChange={(val) => setChecked(val)}
        />
        <span style={{ fontSize: 12, color: "#666" }}>
          {checked ? "ON" : "OFF"} — {args.tarmacColor} / {args.tarmacStyle} / {args.tarmacSize}
        </span>
      </div>
    );
  },
};

const Cell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 11, color: "#888", textAlign: "center", padding: "4px 8px" }}>
    {children}
  </div>
);

const VariantSection: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, textTransform: "capitalize" }}>
      {color === "dlv_red" ? "DLV Red" : color}
    </h3>
    {SIZES.map((sz) => (
      <div key={sz} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>Size: {sz.toUpperCase()}</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "90px repeat(6, 1fr)",
            gap: "2px 4px",
            alignItems: "center",
          }}
        >
          <div />
          {STATES.map((s) => (
            <Label key={s}>{s}</Label>
          ))}

          {STYLES.flatMap((st) =>
            [false, true].map((checked) => (
              <React.Fragment key={`${st}-${checked}`}>
                <Label>
                  {st}/{checked ? "ON" : "OFF"}
                </Label>
                {STATES.map((state) => (
                  <Cell key={state}>
                    <ShowcaseToggle
                      showcaseState={state}
                      tarmacColor={color}
                      tarmacStyle={st}
                      tarmacSize={sz}
                      checked={checked}
                    />
                  </Cell>
                ))}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    ))}
  </div>
);

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24 }}>
      {COLORS.map((c) => (
        <VariantSection key={c} color={c} />
      ))}
    </div>
  ),
};

const vs = (color: string): Story => ({
  render: () => (
    <div style={{ padding: 24 }}>
      <VariantSection color={color} />
    </div>
  ),
});

export const Black: Story = { name: "Black", ...vs("black") };
export const Blue: Story = { name: "Blue", ...vs("blue") };
export const DLVRed: Story = { name: "DLV Red", ...vs("dlv_red") };
export const Green: Story = { name: "Green", ...vs("green") };

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14 }}>Light Mode</h3>
        <Wrap>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {COLORS.map((c) =>
              STYLES.map((st) => (
                <div key={`${c}-${st}`} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                  <Switch tarmacColor={c} tarmacStyle={st} tarmacSize="lg" checked={false} />
                  <Switch tarmacColor={c} tarmacStyle={st} tarmacSize="lg" checked={true} />
                  <span style={{ fontSize: 10, color: "#888" }}>{c}/{st}</span>
                </div>
              ))
            )}
          </div>
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14 }}>Dark Mode</h3>
        <DarkWrap>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {COLORS.map((c) =>
              STYLES.map((st) => (
                <div key={`${c}-${st}`} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                  <Switch tarmacColor={c} tarmacStyle={st} tarmacSize="lg" checked={false} />
                  <Switch tarmacColor={c} tarmacStyle={st} tarmacSize="lg" checked={true} />
                  <span style={{ fontSize: 10, color: "#aaa" }}>{c}/{st}</span>
                </div>
              ))
            )}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
