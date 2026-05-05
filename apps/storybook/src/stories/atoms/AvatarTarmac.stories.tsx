import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { AvatarProps } from "@delhivery/tarmac";

const TYPES = ["initials", "image", "numeric", "icon"] as const;
const SHAPES = ["round", "square"] as const;
const SIZES = ["xl", "lg", "md", "sm"] as const;
const STATES = ["default", "hover", "focused", "disabled", "ghost"] as const;
const STATUS_TYPES = ["active", "inactive", "idle", "brand"] as const;
type ShowcaseState = (typeof STATES)[number];

const SIZE_LABELS: Record<string, string> = { xl: "XLarge", lg: "Large", md: "Medium", sm: "Small" };
const SAMPLE_IMG = "https://i.pravatar.cc/96?img=12";

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const Ico = ({ s = 24 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

/** Storybook-only wrapper — reads theme tokens to simulate hover/focused states statically */
const ShowcaseAvatar: React.FC<AvatarProps & { showcaseState: ShowcaseState }> = ({
  showcaseState,
  ...props
}) => {
  const { theme } = useTheme();
  const cfg = theme.components?.avatar;
  const dc = cfg?.default || {};

  if (showcaseState === "default") return <Avatar {...props} />;
  if (showcaseState === "disabled") return <Avatar {...props} isDisabled />;
  if (showcaseState === "ghost") return <Avatar {...props} isGhost />;

  const isSmall = props.size === "sm";
  const overrides: Record<string, string | undefined> = {};

  if (showcaseState === "hover") {
    overrides.backgroundColor = dc.hoverBackgroundColor || dc.backgroundColor;
    overrides.color = dc.hoverTextColor || dc.textColor;
    overrides.borderColor = dc.hoverBorderColor || dc.borderColor;
    overrides.borderWidth = isSmall ? (dc.borderWidth || "0.5px") : (dc.hoverBorderWidth ? `${dc.hoverBorderWidth}px` : "1px");
  } else if (showcaseState === "focused") {
    overrides.backgroundColor = dc.focusBackgroundColor || dc.backgroundColor;
    overrides.color = dc.focusTextColor || dc.textColor;
    overrides.borderColor = dc.focusBorderColor || dc.borderColor;
    overrides.borderWidth = isSmall ? (dc.borderWidth || "0.5px") : (dc.focusBorderWidth ? `${dc.focusBorderWidth}px` : "1px");
    overrides.boxShadow = dc.focusRingColor
      ? `0 0 0 2px ${dc.focusRingColor}`
      : "0 0 0 2px rgba(0,0,0,0.4)";
  }

  return <Avatar {...props} className={css(overrides)} />;
};

/** Content helper for each avatar type */
function avatarContent(
  type: (typeof TYPES)[number],
  size: (typeof SIZES)[number],
): Partial<AvatarProps> {
  const iconSizes: Record<string, number> = { xl: 28, lg: 28, md: 24, sm: 16 };
  switch (type) {
    case "image":
      return { avatarType: "image", src: SAMPLE_IMG, alt: "User" };
    case "numeric":
      return { avatarType: "numeric", children: "+2" };
    case "icon":
      return { avatarType: "icon", icon: <Ico s={iconSizes[size] || 24} /> };
    default:
      return { avatarType: "initials", children: "AB" };
  }
}

/* ═══ Meta ═══ */
const meta: Meta<AvatarProps> = {
  title: "Tarmac TDS/Avatar",
  component: Avatar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<AvatarProps>;

/* ═══ Story 1: Playground ═══ */
export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    avatarType: "initials",
    shape: "round",
    size: "lg",
    showStatus: false,
    statusType: "active",
    isDisabled: false,
    isGhost: false,
    children: "AB",
  },
  argTypes: {
    avatarType: { control: "select", options: [...TYPES] },
    shape: { control: "select", options: [...SHAPES] },
    size: { control: "select", options: [...SIZES] },
    showStatus: { control: "boolean" },
    statusType: { control: "select", options: [...STATUS_TYPES] },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
  },
  render: (args) => {
    const iconSizes: Record<string, number> = { xl: 28, lg: 28, md: 24, sm: 16 };
    const extraProps =
      args.avatarType === "image"
        ? { src: SAMPLE_IMG, alt: "User" }
        : args.avatarType === "icon"
          ? { icon: <Ico s={iconSizes[args.size || "lg"]} /> }
          : {};
    return <Avatar {...args} {...extraProps} />;
  },
};

/* ═══ Styles ═══ */
const st: Record<string, React.CSSProperties> = {
  page: { padding: 24, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title: { fontSize: 15, fontWeight: 700, color: "#374151", margin: "28px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  subtitle: { fontSize: 12, fontWeight: 600, color: "#6b7280", margin: "16px 0 4px" },
  grid: { display: "grid", gridTemplateColumns: "140px repeat(5, 1fr)", gap: "8px 12px", alignItems: "center" },
  colHdr: { fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, textAlign: "center" as const },
  rowLabel: { fontSize: 9, color: "#b0b0b0", textAlign: "right" as const, paddingRight: 8 },
  cell: { display: "flex", justifyContent: "center", alignItems: "center", padding: "4px 0" },
};

/* ═══ Story 2: Full Matrix ═══ */
const TypeShapeSection: React.FC<{
  type: (typeof TYPES)[number];
  shape: (typeof SHAPES)[number];
}> = ({ type, shape }) => (
  <div>
    <div style={st.subtitle}>{type} / {shape}</div>
    <div style={st.grid}>
      <div />
      {STATES.map((s) => <div key={s} style={st.colHdr}>{s}</div>)}
      {SIZES.map((sz) => (
        <React.Fragment key={sz}>
          <div style={st.rowLabel}>{SIZE_LABELS[sz]}</div>
          {STATES.map((state) => (
            <div key={state} style={st.cell}>
              <ShowcaseAvatar
                showcaseState={state}
                shape={shape}
                size={sz}
                showStatus={shape === "round"}
                statusType="active"
                {...avatarContent(type, sz)}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={st.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>
        4 Types × 2 Shapes × 4 Sizes × 5 States = 160 combinations
      </p>
      {TYPES.map((type) =>
        SHAPES.map((shape) => (
          <div key={`${type}-${shape}`}>
            <div style={st.title}>{type} — {shape}</div>
            <TypeShapeSection type={type} shape={shape} />
          </div>
        ))
      )}
    </div>
  ),
};

/* ═══ Story 3: Status Dots ═══ */
export const StatusDots: Story = {
  name: "Status Dots",
  render: () => (
    <div style={{ ...st.page, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
      {STATUS_TYPES.map((t) =>
        SIZES.map((sz) => (
          <div key={`${t}-${sz}`} style={{ textAlign: "center" }}>
            <Avatar size={sz} shape="round" showStatus statusType={t}>AB</Avatar>
            <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 4 }}>{t}/{sz}</div>
          </div>
        ))
      )}
    </div>
  ),
};

/* ═══ Story 4: Shapes Comparison ═══ */
export const ShapesComparison: Story = {
  name: "Shapes",
  render: () => (
    <div style={{ ...st.page, display: "flex", gap: 32 }}>
      {SHAPES.map((shape) => (
        <div key={shape}>
          <div style={st.title}>{shape}</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {SIZES.map((sz) => (
              <Avatar key={sz} size={sz} shape={shape}>AB</Avatar>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};


/* ═══ Dark Mode Comparison ═══ */
const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme" modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {TYPES.map((type) => (
              <div key={type} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {SIZES.map((sz) => (
                  <Avatar key={sz} size={sz} shape="round" showStatus {...avatarContent(type, sz)} />
                ))}
                {SIZES.map((sz) => (
                  <Avatar key={`sq-${sz}`} size={sz} shape="square" {...avatarContent(type, sz)} />
                ))}
              </div>
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {TYPES.map((type) => (
              <div key={type} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {SIZES.map((sz) => (
                  <Avatar key={sz} size={sz} shape="round" showStatus {...avatarContent(type, sz)} />
                ))}
                {SIZES.map((sz) => (
                  <Avatar key={`sq-${sz}`} size={sz} shape="square" {...avatarContent(type, sz)} />
                ))}
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
