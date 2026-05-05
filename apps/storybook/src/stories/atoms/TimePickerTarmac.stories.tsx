import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimePicker, ThemeProvider } from "@delhivery/tarmac";
import type { TimePickerProps } from "@delhivery/tarmac";

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

const meta: Meta<TimePickerProps> = {
  title: "Tarmac TDS/TimePicker",
  component: TimePicker,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<TimePickerProps>;

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 13, color: "#525B7A", marginTop: 8 }}>{children}</div>
);

/* ═══════════════════════════════════════════════════════════════
   1. Playground — scroll to select, Save commits
   ═══════════════════════════════════════════════════════════════ */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("");
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <TimePicker pickerStyle="tds" value={val} onChange={setVal} placeholder="Select time" />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   2. Pre-selected value — value prop
   ═══════════════════════════════════════════════════════════════ */
export const PreSelectedValue: Story = {
  name: "value Prop (Pre-selected)",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("18:25");
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>value="18:25" → shows 06:25 PM</h3>
          <TimePicker pickerStyle="tds" value={val} onChange={setVal} placeholder="Select time" />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   3. 24-Hour Mode — use24Hour=true
   ═══════════════════════════════════════════════════════════════ */
export const TwentyFourHourMode: Story = {
  name: "use24Hour=true",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("14:30");
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>24-hour format — no AM/PM column, hours 0-23</h3>
          <TimePicker pickerStyle="tds" use24Hour value={val} onChange={setVal} />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   4. Show Seconds — showSeconds=true
   ═══════════════════════════════════════════════════════════════ */
export const ShowSeconds: Story = {
  name: "showSeconds=true",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("10:30:45");
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Adds a seconds column (0-59)</h3>
          <TimePicker pickerStyle="tds" showSeconds value={val} onChange={setVal} />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   5. Time Range Restriction — startTime / EndTime
   ═══════════════════════════════════════════════════════════════ */
export const TimeRangeRestriction: Story = {
  name: "startTime / EndTime",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("");
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>startTime=9, EndTime=18 — hours outside 9 AM–6 PM are dimmed</h3>
          <TimePicker pickerStyle="tds" startTime={9} EndTime={18} value={val} onChange={setVal} />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   6. Custom Placeholder
   ═══════════════════════════════════════════════════════════════ */
export const CustomPlaceholder: Story = {
  name: "placeholder Prop",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("");
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>placeholder="Pick departure time"</h3>
          <TimePicker pickerStyle="tds" placeholder="Pick departure time" value={val} onChange={setVal} />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   7. onChange callback — fires on Save
   ═══════════════════════════════════════════════════════════════ */
export const OnChangeCallback: Story = {
  name: "onChange Callback",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("");
      const [log, setLog] = React.useState<string[]>([]);
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Scroll to select, click Save — onChange fires with "HH:MM AM/PM"</h3>
          <TimePicker pickerStyle="tds" value={val} onChange={(v) => { setVal(v); setLog(prev => [...prev, v]); }} />
          {log.length > 0 && <Label>onChange log: {log.map((l, i) => <span key={i} style={{ marginRight: 8 }}><strong>{l}</strong></span>)}</Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   8. onCancel callback
   ═══════════════════════════════════════════════════════════════ */
export const OnCancelCallback: Story = {
  name: "onCancel Callback",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("");
      const [msg, setMsg] = React.useState("");
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Click Cancel — fires onCancel</h3>
          <TimePicker pickerStyle="tds" value={val} onChange={setVal} onCancel={() => setMsg("Cancelled at " + new Date().toLocaleTimeString())} />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
          {msg && <Label>{msg}</Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   9. Save disabled until selection complete
   ═══════════════════════════════════════════════════════════════ */
export const SaveDisabledValidation: Story = {
  name: "Save Disabled (No Selection)",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("");
      return (
        <div style={{ padding: 24, minHeight: 450 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Open with no value — Save button is disabled until hour + minute + AM/PM are selected</h3>
          <TimePicker pickerStyle="tds" placeholder="Select time" value={val} onChange={setVal} />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   10. Light vs Dark Mode
   ═══════════════════════════════════════════════════════════════ */
export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => {
    const Demo = () => {
      const [lightVal, setLightVal] = React.useState("18:25");
      const [darkVal, setDarkVal] = React.useState("18:25");
      return (
        <div style={{ display: "flex", gap: 32, padding: 24 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 14 }}>Light Mode</h3>
            <Wrap>
              <TimePicker pickerStyle="tds" value={lightVal} onChange={setLightVal} />
              {lightVal && <Label>Selected: <strong>{lightVal}</strong></Label>}
            </Wrap>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 14 }}>Dark Mode</h3>
            <DarkWrap>
              <TimePicker pickerStyle="tds" value={darkVal} onChange={setDarkVal} />
              {darkVal && <div style={{ fontSize: 13, color: "#aaa", marginTop: 8 }}>Selected: <strong>{darkVal}</strong></div>}
            </DarkWrap>
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   11. Input Width Variations (via className)
   ═══════════════════════════════════════════════════════════════ */
export const InputWidths: Story = {
  name: "Input Width Variations",
  render: () => {
    const Demo = () => {
      const [v1, setV1] = React.useState("09:30 AM");
      const [v2, setV2] = React.useState("09:30 AM");
      const [v3, setV3] = React.useState("09:30 AM");
      return (
        <div style={{ padding: 24, display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Default (320px)</h4>
            <TimePicker pickerStyle="tds" value={v1} onChange={setV1} />
            {v1 && <Label>{v1}</Label>}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Narrow (200px)</h4>
            <div style={{ width: 200 }}>
              <TimePicker pickerStyle="tds" value={v2} onChange={setV2} />
            </div>
            {v2 && <Label>{v2}</Label>}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Wide (400px)</h4>
            <div style={{ width: 400 }}>
              <TimePicker pickerStyle="tds" value={v3} onChange={setV3} />
            </div>
            {v3 && <Label>{v3}</Label>}
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   Bottom Sheet Stories — pickerStyle="bottomSheet"
   ═══════════════════════════════════════════════════════════════ */

export const BottomSheetPlayground: Story = {
  name: "Bottom Sheet — Playground",
  parameters: { layout: "centered" },
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("");
      return (
        <div style={{ padding: 24 }}>
          <TimePicker
            pickerStyle="bottomSheet"
            value={val}
            onChange={setVal}
            placeholder="Select time"
            title="Select Time"
            subtext="Choose hour and minute"
          />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetPreSelected: Story = {
  name: "Bottom Sheet — Pre-selected value",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("18:25");
      return (
        <div style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>value="18:25" → 06:25 PM</h3>
          <TimePicker
            pickerStyle="bottomSheet"
            value={val}
            onChange={setVal}
            title="Select Time"
            subtext="Scroll to change"
          />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheet24Hour: Story = {
  name: "Bottom Sheet — 24-Hour Mode",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("14:30");
      return (
        <div style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>use24Hour — no AM/PM column</h3>
          <TimePicker
            pickerStyle="bottomSheet"
            use24Hour
            value={val}
            onChange={setVal}
            title="Select Time"
          />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetWithSeconds: Story = {
  name: "Bottom Sheet — With Seconds",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("10:30:45");
      return (
        <div style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>showSeconds — adds a seconds column</h3>
          <TimePicker
            pickerStyle="bottomSheet"
            showSeconds
            value={val}
            onChange={setVal}
            title="Select Time"
            subtext="Hour · Minute · Second"
          />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetWithoutSubtext: Story = {
  name: "Bottom Sheet — Without Subtext",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState("");
      return (
        <div style={{ padding: 24 }}>
          <TimePicker
            pickerStyle="bottomSheet"
            value={val}
            onChange={setVal}
            title="Select Time"
            showSubtext={false}
          />
          {val && <Label>Selected: <strong>{val}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetLightVsDark: Story = {
  name: "Bottom Sheet — Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Light Mode</div>
        <Wrap>
          <TimePicker
            pickerStyle="bottomSheet"
            value="06:25"
            title="Select Time"
            subtext="Light mode"
          />
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Dark Mode</div>
        <DarkWrap>
          <TimePicker
            pickerStyle="bottomSheet"
            value="06:25"
            title="Select Time"
            subtext="Dark mode"
          />
        </DarkWrap>
      </div>
    </div>
  ),
};
