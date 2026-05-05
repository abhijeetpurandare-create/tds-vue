import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Coachmarks, Button, Badge, ThemeProvider, AnchoredOverlay, placementToCoachmarksArrow } from "@delhivery/tarmac";
import type { CoachmarksProps, AnchoredOverlayPlacement } from "@delhivery/tarmac";

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

const VARIANTS = ["white", "black"] as const;
const SIZES = ["sm", "lg"] as const;
const ARROW_POSITIONS = [
  "top-left", "top-mid", "top-right",
  "bottom-left", "bottom-mid", "bottom-right",
  "left-top", "left-mid", "left-bottom",
  "right-top", "right-mid", "right-bottom",
] as const;

const SampleImage = () => (
  <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <span style={{ color: "#fff", fontSize: 12 }}>Image</span>
  </div>
);

const SampleBadges = ({ variant }: { variant: string }) => (
  <>
    <Badge variant="info" size="sm" badgeType="outlined" text="Badge" />
    <Badge variant="success" size="sm" badgeType="outlined" text="Badge" />
  </>
);

const SampleCtas = ({ variant }: { variant: string }) => {
  const btnVariant = variant === "black" ? "white" : "black";
  return (
    <>
      <Button buttonStyle="tertiary" variant={btnVariant} size="sm" text="Skip" />
      <Button buttonStyle="primary" variant={btnVariant} size="sm" text="Next" />
    </>
  );
};

const SampleCtasLg = ({ variant }: { variant: string }) => {
  const btnVariant = variant === "black" ? "white" : "black";
  return (
    <>
      <Button buttonStyle="tertiary" variant={btnVariant} size="md" text="Skip" />
      <Button buttonStyle="primary" variant={btnVariant} size="md" text="Next" />
    </>
  );
};

const meta: Meta<CoachmarksProps> = {
  title: "Tarmac TDS/Coachmarks",
  component: Coachmarks,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<CoachmarksProps>;

// ─── Playground ───────────────────────────────────────────────────────────────
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    variant: "white",
    size: "sm",
    arrowPosition: "top-left",
    title: "Title goes here!",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    size: { control: "select", options: [...SIZES] },
    arrowPosition: { control: "select", options: [...ARROW_POSITIONS] },
    title: { control: "text" },
    description: { control: "text" },
  },
  render: (args) => (
    <Coachmarks
      {...args}
      image={<SampleImage />}
      badges={<SampleBadges variant={args.variant || "white"} />}
      ctas={<SampleCtas variant={args.variant || "white"} />}
    />
  ),
};

// ─── White Variant ────────────────────────────────────────────────────────────
export const White: Story = {
  name: "White",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", padding: 24 }}>
      {(["sm", "lg"] as const).map((size) => (
        <Coachmarks
          key={size}
          variant="white"
          size={size}
          arrowPosition="top-left"
          title="Title goes here!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image={<SampleImage />}
          badges={<SampleBadges variant="white" />}
          ctas={size === "sm" ? <SampleCtas variant="white" /> : <SampleCtasLg variant="white" />}
        />
      ))}
    </div>
  ),
};

// ─── Black Variant ────────────────────────────────────────────────────────────
export const Black: Story = {
  name: "Black",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ backgroundColor: "#f0f0f0", padding: 24, display: "flex", gap: 32, flexWrap: "wrap" }}>
      {(["sm", "lg"] as const).map((size) => (
        <Coachmarks
          key={size}
          variant="black"
          size={size}
          arrowPosition="top-left"
          title="Title goes here!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image={<SampleImage />}
          badges={<SampleBadges variant="black" />}
          ctas={size === "sm" ? <SampleCtas variant="black" /> : <SampleCtasLg variant="black" />}
        />
      ))}
    </div>
  ),
};

// ─── Small Size ───────────────────────────────────────────────────────────────
export const SizeSmall: Story = {
  name: "Size — Small",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", padding: 24 }}>
      <Coachmarks
        variant="white"
        size="sm"
        arrowPosition="top-left"
        title="Title goes here!"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        image={<SampleImage />}
        badges={<SampleBadges variant="white" />}
        ctas={<SampleCtas variant="white" />}
      />
      <div >
        <Coachmarks
          variant="black"
          size="sm"
          arrowPosition="top-left"
          title="Title goes here!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image={<SampleImage />}
          badges={<SampleBadges variant="black" />}
          ctas={<SampleCtas variant="black" />}
        />
      </div>
    </div>
  ),
};

// ─── Large Size ───────────────────────────────────────────────────────────────
export const SizeLarge: Story = {
  name: "Size — Large",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", padding: 24 }}>
      <Coachmarks
        variant="white"
        size="lg"
        arrowPosition="top-left"
        title="Title goes here!"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        image={<SampleImage />}
        badges={<SampleBadges variant="white" />}
        ctas={<SampleCtasLg variant="white" />}
      />
      <div >
        <Coachmarks
          variant="black"
          size="lg"
          arrowPosition="top-left"
          title="Title goes here!"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image={<SampleImage />}
          badges={<SampleBadges variant="black" />}
          ctas={<SampleCtasLg variant="black" />}
        />
      </div>
    </div>
  ),
};

// ─── Arrow Positions ──────────────────────────────────────────────────────────
export const ArrowPositions: Story = {
  name: "Arrow Positions",
  render: () => (
    <div style={{ padding: 48, display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 48 }}>
      {ARROW_POSITIONS.map((pos) => (
        <div key={pos} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#666" }}>{pos}</span>
          <Coachmarks
            variant="white"
            size="sm"
            arrowPosition={pos}
            title="Title goes here!"
            description="Short description."
          />
        </div>
      ))}
    </div>
  ),
};

// ─── With Image ───────────────────────────────────────────────────────────────
export const WithImage: Story = {
  name: "With Image",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <Coachmarks
        variant="white"
        size="sm"
        arrowPosition="top-left"
        title="Feature highlight"
        description="This image helps illustrate the feature."
        image={<SampleImage />}
        ctas={<SampleCtas variant="white" />}
      />
      <Coachmarks
        variant="white"
        size="sm"
        arrowPosition="top-left"
        title="No image"
        description="This coachmark has no image slot."
        ctas={<SampleCtas variant="white" />}
      />
    </div>
  ),
};

// ─── With Badges ──────────────────────────────────────────────────────────────
export const WithBadges: Story = {
  name: "With Badges",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <Coachmarks
        variant="white"
        size="sm"
        arrowPosition="top-left"
        title="Categorized feature"
        description="Badges provide context about this feature."
        badges={<SampleBadges variant="white" />}
        ctas={<SampleCtas variant="white" />}
      />
      <Coachmarks
        variant="white"
        size="sm"
        arrowPosition="top-left"
        title="No badges"
        description="This coachmark has no badge row."
        ctas={<SampleCtas variant="white" />}
      />
    </div>
  ),
};

// ─── With CTAs ────────────────────────────────────────────────────────────────
export const WithCTAs: Story = {
  name: "With CTAs",
  parameters: { layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <Coachmarks
        variant="white"
        size="sm"
        arrowPosition="top-left"
        title="Step 1 of 3"
        description="Navigate through the onboarding flow."
        ctas={<SampleCtas variant="white" />}
      />
      <Coachmarks
        variant="white"
        size="sm"
        arrowPosition="top-left"
        title="No CTAs"
        description="This coachmark has no action buttons."
      />
    </div>
  ),
};

// ─── Full Matrix ──────────────────────────────────────────────────────────────
export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 48 }}>
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <h3 style={{ fontFamily: "sans-serif", marginBottom: 16, color: variant === "black" ? "#fff" : "#000", backgroundColor: variant === "black" ? "#111" : "transparent", padding: variant === "black" ? "4px 8px" : 0, borderRadius: 4 }}>
            {variant}
          </h3>
          <div style={{ backgroundColor: variant === "black" ? "#111" : "transparent", padding: variant === "black" ? 16 : 0, borderRadius: 8, display: "flex", gap: 32, flexWrap: "wrap" }}>
            {SIZES.map((size) => (
              <div key={size} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "sans-serif", fontSize: 12, color: variant === "black" ? "#aaa" : "#666" }}>{size}</span>
                <Coachmarks
                  variant={variant}
                  size={size}
                  arrowPosition="top-left"
                  title="Title goes here!"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  image={<SampleImage />}
                  badges={<SampleBadges variant={variant} />}
                  ctas={size === "sm" ? <SampleCtas variant={variant} /> : <SampleCtasLg variant={variant} />}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Light vs Dark Mode ───────────────────────────────────────────────────────
export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 24 }}>
      <div>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, marginBottom: 8 }}>Light</p>
        <Coachmarks
          variant="white"
          size="sm"
          arrowPosition="top-left"
          title="Light mode"
          description="Tokens resolve to light values."
          ctas={<SampleCtas variant="white" />}
        />
      </div>
      <DarkWrap>
        <p style={{ fontFamily: "sans-serif", fontSize: 12, marginBottom: 8, color: "#aaa" }}>Dark</p>
        <Coachmarks
          variant="white"
          size="sm"
          arrowPosition="top-left"
          title="Dark mode"
          description="Tokens resolve to dark values."
          ctas={<SampleCtas variant="white" />}
        />
      </DarkWrap>
    </div>
  ),
};

// ─── Anchored via AnchoredOverlay — Click ─────────────────────────────────────
const AnchoredClickDemo = ({ coachVariant, placement }: { coachVariant: "white" | "black"; placement: AnchoredOverlayPlacement }) => {
  const [actualPlacement, setActualPlacement] = useState<AnchoredOverlayPlacement>(placement);
  const arrowPos = placementToCoachmarksArrow(actualPlacement);
  const btnVariant = coachVariant === "black" ? "white" : "black";
  return (
    <AnchoredOverlay
      trigger="click"
      placement={placement}
      interactive
      dismissOnOutsideClick
      gap={8}
      onPlacementChange={setActualPlacement}
      content={
        <Coachmarks
          variant={coachVariant}
          size="sm"
          arrowPosition={arrowPos}
          title="Click to open"
          description="Arrow auto-syncs if the overlay flips due to viewport overflow. Click outside to dismiss."
          image={<SampleImage />}
          badges={<SampleBadges variant={coachVariant} />}
          ctas={
            <>
              <Button buttonStyle="tertiary" variant={btnVariant} size="sm" text="Skip" />
              <Button buttonStyle="primary" variant={btnVariant} size="sm" text="Got it" />
            </>
          }
        />
      }
    >
      <Button buttonStyle="primary" variant="black" size="sm" text={`Click — ${placement}`} />
    </AnchoredOverlay>
  );
};

export const AnchoredOnClick: Story = {
  name: "Anchored — Button Click",
  parameters: { layout: "fullscreen" },
  render: () => (
    <Wrap>
      <div style={{ padding: 120, display: "flex", gap: 48, flexWrap: "wrap" }}>
        <AnchoredClickDemo coachVariant="white" placement="bottom-start" />
        <AnchoredClickDemo coachVariant="white" placement="top-start" />
        <AnchoredClickDemo coachVariant="black" placement="right-start" />
        <AnchoredClickDemo coachVariant="white" placement="left-start" />
      </div>
    </Wrap>
  ),
};

// ─── Anchored via AnchoredOverlay — Hover ─────────────────────────────────────
const AnchoredHoverDemo = ({ coachVariant, placement }: { coachVariant: "white" | "black"; placement: AnchoredOverlayPlacement }) => {
  const [actualPlacement, setActualPlacement] = useState<AnchoredOverlayPlacement>(placement);
  const arrowPos = placementToCoachmarksArrow(actualPlacement);
  return (
    <AnchoredOverlay
      trigger="hover"
      placement={placement}
      interactive
      enterDelay={150}
      leaveDelay={300}
      gap={8}
      onPlacementChange={setActualPlacement}
      content={
        <Coachmarks
          variant={coachVariant}
          size="sm"
          arrowPosition={arrowPos}
          title="Hover coachmark"
          description="AnchoredOverlay handles portal, positioning, scroll tracking and viewport flip."
          image={<SampleImage />}
          badges={<SampleBadges variant={coachVariant} />}
          ctas={<SampleCtas variant={coachVariant} />}
        />
      }
    >
      <Button buttonStyle="secondary" variant="black" size="sm" text={`Hover — ${placement}`} />
    </AnchoredOverlay>
  );
};

export const AnchoredOnHover: Story = {
  name: "Anchored — Hover",
  parameters: { layout: "fullscreen" },
  render: () => (
    <Wrap>
      <div style={{ padding: 120, display: "flex", gap: 48, flexWrap: "wrap" }}>
        <AnchoredHoverDemo coachVariant="white" placement="bottom-start" />
        <AnchoredHoverDemo coachVariant="white" placement="top-start" />
        <AnchoredHoverDemo coachVariant="black" placement="right-start" />
        <AnchoredHoverDemo coachVariant="white" placement="left-start" />
      </div>
    </Wrap>
  ),
};
