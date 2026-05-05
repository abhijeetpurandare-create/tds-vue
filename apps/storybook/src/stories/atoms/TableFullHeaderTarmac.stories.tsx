import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TableFullHeader,
  ThemeProvider,
  Button,
  Badge,
  Snackbar,
} from "@delhivery/tarmac";
import type {
  TableFullHeaderProps,
  TableFullHeaderTab,
  TableFullHeaderSearch,
  TableFullHeaderFilter,
  TableFullHeaderAction,
} from "@delhivery/tarmac";

/* ─── ThemeProvider wrappers ─── */
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
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>
      {children}
    </div>
  </ThemeProvider>
);

/* ─── Icons ─── */
const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="4" width="14" height="12" rx="1" stroke="#2b2b2b" strokeWidth="1.5" />
    <path d="M15 10h4l2 3v3h-6v-6z" stroke="#2b2b2b" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="7" cy="17" r="1.5" stroke="#2b2b2b" strokeWidth="1.5" />
    <circle cx="18" cy="17" r="1.5" stroke="#2b2b2b" strokeWidth="1.5" />
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="#2b2b2b" strokeWidth="1.5" />
    <line x1="12" y1="16" x2="12" y2="12" stroke="#2b2b2b" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1" fill="#2b2b2b" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="4" r="1.5" fill="currentColor" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    <circle cx="10" cy="16" r="1.5" fill="currentColor" />
  </svg>
);

/* ─── Meta ─── */
const meta: Meta<any> = {
  title: "Tarmac TDS/Table/Table Full Header",
  component: TableFullHeader,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<any>;

/* ─── Helper: default badges ─── */
const defaultBadges = (
  <>
    <Badge badgeType="subtle" variant="info" size="sm">Badge 1</Badge>
    <Badge badgeType="subtle" variant="info" size="sm">Badge 2</Badge>
    <Badge badgeType="subtle" variant="info" size="sm">Badge 3</Badge>
  </>
);

/* ─── Helper: default section actions ─── */
const defaultSectionActions = (
  <>
    <Button buttonStyle="tertiary" variant="black" size="sm" text="Action 3" />
    <Button buttonStyle="secondary" variant="black" size="sm" text="Action 2" />
    <Button buttonStyle="primary" variant="black" size="sm" text="Action 1" />
    <Button buttonStyle="secondary" variant="black" size="sm" buttonType="iconButton" leadingIcon={<MenuIcon />} />
  </>
);

/* ─── Helper: snackbar ─── */
const defaultSnackbar = (
  <Snackbar
    variant="warning"
    snackbarStyle="filled"
    size="md"
    message="Content shown here is for visual reference"
    leadingIcon={
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1.67 1.67 16.67h16.66L10 1.67zm.83 12.5H9.17v-1.67h1.66v1.67zm0-3.34H9.17V7.5h1.66v3.33z" fill="currentColor"/>
      </svg>
    }
  />
);

/* ═══════════════════════════════════════════
   Story 1 — Playground
   ═══════════════════════════════════════════ */
const PlaygroundRender: React.FC<TableFullHeaderProps> = (args) => {
  const [activeTab, setActiveTab] = useState("tarmac");
  const [searchVal, setSearchVal] = useState("");
  const [expandedFilter, setExpandedFilter] = useState<number | null>(null);

  const tabs: TableFullHeaderTab[] = [
    { key: "tarmac", label: "Tarmac", active: activeTab === "tarmac", onClick: setActiveTab },
    { key: "design", label: "Design", active: activeTab === "design", onClick: setActiveTab },
    { key: "system", label: "System", active: activeTab === "system", onClick: setActiveTab },
  ];

  const search: TableFullHeaderSearch = {
    placeholder: "Search",
    value: searchVal,
    onChange: setSearchVal,
  };

  const filters: TableFullHeaderFilter[] = [
    { label: "View Invoice review", expanded: expandedFilter === 0, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Vendor", expanded: expandedFilter === 1, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Invoice", expanded: expandedFilter === 2, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
  ];

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        {...args}
        tabsTop={tabs}
        search={search}
        filters={filters}
        actions={actions}
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
        snackbar={defaultSnackbar}
      />
    </div>
  );
};

export const Playground: Story = {
  name: "Playground",
  args: {
    title: "Title here",
    subtext: "Subtext goes here",
    showLeadingIcon: true,
    showTrailingIcon: true,
  },
  argTypes: {
    title: { control: "text" },
    subtext: { control: "text" },
    showLeadingIcon: { control: "boolean" },
    showTrailingIcon: { control: "boolean" },
    isGhost: { control: "boolean" },
  },
  render: (args) => (
    <PlaygroundRender
      {...args}
      leadingIcon={<TruckIcon />}
      trailingIcon={<InfoIcon />}
    />
  ),
} as Story;

/* ═══════════════════════════════════════════
   Story 2 — 5 Filters (Figma: Variant=5 Filters)
   ═══════════════════════════════════════════ */
const FiveFiltersRender: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tarmac");
  const [searchVal, setSearchVal] = useState("");
  const [expandedFilter, setExpandedFilter] = useState<number | null>(null);

  const tabs: TableFullHeaderTab[] = [
    { key: "tarmac", label: "Tarmac", active: activeTab === "tarmac", onClick: setActiveTab },
    { key: "design", label: "Design", active: activeTab === "design", onClick: setActiveTab },
    { key: "system", label: "System", active: activeTab === "system", onClick: setActiveTab },
  ];

  const search: TableFullHeaderSearch = { placeholder: "Search", value: searchVal, onChange: setSearchVal };

  const filters: TableFullHeaderFilter[] = [
    { label: "View Invoice review", expanded: expandedFilter === 0, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Vendor", expanded: expandedFilter === 1, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Invoice", expanded: expandedFilter === 2, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "PURs", expanded: expandedFilter === 3, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Period", expanded: expandedFilter === 4, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
  ];

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title="Title here"
        subtext="Subtext goes here"
        showLeadingIcon
        showTrailingIcon
        leadingIcon={<TruckIcon />}
        trailingIcon={<InfoIcon />}
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
        tabsTop={tabs}
        snackbar={defaultSnackbar}
        search={search}
        filters={filters}
        actions={actions}
      />
    </div>
  );
};

export const FiveFilters: Story = {
  name: "5 Filters",
  render: () => <FiveFiltersRender />,
};

/* ═══════════════════════════════════════════
   Story 3 — 4 Filters
   ═══════════════════════════════════════════ */
const FourFiltersRender: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");
  const [expandedFilter, setExpandedFilter] = useState<number | null>(null);

  const filters: TableFullHeaderFilter[] = [
    { label: "View Invoice review", expanded: expandedFilter === 0, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Vendor", expanded: expandedFilter === 1, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Invoice", expanded: expandedFilter === 2, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "PURs", expanded: expandedFilter === 3, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
  ];

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title="Title here"
        subtext="Subtext goes here"
        showLeadingIcon
        showTrailingIcon
        leadingIcon={<TruckIcon />}
        trailingIcon={<InfoIcon />}
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
        snackbar={defaultSnackbar}
        search={{ placeholder: "Search", value: searchVal, onChange: setSearchVal }}
        filters={filters}
        actions={actions}
      />
    </div>
  );
};

export const FourFilters: Story = {
  name: "4 Filters",
  render: () => <FourFiltersRender />,
};

/* ═══════════════════════════════════════════
   Story 4 — 3 Filters
   ═══════════════════════════════════════════ */
const ThreeFiltersRender: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");
  const [expandedFilter, setExpandedFilter] = useState<number | null>(null);

  const filters: TableFullHeaderFilter[] = [
    { label: "View Invoice review", expanded: expandedFilter === 0, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Vendor", expanded: expandedFilter === 1, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Invoice", expanded: expandedFilter === 2, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
  ];

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title="Title here"
        subtext="Subtext goes here"
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
        search={{ placeholder: "Search", value: searchVal, onChange: setSearchVal }}
        filters={filters}
        actions={actions}
      />
    </div>
  );
};

export const ThreeFilters: Story = {
  name: "3 Filters",
  render: () => <ThreeFiltersRender />,
};

/* ═══════════════════════════════════════════
   Story 5 — 2 Filters
   ═══════════════════════════════════════════ */
const TwoFiltersRender: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");
  const [expandedFilter, setExpandedFilter] = useState<number | null>(null);

  const filters: TableFullHeaderFilter[] = [
    { label: "View Invoice review", expanded: expandedFilter === 0, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
    { label: "Vendor", expanded: expandedFilter === 1, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
  ];

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title="Title here"
        subtext="Subtext goes here"
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
        search={{ placeholder: "Search", value: searchVal, onChange: setSearchVal }}
        filters={filters}
        actions={actions}
      />
    </div>
  );
};

export const TwoFilters: Story = {
  name: "2 Filters",
  render: () => <TwoFiltersRender />,
};

/* ═══════════════════════════════════════════
   Story 6 — 1 Filter
   ═══════════════════════════════════════════ */
const OneFilterRender: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");
  const [expandedFilter, setExpandedFilter] = useState<number | null>(null);

  const filters: TableFullHeaderFilter[] = [
    { label: "View Invoice review", expanded: expandedFilter === 0, onToggle: (i) => setExpandedFilter(expandedFilter === i ? null : i) },
  ];

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title="Title here"
        subtext="Subtext goes here"
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
        search={{ placeholder: "Search", value: searchVal, onChange: setSearchVal }}
        filters={filters}
        actions={actions}
      />
    </div>
  );
};

export const OneFilter: Story = {
  name: "1 Filter",
  render: () => <OneFilterRender />,
};

/* ═══════════════════════════════════════════
   Story 7 — Ghost State
   ═══════════════════════════════════════════ */
export const Ghost: Story = {
  name: "Ghost",
  render: () => (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader isGhost />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   Story 8 — Tabs Bottom Position
   ═══════════════════════════════════════════ */
const TabsBottomRender: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tarmac");
  const [searchVal, setSearchVal] = useState("");

  const tabs: TableFullHeaderTab[] = [
    { key: "tarmac", label: "Tarmac", active: activeTab === "tarmac", onClick: setActiveTab },
    { key: "design", label: "Design", active: activeTab === "design", onClick: setActiveTab },
    { key: "system", label: "System", active: activeTab === "system", onClick: setActiveTab },
  ];

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title="Title here"
        subtext="Subtext goes here"
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
        tabsBottom={tabs}
        search={{ placeholder: "Search", value: searchVal, onChange: setSearchVal }}
        filters={[
          { label: "Vendor", expanded: false, onToggle: () => {} },
          { label: "Invoice", expanded: false, onToggle: () => {} },
        ]}
        actions={actions}
      />
    </div>
  );
};

export const TabsBottom: Story = {
  name: "Tabs Bottom",
  render: () => <TabsBottomRender />,
};

/* ═══════════════════════════════════════════
   Story 9 — Section Header Only (no action bar)
   ═══════════════════════════════════════════ */
export const SectionHeaderOnly: Story = {
  name: "Section Header Only",
  render: () => (
    <div style={{ maxWidth: 960, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title="Title here"
        subtext="Subtext goes here"
        showLeadingIcon
        showTrailingIcon
        leadingIcon={<TruckIcon />}
        trailingIcon={<InfoIcon />}
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
      />
    </div>
  ),
};

/* ═══════════════════════════════════════════
   Story 10 — Action Bar Only (no section header)
   ═══════════════════════════════════════════ */
const ActionBarOnlyRender: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title=""
        search={{ placeholder: "Search", value: searchVal, onChange: setSearchVal }}
        filters={[
          { label: "Vendor", expanded: false, onToggle: () => {} },
          { label: "Invoice", expanded: false, onToggle: () => {} },
        ]}
        actions={actions}
      />
    </div>
  );
};

export const ActionBarOnly: Story = {
  name: "Action Bar Only",
  render: () => <ActionBarOnlyRender />,
};

/* ═══════════════════════════════════════════
   Story 11 — With Snackbar
   ═══════════════════════════════════════════ */
const WithSnackbarRender: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
      <TableFullHeader
        title="Title here"
        subtext="Subtext goes here"
        badges={defaultBadges}
        sectionActions={defaultSectionActions}
        snackbar={defaultSnackbar}
        search={{ placeholder: "Search", value: searchVal, onChange: setSearchVal }}
        filters={[
          { label: "Vendor", expanded: false, onToggle: () => {} },
        ]}
        actions={[
          { label: "Action 1", variant: "primary", onClick: () => {} },
        ]}
      />
    </div>
  );
};

export const WithSnackbar: Story = {
  name: "With Snackbar",
  render: () => <WithSnackbarRender />,
};

/* ═══════════════════════════════════════════
   Story 12 — Full Matrix (all filter counts)
   ═══════════════════════════════════════════ */
const FullMatrixRender: React.FC = () => {
  const makeFilters = (count: number): TableFullHeaderFilter[] =>
    Array.from({ length: count }, (_, i) => ({
      label: `Filter ${i + 1}`,
      expanded: false,
      onToggle: () => {},
    }));

  const actions: TableFullHeaderAction[] = [
    { label: "Action 2", variant: "secondary", onClick: () => {} },
    { label: "Action 1", variant: "primary", onClick: () => {} },
    { variant: "icon", onClick: () => {}, icon: <MenuIcon /> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 24 }}>
      {[1, 2, 3, 4, 5].map((count) => (
        <div key={count}>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>{count} Filter{count > 1 ? "s" : ""}</h3>
          <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableFullHeader
              title="Title here"
              subtext="Subtext goes here"
              badges={defaultBadges}
              sectionActions={defaultSectionActions}
              search={{ placeholder: "Search", value: "", onChange: () => {} }}
              filters={makeFilters(count)}
              actions={actions}
            />
          </div>
        </div>
      ))}

      <div>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Ghost</h3>
        <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
          <TableFullHeader isGhost />
        </div>
      </div>
    </div>
  );
};

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => <FullMatrixRender />,
};

/* ═══════════════════════════════════════════
   Story 13 — Light vs Dark Mode
   ═══════════════════════════════════════════ */
const LightDarkContent: React.FC = () => (
  <TableFullHeader
    title="Shipments"
    subtext="All active shipments"
    badges={defaultBadges}
    sectionActions={
      <>
        <Button buttonStyle="secondary" variant="black" size="sm" text="Export" />
        <Button buttonStyle="primary" variant="black" size="sm" text="Create" />
      </>
    }
    search={{ placeholder: "Search", value: "", onChange: () => {} }}
    filters={[
      { label: "Status", expanded: false, onToggle: () => {} },
      { label: "Date", expanded: false, onToggle: () => {} },
    ]}
    actions={[
      { label: "Refresh", variant: "secondary", onClick: () => {} },
    ]}
  />
);

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Light</h3>
        <Wrap>
          <div style={{ border: "1px solid #e6e6e6", borderRadius: 8, overflow: "hidden" }}>
            <LightDarkContent />
          </div>
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Dark</h3>
        <DarkWrap>
          <div style={{ border: "1px solid #333", borderRadius: 8, overflow: "hidden" }}>
            <LightDarkContent />
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
