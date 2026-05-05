import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumbs,
  BreadcrumbCell,
  ThemeProvider,
  useTheme,
  AddCircleIcon20,
  AddCircleIcon16,
  Pill,
} from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { BreadcrumbsProps, BreadcrumbCellProps } from "@delhivery/tarmac";

type ShowcaseState = "default" | "hover" | "pressed" | "disabled" | "ghost";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const ShowcaseCell: React.FC<BreadcrumbCellProps & { showcaseState: ShowcaseState }> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const vc = theme.components?.breadcrumbs?.styles?.[props.style || "black"] || {};
  if (showcaseState === "default") return <BreadcrumbCell {...props} />;
  if (showcaseState === "disabled") return <BreadcrumbCell {...props} isDisabled />;
  if (showcaseState === "ghost") return <BreadcrumbCell {...props} isGhost />;
  const o: Record<string, string | number> = {};
  if (showcaseState === "hover") { o.color = vc.hoverTextColor || "#121212"; o.fontWeight = 500; }
  else if (showcaseState === "pressed") { o.color = vc.pressedTextColor || "#2B2B2B"; o.fontWeight = 500; }
  return <BreadcrumbCell {...props} isCurrent={showcaseState === "pressed"} className={css(o)} />;
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <span style={{ width: 70, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{label}</span>
    {children}
  </div>
);

const meta: Meta<BreadcrumbsProps> = {
  title: "Tarmac TDS/Breadcrumbs",
  component: Breadcrumbs,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<BreadcrumbsProps>;

/* ═══════════════════════════════════════════════════════════════
   SECTION A — Breadcrumb Cells
   ═══════════════════════════════════════════════════════════════ */

export const CellPlayground: Story = {
  name: "Cell — Playground",
  parameters: { layout: "centered" },
  argTypes: {
    // @ts-expect-error
    style: { control: "select", options: ["black", "blue", "dlvRed"], description: "Color style variant" },
    size: { control: "select", options: ["lg", "sm"], description: "lg = Large, sm = Small" },
    // @ts-expect-error
    label: { control: "text", description: "Breadcrumb text label" },
    // @ts-expect-error
    leadingIcon: { control: "boolean", description: "Show leading icon (ReactNode)" },
    // @ts-expect-error
    trailingIcon: { control: "boolean", description: "Show trailing icon (ReactNode)" },
    // @ts-expect-error
    pill: { control: "boolean", description: "Show Pill (ReactNode)" },
    // @ts-expect-error
    isDisabled: { control: "boolean", description: "Disabled state" },
    // @ts-expect-error
    isGhost: { control: "boolean", description: "Ghost/skeleton state" },
    // @ts-expect-error
    isCurrent: { control: "boolean", description: "Current page (Pressed)" },
  },
  args: {
    // @ts-expect-error
    style: "black", size: "lg", label: "Title here",
    // @ts-expect-error
    leadingIcon: true, trailingIcon: true, pill: false,
    // @ts-expect-error
    isDisabled: false, isGhost: false, isCurrent: false,
  },
  render: (args: any) => {
    const sz = args.size || "lg";
    const ico = sz === "sm" ? <AddCircleIcon16 /> : <AddCircleIcon20 />;
    return (
      <BreadcrumbCell
        label={args.label}
        style={args.style}
        size={sz}
        leadingIcon={args.leadingIcon ? ico : undefined}
        trailingIcon={args.trailingIcon ? ico : undefined}
        pill={args.pill ? <Pill pillVariant="black" pillType="solid" size="sm" text="02" /> : undefined}
        isDisabled={args.isDisabled}
        isGhost={args.isGhost}
        isCurrent={args.isCurrent}
      />
    );
  },
};

/** A2. Cell — Style: Black */
export const CellBlack: Story = {
  name: "Cell — Style: Black",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="Large">
        <BreadcrumbCell label="Title here" style="black" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" />} />
      </Row>
      <Row label="Small">
        <BreadcrumbCell label="Title here" style="black" size="sm" leadingIcon={<AddCircleIcon16 />} trailingIcon={<AddCircleIcon16 />} pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" />} />
      </Row>
    </div>
  ),
};

/** A3. Cell — Style: Blue */
export const CellBlue: Story = {
  name: "Cell — Style: Blue",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="Large">
        <BreadcrumbCell label="Title here" style="blue" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="blue" pillType="solid" size="sm" text="02" />} />
      </Row>
      <Row label="Small">
        <BreadcrumbCell label="Title here" style="blue" size="sm" leadingIcon={<AddCircleIcon16 />} trailingIcon={<AddCircleIcon16 />} pill={<Pill pillVariant="blue" pillType="solid" size="sm" text="02" />} />
      </Row>
    </div>
  ),
};

/** A4. Cell — Style: DLV Red */
export const CellDLVRed: Story = {
  name: "Cell — Style: DLV Red",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="Large">
        <BreadcrumbCell label="Title here" style="dlvRed" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="error" pillType="solid" size="sm" text="02" />} />
      </Row>
      <Row label="Small">
        <BreadcrumbCell label="Title here" style="dlvRed" size="sm" leadingIcon={<AddCircleIcon16 />} trailingIcon={<AddCircleIcon16 />} pill={<Pill pillVariant="error" pillType="solid" size="sm" text="02" />} />
      </Row>
    </div>
  ),
};

/** A5. Cell — State: Default */
export const CellDefault: Story = {
  name: "Cell — State: Default",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="black"><BreadcrumbCell label="Title here" style="black" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="blue"><BreadcrumbCell label="Title here" style="blue" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="blue" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="dlvRed"><BreadcrumbCell label="Title here" style="dlvRed" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="error" pillType="solid" size="sm" text="02" />} /></Row>
    </div>
  ),
};

/** A6. Cell — State: Hover */
export const CellHover: Story = {
  name: "Cell — State: Hover",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="black"><ShowcaseCell showcaseState="hover" label="Title here" style="black" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="blue"><ShowcaseCell showcaseState="hover" label="Title here" style="blue" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="blue" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="dlvRed"><ShowcaseCell showcaseState="hover" label="Title here" style="dlvRed" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="error" pillType="solid" size="sm" text="02" />} /></Row>
    </div>
  ),
};

/** A7. Cell — State: Pressed */
export const CellPressed: Story = {
  name: "Cell — State: Pressed",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="black"><BreadcrumbCell label="Title here" style="black" size="lg" isCurrent leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="blue"><BreadcrumbCell label="Title here" style="blue" size="lg" isCurrent leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="blue" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="dlvRed"><BreadcrumbCell label="Title here" style="dlvRed" size="lg" isCurrent leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="error" pillType="solid" size="sm" text="02" />} /></Row>
    </div>
  ),
};

/** A8. Cell — State: Disabled */
export const CellDisabled: Story = {
  name: "Cell — State: Disabled",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="black"><BreadcrumbCell label="Title here" style="black" size="lg" isDisabled leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" isDisabled />} /></Row>
      <Row label="blue"><BreadcrumbCell label="Title here" style="blue" size="lg" isDisabled leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="blue" pillType="solid" size="sm" text="02" isDisabled />} /></Row>
      <Row label="dlvRed"><BreadcrumbCell label="Title here" style="dlvRed" size="lg" isDisabled leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="error" pillType="solid" size="sm" text="02" isDisabled />} /></Row>
    </div>
  ),
};

/** A9. Cell — State: Ghost */
export const CellGhost: Story = {
  name: "Cell — State: Ghost",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="Large"><BreadcrumbCell isGhost size="lg" /></Row>
      <Row label="Small"><BreadcrumbCell isGhost size="sm" /></Row>
    </div>
  ),
};

/** A10. Cell — Size: Large */
export const CellLarge: Story = {
  name: "Cell — Size: Large",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="black"><BreadcrumbCell label="Title here" style="black" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="blue"><BreadcrumbCell label="Title here" style="blue" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="blue" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="dlvRed"><BreadcrumbCell label="Title here" style="dlvRed" size="lg" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} pill={<Pill pillVariant="error" pillType="solid" size="sm" text="02" />} /></Row>
    </div>
  ),
};

/** A11. Cell — Size: Small */
export const CellSmall: Story = {
  name: "Cell — Size: Small",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="black"><BreadcrumbCell label="Title here" style="black" size="sm" leadingIcon={<AddCircleIcon16 />} trailingIcon={<AddCircleIcon16 />} pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="blue"><BreadcrumbCell label="Title here" style="blue" size="sm" leadingIcon={<AddCircleIcon16 />} trailingIcon={<AddCircleIcon16 />} pill={<Pill pillVariant="blue" pillType="solid" size="sm" text="02" />} /></Row>
      <Row label="dlvRed"><BreadcrumbCell label="Title here" style="dlvRed" size="sm" leadingIcon={<AddCircleIcon16 />} trailingIcon={<AddCircleIcon16 />} pill={<Pill pillVariant="error" pillType="solid" size="sm" text="02" />} /></Row>
    </div>
  ),
};

/** A12. Cell — Leading Icon */
export const CellLeadingIcon: Story = {
  name: "Cell — Leading Icon",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="true"><BreadcrumbCell label="Title here" leadingIcon={<AddCircleIcon20 />} /></Row>
      <Row label="false"><BreadcrumbCell label="Title here" /></Row>
    </div>
  ),
};

/** A13. Cell — Trailing Icon */
export const CellTrailingIcon: Story = {
  name: "Cell — Trailing Icon",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="true"><BreadcrumbCell label="Title here" trailingIcon={<AddCircleIcon20 />} /></Row>
      <Row label="false"><BreadcrumbCell label="Title here" /></Row>
    </div>
  ),
};

/** A14. Cell — Pill */
export const CellPill: Story = {
  name: "Cell — Pill",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
      <Row label="Pill: true"><BreadcrumbCell label="Title here" pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" />} leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} /></Row>
      <Row label="Pill: false"><BreadcrumbCell label="Title here" leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} /></Row>
      <Row label="Disabled"><BreadcrumbCell label="Title here" pill={<Pill pillVariant="black" pillType="solid" size="sm" text="02" isDisabled />} isDisabled leadingIcon={<AddCircleIcon20 />} trailingIcon={<AddCircleIcon20 />} /></Row>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════════════════
   SECTION B — Breadcrumbs (Container)
   ═══════════════════════════════════════════════════════════════ */

export const Playground: Story = {
  name: "Breadcrumbs — Playground",
  parameters: { layout: "centered" },
  args: {
    dividerStyle: "slash", size: "lg", showDivider: true,
    items: [{ label: "Home", isCurrent: true }, { label: "Products" }, { label: "Category" }],
  },
  argTypes: {
    dividerStyle: { control: "select", options: ["slash", "chevron"] },
    size: { control: "select", options: ["lg", "sm"] },
    showDivider: { control: "boolean" },
  },
  render: (args) => <Breadcrumbs {...args} />,
};

/** B2. Divider: Slash */
export const DividerSlash: Story = {
  name: "Breadcrumbs — Divider: Slash",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
      <Row label="Large"><Breadcrumbs dividerStyle="slash" size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }]} /></Row>
      <Row label="Small"><Breadcrumbs dividerStyle="slash" size="sm" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }]} /></Row>
    </div>
  ),
};

/** B3. Divider: Chevron */
export const DividerChevron: Story = {
  name: "Breadcrumbs — Divider: Chevron",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
      <Row label="Large"><Breadcrumbs dividerStyle="chevron" size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }]} /></Row>
      <Row label="Small"><Breadcrumbs dividerStyle="chevron" size="sm" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }]} /></Row>
    </div>
  ),
};

/** B4. Size: Large */
export const BreadcrumbsLarge: Story = {
  name: "Breadcrumbs — Size: Large",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
      <Row label="Slash"><Breadcrumbs dividerStyle="slash" size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }]} /></Row>
      <Row label="Chevron"><Breadcrumbs dividerStyle="chevron" size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }]} /></Row>
    </div>
  ),
};

/** B5. Size: Small */
export const BreadcrumbsSmall: Story = {
  name: "Breadcrumbs — Size: Small",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
      <Row label="Slash"><Breadcrumbs dividerStyle="slash" size="sm" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }]} /></Row>
      <Row label="Chevron"><Breadcrumbs dividerStyle="chevron" size="sm" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }]} /></Row>
    </div>
  ),
};

/** B6–B12. Count: 2 through 8 */
export const Count2: Story = { name: "Breadcrumbs — 2 Crumb", render: () => <div style={{ padding: 32 }}><Breadcrumbs size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }]} /></div> };
export const Count3: Story = { name: "Breadcrumbs — 3 Crumb", render: () => <div style={{ padding: 32 }}><Breadcrumbs size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }]} /></div> };
export const Count4: Story = { name: "Breadcrumbs — 4 Crumb", render: () => <div style={{ padding: 32 }}><Breadcrumbs size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }]} /></div> };
export const Count5: Story = { name: "Breadcrumbs — 5 Crumb", render: () => <div style={{ padding: 32 }}><Breadcrumbs size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }]} /></div> };
export const Count6: Story = { name: "Breadcrumbs — 6 Crumb", render: () => <div style={{ padding: 32 }}><Breadcrumbs size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }]} /></div> };
export const Count7: Story = { name: "Breadcrumbs — 7 Crumb", render: () => <div style={{ padding: 32 }}><Breadcrumbs size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }]} /></div> };
export const Count8: Story = { name: "Breadcrumbs — 8 Crumb", render: () => <div style={{ padding: 32 }}><Breadcrumbs size="lg" items={[{ label: "Title here", isCurrent: true }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }, { label: "Title here" }]} /></div> };
