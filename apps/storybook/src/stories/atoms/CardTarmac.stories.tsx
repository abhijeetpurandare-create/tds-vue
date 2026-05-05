import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  SelectionCard,
  InfoCard,
  ThemeProvider,
  useTheme,
  Badge,
  Button,
  Chip,
  Avatar,
  Snackbar,
  Pill,
} from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type {
  CardProps,
  SelectionCardProps,
  InfoCardProps,
  SelectionCardType,
  SelectionCardSize,
  InfoCardStyle,
  CardTarmacVariant,
} from "@delhivery/tarmac";

// ─── Constants ───────────────────────────────────────────────────────────────

const SELECTION_TYPES: SelectionCardType[] = ["radio", "checkbox"];
const SELECTION_SIZES: SelectionCardSize[] = ["lg", "sm"];
const INFO_STYLES: InfoCardStyle[] = ["slots", "slotTop", "slotBanner", "regular"];
const CARD_VARIANTS: CardTarmacVariant[] = [
  "standard", "standardType2", "slotBanner", "standardPills",
  "standardIconButtons", "infoSets", "badgeBottom", "buttonsTacked",
];

type ShowcaseState = "default" | "hover" | "pressed" | "focused" | "disabled" | "ghost";
const SELECTION_STATES: ShowcaseState[] = ["default", "hover", "pressed", "focused", "disabled", "ghost"];
const CARD_STATES: ShowcaseState[] = ["default", "hover", "focused", "disabled", "ghost"];

const TYPE_LABELS: Record<string, string> = { radio: "Radio", checkbox: "Checkbox" };
const SIZE_LABELS: Record<string, string> = { lg: "Large", sm: "Small" };
const INFO_STYLE_LABELS: Record<string, string> = { slots: "Slots", slotTop: "Slot Top", slotBanner: "Slot Banner", regular: "Regular" };
const VARIANT_LABELS: Record<string, string> = {
  standard: "Standard", standardType2: "Standard Type 2", slotBanner: "Slot Banner",
  standardPills: "Standard + Pills", standardIconButtons: "Standards + Icon Buttons",
  infoSets: "Info Sets", badgeBottom: "Badge Bottom", buttonsTacked: "Buttons Tacked",
};

// ─── Icons ───────────────────────────────────────────────────────────────────

const Ico = ({ s = 20 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const ArrowIco = ({ s = 20 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
  </svg>
);

const StatusDot = ({ color = "#2563EB" }: { color?: string }) => (
  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
);

// ─── Theme Wrappers ──────────────────────────────────────────────────────────

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">{children}</ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);


// ─── ShowcaseWrappers — storybook-only, forces visual states ─────────────────

const ShowcaseSelectionCard: React.FC<
  SelectionCardProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.card_tarmac as any;
  const states = cfg?.selectionCard?.states || {};

  if (showcaseState === "default") return <SelectionCard {...props} />;
  if (showcaseState === "disabled") return <SelectionCard {...props} isDisabled />;
  if (showcaseState === "ghost") return <SelectionCard {...props} isGhost />;

  if (showcaseState === "hover") {
    const hoverState = states.hover || {};
    const overrides = css({
      '& [data-testid="selection-card"]': {
        borderColor: `${hoverState.borderColor || ""} !important`,
        backgroundColor: `${hoverState.backgroundColor || ""} !important`,
      },
    });
    return <div className={overrides}><SelectionCard {...props} /></div>;
  }

  if (showcaseState === "pressed") {
    const pressedState = states.pressed || {};
    const overrides = css({
      '& [data-testid="selection-card"]': {
        borderColor: `${pressedState.borderColor || ""} !important`,
        backgroundColor: `${pressedState.backgroundColor || ""} !important`,
      },
    });
    return <div className={overrides}><SelectionCard {...props} /></div>;
  }

  if (showcaseState === "focused") {
    const focusedState = states.focused || {};
    const overrides = css({
      '& [data-testid="selection-card"]': {
        boxShadow: `0 0 0 2px ${focusedState.focusRingColor || "rgba(0,0,0,0.4)"} !important`,
      },
    });
    return <div className={overrides}><SelectionCard {...props} /></div>;
  }

  return <SelectionCard {...props} />;
};

const ShowcaseInfoCard: React.FC<
  InfoCardProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.card_tarmac as any;
  const states = cfg?.infoCard?.states || {};

  if (showcaseState === "default") return <InfoCard {...props} />;
  if (showcaseState === "disabled") return <InfoCard {...props} isDisabled />;
  if (showcaseState === "ghost") return <InfoCard {...props} isGhost />;

  if (showcaseState === "hover") {
    const hoverState = states.hover || {};
    const overrides = css({
      '& [data-testid="info-card"]': {
        borderColor: `${hoverState.borderColor || ""} !important`,
        backgroundColor: `${hoverState.backgroundColor || ""} !important`,
      },
    });
    return <div className={overrides}><InfoCard {...props} /></div>;
  }

  if (showcaseState === "focused") {
    const focusedState = states.focused || {};
    const overrides = css({
      '& [data-testid="info-card"]': {
        boxShadow: `0 0 0 2px ${focusedState.focusRingColor || "rgba(0,0,0,0.4)"} !important`,
      },
    });
    return <div className={overrides}><InfoCard {...props} /></div>;
  }

  return <InfoCard {...props} />;
};

const ShowcaseCard: React.FC<
  CardProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.card_tarmac as any;
  const states = cfg?.card?.states || {};

  if (showcaseState === "default") return <Card {...props} />;
  if (showcaseState === "disabled") return <Card {...props} isDisabled />;
  if (showcaseState === "ghost") return <Card {...props} isGhost />;

  if (showcaseState === "hover") {
    const hoverState = states.hover || {};
    const overrides = css({
      '& [data-testid="tarmac-card"]': {
        borderColor: `${hoverState.borderColor || ""} !important`,
        backgroundColor: `${hoverState.backgroundColor || ""} !important`,
      },
    });
    return <div className={overrides}><Card {...props} /></div>;
  }

  if (showcaseState === "focused") {
    const focusedState = states.focused || {};
    const overrides = css({
      '& [data-testid="tarmac-card"]': {
        boxShadow: `0 0 0 2px ${focusedState.focusRingColor || "rgba(0,0,0,0.4)"} !important`,
      },
    });
    return <div className={overrides}><Card {...props} /></div>;
  }

  return <Card {...props} />;
};

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<CardProps> = {
  title: "Tarmac TDS/Card",
  component: Card,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<CardProps>;

// ─── Shared Styles ───────────────────────────────────────────────────────────

const st: Record<string, React.CSSProperties> = {
  page: { padding: 24, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title: { fontSize: 15, fontWeight: 700, color: "#374151", margin: "32px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  subtitle: { fontSize: 13, fontWeight: 600, color: "#6b7280", margin: "16px 0 8px" },
  colHdr: { fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, textAlign: "center" as const, padding: "4px 0" },
  rowLabel: { fontSize: 9, color: "#b0b0b0", textAlign: "right" as const, paddingRight: 8, paddingTop: 8 },
  cell: { display: "flex", justifyContent: "center", alignItems: "start", padding: "4px 0" },
};

// ─── Sample Data ─────────────────────────────────────────────────────────────

const sampleSubitems = [
  { icon: <Ico s={16} />, label: "Shipments" },
  { icon: <Ico s={16} />, label: "Services" },
];

const sampleInfoSets = [
  { label: "Assigned", value: 12 },
  { label: "Successful", value: 8 },
  { label: "Pending", value: 4 },
];

const sampleChips = [
  { label: "Delivery Successful", pillVariant: "success", pillType: "subtle" },
  { label: "Flash", pillVariant: "legacy_blue", pillType: "subtle", leadingIcon: <Ico s={12} /> },
  { label: "COD - ₹2026", pillVariant: "warning", pillType: "subtle" },
];


/* ═══ 12.2: Card Playground ═══ */

export const CardPlayground: Story = {
  name: "Card Playground",
  parameters: { layout: "centered" },
  args: {
    cardStyle: "tarmac-01" as any,
    cardVariant: "standard" as any,
    title: "Card Title",
    subtitle: "Subtitle text",
    subtextTop: "Subtext top",
    subtextBottom: "Subtext bottom",
    isDisabled: false,
    isGhost: false,
  },
  argTypes: {
    cardVariant: { control: "select", options: [...CARD_VARIANTS] },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
    title: { control: "text" },
    subtitle: { control: "text" },
    subtextTop: { control: "text" },
    subtextBottom: { control: "text" },
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Card
        {...args}
        cardStyle={"tarmac-01" as any}
        leadingIcon={<Ico />}
        trailingIcon={<ArrowIco />}
        number={1}
        badge={<Badge type="subtle" variant="info" size="md" text="Badge" />}
        statusIndicator={<StatusDot />}
        statusText="Information"
        subitems={sampleSubitems}
        actions={[
          <Button key="l" buttonStyle="secondary" variant="black" size="md">Cancel</Button>,
          <Button key="r" buttonStyle="primary" variant="black" size="md">Confirm</Button>,
        ]}
      />
    </div>
  ),
};

/* ═══ 12.3: Selection Card Playground ═══ */

const SelectionCardPlaygroundRender: React.FC = () => {
  const [selected, setSelected] = React.useState(false);
  const [selectionType, setSelectionType] = React.useState<string>("radio");
  const [size, setSize] = React.useState<string>("lg");
  const [isDisabled, setIsDisabled] = React.useState(false);

  const controlStyle: React.CSSProperties = { display: "flex", gap: 8, alignItems: "center", fontSize: 12, fontFamily: "Noto Sans, sans-serif" };
  const selectStyle: React.CSSProperties = { padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc", fontSize: 12 };

  return (
    <div style={{ padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div style={controlStyle}>
          <label>Type:</label>
          <select style={selectStyle} value={selectionType} onChange={(e) => setSelectionType(e.target.value)}>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>
        <div style={controlStyle}>
          <label>Size:</label>
          <select style={selectStyle} value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="lg">Large</option>
            <option value="sm">Small</option>
          </select>
        </div>
        <label style={controlStyle}><input type="checkbox" checked={isDisabled} onChange={(e) => setIsDisabled(e.target.checked)} /> Disabled</label>
      </div>
      <div style={{ width: 360 }}>
        <SelectionCard
          selectionType={selectionType as SelectionCardType}
          size={size as SelectionCardSize}
          selected={selected}
          onChange={() => setSelected(!selected)}
          isDisabled={isDisabled}
          title="Selection Card Title"
          subtext="Supporting description text"
          statusIndicator={<StatusDot />}
          trailingIcon={<ArrowIco />}
        />
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>
        Selected: {selected ? "true" : "false"} — click the card or the {selectionType} indicator to toggle
      </div>
    </div>
  );
};

export const SelectionCardPlayground: Story = {
  name: "Selection Card Playground",
  parameters: { layout: "centered" },
  render: () => <SelectionCardPlaygroundRender />,
  argTypes: {
    // These are informational — actual controls are in the render
  },
};

/* ═══ 12.4: Info Card Playground ═══ */

const InfoCardPlaygroundRender: React.FC = () => {
  const [infoStyle, setInfoStyle] = React.useState<string>("regular");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isGhost, setIsGhost] = React.useState(false);
  const [showSlotLeading, setShowSlotLeading] = React.useState(true);
  const [showTrailingIcon, setShowTrailingIcon] = React.useState(true);
  const [showSubtextTop, setShowSubtextTop] = React.useState(true);
  const [showSubtextBottom, setShowSubtextBottom] = React.useState(true);

  const controlStyle: React.CSSProperties = { display: "flex", gap: 8, alignItems: "center", fontSize: 12, fontFamily: "Noto Sans, sans-serif" };
  const selectStyle: React.CSSProperties = { padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc", fontSize: 12 };

  return (
    <div style={{ padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div style={controlStyle}>
          <label>Style:</label>
          <select style={selectStyle} value={infoStyle} onChange={(e) => setInfoStyle(e.target.value)}>
            {INFO_STYLES.map((s) => <option key={s} value={s}>{INFO_STYLE_LABELS[s]}</option>)}
          </select>
        </div>
        <label style={controlStyle}><input type="checkbox" checked={isDisabled} onChange={(e) => setIsDisabled(e.target.checked)} /> Disabled</label>
        <label style={controlStyle}><input type="checkbox" checked={isGhost} onChange={(e) => setIsGhost(e.target.checked)} /> Ghost</label>
        <label style={controlStyle}><input type="checkbox" checked={showSlotLeading} onChange={(e) => setShowSlotLeading(e.target.checked)} /> Slot Leading</label>
        <label style={controlStyle}><input type="checkbox" checked={showTrailingIcon} onChange={(e) => setShowTrailingIcon(e.target.checked)} /> Trailing Icon</label>
        <label style={controlStyle}><input type="checkbox" checked={showSubtextTop} onChange={(e) => setShowSubtextTop(e.target.checked)} /> Subtext Top</label>
        <label style={controlStyle}><input type="checkbox" checked={showSubtextBottom} onChange={(e) => setShowSubtextBottom(e.target.checked)} /> Subtext Bottom</label>
      </div>
      <div style={{ width: 300 }}>
        <InfoCard
          infoStyle={infoStyle as InfoCardStyle}
          title="100"
          subtextTop={showSubtextTop ? "Subtext here" : undefined}
          subtextBottom={showSubtextBottom ? "This is a sample message" : undefined}
          slotLeading={showSlotLeading ? <span style={{ fontSize: 10, color: "#808080" }}>Slot</span> : undefined}
          slotTrailing={infoStyle === "slots" ? <Ico s={16} /> : undefined}
          trailingIcon={showTrailingIcon ? <ArrowIco /> : undefined}
          isDisabled={isDisabled}
          isGhost={isGhost}
          onClick={() => alert("Card clicked")}
        />
      </div>
    </div>
  );
};

export const InfoCardPlayground: Story = {
  name: "Info Card Playground",
  parameters: { layout: "centered" },
  render: () => <InfoCardPlaygroundRender />,
};


/* ═══ 12.5: Selection Card Full Matrix (Type × Size × State) ═══ */

const SelectionMatrixSection: React.FC<{ selectionType: SelectionCardType }> = ({ selectionType }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={st.subtitle}>{TYPE_LABELS[selectionType as string]}</div>
    <div style={{ display: "grid", gridTemplateColumns: `100px repeat(${SELECTION_STATES.length}, 1fr)`, gap: "8px 12px", alignItems: "start" }}>
      <div />
      {SELECTION_STATES.map((s) => (
        <div key={s} style={st.colHdr}>{s}</div>
      ))}
      {SELECTION_SIZES.map((size) => (
        <React.Fragment key={size as string}>
          <div style={st.rowLabel}>{SIZE_LABELS[size as string]}</div>
          {SELECTION_STATES.map((state) => (
            <div key={state} style={{ ...st.cell, minWidth: 200 }}>
              <ShowcaseSelectionCard
                showcaseState={state}
                selectionType={selectionType}
                size={size}
                selected={state === "focused"}
                title="Title"
                subtext="Subtext"
                statusIndicator={<StatusDot />}
                trailingIcon={<ArrowIco s={16} />}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const SelectionCardFullMatrix: Story = {
  name: "Selection Card Full Matrix",
  render: () => (
    <div style={st.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>
        2 Types × 2 Sizes × 6 States = 24 selection cards
      </p>
      {SELECTION_TYPES.map((t) => (
        <SelectionMatrixSection key={t as string} selectionType={t} />
      ))}
    </div>
  ),
};

/* ═══ 12.6: Info Card Full Matrix (Style × State) ═══ */

const infoCardPropsForStyle = (style: InfoCardStyle): Partial<InfoCardProps> => {
  if (style === "slots") return {
    title: "1,234", subtextTop: "Total Orders", subtextBottom: "Last 30 days",
    slotLeading: <Ico />,
    slotTrailing: <Ico s={16} />,
    trailingIcon: <ArrowIco />,
  };
  if (style === "slotTop") return {
    title: "100",
    slotLeading: <span style={{ fontSize: 10, color: "#808080" }}>Slot</span>,
    subtextTop: <span>Subtext here</span>,
    subtextBottom: "This is a sample message",
    trailingIcon: <ArrowIco />,
  };
  if (style === "slotBanner") return {
    title: "100",
    slotLeading: <span style={{ fontSize: 10, color: "#808080" }}>Slot</span>,
    subtextTop: <span>Subtext here</span>,
    subtextBottom: "This is a sample message",
  };
  return {
    title: "100",
    slotLeading: <span style={{ fontSize: 10, color: "#808080" }}>Slot</span>,
    subtextTop: <span>Subtext here</span>,
    subtextBottom: "This is a sample message",
    trailingIcon: <ArrowIco />,
  };
};

export const InfoCardFullMatrix: Story = {
  name: "Info Card Full Matrix",
  render: () => (
    <div style={st.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>
        4 Styles × 5 States = 20 info cards
      </p>
      {INFO_STYLES.map((style) => (
        <div key={style as string} style={{ marginBottom: 32 }}>
          <div style={st.subtitle}>{INFO_STYLE_LABELS[style as string]}</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${CARD_STATES.length}, 1fr)`, gap: 12 }}>
            {CARD_STATES.map((state) => (
              <div key={state}>
                <div style={st.colHdr}>{state}</div>
                <div style={{ width: 240 }}>
                  <ShowcaseInfoCard
                    showcaseState={state}
                    infoStyle={style}
                    onClick={() => {}}
                    {...infoCardPropsForStyle(style)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ═══ 12.7: Card Full Matrix (Variant × State) ═══ */

const cardPropsForVariant = (variant: CardTarmacVariant): Partial<CardProps> => {
  const base: Partial<CardProps> = {
    cardStyle: "tarmac-01" as any,
    title: "Tarmac Design System",
    subtextTop: "Subtext here",
    subtextBottom: "Subtext here",
    leadingIcon: <Ico />,
    trailingIcon: <ArrowIco />,
    number: 1,
    badge: <Badge variant="info" size="md" badgeType="subtle" text="Badge" />,
    subitems: sampleSubitems,
    snackbar: <Snackbar variant="success" snackbarStyle="filled" size="sm" message="Setup in progress" duration={0} />,
    statusIndicator: <StatusDot color="#2396FB" />,
    statusText: "Information",
    actions: [
      <Button key="sec" buttonStyle="secondary" variant="black" size="md" text="Action" style={{ flex: 1 }} />,
      <Button key="pri" buttonStyle="primary" variant="black" size="md" text="Action" style={{ flex: 1 }} />,
    ],
  };
  switch (variant) {
    case "slotBanner":
      return {
        ...base,
        bannerImage: <div style={{ width: "100%", height: 120, backgroundColor: "#F0F8FF", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, border: "0.5px dashed #E0E3EB" }}>
          <span style={{ fontSize: 10, color: "#2396FB", fontWeight: 300 }}>Slot: Replace with local component</span>
        </div>,
        badge: <>
          <Badge variant="success" size="md" badgeType="subtle" text="Badge" />
          <Badge variant="info" size="md" badgeType="subtle" text="Badge" />
        </>,
      };
    case "standardType2":
      return {
        ...base,
        number: undefined,
        leadingIcon: undefined,
        badge: undefined,
      };
    case "standardPills":
      return { ...base, chips: sampleChips, badge: undefined, number: undefined, leadingIcon: undefined };
    case "standardIconButtons":
      return {
        ...base,
        number: undefined,
        leadingIcon: undefined,
        badge: undefined,
        trailingIcon: undefined,
        actions: [<Button key="a" buttonStyle="primary" variant="white" size="md" style={{ width: 36, height: 36, padding: 0 }}><Ico s={16} /></Button>],
      };
    case "infoSets":
      return {
        ...base,
        number: undefined,
        leadingIcon: undefined,
        trailingIcon: undefined,
        infoSets: sampleInfoSets,
        badge: <Badge variant="info" size="md" badgeType="subtle" text="Badge" />,
      };
    case "badgeBottom":
      return {
        ...base,
        badge: <Badge variant="black" size="lg" badgeType="subtle" text="Badge" />,
      };
    case "buttonsTacked":
      return {
        ...base,
        actions: [
          <Button key="l" buttonStyle="tertiary" variant="black" size="lg" text="Action" trailingIcon={<ArrowIco s={16} />} style={{ flex: 1 }} />,
          <Button key="r" buttonStyle="tertiary" variant="black" size="lg" text="Action" trailingIcon={<ArrowIco s={16} />} style={{ flex: 1 }} />,
        ],
      };
    default:
      return base;
  }
};

export const CardFullMatrix: Story = {
  name: "Card Full Matrix",
  render: () => (
    <div style={st.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>
        8 Variants × 5 States = 40 cards
      </p>
      {CARD_VARIANTS.map((variant) => (
        <div key={variant as string} style={{ marginBottom: 32 }}>
          <div style={st.subtitle}>{VARIANT_LABELS[variant as string]}</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${CARD_STATES.length}, 1fr)`, gap: 12 }}>
            {CARD_STATES.map((state) => (
              <div key={state}>
                <div style={st.colHdr}>{state}</div>
                <ShowcaseCard
                  showcaseState={state}
                  cardVariant={variant}
                  {...cardPropsForVariant(variant)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};


/* ═══ 12.8: Per-Selection-Type Stories (Radio, Checkbox) ═══ */

const PerSelectionTypeSection: React.FC<{ selectionType: SelectionCardType }> = ({ selectionType }) => {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);
  return (
    <div style={st.page}>
      <div style={st.title}>{TYPE_LABELS[selectionType as string]} Selection Cards</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {SELECTION_SIZES.map((size) => (
          <div key={size as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 8 }}>{SIZE_LABELS[size as string]}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Option A", "Option B", "Option C"].map((label) => (
                <SelectionCard
                  key={label}
                  selectionType={selectionType}
                  size={size}
                  selected={selected === label}
                  onChange={() => setSelected(selected === label ? undefined : label)}
                  title={label}
                  subtext="Description text"
                  name="demo-group"
                  value={label}
                  statusIndicator={<StatusDot />}
                  trailingIcon={<ArrowIco s={16} />}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RadioType: Story = {
  name: "Radio Button",
  render: () => <PerSelectionTypeSection selectionType="radio" />,
};

export const CheckboxType: Story = {
  name: "Checkbox",
  render: () => <PerSelectionTypeSection selectionType="checkbox" />,
};

/* ═══ 12.9: Per-Info-Style Stories ═══ */

const PerInfoStyleSection: React.FC<{ infoStyle: InfoCardStyle }> = ({ infoStyle }) => (
  <div style={st.page}>
    <div style={st.title}>{INFO_STYLE_LABELS[infoStyle as string]}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {(["default", "disabled", "ghost"] as ShowcaseState[]).map((state) => (
        <div key={state}>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4, textTransform: "capitalize" }}>{state}</div>
          <ShowcaseInfoCard
            showcaseState={state}
            infoStyle={infoStyle}
            onClick={() => {}}
            {...infoCardPropsForStyle(infoStyle)}
          />
        </div>
      ))}
    </div>
  </div>
);

export const InfoSlots: Story = { name: "Info — Slots", render: () => <PerInfoStyleSection infoStyle="slots" /> };
export const InfoSlotTop: Story = { name: "Info — Slot Top", render: () => <PerInfoStyleSection infoStyle="slotTop" /> };
export const InfoSlotBanner: Story = { name: "Info — Slot Banner", render: () => <PerInfoStyleSection infoStyle="slotBanner" /> };
export const InfoRegular: Story = { name: "Info — Regular", render: () => <PerInfoStyleSection infoStyle="regular" /> };

/* ═══ 12.10: Per-Card-Variant Stories ═══ */

const PerCardVariantSection: React.FC<{ cardVariant: CardTarmacVariant }> = ({ cardVariant }) => (
  <div style={st.page}>
    <div style={st.title}>{VARIANT_LABELS[cardVariant as string]}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {(["default", "disabled", "ghost"] as ShowcaseState[]).map((state) => (
        <div key={state}>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4, textTransform: "capitalize" }}>{state}</div>
          <ShowcaseCard
            showcaseState={state}
            cardVariant={cardVariant}
            {...cardPropsForVariant(cardVariant)}
          />
        </div>
      ))}
    </div>
  </div>
);

export const VariantStandard: Story = { name: "Standard", render: () => <PerCardVariantSection cardVariant="standard" /> };
export const VariantStandardType2: Story = { name: "Standard Type 2", render: () => <PerCardVariantSection cardVariant="standardType2" /> };
export const VariantSlotBanner: Story = { name: "Slot Banner", render: () => <PerCardVariantSection cardVariant="slotBanner" /> };
export const VariantStandardPills: Story = { name: "Standard + Pills", render: () => <PerCardVariantSection cardVariant="standardPills" /> };
export const VariantIconButtons: Story = { name: "Standards + Icon Buttons", render: () => <PerCardVariantSection cardVariant="standardIconButtons" /> };
export const VariantInfoSets: Story = { name: "Info Sets", render: () => <PerCardVariantSection cardVariant="infoSets" /> };
export const VariantBadgeBottom: Story = { name: "Badge Bottom", render: () => <PerCardVariantSection cardVariant="badgeBottom" /> };
export const VariantButtonsTacked: Story = { name: "Buttons Tacked", render: () => <PerCardVariantSection cardVariant="buttonsTacked" /> };


/* ═══ 12.11: Per-State Stories (Disabled, Ghost) for each family ═══ */

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Disabled — Selection Cards</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
        {SELECTION_TYPES.map((t) =>
          SELECTION_SIZES.map((s) => (
            <div key={`${t}-${s}`}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{TYPE_LABELS[t as string]} / {SIZE_LABELS[s as string]}</div>
              <SelectionCard selectionType={t} size={s} isDisabled title="Disabled" subtext="Subtext" statusIndicator={<StatusDot />} />
            </div>
          ))
        )}
      </div>

      <div style={st.title}>Disabled — Info Cards</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
        {INFO_STYLES.map((style) => (
          <div key={style as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{INFO_STYLE_LABELS[style as string]}</div>
            <InfoCard infoStyle={style} isDisabled {...infoCardPropsForStyle(style)} />
          </div>
        ))}
      </div>

      <div style={st.title}>Disabled — Cards</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {CARD_VARIANTS.map((v) => (
          <div key={v as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{VARIANT_LABELS[v as string]}</div>
            <Card cardVariant={v} isDisabled {...cardPropsForVariant(v)} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const GhostState: Story = {
  name: "Ghost (Skeleton)",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Ghost — Selection Cards</div>
      <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 12 }}>
        Ghost renders skeleton placeholder blocks — no text, icons, or interactive elements.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
        {SELECTION_TYPES.map((t) =>
          SELECTION_SIZES.map((s) => (
            <div key={`${t}-${s}`}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{TYPE_LABELS[t as string]} / {SIZE_LABELS[s as string]}</div>
              <SelectionCard selectionType={t} size={s} isGhost />
            </div>
          ))
        )}
      </div>

      <div style={st.title}>Ghost — Info Cards</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
        {INFO_STYLES.map((style) => (
          <div key={style as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{INFO_STYLE_LABELS[style as string]}</div>
            <InfoCard infoStyle={style} isGhost />
          </div>
        ))}
      </div>

      <div style={st.title}>Ghost — Cards</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {CARD_VARIANTS.map((v) => (
          <div key={v as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{VARIANT_LABELS[v as string]}</div>
            <Card cardStyle={"tarmac-01" as any} cardVariant={v} isGhost />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ 12.12: Selection Card Boolean Toggles ═══ */

const SelectionToggleDemo: React.FC = () => {
  const [radioSel, setRadioSel] = React.useState(false);
  const [checkSel, setCheckSel] = React.useState(false);
  const toggles: Array<{ label: string; props: Partial<SelectionCardProps> }> = [
    { label: "Title only", props: { title: "Title" } },
    { label: "Title + Subtext", props: { title: "Title", subtext: "Subtext" } },
    { label: "Title + Status Indicator", props: { title: "Title", statusIndicator: <StatusDot /> } },
    { label: "Title + Trailing Icon", props: { title: "Title", trailingIcon: <ArrowIco s={16} /> } },
    { label: "Subtext + Status Indicator", props: { title: "Title", subtext: "Subtext", statusIndicator: <StatusDot /> } },
    { label: "Subtext + Trailing Icon", props: { title: "Title", subtext: "Subtext", trailingIcon: <ArrowIco s={16} /> } },
    { label: "Status + Trailing Icon", props: { title: "Title", statusIndicator: <StatusDot />, trailingIcon: <ArrowIco s={16} /> } },
    { label: "All Toggles On", props: { title: "Title", subtext: "Subtext", statusIndicator: <StatusDot />, trailingIcon: <ArrowIco s={16} /> } },
  ];

  return (
    <div style={st.page}>
      <div style={st.title}>Radio Type — click anywhere on the card or the radio indicator</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {toggles.map((t) => (
          <div key={`radio-${t.label}`}>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>{t.label}</div>
            <SelectionCard
              selectionType="radio"
              size="lg"
              selected={radioSel}
              onChange={() => setRadioSel(!radioSel)}
              {...t.props}
            />
          </div>
        ))}
      </div>

      <div style={st.title}>Checkbox Type — click anywhere on the card or the checkbox indicator</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {toggles.map((t) => (
          <div key={`check-${t.label}`}>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>{t.label}</div>
            <SelectionCard
              selectionType="checkbox"
              size="lg"
              selected={checkSel}
              onChange={() => setCheckSel(!checkSel)}
              {...t.props}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SelectionCardBooleanToggles: Story = {
  name: "Selection Card Boolean Toggles",
  render: () => <SelectionToggleDemo />,
};


/* ═══ 12.13: Standard Card Boolean Toggles (12 toggles) ═══ */

export const CardBooleanToggles: Story = {
  name: "Card Boolean Toggles",
  render: () => {
    const base: Partial<CardProps> = {
      cardStyle: "tarmac-01" as any,
      cardVariant: "standard" as any,
      title: "Card Title",
    };

    const toggles: Array<{ label: string; props: Partial<CardProps> }> = [
      { label: "Badge", props: { badge: <Badge type="subtle" variant="info" size="md" text="Badge" /> } },
      { label: "CTAs (Actions)", props: { actions: [
        <Button key="l" buttonStyle="secondary" variant="black" size="md">Cancel</Button>,
        <Button key="r" buttonStyle="primary" variant="black" size="md">Confirm</Button>,
      ] } },
      { label: "Subitems", props: { subitems: sampleSubitems } },
      { label: "Leading Icon", props: { leadingIcon: <Ico /> } },
      { label: "Number (Stepper)", props: { number: 1 } },
      { label: "Snackbar", props: { snackbar: <Snackbar variant="positive" snackbarStyle="filled" size="sm" message="Setup in progress" /> } },
      { label: "Status Indicator", props: { statusIndicator: <StatusDot />, statusText: "Information" } },
      { label: "Subtext Bottom", props: { subtextBottom: "Bottom text" } },
      { label: "Subtext Top", props: { subtextTop: "Top text" } },
      { label: "Trailing Icon", props: { trailingIcon: <ArrowIco /> } },
      { label: "Checkbox", props: { checkbox: true } },
      { label: "Avatar", props: { avatar: <Avatar size="sm" type="text" name="JD" /> } },
    ];

    return (
      <div style={st.page}>
        <div style={st.title}>Standard Card — 12 Boolean Toggles</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {toggles.map((t) => (
            <div key={t.label}>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>{t.label}</div>
              <Card {...base} {...t.props} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ═══ 12.14: Sub-Component Integration ═══ */

export const SubComponentIntegration: Story = {
  name: "Sub-Component Integration",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Sub-Component Integration</div>
      <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 12 }}>
        Demonstrates Badge, Chip, Button, Avatar, Snackbar, Stepper Icon, Subitems, and Status Indicator usage within Cards.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {/* Badge integration */}
        <div>
          <div style={st.subtitle}>Badge</div>
          <Card
            cardStyle={"tarmac-01" as any}
            cardVariant="standard"
            title="Card with Badge"
            badge={<Badge type="subtle" variant="info" size="md" text="New" leadingIcon={false} trailingIcon={false} />}
            leadingIcon={<Ico />}
          />
        </div>

        {/* Button integration */}
        <div>
          <div style={st.subtitle}>CTA Buttons</div>
          <Card
            cardStyle={"tarmac-01" as any}
            cardVariant="buttonsTacked"
            title="Card with Buttons"
            actions={[
              <Button key="l" buttonStyle="secondary" variant="black" size="md" style={{ flex: 1 }}>Cancel</Button>,
              <Button key="r" buttonStyle="primary" variant="black" size="md" style={{ flex: 1 }}>Confirm</Button>,
            ]}
          />
        </div>

        {/* Chip integration */}
        <div>
          <div style={st.subtitle}>Chips / Pills</div>
          <Card
            cardStyle={"tarmac-01" as any}
            cardVariant="standardPills"
            title="Card with Chips"
            chips={[{ label: "Express" }, { label: "Priority" }, { label: "Fragile" }]}
          />
        </div>

        {/* Avatar integration */}
        <div>
          <div style={st.subtitle}>Avatar</div>
          <Card
            cardStyle={"tarmac-01" as any}
            cardVariant="standard"
            title="Card with Avatar"
            avatar={<Avatar size="md" type="text" name="JD" />}
          />
        </div>

        {/* Snackbar integration */}
        <div>
          <div style={st.subtitle}>Snackbar (Inline)</div>
          <Card
            cardStyle={"tarmac-01" as any}
            cardVariant="standard"
            title="Card with Snackbar"
            snackbar={<Snackbar variant="positive" snackbarStyle="filled" size="sm" message="Setup in progress" />}
          />
        </div>

        {/* Stepper Icon + Subitems */}
        <div>
          <div style={st.subtitle}>Stepper Icon + Subitems</div>
          <Card
            cardStyle={"tarmac-01" as any}
            cardVariant="standard"
            title="Card with Stepper"
            number={3}
            subitems={sampleSubitems}
          />
        </div>

        {/* Status Indicator */}
        <div>
          <div style={st.subtitle}>Status Indicator</div>
          <Card
            cardStyle={"tarmac-01" as any}
            cardVariant="standard"
            title="Card with Status"
            statusIndicator={<StatusDot color="#16A34A" />}
            statusText="Active"
          />
        </div>

        {/* Full integration */}
        <div>
          <div style={st.subtitle}>All Sub-Components</div>
          <Card
            cardStyle={"tarmac-01" as any}
            cardVariant="standard"
            title="Full Integration"
            subtitle="All sub-components"
            number={1}
            leadingIcon={<Ico />}
            trailingIcon={<ArrowIco />}
            badge={<Badge type="subtle" variant="info" size="md" text="New" />}
            subitems={sampleSubitems}
            snackbar={<Snackbar variant="info" snackbarStyle="filled" size="sm" message="Processing" />}
            statusIndicator={<StatusDot />}
            statusText="Information"
            avatar={<Avatar size="sm" type="text" name="AB" />}
            checkbox={true}
            actions={[
              <Button key="l" buttonStyle="secondary" variant="black" size="md" style={{ flex: 1 }}>Cancel</Button>,
              <Button key="r" buttonStyle="primary" variant="black" size="md" style={{ flex: 1 }}>Confirm</Button>,
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

/* ═══ 12.15: Light vs Dark Mode ═══ */

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      {/* Light Mode */}
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SelectionCard selectionType="radio" size="lg" selected title="Selection Card" subtext="Light mode" statusIndicator={<StatusDot />} trailingIcon={<ArrowIco />} />
            <InfoCard infoStyle="slots" title="1,234" subtextTop="Orders" subtextBottom="Last 30 days"
              slotLeading={<Ico />}
              trailingIcon={<ArrowIco />} onClick={() => {}} />
            <Card cardStyle={"tarmac-01" as any} cardVariant="standard" title="Standard Card" subtitle="Light mode"
              leadingIcon={<Ico />} trailingIcon={<ArrowIco />} number={1}
              badge={<Badge type="subtle" variant="info" size="md" text="Badge" />}
              subitems={sampleSubitems}
              actions={[
                <Button key="l" buttonStyle="secondary" variant="black" size="md" style={{ flex: 1 }}>Cancel</Button>,
                <Button key="r" buttonStyle="primary" variant="black" size="md" style={{ flex: 1 }}>Confirm</Button>,
              ]} />
          </div>
        </Wrap>
      </div>

      {/* Dark Mode */}
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SelectionCard selectionType="radio" size="lg" selected title="Selection Card" subtext="Dark mode" statusIndicator={<StatusDot />} trailingIcon={<ArrowIco />} />
            <InfoCard infoStyle="slots" title="1,234" subtextTop="Orders" subtextBottom="Last 30 days"
              slotLeading={<Ico />}
              trailingIcon={<ArrowIco />} onClick={() => {}} />
            <Card cardStyle={"tarmac-01" as any} cardVariant="standard" title="Standard Card" subtitle="Dark mode"
              leadingIcon={<Ico />} trailingIcon={<ArrowIco />} number={1}
              badge={<Badge type="subtle" variant="info" size="md" text="Badge" />}
              subitems={sampleSubitems}
              actions={[
                <Button key="l" buttonStyle="secondary" variant="black" size="md" style={{ flex: 1 }}>Cancel</Button>,
                <Button key="r" buttonStyle="primary" variant="black" size="md" style={{ flex: 1 }}>Confirm</Button>,
              ]} />
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
