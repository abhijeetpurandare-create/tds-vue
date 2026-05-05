import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SideNavigation, ThemeProvider } from "@delhivery/tarmac";
import type { SideNavigationProps } from "@delhivery/tarmac";

// ─── Theme Wrappers ───────────────────────────────────────────────────────────

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
    {children}
  </ThemeProvider>
);

// ─── Sample Icons ─────────────────────────────────────────────────────────────

const DashboardIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const OrdersIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h12v12H4V4z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FinanceIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6v8M8 8h3a1 1 0 010 2H9a1 1 0 000 2h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10a2 2 0 100-4 2 2 0 000 4zM10 13v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ReportsIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16V8l4-4h8v12H4z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 4v4H4M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.05 5.05l1.41 1.41M13.54 13.54l1.41 1.41M5.05 14.95l1.41-1.41M13.54 6.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4H4v12h4M13 7l3 3-3 3M7 10h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Interactive Playground ───────────────────────────────────────────────────

const PlaygroundRender: React.FC<SideNavigationProps> = (args) => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [ordersExpanded, setOrdersExpanded] = useState(false);

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <SideNavigation {...args}>
        <SideNavigation.Slot>
          <div style={{ padding: "8px 12px", fontSize: 10, opacity: 0.5 }}>LOGO</div>
        </SideNavigation.Slot>
        <SideNavigation.Group>
          <SideNavigation.Cell
            itemKey="dashboard"
            leadingIcon={<DashboardIcon />}
            label="Dashboard"
            isActive={activeKey === "dashboard"}
            onClick={() => setActiveKey("dashboard")}
          />
          <SideNavigation.TabCell
            itemKey="orders"
            leadingIcon={<OrdersIcon />}
            label="Orders & Pickup"
            isExpanded={ordersExpanded}
            onExpandedChange={setOrdersExpanded}
            subItems={
              <>
                <SideNavigation.Cell
                  itemKey="orders-all"
                  label="All Orders"
                  isActive={activeKey === "orders-all"}
                  onClick={() => setActiveKey("orders-all")}
                />
                <SideNavigation.Cell
                  itemKey="orders-pickup"
                  label="Pickup"
                  isActive={activeKey === "orders-pickup"}
                  onClick={() => setActiveKey("orders-pickup")}
                />
              </>
            }
          />
          <SideNavigation.Cell
            itemKey="finance"
            leadingIcon={<FinanceIcon />}
            label="Finance"
            isActive={activeKey === "finance"}
            onClick={() => setActiveKey("finance")}
          />
          <SideNavigation.Cell
            itemKey="support"
            leadingIcon={<SupportIcon />}
            label="Support"
            isActive={activeKey === "support"}
            onClick={() => setActiveKey("support")}
          />
          <SideNavigation.Cell
            itemKey="reports"
            leadingIcon={<ReportsIcon />}
            label="Reports"
            isActive={activeKey === "reports"}
            onClick={() => setActiveKey("reports")}
          />
        </SideNavigation.Group>
        <SideNavigation.Slot>
          <SideNavigation.Cell
            itemKey="settings"
            leadingIcon={<SettingsIcon />}
            label="Settings"
            isActive={activeKey === "settings"}
            onClick={() => setActiveKey("settings")}
          />
        </SideNavigation.Slot>
      </SideNavigation>
    </div>
  );
};

// ─── Reusable nav content builder ────────────────────────────────────────────

const NavContent: React.FC<{ navStyle?: string }> = ({ navStyle }) => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [ordersExpanded, setOrdersExpanded] = useState(false);

  return (
    <>
      <SideNavigation.Group>
        <SideNavigation.Cell
          leadingIcon={<DashboardIcon />}
          label="Dashboard"
          isActive={activeKey === "dashboard"}
          onClick={() => setActiveKey("dashboard")}
        />
        <SideNavigation.TabCell
          leadingIcon={<OrdersIcon />}
          label="Orders & Pickup"
          isExpanded={ordersExpanded}
          onExpandedChange={setOrdersExpanded}
          subItems={
            <>
              <SideNavigation.Cell label="All Orders" isActive={activeKey === "orders-all"} onClick={() => setActiveKey("orders-all")} />
              <SideNavigation.Cell label="Pickup" isActive={activeKey === "orders-pickup"} onClick={() => setActiveKey("orders-pickup")} />
            </>
          }
        />
        <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" isActive={activeKey === "finance"} onClick={() => setActiveKey("finance")} />
        <SideNavigation.Cell leadingIcon={<SupportIcon />} label="Support" isActive={activeKey === "support"} onClick={() => setActiveKey("support")} />
        <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" isActive={activeKey === "reports"} onClick={() => setActiveKey("reports")} />
      </SideNavigation.Group>
      <SideNavigation.Slot>
        <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" isActive={activeKey === "settings"} onClick={() => setActiveKey("settings")} />
        <SideNavigation.Cell leadingIcon={<LogoutIcon />} label="Logout" isActive={activeKey === "logout"} onClick={() => setActiveKey("logout")} />
      </SideNavigation.Slot>
    </>
  );
};

const DualNavContent: React.FC = () => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [ordersExpanded, setOrdersExpanded] = useState(false);

  return (
    <>
      <SideNavigation.Group>
        <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive={activeKey === "dashboard"} onClick={() => setActiveKey("dashboard")} />
        <SideNavigation.TabCell
          leadingIcon={<OrdersIcon />}
          label="Orders & Pickup"
          isExpanded={ordersExpanded}
          onExpandedChange={setOrdersExpanded}
          subItems={
            <>
              <SideNavigation.Cell label="All Orders" isActive={activeKey === "orders-all"} onClick={() => setActiveKey("orders-all")} />
              <SideNavigation.Cell label="Pickup" isActive={activeKey === "orders-pickup"} onClick={() => setActiveKey("orders-pickup")} />
            </>
          }
        />
        <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" isActive={activeKey === "finance"} onClick={() => setActiveKey("finance")} />
        <SideNavigation.Cell leadingIcon={<SupportIcon />} label="Support" isActive={activeKey === "support"} onClick={() => setActiveKey("support")} />
        <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" isActive={activeKey === "reports"} onClick={() => setActiveKey("reports")} />
      </SideNavigation.Group>
      <SideNavigation.Group>
        <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" isActive={activeKey === "settings"} onClick={() => setActiveKey("settings")} />
        <SideNavigation.Cell leadingIcon={<LogoutIcon />} label="Logout" isActive={activeKey === "logout"} onClick={() => setActiveKey("logout")} />
      </SideNavigation.Group>
    </>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: "Tarmac TDS/SideNavigation",
  component: SideNavigation as React.FC<SideNavigationProps>,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Story = StoryObj<any>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: { navStyle: "standard", navType: "single", isCollapsed: false },
  argTypes: {
    navStyle: { control: "select", options: ["standard", "coal", "d-one"] },
    navType: { control: "select", options: ["single", "dual"] },
    isCollapsed: { control: "boolean" },
  },
  render: (args: SideNavigationProps) => <PlaygroundRender {...args} />,
};

// ─── Shared app shell wrapper ─────────────────────────────────────────────────
const AppShell: React.FC<{ children: React.ReactNode; mainContent?: React.ReactNode }> = ({ children, mainContent }) => (
  <div style={{ height: "100vh", display: "flex" }}>
    {children}
    <div style={{ flex: 1, padding: 24, background: "#f9f9f9", overflow: "auto" }}>
      {mainContent ?? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ background: "#e8e8e8", borderRadius: 8, height: 60, display: "flex", alignItems: "center", paddingLeft: 16, color: "#999", fontSize: 13 }}>
              Content block {i + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ─── Single Set ───────────────────────────────────────────────────────────────
// Figma: NavGroup (flex:1) fills space, NavSlot at bottom is fixed

export const StandardExpanded: Story = {
  name: "Standard — Expanded",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="standard" navType="single">
        <NavContent navStyle="standard" />
      </SideNavigation>
    </AppShell>
  ),
};

export const StandardCollapsed: Story = {
  name: "Standard — Collapsed",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="standard" navType="single" isCollapsed>
        <NavContent navStyle="standard" />
      </SideNavigation>
    </AppShell>
  ),
};

export const CoalExpanded: Story = {
  name: "Coal — Expanded",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="coal" navType="single">
        <NavContent navStyle="coal" />
      </SideNavigation>
    </AppShell>
  ),
};

export const CoalCollapsed: Story = {
  name: "Coal — Collapsed",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="coal" navType="single" isCollapsed>
        <NavContent navStyle="coal" />
      </SideNavigation>
    </AppShell>
  ),
};

export const DOneExpanded: Story = {
  name: "D-One — Expanded",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="d-one" navType="single">
        <NavContent navStyle="d-one" />
      </SideNavigation>
    </AppShell>
  ),
};

export const DOneCollapsed: Story = {
  name: "D-One — Collapsed",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="d-one" navType="single" isCollapsed>
        <NavContent navStyle="d-one" />
      </SideNavigation>
    </AppShell>
  ),
};

// ─── Dual Set ─────────────────────────────────────────────────────────────────
// Figma: first NavGroup has flex:1 (grows), second NavGroup is fixed at bottom
// No divider — layout separation only

export const StandardDualSet: Story = {
  name: "Standard — Dual Set",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="standard" navType="dual">
        <DualNavContent />
      </SideNavigation>
    </AppShell>
  ),
};

export const CoalDualSet: Story = {
  name: "Coal — Dual Set",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="coal" navType="dual">
        <DualNavContent />
      </SideNavigation>
    </AppShell>
  ),
};

export const DOneDualSet: Story = {
  name: "D-One — Dual Set",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="d-one" navType="dual">
        <DualNavContent />
      </SideNavigation>
    </AppShell>
  ),
};

// ─── Slot ─────────────────────────────────────────────────────────────────────
// Figma: Slot at top (fixed, e.g. logo area), Slot 2 in middle (flex-grows, e.g. user profile)
// NavSlot at bottom is fixed (settings/logout)

export const WithSlots: Story = {
  name: "With Slots — Logo + Profile",
  parameters: { layout: "fullscreen" },
  render: () => {
    const [activeKey, setActiveKey] = useState("dashboard");
    return (
      <AppShell>
        <SideNavigation navStyle="standard" navType="single">
          {/* Slot 1 — top, fixed height (logo area) */}
          <SideNavigation.Slot>
            <div style={{ height: 50, display: "flex", alignItems: "center", padding: "0 12px", background: "#f0f8ff", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#2396fb" }}>
              LOGO
            </div>
          </SideNavigation.Slot>
          {/* NavGroup — grows to fill space */}
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive={activeKey === "dashboard"} onClick={() => setActiveKey("dashboard")} />
            <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders & Pickup" isActive={activeKey === "orders"} onClick={() => setActiveKey("orders")} />
            <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" isActive={activeKey === "finance"} onClick={() => setActiveKey("finance")} />
            <SideNavigation.Cell leadingIcon={<SupportIcon />} label="Support" isActive={activeKey === "support"} onClick={() => setActiveKey("support")} />
            <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" isActive={activeKey === "reports"} onClick={() => setActiveKey("reports")} />
          </SideNavigation.Group>
          {/* Slot 2 — bottom fixed (settings/logout) */}
          <SideNavigation.Slot>
            <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" isActive={activeKey === "settings"} onClick={() => setActiveKey("settings")} />
            <SideNavigation.Cell leadingIcon={<LogoutIcon />} label="Logout" isActive={activeKey === "logout"} onClick={() => setActiveKey("logout")} />
          </SideNavigation.Slot>
        </SideNavigation>
      </AppShell>
    );
  },
};

export const WithSlotsCollapsed: Story = {
  name: "With Slots — Collapsed",
  parameters: { layout: "fullscreen" },
  render: () => {
    const [activeKey, setActiveKey] = useState("dashboard");
    return (
      <AppShell>
        <SideNavigation navStyle="standard" navType="single" isCollapsed>
          <SideNavigation.Slot>
            <div style={{ height: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f8ff", borderRadius: 8 }}>
              <DashboardIcon />
            </div>
          </SideNavigation.Slot>
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive={activeKey === "dashboard"} onClick={() => setActiveKey("dashboard")} />
            <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders" isActive={activeKey === "orders"} onClick={() => setActiveKey("orders")} />
            <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" isActive={activeKey === "finance"} onClick={() => setActiveKey("finance")} />
            <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" isActive={activeKey === "reports"} onClick={() => setActiveKey("reports")} />
          </SideNavigation.Group>
          <SideNavigation.Slot>
            <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" isActive={activeKey === "settings"} onClick={() => setActiveKey("settings")} />
            <SideNavigation.Cell leadingIcon={<LogoutIcon />} label="Logout" isActive={activeKey === "logout"} onClick={() => setActiveKey("logout")} />
          </SideNavigation.Slot>
        </SideNavigation>
      </AppShell>
    );
  },
};

export const DualSetWithSlots: Story = {
  name: "Dual Set — With Slots",
  parameters: { layout: "fullscreen" },
  render: () => {
    const [activeKey, setActiveKey] = useState("dashboard");
    const [ordersExpanded, setOrdersExpanded] = useState(false);
    return (
      <AppShell>
        <SideNavigation navStyle="standard" navType="dual">
          {/* Top slot — logo */}
          <SideNavigation.Slot>
            <div style={{ height: 50, display: "flex", alignItems: "center", padding: "0 12px", background: "#f0f8ff", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#2396fb" }}>
              LOGO
            </div>
          </SideNavigation.Slot>
          {/* Primary group — grows */}
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive={activeKey === "dashboard"} onClick={() => setActiveKey("dashboard")} />
            <SideNavigation.TabCell
              leadingIcon={<OrdersIcon />}
              label="Orders & Pickup"
              isExpanded={ordersExpanded}
              onExpandedChange={setOrdersExpanded}
              subItems={
                <>
                  <SideNavigation.Cell label="All Orders" isActive={activeKey === "orders-all"} onClick={() => setActiveKey("orders-all")} />
                  <SideNavigation.Cell label="Pickup" isActive={activeKey === "orders-pickup"} onClick={() => setActiveKey("orders-pickup")} />
                </>
              }
            />
            <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" isActive={activeKey === "finance"} onClick={() => setActiveKey("finance")} />
            <SideNavigation.Cell leadingIcon={<SupportIcon />} label="Support" isActive={activeKey === "support"} onClick={() => setActiveKey("support")} />
            <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" isActive={activeKey === "reports"} onClick={() => setActiveKey("reports")} />
          </SideNavigation.Group>
          {/* Secondary group — fixed at bottom */}
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" isActive={activeKey === "settings"} onClick={() => setActiveKey("settings")} />
            <SideNavigation.Cell leadingIcon={<LogoutIcon />} label="Logout" isActive={activeKey === "logout"} onClick={() => setActiveKey("logout")} />
          </SideNavigation.Group>
        </SideNavigation>
      </AppShell>
    );
  },
};

// ─── Collapsible Toggle ───────────────────────────────────────────────────────

export const CollapsibleToggle: Story = {
  name: "Collapsible Toggle",
  parameters: { layout: "fullscreen" },
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <AppShell mainContent={<div style={{ padding: 16, color: "#666", fontSize: 14 }}>State: {collapsed ? "Collapsed" : "Expanded"}</div>}>
        <SideNavigation navStyle="standard" isCollapsed={collapsed}>
          <SideNavigation.Slot>
            <button
              onClick={() => setCollapsed(c => !c)}
              style={{ height: 32, boxSizing: "border-box", cursor: "pointer", fontSize: 12, width: "100%", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-end", background: "none", border: "1px solid #e6e6e6", borderRadius: 6, padding: "0 8px", flexShrink: 0 }}
            >
              {collapsed ? "→" : "← Collapse"}
            </button>
          </SideNavigation.Slot>
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" />
            <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders" />
            <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" />
            <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" isDisabled />
          </SideNavigation.Group>
        </SideNavigation>
      </AppShell>
    );
  },
};

export const DisabledItems: Story = {
  name: "Disabled Items",
  parameters: { layout: "fullscreen" },
  render: () => (
    <AppShell>
      <SideNavigation navStyle="standard">
        <SideNavigation.Group>
          <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive />
          <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders" isDisabled />
          <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" isDisabled />
          <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" />
        </SideNavigation.Group>
      </SideNavigation>
    </AppShell>
  ),
};

export const AllStylesComparison: Story = {
  name: "All Styles — Side by Side",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "flex", height: "100vh", background: "#f5f5f5" }}>
      {/* Standard */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 11, padding: "8px 12px", color: "#666", fontWeight: 600 }}>Standard</div>
        <SideNavigation navStyle="standard" style={{ flex: 1 }}>
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive />
            <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders & Pickup" />
            <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" />
            <SideNavigation.Cell leadingIcon={<SupportIcon />} label="Support" />
            <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" />
          </SideNavigation.Group>
          <SideNavigation.Slot>
            <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" />
          </SideNavigation.Slot>
        </SideNavigation>
      </div>
      {/* Coal */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 11, padding: "8px 12px", color: "#666", fontWeight: 600 }}>Coal</div>
        <SideNavigation navStyle="coal" style={{ flex: 1 }}>
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive />
            <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders & Pickup" />
            <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" />
            <SideNavigation.Cell leadingIcon={<SupportIcon />} label="Support" />
            <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" />
          </SideNavigation.Group>
          <SideNavigation.Slot>
            <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" />
          </SideNavigation.Slot>
        </SideNavigation>
      </div>
      {/* D-One */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 11, padding: "8px 12px", color: "#aaa", fontWeight: 600 }}>D-One</div>
        <SideNavigation navStyle="d-one" style={{ flex: 1 }}>
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive />
            <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders & Pickup" />
            <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" />
            <SideNavigation.Cell leadingIcon={<SupportIcon />} label="Support" />
            <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" />
          </SideNavigation.Group>
          <SideNavigation.Slot>
            <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" />
          </SideNavigation.Slot>
        </SideNavigation>
      </div>
      {/* Content area */}
      <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
        <div style={{ color: "#999", fontSize: 13 }}>Main content area</div>
      </div>
    </div>
  ),
};

// ─── State Matrix ─────────────────────────────────────────────────────────────
// Shows all navStyles × all states (default, hover, active/pressed, disabled)
// for both expanded and collapsed modes.
// Hover & pressed states are forced via CSS class injection so they render
// statically without requiring mouse interaction.

const STYLES = ['standard', 'coal', 'd-one'] as const;
const STATES = ['Default', 'Hover', 'Pressed', 'Disabled'] as const;

const styleLabel: Record<string, string> = {
  standard: 'Standard',
  coal: 'Coal',
  'd-one': 'D-One',
};

const styleBg: Record<string, string> = {
  standard: '#f5f5f5',
  coal: '#e8eaed',
  'd-one': '#1a1a1a',
};

const styleLabelColor: Record<string, string> = {
  standard: '#444',
  coal: '#444',
  'd-one': '#aaa',
};

// Injects a <style> block that forces :hover / :active on elements with
// data-force-state="hover" / "pressed" by targeting their button child.
const ForceStateStyles = () => (
  <style>{`
    [data-force-state="hover"] button { background-color: var(--force-hover-bg) !important; }
    [data-force-state="hover"] button { color: var(--force-hover-color) !important; }
    [data-force-state="pressed"] button { background-color: var(--force-pressed-bg) !important; }
    [data-force-state="pressed"] button { color: var(--force-pressed-color) !important; }
  `}</style>
);

// Per-style forced state tokens — hex-verified against tarmac-variables-full.json
const forceStateVars: Record<string, Record<string, React.CSSProperties>> = {
  standard: {
    // Surface/BG_Primary/Strongest=#f7f7f7, Surface/BG_Primary/Stronger=#f2f2f2
    Hover:   { '--force-hover-bg': '#f7f7f7',   '--force-hover-color': '#2b2b2b' } as React.CSSProperties,
    Pressed: { '--force-pressed-bg': '#f2f2f2', '--force-pressed-color': '#2b2b2b' } as React.CSSProperties,
  },
  coal: {
    // Surface/BG_Coal/Weaker=#eff1f5 (hoverBg=pressedBg=activeBg), Text/Coal/Primary=#333c50
    Hover:   { '--force-hover-bg': '#eff1f5',   '--force-hover-color': '#333c50' } as React.CSSProperties,
    Pressed: { '--force-pressed-bg': '#eff1f5', '--force-pressed-color': '#333c50' } as React.CSSProperties,
  },
  'd-one': {
    // hoverBg=Surface/BG_Coal Inverse/Strong=#333c50, pressedBg=Surface/BG_Coal/Weaker=#eff1f5
    Hover:   { '--force-hover-bg': '#333c50',   '--force-hover-color': '#f2f2f2' } as React.CSSProperties,
    Pressed: { '--force-pressed-bg': '#eff1f5', '--force-pressed-color': '#333c50' } as React.CSSProperties,
  },
};

const StateMatrixSection: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
    {STYLES.map((navStyle) => (
      <div key={navStyle}>
        {/* Style label */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 12 }}>
          {styleLabel[navStyle]}
        </div>
        {/* State columns */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', backgroundColor: styleBg[navStyle], padding: 16, borderRadius: 8 }}>
          {STATES.map((state) => {
            const isDisabled = state === 'Disabled';
            const isActive = state === 'Pressed';
            const forceState = state === 'Hover' ? 'hover' : state === 'Pressed' ? 'pressed' : undefined;
            const cssVars = forceState ? (forceStateVars[navStyle]?.[state] ?? {}) : {};

            return (
              <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {/* State label */}
                <div style={{ fontSize: 10, color: styleLabelColor[navStyle], marginBottom: 4 }}>{state}</div>
                {/* Nav wrapper */}
                <div
                  data-force-state={forceState}
                  style={{ ...cssVars, borderRadius: 8, overflow: 'hidden' }}
                >
                  <SideNavigation navStyle={navStyle} isCollapsed={collapsed} style={{ minHeight: 'auto' }}>
                    <SideNavigation.Group>
                      <SideNavigation.Cell
                        leadingIcon={<DashboardIcon />}
                        label="Dashboard"
                        isActive={isActive}
                        isDisabled={isDisabled}
                      />
                    </SideNavigation.Group>
                  </SideNavigation>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

export const StateMatrix: Story = {
  name: 'State Matrix — All Variants',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 48, padding: 24, fontFamily: 'sans-serif' }}>
      <ForceStateStyles />
      {/* Expanded */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 20, color: '#333' }}>Expanded</div>
        <StateMatrixSection collapsed={false} />
      </div>
      {/* Collapsed */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 20, color: '#333' }}>Collapsed</div>
        <StateMatrixSection collapsed={true} />
      </div>
    </div>
  ),
};

export const LightVsDarkMode: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 16 }}>
      <div>
        <div style={{ fontSize: 12, marginBottom: 8, color: "#666" }}>Light Mode</div>
        <SideNavigation navStyle="standard" style={{ height: 400 }}>
          <SideNavigation.Group>
            <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive />
            <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders" />
            <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" />
          </SideNavigation.Group>
        </SideNavigation>
      </div>
      <DarkWrap>
        <div>
          <div style={{ fontSize: 12, marginBottom: 8, color: "#aaa" }}>Dark Mode</div>
          <SideNavigation navStyle="standard" style={{ height: 400 }}>
            <SideNavigation.Group>
              <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive />
              <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders" />
              <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" />
            </SideNavigation.Group>
          </SideNavigation>
        </div>
      </DarkWrap>
    </div>
  ),
};

// ─── Hover to Expand ──────────────────────────────────────────────────────────

const HoverExpandRender: React.FC<{
  navStyle: string;
  hoverToExpand: boolean;
  expandMode: 'overlay' | 'push';
}> = ({ navStyle, hoverToExpand, expandMode }) => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const isOverlay = expandMode === 'overlay';

  const navNode = (
    <SideNavigation
      navStyle={navStyle as "standard" | "coal" | "d-one"}
      isCollapsed
      hoverToExpand={hoverToExpand}
      expandMode={expandMode}
    >
      <SideNavigation.Group>
        <SideNavigation.Cell leadingIcon={<DashboardIcon />} label="Dashboard" isActive={activeKey === "dashboard"} onClick={() => setActiveKey("dashboard")} />
        <SideNavigation.Cell leadingIcon={<OrdersIcon />} label="Orders & Pickup" isActive={activeKey === "orders"} onClick={() => setActiveKey("orders")} />
        <SideNavigation.Cell leadingIcon={<FinanceIcon />} label="Finance" isActive={activeKey === "finance"} onClick={() => setActiveKey("finance")} />
        <SideNavigation.Cell leadingIcon={<SupportIcon />} label="Support" isActive={activeKey === "support"} onClick={() => setActiveKey("support")} />
        <SideNavigation.Cell leadingIcon={<ReportsIcon />} label="Reports" isActive={activeKey === "reports"} onClick={() => setActiveKey("reports")} />
      </SideNavigation.Group>
      <SideNavigation.Slot>
        <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" isActive={activeKey === "settings"} onClick={() => setActiveKey("settings")} />
        <SideNavigation.Cell leadingIcon={<LogoutIcon />} label="Logout" isActive={activeKey === "logout"} onClick={() => setActiveKey("logout")} />
      </SideNavigation.Slot>
    </SideNavigation>
  );

  const content = (
    <div style={{ flex: 1, padding: 24, background: "#f9f9f9", display: "flex", flexDirection: "column", gap: 16, overflow: "auto", boxSizing: "border-box" }}>
      <div style={{ fontSize: 13, color: "#888" }}>
        Mode: <strong style={{ color: "#2b2b2b" }}>{expandMode}</strong> · Active: <strong style={{ color: "#2b2b2b" }}>{activeKey}</strong>
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{ background: "#e8e8e8", borderRadius: 8, height: 72, display: "flex", alignItems: "center", paddingLeft: 16, color: "#999", fontSize: 13 }}>
          Content block {i + 1}
        </div>
      ))}
    </div>
  );

  if (isOverlay) {
    // Overlay: nav is position:absolute, content fills full width
    return (
      <div style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        {navNode}
        <div style={{ height: "100%", paddingLeft: 80, boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
          {content}
        </div>
      </div>
    );
  }

  // Push: nav participates in flex layout, content shifts right
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      {navNode}
      {content}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HoverToExpand: any = {
  name: "Hover to Expand",
  parameters: { layout: "fullscreen" },
  argTypes: {
    navStyle: {
      control: "select",
      options: ["standard", "coal", "d-one"],
      description: "Visual style of the nav",
    },
    hoverToExpand: {
      control: "boolean",
      description: "Expand on hover, collapse on mouse leave",
    },
    expandMode: {
      control: "radio",
      options: ["overlay", "push"],
      description: "overlay — floats over content | push — shifts content right",
    },
  },
  args: {
    navStyle: "standard",
    hoverToExpand: true,
    expandMode: "overlay",
  },
  render: (args: { navStyle: string; hoverToExpand: boolean; expandMode: 'overlay' | 'push' }) => (
    <HoverExpandRender navStyle={args.navStyle} hoverToExpand={args.hoverToExpand} expandMode={args.expandMode} />
  ),
};

// ─── Status Dot ───────────────────────────────────────────────────────────────
// Shows the `status` prop on Cell and TabCell — renders a green dot indicator
// next to the label. Hidden automatically when the nav is collapsed.

export const StatusDotStory: Story = {
  name: 'Status — Dot Indicator',
  parameters: { layout: 'fullscreen' },
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <SideNavigation navStyle="standard" isCollapsed={collapsed}>
          <SideNavigation.Slot>
            <button
              onClick={() => setCollapsed(c => !c)}
              style={{ height: 32, boxSizing: 'border-box', cursor: 'pointer', fontSize: 12, width: '100%', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-end', background: 'none', border: '1px solid #e6e6e6', borderRadius: 6, padding: '0 8px', flexShrink: 0 }}
            >
              {collapsed ? '→' : '← Collapse'}
            </button>
          </SideNavigation.Slot>
          <SideNavigation.Group>
            {/* Cell with status dot */}
            <SideNavigation.Cell
              leadingIcon={<DashboardIcon />}
              label="Dashboard"
              status
              isActive
            />
            {/* Cell without status dot */}
            <SideNavigation.Cell
              leadingIcon={<OrdersIcon />}
              label="Orders"
            />
            {/* TabCell with status dot */}
            <SideNavigation.TabCell
              leadingIcon={<FinanceIcon />}
              label="Finance"
              status
              subItems={
                <>
                  <SideNavigation.Cell label="Invoices" />
                  <SideNavigation.Cell label="Payouts" />
                </>
              }
            />
            {/* TabCell without status dot */}
            <SideNavigation.TabCell
              leadingIcon={<ReportsIcon />}
              label="Reports"
              subItems={
                <>
                  <SideNavigation.Cell label="Weekly" />
                  <SideNavigation.Cell label="Monthly" />
                </>
              }
            />
            {/* Disabled cell with status dot */}
            <SideNavigation.Cell
              leadingIcon={<SupportIcon />}
              label="Support"
              status
              isDisabled
            />
          </SideNavigation.Group>
          <SideNavigation.Slot>
            <SideNavigation.Cell leadingIcon={<SettingsIcon />} label="Settings" status />
            <SideNavigation.Cell leadingIcon={<LogoutIcon />} label="Logout" />
          </SideNavigation.Slot>
        </SideNavigation>

        {/* Legend / description panel */}
        <div style={{ flex: 1, padding: 32, background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#2b2b2b' }}>Status dot indicator</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: '#555' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
              <span><strong>status=true</strong> — shows a green dot next to the label</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#e6e6e6', display: 'inline-block', flexShrink: 0 }} />
              <span><strong>status=false</strong> (default) — no dot rendered</span>
            </div>
            <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>
              The dot is hidden automatically when the nav is collapsed. Toggle collapse above to see it disappear.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Dashboard', status: true, note: 'Cell — status + active' },
              { label: 'Orders', status: false, note: 'Cell — no status' },
              { label: 'Finance', status: true, note: 'TabCell — status' },
              { label: 'Reports', status: false, note: 'TabCell — no status' },
              { label: 'Support', status: true, note: 'Cell — status + disabled' },
              { label: 'Settings', status: true, note: 'Slot Cell — status' },
            ].map(({ label, status, note }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: '#fff', borderRadius: 8, border: '1px solid #e6e6e6' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: status ? '#22c55e' : '#e6e6e6', flexShrink: 0 }} />
                <span style={{ fontWeight: 500, color: '#2b2b2b', minWidth: 80 }}>{label}</span>
                <span style={{ color: '#999', fontSize: 12 }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
