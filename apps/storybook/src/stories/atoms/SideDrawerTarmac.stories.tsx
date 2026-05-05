import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SideDrawer, ThemeProvider, Button, Snackbar, Badge } from "@delhivery/tarmac";
import type { SideDrawerProps } from "@delhivery/tarmac";

const VARIANTS = ["narrow", "extended"] as const;

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

/* ── Icons ─────────────────────────────────────────────────────────────────── */
const InfoIcon16 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.33 4.67h1.34V6H7.33V4.67Zm0 2.66h1.34v4H7.33v-4ZM8 1.33A6.67 6.67 0 1 0 8 14.67 6.67 6.67 0 0 0 8 1.33Zm0 12A5.34 5.34 0 1 1 8 2.67a5.34 5.34 0 0 1 0 10.66Z" fill="currentColor" />
  </svg>
);

const AddCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
  </svg>
);

/* ── Shared slot content ────────────────────────────────────────────────────── */
const SampleSnackbar = (
  <Snackbar variant="warning" snackbarStyle="filled" size="sm"
    message="More info about this info alert goes here." duration={0}
    trailingIcon={false} leadingIcon={<InfoIcon16 />} />
);

const SampleTabs = () => (
  <div style={{ display: "flex", background: "#fff" }}>
    {["Tab 1", "Tab 2", "Tab 3", "Tab 4"].map((tab, i) => (
      <div key={tab} style={{
        padding: "12px 16px", fontSize: 14, fontWeight: i === 0 ? 600 : 500,
        fontFamily: "Noto Sans, sans-serif", color: "#2B2B2B",
        borderBottom: i === 0 ? "2px solid #1A1A1A" : "none", cursor: "pointer",
      }}>{tab}</div>
    ))}
  </div>
);

const SlotContent = ({ height = 500 }: { height?: number }) => (
  <div style={{
    background: "#F7F7F7", borderRadius: 4, display: "flex",
    alignItems: "center", justifyContent: "center", minHeight: height,
    color: "#999", fontSize: 12, fontFamily: "Noto Sans, sans-serif",
  }}>Slot: Replace with local component</div>
);

const FooterCtas = (
  <>
    <Button buttonStyle="secondary" variant="black" size="md" text="Action" />
    <Button buttonStyle="primary" variant="black" size="md" text="Action" />
  </>
);

/* ── Meta ───────────────────────────────────────────────────────────────────── */
const meta: Meta<any> = {
  title: "Tarmac TDS/Side Drawer",
  component: SideDrawer as any,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<any>;

/* ── 1. Playground ──────────────────────────────────────────────────────────── */
const PlaygroundRender: React.FC<SideDrawerProps & {
  showSnackbar?: boolean; showTabs?: boolean; showFooter?: boolean;
}> = ({ showSnackbar, showTabs, showFooter, ...args }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24 }}>
      <Button buttonStyle="primary" variant="black" size="md"
        text="Open Side Drawer" onClick={() => setOpen(true)} />
      <SideDrawer {...args} isOpen={open} onClose={() => setOpen(false)}>
        <SideDrawer.Header title="Heading goes here" subtext="Subtext goes here" />
        {showSnackbar && <SideDrawer.Snackbar>{SampleSnackbar}</SideDrawer.Snackbar>}
        {showTabs && <SideDrawer.Tabs><SampleTabs /></SideDrawer.Tabs>}
        <SideDrawer.Content><SlotContent /></SideDrawer.Content>
        {showFooter && <SideDrawer.Footer ctasRight={FooterCtas} />}
      </SideDrawer>
    </div>
  );
};

export const Playground = {
  name: "Playground",
  args: {
    variant: "narrow",
    showSnackbar: true,
    showTabs: true,
    showFooter: true,
    closeOnOverlay: true,
    closeOnEsc: true,
  },
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    showSnackbar: { control: "boolean" },
    showTabs: { control: "boolean" },
    showFooter: { control: "boolean" },
    closeOnOverlay: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
  },
  render: (args: any) => <PlaygroundRender {...args} />,
};

/* ── Inline helper ──────────────────────────────────────────────────────────── */
interface InlineProps {
  label?: string;
  height?: number;
  variant?: "narrow" | "extended";
  withSnackbar?: boolean;
  withTabs?: boolean;
  withFooter?: boolean;
  headerLeadingIcon?: React.ReactNode;
  headerBadges?: React.ReactNode;
  footerCtaLeft?: React.ReactNode;
  footerLink?: React.ReactNode;
  headerFooterSize?: "sm" | "md" | "lg";
}

const InlineDrawer: React.FC<InlineProps> = ({
  label, height = 600, variant = "narrow",
  withSnackbar, withTabs, withFooter,
  headerLeadingIcon, headerBadges,
  footerCtaLeft, footerLink,
  headerFooterSize = "md",
}) => (
  <div style={{ marginBottom: 24 }}>
    {label && (
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, fontFamily: "Noto Sans, sans-serif", color: "#666" }}>
        {label}
      </div>
    )}
    <SideDrawer isOpen renderInline variant={variant}>
      <SideDrawer.Header
        title="Heading goes here"
        subtext="Subtext goes here"
        size={headerFooterSize}
        leadingIcon={headerLeadingIcon}
        badges={headerBadges}
      />
      {withSnackbar && <SideDrawer.Snackbar>{SampleSnackbar}</SideDrawer.Snackbar>}
      {withTabs && <SideDrawer.Tabs><SampleTabs /></SideDrawer.Tabs>}
      <SideDrawer.Content><SlotContent height={height} /></SideDrawer.Content>
      {withFooter && (
        <SideDrawer.Footer
          size={headerFooterSize}
          ctasRight={FooterCtas}
          ctaLeft={footerCtaLeft}
          link={footerLink}
        />
      )}
    </SideDrawer>
  </div>
);

/* ── 2. Narrow Variant ──────────────────────────────────────────────────────── */
export const NarrowVariant: Story = {
  name: "Narrow Variant",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      <InlineDrawer label="All Sections" variant="narrow" withSnackbar withTabs withFooter />
      <InlineDrawer label="No Snackbar / No Tabs" variant="narrow" withFooter />
      <InlineDrawer label="Content Only" variant="narrow" />
    </div>
  ),
};

/* ── 3. Extended Variant ────────────────────────────────────────────────────── */
export const ExtendedVariant: Story = {
  name: "Extended Variant",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      <InlineDrawer label="All Sections" variant="extended" withSnackbar withTabs withFooter />
      <InlineDrawer label="No Snackbar / No Tabs" variant="extended" withFooter />
    </div>
  ),
};

/* ── 4. Header Props ────────────────────────────────────────────────────────── */
export const HeaderProps: Story = {
  name: "Header Props",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      <InlineDrawer label="Title + Subtext" height={300} />
      <InlineDrawer label="With Leading Icon" height={300} headerLeadingIcon={<AddCircleIcon />} />
      <InlineDrawer label="With Badges" height={300}
        headerBadges={<><Badge badgeType="subtle" variant="info" size="sm" text="v2.1" /><Badge badgeType="subtle" variant="success" size="sm" text="Live" /></>} />
      <InlineDrawer label="Leading Icon + Badges" height={300}
        headerLeadingIcon={<AddCircleIcon />}
        headerBadges={<Badge badgeType="subtle" variant="info" size="sm" text="Draft" />} />
    </div>
  ),
};

/* ── 5. Footer Props ────────────────────────────────────────────────────────── */
export const FooterProps: Story = {
  name: "Footer Props",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      <InlineDrawer label="CTAs Right" height={300} withFooter />
      <InlineDrawer label="CTA Left + CTAs Right" height={300} withFooter
        footerCtaLeft={<Button buttonStyle="tertiary" variant="black" size="md" text="Back" />} />
      <InlineDrawer label="Link + CTAs Right" height={300} withFooter
        footerLink={<a href="#" style={{ fontSize: 12, color: "#2396FB", fontFamily: "Noto Sans, sans-serif", textDecoration: "none" }}>Learn more</a>} />
      <InlineDrawer label="No Footer" height={300} />
    </div>
  ),
};

/* ── 6. Boolean Toggles ─────────────────────────────────────────────────────── */
export const BooleanToggles: Story = {
  name: "Boolean Toggles",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      <InlineDrawer label="All On" height={400} withSnackbar withTabs withFooter />
      <InlineDrawer label="All Off" height={400} />
      <InlineDrawer label="Footer + Tabs" height={400} withTabs withFooter />
      <InlineDrawer label="Footer + Snackbar" height={400} withSnackbar withFooter />
    </div>
  ),
};

/* ── 7. Header/Footer Sizes ─────────────────────────────────────────────────── */
export const HeaderFooterSizes: Story = {
  name: "Header/Footer Sizes",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      {(["sm", "md", "lg"] as const).map((sz) => (
        <InlineDrawer key={sz} label={`size="${sz}"`} height={350} withFooter headerFooterSize={sz} />
      ))}
    </div>
  ),
};

/* ── 8. Full Matrix ─────────────────────────────────────────────────────────── */
export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
      {VARIANTS.map((v) => (
        <div key={v}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, fontFamily: "Noto Sans, sans-serif", textTransform: "capitalize" }}>{v}</h3>
          <InlineDrawer variant={v} withSnackbar withTabs withFooter />
        </div>
      ))}
    </div>
  ),
};

/* ── 9. Light vs Dark Mode ──────────────────────────────────────────────────── */
export const LightVsDarkMode: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, fontFamily: "Noto Sans, sans-serif" }}>Light Mode</div>
        <Wrap>
          <SideDrawer isOpen renderInline variant="narrow">
            <SideDrawer.Header title="Heading goes here" subtext="Subtext goes here" />
            <SideDrawer.Snackbar>{SampleSnackbar}</SideDrawer.Snackbar>
            <SideDrawer.Tabs><SampleTabs /></SideDrawer.Tabs>
            <SideDrawer.Content><SlotContent height={300} /></SideDrawer.Content>
            <SideDrawer.Footer ctasRight={FooterCtas} />
          </SideDrawer>
        </Wrap>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, fontFamily: "Noto Sans, sans-serif" }}>Dark Mode</div>
        <DarkWrap>
          <SideDrawer isOpen renderInline variant="narrow">
            <SideDrawer.Header title="Heading goes here" subtext="Subtext goes here" />
            <SideDrawer.Snackbar>{SampleSnackbar}</SideDrawer.Snackbar>
            <SideDrawer.Tabs><SampleTabs /></SideDrawer.Tabs>
            <SideDrawer.Content><SlotContent height={300} /></SideDrawer.Content>
            <SideDrawer.Footer ctasRight={FooterCtas} />
          </SideDrawer>
        </DarkWrap>
      </div>
    </div>
  ),
};

/* ── 10. Portal Overlay (Interactive) ───────────────────────────────────────── */
const PortalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<"narrow" | "extended">("narrow");
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Button buttonStyle="primary" variant="black" size="md" text="Open Narrow"
          onClick={() => { setVariant("narrow"); setOpen(true); }} />
        <Button buttonStyle="secondary" variant="black" size="md" text="Open Extended"
          onClick={() => { setVariant("extended"); setOpen(true); }} />
      </div>
      <p style={{ fontFamily: "Noto Sans, sans-serif", fontSize: 14, color: "#666" }}>
        Click a button to open the Side Drawer as a portal overlay. Click the overlay or press Escape to close.
      </p>
      <SideDrawer isOpen={open} onClose={() => setOpen(false)} variant={variant}>
        <SideDrawer.Header title="Heading goes here" subtext="Subtext goes here" />
        <SideDrawer.Snackbar>{SampleSnackbar}</SideDrawer.Snackbar>
        <SideDrawer.Tabs><SampleTabs /></SideDrawer.Tabs>
        <SideDrawer.Content><SlotContent /></SideDrawer.Content>
        <SideDrawer.Footer ctasRight={FooterCtas} />
      </SideDrawer>
    </div>
  );
};

export const PortalOverlay: Story = {
  name: "Portal Overlay (Interactive)",
  render: () => <PortalDemo />,
};


/* ── 11. Header Playground ──────────────────────────────────────────────────── */
interface HeaderPlaygroundArgs {
  title: string;
  subtext: string;
  showSubtext: boolean;
  size: "sm" | "md" | "lg";
}

const HeaderPlaygroundRender: React.FC<HeaderPlaygroundArgs> = ({
  title, subtext, showSubtext, size,
}) => (
  <div style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)", borderRadius: 8, overflow: "hidden" }}>
    <SideDrawer isOpen renderInline variant="narrow">
      <SideDrawer.Header title={title} subtext={subtext} showSubtext={showSubtext} size={size} />
      <SideDrawer.Content><SlotContent height={200} /></SideDrawer.Content>
    </SideDrawer>
  </div>
);

export const HeaderPlayground = {
  name: "Header Playground",
  parameters: { layout: "centered" },
  args: { title: "Heading goes here", subtext: "Subtext goes here", showSubtext: true, size: "md" },
  argTypes: {
    title: { control: "text" },
    subtext: { control: "text" },
    showSubtext: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  render: (args: HeaderPlaygroundArgs) => <HeaderPlaygroundRender {...args} />,
};

/* ── 12. Footer Playground ──────────────────────────────────────────────────── */
interface FooterPlaygroundArgs {
  size: "sm" | "md" | "lg";
  showCtaLeft: boolean;
  showLink: boolean;
  primaryLabel: string;
  secondaryLabel: string;
}

const FooterPlaygroundRender: React.FC<FooterPlaygroundArgs> = ({
  size, showCtaLeft, showLink, primaryLabel, secondaryLabel,
}) => (
  <div style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)", borderRadius: 8, overflow: "hidden" }}>
    <SideDrawer isOpen renderInline variant="narrow">
      <SideDrawer.Header title="Heading goes here" subtext="Subtext goes here" size={size} />
      <SideDrawer.Content><SlotContent height={200} /></SideDrawer.Content>
      <SideDrawer.Footer
        size={size}
        ctasRight={
          <>
            <Button buttonStyle="secondary" variant="black" size={size} text={secondaryLabel} />
            <Button buttonStyle="primary" variant="black" size={size} text={primaryLabel} />
          </>
        }
        ctaLeft={showCtaLeft
          ? <Button buttonStyle="tertiary" variant="black" size={size} text="Back" />
          : undefined}
        link={showLink
          ? <a href="#" style={{ fontSize: 12, color: "#2396FB", fontFamily: "Noto Sans, sans-serif", textDecoration: "none" }}>Learn more</a>
          : undefined}
      />
    </SideDrawer>
  </div>
);

export const FooterPlayground = {
  name: "Footer Playground",
  parameters: { layout: "centered" },
  args: { size: "md", showCtaLeft: false, showLink: false, primaryLabel: "Action", secondaryLabel: "Action" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    showCtaLeft: { control: "boolean" },
    showLink: { control: "boolean" },
    primaryLabel: { control: "text" },
    secondaryLabel: { control: "text" },
  },
  render: (args: FooterPlaygroundArgs) => <FooterPlaygroundRender {...args} />,
};
