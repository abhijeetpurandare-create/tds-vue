import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { RadioProps } from "@delhivery/tarmac";

type TarmacRadioVariant = "standard" | "blue" | "green" | "dlv_red";
type TarmacRadioStyle = "filled" | "outlined";
type TarmacRadioSize = "sm" | "md" | "lg";

const VARIANTS: TarmacRadioVariant[] = ["standard", "blue", "green", "dlv_red"];
const STYLES: TarmacRadioStyle[] = ["filled", "outlined"];
const SIZES: TarmacRadioSize[] = ["lg", "md", "sm"];

// Figma states: Default (unchecked), Hover (unchecked+hover), Selected (checked), Disabled (checked+disabled)
type ShowcaseState = "default" | "hover" | "selected" | "disabled";
const STATES: ShowcaseState[] = ["default", "hover", "selected", "disabled"];

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

interface ShowcaseRadioProps extends RadioProps {
  showcaseState: ShowcaseState;
  variant?: TarmacRadioVariant;
  radioStyle?: TarmacRadioStyle;
}

const ShowcaseRadio: React.FC<ShowcaseRadioProps> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.radio_tarmac;
  const radioStyle = (props as Record<string, unknown>).radioStyle as TarmacRadioStyle || "filled";
  const variant = (props as Record<string, unknown>).variant as TarmacRadioVariant || "standard";
  const vc = cfg?.styles?.[radioStyle]?.[variant] || cfg?.variants?.[variant] || {};

  // Default = unchecked, no overrides
  if (showcaseState === "default") return <Radio {...props} />;

  // Hover = unchecked with hover border color, bg color, and border width applied statically
  if (showcaseState === "hover") {
    const hoverOverrides = css({
      '& > span:first-of-type': {
        borderColor: `${vc.hoverBorderColor || vc.borderColor || '#ccc'} !important`,
        backgroundColor: `${vc.hoverBackgroundColor || vc.backgroundColor || 'transparent'} !important`,
        borderWidth: `${vc.hoverBorderWidth || vc.borderWidth || '1px'} !important`,
      },
    });
    return <Radio {...props} className={hoverOverrides} />;
  }

  // Selected = checked
  if (showcaseState === "selected") return <Radio {...props} checked />;

  // Disabled = checked + disabled
  if (showcaseState === "disabled") return <Radio {...props} checked disabled />;

  return <Radio {...props} />;
};

const VariantSection: React.FC<{ variant: TarmacRadioVariant }> = ({ variant }) => (
  <div style={{ marginBottom: 32 }}>
    <h3 style={{ marginBottom: 12, fontFamily: "Noto Sans, sans-serif", fontSize: 16, fontWeight: 600 }}>
      {variant}
    </h3>
    <div style={{ display: "grid", gridTemplateColumns: "120px repeat(4, 1fr)", gap: "8px 16px", alignItems: "center" }}>
      <div />
      {STATES.map((s) => (
        <div key={s} style={{ fontFamily: "Noto Sans, sans-serif", fontSize: 12, color: "#666", textTransform: "capitalize" }}>
          {s}
        </div>
      ))}
      {STYLES.flatMap((radioStyle) =>
        SIZES.map((size) => (
          <React.Fragment key={`${radioStyle}-${size}`}>
            <div style={{ fontFamily: "Noto Sans, sans-serif", fontSize: 12, color: "#999" }}>
              {radioStyle}/{size}
            </div>
            {STATES.map((state) => (
              <div key={state} style={{ display: "flex", alignItems: "center" }}>
                <ShowcaseRadio
                  showcaseState={state}
                  variant={variant}
                  radioStyle={radioStyle}
                  size={size}
                  value={`${variant}-${radioStyle}-${size}-${state}`}
                />
              </div>
            ))}
          </React.Fragment>
        ))
      )}
    </div>
  </div>
);

const meta: Meta<any> = {
  title: "Tarmac TDS/Radio",
  component: Radio,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story: any) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<any>;

const PlaygroundRender: React.FC<RadioProps> = (args) => {
  const [checked, setChecked] = React.useState(args.checked ?? false);
  React.useEffect(() => { setChecked(args.checked ?? false); }, [args.checked]);
  return (
    <Radio
      {...args}
      checked={checked}
      onChange={() => setChecked((prev) => !prev)}
    />
  );
};

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    variant: "standard",
    radioStyle: "filled",
    size: "md",
    checked: false,
    disabled: false,
    children: "Radio label",
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    radioStyle: { control: "select", options: STYLES },
    size: { control: "select", options: SIZES },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  render: (args) => <PlaygroundRender {...args} />,
} as Story;

export const WithSubtext: Story = {
  name: "With Subtext",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: "flex", gap: 24 }}>
          <Radio variant={v} radioStyle="filled" size="lg" checked subtext="Title here" value={`${v}-filled`}>
            Title here
          </Radio>
          <Radio variant={v} radioStyle="outlined" size="lg" checked subtext="Title here" value={`${v}-outlined`}>
            Title here
          </Radio>
        </div>
      ))}
    </div>
  ),
};

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24 }}>
      {VARIANTS.map((v) => (
        <VariantSection key={v} variant={v} />
      ))}
    </div>
  ),
};

const vs = (variant: TarmacRadioVariant): Story => ({
  render: () => (
    <div style={{ padding: 24 }}>
      <VariantSection variant={variant} />
    </div>
  ),
});

export const Standard: Story = { name: "Standard", ...vs("standard") };
export const Blue: Story = { name: "Blue", ...vs("blue") };
export const Green: Story = { name: "Green", ...vs("green") };
export const DLVRed: Story = { name: "DLV Red", ...vs("dlv_red") };

export const RadioGroup: Story = {
  name: "Radio Group",
  parameters: { layout: "centered" },
  render: () => {
    const RadioGroupDemo = () => {
      const [selected, setSelected] = React.useState("option1");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {VARIANTS.map((v) => (
            <div key={v}>
              <h4 style={{ fontFamily: "Noto Sans, sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#555" }}>
                {v}
              </h4>
              <div style={{ display: "flex", gap: 20 }}>
                {["option1", "option2", "option3"].map((opt) => (
                  <Radio
                    key={`${v}-${opt}`}
                    variant={v}
                    radioStyle="filled"
                    size="md"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                  >
                    {opt.replace("option", "Option ")}
                  </Radio>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    };
    return <RadioGroupDemo />;
  },
};

export const Disabled: Story = {
  name: "Disabled",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ fontFamily: "Noto Sans, sans-serif", fontSize: 12, color: "#999", width: 70 }}>{v}</span>
          <Radio variant={v} radioStyle="filled" size="md" disabled value={`${v}-unchecked`}>
            Unchecked
          </Radio>
          <Radio variant={v} radioStyle="filled" size="md" disabled checked value={`${v}-checked`}>
            Checked
          </Radio>
          <Radio variant={v} radioStyle="outlined" size="md" disabled value={`${v}-out-unchecked`}>
            Outlined
          </Radio>
          <Radio variant={v} radioStyle="outlined" size="md" disabled checked value={`${v}-out-checked`}>
            Outlined Checked
          </Radio>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  name: "Sizes",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {SIZES.map((size) => (
        <div key={size}>
          <h4 style={{ fontFamily: "Noto Sans, sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#555" }}>
            Size: {size}
          </h4>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Radio variant="standard" radioStyle="filled" size={size} checked value={`filled-${size}`}>
              Filled
            </Radio>
            <Radio variant="standard" radioStyle="outlined" size={size} checked value={`outlined-${size}`}>
              Outlined
            </Radio>
            <Radio variant="blue" radioStyle="filled" size={size} checked value={`blue-${size}`}>
              Blue
            </Radio>
            <Radio variant="green" radioStyle="filled" size={size} checked value={`green-${size}`}>
              Green
            </Radio>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const FilledVsOutlined: Story = {
  name: "Filled vs Outlined",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <div>
        <h4 style={{ fontFamily: "Noto Sans, sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Filled</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {VARIANTS.map((v) => (
            <div key={v} style={{ display: "flex", gap: 16 }}>
              <Radio variant={v} radioStyle="filled" size="lg" checked value={`filled-${v}`}>{v}</Radio>
              <Radio variant={v} radioStyle="filled" size="lg" value={`filled-${v}-off`}>{v} (off)</Radio>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 style={{ fontFamily: "Noto Sans, sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Outlined</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {VARIANTS.map((v) => (
            <div key={v} style={{ display: "flex", gap: 16 }}>
              <Radio variant={v} radioStyle="outlined" size="lg" checked value={`outlined-${v}`}>{v}</Radio>
              <Radio variant={v} radioStyle="outlined" size="lg" value={`outlined-${v}-off`}>{v} (off)</Radio>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const WithSubtextAll: Story = {
  name: "With Subtext (All Variants)",
  parameters: { layout: "centered" },
  render: () => {
    const SubtextDemo = () => {
      const [selected, setSelected] = React.useState("standard");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {VARIANTS.map((v) => (
            <Radio
              key={v}
              variant={v}
              radioStyle="filled"
              size="lg"
              checked={selected === v}
              onChange={() => setSelected(v)}
              subtext={`Supporting text for ${v} variant`}
              value={v}
            >
              {v.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())} Option
            </Radio>
          ))}
        </div>
      );
    };
    return <SubtextDemo />;
  },
};

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24 }}>
      <div>
        <h3 style={{ marginBottom: 12, fontFamily: "Noto Sans, sans-serif", fontSize: 14, fontWeight: 600 }}>Light Mode</h3>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <div key={v} style={{ display: "flex", gap: 16 }}>
                <Radio variant={v} radioStyle="filled" size="lg" checked value={`light-${v}-f`}>{v}</Radio>
                <Radio variant={v} radioStyle="outlined" size="lg" checked value={`light-${v}-o`}>{v}</Radio>
              </div>
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontFamily: "Noto Sans, sans-serif", fontSize: 14, fontWeight: 600 }}>Dark Mode</h3>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <div key={v} style={{ display: "flex", gap: 16 }}>
                <Radio variant={v} radioStyle="filled" size="lg" checked value={`dark-${v}-f`}>{v}</Radio>
                <Radio variant={v} radioStyle="outlined" size="lg" checked value={`dark-${v}-o`}>{v}</Radio>
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
