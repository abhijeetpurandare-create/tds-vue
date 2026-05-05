import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, ThemeProvider } from "@delhivery/tarmac";
import type { TooltipProps } from "@delhivery/tarmac";

const VARIANTS = ["white", "black", "coal"] as const;
const TYPES = ["standard", "ctas"] as const;
const STYLES = ["singleText", "dualText"] as const;
const ARROW_POSITIONS = [
  "top-left", "top-mid", "top-right",
  "bottom-left", "bottom-mid", "bottom-right",
  "left-top", "left-mid", "left-bottom",
  "right-top", "right-mid", "right-bottom",
] as const;

type V = (typeof VARIANTS)[number];
type AP = (typeof ARROW_POSITIONS)[number];
type TT = (typeof TYPES)[number];
type TS = (typeof STYLES)[number];

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const meta: Meta<TooltipProps> = {
  title: "Tarmac TDS/Tooltip",
  component: Tooltip,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    placement: { control: "select", options: [
      "top", "top-start", "top-end",
      "bottom", "bottom-start", "bottom-end",
      "left", "left-start", "left-end",
      "right", "right-start", "right-end",
    ] },
    tooltipType: { control: "select", options: [...TYPES] },
    tooltipStyle: { control: "select", options: [...STYLES] },
    content: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    visible: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<TooltipProps>;

// ---- Playground (interactive) ----
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    variant: "white",
    tooltipType: "standard",
    tooltipStyle: "singleText",
    content: "This is an example message",
    visible: true,
    maxWidth: 300,
    placement: "top",
    title: "This is an example",
    description: "Add a description",
  },
  render: (args) => {
    const isCtas = args.tooltipType === "ctas";
    const { arrowPosition: _ap, ...tooltipArgs } = args;
    return (
      <div style={{ padding: 120 }}>
        <Tooltip
          {...tooltipArgs}
          ctaActions={isCtas ? {
            skip: { label: "Skip", onClick: () => alert("Skip clicked") },
            prev: { label: "Prev", onClick: () => alert("Prev clicked") },
            next: { label: "Next", onClick: () => alert("Next clicked") },
          } : undefined}
        >
          <button style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer" }}>
            Hover me
          </button>
        </Tooltip>
      </div>
    );
  },
};

// ---- CTAs Playground (dedicated for CTA interactions) ----
export const CTAsPlayground: Story = {
  name: "CTAs Playground",
  parameters: { layout: "centered" },
  args: {
    variant: "white",
    tooltipType: "ctas",
    tooltipStyle: "dualText",
    content: "This is an example message, add text",
    description: "Something goes here",
    visible: true,
    maxWidth: 300,
    placement: "top",
  },
  render: (args) => {
    const { arrowPosition: _ap, ...tooltipArgs } = args;
    return (
      <div style={{ padding: 150 }}>
        <Tooltip
          {...tooltipArgs}
          ctaActions={{
            skip: { label: "Skip", onClick: () => alert("Skip") },
            prev: { label: "Prev", onClick: () => alert("Prev") },
            next: { label: "Next", onClick: () => alert("Next") },
          }}
        >
          <button style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer" }}>
            Hover me
          </button>
        </Tooltip>
      </div>
    );
  },
};

// ---- Static inline cell: renders tooltip content directly (no portal) ----
const InlineTooltip: React.FC<{
  variant: V; tooltipType: TT; tooltipStyle: TS; arrowPosition: AP;
}> = ({ variant, tooltipType, tooltipStyle, arrowPosition }) => (
  <Tooltip
    renderInline
    variant={variant}
    tooltipType={tooltipType}
    tooltipStyle={tooltipStyle}
    arrowPosition={arrowPosition}
    content={tooltipType === "ctas" ? "This is an example message, add text" : "This is an example message"}
    title="This is an example"
    description={tooltipStyle === "dualText" ? (tooltipType === "standard" ? "Add a description" : "Something goes here") : undefined}
    ctaActions={tooltipType === "ctas" ? { skip: { label: "Skip" }, prev: { label: "Prev" }, next: { label: "Next" } } : undefined}
  />
);

// ---- Figma-matching table layout ----
// Figma layout: 2 big sections side by side (Standard | CTAs)
// Each section: 3 variant columns (White, Black, Coal)
// Each variant column: 3 sub-columns (Left/Mid/Right arrow alignment)
// Rows: 8 arrow directions grouped into pairs (Top/Bottom for vertical, Left/Right for horizontal)
// Then repeated for Single Text (top half) and Dual Text (bottom half)

const ARROW_ROWS: { label: string; positions: [AP, AP, AP] }[] = [
  { label: "Top",    positions: ["top-left", "top-mid", "top-right"] },
  { label: "Bottom", positions: ["bottom-left", "bottom-mid", "bottom-right"] },
  { label: "Left",   positions: ["left-top", "left-mid", "left-bottom"] },
  { label: "Right",  positions: ["right-top", "right-mid", "right-bottom"] },
];

const cellStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  minHeight: 160, padding: 16, boxSizing: "border-box",
};

const headerCell: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "8px 4px", fontWeight: 600, fontSize: 12, color: "#666",
  borderBottom: "1px solid #e0e0e0", textAlign: "center",
};

const subHeaderCell: React.CSSProperties = {
  ...headerCell, fontWeight: 500, fontSize: 10, color: "#999",
};

const rowLabel: React.CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: 8, fontWeight: 500, fontSize: 11, color: "#666",
  writingMode: "vertical-rl", transform: "rotate(180deg)", minHeight: 160,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 14, fontWeight: 700, color: "#333", padding: "12px 0",
  textAlign: "center", borderBottom: "2px solid #333",
};

const TableSection: React.FC<{ tooltipType: TT; tooltipStyle: TS; title: string }> = ({ tooltipType, tooltipStyle, title }) => {
  // 18 columns: 3 variants × 3 sub-cols each, plus 1 row-label column = 19 total
  const cols = "60px " + VARIANTS.map(() => "repeat(3, 1fr)").join(" ");

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={sectionTitle}>{title}</div>

      {/* Variant headers */}
      <div style={{ display: "grid", gridTemplateColumns: cols, borderBottom: "1px solid #e0e0e0" }}>
        <div />
        {VARIANTS.map((v) => (
          <div key={v} style={{ ...headerCell, gridColumn: "span 3", textTransform: "capitalize", borderBottom: "none" }}>{v}</div>
        ))}
      </div>

      {/* Sub-headers: Left / Mid / Right */}
      <div style={{ display: "grid", gridTemplateColumns: cols }}>
        <div />
        {VARIANTS.map((v) => (
          <React.Fragment key={v}>
            <div style={subHeaderCell}>Left</div>
            <div style={subHeaderCell}>Mid</div>
            <div style={subHeaderCell}>Right</div>
          </React.Fragment>
        ))}
      </div>

      {/* Data rows */}
      {ARROW_ROWS.map((row) => (
        <div key={row.label} style={{
          display: "grid", gridTemplateColumns: cols,
          borderBottom: "1px solid #f0f0f0",
          backgroundColor: row.label === "Top" || row.label === "Left" ? "#fafafa" : "#fff",
        }}>
          <div style={rowLabel}>{row.label}</div>
          {VARIANTS.map((v) =>
            row.positions.map((ap) => (
              <div key={`${v}-${ap}`} style={cellStyle}>
                <InlineTooltip variant={v} tooltipType={tooltipType} tooltipStyle={tooltipStyle} arrowPosition={ap} />
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

// ---- Full Matrix: matches Figma playground layout ----
export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 32, overflowX: "auto" }}>
      <TableSection tooltipType="standard" tooltipStyle="singleText" title="Standard — Single Text" />
      <TableSection tooltipType="ctas" tooltipStyle="singleText" title="CTAs — Single Text" />
      <TableSection tooltipType="standard" tooltipStyle="dualText" title="Standard — Dual Text" />
      <TableSection tooltipType="ctas" tooltipStyle="dualText" title="CTAs — Dual Text" />
    </div>
  ),
};

// ---- Per-variant stories ----
const PerVariant: React.FC<{ variant: V }> = ({ variant }) => (
  <div style={{ padding: 32, overflowX: "auto" }}>
    {TYPES.map((type) =>
      STYLES.map((sty) => (
        <div key={`${type}-${sty}`} style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 12, textTransform: "capitalize" }}>
            {type} — {sty === "singleText" ? "Single Text" : "Dual Text"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "60px repeat(3, 1fr)", gap: 0, borderBottom: "1px solid #e0e0e0" }}>
            <div />
            <div style={subHeaderCell}>Left</div>
            <div style={subHeaderCell}>Mid</div>
            <div style={subHeaderCell}>Right</div>
          </div>
          {ARROW_ROWS.map((row) => (
            <div key={row.label} style={{
              display: "grid", gridTemplateColumns: "60px repeat(3, 1fr)",
              borderBottom: "1px solid #f0f0f0",
            }}>
              <div style={rowLabel}>{row.label}</div>
              {row.positions.map((ap) => (
                <div key={ap} style={cellStyle}>
                  <InlineTooltip variant={variant} tooltipType={type} tooltipStyle={sty} arrowPosition={ap} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))
    )}
  </div>
);

export const White: Story = { name: "White", render: () => <PerVariant variant="white" /> };
export const Black: Story = { name: "Black", render: () => <PerVariant variant="black" /> };
export const Coal: Story = { name: "Coal", render: () => <PerVariant variant="coal" /> };

// ---- Arrow Positions (compact grid) ----
export const ArrowPositions: Story = {
  name: "Arrow Positions",
  render: () => (
    <div style={{ padding: 32 }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 24 }}>All 12 Arrow Positions (White variant)</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 240px)", gap: 24 }}>
        {ARROW_POSITIONS.map((pos) => (
          <div key={pos} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: "#999", fontFamily: "monospace" }}>{pos}</span>
            <InlineTooltip variant="white" tooltipType="standard" tooltipStyle="singleText" arrowPosition={pos} />
          </div>
        ))}
      </div>
    </div>
  ),
};
