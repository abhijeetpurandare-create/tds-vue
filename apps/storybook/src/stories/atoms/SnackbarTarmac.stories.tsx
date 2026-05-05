import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Snackbar, ThemeProvider } from "@delhivery/tarmac";
import type { SnackbarProps } from "@delhivery/tarmac";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faCircleInfo,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const VARIANTS = ["black", "white", "info", "positive", "negative", "warning"] as const;
const STYLES = ["filled", "subtle", "outlined"] as const;
const SIZES = ["lg", "md", "sm"] as const;
type V = (typeof VARIANTS)[number];

const FIGMA_TEXT = "Content shown here is for visual reference";
const FIGMA_DESC = "Add your text here !";

const VARIANT_ICONS: Record<V, typeof faBell> = {
  black: faBell, white: faBell, info: faCircleInfo,
  positive: faCircleCheck, negative: faCircleXmark, warning: faCircleExclamation,
};

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}>
    <div style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}>{children}</div>
  </ThemeProvider>
);

const meta: Meta<SnackbarProps> = {
  title: "Tarmac TDS/Snackbar",
  component: Snackbar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    variant: { control: "select", options: [...VARIANTS] },
    snackbarStyle: { control: "select", options: [...STYLES] },
    size: { control: "select", options: [...SIZES] },
    title: { control: "text" },
    message: { control: "text" },
    closable: { control: "boolean" },
    ctAs: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<SnackbarProps>;

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    variant: "black",
    snackbarStyle: "filled",
    size: "lg",
    title: "",
    message: FIGMA_TEXT,
    closable: true,
    ctAs: false,
    denyText: "Deny",
    approveText: "Approve",
    duration: 0,
  },
  render: (args) => {
    const { title, ...rest } = args;
    return (
      <div style={{ width: 480 }}>
        <Snackbar {...rest} title={title || undefined} />
      </div>
    );
  },
};

/* ── Variant Section helper ──────────────────────────────────────────────── */

const VariantSection: React.FC<{ variant: V }> = ({ variant }) => {
  const needsDarkBg = variant === "white" || variant === "black";
  const wrapStyle: React.CSSProperties = needsDarkBg && variant === "black"
    ? { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 8 }
    : {};

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#333", marginBottom: 12, textTransform: "capitalize" }}>
        {variant}
      </div>
      <div style={wrapStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {STYLES.map((sty) =>
            SIZES.map((sz) => (
              <div key={`${sty}-${sz}`}>
                <div style={{ fontSize: 10, color: "#999", marginBottom: 4 }}>{sty} / {sz}</div>
                <Snackbar
                  variant={variant}
                  snackbarStyle={sty}
                  size={sz}
                  message={FIGMA_TEXT}
                  duration={0}
                  trailingIcon={false}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={{ padding: 32 }}>
      {VARIANTS.map((v) => <VariantSection key={v} variant={v} />)}
    </div>
  ),
};

const vs = (variant: V): Story => ({
  render: () => <div style={{ padding: 32 }}><VariantSection variant={variant} /></div>,
});
export const Black: Story = { name: "Black", ...vs("black") };
export const White: Story = { name: "White", ...vs("white") };
export const Info: Story = { name: "Info", ...vs("info") };
export const Positive: Story = { name: "Positive", ...vs("positive") };
export const Negative: Story = { name: "Negative", ...vs("negative") };
export const Warning_: Story = { name: "Warning", ...vs("warning") };

/* ── Per-Style stories ────────────────────────────────────────────────────── */

const StyleSection: React.FC<{ snackbarStyle: typeof STYLES[number] }> = ({ snackbarStyle }) => (
  <div style={{ padding: 32 }}>
    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, textTransform: "capitalize" }}>{snackbarStyle}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>
      {VARIANTS.map((v) => (
        <Snackbar key={v} variant={v} snackbarStyle={snackbarStyle} size="lg"
          message={FIGMA_TEXT} duration={0} trailingIcon={false} />
      ))}
    </div>
  </div>
);

export const Filled: Story = {
  name: "Filled",
  render: () => <StyleSection snackbarStyle="filled" />,
};

export const Subtle: Story = {
  name: "Subtle",
  render: () => <StyleSection snackbarStyle="subtle" />,
};

export const Outlined: Story = {
  name: "Outlined",
  render: () => <StyleSection snackbarStyle="outlined" />,
};

/* ── Dual Text ────────────────────────────────────────────────────────────── */

export const DualText: Story = {
  name: "Dual Text",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, maxWidth: 500 }}>
      {STYLES.map((sty) => (
        <div key={sty}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: "capitalize" }}>{sty}</div>
          {VARIANTS.map((v) => (
            <div key={v} style={{ marginBottom: 8 }}>
              <Snackbar variant={v} snackbarStyle={sty} size="lg"
                title={FIGMA_TEXT} message={FIGMA_DESC} duration={0} trailingIcon={false} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ── With CTAs ────────────────────────────────────────────────────────────── */

export const WithCTAs: Story = {
  name: "With CTAs",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, maxWidth: 500 }}>
      {STYLES.map((sty) => (
        <div key={sty}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: "capitalize" }}>{sty}</div>
          {VARIANTS.map((v) => (
            <div key={v} style={{ marginBottom: 8 }}>
              <Snackbar variant={v} snackbarStyle={sty} size="lg"
                message={FIGMA_TEXT} ctAs denyText="Deny" approveText="Approve"
                duration={0} trailingIcon={false} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ── With Leading Icon ────────────────────────────────────────────────────── */

export const WithLeadingIcon: Story = {
  name: "With Leading Icon",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, maxWidth: 500 }}>
      {VARIANTS.map((v) => (
        <Snackbar key={v} variant={v} snackbarStyle="filled" size="lg"
          leadingIcon={<FontAwesomeIcon icon={VARIANT_ICONS[v]} />}
          title={FIGMA_TEXT} message={FIGMA_DESC} duration={0} trailingIcon={false} />
      ))}
    </div>
  ),
};

/* ── Sizes ─────────────────────────────────────────────────────────────────── */

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24, maxWidth: 500 }}>
      {SIZES.map((sz) => (
        <div key={sz}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>{sz}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Snackbar variant="black" snackbarStyle="filled" size={sz}
              message={FIGMA_TEXT} duration={0} trailingIcon={false} />
            <Snackbar variant="info" snackbarStyle="filled" size={sz}
              title={FIGMA_TEXT} message={FIGMA_DESC} duration={0} trailingIcon={false} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ── Light vs Dark Mode ───────────────────────────────────────────────────── */

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 32 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Light Mode</div>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Snackbar key={v} variant={v} snackbarStyle="filled" size="lg"
                title={`${v} snackbar`} message={FIGMA_DESC} duration={0}
                leadingIcon={<FontAwesomeIcon icon={VARIANT_ICONS[v]} />} />
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Dark Mode</div>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Snackbar key={v} variant={v} snackbarStyle="filled" size="lg"
                title={`${v} snackbar`} message={FIGMA_DESC} duration={0}
                leadingIcon={<FontAwesomeIcon icon={VARIANT_ICONS[v]} />} />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};

export const LightVsDarkSubtle: Story = {
  name: "Light vs Dark (Subtle)",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 32 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Light Mode</div>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Snackbar key={v} variant={v} snackbarStyle="subtle" size="lg"
                title={`${v} snackbar`} message={FIGMA_DESC} duration={0}
                leadingIcon={<FontAwesomeIcon icon={VARIANT_ICONS[v]} />} />
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Dark Mode</div>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Snackbar key={v} variant={v} snackbarStyle="subtle" size="lg"
                title={`${v} snackbar`} message={FIGMA_DESC} duration={0}
                leadingIcon={<FontAwesomeIcon icon={VARIANT_ICONS[v]} />} />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};

export const LightVsDarkOutlined: Story = {
  name: "Light vs Dark (Outlined)",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 32 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Light Mode</div>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Snackbar key={v} variant={v} snackbarStyle="outlined" size="lg"
                title={`${v} snackbar`} message={FIGMA_DESC} duration={0}
                leadingIcon={<FontAwesomeIcon icon={VARIANT_ICONS[v]} />} />
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Dark Mode</div>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VARIANTS.map((v) => (
              <Snackbar key={v} variant={v} snackbarStyle="outlined" size="lg"
                title={`${v} snackbar`} message={FIGMA_DESC} duration={0}
                leadingIcon={<FontAwesomeIcon icon={VARIANT_ICONS[v]} />} />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
