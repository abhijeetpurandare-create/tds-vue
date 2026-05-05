import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating, ThemeProvider } from "@delhivery/tarmac";
import type { RatingProps } from "@delhivery/tarmac";

const SIZES = ["lg", "md", "sm"] as const;
const RATES = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

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
    <div style={{ backgroundColor: "#1a1a2e", padding: 24, borderRadius: 8 }}>
      {children}
    </div>
  </ThemeProvider>
);

const meta: Meta<RatingProps> = {
  title: "Tarmac TDS/Rating",
  component: Rating,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<RatingProps>;

/* ─── Playground (stateful wrapper so it's interactive) ─── */
const PlaygroundRender: React.FC<RatingProps> = (args) => {
  const [val, setVal] = React.useState(args.value ?? 3.5);
  React.useEffect(() => { setVal(args.value ?? 3.5); }, [args.value]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Rating {...args} value={val} readOnly={false} onChange={setVal} />
      <div style={{ fontSize: 12, color: "#666" }}>Value: {val}</div>
    </div>
  );
};

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: { value: 3.5, size: "lg", maxStars: 5, allowHalf: true },
  render: (args) => <PlaygroundRender {...args} />,
};

/* ─── Full Matrix ─── */
export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60px repeat(3, 1fr)",
          gap: "12px 24px",
          alignItems: "center",
        }}
      >
        <div />
        {SIZES.map((sz) => (
          <div key={sz} style={{ fontSize: 13, fontWeight: 600, color: "#888", textAlign: "center" }}>
            {sz}
          </div>
        ))}
        {RATES.map((rate) => (
          <React.Fragment key={rate}>
            <div style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>{rate}</div>
            {SIZES.map((sz) => (
              <div key={sz} style={{ textAlign: "center" }}>
                <Rating value={rate} size={sz} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
};

/* ─── Per-Size Stories ─── */
export const Large: Story = {
  name: "Large",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      {RATES.map((rate) => (
        <div key={rate} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 30, fontSize: 13, color: "#888" }}>{rate}</span>
          <Rating value={rate} size="lg" />
        </div>
      ))}
    </div>
  ),
};

export const Medium: Story = {
  name: "Medium",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      {RATES.map((rate) => (
        <div key={rate} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 30, fontSize: 13, color: "#888" }}>{rate}</span>
          <Rating value={rate} size="md" />
        </div>
      ))}
    </div>
  ),
};

export const Small: Story = {
  name: "Small",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
      {RATES.map((rate) => (
        <div key={rate} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 30, fontSize: 13, color: "#888" }}>{rate}</span>
          <Rating value={rate} size="sm" />
        </div>
      ))}
    </div>
  ),
};

/* ─── Half Stars ─── */
export const HalfStars: Story = {
  name: "Half Stars",
  render: () => (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <h4 style={{ fontSize: 14, color: "#888", margin: 0 }}>Half-star increments</h4>
      {[0.5, 1.5, 2.5, 3.5, 4.5].map((rate) => (
        <div key={rate} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 30, fontSize: 13, color: "#888" }}>{rate}</span>
          <Rating value={rate} size="lg" />
        </div>
      ))}
    </div>
  ),
};

/* ─── Interactive ─── */
const InteractiveRender: React.FC = () => {
  const [value, setValue] = React.useState(3);
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <h4 style={{ fontSize: 14, color: "#888", margin: 0 }}>
        Click a star to rate (current: {value})
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#888", width: 80 }}>Allow half:</span>
          <Rating value={value} size="lg" readOnly={false} onChange={setValue} allowHalf />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#888", width: 80 }}>Full only:</span>
          <Rating value={value} size="lg" readOnly={false} onChange={setValue} allowHalf={false} />
        </div>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  name: "Interactive",
  render: () => <InteractiveRender />,
};

/* ─── Light vs Dark Mode ─── */
export const LightVsDarkMode: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 12, fontSize: 14, color: "#888" }}>Light Mode</h4>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[1, 2.5, 3.5, 5].map((r) => (
              <Rating key={r} value={r} size="lg" />
            ))}
          </div>
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: 12, fontSize: 14, color: "#888" }}>Dark Mode</h4>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[1, 2.5, 3.5, 5].map((r) => (
              <Rating key={r} value={r} size="lg" />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
