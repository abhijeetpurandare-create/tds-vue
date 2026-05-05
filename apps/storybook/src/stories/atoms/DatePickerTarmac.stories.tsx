import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker, DatePickerBottomSheet, ThemeProvider } from "@delhivery/tarmac";
import type { DatePickerBottomSheetProps } from "@delhivery/tarmac";

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

const meta: Meta = {
  title: "Tarmac TDS/DatePicker",
  component: DateRangePicker,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    pickerStyle: {
      control: "select",
      options: ["tds"],
      description: "Activates the TDS rendering path",
      table: { defaultValue: { summary: "tds" } },
    },
    singleDateMode: {
      control: "boolean",
      description: "Single date vs range selection",
      table: { defaultValue: { summary: "false" } },
    },
    enableQuickSelect: {
      control: "boolean",
      description: "Show sidebar with quick-select filters (Today, This Week, etc.)",
      table: { defaultValue: { summary: "false" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input trigger",
      table: { defaultValue: { summary: "Select dates" } },
    },
    displayFormat: {
      control: "select",
      options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"],
      description: "Date display format in the trigger",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
      table: { defaultValue: { summary: "md" } },
    },
  },
};
export default meta;
type Story = StoryObj;

/* ─── Helpers ─── */
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 13, color: "#525B7A", marginTop: 8 }}>{children}</div>
);

/* ═══════════════════════════════════════════════════════════════
   1. Playground — interactive, all controls
   ═══════════════════════════════════════════════════════════════ */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    pickerStyle: "tds",
    singleDateMode: false,
    enableQuickSelect: false,
    placeholder: "Select dates",
    size: "md",
  },
  render: (args) => {
    const Demo = () => {
      const [result, setResult] = React.useState<string>("");
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <DateRangePicker
            {...args}
            onApply={(v: any) => {
              if (v instanceof Date) {
                setResult(`Selected: ${v.toLocaleDateString()}`);
              } else if (v?.start && v?.end) {
                setResult(`Range: ${v.start.toLocaleDateString()} → ${v.end.toLocaleDateString()}`);
              }
            }}
          />
          {result && <Label>{result}</Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   2. Single Date Mode — singleDateMode=true
   ═══════════════════════════════════════════════════════════════ */
export const SingleDateMode: Story = {
  name: "Single Date Mode",
  render: () => {
    const Demo = () => {
      const [date, setDate] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>singleDateMode — pick one date, Apply commits it</h3>
          <DateRangePicker
            pickerStyle="tds"
            singleDateMode
            onApply={(d: any) => setDate(d)}
          />
          {date && <Label>Applied: <strong>{date.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   3. Range Selection — singleDateMode=false (default)
   ═══════════════════════════════════════════════════════════════ */
export const RangeSelection: Story = {
  name: "Range Selection (Multi-Select)",
  render: () => {
    const Demo = () => {
      const [range, setRange] = React.useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Range mode — click start date, then end date. Range highlights between them.</h3>
          <DateRangePicker
            pickerStyle="tds"
            onDateChange={(r: any) => setRange(r)}
          />
          {range.start && <Label>Start: <strong>{range.start.toLocaleDateString()}</strong></Label>}
          {range.end && <Label>End: <strong>{range.end.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   4. displayFormat — custom date output format
   ═══════════════════════════════════════════════════════════════ */
export const DisplayFormat: Story = {
  name: "displayFormat Prop",
  render: () => {
    const formats = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"] as const;
    return (
      <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap", minHeight: 500 }}>
        {formats.map(fmt => {
          const Demo = () => {
            const [d, setD] = React.useState<Date | null>(new Date(2026, 5, 14));
            return (
              <div key={fmt}>
                <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>displayFormat="{fmt}"</h4>
                <DateRangePicker pickerStyle="tds" singleDateMode displayFormat={fmt} value={d} onApply={(v: any) => setD(v)} />
                {d && <Label>{d.toLocaleDateString()}</Label>}
              </div>
            );
          };
          return <Demo key={fmt} />;
        })}
      </div>
    );
  },
};

/* ═══════════════════════════════════════════════════════════════
   5. minDate / maxDate — date restrictions
   ═══════════════════════════════════════════════════════════════ */
export const MinMaxDate: Story = {
  name: "minDate / maxDate",
  render: () => {
    const Demo = () => {
      const today = new Date();
      const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
      const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);
      const [d, setD] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Only dates within ±5/+10 days of today are selectable</h3>
          <DateRangePicker pickerStyle="tds" singleDateMode minDate={min} maxDate={max} onApply={(v: any) => setD(v)} />
          {d && <Label>Selected: <strong>{d.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   6. disabledWeekDays — disable weekends
   ═══════════════════════════════════════════════════════════════ */
export const DisabledWeekends: Story = {
  name: "disabledWeekDays (Weekends)",
  render: () => {
    const Demo = () => {
      const [d, setD] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Saturdays (6) and Sundays (0) disabled</h3>
          <DateRangePicker pickerStyle="tds" singleDateMode disabledWeekDays={[0, 6]} onApply={(v: any) => setD(v)} />
          {d && <Label>Selected: <strong>{d.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   7. disabledDates — specific dates disabled
   ═══════════════════════════════════════════════════════════════ */
export const DisabledSpecificDates: Story = {
  name: "disabledDates (Specific)",
  render: () => {
    const Demo = () => {
      const today = new Date();
      const blocked = [
        new Date(today.getFullYear(), today.getMonth(), 10),
        new Date(today.getFullYear(), today.getMonth(), 15),
        new Date(today.getFullYear(), today.getMonth(), 20),
      ];
      const [d, setD] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>10th, 15th, 20th of current month disabled</h3>
          <DateRangePicker pickerStyle="tds" singleDateMode disabledDates={blocked} onApply={(v: any) => setD(v)} />
          {d && <Label>Selected: <strong>{d.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   8. Controlled value — pre-selected date
   ═══════════════════════════════════════════════════════════════ */
export const ControlledValue: Story = {
  name: "Controlled value Prop",
  render: () => {
    const Demo = () => {
      const [d, setD] = React.useState<Date | null>(new Date(2026, 10, 6));
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Pre-selected: Nov 6, 2026</h3>
          <DateRangePicker pickerStyle="tds" singleDateMode value={d} onApply={(v: any) => setD(v)} />
          {d && <Label>Current: <strong>{d.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   9. onCancel callback
   ═══════════════════════════════════════════════════════════════ */
export const OnCancelCallback: Story = {
  name: "onCancel Callback",
  render: () => {
    const Demo = () => {
      const [msg, setMsg] = React.useState("");
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Click Cancel — fires onCancel</h3>
          <DateRangePicker pickerStyle="tds" singleDateMode onCancel={() => setMsg("Cancelled at " + new Date().toLocaleTimeString())} />
          {msg && <Label>{msg}</Label>}
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
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14 }}>Light Mode</h3>
        <Wrap>
          <DateRangePicker pickerStyle="tds" singleDateMode value={new Date()} />
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14 }}>Dark Mode</h3>
        <DarkWrap>
          <DateRangePicker pickerStyle="tds" singleDateMode value={new Date()} />
        </DarkWrap>
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════════
   11. Controlled Range value — value={{ start, end }}
   ═══════════════════════════════════════════════════════════════ */
export const ControlledRangeValue: Story = {
  name: "value Prop (Range)",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState<{ start: Date | null; end: Date | null }>({
        start: new Date(2026, 3, 7),
        end: new Date(2026, 3, 23),
      });
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Controlled range: value=&#123;&#123; start: Apr 7, end: Apr 23 &#125;&#125;
          </h3>
          <DateRangePicker
            pickerStyle="tds"
            value={val}
            onApply={(v: any) => setVal(v)}
          />
          {val.start && val.end && (
            <Label>
              Range: <strong>{val.start.toLocaleDateString()}</strong> → <strong>{val.end.toLocaleDateString()}</strong>
            </Label>
          )}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   12. displayFormat with Range mode
   ═══════════════════════════════════════════════════════════════ */
export const DisplayFormatRange: Story = {
  name: "displayFormat + Range",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState<{ start: Date | null; end: Date | null }>({
        start: new Date(2026, 3, 7),
        end: new Date(2026, 3, 23),
      });
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            displayFormat="YYYY-MM-DD" with range — shows "2026-04-07 - 2026-04-23"
          </h3>
          <DateRangePicker
            pickerStyle="tds"
            displayFormat="YYYY-MM-DD"
            value={val}
            onApply={(v: any) => setVal(v)}
          />
          {val.start && val.end && (
            <Label>
              Range: <strong>{val.start.toLocaleDateString()}</strong> → <strong>{val.end.toLocaleDateString()}</strong>
            </Label>
          )}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   13. displayFormat with Single Date
   ═══════════════════════════════════════════════════════════════ */
export const DisplayFormatSingle: Story = {
  name: "displayFormat + Single Date",
  render: () => {
    const Demo = () => {
      const [d, setD] = React.useState<Date | null>(new Date(2026, 5, 14));
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            displayFormat="DD/MM/YYYY" singleDateMode — shows "14/06/2026"
          </h3>
          <DateRangePicker
            pickerStyle="tds"
            singleDateMode
            displayFormat="DD/MM/YYYY"
            value={d}
            onApply={(v: any) => setD(v)}
          />
          {d && <Label>Selected: <strong>{d.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   14. Range with minDate/maxDate
   ═══════════════════════════════════════════════════════════════ */
export const RangeWithRestrictions: Story = {
  name: "Range + minDate/maxDate",
  render: () => {
    const Demo = () => {
      const today = new Date();
      const min = new Date(today.getFullYear(), today.getMonth(), 1);
      const max = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const [range, setRange] = React.useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Range mode restricted to current month only
          </h3>
          <DateRangePicker
            pickerStyle="tds"
            minDate={min}
            maxDate={max}
            onApply={(v: any) => setRange(v)}
          />
          {range.start && range.end && (
            <Label>
              Range: <strong>{range.start.toLocaleDateString()}</strong> → <strong>{range.end.toLocaleDateString()}</strong>
            </Label>
          )}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   15. Size — sm
   ═══════════════════════════════════════════════════════════════ */
export const SizeSm: Story = {
  name: "Size: sm",
  render: () => {
    const Demo = () => {
      const [d, setD] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>size="sm"</h3>
          <DateRangePicker pickerStyle="tds" singleDateMode size="sm" onApply={(v: any) => setD(v)} />
          {d && <div style={{ fontSize: 13, color: "#525B7A", marginTop: 8 }}>Selected: <strong>{d.toLocaleDateString()}</strong></div>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   16. Size — md (default)
   ═══════════════════════════════════════════════════════════════ */
export const SizeMd: Story = {
  name: "Size: md (default)",
  render: () => {
    const Demo = () => {
      const [d, setD] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>size="md" (default)</h3>
          <DateRangePicker pickerStyle="tds" singleDateMode size="md" onApply={(v: any) => setD(v)} />
          {d && <div style={{ fontSize: 13, color: "#525B7A", marginTop: 8 }}>Selected: <strong>{d.toLocaleDateString()}</strong></div>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   17. Size — lg
   ═══════════════════════════════════════════════════════════════ */
export const SizeLg: Story = {
  name: "Size: lg",
  render: () => {
    const Demo = () => {
      const [d, setD] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>size="lg"</h3>
          <DateRangePicker pickerStyle="tds" singleDateMode size="lg" onApply={(v: any) => setD(v)} />
          {d && <div style={{ fontSize: 13, color: "#525B7A", marginTop: 8 }}>Selected: <strong>{d.toLocaleDateString()}</strong></div>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   18. All Sizes Side by Side
   ═══════════════════════════════════════════════════════════════ */
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
      {(["sm", "md", "lg"] as const).map(sz => (
        <div key={sz}>
          <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>size="{sz}"</h4>
          <DateRangePicker pickerStyle="tds" singleDateMode size={sz} value={new Date()} />
        </div>
      ))}
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════════
   19. With Sidebar — Quick Select Filter (New Variant)
   ═══════════════════════════════════════════════════════════════ */
export const WithSidebar: Story = {
  name: "With Sidebar (Quick Select)",
  render: () => {
    const Demo = () => {
      const [range, setRange] = React.useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            enableQuickSelect — sidebar with Today, Yesterday, This Week, etc.
          </h3>
          <DateRangePicker
            pickerStyle="tds"
            enableQuickSelect
            onApply={(v: any) => setRange(v)}
          />
          {range.start && <Label>Start: <strong>{range.start.toLocaleDateString()}</strong></Label>}
          {range.end && <Label>End: <strong>{range.end.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   20. With Sidebar — Single Date Mode
   ═══════════════════════════════════════════════════════════════ */
export const WithSidebarSingleDate: Story = {
  name: "With Sidebar (Single Date)",
  render: () => {
    const Demo = () => {
      const [date, setDate] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            enableQuickSelect + singleDateMode — sidebar filters with single date selection
          </h3>
          <DateRangePicker
            pickerStyle="tds"
            enableQuickSelect
            singleDateMode
            onApply={(d: any) => setDate(d)}
          />
          {date && <Label>Selected: <strong>{date.toLocaleDateString()}</strong></Label>}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   21. With Sidebar — Pre-selected Range
   ═══════════════════════════════════════════════════════════════ */
export const WithSidebarControlled: Story = {
  name: "With Sidebar (Controlled Range)",
  render: () => {
    const Demo = () => {
      const [val, setVal] = React.useState<{ start: Date | null; end: Date | null }>({
        start: new Date(2026, 3, 7),
        end: new Date(2026, 3, 23),
      });
      return (
        <div style={{ padding: 24, minHeight: 500 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            enableQuickSelect with controlled range value
          </h3>
          <DateRangePicker
            pickerStyle="tds"
            enableQuickSelect
            value={val}
            onApply={(v: any) => setVal(v)}
          />
          {val.start && val.end && (
            <Label>
              Range: <strong>{val.start.toLocaleDateString()}</strong> → <strong>{val.end.toLocaleDateString()}</strong>
            </Label>
          )}
        </div>
      );
    };
    return <Demo />;
  },
};

/* ═══════════════════════════════════════════════════════════════
   BottomSheet Stories
   ═══════════════════════════════════════════════════════════════ */

/* ─── Shared trigger button style ─── */
const TriggerBtn: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: "10px 20px",
      fontSize: 14,
      fontWeight: 500,
      border: "1px solid #e6e6e6",
      borderRadius: 6,
      background: "#fff",
      cursor: "pointer",
    }}
  >
    {label}
  </button>
);

export const BottomSheetPlayground: StoryObj = {
  name: "BottomSheet / Playground",
  parameters: { layout: "centered" },
  args: {
    title: "Title goes here",
    subtext: "Subtext goes here",
    showSubtext: true,
  },
  render: (args) => {
    const Demo = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const [saved, setSaved] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24 }}>
          <TriggerBtn label="Open Date Picker" onClick={() => setIsOpen(true)} />
          {saved && (
            <div style={{ marginTop: 12, fontSize: 13, color: "#525B7A" }}>
              Saved: <strong>{saved.toLocaleDateString()}</strong>
            </div>
          )}
          <DatePickerBottomSheet
            {...args}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSave={(d) => { setSaved(d); setIsOpen(false); }}
          />
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetDefaultOpen: StoryObj = {
  name: "BottomSheet / Default (Open)",
  render: () => {
    const Demo = () => {
      const [isOpen, setIsOpen] = React.useState(true);
      const [saved, setSaved] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24, minHeight: 600 }}>
          <TriggerBtn label={isOpen ? "Close" : "Open"} onClick={() => setIsOpen((v) => !v)} />
          {saved && (
            <div style={{ marginTop: 12, fontSize: 13, color: "#525B7A" }}>
              Saved: <strong>{saved.toLocaleDateString()}</strong>
            </div>
          )}
          <DatePickerBottomSheet
            isOpen={isOpen}
            title="Select Date"
            subtext="Choose day, month and year"
            onClose={() => setIsOpen(false)}
            onSave={(d) => { setSaved(d); setIsOpen(false); }}
          />
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetWithValue: StoryObj = {
  name: "BottomSheet / With Pre-selected Value",
  render: () => {
    const Demo = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const [date, setDate] = React.useState<Date>(new Date(2024, 5, 14));
      return (
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 12, fontSize: 13, color: "#525B7A" }}>
            Current: <strong>{date.toLocaleDateString()}</strong>
          </div>
          <TriggerBtn label="Change Date" onClick={() => setIsOpen(true)} />
          <DatePickerBottomSheet
            isOpen={isOpen}
            title="Select Date"
            subtext="Scroll to change"
            value={date}
            onClose={() => setIsOpen(false)}
            onSave={(d) => { setDate(d); setIsOpen(false); }}
          />
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetWithoutSubtext: StoryObj = {
  name: "BottomSheet / Without Subtext",
  render: () => {
    const Demo = () => {
      const [isOpen, setIsOpen] = React.useState(true);
      return (
        <div style={{ padding: 24, minHeight: 600 }}>
          <TriggerBtn label="Toggle" onClick={() => setIsOpen((v) => !v)} />
          <DatePickerBottomSheet
            isOpen={isOpen}
            title="Select Date"
            showSubtext={false}
            onClose={() => setIsOpen(false)}
          />
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetWithDateRestrictions: StoryObj = {
  name: "BottomSheet / With minDate / maxDate",
  render: () => {
    const Demo = () => {
      const today = new Date();
      const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
      const [isOpen, setIsOpen] = React.useState(false);
      const [saved, setSaved] = React.useState<Date | null>(null);
      return (
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 12, fontSize: 13, color: "#525B7A" }}>
            Restricted to ±7 days from today
          </div>
          <TriggerBtn label="Open" onClick={() => setIsOpen(true)} />
          {saved && (
            <div style={{ marginTop: 12, fontSize: 13, color: "#525B7A" }}>
              Saved: <strong>{saved.toLocaleDateString()}</strong>
            </div>
          )}
          <DatePickerBottomSheet
            isOpen={isOpen}
            title="Select Date"
            subtext="Only ±7 days selectable"
            minDate={min}
            maxDate={max}
            onClose={() => setIsOpen(false)}
            onSave={(d) => { setSaved(d); setIsOpen(false); }}
          />
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetCallbacks: StoryObj = {
  name: "BottomSheet / onSave / onClose Callbacks",
  render: () => {
    const Demo = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const [log, setLog] = React.useState<string[]>([]);
      const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));
      return (
        <div style={{ padding: 24 }}>
          <TriggerBtn label="Open" onClick={() => setIsOpen(true)} />
          <DatePickerBottomSheet
            isOpen={isOpen}
            title="Select Date"
            onClose={() => { addLog("onClose fired"); setIsOpen(false); }}
            onSave={(d) => { addLog(`onSave: ${d.toLocaleDateString()}`); setIsOpen(false); }}
          />
          <div style={{ marginTop: 16 }}>
            {log.map((l, i) => (
              <div key={i} style={{ fontSize: 13, color: "#525B7A", marginBottom: 4 }}>{l}</div>
            ))}
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};

export const BottomSheetLightVsDark: StoryObj = {
  name: "BottomSheet / Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24, alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Light Mode</div>
        <Wrap>
          <DatePickerBottomSheet isOpen title="Select Date" subtext="Light mode" onClose={() => {}} />
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Dark Mode</div>
        <DarkWrap>
          <DatePickerBottomSheet isOpen title="Select Date" subtext="Dark mode" onClose={() => {}} />
        </DarkWrap>
      </div>
    </div>
  ),
};
