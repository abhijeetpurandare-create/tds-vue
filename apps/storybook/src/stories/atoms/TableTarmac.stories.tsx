import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, ThemeProvider, useTheme, TableSectionHeader, TableSectionFooter, TableFullHeader, TableRow, TableTextCell, TableHeaderCell, TableDivider, TableStatusIndicator, StatusIndicator, TableCellBadgePills, TableCellAddons, Pagination, Button, Badge, Snackbar } from "@delhivery/tarmac";
import type { ColumnType, TabConfig, SearchConfig, FilterConfig, ActionConfig, TableFullHeaderTab, TableFullHeaderFilter, TableFullHeaderAction, SortOrder } from "@delhivery/tarmac";

/* ─── ThemeProvider wrappers ─── */
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

/* ─── Shared inline styles (Figma token-aligned) ─── */
const titleStyle: React.CSSProperties = { fontSize: 14, lineHeight: "20px", fontWeight: 500, color: "#2b2b2b" };
const subtextStyle: React.CSSProperties = { fontSize: 10, lineHeight: "12px", fontWeight: 500, color: "#454545" };
const badgeStyle: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 2, padding: "4px 4px",
  fontSize: 10, lineHeight: "12px", color: "#2396fb",
  backgroundColor: "#e6f3fe", border: "0.5px solid #48a7fc", borderRadius: 4,
};
const pillStyle: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", padding: "4px 8px",
  fontSize: 10, lineHeight: "12px", color: "#127049",
  backgroundColor: "#f4fbf8", borderRadius: 999,
};
const statusDot = (color: string): React.CSSProperties => ({
  width: 8, height: 8, borderRadius: "50%", backgroundColor: color, display: "inline-block",
});

/* ─── Data types ─── */
interface TextRowData { key: string; name: string; subtext: string; location: string; locationSub: string; status: string; date: string; }
interface CheckboxRowData { key: string; label: string; subtext: string; col2: string; col3: string; }
interface StatusRowData { key: string; item: string; status: string; statusColor: string; detail: string; updated: string; }
interface BadgePillData { key: string; item: string; badges: string[]; pills: string[]; amount: string; }
interface AddOnData { key: string; title: string; subtext: string; badge: string; type: string; detail: string; }
interface ButtonRowData { key: string; orderId: string; customer: string; status: string; amount: string; }

/* ─── Sample data: Table Text Rows (Figma: Table Text Cells — Texts + Icons) ─── */
const textRowData: TextRowData[] = [
  { key: "1", name: "John Brown", subtext: "ID: 9023018", location: "New York, NY", locationSub: "10001", status: "Active", date: "8 Jan 2025" },
  { key: "2", name: "Jim Green", subtext: "ID: 9023019", location: "London, UK", locationSub: "EC1A", status: "In Transit", date: "9 Jan 2025" },
  { key: "3", name: "Joe Black", subtext: "ID: 9023020", location: "Sydney, AU", locationSub: "2000", status: "Delivered", date: "10 Jan 2025" },
  { key: "4", name: "Jim Red", subtext: "ID: 9023021", location: "Mumbai, IN", locationSub: "400001", status: "Pending", date: "11 Jan 2025" },
  { key: "5", name: "Jake White", subtext: "ID: 9023022", location: "Dublin, IE", locationSub: "D01", status: "Active", date: "12 Jan 2025" },
];

const textRowColumns: ColumnType<TextRowData>[] = [
  {
    title: "Name", dataIndex: "name", key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record) => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={titleStyle}>{record.name}</span>
        <span style={subtextStyle}>{record.subtext}</span>
      </div>
    ),
  },
  {
    title: "Location", dataIndex: "location", key: "location",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 16 }}>📍</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={titleStyle}>{record.location}</span>
          <span style={subtextStyle}>{record.locationSub}</span>
        </div>
      </div>
    ),
  },
  { title: "Status", dataIndex: "status", key: "status", sorter: true },
  { title: "Date", dataIndex: "date", key: "date" },
];

/* ─── Sample data: Table Checkbox Rows ─── */
const checkboxData: CheckboxRowData[] = [
  { key: "1", label: "Blue T-shirt", subtext: "SKU: BT-001", col2: "Prepaid", col3: "₹2,200" },
  { key: "2", label: "Red Hoodie", subtext: "SKU: RH-002", col2: "COD", col3: "₹3,500" },
  { key: "3", label: "Black Jeans", subtext: "SKU: BJ-003", col2: "Prepaid", col3: "₹1,800" },
  { key: "4", label: "White Sneakers", subtext: "SKU: WS-004", col2: "COD", col3: "₹4,200" },
];

const checkboxColumns: ColumnType<CheckboxRowData>[] = [
  {
    title: "Product", dataIndex: "label", key: "label",
    render: (_, record) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <span style={titleStyle}>{record.label}</span>
        <span style={subtextStyle}>{record.subtext}</span>
      </div>
    ),
  },
  { title: "Payment", dataIndex: "col2", key: "col2" },
  { title: "Amount", dataIndex: "col3", key: "col3" },
];

/* ─── Sample data: Table Status Indicator Rows ─── */
const statusData: StatusRowData[] = [
  { key: "1", item: "Order #9023018", status: "Delivered", statusColor: "#1ba86e", detail: "New York", updated: "8 Jan | 12:40 PM" },
  { key: "2", item: "Order #9023019", status: "In Transit", statusColor: "#2396fb", detail: "London", updated: "9 Jan | 10:15 AM" },
  { key: "3", item: "Order #9023020", status: "Pending", statusColor: "#f5c828", detail: "Sydney", updated: "10 Jan | 3:25 PM" },
  { key: "4", item: "Order #9023021", status: "Failed", statusColor: "#f04158", detail: "Mumbai", updated: "11 Jan | 5:00 PM" },
  { key: "5", item: "Order #9023022", status: "Scheduled", statusColor: "#808080", detail: "Dublin", updated: "12 Jan | 9:00 AM" },
];

const statusColumns: ColumnType<StatusRowData>[] = [
  { title: "Order", dataIndex: "item", key: "item", sorter: true },
  {
    title: "Status", dataIndex: "status", key: "status",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={statusDot(record.statusColor)} />
        <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 500 }}>{record.status}</span>
      </div>
    ),
  },
  { title: "Location", dataIndex: "detail", key: "detail" },
  { title: "Last Updated", dataIndex: "updated", key: "updated" },
];

/* ─── Sample data: Table Badge & Pill Rows ─── */
const badgePillData: BadgePillData[] = [
  { key: "1", item: "Shipment A", badges: ["Express", "Priority"], pills: ["Delivered"], amount: "₹2,200" },
  { key: "2", item: "Shipment B", badges: ["Standard"], pills: ["In Transit", "Tracked"], amount: "₹3,500" },
  { key: "3", item: "Shipment C", badges: ["Express", "Fragile", "Insured"], pills: ["Pending"], amount: "₹1,800" },
  { key: "4", item: "Shipment D", badges: ["Standard"], pills: ["Delivered", "Verified"], amount: "₹4,200" },
];

const badgePillColumns: ColumnType<BadgePillData>[] = [
  { title: "Shipment", dataIndex: "item", key: "item", sorter: true },
  {
    title: "Tags", key: "badges",
    render: (_, record) => (
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {record.badges.map((b) => <span key={b} style={badgeStyle}>{b}</span>)}
      </div>
    ),
  },
  {
    title: "Status", key: "pills",
    render: (_, record) => (
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {record.pills.map((p) => <span key={p} style={pillStyle}>{p}</span>)}
      </div>
    ),
  },
  { title: "Amount", dataIndex: "amount", key: "amount" },
];

/* ─── Sample data: Table Cells Add-ons (Checkbox, Radio, Badge combos) ─── */
const addOnData: AddOnData[] = [
  { key: "1", title: "Blue T-shirt", subtext: "Cotton, Size M", badge: "Express", type: "Prepaid", detail: "₹2,200" },
  { key: "2", title: "Red Hoodie", subtext: "Fleece, Size L", badge: "Standard", type: "COD", detail: "₹3,500" },
  { key: "3", title: "Black Jeans", subtext: "Denim, Size 32", badge: "Priority", type: "Prepaid", detail: "₹1,800" },
  { key: "4", title: "White Sneakers", subtext: "Leather, Size 10", badge: "Express", type: "COD", detail: "₹4,200" },
];

const addOnColumns: ColumnType<AddOnData>[] = [
  {
    title: "Product", key: "product",
    render: (_, record) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={titleStyle}>{record.title}</span>
          <span style={badgeStyle}>{record.badge}</span>
        </div>
        <span style={subtextStyle}>{record.subtext}</span>
      </div>
    ),
  },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Amount", dataIndex: "detail", key: "detail" },
];

/* ─── Sample data: Table Button Rows ─── */
const buttonRowData: ButtonRowData[] = [
  { key: "1", orderId: "9023018", customer: "John Brown", status: "Pending", amount: "₹2,200" },
  { key: "2", orderId: "9023019", customer: "Jim Green", status: "Processing", amount: "₹3,500" },
  { key: "3", orderId: "9023020", customer: "Joe Black", status: "Pending", amount: "₹1,800" },
  { key: "4", orderId: "9023021", customer: "Jim Red", status: "Ready", amount: "₹4,200" },
];

const buttonRowColumns: ColumnType<ButtonRowData>[] = [
  { title: "Order ID", dataIndex: "orderId", key: "orderId", sorter: true },
  { title: "Customer", dataIndex: "customer", key: "customer" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  {
    title: "Actions", key: "actions",
    render: () => (
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{
          backgroundColor: "#1a1a1a", color: "#e6e6e6", border: "none", borderRadius: 4,
          padding: "6px 12px", fontSize: 12, lineHeight: "16px", fontWeight: 500, cursor: "pointer",
        }}>
          Reattempt
        </button>
        <button style={{
          backgroundColor: "transparent", color: "#2b2b2b", border: "1px solid #e6e6e6", borderRadius: 4,
          padding: "6px 12px", fontSize: 12, lineHeight: "16px", fontWeight: 500, cursor: "pointer",
        }}>
          Return
        </button>
      </div>
    ),
  },
];

/* ─── Meta ─── */
const meta: Meta<any> = {
  title: "Tarmac TDS/Table",
  component: Table as any,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [(Story: any) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "card"],
      description: "Display variant",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size variant",
    },
    bordered: { control: { type: "boolean" }, description: "Show borders" },
    striped: { control: { type: "boolean" }, description: "Striped rows" },
    hoverable: { control: { type: "boolean" }, description: "Hover effect on rows" },
    loading: { control: { type: "boolean" }, description: "Loading state" },
  },
};
export default meta;
type Story = StoryObj<any>;

/* ═══ Playground ═══ */
export const Playground: Story = {
  name: "Playground",
  args: {
    columns: textRowColumns as ColumnType<unknown>[],
    dataSource: textRowData,
    variant: "default",
    size: "medium",
    bordered: true,
    striped: false,
    hoverable: true,
    pagination: { pageSize: 5, total: textRowData.length },
  },
  argTypes: {
    variant: { control: { type: "select" }, options: ["default", "card"] },
    size: { control: { type: "select" }, options: ["small", "medium", "large"] },
    bordered: { control: { type: "boolean" } },
    striped: { control: { type: "boolean" } },
    hoverable: { control: { type: "boolean" } },
    rowSelection: { control: { type: "object" } },
    pagination: { control: { type: "object" } },
  },
} as Story

/* ═══ Table Text Rows (Figma: Table Text Cells — Texts + Icons) ═══ */

/* ─── Shared header config helpers ─── */
const makeTabsConfig = (activeKey: string, onClick: (key: string) => void): TabConfig[] => [
  { key: "all", label: "All Orders", active: activeKey === "all", onClick },
  { key: "pending", label: "Pending", active: activeKey === "pending", onClick },
  { key: "transit", label: "In Transit", active: activeKey === "transit", onClick },
];

const makeSearchConfig = (value: string, onChange: (v: string) => void): SearchConfig => ({
  placeholder: "Search orders...",
  value,
  onChange,
});

const makeFiltersConfig = (count: number, expandedSet: Set<number>, onToggle: (i: number) => void): FilterConfig[] =>
  Array.from({ length: count }, (_, i) => ({
    label: `Filter ${i + 1}`,
    expanded: expandedSet.has(i),
    onToggle,
  }));

const makeActionsConfig = (onAction: () => void): ActionConfig[] => [
  { label: "+ New Order", variant: "primary" as const, onClick: onAction },
  { label: "Export", variant: "secondary" as const, onClick: onAction },
  {
    variant: "icon" as const,
    onClick: onAction,
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* ═══ 8.1 — Table Header Interactive ═══ */
const TableHeaderInteractiveRender = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [expandedFilters, setExpandedFilters] = useState<Set<number>>(new Set());

  const handleToggleFilter = (index: number) => {
    setExpandedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <Table
      columns={textRowColumns as ColumnType<unknown>[]}
      dataSource={textRowData}
      variant="default"
      size="medium"
      bordered
      hoverable
      pagination={false}
      headerTabs={makeTabsConfig(activeTab, setActiveTab)}
      headerSearch={makeSearchConfig(searchValue, setSearchValue)}
      headerFilters={makeFiltersConfig(3, expandedFilters, handleToggleFilter)}
      headerActions={makeActionsConfig(() => alert("Action clicked!"))}
    />
  );
};

export const TableHeaderInteractive: Story = {
  name: "Table Header Interactive",
  render: () => <TableHeaderInteractiveRender />,
};

/* ═══ 8.2 — Filter count variant stories (1–5 filters) ═══ */
const FilterCountStory: React.FC<{ count: number }> = ({ count }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [expandedFilters, setExpandedFilters] = useState<Set<number>>(new Set());

  const handleToggleFilter = (index: number) => {
    setExpandedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <Table
      columns={textRowColumns as ColumnType<unknown>[]}
      dataSource={textRowData.slice(0, 3)}
      variant="default"
      size="medium"
      bordered
      hoverable
      pagination={false}
      headerTabs={makeTabsConfig(activeTab, setActiveTab)}
      headerSearch={makeSearchConfig(searchValue, setSearchValue)}
      headerFilters={makeFiltersConfig(count, expandedFilters, handleToggleFilter)}
      headerActions={makeActionsConfig(() => alert("Action clicked"))}
    />
  );
};

export const Filters1: Story = { name: "Filters1", render: () => <FilterCountStory count={1} /> };
export const Filters2: Story = { name: "Filters2", render: () => <FilterCountStory count={2} /> };
export const Filters3: Story = { name: "Filters3", render: () => <FilterCountStory count={3} /> };
export const Filters4: Story = { name: "Filters4", render: () => <FilterCountStory count={4} /> };
export const Filters5: Story = { name: "Filters5", render: () => <FilterCountStory count={5} /> };

/* ═══ 8.3 — Tabs Bottom Position ═══ */
const TabsBottomPositionRender = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [expandedFilters, setExpandedFilters] = useState<Set<number>>(new Set());

  const handleToggleFilter = (index: number) => {
    setExpandedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <Table
      columns={textRowColumns as ColumnType<unknown>[]}
      dataSource={textRowData.slice(0, 3)}
      variant="default"
      size="medium"
      bordered
      hoverable
      pagination={false}
      headerTabs={makeTabsConfig(activeTab, setActiveTab)}
      headerTabsPosition="bottom"
      headerSearch={makeSearchConfig(searchValue, setSearchValue)}
      headerFilters={makeFiltersConfig(3, expandedFilters, handleToggleFilter)}
      headerActions={makeActionsConfig(() => alert("Action clicked"))}
    />
  );
};

export const TabsBottomPosition: Story = {
  name: "TabsBottomPosition",
  render: () => <TabsBottomPositionRender />,
};

/* ═══ 8.4 — Table Header Variants (updated to use new header props) ═══ */
const TableHeaderVariantsRender = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [expandedFilters, setExpandedFilters] = useState<Set<number>>(new Set());

  const handleToggleFilter = (index: number) => {
    setExpandedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const tabs: TabConfig[] = [
    { key: "all", label: "All Orders", active: activeTab === "all", onClick: setActiveTab },
    { key: "pending", label: "Pending", active: activeTab === "pending", onClick: setActiveTab },
    { key: "transit", label: "In Transit", active: activeTab === "transit", onClick: setActiveTab },
    { key: "delivered", label: "Delivered", active: activeTab === "delivered", onClick: setActiveTab },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {[1, 2, 3, 4, 5].map((count) => (
        <div key={count}>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>{count} Filter{count > 1 ? "s" : ""}</h3>
          <Table
            columns={textRowColumns as ColumnType<unknown>[]}
            dataSource={textRowData.slice(0, 3)}
            variant="default"
            size="medium"
            bordered
            hoverable
            pagination={false}
            headerTabs={tabs}
            headerSearch={makeSearchConfig(searchValue, setSearchValue)}
            headerFilters={makeFiltersConfig(count, expandedFilters, handleToggleFilter)}
            headerActions={makeActionsConfig(() => alert("Action clicked"))}
          />
        </div>
      ))}
    </div>
  );
};

export const TableHeaderVariants: Story = {
  name: "Table Header (Filters + Tabs + Search + CTAs)",
  render: () => <TableHeaderVariantsRender />,
};

export const TextRows: Story = {
  name: "Text Rows (Title + Subtext + Icons)",
  args: {
    columns: textRowColumns as ColumnType<unknown>[],
    dataSource: textRowData,
    variant: "default",
    size: "medium",
    bordered: true,
    hoverable: true,
    pagination: false,
  },
};

/* ═══ Table Header Cell — Default + Loader states (Figma: Table Header Cell) ═══ */
export const HeaderCellStates: Story = {
  args: {
    size: "large",
    bordered: true
  },

  name: "Header Cell States (Default + Loader)",

  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Default Header Cells (with sort)</h3>
        <Table
          columns={statusColumns as ColumnType<unknown>[]}
          dataSource={statusData.slice(0, 3)}
          variant="default"
          size="medium"
          bordered
          pagination={false}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Loader / Skeleton State</h3>
        <Table
          columns={textRowColumns as ColumnType<unknown>[]}
          dataSource={textRowData}
          variant="default"
          size="medium"
          bordered
          loading
          pagination={false}
        />
      </div>
    </div>
  )
};

/* ═══ Table Checkbox Rows (Figma: Table Checkbox Rows) ═══ */
export const CheckboxRows: Story = {
  name: "Checkbox Rows",
  args: {
    columns: checkboxColumns as ColumnType<unknown>[],
    dataSource: checkboxData,
    variant: "default",
    size: "medium",
    bordered: true,
    rowSelection: { type: "checkbox" },
    pagination: false,
  },
};

/* ═══ Table Status Indicator Rows (Figma: Table Status Indicator Rows) ═══ */
export const StatusIndicatorRows: Story = {
  name: "Status Indicator Rows",
  args: {
    columns: statusColumns as ColumnType<unknown>[],
    dataSource: statusData,
    variant: "default",
    size: "medium",
    bordered: true,
    hoverable: true,
    pagination: false,
  },
};

/* ═══ Table Badge & Pill Rows (Figma: Table Cell Badge/Pills) ═══ */
export const BadgeAndPillRows: Story = {
  name: "Badge & Pill Rows",
  args: {
    columns: badgePillColumns as ColumnType<unknown>[],
    dataSource: badgePillData,
    variant: "default",
    size: "medium",
    bordered: true,
    hoverable: true,
    pagination: false,
  },
};

/* ═══ Table Cells Add-ons (Figma: Table Cells Add-ons — Primary, Badge combos) ═══ */
export const CellAddOns: Story = {
  name: "Cell Add-ons (Title + Badge + Subtext)",
  args: {
    columns: addOnColumns as ColumnType<unknown>[],
    dataSource: addOnData,
    variant: "default",
    size: "medium",
    bordered: true,
    rowSelection: { type: "radio" },
    hoverable: true,
    pagination: false,
  },
};

/* ═══ Table Button Rows (Figma: Table Button Rows) ═══ */
export const ButtonRows: Story = {
  name: "Button Rows",
  args: {
    columns: buttonRowColumns as ColumnType<unknown>[],
    dataSource: buttonRowData,
    variant: "default",
    size: "medium",
    bordered: true,
    hoverable: true,
    pagination: false,
  },
};

/* ═══ Card Variant ═══ */
export const CardVariant: Story = {
  name: "Card Variant",
  args: {
    columns: textRowColumns as ColumnType<unknown>[],
    dataSource: textRowData,
    variant: "card",
    size: "medium",
    hoverable: true,
    pagination: false,
  },
};

/* ═══ Size Comparison ═══ */
export const SizeComparison: Story = {
  name: "Size Comparison",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {(["small", "medium", "large"] as const).map((size) => (
        <div key={size}>
          <h3 style={{ marginBottom: 8, textTransform: "capitalize", fontSize: 14, fontWeight: 600 }}>{size}</h3>
          <Table
            columns={textRowColumns as ColumnType<unknown>[]}
            dataSource={textRowData.slice(0, 3)}
            variant="default"
            size={size}
            bordered
            pagination={false}
          />
        </div>
      ))}
    </div>
  ),
};

/* ═══ Row Selection — Checkbox + Radio side by side ═══ */
export const RowSelection: Story = {
  name: "Row Selection (Checkbox + Radio)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Checkbox Selection</h3>
        <Table
          columns={checkboxColumns as ColumnType<unknown>[]}
          dataSource={checkboxData}
          variant="default"
          size="medium"
          bordered
          rowSelection={{ type: "checkbox" }}
          pagination={false}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Radio Selection</h3>
        <Table
          columns={checkboxColumns as ColumnType<unknown>[]}
          dataSource={checkboxData}
          variant="default"
          size="medium"
          bordered
          rowSelection={{ type: "radio" }}
          pagination={false}
        />
      </div>
    </div>
  ),
};

/* ═══ Sorting ═══ */
export const Sorting: Story = {
  name: "Sorting",
  args: {
    columns: statusColumns as ColumnType<unknown>[],
    dataSource: statusData,
    variant: "default",
    size: "medium",
    bordered: true,
    pagination: false,
  },
};

/* ═══ Sorting — Interactive (controlled sort with onChange) ═══ */
const SortingInteractiveRender = () => {
  const [sortedInfo, setSortedInfo] = useState<{ columnKey?: React.Key; order?: SortOrder | null }>({});

  const sortableColumns: ColumnType<TextRowData>[] = [
    {
      title: "Name", dataIndex: "name", key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={titleStyle}>{record.name}</span>
          <span style={subtextStyle}>{record.subtext}</span>
        </div>
      ),
    },
    {
      title: "Location", dataIndex: "location", key: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortOrder: sortedInfo.columnKey === "location" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 16 }}>📍</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={titleStyle}>{record.location}</span>
            <span style={subtextStyle}>{record.locationSub}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Status", dataIndex: "status", key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order ?? null : null,
    },
    {
      title: "Date", dataIndex: "date", key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order ?? null : null,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setSortedInfo({})}
          style={{ padding: "6px 12px", fontSize: 12, border: "1px solid #e6e6e6", borderRadius: 4, background: "white", cursor: "pointer" }}
        >
          Clear Sorters
        </button>
        <button
          onClick={() => setSortedInfo({ columnKey: "name", order: "ascend" as SortOrder })}
          style={{ padding: "6px 12px", fontSize: 12, border: "1px solid #e6e6e6", borderRadius: 4, background: "white", cursor: "pointer" }}
        >
          Sort Name Ascending
        </button>
        <button
          onClick={() => setSortedInfo({ columnKey: "date", order: "descend" as SortOrder })}
          style={{ padding: "6px 12px", fontSize: 12, border: "1px solid #e6e6e6", borderRadius: 4, background: "white", cursor: "pointer" }}
        >
          Sort Date Descending
        </button>
      </div>
      <Table
        columns={sortableColumns as ColumnType<unknown>[]}
        dataSource={textRowData}
        variant="default"
        size="medium"
        bordered
        hoverable
        pagination={false}
        onChange={(_pagination, _filters, sorter) => {
          const s = Array.isArray(sorter) ? sorter[0] : sorter;
          setSortedInfo({ columnKey: s.columnKey, order: s.order });
        }}
      />
    </div>
  );
};

export const SortingInteractive: Story = {
  name: "Sorting — Interactive (Controlled)",
  render: () => <SortingInteractiveRender />,
};

/* ═══ Sorting — All Columns ═══ */
export const SortingAllColumns: Story = {
  name: "Sorting — All Columns Sortable",
  args: {
    columns: [
      {
        title: "Name", dataIndex: "name", key: "name",
        sorter: (a: TextRowData, b: TextRowData) => a.name.localeCompare(b.name),
        render: (_: unknown, record: TextRowData) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={titleStyle}>{record.name}</span>
            <span style={subtextStyle}>{record.subtext}</span>
          </div>
        ),
      },
      {
        title: "Location", dataIndex: "location", key: "location",
        sorter: (a: TextRowData, b: TextRowData) => a.location.localeCompare(b.location),
      },
      {
        title: "Status", dataIndex: "status", key: "status",
        sorter: (a: TextRowData, b: TextRowData) => a.status.localeCompare(b.status),
      },
      {
        title: "Date", dataIndex: "date", key: "date",
        sorter: (a: TextRowData, b: TextRowData) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        defaultSortOrder: "ascend" as SortOrder,
      },
    ] as ColumnType<unknown>[],
    dataSource: textRowData,
    variant: "default",
    size: "medium",
    bordered: true,
    hoverable: true,
    pagination: false,
  },
};

/* ═══ Loading & Empty ═══ */
export const LoadingAndEmpty: Story = {
  name: "Loading & Empty States",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Loading</h3>
        <Table
          columns={textRowColumns as ColumnType<unknown>[]}
          dataSource={textRowData}
          variant="default"
          size="medium"
          bordered
          loading
          pagination={false}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Empty</h3>
        <Table
          columns={textRowColumns as ColumnType<unknown>[]}
          dataSource={[]}
          variant="default"
          size="medium"
          bordered
          pagination={false}
        />
      </div>
    </div>
  ),
};

/* ═══ Row Footers ═══ */
const rowFooterColumns: ColumnType<ButtonRowData>[] = [
  { title: "Order ID", dataIndex: "orderId", key: "orderId" },
  { title: "Customer", dataIndex: "customer", key: "customer" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  {
    key: "footer", dataIndex: "status", rowFooter: true,
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <span style={{ fontSize: 12, color: "#454545" }}>Additional info for order {record.orderId}</span>
        <button style={{
          backgroundColor: "#1a1a1a", color: "#e6e6e6", border: "none", borderRadius: 4,
          padding: "6px 12px", fontSize: 12, cursor: "pointer",
        }}>
          View Details
        </button>
      </div>
    ),
  },
];

export const RowFooters: Story = {
  name: "Row Footers",
  args: {
    columns: rowFooterColumns as ColumnType<unknown>[],
    dataSource: buttonRowData,
    variant: "default",
    size: "medium",
    bordered: true,
    pagination: false,
  },
};

/* ═══ Light vs Dark Mode ═══ */
export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24 }}>
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Light Mode</h3>
        <Wrap>
          <Table
            columns={statusColumns as ColumnType<unknown>[]}
            dataSource={statusData}
            variant="default"
            size="medium"
            bordered
            hoverable
            pagination={false}
          />
        </Wrap>
      </div>
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Dark Mode</h3>
        <DarkWrap>
          <Table
            columns={statusColumns as ColumnType<unknown>[]}
            dataSource={statusData}
            variant="default"
            size="medium"
            bordered
            hoverable
            pagination={false}
          />
        </DarkWrap>
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   TABLE SECTION HEADER & FOOTER STORIES (Figma: Table Header & Footer)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Icons for header demos ─── */
const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#2b2b2b"/>
  </svg>
);
const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#2b2b2b"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 15h15v-1.67H2.5V15zm0-4.17h15V9.17H2.5v1.66zM2.5 5v1.67h15V5H2.5z" fill="#2b2b2b"/>
  </svg>
);

/* ─── Reusable badge group ─── */
const BadgeGroup = () => (
  <>
    <Badge badgeType="subtle" variant="info" size="sm" text="Badge 1" />
    <Badge badgeType="subtle" variant="info" size="sm" text="Badge 2" />
    <Badge badgeType="subtle" variant="info" size="sm" text="Badge 3" />
  </>
);

/* ─── Reusable CTA groups ─── */
const HeaderActions = () => (
  <>
    <Button buttonStyle="tertiary" variant="black" size="md" text="Action 3" />
    <Button buttonStyle="secondary" variant="black" size="md" text="Action 2" />
    <Button buttonStyle="primary" variant="black" size="md" text="Action 1" />
    <Button buttonStyle="secondary" variant="black" size="md" buttonType="iconButton" leadingIcon={<MenuIcon />} />
  </>
);

const FooterActions2 = () => (
  <>
    <Button buttonStyle="secondary" variant="black" size="md" text="Action 2" />
    <Button buttonStyle="primary" variant="black" size="md" text="Action 1" />
    <Button buttonStyle="secondary" variant="black" size="md" buttonType="iconButton" leadingIcon={<MenuIcon />} />
  </>
);

const FooterActions3 = () => (
  <>
    <Button buttonStyle="tertiary" variant="black" size="md" text="Action 3" />
    <Button buttonStyle="secondary" variant="black" size="md" text="Action 2" />
    <Button buttonStyle="primary" variant="black" size="md" text="Action 1" />
    <Button buttonStyle="secondary" variant="black" size="md" buttonType="iconButton" leadingIcon={<MenuIcon />} />
  </>
);

/* ─── Tab config for footer ─── */
const makeFooterTabs = (active: string, setActive: (k: string) => void) => [
  { key: "tarmac", label: "Tarmac", active: active === "tarmac", onClick: setActive },
  { key: "design", label: "Design", active: active === "design", onClick: setActive },
  { key: "system", label: "System", active: active === "system", onClick: setActive },
];

/* ═══ Section Header — Default (Title + Subtext + Badges + CTAs) ═══ */
export const SectionHeaderDefault: Story = {
  name: "Section Header — Default",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 960, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionHeader
          title="Title here"
          subtext="Subtext goes here"
          showLeadingIcon
          leadingIcon={<TruckIcon />}
          showTrailingIcon
          trailingIcon={<InfoIcon />}
          badges={<BadgeGroup />}
          actions={<HeaderActions />}
        />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Header — Slots (Title + Subtext + Slot area) ═══ */
export const SectionHeaderSlots: Story = {
  name: "Section Header — Slots",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 960, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionHeader
          type="slots"
          title="Title here"
          subtext="Subtext goes here"
          showLeadingIcon
          leadingIcon={<TruckIcon />}
          showTrailingIcon
          trailingIcon={<InfoIcon />}
          badges={<BadgeGroup />}
          slotContent={
            <div style={{ backgroundColor: "#e6f3fe", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#2b2b2b", fontWeight: 300 }}>
              Slot
            </div>
          }
        />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Header — Ghost ═══ */
export const SectionHeaderGhost: Story = {
  name: "Section Header — Ghost",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 960, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionHeader type="ghost" />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Header — All Types ═══ */
export const SectionHeaderAllTypes: Story = {
  name: "Section Header — All Types",
  render: () => (
    <Wrap>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Default (Title + Badges + CTAs)</h3>
          <div style={{ maxWidth: 960, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionHeader
              title="Title here"
              subtext="Subtext goes here"
              showLeadingIcon
              leadingIcon={<TruckIcon />}
              showTrailingIcon
              trailingIcon={<InfoIcon />}
              badges={<BadgeGroup />}
              actions={<HeaderActions />}
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Slots (Title + Slot area)</h3>
          <div style={{ maxWidth: 960, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionHeader
              type="slots"
              title="Title here"
              subtext="Subtext goes here"
              showLeadingIcon
              leadingIcon={<TruckIcon />}
              showTrailingIcon
              trailingIcon={<InfoIcon />}
              badges={<BadgeGroup />}
              slotContent={
                <div style={{ backgroundColor: "#e6f3fe", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#2b2b2b", fontWeight: 300 }}>
                  Slot
                </div>
              }
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Ghost</h3>
          <div style={{ maxWidth: 960, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionHeader type="ghost" />
          </div>
        </div>
      </div>
    </Wrap>
  ),
};

/* ═══ Section Footer — 2 CTAs ═══ */
export const SectionFooter2CTAs: Story = {
  name: "Section Footer — 2 CTAs",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionFooter variant="2-ctas" actions={<FooterActions2 />} />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Footer — 3 CTAs ═══ */
export const SectionFooter3CTAs: Story = {
  name: "Section Footer — 3 CTAs",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionFooter variant="3-ctas" actions={<FooterActions3 />} />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Footer — 2 CTA + Slot ═══ */
export const SectionFooter2CTASlot: Story = {
  name: "Section Footer — 2 CTA + Slot",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionFooter
          variant="2-cta-slot"
          actions={<FooterActions2 />}
          slotContent={
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#2b2b2b" }}>
              <span>Showing 1-10 of 100 results</span>
            </div>
          }
        />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Footer — 3 CTA + Slot ═══ */
export const SectionFooter3CTASlot: Story = {
  name: "Section Footer — 3 CTA + Slot",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionFooter
          variant="3-cta-slot"
          actions={<FooterActions3 />}
          slotContent={
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#2b2b2b" }}>
              <span>Showing 1-10 of 100 results</span>
            </div>
          }
        />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Footer — 4 CTA + Slot ═══ */
export const SectionFooter4CTASlot: Story = {
  name: "Section Footer — 4 CTA + Slot",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionFooter
          variant="4-cta-slot"
          actions={
            <>
              <Button buttonStyle="tertiary" variant="black" size="md" text="Action 4" />
              <Button buttonStyle="tertiary" variant="black" size="md" text="Action 3" />
              <Button buttonStyle="secondary" variant="black" size="md" text="Action 2" />
              <Button buttonStyle="primary" variant="black" size="md" text="Action 1" />
              <Button buttonStyle="secondary" variant="black" size="md" buttonType="iconButton" leadingIcon={<MenuIcon />} />
            </>
          }
          slotContent={
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#2b2b2b" }}>
              <span>Showing 1-10 of 100 results</span>
            </div>
          }
        />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Footer — Ghost ═══ */
export const SectionFooterGhost: Story = {
  name: "Section Footer — Ghost",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionFooter variant="ghost" />
      </div>
    </Wrap>
  ),
};

/* ═══ Section Footer — With Tabs ═══ */
const FooterWithTabsRender = () => {
  const [activeTab, setActiveTab] = useState("tarmac");
  return (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
        <TableSectionFooter
          variant="2-cta-slot"
          actions={<FooterActions2 />}
          slotContent={
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#2b2b2b" }}>
              <span>Showing 1-10 of 100 results</span>
            </div>
          }
          tabs={makeFooterTabs(activeTab, setActiveTab)}
        />
      </div>
    </Wrap>
  );
};

export const SectionFooterWithTabs: Story = {
  name: "Section Footer — With Tabs",
  render: () => <FooterWithTabsRender />,
};

/* ═══ Section Footer — All Variants ═══ */
const FooterAllVariantsRender = () => {
  const [activeTab, setActiveTab] = useState("tarmac");
  return (
    <Wrap>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>2 CTAs</h3>
          <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionFooter variant="2-ctas" actions={<FooterActions2 />} />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>3 CTAs</h3>
          <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionFooter variant="3-ctas" actions={<FooterActions3 />} />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>2 CTA + Slot</h3>
          <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionFooter
              variant="2-cta-slot"
              actions={<FooterActions2 />}
              slotContent={<span style={{ fontSize: 14, color: "#2b2b2b" }}>Showing 1-10 of 100 results</span>}
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>3 CTA + Slot</h3>
          <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionFooter
              variant="3-cta-slot"
              actions={<FooterActions3 />}
              slotContent={<span style={{ fontSize: 14, color: "#2b2b2b" }}>Showing 1-10 of 100 results</span>}
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>4 CTA + Slot</h3>
          <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionFooter
              variant="4-cta-slot"
              actions={
                <>
                  <Button buttonStyle="tertiary" variant="black" size="md" text="Action 4" />
                  <Button buttonStyle="tertiary" variant="black" size="md" text="Action 3" />
                  <Button buttonStyle="secondary" variant="black" size="md" text="Action 2" />
                  <Button buttonStyle="primary" variant="black" size="md" text="Action 1" />
                  <Button buttonStyle="secondary" variant="black" size="md" buttonType="iconButton" leadingIcon={<MenuIcon />} />
                </>
              }
              slotContent={<span style={{ fontSize: 14, color: "#2b2b2b" }}>Showing 1-10 of 100 results</span>}
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Ghost</h3>
          <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionFooter variant="ghost" />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>2 CTA + Slot + Tabs</h3>
          <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8 }}>
            <TableSectionFooter
              variant="2-cta-slot"
              actions={<FooterActions2 />}
              slotContent={<span style={{ fontSize: 14, color: "#2b2b2b" }}>Showing 1-10 of 100 results</span>}
              tabs={makeFooterTabs(activeTab, setActiveTab)}
            />
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export const SectionFooterAllVariants: Story = {
  name: "Section Footer — All Variants",
  render: () => <FooterAllVariantsRender />,
};

/* ═══ Full Table with Section Header + Footer ═══ */
export const FullTableWithHeaderFooter: Story = {
  name: "Full Table — Header + Footer",
  render: () => (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8, overflow: "hidden" }}>
        <TableSectionHeader
          title="Shipments"
          subtext="All active shipments"
          showLeadingIcon
          leadingIcon={<TruckIcon />}
          badges={<BadgeGroup />}
          actions={<HeaderActions />}
        />
        <Table
          columns={textRowColumns as ColumnType<unknown>[]}
          dataSource={textRowData}
          variant="default"
          size="medium"
          bordered
          hoverable
          pagination={false}
          showHeader
        />
        <TableSectionFooter
          variant="2-cta-slot"
          actions={<FooterActions2 />}
          slotContent={<span style={{ fontSize: 14, color: "#2b2b2b" }}>Showing 1-5 of 5 results</span>}
        />
      </div>
    </Wrap>
  ),
};

/* ═══ Light vs Dark — Section Header & Footer ═══ */
export const SectionHeaderFooterLightDark: Story = {
  name: "Section Header & Footer — Light vs Dark",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Light Mode</h3>
        <Wrap>
          <div style={{ border: "1px solid #e6e6e6", borderRadius: 8, overflow: "hidden" }}>
            <TableSectionHeader
              title="Shipments"
              subtext="All active shipments"
              showLeadingIcon
              leadingIcon={<TruckIcon />}
              badges={<BadgeGroup />}
              actions={<HeaderActions />}
            />
            <div style={{ height: 100, backgroundColor: "#fafafa", borderTop: "1px solid #e6e6e6", borderBottom: "1px solid #e6e6e6" }} />
            <TableSectionFooter variant="2-ctas" actions={<FooterActions2 />} />
          </div>
        </Wrap>
      </div>
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Dark Mode</h3>
        <DarkWrap>
          <div style={{ border: "1px solid #333", borderRadius: 8, overflow: "hidden" }}>
            <TableSectionHeader
              title="Shipments"
              subtext="All active shipments"
              showLeadingIcon
              leadingIcon={<TruckIcon />}
              badges={<BadgeGroup />}
              actions={<HeaderActions />}
            />
            <div style={{ height: 100, backgroundColor: "#222", borderTop: "1px solid #333", borderBottom: "1px solid #333" }} />
            <TableSectionFooter variant="2-ctas" actions={<FooterActions2 />} />
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════════
 * TABLE D1 — Full Composed Table (Figma node 2925:21354)
 *
 * Composes existing TarmacTable sub-components + Tarmac Pagination + Tarmac
 * Button/Badge/Snackbar into the 6 Figma style variants:
 *   Standard, Standard 2, Ghost, Modern, Modern 2, Modern 3
 * ═══════════════════════════════════════════════════════════════════════════════ */

/* ─── Shared icons for Table D1 ─── */
const FilterListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.33 15h3.34v-1.67H8.33V15zM2.5 5v1.67h15V5H2.5zm2.5 5.83h10V9.17H5v1.66z" fill="#2396fb"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.67 1.67 16.67h16.66L10 1.67zm.83 12.5H9.17v-1.67h1.66v1.67zm0-3.34H9.17V7.5h1.66v3.33z" fill="#7b6414"/>
  </svg>
);

const MoreHorizIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 8.33c-.92 0-1.67.75-1.67 1.67s.75 1.67 1.67 1.67S6.67 10.92 6.67 10 5.92 8.33 5 8.33zm10 0c-.92 0-1.67.75-1.67 1.67s.75 1.67 1.67 1.67 1.67-.75 1.67-1.67-.75-1.67-1.67-1.67zm-5 0c-.92 0-1.67.75-1.67 1.67s.75 1.67 1.67 1.67 1.67-.75 1.67-1.67-.75-1.67-1.67-1.67z" fill="#2b2b2b"/>
  </svg>
);

const DragIndicatorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.33 9.33c.74 0 1.34.6 1.34 1.34 0 .73-.6 1.33-1.34 1.33-.73 0-1.33-.6-1.33-1.33 0-.74.6-1.34 1.33-1.34zm5.34 0c.73 0 1.33.6 1.33 1.34 0 .73-.6 1.33-1.33 1.33-.74 0-1.34-.6-1.34-1.33 0-.74.6-1.34 1.34-1.34zM5.33 4c.74 0 1.34.6 1.34 1.33 0 .74-.6 1.34-1.34 1.34-.73 0-1.33-.6-1.33-1.34C4 4.6 4.6 4 5.33 4zm5.34 0c.73 0 1.33.6 1.33 1.33 0 .74-.6 1.34-1.33 1.34-.74 0-1.34-.6-1.34-1.34 0-.73.6-1.33 1.34-1.33z" fill="#a6a5a5"/>
  </svg>
);

const NotInterestedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.33C4.32 1.33 1.33 4.32 1.33 8s2.99 6.67 6.67 6.67S14.67 11.68 14.67 8 11.68 1.33 8 1.33zM2.67 8c0-2.95 2.38-5.33 5.33-5.33 1.25 0 2.4.43 3.31 1.15L4.15 11.31A5.3 5.3 0 0 1 2.67 8zm5.33 5.33c-1.25 0-2.4-.43-3.31-1.15l7.16-7.49A5.3 5.3 0 0 1 13.33 8c0 2.95-2.38 5.33-5.33 5.33z" fill="#2b2b2b"/>
  </svg>
);

/* ─── Sample data for Standard table (Figma: Style=Standard) ─── */
interface D1StandardRow {
  key: string;
  orderId: string;
  packageTitle: string;
  packageSubtext: string;
  itemTitle: string;
  itemSubtext: string;
  pickupAddress: string;
  documents: string;
  duty: string;
  dutyIcon?: boolean;
  orderCost: string;
  dlvAwb: string;
}

const d1StandardData: D1StandardRow[] = [
  { key: "1", orderId: "SO - 4568", packageTitle: "Dead Wt: 3100gm", packageSubtext: "Vol Wt: 3500g", itemTitle: "Body Lotion", itemSubtext: "Qty: 100", pickupAddress: "Bessi Cooper Jhonathan", documents: "Jhon Smith", duty: "Calculating", orderCost: "₹1,299", dlvAwb: "--" },
  { key: "2", orderId: "SO - 4572", packageTitle: "Dead Wt: 2500gm", packageSubtext: "Vol Wt: 2800g", itemTitle: "Face Wash", itemSubtext: "Qty: 50", pickupAddress: "Alice Martin", documents: "Jane Doe", duty: "Paid", orderCost: "₹899", dlvAwb: "AWB-001" },
  { key: "3", orderId: "SO - 4555", packageTitle: "Dead Wt: 4200gm", packageSubtext: "Vol Wt: 4500g", itemTitle: "Shampoo", itemSubtext: "Qty: 200", pickupAddress: "David Wilson", documents: "Mark Lee", duty: "Pending", orderCost: "₹2,499", dlvAwb: "AWB-002" },
  { key: "4", orderId: "SO - 4590", packageTitle: "Dead Wt: 1800gm", packageSubtext: "Vol Wt: 2000g", itemTitle: "Sunscreen", itemSubtext: "Qty: 75", pickupAddress: "Emma Thompson", documents: "Sara Khan", duty: "Calculating", orderCost: "₹599", dlvAwb: "--" },
  { key: "5", orderId: "SO - 4501", packageTitle: "Dead Wt: 5000gm", packageSubtext: "Vol Wt: 5200g", itemTitle: "Hair Oil", itemSubtext: "Qty: 150", pickupAddress: "Robert Brown", documents: "Chris Evans", duty: "NA", dutyIcon: true, orderCost: "₹3,150", dlvAwb: "AWB-003" },
  { key: "6", orderId: "SO - 4580", packageTitle: "Dead Wt: 3600gm", packageSubtext: "Vol Wt: 3900g", itemTitle: "Moisturizer", itemSubtext: "Qty: 80", pickupAddress: "Zara Ahmed", documents: "Tom Hardy", duty: "NA", dutyIcon: true, orderCost: "₹1,750", dlvAwb: "--" },
];

/* ─── Sample data for Modern table (Figma: Style=Modern) ─── */
interface D1ModernRow {
  key: string;
  orderId: string;
  awb: string;
  productTitle: string;
  productSubtext: string;
  paymentMode: string;
  ndrType: string;
  attemptCount: string;
  lastUpdated: string;
}

const d1ModernData: D1ModernRow[] = [
  { key: "1", orderId: "9023857", awb: "78986398757", productTitle: "Blue T-Shirt", productSubtext: "₹ 2,200", paymentMode: "Prepaid", ndrType: "Consignee Unavailable", attemptCount: "2 attempts", lastUpdated: "8 Jan | 12:40PM" },
  { key: "2", orderId: "9023857", awb: "78986398757", productTitle: "Blue T-Shirt", productSubtext: "₹ 2,200", paymentMode: "Prepaid", ndrType: "Consignee Unavailable", attemptCount: "2 attempts", lastUpdated: "8 Jan | 12:40PM" },
];

/* ─── Standard Table D1 (Figma: Style=Standard) ─── */
const StandardTableD1Render = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [activeTab, setActiveTab] = useState("tarmac");
  const [searchVal, setSearchVal] = useState("");
  const [sortedInfo, setSortedInfo] = useState<{ columnKey?: React.Key; order?: SortOrder | null }>({});

  const tabs: TableFullHeaderTab[] = [
    { key: "tarmac", label: "Tarmac", active: activeTab === "tarmac", onClick: setActiveTab },
    { key: "design", label: "Design", active: activeTab === "design", onClick: setActiveTab },
    { key: "system", label: "System", active: activeTab === "system", onClick: setActiveTab },
  ];

  const filters: TableFullHeaderFilter[] = [
    { label: "View Invoice review", onToggle: () => {} },
    { label: "Vendor", onToggle: () => {} },
    { label: "Invoice", onToggle: () => {} },
    { label: "PURs", onToggle: () => {} },
    { label: "Period", onToggle: () => {} },
  ];

  const d1StandardColumns: ColumnType<D1StandardRow>[] = [
    {
      title: "Order ID", dataIndex: "orderId", key: "orderId", width: 120,
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
      sortOrder: sortedInfo.columnKey === "orderId" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <span style={{ fontWeight: 500, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.orderId}</span>
      ),
    },
    {
      title: "Package Details", dataIndex: "packageTitle", key: "package",
      sorter: (a, b) => a.packageTitle.localeCompare(b.packageTitle),
      sortOrder: sortedInfo.columnKey === "package" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 500, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.packageTitle}</span>
          <span style={{ fontWeight: 300, fontSize: 12, lineHeight: "16px", color: "#454545" }}>{record.packageSubtext}</span>
        </div>
      ),
    },
    {
      title: "Item Details", dataIndex: "itemTitle", key: "item",
      sorter: (a, b) => a.itemTitle.localeCompare(b.itemTitle),
      sortOrder: sortedInfo.columnKey === "item" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 500, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.itemTitle}</span>
          <span style={{ fontWeight: 300, fontSize: 12, lineHeight: "16px", color: "#454545" }}>{record.itemSubtext}</span>
        </div>
      ),
    },
    {
      title: "Pickup Address", dataIndex: "pickupAddress", key: "pickup",
      sorter: (a, b) => a.pickupAddress.localeCompare(b.pickupAddress),
      sortOrder: sortedInfo.columnKey === "pickup" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <span style={{ fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.pickupAddress}</span>
      ),
    },
    {
      title: "Documents", dataIndex: "documents", key: "docs",
      sorter: (a, b) => a.documents.localeCompare(b.documents),
      sortOrder: sortedInfo.columnKey === "docs" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <span style={{ fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.documents}</span>
      ),
    },
    {
      title: "Duty", dataIndex: "duty", key: "duty",
      sorter: (a, b) => a.duty.localeCompare(b.duty),
      sortOrder: sortedInfo.columnKey === "duty" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {record.dutyIcon && <NotInterestedIcon />}
          <span style={{ fontWeight: record.dutyIcon ? 500 : 400, fontSize: 12, lineHeight: "16px", color: "#2b2b2b" }}>{record.duty}</span>
        </div>
      ),
    },
    {
      title: "Order Cost", dataIndex: "orderCost", key: "cost",
      sorter: (a, b) => a.orderCost.localeCompare(b.orderCost),
      sortOrder: sortedInfo.columnKey === "cost" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.orderCost}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1.67C5.4 1.67 1.67 5.4 1.67 10S5.4 18.33 10 18.33 18.33 14.6 18.33 10 14.6 1.67 10 1.67zm.83 12.5H9.17v-5h1.66v5zm0-6.67H9.17V5.83h1.66V7.5z" fill="#808080"/></svg>
        </div>
      ),
    },
    {
      title: "Delhivery AWB", dataIndex: "dlvAwb", key: "awb",
      sorter: (a, b) => a.dlvAwb.localeCompare(b.dlvAwb),
      sortOrder: sortedInfo.columnKey === "awb" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <span style={{ fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.dlvAwb}</span>
      ),
    },
    {
      title: "Action", key: "action",
      render: () => (
        <Button buttonStyle="tertiary" variant="info" size="sm" text="Ship Now" />
      ),
    },
  ];

  return (
    <Wrap>
      <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8, overflow: "hidden" }}>
        {/* Section Header */}
        <TableSectionHeader
          title="Title goes here"
          subtext="Subtext goes here"
          showLeadingIcon
          leadingIcon={<TruckIcon />}
          showTrailingIcon
          trailingIcon={<InfoIcon />}
          badges={
            <>
              <Badge badgeType="subtle" variant="info" size="sm" text="USA" leadingIcon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5 2.5 7.13 6 11 6 11s3.5-3.87 3.5-6.5C9.5 2.57 7.93 1 6 1z" fill="#2396fb"/></svg>} />
              <Badge badgeType="subtle" variant="success" size="sm" text="CSC IV" leadingIcon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 3v6h7V3h-7zm6 5h-5V4h5v4zM10 2H3.5v1H10v7h1V3c0-.55-.45-1-1-1z" fill="#1ba86e"/></svg>} />
              <Badge badgeType="subtle" variant="dlv_red" size="sm" text="DLV Saver" leadingIcon={<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 4H8V2H1.5c-.55 0-1 .45-1 1v5.5h1c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h1V6.5L10 4z" fill="#c5172d"/></svg>} />
            </>
          }
          actions={
            <Button buttonStyle="secondary" variant="black" size="md" text="Seller Documents" leadingIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1.67C5.4 1.67 1.67 5.4 1.67 10S5.4 18.33 10 18.33 18.33 14.6 18.33 10 14.6 1.67 10 1.67zm.83 5.83v3.33h-1.66V7.5h1.66zm0 5H9.17v-1.67h1.66v1.67z" fill="#2b2b2b"/></svg>} />
          }
        />

        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", padding: 8, borderBottom: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => tab.onClick(tab.key)}
              style={{
                padding: "8px 12px",
                border: "none",
                borderBottom: tab.active ? "2px solid #1a1a1a" : "none",
                background: "white",
                fontWeight: tab.active ? 600 : 500,
                fontSize: 12,
                lineHeight: "16px",
                color: "#2b2b2b",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Snackbar */}
        <Snackbar variant="warning" snackbarStyle="filled" size="sm" message="Content shown here is for visual reference" duration={0} />

        {/* Action Bar: Search + Filters + CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 12 }}>
          <div style={{ display: "flex", flex: "1 0 0", gap: 8, alignItems: "center", minWidth: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, border: "1px solid #e6e6e6", borderRadius: 4, padding: "8px 12px", width: 208 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.9 11.5h-.79l-.28-.27A6.47 6.47 0 0 0 13.5 7a6.5 6.5 0 1 0-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16.5l-4.59-5zm-6 0C5.01 11.5 3.5 9.99 3.5 7.5S5.01 3.5 6.9 3.5 10.5 5.01 10.5 7.5 8.99 11.5 6.9 11.5z" fill="#808080"/></svg>
              <input
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search"
                style={{ border: "none", outline: "none", flex: 1, fontSize: 14, fontWeight: 500, color: "#808080", background: "transparent" }}
              />
            </div>
            {filters.map((f, i) => (
              <button key={i} style={{ display: "flex", alignItems: "center", gap: 4, border: "1px solid #e6e6e6", borderRadius: 4, padding: "8px 12px", background: "white", fontSize: 14, fontWeight: 500, color: "#808080", cursor: "pointer", maxHeight: 44, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: i === 0 ? 198 : 100 }}>
                <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis" }}>{f.label}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4.95L12 6H4z" fill="#808080"/></svg>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <Button buttonStyle="secondary" variant="black" size="md" text="Action 2" />
            <Button buttonStyle="primary" variant="black" size="md" text="Action 1" />
            <Button buttonStyle="secondary" variant="info" size="md" buttonType="iconButton" leadingIcon={<FilterListIcon />} />
          </div>
        </div>

        {/* Table body */}
        <Table
          columns={d1StandardColumns as ColumnType<unknown>[]}
          dataSource={d1StandardData}
          variant="default"
          size="medium"
          bordered={false}
          hoverable
          pagination={false}
          showHeader
          onChange={(_pagination, _filters, sorter) => {
            const s = Array.isArray(sorter) ? sorter[0] : sorter;
            setSortedInfo({ columnKey: s.columnKey, order: s.order });
          }}
        />

        {/* Footer */}
        <TableSectionFooter
          variant="2-cta-slot"
          actions={
            <>
              <Button buttonStyle="secondary" variant="black" size="md" text="Action 2" />
              <Button buttonStyle="primary" variant="black" size="md" text="Action 1" />
              <Button buttonStyle="secondary" variant="black" size="md" buttonType="iconButton" leadingIcon={<MoreHorizIcon />} />
            </>
          }
          slotContent={<div style={{ flex: "1 0 0", minWidth: 1 }} />}
        />

        {/* Pagination */}
        <div style={{ padding: "8px 12px" }}>
          <Pagination
            paginationStyle="tarmac-01"
            cellStyle="legacyBlue"
            tarmacSize="md"
            showTextLeft
            showNumberCells
            showTextRight
            showDivider
            total={200}
            pageSize={12}
            current={currentPage}
            onChange={(page) => page && setCurrentPage(page)}
            showTotal={(total) => `Showing ${total}`}
          />
        </div>
      </div>
    </Wrap>
  );
};

export const TableD1Standard: Story = {
  name: "Table D1 — Standard",
  render: () => <StandardTableD1Render />,
};


/* ─── Ghost Table D1 (Figma: Style=Ghost) ─── */
const GhostTableD1Render = () => {
  return (
    <Wrap>
      <GhostTableD1Inner />
    </Wrap>
  );
};

const GhostTableD1Inner = () => {
  const { theme } = (window as any).__THEME_HOOK__ || { theme: {} };
  // We read from ThemeProvider via the sub-components themselves.
  // The ghost skeleton uses TableSectionHeader type="ghost", TableSectionFooter variant="ghost",
  // and TableRow style="ghost" — all of which now read from theme.

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8, overflow: "hidden", background: "white" }}>
      {/* Ghost Section Header — reads sectionHeader.ghost from theme */}
      <TableSectionHeader type="ghost" />

      {/* Ghost Full Header — reads tableHeader from theme */}
      <TableFullHeader isGhost />

      {/* Ghost Table Body — uses Table with loading */}
      <Table
        columns={textRowColumns.map(c => ({ ...c, render: undefined })) as ColumnType<unknown>[]}
        dataSource={[]}
        variant="default"
        size="medium"
        bordered={false}
        pagination={false}
        showHeader
        loading
      />

      {/* Ghost Footer — reads sectionFooter.ghost from theme */}
      <TableSectionFooter variant="ghost" />
    </div>
  );
};

export const TableD1Ghost: Story = {
  name: "Table D1 — Ghost",
  render: () => <GhostTableD1Render />,
};


/* ─── Modern Table D1 (Figma: Style=Modern) — Card rows with per-row footer ─── */
const ModernTableD1Render = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [activeTab, setActiveTab] = useState("tarmac");
  const [searchVal, setSearchVal] = useState("");

  return (
    <Wrap>
      <ModernTableD1Inner
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />
    </Wrap>
  );
};

const ModernTableD1Inner: React.FC<{
  currentPage: number;
  setCurrentPage: (p: number) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  searchVal: string;
  setSearchVal: (v: string) => void;
}> = ({ currentPage, setCurrentPage, activeTab, setActiveTab, searchVal, setSearchVal }) => {
  const { theme } = useTheme();
  const tableCfg = (theme?.components as Record<string, unknown>)?.table as Record<string, unknown> || {};
  const ml = (tableCfg?.modernLayout || {}) as Record<string, unknown>;
  const cardArea = (ml?.cardArea || {}) as Record<string, string>;
  const headerRow = (ml?.headerRow || {}) as Record<string, string>;
  const proofChip = (ml?.proofChip || {}) as Record<string, unknown>;
  const proofLabel = (ml?.proofLabel || {}) as Record<string, string>;
  const chipLabel = (proofChip?.label || {}) as Record<string, string>;
  const thCfg = (tableCfg?.tableHeader || {}) as Record<string, unknown>;
  const searchCfg = (thCfg?.search || {}) as Record<string, string>;
  const filterCfg = (thCfg?.filter || {}) as Record<string, string>;
  const actionBarCfg = (thCfg?.actionBar || {}) as Record<string, string>;
  const headerCellCfg = (tableCfg?.headerCell || {}) as Record<string, unknown>;
  const hcLabel = (headerCellCfg?.label || {}) as Record<string, string>;

  const tabs = [
    { key: "tarmac", label: "Tarmac", active: activeTab === "tarmac" },
    { key: "design", label: "Design", active: activeTab === "design" },
    { key: "system", label: "System", active: activeTab === "system" },
  ];

  const filters = ["View Invoice review", "Vendor", "Invoice", "PURs", "Period"];

  const headerCellStyle: React.CSSProperties = {
    display: "flex", alignItems: "center",
    gap: (headerCellCfg?.gap as string) || "8px",
    padding: (headerCellCfg?.padding as string) || "12px",
    backgroundColor: (headerCellCfg?.backgroundColor as string) || headerRow.backgroundColor || "#f7f7f7",
    fontWeight: Number(hcLabel.fontWeight) || 400,
    fontSize: hcLabel.fontSize || "12px",
    lineHeight: hcLabel.lineHeight || "16px",
    color: hcLabel.color || "#454545",
    flex: "1 0 0", minWidth: 1,
  };

  const textCellCfg = (tableCfg?.textCell || {}) as Record<string, unknown>;
  const tcTitle = (textCellCfg?.title || {}) as Record<string, string>;
  const tcSubtext = (textCellCfg?.subtext || {}) as Record<string, string>;

  const textCellStyle: React.CSSProperties = {
    display: "flex", flexDirection: "column", justifyContent: "center",
    padding: "8px", flex: "1 0 0", minWidth: 1,
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  };

  return (
    <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8, overflow: "hidden", background: "white" }}>
      {/* Section Header */}
      <TableSectionHeader
        title="Title goes here" subtext="Subtext goes here"
        showLeadingIcon leadingIcon={<TruckIcon />}
        showTrailingIcon trailingIcon={<InfoIcon />}
        badges={<><Badge badgeType="subtle" variant="info" size="sm" text="USA" /><Badge badgeType="subtle" variant="success" size="sm" text="CSC IV" /><Badge badgeType="subtle" variant="dlv_red" size="sm" text="DLV Saver" /></>}
        actions={<Button buttonStyle="secondary" variant="black" size="md" text="Seller Documents" />}
      />

      {/* Tabs — uses sectionFooter.tabs tokens */}
      <div style={{ display: "flex", alignItems: "center", padding: 8 }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: "8px 12px", border: "none",
            borderBottom: tab.active ? "2px solid #1a1a1a" : "none",
            background: "white", fontWeight: tab.active ? 600 : 500,
            fontSize: 12, lineHeight: "16px", color: "#2b2b2b", cursor: "pointer",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Snackbar */}
      <Snackbar variant="warning" snackbarStyle="filled" size="sm" message="Content shown here is for visual reference" duration={0} />

      {/* Action Bar — uses tableHeader tokens */}
      <div style={{ display: "flex", alignItems: "center", gap: actionBarCfg.gap || "24px", padding: actionBarCfg.padding || "12px" }}>
        <div style={{ display: "flex", flex: "1 0 0", gap: actionBarCfg.itemGap || "8px", alignItems: "center", minWidth: 1 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "4px",
            border: `${searchCfg.borderWidth || "1px"} solid ${searchCfg.borderColor || "#e6e6e6"}`,
            borderRadius: searchCfg.borderRadius || "4px",
            padding: searchCfg.padding || "8px 12px",
            backgroundColor: searchCfg.backgroundColor || "white",
            width: 208,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.9 11.5h-.79l-.28-.27A6.47 6.47 0 0 0 13.5 7a6.5 6.5 0 1 0-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16.5l-4.59-5zm-6 0C5.01 11.5 3.5 9.99 3.5 7.5S5.01 3.5 6.9 3.5 10.5 5.01 10.5 7.5 8.99 11.5 6.9 11.5z" fill={searchCfg.placeholderColor || "#808080"}/></svg>
            <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" style={{
              border: "none", outline: "none", flex: 1,
              fontSize: searchCfg.fontSize || "14px", fontWeight: 500,
              color: searchCfg.placeholderColor || "#808080", background: "transparent",
            }} />
          </div>
          {filters.map((f, i) => (
            <button key={i} style={{
              display: "flex", alignItems: "center", gap: "4px",
              border: `${filterCfg.borderWidth || "1px"} solid ${filterCfg.borderColor || "#e6e6e6"}`,
              borderRadius: filterCfg.borderRadius || "4px",
              padding: filterCfg.padding || "8px 12px",
              background: filterCfg.backgroundColor || "white",
              fontSize: filterCfg.fontSize || "14px", fontWeight: 500,
              color: filterCfg.textColor || "#808080", cursor: "pointer",
              maxHeight: 44, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              width: i === 0 ? 198 : 100,
            }}>
              <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis" }}>{f}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4.95L12 6H4z" fill="#808080"/></svg>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
          <Button buttonStyle="secondary" variant="black" size="md" text="Action 2" />
          <Button buttonStyle="primary" variant="black" size="md" text="Action 1" />
          <Button buttonStyle="secondary" variant="info" size="md" buttonType="iconButton" leadingIcon={<FilterListIcon />} />
        </div>
      </div>

      {/* Modern Card Rows Area — uses modernLayout tokens */}
      <div style={{
        display: "flex", flexDirection: "column",
        gap: cardArea.gap || "6px",
        padding: cardArea.padding || "12px",
        backgroundColor: cardArea.backgroundColor || "#f7f7f7",
      }}>
        {/* Column Headers */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {["Order IDS & AWB No.", "Product Details", "Payment Mode", "NDR Type", "Attempt Count", "Last Updated"].map((label) => (
            <div key={label} style={headerCellStyle}>{label}</div>
          ))}
        </div>

        {/* Card Rows — uses tableRow tokens via TableRow component */}
        {d1ModernData.map((row) => (
          <TableRow
            key={row.key}
            cells={
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "8px 12px", flex: "1 0 0", minWidth: 1 }}>
                  <span style={{ fontWeight: 500, fontSize: tcTitle.fontSize || "14px", lineHeight: tcTitle.lineHeight || "20px", color: "#2396fb" }}>{row.orderId}</span>
                  <span style={{ fontWeight: 400, fontSize: tcSubtext.fontSize || "12px", lineHeight: tcSubtext.lineHeight || "16px", color: tcSubtext.color || "#454545" }}>{row.awb}</span>
                </div>
                <div style={textCellStyle}>
                  <span style={{ fontWeight: Number(tcTitle.fontWeight) || 500, fontSize: tcTitle.fontSize || "14px", lineHeight: tcTitle.lineHeight || "20px", color: tcTitle.color || "#2b2b2b" }}>
                    {row.productTitle} <span style={{ fontWeight: 300, color: "#808080" }}>(+2 items)</span>
                  </span>
                  <span style={{ fontWeight: Number(tcSubtext.fontWeight) || 300, fontSize: tcSubtext.fontSize || "12px", lineHeight: tcSubtext.lineHeight || "16px", color: tcSubtext.color || "#454545" }}>{row.productSubtext}</span>
                </div>
                {[row.paymentMode, row.ndrType, row.attemptCount, row.lastUpdated].map((val, i) => (
                  <div key={i} style={textCellStyle}>
                    <span style={{ fontWeight: Number(tcTitle.fontWeight) || 500, fontSize: tcTitle.fontSize || "14px", lineHeight: tcTitle.lineHeight || "20px", color: tcTitle.color || "#2b2b2b" }}>{val}</span>
                  </div>
                ))}
              </>
            }
            footerSlot={
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{
                  fontFamily: proofLabel.fontFamily, fontWeight: Number(proofLabel.fontWeight) || 600,
                  fontSize: proofLabel.fontSize || "14px", lineHeight: proofLabel.lineHeight || "20px",
                  color: proofLabel.color || "#2b2b2b",
                }}>Proofs</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {["Whatsapp", "Call Recording", "Geofence"].map((label) => (
                    <div key={label} style={{
                      display: "flex", alignItems: "center",
                      height: (proofChip.height as string) || "28px",
                      border: `${(proofChip.borderWidth as string) || "0.5px"} solid ${(proofChip.borderColor as string) || "#e6e6e6"}`,
                      borderRadius: (proofChip.borderRadius as string) || "999px",
                      overflow: "hidden", paddingRight: 8,
                      backgroundColor: (proofChip.backgroundColor as string) || "white",
                    }}>
                      <div style={{
                        width: (proofChip.iconContainerSize as string) || "28px",
                        height: (proofChip.iconContainerSize as string) || "28px",
                        borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                        background: (proofChip.iconBg as string) || "linear-gradient(160deg, #a8b1b0 8%, rgba(0,0,0,0.91) 91%)",
                      }}>
                        <svg width={(proofChip.iconSize as string) || "16"} height={(proofChip.iconSize as string) || "16"} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" fill="white" fillOpacity="0.3"/></svg>
                      </div>
                      <span style={{
                        fontSize: chipLabel.fontSize || "12px", fontWeight: Number(chipLabel.fontWeight) || 500,
                        lineHeight: chipLabel.lineHeight || "16px", color: chipLabel.color || "#2b2b2b", marginLeft: 4,
                      }}>{label}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 4 }}><path d="M4.67 3.33l1.17 1.18L3.66 6.67h8.67v1.66H3.66l2.18 2.18-1.17 1.16L.33 7.33l4.34-4z" fill={chipLabel.color || "#2b2b2b"} transform="rotate(180 8 8)"/></svg>
                    </div>
                  ))}
                </div>
              </div>
            }
            footerActions={
              <>
                <Button buttonStyle="secondary" variant="black" size="md" text="Re-attempt" />
                <Button buttonStyle="primary" variant="black" size="md" text="Return" />
                <Button buttonStyle="secondary" variant="black" size="md" buttonType="iconButton" leadingIcon={<MoreHorizIcon />} />
              </>
            }
          />
        ))}
      </div>

      {/* Footer */}
      <TableSectionFooter
        variant="2-cta-slot"
        actions={<><Button buttonStyle="primary" variant="black" size="md" text="Action 1" /><Button buttonStyle="secondary" variant="black" size="md" buttonType="iconButton" leadingIcon={<MoreHorizIcon />} /></>}
        slotContent={<div style={{ flex: "1 0 0", minWidth: 1 }} />}
      />

      {/* Pagination */}
      <div style={{ padding: "8px 12px" }}>
        <Pagination
          paginationStyle="tarmac-01" cellStyle="legacyBlue" tarmacSize="md"
          showTextLeft showNumberCells showTextRight showDivider
          total={200} pageSize={12} current={currentPage}
          onChange={(page) => page && setCurrentPage(page)}
          showTotal={(total) => `Showing ${total}`}
        />
      </div>
    </div>
  );
};

export const TableD1Modern: Story = {
  name: "Table D1 — Modern (Card Rows)",
  render: () => <ModernTableD1Render />,
};


/* ─── All 3 Styles Side by Side ─── */
export const TableD1AllStyles: Story = {
  name: "Table D1 — All Styles",
  render: () => (
    <Wrap>
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        <div>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Style = Standard</h3>
          <StandardTableD1Render />
        </div>
        <div>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Style = Ghost (Loading)</h3>
          <GhostTableD1Render />
        </div>
        <div>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Style = Modern (Card Rows)</h3>
          <ModernTableD1Render />
        </div>
      </div>
    </Wrap>
  ),
};

/* ─── Table D1 — Light vs Dark ─── */
export const TableD1LightVsDark: Story = {
  name: "Table D1 — Light vs Dark",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Light Mode — Standard</h3>
        <StandardTableD1Render />
      </div>
      <div>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>Dark Mode — Standard</h3>
        <DarkWrap>
          <div style={{ maxWidth: 1124, border: "1px solid #333", borderRadius: 8, overflow: "hidden" }}>
            <TableSectionHeader
              title="Title goes here"
              subtext="Subtext goes here"
              showLeadingIcon
              leadingIcon={<TruckIcon />}
              badges={<BadgeGroup />}
              actions={<HeaderActions />}
            />
            <Table
              columns={textRowColumns as ColumnType<unknown>[]}
              dataSource={textRowData.slice(0, 3)}
              variant="default"
              size="medium"
              bordered={false}
              hoverable
              pagination={false}
              showHeader
            />
            <TableSectionFooter variant="2-ctas" actions={<FooterActions2 />} />
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};

/* ═══ Sorting + Pagination — D1 Standard (Interactive) ═══ */

interface SortPaginationD1Row {
  key: string;
  orderId: string;
  packageTitle: string;
  packageSubtext: string;
  itemTitle: string;
  itemSubtext: string;
  pickupAddress: string;
  documents: string;
  duty: string;
  dutyIcon?: boolean;
  orderCost: string;
  dlvAwb: string;
}

const sortPaginationD1Data: SortPaginationD1Row[] = [
  { key: "1", orderId: "SO - 4568", packageTitle: "Dead Wt: 3100gm", packageSubtext: "Vol Wt: 3500g", itemTitle: "Body Lotion", itemSubtext: "Qty: 100", pickupAddress: "Bessi Cooper", documents: "Jhon Smith", duty: "Calculating", orderCost: "₹1,299", dlvAwb: "--" },
  { key: "2", orderId: "SO - 4572", packageTitle: "Dead Wt: 2500gm", packageSubtext: "Vol Wt: 2800g", itemTitle: "Face Wash", itemSubtext: "Qty: 50", pickupAddress: "Alice Martin", documents: "Jane Doe", duty: "Paid", orderCost: "₹899", dlvAwb: "AWB-001" },
  { key: "3", orderId: "SO - 4555", packageTitle: "Dead Wt: 4200gm", packageSubtext: "Vol Wt: 4500g", itemTitle: "Shampoo", itemSubtext: "Qty: 200", pickupAddress: "David Wilson", documents: "Mark Lee", duty: "Pending", orderCost: "₹2,499", dlvAwb: "AWB-002" },
  { key: "4", orderId: "SO - 4590", packageTitle: "Dead Wt: 1800gm", packageSubtext: "Vol Wt: 2000g", itemTitle: "Sunscreen", itemSubtext: "Qty: 75", pickupAddress: "Emma Thompson", documents: "Sara Khan", duty: "Calculating", orderCost: "₹599", dlvAwb: "--" },
  { key: "5", orderId: "SO - 4501", packageTitle: "Dead Wt: 5000gm", packageSubtext: "Vol Wt: 5200g", itemTitle: "Hair Oil", itemSubtext: "Qty: 150", pickupAddress: "Robert Brown", documents: "Chris Evans", duty: "NA", dutyIcon: true, orderCost: "₹3,150", dlvAwb: "AWB-003" },
  { key: "6", orderId: "SO - 4580", packageTitle: "Dead Wt: 3600gm", packageSubtext: "Vol Wt: 3900g", itemTitle: "Moisturizer", itemSubtext: "Qty: 80", pickupAddress: "Zara Ahmed", documents: "Tom Hardy", duty: "NA", dutyIcon: true, orderCost: "₹1,750", dlvAwb: "--" },
  { key: "7", orderId: "SO - 4612", packageTitle: "Dead Wt: 2200gm", packageSubtext: "Vol Wt: 2400g", itemTitle: "Conditioner", itemSubtext: "Qty: 60", pickupAddress: "Liam Neeson", documents: "Priya Patel", duty: "Paid", orderCost: "₹1,050", dlvAwb: "AWB-004" },
  { key: "8", orderId: "SO - 4533", packageTitle: "Dead Wt: 6100gm", packageSubtext: "Vol Wt: 6500g", itemTitle: "Perfume Set", itemSubtext: "Qty: 25", pickupAddress: "Nora Fatehi", documents: "Raj Malhotra", duty: "Pending", orderCost: "₹4,999", dlvAwb: "AWB-005" },
  { key: "9", orderId: "SO - 4601", packageTitle: "Dead Wt: 1500gm", packageSubtext: "Vol Wt: 1700g", itemTitle: "Lip Balm", itemSubtext: "Qty: 300", pickupAddress: "Kiran Rao", documents: "Amit Shah", duty: "Calculating", orderCost: "₹349", dlvAwb: "--" },
  { key: "10", orderId: "SO - 4545", packageTitle: "Dead Wt: 2900gm", packageSubtext: "Vol Wt: 3100g", itemTitle: "Serum", itemSubtext: "Qty: 90", pickupAddress: "Vikram Seth", documents: "Neha Gupta", duty: "Paid", orderCost: "₹1,899", dlvAwb: "AWB-006" },
];

const SortPaginationD1Render = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedInfo, setSortedInfo] = useState<{ columnKey?: React.Key; order?: SortOrder | null }>({});
  const PAGE_SIZE = 4;

  const sortPagD1Columns: ColumnType<SortPaginationD1Row>[] = [
    {
      title: "Order ID", dataIndex: "orderId", key: "orderId", width: 120,
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
      sortOrder: sortedInfo.columnKey === "orderId" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <span style={{ fontWeight: 500, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.orderId}</span>
      ),
    },
    {
      title: "Package Details", dataIndex: "packageTitle", key: "package",
      sorter: (a, b) => a.packageTitle.localeCompare(b.packageTitle),
      sortOrder: sortedInfo.columnKey === "package" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 500, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.packageTitle}</span>
          <span style={{ fontWeight: 300, fontSize: 12, lineHeight: "16px", color: "#454545" }}>{record.packageSubtext}</span>
        </div>
      ),
    },
    {
      title: "Item Details", dataIndex: "itemTitle", key: "item",
      sorter: (a, b) => a.itemTitle.localeCompare(b.itemTitle),
      sortOrder: sortedInfo.columnKey === "item" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 500, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.itemTitle}</span>
          <span style={{ fontWeight: 300, fontSize: 12, lineHeight: "16px", color: "#454545" }}>{record.itemSubtext}</span>
        </div>
      ),
    },
    {
      title: "Pickup Address", dataIndex: "pickupAddress", key: "pickup",
      sorter: (a, b) => a.pickupAddress.localeCompare(b.pickupAddress),
      sortOrder: sortedInfo.columnKey === "pickup" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <span style={{ fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.pickupAddress}</span>
      ),
    },
    {
      title: "Documents", dataIndex: "documents", key: "docs",
      sorter: (a, b) => a.documents.localeCompare(b.documents),
      sortOrder: sortedInfo.columnKey === "docs" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <span style={{ fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.documents}</span>
      ),
    },
    {
      title: "Duty", dataIndex: "duty", key: "duty",
      sorter: (a, b) => a.duty.localeCompare(b.duty),
      sortOrder: sortedInfo.columnKey === "duty" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {record.dutyIcon && <NotInterestedIcon />}
          <span style={{ fontWeight: record.dutyIcon ? 500 : 400, fontSize: 12, lineHeight: "16px", color: "#2b2b2b" }}>{record.duty}</span>
        </div>
      ),
    },
    {
      title: "Order Cost", dataIndex: "orderCost", key: "cost",
      sorter: (a, b) => parseFloat(a.orderCost.replace(/[₹,]/g, "")) - parseFloat(b.orderCost.replace(/[₹,]/g, "")),
      sortOrder: sortedInfo.columnKey === "cost" ? sortedInfo.order ?? null : null,
      render: (_, record) => (
        <span style={{ fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.orderCost}</span>
      ),
    },
    {
      title: "Delhivery AWB", dataIndex: "dlvAwb", key: "awb",
      render: (_, record) => (
        <span style={{ fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "#2b2b2b" }}>{record.dlvAwb}</span>
      ),
    },
    {
      title: "Action", key: "action",
      render: () => (
        <Button buttonStyle="tertiary" variant="info" size="sm" text="Ship Now" />
      ),
    },
  ];

  // Sort the full dataset, then slice for the current page
  const sortedData = React.useMemo(() => {
    const data = [...sortPaginationD1Data];
    if (!sortedInfo.columnKey || !sortedInfo.order) return data;
    const col = sortPagD1Columns.find((c) => c.key === sortedInfo.columnKey);
    if (!col || !col.sorter || typeof col.sorter !== "function") return data;
    const sorterFn = col.sorter as (a: SortPaginationD1Row, b: SortPaginationD1Row) => number;
    return data.sort((a, b) => {
      const result = sorterFn(a, b);
      return sortedInfo.order === "ascend" ? result : -result;
    });
  }, [sortedInfo]);

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, currentPage]);

  return (
    <Wrap>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Sort controls */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Button buttonStyle="secondary" variant="black" size="sm" text="Clear Sort" onClick={() => setSortedInfo({})} />
          <Button buttonStyle="secondary" variant="black" size="sm" text="Sort Order ID ↑" onClick={() => setSortedInfo({ columnKey: "orderId", order: "ascend" as SortOrder })} />
          <Button buttonStyle="secondary" variant="black" size="sm" text="Sort Item ↓" onClick={() => setSortedInfo({ columnKey: "item", order: "descend" as SortOrder })} />
          <Button buttonStyle="secondary" variant="black" size="sm" text="Sort Cost ↑" onClick={() => setSortedInfo({ columnKey: "cost", order: "ascend" as SortOrder })} />
          <Button buttonStyle="secondary" variant="black" size="sm" text="Go to Page 1" onClick={() => setCurrentPage(1)} />
        </div>

        {/* Status bar */}
        <Snackbar
          variant="info"
          snackbarStyle="filled"
          size="sm"
          message={`Sort: ${sortedInfo.columnKey ? `${String(sortedInfo.columnKey)} (${sortedInfo.order})` : "none"} · Page: ${currentPage} of ${Math.ceil(sortPaginationD1Data.length / 4)} · 4 per page · ${sortPaginationD1Data.length} total rows`}
          duration={0}
        />

        {/* D1 Standard table with sorting + pagination */}
        <div style={{ maxWidth: 1124, border: "1px solid #e6e6e6", borderRadius: 8, overflow: "hidden" }}>
          <TableSectionHeader
            title="Sorting + Pagination"
            subtext="Sort any column, then navigate pages to verify sorted order is preserved"
            showLeadingIcon
            leadingIcon={<TruckIcon />}
            badges={
              <>
                <Badge badgeType="subtle" variant="info" size="sm" text={`Page ${currentPage}`} />
                <Badge badgeType="subtle" variant="success" size="sm" text={sortedInfo.columnKey ? `Sorted: ${String(sortedInfo.columnKey)}` : "Unsorted"} />
              </>
            }
          />

          <Table
            columns={sortPagD1Columns as ColumnType<unknown>[]}
            dataSource={paginatedData}
            variant="default"
            size="medium"
            bordered={false}
            hoverable
            pagination={false}
            showHeader
            onChange={(_pagination, _filters, sorter) => {
              const s = Array.isArray(sorter) ? sorter[0] : sorter;
              setSortedInfo({ columnKey: s.columnKey, order: s.order });
            }}
          />

          <TableSectionFooter
            variant="2-cta-slot"
            actions={
              <>
                <Button buttonStyle="secondary" variant="black" size="md" text="Export" />
                <Button buttonStyle="primary" variant="black" size="md" text="Bulk Ship" />
              </>
            }
            slotContent={<div style={{ flex: "1 0 0", minWidth: 1 }} />}
          />

          <div style={{ padding: "8px 12px" }}>
            <Pagination
              paginationStyle="tarmac-01"
              cellStyle="legacyBlue"
              tarmacSize="md"
              showTextLeft
              showNumberCells
              showTextRight
              showDivider
              total={sortPaginationD1Data.length}
              pageSize={4}
              current={currentPage}
              onChange={(page) => page && setCurrentPage(page)}
              showTotal={(total) => `Showing ${total} orders`}
            />
          </div>
        </div>
      </div>
    </Wrap>
  );
};

export const SortingWithPaginationD1: Story = {
  name: "Table D1 — Sorting + Pagination",
  render: () => <SortPaginationD1Render />,
  parameters: {
    docs: {
      description: {
        story:
          "D1 Standard table demonstrating sorting + pagination interaction. " +
          "Sorting applies to the full dataset first, then the current page slice is rendered. " +
          "Click column headers or use the control buttons to sort, then navigate pages via the Tarmac Pagination component. " +
          "The info bar and header badges update live to show current sort and page state.",
      },
    },
  },
};
