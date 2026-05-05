import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ThemeProvider from "../../../../../packages/atoms/src/components/ThemeProvider";
import Stepper from "../../../../../packages/atoms/src/components/Stepper";
import type { StepperStep } from "../../../../../packages/atoms/src/components/Stepper";

// ─── Wrappers ─────────────────────────────────────────────────────────────────

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

// Full-width wrapper with bottom padding for horizontal text overflow
const W: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: "100%", paddingBottom: 64 }}>{children}</div>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STEPS_MIXED: StepperStep[] = [
  { title: "Order Placed", subtext: "Received", state: "default" },
  { title: "Processing", subtext: "In progress", state: "active" },
  { title: "Shipped", subtext: "On the way", state: "disabled" },
  { title: "Delivered", subtext: "Done", state: "disabled" },
];

const makeSteps = (n: number): StepperStep[] =>
  Array.from({ length: n }, (_, i) => ({
    title: `Step ${i + 1}`,
    subtext: `Desc ${i + 1}`,
    state: (i === 0 ? "active" : i < 2 ? "default" : "disabled") as StepperStep["state"],
  }));

const SIZES = ["lg", "md", "sm"] as const;
const ICON_STYLES = ["numeric", "black", "coal", "blue", "green", "dlv_red"] as const;

// Shared render: wraps horizontal in W for full-width, vertical renders inline
const StepperRender: React.FC<any> = (args) => {
  if (args.orientation === "vertical") {
    return <Stepper {...args} />;
  }
  return <W><Stepper {...args} /></W>;
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Stepper> = {
  title: "Tarmac TDS/Stepper",
  component: Stepper,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"], description: "Layout direction" },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Icon and text size" },
    iconStyle: { control: "select", options: ["numeric", "icon", "black", "coal", "dlv_red", "blue", "green"], description: "Icon style / color" },
    showSubtext: { control: "boolean", description: "Show subtext below title" },
  },
  args: {
    steps: STEPS_MIXED,
    orientation: "horizontal",
    size: "lg",
    iconStyle: "numeric",
    showSubtext: true,
  },
} as Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<any>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  render: (args) => <StepperRender {...args} />,
};

export const Horizontal: Story = {
  name: "Orientation — Horizontal",
  args: { orientation: "horizontal" },
  render: (args) => <StepperRender {...args} />,
};

export const Vertical: Story = {
  name: "Orientation — Vertical",
  args: { orientation: "vertical" },
  render: (args) => <StepperRender {...args} />,
};

export const SizeLarge: Story = {
  name: "Size — Large",
  args: { size: "lg" },
  render: (args) => <StepperRender {...args} />,
};

export const SizeMedium: Story = {
  name: "Size — Medium",
  args: { size: "md" },
  render: (args) => <StepperRender {...args} />,
};

export const SizeSmall: Story = {
  name: "Size — Small",
  args: { size: "sm" },
  render: (args) => <StepperRender {...args} />,
};

export const StateDefault: Story = {
  name: "State — Default",
  args: { steps: STEPS_MIXED.map(s => ({ ...s, state: "default" as const })) },
  render: (args) => <StepperRender {...args} />,
};

export const StateActive: Story = {
  name: "State — Active",
  args: { steps: STEPS_MIXED.map(s => ({ ...s, state: "active" as const })) },
  render: (args) => <StepperRender {...args} />,
};

export const StateDisabled: Story = {
  name: "State — Disabled",
  args: { steps: STEPS_MIXED.map(s => ({ ...s, state: "disabled" as const })) },
  render: (args) => <StepperRender {...args} />,
};

export const StateMixed: Story = {
  name: "State — Mixed",
  args: { steps: STEPS_MIXED },
  render: (args) => <StepperRender {...args} />,
};

export const IconNumeric: Story = { name: "Icon — Numeric", args: { iconStyle: "numeric" }, render: (args) => <StepperRender {...args} /> };
export const IconBlack: Story = { name: "Icon — Black", args: { iconStyle: "black" }, render: (args) => <StepperRender {...args} /> };
export const IconCoal: Story = { name: "Icon — Coal", args: { iconStyle: "coal" }, render: (args) => <StepperRender {...args} /> };
export const IconBlue: Story = { name: "Icon — Blue", args: { iconStyle: "blue" }, render: (args) => <StepperRender {...args} /> };
export const IconGreen: Story = { name: "Icon — Green", args: { iconStyle: "green" }, render: (args) => <StepperRender {...args} /> };
export const IconDlvRed: Story = { name: "Icon — DLV Red", args: { iconStyle: "dlv_red" }, render: (args) => <StepperRender {...args} /> };

export const TwoSteps: Story = { name: "Count — 2 Steps", args: { steps: makeSteps(2) }, render: (args) => <StepperRender {...args} /> };
export const ThreeSteps: Story = { name: "Count — 3 Steps", args: { steps: makeSteps(3) }, render: (args) => <StepperRender {...args} /> };
export const FiveSteps: Story = { name: "Count — 5 Steps", args: { steps: makeSteps(5) }, render: (args) => <StepperRender {...args} /> };
export const EightSteps: Story = { name: "Count — 8 Steps", args: { steps: makeSteps(8) }, render: (args) => <StepperRender {...args} /> };

export const WithSubtext: Story = { name: "With Subtext", args: { showSubtext: true }, render: (args) => <StepperRender {...args} /> };
export const WithoutSubtext: Story = { name: "Without Subtext", args: { showSubtext: false }, render: (args) => <StepperRender {...args} /> };

// ─── Full Matrix ──────────────────────────────────────────────────────────────
// Static showcase — controls still work to change the base args

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 80, padding: 8 }}>
      {(["horizontal", "vertical"] as const).map(orientation => (
        <div key={orientation}>
          <h3 style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 600, color: "#444", margin: "0 0 24px" }}>
            {orientation}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {SIZES.map(size => (
              <div key={size}>
                <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#999", margin: "0 0 12px" }}>size={size}</p>
                <div style={{ display: "flex", flexDirection: orientation === "horizontal" ? "column" : "row", gap: orientation === "horizontal" ? 56 : 48, flexWrap: "wrap" }}>
                  {ICON_STYLES.map(style => (
                    <div key={style}>
                      <p style={{ fontFamily: "sans-serif", fontSize: 11, color: "#bbb", margin: "0 0 6px" }}>{style}</p>
                      {orientation === "horizontal"
                        ? <W><Stepper steps={makeSteps(3)} orientation="horizontal" size={size} iconStyle={style} showSubtext={args.showSubtext} /></W>
                        : <Stepper steps={makeSteps(3)} orientation="vertical" size={size} iconStyle={style} showSubtext={args.showSubtext} />
                      }
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Light vs Dark ────────────────────────────────────────────────────────────

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  decorators: [],
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 48, padding: 24 }}>
      <div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginBottom: 12 }}>Light — Horizontal</p>
        <Wrap><W><Stepper {...args} orientation="horizontal" /></W></Wrap>
      </div>
      <div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginBottom: 12 }}>Dark — Horizontal</p>
        <DarkWrap><W><Stepper {...args} orientation="horizontal" /></W></DarkWrap>
      </div>
      <div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginBottom: 12 }}>Light — Vertical</p>
        <Wrap><Stepper {...args} orientation="vertical" /></Wrap>
      </div>
      <div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginBottom: 12 }}>Dark — Vertical</p>
        <DarkWrap><Stepper {...args} orientation="vertical" /></DarkWrap>
      </div>
    </div>
  ),
} as Story;

// ─── Form Demos ───────────────────────────────────────────────────────────────

function getStates(current: number, total: number): StepperStep["state"][] {
  return Array.from({ length: total }, (_, i) =>
    i < current ? "default" : i === current ? "active" : "disabled"
  );
}

const iSt: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #d9d9d9", borderRadius: 4, fontSize: 14, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" };
const lSt: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 500, color: "#444", marginBottom: 6, fontFamily: "sans-serif" };
const fSt: React.CSSProperties = { marginBottom: 16 };
const bSt: React.CSSProperties = { padding: "8px 20px", borderRadius: 4, fontSize: 14, fontFamily: "sans-serif", cursor: "pointer", border: "none" };

const FORM_STEPS = ["Personal Info", "Address", "Review"];

const FormDemo: React.FC<{ orientation: "horizontal" | "vertical"; size?: any; iconStyle?: any }> = ({ orientation, size = "lg", iconStyle = "numeric" }) => {
  const [current, setCurrent] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", address: "", city: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const steps: StepperStep[] = FORM_STEPS.map((title, i) => ({
    title,
    subtext: i < current ? "Done" : i === current ? "In progress" : "Pending",
    state: getStates(current, FORM_STEPS.length)[i],
  }));

  const stepper = <Stepper steps={steps} orientation={orientation} size={size} iconStyle={iconStyle} showSubtext />;

  const formPanel = submitted ? (
    <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#166534", marginBottom: 4 }}>Submitted!</div>
      <div style={{ fontSize: 13, color: "#15803d" }}>{form.name} · {form.city}</div>
      <button style={{ ...bSt, marginTop: 16, background: "#2b2b2b", color: "#fff" }}
        onClick={() => { setSubmitted(false); setCurrent(0); setForm({ name: "", email: "", address: "", city: "" }); }}>
        Start Over
      </button>
    </div>
  ) : (
    <>
      {current === 0 && (
        <div>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#2b2b2b", fontFamily: "sans-serif" }}>Personal Information</h3>
          <div style={fSt}><label style={lSt}>Full Name *</label><input style={iSt} value={form.name} onChange={set("name")} placeholder="Your name" /></div>
          <div style={fSt}><label style={lSt}>Email *</label><input style={iSt} type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" /></div>
          <button style={{ ...bSt, background: form.name && form.email ? "#2b2b2b" : "#d9d9d9", color: "#fff" }}
            disabled={!form.name || !form.email} onClick={() => setCurrent(1)}>Next →</button>
        </div>
      )}
      {current === 1 && (
        <div>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#2b2b2b", fontFamily: "sans-serif" }}>Address</h3>
          <div style={fSt}><label style={lSt}>Street *</label><input style={iSt} value={form.address} onChange={set("address")} placeholder="123 Main St" /></div>
          <div style={fSt}><label style={lSt}>City *</label><input style={iSt} value={form.city} onChange={set("city")} placeholder="Mumbai" /></div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ ...bSt, background: "#f5f5f5", color: "#2b2b2b", border: "1px solid #d9d9d9" }} onClick={() => setCurrent(0)}>← Back</button>
            <button style={{ ...bSt, background: form.address && form.city ? "#2b2b2b" : "#d9d9d9", color: "#fff" }}
              disabled={!form.address || !form.city} onClick={() => setCurrent(2)}>Next →</button>
          </div>
        </div>
      )}
      {current === 2 && (
        <div>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#2b2b2b", fontFamily: "sans-serif" }}>Review & Submit</h3>
          <div style={{ background: "#fafafa", border: "1px solid #e6e6e6", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            {[["Name", form.name], ["Email", form.email], ["Address", form.address], ["City", form.city]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13, fontFamily: "sans-serif" }}>
                <span style={{ color: "#888" }}>{l}</span><span style={{ color: "#2b2b2b", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ ...bSt, background: "#f5f5f5", color: "#2b2b2b", border: "1px solid #d9d9d9" }} onClick={() => setCurrent(1)}>← Back</button>
            <button style={{ ...bSt, background: "#2b2b2b", color: "#fff" }} onClick={() => setSubmitted(true)}>Submit ✓</button>
          </div>
        </div>
      )}
    </>
  );

  if (orientation === "vertical") {
    return (
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start", padding: 24, fontFamily: "sans-serif" }}>
        <div style={{ flexShrink: 0 }}>{stepper}</div>
        <div style={{ flex: 1, maxWidth: 400 }}>{formPanel}</div>
      </div>
    );
  }
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 560 }}>
      <div style={{ marginBottom: 32, paddingBottom: 48 }}>{stepper}</div>
      {formPanel}
    </div>
  );
};

export const FormHorizontal: Story = {
  name: "Form — Horizontal",
  decorators: [],
  render: (args) => <Wrap><FormDemo orientation="horizontal" size={args.size} iconStyle={args.iconStyle} /></Wrap>,
} as Story;

export const FormVertical: Story = {
  name: "Form — Vertical",
  decorators: [],
  render: (args) => <Wrap><FormDemo orientation="vertical" size={args.size} iconStyle={args.iconStyle} /></Wrap>,
} as Story;
