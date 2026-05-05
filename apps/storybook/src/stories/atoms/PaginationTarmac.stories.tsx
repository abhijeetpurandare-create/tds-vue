import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
// Import directly from local source — same as legacy Pagination story
import Pagination from '../../../../../packages/atoms/src/components/Pagination';
import ThemeProvider, { useTheme } from '../../../../../packages/atoms/src/components/ThemeProvider';
import { css } from "@emotion/css";
import type { PaginationProps, PaginationSize, PaginationCellStyle, PaginationTextCount } from '../../../../../packages/atoms/src/components/Pagination';

// ─── Constants ───────────────────────────────────────────────────────────────

const SIZES: PaginationSize[] = ["lg", "md", "sm"];
const CELL_STYLES: PaginationCellStyle[] = ["black", "legacyBlue", "dlvRed"];

const SIZE_LABELS: Record<string, string> = { lg: "Large", md: "Medium", sm: "Small" };
const CELL_STYLE_LABELS: Record<string, string> = { black: "Black", legacyBlue: "Legacy Blue", dlvRed: "DLV Red" };

type ShowcaseState = "default" | "hover" | "pressed" | "disabled" | "focused";
const NUMBER_CELL_STATES: ShowcaseState[] = ["default", "hover", "pressed", "disabled", "focused"];
const TEXT_CELL_STATES: ShowcaseState[] = ["default", "hover", "pressed"];

// ─── Theme Wrappers ──────────────────────────────────────────────────────────

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

// ─── ShowcaseWrapper — storybook-only, forces visual states on Number Cells ──

const ShowcaseNumberCell: React.FC<
  PaginationProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = (theme.components as any)?.pagination_tarmac;
  const cellStyle = props.cellStyle || "black";
  const rawHover = cfg?.numberCell?.states?.hover;
  const hoverState = rawHover?.[cellStyle] || rawHover || {};
  const rawFocused = cfg?.numberCell?.states?.focused;
  const focusedState = rawFocused?.[cellStyle] || rawFocused || {};

  if (showcaseState === "default") return <Pagination {...props} />;
  if (showcaseState === "disabled") return <Pagination {...props} isDisabled />;

  if (showcaseState === "hover") {
    const overrides = css({
      '& button[aria-label^="Page"]:not([aria-current="page"])::after': {
        backgroundColor: `${hoverState?.borderTopColor || "#e6e6e6"} !important`,
      },
      '& button[aria-label^="Page"]:not([aria-current="page"])': {
        color: `${hoverState?.textColor || "#2b2b2b"} !important`,
      },
    });
    return <div className={overrides}><Pagination {...props} /></div>;
  }

  if (showcaseState === "pressed") {
    const activeStyle = cfg?.numberCell?.styles?.[cellStyle];
    const overrides = css({
      '& button[aria-label^="Page"]': {
        backgroundColor: `${activeStyle?.activeBackgroundColor || "#2b2b2b"} !important`,
        color: `${activeStyle?.activeTextColor || "#f7f7f7"} !important`,
        borderRadius: "4px !important",
      },
      '& button[aria-label^="Page"]::after': {
        backgroundColor: "transparent !important",
      },
    });
    return <div className={overrides}><Pagination {...props} /></div>;
  }

  if (showcaseState === "focused") {
    const overrides = css({
      '& button[aria-label^="Page"]:not([aria-current="page"])': {
        boxShadow: `inset 0 0 0 1px ${focusedState?.borderColor || "#e6e6e6"} !important`,
        borderRadius: `${focusedState?.borderRadius || 4}px !important`,
        color: `${focusedState?.textColor || "#2b2b2b"} !important`,
      },
      '& button[aria-label^="Page"]:not([aria-current="page"])::after': {
        backgroundColor: "transparent !important",
      },
    });
    return <div className={overrides}><Pagination {...props} /></div>;
  }

  return <Pagination {...props} />;
};

// ─── ShowcaseWrapper — storybook-only, forces visual states on Text Cells ────

const ShowcaseTextCell: React.FC<
  PaginationProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = (theme.components as any)?.pagination_tarmac;
  const textStates = cfg?.textCell?.states;

  if (showcaseState === "default") return <Pagination {...props} />;

  if (showcaseState === "hover") {
    const overrides = css({
      '& [data-testid="pagination-text-group-right"] button': {
        color: `${textStates?.hover?.textColor || "#2b2b2b"} !important`,
        cursor: "pointer !important",
      },
    });
    return <div className={overrides}><Pagination {...props} /></div>;
  }

  if (showcaseState === "pressed") {
    const overrides = css({
      '& [data-testid="pagination-text-group-right"] button': {
        color: `${textStates?.pressed?.textColor || "#2b2b2b"} !important`,
        fontWeight: `${textStates?.pressed?.fontWeight || 600} !important`,
      },
    });
    return <div className={overrides}><Pagination {...props} /></div>;
  }

  return <Pagination {...props} />;
};

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Pagination> = {
  title: "Tarmac TDS/Pagination",
  component: Pagination,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<typeof Pagination>;

// ─── Shared Styles ───────────────────────────────────────────────────────────

const st: Record<string, React.CSSProperties> = {
  page: { padding: 24, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title: { fontSize: 15, fontWeight: 700, color: "#374151", margin: "32px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  subtitle: { fontSize: 13, fontWeight: 600, color: "#6b7280", margin: "16px 0 8px" },
  grid: { display: "grid", gridTemplateColumns: "120px repeat(5, 1fr)", gap: "8px 12px", alignItems: "start" },
  colHdr: { fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, textAlign: "center" as const, padding: "4px 0" },
  rowLabel: { fontSize: 9, color: "#b0b0b0", textAlign: "right" as const, paddingRight: 8, paddingTop: 8 },
  cell: { display: "flex", justifyContent: "center", alignItems: "start", padding: "4px 0" },
};

// ─── Default props for all Tarmac stories ────────────────────────────────────

const tarmacDefaults: Partial<PaginationProps> = {
  paginationStyle: "tarmac-01",
  total: 200,
  pageSize: 10,
};


/* ═══ Story 7.2: Playground ═══ */

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    ...tarmacDefaults,
    cellStyle: "black",
    tarmacSize: "lg",
    showTextLeft: true,
    showNumberCells: true,
    showTextRight: true,
    isDisabled: false,
    total: 200,
    pageSize: 54,
    textCount: "single" as PaginationTextCount,
    showTotal: (total: number, range: [number, number]) => `Showing ${range[0]}-${range[1]} of ${total}`,
  },
  argTypes: {
    tarmacSize: { control: "select", options: ["lg", "md", "sm"] },
    cellStyle: { control: "select", options: ["black", "legacyBlue", "dlvRed"] },
    textCount: { control: "select", options: ["single", "dual", "triple", "quad"] },
    showTextLeft: { control: "boolean" },
    showNumberCells: { control: "boolean" },
    showTextRight: { control: "boolean" },
    showPageCell: { control: "boolean" },
    showLeftIconButton: { control: "boolean" },
    isDisabled: { control: "boolean" },
    total: { control: { type: "number", min: 0, max: 10000 } },
    pageSize: { control: { type: "number", min: 1, max: 100 } },
  },
  render: (args) => {
    const [current, setCurrent] = useState(1);
    const textCount = (args as any).textCount || "single";
    const textItems = textCount === "dual"
      ? ["1 of 20 pages"]
      : textCount === "triple"
        ? ["1 of 20 pages", "200 items"]
        : textCount === "quad"
          ? ["1 of 20 pages", "200 items", "10 per page"]
          : [];
    return (
      <div style={{ width: 800 }}>
        <Pagination
          {...args}
          paginationStyle="tarmac-01"
          current={current}
          onChange={(page) => setCurrent(page)}
          textCount={textCount}
          textItems={textItems}
        />
      </div>
    );
  },
} as Story

/* ═══ Story 7.3: Full Matrix — Cell_Style × Size × State for Number Cells ═══ */

const MatrixSection: React.FC<{ cellStyle: PaginationCellStyle }> = ({ cellStyle }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={st.subtitle}>{CELL_STYLE_LABELS[cellStyle as string]}</div>
    <div style={st.grid}>
      <div />
      {NUMBER_CELL_STATES.map((s) => (
        <div key={s} style={st.colHdr}>{s}</div>
      ))}
      {SIZES.map((size) => (
        <React.Fragment key={size as string}>
          <div style={st.rowLabel}>{SIZE_LABELS[size as string]}</div>
          {NUMBER_CELL_STATES.map((state) => (
            <div key={state} style={st.cell}>
              <ShowcaseNumberCell
                showcaseState={state}
                {...tarmacDefaults}
                cellStyle={cellStyle}
                tarmacSize={size}
                showTextLeft={false}
                showTextRight={false}
                showNumberCells={true}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={st.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>
        3 Cell Styles × 3 Sizes × 5 States = 45 Number Cell combinations
      </p>
      {CELL_STYLES.map((cs) => (
        <MatrixSection key={cs as string} cellStyle={cs} />
      ))}
    </div>
  ),
};

/* ═══ Story 7.4: Number Cell Styles — Black, Legacy Blue, DLV Red ═══ */

export const NumberCellStyles: Story = {
  name: "Number Cell Styles",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Number Cell Styles — Active Cells</div>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>
        Each style shows the active page cell color across all sizes.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {CELL_STYLES.map((cs) => (
          <div key={cs as string}>
            <div style={st.subtitle}>{CELL_STYLE_LABELS[cs as string]}</div>
            {SIZES.map((size) => (
              <div key={size as string} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
                <Pagination
                  {...tarmacDefaults}
                  cellStyle={cs}
                  tarmacSize={size}
                  showTextLeft={false}
                  showTextRight={false}
                  showNumberCells={true}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};


/* ═══ Story 7.5: Number Cell States — Default, Hover, Pressed, Disabled, Focused ═══ */

export const NumberCellStates: Story = {
  name: "Number Cell States",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Number Cell States per Style</div>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>
        ShowcaseWrapper simulates hover, pressed, focused, and disabled states via CSS overrides.
      </p>
      {CELL_STYLES.map((cs) => (
        <div key={cs as string} style={{ marginBottom: 32 }}>
          <div style={st.subtitle}>{CELL_STYLE_LABELS[cs as string]}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {NUMBER_CELL_STATES.map((state) => (
              <div key={state}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4, textTransform: "uppercase", textAlign: "center" }}>{state}</div>
                <ShowcaseNumberCell
                  showcaseState={state}
                  {...tarmacDefaults}
                  cellStyle={cs}
                  tarmacSize="md"
                  showTextLeft={false}
                  showTextRight={false}
                  showNumberCells={true}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ═══ Story 7.6: Text Cell States — Default, Hover, Pressed ═══ */

export const TextCellStates: Story = {
  name: "Text Cell States",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Text Cell States — "Previous" and "Next"</div>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>
        ShowcaseWrapper simulates hover and pressed states on text cells via CSS overrides.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {TEXT_CELL_STATES.map((state) => (
          <div key={state}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4, textTransform: "uppercase", textAlign: "center" }}>{state}</div>
            <ShowcaseTextCell
              showcaseState={state}
              {...tarmacDefaults}
              tarmacSize="md"
              showTextLeft={false}
              showNumberCells={false}
              showTextRight={true}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story: Divider Toggle ═══ */

export const DividerToggle: Story = {
  name: "Divider Toggle",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Divider — Enabled vs Disabled</div>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>
        The divider between Previous and Next can be toggled via the showDivider prop.
      </p>
      {SIZES.map((size) => (
        <div key={size as string} style={{ marginBottom: 24 }}>
          <div style={st.subtitle}>{SIZE_LABELS[size as string]}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase" }}>Divider: ON</div>
              <Pagination
                {...tarmacDefaults}
                tarmacSize={size}
                showTextLeft={false}
                showNumberCells={false}
                showTextRight={true}
                showDivider={true}
              />
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase" }}>Divider: OFF</div>
              <Pagination
                {...tarmacDefaults}
                tarmacSize={size}
                showTextLeft={false}
                showNumberCells={false}
                showTextRight={true}
                showDivider={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ═══ Story 7.8: Text Group Counts — Single, Dual, Triple, Quad ═══ */

export const TextGroupCounts: Story = {
  name: "Text Group Counts",
  render: () => {
    const textCountVariants: Array<{
      label: string;
      textCount: PaginationTextCount;
      textItems: React.ReactNode[];
      description: string;
    }> = [
      {
        label: "Single",
        textCount: "single",
        textItems: [],
        description: "Text cell + Number cell + Icon Button",
      },
      {
        label: "Dual",
        textCount: "dual",
        textItems: ["1 of 20 pages"],
        description: "Text cell + Divider + Text cell",
      },
      {
        label: "Triple",
        textCount: "triple",
        textItems: ["1 of 20 pages", "200 items"],
        description: "Text cell + Divider + Text cell + Divider + Text cell",
      },
      {
        label: "Quad",
        textCount: "quad",
        textItems: ["1 of 20 pages", "200 items", "10 per page"],
        description: "Text cell + Divider + Text cell + Divider + Text cell + Divider + Text cell",
      },
    ];

    return (
      <div style={st.page}>
        <div style={st.title}>Text Group Count Variants (Figma: .Pagination text group)</div>
        <p style={{ color: "#6b7280", marginBottom: 16 }}>
          The left text group supports Single, Dual, Triple, and Quad count variants matching the Figma design.
        </p>
        {SIZES.map((size) => (
          <div key={size as string} style={{ marginBottom: 32 }}>
            <div style={st.subtitle}>{SIZE_LABELS[size as string]}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {textCountVariants.map((v) => (
                <div key={v.label}>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4, fontWeight: 600 }}>
                    {v.label} — <span style={{ fontWeight: 400 }}>{v.description}</span>
                  </div>
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: 4 }}>
                    <Pagination
                      {...tarmacDefaults}
                      tarmacSize={size}
                      showTextLeft={true}
                      showNumberCells={false}
                      showTextRight={false}
                      textCount={v.textCount}
                      textItems={v.textItems}
                      showTotal={(total, range) => `Showing ${total}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/* ═══ Story: Single Count with Cell + Icon Button ═══ */

export const SingleCountWithExtras: Story = {
  name: "Single Count (Cell + Icon Button)",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Single Count — Cell and Icon Button booleans</div>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>
        The Single count variant supports optional Cell (page number) and Icon Button sub-components.
      </p>
      {SIZES.map((size) => (
        <div key={size as string} style={{ marginBottom: 24 }}>
          <div style={st.subtitle}>{SIZE_LABELS[size as string]}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>Cell: ON, Icon Button: ON</div>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: 4 }}>
                <Pagination {...tarmacDefaults} tarmacSize={size} showTextLeft showNumberCells={false} showTextRight={false} textCount="single" showPageCell showLeftIconButton showTotal={(total) => `Showing ${total}`} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>Cell: ON, Icon Button: OFF</div>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: 4 }}>
                <Pagination {...tarmacDefaults} tarmacSize={size} showTextLeft showNumberCells={false} showTextRight={false} textCount="single" showPageCell showTotal={(total) => `Showing ${total}`} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>Cell: OFF, Icon Button: OFF (default)</div>
              <div style={{ border: "1px solid #e5e7eb", borderRadius: 4 }}>
                <Pagination {...tarmacDefaults} tarmacSize={size} showTextLeft showNumberCells={false} showTextRight={false} textCount="single" showTotal={(total) => `Showing ${total}`} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ═══ Story: Sizes — Large, Medium, Small ═══ */

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Assembled Pagination — All Sizes</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
          <div key={size as string}>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>
              {SIZE_LABELS[size as string]}
            </div>
            <Pagination
              {...tarmacDefaults}
              tarmacSize={size}
              showTextLeft={true}
              showNumberCells={true}
              showTextRight={true}
              showLeftIconButton={true}
              textCount="single"
              showTotal={(total) => `Showing ${total}`}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};


/* ═══ Story 7.9: Boolean Toggles — showTextLeft, showNumberCells, showTextRight ═══ */

export const BooleanToggles: Story = {
  name: "Boolean Toggles",
  render: () => {
    const combos: Array<{ showTextLeft: boolean; showNumberCells: boolean; showTextRight: boolean }> = [
      { showTextLeft: true, showNumberCells: true, showTextRight: true },
      { showTextLeft: true, showNumberCells: true, showTextRight: false },
      { showTextLeft: true, showNumberCells: false, showTextRight: true },
      { showTextLeft: true, showNumberCells: false, showTextRight: false },
      { showTextLeft: false, showNumberCells: true, showTextRight: true },
      { showTextLeft: false, showNumberCells: true, showTextRight: false },
      { showTextLeft: false, showNumberCells: false, showTextRight: true },
      { showTextLeft: false, showNumberCells: false, showTextRight: false },
    ];

    return (
      <div style={st.page}>
        <div style={st.title}>Boolean Toggle Combinations</div>
        <p style={{ color: "#6b7280", marginBottom: 16 }}>
          All 8 combinations of showTextLeft, showNumberCells, showTextRight.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {combos.map((c, i) => {
            const label = `L:${c.showTextLeft ? "✓" : "✗"} N:${c.showNumberCells ? "✓" : "✗"} R:${c.showTextRight ? "✓" : "✗"}`;
            return (
              <div key={i}>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4, fontWeight: 600, fontFamily: "monospace" }}>
                  {label}
                </div>
                <div style={{ border: "1px solid #e5e7eb", borderRadius: 4, minHeight: 40 }}>
                  <Pagination
                    {...tarmacDefaults}
                    tarmacSize="md"
                    showTextLeft={c.showTextLeft}
                    showNumberCells={c.showNumberCells}
                    showTextRight={c.showTextRight}
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

/* ═══ Story 7.10: Disabled State ═══ */

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Disabled State</div>
      <p style={{ color: "#6b7280", marginBottom: 16 }}>
        Full Pagination in disabled mode — all interactive elements are disabled.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
          <div key={size as string}>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>
              {SIZE_LABELS[size as string]} — Disabled
            </div>
            <Pagination
              {...tarmacDefaults}
              tarmacSize={size}
              isDisabled={true}
              showTextLeft={true}
              showNumberCells={true}
              showTextRight={true}
              showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 7.11: Light vs Dark Mode ═══ */

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {CELL_STYLES.map((cs) => (
              <div key={cs as string}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{CELL_STYLE_LABELS[cs as string]}</div>
                <Pagination
                  {...tarmacDefaults}
                  cellStyle={cs}
                  tarmacSize="md"
                  showTextLeft={true}
                  showNumberCells={true}
                  showTextRight={true}
                  showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                />
              </div>
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {CELL_STYLES.map((cs) => (
              <div key={cs as string}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{CELL_STYLE_LABELS[cs as string]}</div>
                <Pagination
                  {...tarmacDefaults}
                  cellStyle={cs}
                  tarmacSize="md"
                  showTextLeft={true}
                  showNumberCells={true}
                  showTextRight={true}
                  showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                />
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
