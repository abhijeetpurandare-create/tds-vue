import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popup, ThemeProvider, Button, Snackbar } from "@delhivery/tarmac";
import type { PopupProps } from "@delhivery/tarmac";
import { css } from "@emotion/css";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);
const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);
const POPUP_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
const BTN_SIZE: Record<string, "sm" | "md" | "lg"> = { xs: "sm", sm: "md", md: "md", lg: "md", xl: "md" };
const SlotContent: React.FC<{ h?: number }> = ({ h = 210 }) => (
  <div style={{ background: "#F7F7F7", margin: 16, borderRadius: 4, padding: 16, display: "flex",
    alignItems: "center", justifyContent: "center", height: h, color: "#999", fontSize: 12 }}>
    Slot: Replace with local component
  </div>
);
const TabBar: React.FC<{ tabs: string[]; activeIndex: number; onSelect: (i: number) => void; size?: "lg" | "sm" }> = ({ tabs, activeIndex, onSelect, size = "lg" }) => {
  const isLg = size === "lg";
  return (
    <div className={css({ display: "flex", width: "100%", backgroundColor: "#fff" })}>
      {tabs.map((label, i) => (
        <button key={i} type="button" onClick={() => onSelect(i)}
          className={css({ display: "flex", alignItems: "center", gap: isLg ? 8 : 6, padding: isLg ? "12px 16px" : "8px 12px",
            fontFamily: "inherit", fontSize: isLg ? 14 : 12, fontWeight: i === activeIndex ? 600 : 500,
            color: "#2B2B2B", background: "#fff", border: "none", borderBottom: i === activeIndex ? "2px solid #1A1A1A" : "2px solid transparent", cursor: "pointer" })}>
          {label}
        </button>
      ))}
    </div>
  );
};
const AddCircleIcon24: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#2B2B2B"/></svg>
);
const WarningIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.33337 4.66663H8.66671V5.99996H7.33337V4.66663ZM7.33337 7.33329H8.66671V11.3333H7.33337V7.33329ZM8.00004 1.33329C4.32004 1.33329 1.33337 4.31996 1.33337 7.99996C1.33337 11.68 4.32004 14.6666 8.00004 14.6666C11.68 14.6666 14.6667 11.68 14.6667 7.99996C14.6667 4.31996 11.68 1.33329 8.00004 1.33329ZM8.00004 13.3333C5.06004 13.3333 2.66671 10.94 2.66671 7.99996C2.66671 5.05996 5.06004 2.66663 8.00004 2.66663C10.94 2.66663 13.3334 5.05996 13.3334 7.99996C13.3334 10.94 10.94 13.3333 8.00004 13.3333Z" fill="#7B6414"/></svg>
);

const meta: Meta<PopupProps> = {
  title: "Tarmac TDS/Popup",
  component: Popup,
  parameters: { layout: "fullscreen", docs: { story: { inline: true, iframeHeight: 800 }, toc: true,
    description: { component: 'A modal container that overlays content to focus user attention on a task or decision. Uses [PopupHeaderFooter](?path=/docs/tarmac-tds-popupheaderfooter--docs) for header and footer sections.' } } },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: [...POPUP_SIZES], description: "Popup width preset" },
    title: { control: "text", description: "Header title text" },
    subtext: { control: "text", description: "Header subtext" },
    showSubtext: { control: "boolean", description: "Show/hide subtext" },
    showFooter: { control: "boolean", description: "Show/hide footer" },
    showSnackbar: { control: "boolean", description: "Show/hide snackbar slot" },
    showTabs: { control: "boolean", description: "Show/hide tabs slot" },
    closeOnOverlay: { control: "boolean", description: "Dismiss on overlay click" },
    closeOnEsc: { control: "boolean", description: "Dismiss on Escape key" },
    className: { control: "text", description: "Additional CSS class" },
  },
  decorators: [(Story) => <><style>{`.sbdocs-content { max-width: 1100px !important; }`}</style><Wrap><Story /></Wrap></>],
};
export default meta;
type Story = StoryObj<PopupProps>;

/* ═══ 1. PLAYGROUND ═══ */
export const Playground: Story = {
  name: "Playground",
  args: { size: "sm", title: "Heading goes here", subtext: "Subtext goes here",
    showFooter: true, showSubtext: true, showSnackbar: false, showTabs: false, closeOnOverlay: true, closeOnEsc: true },
  render: (args) => {
    const sz = BTN_SIZE[args.size || "md"] || "md";
    return (
      <div style={{ padding: 24 }}>
        <Popup {...args} isOpen renderInline
          snackbar={<Snackbar variant="warning" snackbarStyle="filled" size="sm" message="More info about this info alert goes here." leadingIcon={<WarningIcon />} duration={0} trailingIcon={false} />}
          tabs={<TabBar tabs={["Tab 1", "Tab 2", "Tab 3", "Tab 4"]} activeIndex={0} onSelect={() => {}} size={args.size === "xs" ? "sm" : "lg"} />}
          leadingIcon={<AddCircleIcon24 />}
          footerCtasRight={<><Button variant="black" buttonStyle="secondary" size={sz} text="Action" /><Button variant="black" buttonStyle="primary" size={sz} text="Action" /></>}>
          <SlotContent h={args.size === "xs" ? 133 : 210} />
        </Popup>
      </div>
    );
  },
};

/* ═══ 2. SIZES ═══ */
const SizeDemo: React.FC<{ size: string; label: string }> = ({ size, label }) => {
  const sz = BTN_SIZE[size] || "md";
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ marginBottom: 12, fontSize: 16 }}>{label}</h3>
      <Popup isOpen renderInline size={size} title="Heading goes here" subtext="Subtext goes here" showFooter
        footerCtasRight={<><Button variant="black" buttonStyle="secondary" size={sz} text="Action" /><Button variant="black" buttonStyle="primary" size={sz} text="Action" /></>}>
        <SlotContent h={size === "xs" ? 133 : 210} />
      </Popup>
    </div>
  );
};
export const XSmall: Story = { name: "XSmall", render: () => <div style={{ padding: 24 }}><SizeDemo size="xs" label="XSmall — 328px" /></div> };
export const Small: Story = { name: "Small", render: () => <div style={{ padding: 24 }}><SizeDemo size="sm" label="Small — 416px" /></div> };
export const Medium: Story = { name: "Medium", render: () => <div style={{ padding: 24 }}><SizeDemo size="md" label="Medium — 632px" /></div> };
export const Large: Story = { name: "Large", render: () => <div style={{ padding: 24 }}><SizeDemo size="lg" label="Large — 848px" /></div> };
export const XLarge: Story = { name: "XLarge", render: () => <div style={{ padding: 24 }}><SizeDemo size="xl" label="XLarge — 1064px" /></div> };
export const AllSizes: Story = { name: "All Sizes", render: () => (
  <div style={{ padding: 24 }}>{POPUP_SIZES.map((s) => <SizeDemo key={s} size={s} label={`${s.toUpperCase()} (${{ xs: "328px", sm: "416px", md: "632px", lg: "848px", xl: "1064px" }[s]})`} />)}</div>
)};

/* ═══ 3. WITH TABS ═══ */
export const WithTabs: Story = { name: "With Tabs", render: () => {
  const [tab, setTab] = useState(0);
  return (<div style={{ padding: 24 }}><Popup isOpen renderInline size="sm" title="Heading goes here" subtext="Subtext goes here" showFooter showTabs
    tabs={<TabBar tabs={["Tab 1", "Tab 2", "Tab 3", "Tab 4"]} activeIndex={tab} onSelect={setTab} size="lg" />}
    footerCtasRight={<><Button variant="black" buttonStyle="secondary" size="md" text="Action" /><Button variant="black" buttonStyle="primary" size="md" text="Action" /></>}>
    <SlotContent /></Popup></div>);
}};

/* ═══ 4. WITH SNACKBAR ═══ */
export const WithSnackbar: Story = { name: "With Snackbar", render: () => (
  <div style={{ padding: 24 }}><Popup isOpen renderInline size="sm" title="Heading goes here" subtext="Subtext goes here" showFooter showSnackbar
    snackbar={<Snackbar variant="warning" snackbarStyle="filled" size="sm" message="More info about this info alert goes here." leadingIcon={<WarningIcon />} duration={0} trailingIcon={false} />}
    footerCtasRight={<><Button variant="black" buttonStyle="secondary" size="md" text="Action" /><Button variant="black" buttonStyle="primary" size="md" text="Action" /></>}>
    <SlotContent /></Popup></div>
)};

/* ═══ 5. FULL POPUP ═══ */
export const FullPopup: Story = { name: "Full Popup (Snackbar + Tabs + Footer)", render: () => {
  const [tab, setTab] = useState(0);
  return (<div style={{ padding: 24 }}>
    <h3 style={{ marginBottom: 12, fontSize: 16 }}>XSmall</h3>
    <Popup isOpen renderInline size="xs" title="Heading goes here" subtext="Subtext goes here" showFooter showSnackbar showTabs
      snackbar={<Snackbar variant="warning" snackbarStyle="filled" size="sm" message="More info about this info alert goes here." leadingIcon={<WarningIcon />} duration={0} trailingIcon={false} />}
      tabs={<TabBar tabs={["Title goes", "Title goes", "Title goes", "Title goes"]} activeIndex={tab} onSelect={setTab} size="sm" />}
      footerCtasRight={<><Button variant="black" buttonStyle="secondary" size="sm" text="Action" /><Button variant="black" buttonStyle="primary" size="sm" text="Action" /></>}>
      <SlotContent h={133} /></Popup>
    <div style={{ height: 32 }} />
    <h3 style={{ marginBottom: 12, fontSize: 16 }}>Small</h3>
    <Popup isOpen renderInline size="sm" title="Heading goes here" subtext="Subtext goes here" showFooter showSnackbar showTabs
      snackbar={<Snackbar variant="warning" snackbarStyle="filled" size="sm" message="More info about this info alert goes here." leadingIcon={<WarningIcon />} duration={0} trailingIcon={false} />}
      tabs={<TabBar tabs={["Tab 1", "Tab 2", "Tab 3", "Tab 4"]} activeIndex={tab} onSelect={setTab} size="lg" />}
      footerCtasRight={<><Button variant="black" buttonStyle="secondary" size="md" text="Action" /><Button variant="black" buttonStyle="primary" size="md" text="Action" /></>}>
      <SlotContent /></Popup>
  </div>);
}};

/* ═══ 6. WITHOUT FOOTER ═══ */
export const WithoutFooter: Story = { name: "Without Footer", render: () => (
  <div style={{ padding: 24 }}><Popup isOpen renderInline size="sm" title="Heading goes here" subtext="Subtext goes here" showFooter={false}><SlotContent /></Popup></div>
)};

/* ═══ 7. LIGHT VS DARK ═══ */
export const LightVsDark: Story = { name: "Light vs Dark Mode", render: () => (
  <div style={{ display: "flex", gap: 32, padding: 24, flexWrap: "wrap" }}>
    <div><h3 style={{ marginBottom: 12 }}>Light</h3><Wrap>
      <Popup isOpen renderInline size="sm" title="Heading goes here" subtext="Subtext goes here" showFooter
        footerCtasRight={<><Button variant="black" buttonStyle="secondary" size="md" text="Action" /><Button variant="black" buttonStyle="primary" size="md" text="Action" /></>}>
        <SlotContent /></Popup></Wrap></div>
    <div><h3 style={{ marginBottom: 12, color: "#fff" }}>Dark</h3><DarkWrap>
      <Popup isOpen renderInline size="sm" title="Heading goes here" subtext="Subtext goes here" showFooter
        footerCtasRight={<><Button variant="black" buttonStyle="secondary" size="md" text="Action" /><Button variant="black" buttonStyle="primary" size="md" text="Action" /></>}>
        <SlotContent /></Popup></DarkWrap></div>
  </div>
)};
