import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FAB, ThemeProvider } from "@delhivery/tarmac";

// ─── Reusable wrappers ──────────────────────────────────────────────────────

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

// ─── Sample icons ────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const OrderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AddCircleOutlineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

// AvatarPlaceholder removed — use avatarSrc/avatarInitials props on FAB.MenuItem instead

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

// ─── Constants ───────────────────────────────────────────────────────────────

const POSITIONS = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;
const VARIANTS = ["dark", "light", "info-blue"] as const;

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<any> = {
  title: "Tarmac TDS/FAB",
  component: FAB as any,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    position: { control: "select", options: [...POSITIONS] },
    zIndex: { control: "number" },
    showOverlay: { control: "boolean" },
    disableAnimation: { control: "boolean" },
    variant: { control: "select", options: [...VARIANTS] },
  },
  decorators: [(Story: React.ComponentType) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<any>;

// ─── Playground ─────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: "Playground",
  args: {
    position: "bottom-right",
    zIndex: 1050,
    showOverlay: false,
    disableAnimation: false,
    variant: "dark",
  },
  render: (args: any) => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <FAB {...args}>
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => console.log("New Order")} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => console.log("Upload")} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => console.log("Settings")} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Menu Open ──────────────────────────────────────────────────────────────

export const MenuOpen: Story = {
  name: "Menu Open",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <p style={{ padding: 24, color: "#666", fontSize: 14 }}>
        Click the FAB trigger to expand the menu and see all menu items.
      </p>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu aria-label="Quick actions">
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => console.log("New Order")} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => console.log("Upload")} />
          <FAB.MenuItem label="Edit" icon={<EditIcon />} onClick={() => console.log("Edit")} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => console.log("Settings")} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Variant: Dark ──────────────────────────────────────────────────────────

export const VariantDark: Story = {
  name: "Variant: Dark",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <p style={{ padding: 24, color: "#666", fontSize: 14 }}>
        Dark variant — black trigger with white icon, dark menu item cards.
      </p>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Variant: Light ─────────────────────────────────────────────────────────

export const VariantLight: Story = {
  name: "Variant: Light",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#e0e0e0" }}>
      <p style={{ padding: 24, color: "#666", fontSize: 14 }}>
        Light variant — white trigger with dark icon, white menu item cards.
      </p>
      <FAB position="bottom-right" variant="light">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Variant: Info Blue ─────────────────────────────────────────────────────

export const VariantInfoBlue: Story = {
  name: "Variant: Info Blue",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <p style={{ padding: 24, color: "#666", fontSize: 14 }}>
        Info Blue variant — blue trigger with white icon, white menu item cards with blue text.
      </p>
      <FAB position="bottom-right" variant="info-blue">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── All Variants Comparison ────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      {VARIANTS.map((v) => (
        <div key={v}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12, textTransform: "capitalize" }}>
            {v}
          </p>
          <Wrap>
            <div style={{ position: "relative", height: 320, background: v === "light" ? "#e0e0e0" : "#f5f5f5", borderRadius: 8, overflow: "hidden" }}>
              <FAB position="bottom-right" positionMode="absolute" variant={v} zIndex={1}>
                <FAB.Trigger icon={<PlusIcon />} size="md" />
                <FAB.Menu>
                  <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
                  <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
                  <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
                </FAB.Menu>
              </FAB>
            </div>
          </Wrap>
        </div>
      ))}
    </div>
  ),
};

// ─── Position Variants ──────────────────────────────────────────────────────

export const PositionTopLeft: Story = {
  name: "Position: Top Left",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <FAB position="top-left" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

export const PositionTopRight: Story = {
  name: "Position: Top Right",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <FAB position="top-right" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

export const PositionBottomLeft: Story = {
  name: "Position: Bottom Left",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <FAB position="bottom-left" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

export const PositionBottomRight: Story = {
  name: "Position: Bottom Right",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Keyboard Navigation ────────────────────────────────────────────────────

export const KeyboardNavigation: Story = {
  name: "Keyboard Navigation",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <div style={{ padding: 24, maxWidth: 480 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#333", marginBottom: 8 }}>
          Keyboard Navigation
        </h3>
        <ul style={{ fontSize: 13, color: "#666", lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Enter / Space</strong> — Toggle the FAB menu open or closed</li>
          <li><strong>Arrow Down</strong> — Move focus to the next menu item (wraps)</li>
          <li><strong>Arrow Up</strong> — Move focus to the previous menu item (wraps)</li>
          <li><strong>Tab / Shift+Tab</strong> — Cycle focus within menu items (trapped)</li>
          <li><strong>Escape</strong> — Close the menu and return focus to the trigger</li>
        </ul>
      </div>
      <FAB position="bottom-right" disableAnimation variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" aria-label="Actions menu" />
        <FAB.Menu aria-label="Quick actions">
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => console.log("New Order")} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => console.log("Upload")} />
          <FAB.MenuItem label="Edit" icon={<EditIcon />} onClick={() => console.log("Edit")} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => console.log("Settings")} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Overlay Backdrop ───────────────────────────────────────────────────────

export const OverlayBackdrop: Story = {
  name: "Overlay Backdrop",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <p style={{ padding: 24, color: "#666", fontSize: 14 }}>
        Click the FAB to open the menu with a semi-transparent overlay backdrop.
      </p>
      <FAB position="bottom-right" showOverlay variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Light vs Dark Mode ─────────────────────────────────────────────────────

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
        <Wrap>
          <div style={{ position: "relative", height: 320, background: "#f5f5f5", borderRadius: 8, overflow: "hidden" }}>
            <FAB position="bottom-right" positionMode="absolute" variant="dark" zIndex={1}>
              <FAB.Trigger icon={<PlusIcon />} size="md" />
              <FAB.Menu>
                <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
                <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
                <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
              </FAB.Menu>
            </FAB>
          </div>
        </Wrap>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
        <DarkWrap>
          <div style={{ position: "relative", height: 320, borderRadius: 8, overflow: "hidden" }}>
            <FAB position="bottom-right" positionMode="absolute" variant="dark" zIndex={1}>
              <FAB.Trigger icon={<PlusIcon />} size="md" />
              <FAB.Menu>
                <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
                <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
                <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
              </FAB.Menu>
            </FAB>
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};

// ─── Disabled Menu Items ────────────────────────────────────────────────────

export const DisabledMenuItems: Story = {
  name: "Disabled Menu Items",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <p style={{ padding: 24, color: "#666", fontSize: 14 }}>
        The "Upload" and "Settings" menu items are disabled.
      </p>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger icon={<PlusIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => console.log("New Order")} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => console.log("Upload")} isDisabled />
          <FAB.MenuItem label="Edit" icon={<EditIcon />} onClick={() => console.log("Edit")} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => console.log("Settings")} isDisabled />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Size Variants ──────────────────────────────────────────────────────────

export const SizeVariants: Story = {
  name: "Size Variants",
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 24, alignItems: "center", fontFamily: "Noto Sans, sans-serif" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>{size}</p>
          <Wrap>
            <div style={{ position: "relative", width: 80, height: 80, background: "#f5f5f5", borderRadius: 8 }}>
              <FAB position="bottom-right" positionMode="absolute" variant="dark" zIndex={1}>
                <FAB.Trigger icon={<PlusIcon />} openIcon={<CloseIcon />} size={size} />
              </FAB>
            </div>
          </Wrap>
        </div>
      ))}
    </div>
  ),
};


// ─── Extended Trigger ───────────────────────────────────────────────────────

export const ExtendedTrigger: Story = {
  name: "Extended Trigger",
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 24, alignItems: "center", fontFamily: "Noto Sans, sans-serif" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>{size}</p>
          <Wrap>
            <div style={{ position: "relative", width: 120, height: 80, background: "#f5f5f5", borderRadius: 8 }}>
              <FAB position="bottom-right" positionMode="absolute" variant="dark" zIndex={1}>
                <FAB.Trigger
                  icon={<AddCircleOutlineIcon />}
                  openIcon={<CloseIcon />}
                  size={size}
                  triggerType="extended"
                  label="Create"
                />
              </FAB>
            </div>
          </Wrap>
        </div>
      ))}
    </div>
  ),
};

// ─── Icon Swap (openIcon) ───────────────────────────────────────────────────

export const IconSwap: Story = {
  name: "Icon Swap (openIcon)",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <p style={{ padding: 24, color: "#666", fontSize: 14 }}>
        Click the FAB to see the icon swap from ⊕ (add-circle-outline) to ✕ (close).
        No rotation — the icon is swapped entirely.
      </p>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger
          icon={<AddCircleOutlineIcon />}
          openIcon={<CloseIcon />}
          size="lg"
        />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => console.log("New Order")} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => console.log("Upload")} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => console.log("Settings")} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Avatar Menu Items ──────────────────────────────────────────────────────

export const AvatarMenuItems: Story = {
  name: "Avatar Menu Items",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <p style={{ padding: 24, color: "#666", fontSize: 14 }}>
        Menu items with Tarmac Avatar (size=sm, shape=round) — image via avatarSrc, initials via avatarInitials.
      </p>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger icon={<AddCircleOutlineIcon />} openIcon={<CloseIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="Assign to me" icon={<OrderIcon />} avatarSrc="https://i.pravatar.cc/28" onClick={() => console.log("Assign")} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => console.log("Upload")} />
          <FAB.MenuItem label="Share" icon={<ShareIcon />} avatarInitials="DD" onClick={() => console.log("Share")} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Item Count: 3 Items ────────────────────────────────────────────────────

export const ThreeItems: Story = {
  name: "3 Menu Items",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger icon={<AddCircleOutlineIcon />} openIcon={<CloseIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Item Count: 4 Items ────────────────────────────────────────────────────

export const FourItems: Story = {
  name: "4 Menu Items",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger icon={<AddCircleOutlineIcon />} openIcon={<CloseIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Edit" icon={<EditIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Item Count: 5 Items ────────────────────────────────────────────────────

export const FiveItems: Story = {
  name: "5 Menu Items",
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#f5f5f5" }}>
      <FAB position="bottom-right" variant="dark">
        <FAB.Trigger icon={<AddCircleOutlineIcon />} openIcon={<CloseIcon />} size="md" />
        <FAB.Menu>
          <FAB.MenuItem label="New Order" icon={<OrderIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Upload" icon={<UploadIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Edit" icon={<EditIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Share" icon={<ShareIcon />} onClick={() => {}} />
          <FAB.MenuItem label="Settings" icon={<SettingsIcon />} onClick={() => {}} />
        </FAB.Menu>
      </FAB>
    </div>
  ),
};

// ─── Full Matrix ─────────────────────────────────────────────────────────────

const SIZES = ["sm", "md", "lg"] as const;
const TRIGGER_TYPES = ["default", "extended"] as const;

// A static FAB cell — renders a full interactive FAB in a bounded container.
// FAB is position:fixed so we use a small viewport-like box per cell.
const MatrixCell: React.FC<{
  variant: string;
  size: typeof SIZES[number];
  triggerType: typeof TRIGGER_TYPES[number];
  bg?: string;
}> = ({ variant, size, triggerType, bg = "transparent" }) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 64 }}>
    <Wrap>
      {/*
        FAB is position:fixed — we can't truly contain it in a cell.
        We render it in a small isolated iframe-like div using a CSS transform
        to create a new stacking context, which makes fixed children relative to this div.
      */}
      <div style={{ position: "relative", width: 80, height: 56, transform: "translateZ(0)", overflow: "hidden", background: bg, borderRadius: 6 }}>
        <FAB position="bottom-right" variant={variant} disableAnimation zIndex={1}>
          <FAB.Trigger
            icon={<PlusIcon />}
            openIcon={<CloseIcon />}
            size={size}
            triggerType={triggerType}
            label={triggerType === "extended" ? "Create" : undefined}
          />
        </FAB>
      </div>
    </Wrap>
  </div>
);

// Matrix row: one variant × all sizes × all trigger types
const MatrixRow: React.FC<{ variant: string; bg?: string }> = ({ variant, bg = "#f5f5f5" }) => (
  <div style={{ marginBottom: 32 }}>
    {/* Row header */}
    <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12, textTransform: "capitalize", letterSpacing: "0.02em" }}>
      Variant: {variant}
    </div>
    <div style={{ background: bg, borderRadius: 8, padding: "16px 24px" }}>
      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", gap: 8, marginBottom: 8 }}>
        <div />
        {TRIGGER_TYPES.flatMap((tt) =>
          SIZES.map((s) => (
            <div key={`${tt}-${s}`} style={{ fontSize: 11, color: "#6b7280", textAlign: "center" }}>
              {tt}/{s}
            </div>
          ))
        )}
      </div>
      {/* Closed state row */}
      <div style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", gap: 8, alignItems: "center" }}>
        <div style={{ fontSize: 11, color: "#6b7280" }}>Closed</div>
        {TRIGGER_TYPES.flatMap((tt) =>
          SIZES.map((s) => (
            <MatrixCell key={`${tt}-${s}`} variant={variant} size={s} triggerType={tt} bg={bg} />
          ))
        )}
      </div>
    </div>
  </div>
);

// ─── Drawer Button Story ─────────────────────────────────────────────────────

const DrawerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

function DrawerButtonDemo() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Wrap>
      <div style={{
        display: "flex",
        height: 480,
        width: "100%",
        background: "#f3f4f6",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        fontFamily: "Noto Sans, sans-serif",
      }}>
        {/* Side Drawer */}
        <div style={{
          width: drawerOpen ? 240 : 0,
          minWidth: 0,
          overflow: "hidden",
          transition: "width 0.25s ease-in-out",
          background: "#1f2937",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}>
          <div style={{ padding: "24px 16px", color: "#fff", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20, opacity: 0.6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Navigation
            </div>
            {["Dashboard", "Orders", "Shipments", "Reports", "Settings"].map((item) => (
              <div key={item} style={{
                padding: "10px 12px",
                borderRadius: 8,
                color: "#e5e7eb",
                fontSize: 14,
                cursor: "pointer",
                marginBottom: 4,
                transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* FAB used as a drawer toggle via positionMode="relative".
            Wrapped in an absolutely-positioned div that slides with the drawer.
            Clicking the FAB trigger toggles both the FAB open state and the drawer. */}
        <div
          onClick={() => setDrawerOpen((v) => !v)}
          style={{
            position: "absolute",
            left: drawerOpen ? 228 : 12,
            top: "50%",
            transform: "translateY(-50%)",
            transition: "left 0.25s ease-in-out",
            zIndex: 10,
          }}
        >
          <FAB positionMode="relative" position="bottom-right" zIndex={10} variant="dark">
            <FAB.Trigger
              icon={drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              size="sm"
              aria-label={drawerOpen ? "Close navigation" : "Open navigation"}
              iconRotation={0}
            />
          </FAB>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Main Content</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            Click the FAB button on the left edge to toggle the side drawer.
            Uses <code>positionMode="relative"</code> so the FAB stays inline instead of fixed to the viewport.
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{
                background: "#fff",
                borderRadius: 8,
                padding: "16px 20px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                fontSize: 13,
                color: "#374151",
                minWidth: 120,
              }}>
                Card {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrap>
  );
}

export const DrawerButton: Story = {
  name: "As Drawer Toggle Button",
  parameters: { layout: "padded" },
  render: () => <DrawerButtonDemo />,
};
