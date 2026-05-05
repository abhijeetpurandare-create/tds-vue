import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TarmacTable,
  ThemeProvider,
} from "@delhivery/tarmac";
import { css } from "@emotion/css";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    <div style={{ padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      {children}
    </div>
  </ThemeProvider>
);

const sectionTitle = css({
  fontSize: "16px",
  fontWeight: 600,
  marginBottom: "12px",
  marginTop: "24px",
  color: "#121212",
});

const grid = css({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  border: "1px solid #E6E6E6",
  borderRadius: "8px",
  overflow: "hidden",
  maxWidth: "300px",
});

const row = css({
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
  flexWrap: "wrap",
});

const meta: Meta<any> = {
  title: "Tarmac TDS/Table/Table Cells",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<any>;

// ============================================
// TableTextCell Stories
// ============================================

export const TextCellTexts: Story = {
  name: "TextCell — Texts",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Text Cells — Texts Variant</p>
      <div className={row}>
        <div className={grid}>
          <TarmacTable.TextCell
            variant="texts"
            subtextTop="Subtext here"
            title="Title here"
            showSubtextTop
            showTitle
          />
        </div>
        <div className={grid}>
          <TarmacTable.TextCell
            variant="texts"
            subtextTop="Subtext here"
            title="Title here"
            subtextBottom="Subtext here"
            showSubtextTop
            showTitle
            showSubtextBottom
          />
        </div>
        <div className={grid}>
          <TarmacTable.TextCell
            variant="texts"
            title="Title here"
            showTitle
            showSubtextTop={false}
          />
        </div>
      </div>
    </div>
  ),
};

export const TextCellTextsIcons: Story = {
  name: "TextCell — Texts + Icons",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Text Cells — Texts + Icons Variant</p>
      <div className={row}>
        <div className={grid}>
          <TarmacTable.TextCell
            variant="textsIcons"
            subtextTop="Subtext here"
            title="Title here"
            subtextBottom="Subtext here"
            showSubtextTop
            showTitle
            showSubtextBottom
            leadingIcon={<DotIcon />}
            trailingIcon={<ArrowIcon />}
            leadingSubtextIcon={<DotIcon />}
            trailingSubtextIcon={<DotIcon />}
          />
        </div>
      </div>
    </div>
  ),
};

export const TextCellGhost: Story = {
  name: "TextCell — Ghost (Loading)",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Text Cells — Ghost Variant</p>
      <div className={row}>
        <div className={grid}>
          <TarmacTable.TextCell variant="ghost" />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// TableHeaderCell Stories
// ============================================

export const HeaderCellDefault: Story = {
  name: "HeaderCell — Default",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Header Cell — Default</p>
      <div className={row}>
        <div className={grid}>
          <TarmacTable.HeaderCell label="NAME" />
        </div>
        <div className={grid}>
          <TarmacTable.HeaderCell
            label="NAME"
            showCheckbox
            onCheckChange={(v) => console.log("check:", v)}
          />
        </div>
        <div className={grid}>
          <TarmacTable.HeaderCell
            label="NAME"
            showTrailingIcon
            trailingIcon={<SortIcon />}
            onSort={() => console.log("sort")}
          />
        </div>
      </div>
    </div>
  ),
};

export const HeaderCellLoader: Story = {
  name: "HeaderCell — Loader",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Header Cell — Loader</p>
      <div className={row}>
        <div className={grid}>
          <TarmacTable.HeaderCell type="loader" />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// Divider Stories
// ============================================

export const Dividers: Story = {
  name: "Divider — Line & Dash",
  render: () => (
    <div>
      <p className={sectionTitle}>Dividers</p>
      <div style={{ maxWidth: 300 }}>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Line (between rows)</p>
        <TarmacTable.Divider type="line" />
        <div style={{ height: 16 }} />
        <p style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Dash (between row content & footer)</p>
        <TarmacTable.Divider type="dash" />
      </div>
    </div>
  ),
};

// ============================================
// CellBadgePills Stories
// ============================================

export const CellBadges: Story = {
  name: "CellBadgePills — Badges",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Cell Badge/Pills — Badges</p>
      <div className={row}>
        {(["1", "2", "3"] as const).map((t) => (
          <div key={t} className={grid}>
            <TarmacTable.CellBadgePills
              variant="badges"
              type={t}
              items={[{ label: "Badge" }, { label: "Badge" }, { label: "Badge" }]}
            />
          </div>
        ))}
        <div className={grid}>
          <TarmacTable.CellBadgePills variant="badges" type="ghost" />
        </div>
      </div>
    </div>
  ),
};

export const CellPills: Story = {
  name: "CellBadgePills — Pills",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Cell Badge/Pills — Pills</p>
      <div className={row}>
        {(["1", "2", "3"] as const).map((t) => (
          <div key={t} className={grid}>
            <TarmacTable.CellBadgePills
              variant="pills"
              type={t}
              items={[{ label: "Pills" }, { label: "Pills" }, { label: "Pills" }]}
            />
          </div>
        ))}
        <div className={grid}>
          <TarmacTable.CellBadgePills variant="pills" type="ghost" />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// CellAddons Stories
// ============================================

export const CellAddonsPrimary: Story = {
  name: "CellAddons — Primary Types",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Cells Add-ons — Primary</p>
      <div className={row}>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>Badge Horizontal</p>
          <TarmacTable.CellAddons
            type="primary-badge-horizontal"
            title="Title here"
            badgeLabel="Badge"
          />
        </div>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>Subtext</p>
          <TarmacTable.CellAddons
            type="primary-subtext"
            title="Title here"
            subtext="Subtext here"
          />
        </div>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>2 Line with Icon</p>
          <TarmacTable.CellAddons
            type="primary-2-line-icon"
            title="Title here"
            subtext="Subtext here"
            trailingIcon={<ArrowIcon />}
          />
        </div>
      </div>
    </div>
  ),
};

export const CellAddonsCheckbox: Story = {
  name: "CellAddons — Checkbox Types",
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div>
        <p className={sectionTitle}>Table Cells Add-ons — Checkbox</p>
        <div className={row}>
          <div className={grid}>
            <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>Title</p>
            <TarmacTable.CellAddons
              type="checkbox-title"
              title="Title here"
              checked={checked}
              onCheckChange={setChecked}
            />
          </div>
          <div className={grid}>
            <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>Title + Subtext</p>
            <TarmacTable.CellAddons
              type="checkbox-title-subtext"
              title="Title here"
              subtext="Subtext here"
              checked={checked}
              onCheckChange={setChecked}
            />
          </div>
          <div className={grid}>
            <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>Subtext + Badge</p>
            <TarmacTable.CellAddons
              type="checkbox-subtext"
              title="Title here"
              subtext="Subtext here"
              badgeLabel="Badge"
              checked={checked}
              onCheckChange={setChecked}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const CellAddonsMultistop: Story = {
  name: "CellAddons — Multistop",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Cells Add-ons — Multistop</p>
      <div className={row}>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>Locations</p>
          <TarmacTable.CellAddons
            type="multistop-locations"
            origin="Bangalore (BLR)"
            destination="Gurgaon (GGN)"
          />
        </div>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>Location + Distance</p>
          <TarmacTable.CellAddons
            type="multistop-location-distance"
            origin="Bangalore (BLR)"
            destination="Gurgaon (GGN)"
            distance="200 km"
          />
        </div>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>Location Stops</p>
          <TarmacTable.CellAddons
            type="multistop-location-stops"
            origin="Bangalore (BLR)"
            destination="Gurgaon (GGN)"
            stops={2}
          />
        </div>
      </div>
    </div>
  ),
};

export const CellAddonsButtons: Story = {
  name: "CellAddons — Buttons",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Cells Add-ons — Buttons</p>
      <div className={row}>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>1 CTA</p>
          <TarmacTable.CellAddons
            type="button-1-cta"
            primaryAction={<ActionButton label="Action" />}
          />
        </div>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>2 CTA</p>
          <TarmacTable.CellAddons
            type="button-2-cta"
            primaryAction={<ActionButton label="Action" />}
            secondaryAction={<ActionButton label="Action" variant="secondary" />}
          />
        </div>
      </div>
    </div>
  ),
};

export const CellAddonsSlots: Story = {
  name: "CellAddons — Slots",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Cells Add-ons — Slots</p>
      <div className={row}>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>1 Slot</p>
          <TarmacTable.CellAddons type="slot-1" />
        </div>
        <div className={grid}>
          <p style={{ fontSize: 10, padding: "4px 8px", color: "#666" }}>2 Slots</p>
          <TarmacTable.CellAddons type="slot-2" />
        </div>
      </div>
    </div>
  ),
};

export const CellAddonsGhost: Story = {
  name: "CellAddons — Ghost",
  render: () => (
    <div>
      <p className={sectionTitle}>Table Cells Add-ons — Ghost</p>
      <div className={grid}>
        <TarmacTable.CellAddons type="ghost" />
      </div>
    </div>
  ),
};

// ============================================
// Combined Column Demo
// ============================================

export const ColumnComposition: Story = {
  name: "Column Composition Demo",
  render: () => (
    <div>
      <p className={sectionTitle}>Composing a Column from Sub-Components</p>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        This shows how HeaderCell + TextCells + Dividers compose into a column.
      </p>
      <div className={grid} style={{ maxWidth: 200 }}>
        <TarmacTable.HeaderCell label="NAME" />
        <TarmacTable.TextCell title="John Doe" subtextTop="ID: 12345" />
        <TarmacTable.Divider />
        <TarmacTable.TextCell title="Jane Smith" subtextTop="ID: 67890" />
        <TarmacTable.Divider />
        <TarmacTable.TextCell title="Bob Wilson" subtextTop="ID: 11223" />
        <TarmacTable.Divider />
        <TarmacTable.TextCell variant="ghost" />
      </div>
    </div>
  ),
};

// ============================================
// Full Row Composition Demo
// ============================================

export const RowComposition: Story = {
  name: "Row Composition Demo",
  render: () => (
    <div>
      <p className={sectionTitle}>Composing a Full Row</p>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>
        Multiple columns side by side, each with a header + data cells.
      </p>
      <div style={{ display: "flex", border: "1px solid #E6E6E6", borderRadius: 8, overflow: "hidden", maxWidth: 800 }}>
        {/* Column 1: Checkbox + Text */}
        <div style={{ flex: 1, borderRight: "1px solid #E6E6E6" }}>
          <TarmacTable.HeaderCell label="ORDER ID" showCheckbox />
          <TarmacTable.CellAddons type="checkbox-title-subtext" title="9023857" subtext="78986398757" />
          <TarmacTable.Divider />
          <TarmacTable.CellAddons type="checkbox-title-subtext" title="9023858" subtext="78986398758" />
        </div>
        {/* Column 2: Text */}
        <div style={{ flex: 1, borderRight: "1px solid #E6E6E6" }}>
          <TarmacTable.HeaderCell label="PRODUCT" />
          <TarmacTable.TextCell title="Blue T-Shirt (+2 items)" subtextBottom="₹ 2,200" showSubtextBottom />
          <TarmacTable.Divider />
          <TarmacTable.TextCell title="Red Jacket" subtextBottom="₹ 3,500" showSubtextBottom />
        </div>
        {/* Column 3: Status */}
        <div style={{ flex: 1, borderRight: "1px solid #E6E6E6" }}>
          <TarmacTable.HeaderCell label="STATUS" />
          <div style={{ padding: "8px 12px" }}>
            <TarmacTable.StatusIndicator variant="warning" label="Warning" />
          </div>
          <TarmacTable.Divider />
          <div style={{ padding: "8px 12px" }}>
            <TarmacTable.StatusIndicator variant="success" label="Success" />
          </div>
        </div>
        {/* Column 4: Badge */}
        <div style={{ flex: 1 }}>
          <TarmacTable.HeaderCell label="TAGS" />
          <TarmacTable.CellBadgePills variant="badges" type="2" items={[{ label: "Badge" }, { label: "Badge" }]} />
          <TarmacTable.Divider />
          <TarmacTable.CellBadgePills variant="pills" type="1" items={[{ label: "Pills" }]} />
        </div>
      </div>
    </div>
  ),
};

// ============================================
// Helper Icons (inline SVGs matching Figma)
// ============================================

const DotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="3" fill="#454545" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M6 8L10 12L14 8" stroke="#454545" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SortIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 2L12 6" stroke="#454545" strokeWidth="1" />
    <path d="M4 10L8 14L12 10" stroke="#454545" strokeWidth="1" />
  </svg>
);

const ActionButton: React.FC<{ label: string; variant?: "primary" | "secondary" }> = ({
  label,
  variant = "primary",
}) => (
  <button
    style={{
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      padding: "6px",
      borderRadius: 4,
      border: variant === "secondary" ? "0.5px solid #A6A5A5" : "none",
      backgroundColor: variant === "primary" ? "#000" : "transparent",
      color: variant === "primary" ? "#fff" : "#2B2B2B",
      fontFamily: "Noto Sans, sans-serif",
      fontSize: 12,
      fontWeight: 500,
      lineHeight: "16px",
      cursor: "pointer",
    }}
  >
    {label}
  </button>
);


// ============================================
// Playground Stories — Interactive Controls
// ============================================

/* ═══ TextCell Playground ═══ */
export const TextCellPlayground: Story = {
  name: "TextCell — Playground",
  argTypes: {
    variant: { control: "select", options: ["texts", "textsIcons", "ghost"] },
    title: { control: "text" },
    subtextTop: { control: "text" },
    subtextBottom: { control: "text" },
    showTitle: { control: "boolean" },
    showSubtextTop: { control: "boolean" },
    showSubtextBottom: { control: "boolean" },
  },
  args: {
    variant: "texts",
    title: "Title here",
    subtextTop: "Subtext top",
    subtextBottom: "Subtext bottom",
    showTitle: true,
    showSubtextTop: true,
    showSubtextBottom: false,
  },
  render: (args: any) => (
    <div className={grid}>
      <TarmacTable.TextCell
        variant={args.variant}
        title={args.title}
        subtextTop={args.subtextTop}
        subtextBottom={args.subtextBottom}
        showTitle={args.showTitle}
        showSubtextTop={args.showSubtextTop}
        showSubtextBottom={args.showSubtextBottom}
        leadingIcon={args.variant === "textsIcons" ? <DotIcon /> : undefined}
        trailingIcon={args.variant === "textsIcons" ? <ArrowIcon /> : undefined}
        leadingSubtextIcon={args.variant === "textsIcons" ? <DotIcon /> : undefined}
        trailingSubtextIcon={args.variant === "textsIcons" ? <DotIcon /> : undefined}
      />
    </div>
  ),
} as Story;

/* ═══ HeaderCell Playground ═══ */
const HeaderCellPlaygroundRender = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={grid}>
      <TarmacTable.HeaderCell
        type={args.type}
        label={args.label}
        showCheckbox={args.showCheckbox}
        showLeadingIcon={args.showLeadingIcon}
        showTrailingIcon={args.showTrailingIcon}
        leadingIcon={<DotIcon />}
        trailingIcon={<SortIcon />}
        checked={checked}
        onCheckChange={setChecked}
        onSort={args.showTrailingIcon ? () => console.log("sort clicked") : undefined}
      />
    </div>
  );
};

export const HeaderCellPlayground: Story = {
  name: "HeaderCell — Playground",
  argTypes: {
    type: { control: "select", options: ["default", "loader"] },
    label: { control: "text" },
    showCheckbox: { control: "boolean" },
    showLeadingIcon: { control: "boolean" },
    showTrailingIcon: { control: "boolean" },
  },
  args: {
    type: "default",
    label: "NAME",
    showCheckbox: false,
    showLeadingIcon: false,
    showTrailingIcon: true,
  },
  render: (args) => <HeaderCellPlaygroundRender {...args} />,
} as Story;
/* ═══ CellBadgePills Playground ═══ */
export const CellBadgePillsPlayground: Story = {
  name: "CellBadgePills — Playground",
  argTypes: {
    variant: { control: "select", options: ["badges", "pills"] },
    type: { control: "select", options: ["1", "2", "3", "ghost"] },
  },
  args: {
    variant: "badges",
    type: "2",
  },
  render: (args: any) => (
    <div className={grid}>
      <TarmacTable.CellBadgePills
        variant={args.variant}
        type={args.type}
        items={[{ label: "Label 1" }, { label: "Label 2" }, { label: "Label 3" }]}
      />
    </div>
  ),
} as Story;

/* ═══ CellAddons Playground ═══ */
const CellAddonsPlaygroundRender = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={grid}>
      <TarmacTable.CellAddons
        type={args.type}
        title={args.title}
        subtext={args.subtext}
        subtextBottom={args.subtextBottom}
        badgeLabel={args.badgeLabel}
        checked={checked}
        onCheckChange={setChecked}
        leadingIcon={<DotIcon />}
        trailingIcon={<ArrowIcon />}
        primaryAction={<ActionButton label="Action" />}
        secondaryAction={<ActionButton label="Cancel" variant="secondary" />}
        origin={args.origin}
        destination={args.destination}
        stops={args.stops}
        distance={args.distance}
      />
    </div>
  );
};

export const CellAddonsPlayground: Story = {
  name: "CellAddons — Playground",
  argTypes: {
    type: {
      control: "select",
      options: [
        "primary-subtext",
        "primary-badge-horizontal",
        "primary-badge-vertical",
        "primary-badge-vertical-top",
        "primary-3-lines",
        "primary-2-line-icon",
        "primary-3-line-icon",
        "checkbox-subtext",
        "checkbox-title",
        "checkbox-title-subtext",
        "checkbox-2-line-icon",
        "checkbox-combination",
        "button-1-cta",
        "button-2-cta",
        "multistop-locations",
        "multistop-location-distance",
        "multistop-location-stops",
        "slot-1",
        "slot-2",
        "ghost",
      ],
    },
    title: { control: "text" },
    subtext: { control: "text" },
    subtextBottom: { control: "text" },
    badgeLabel: { control: "text" },
    origin: { control: "text" },
    destination: { control: "text" },
    stops: { control: "number" },
    distance: { control: "text" },
  },
  args: {
    type: "primary-badge-horizontal",
    title: "Title here",
    subtext: "Subtext here",
    subtextBottom: "",
    badgeLabel: "Badge",
    origin: "Bangalore (BLR)",
    destination: "Gurgaon (GGN)",
    stops: 2,
    distance: "200 km",
  },
  render: (args) => <CellAddonsPlaygroundRender {...args} />,
} as Story;
export const DividerPlayground: Story = {
  name: "Divider — Playground",
  argTypes: {
    type: { control: "select", options: ["line", "dash"] },
  },
  args: {
    type: "line",
  },
  render: (args: any) => (
    <div style={{ maxWidth: 400, padding: 16 }}>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
        Type: {args.type}
      </p>
      <TarmacTable.Divider type={args.type} />
    </div>
  ),
} as Story;
