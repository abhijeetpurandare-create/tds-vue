import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { OtpInput, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type {
  OtpInputProps,
  OtpFieldStyleVariant,
  OtpFieldSize,
} from "@delhivery/tarmac";

// ─── Constants ───────────────────────────────────────────────────────────────

const STYLES: OtpFieldStyleVariant[] = ["default", "success", "error", "info"];
const SIZES: OtpFieldSize[] = ["lg", "md", "sm"];

const STYLE_LABELS: Record<string, string> = {
  default: "Default",
  success: "Success",
  error: "Error",
  info: "Info",
};
const SIZE_LABELS: Record<string, string> = {
  lg: "Large",
  md: "Medium",
  sm: "Small",
};

type ShowcaseState = "default" | "hover" | "focused" | "disabled" | "ghost";
const STATES: ShowcaseState[] = [
  "default",
  "hover",
  "focused",
  "disabled",
  "ghost",
];

// ─── Icons ───────────────────────────────────────────────────────────────────

const InfoIco = ({ s = 16 }: { s?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={s}
    height={s}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

// ─── Theme Wrappers ──────────────────────────────────────────────────────────

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider
    initialSource="./tarmac-theme.json"
    activeTheme="tarmac-theme"
  >
    {children}
  </ThemeProvider>
);

const DarkWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider
    initialSource="./tarmac-theme.json"
    activeTheme="tarmac-theme"
    modeOverrides={{ "DLV_Mapped ": "Dark" }}
  >
    <div
      style={{ backgroundColor: "#1a1a1a", padding: 24, borderRadius: 8 }}
    >
      {children}
    </div>
  </ThemeProvider>
);

// ─── ShowcaseWrapper — storybook-only, forces visual states via theme tokens ─

const ShowcaseOtpFields: React.FC<
  OtpInputProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.otpFields_tarmac;
  const sc =
    cfg?.styles?.[props.otpFieldStyle || "default"] || {};

  if (showcaseState === "default") return <OtpInput {...props} />;
  if (showcaseState === "disabled")
    return <OtpInput {...props} isDisabled />;
  if (showcaseState === "ghost") return <OtpInput {...props} isGhost />;

  if (showcaseState === "hover") {
    const overrides = css({
      // Input box hover overrides
      "& input": {
        borderColor: `${sc.hoverBorderColor || sc.borderColor} !important`,
        backgroundColor: `${sc.hoverBackgroundColor || sc.backgroundColor} !important`,
      },
      // Title/icon/helper text hover color changes
      "& .otp-title-text": {
        color: `${sc.hoverTitleColor || sc.titleColor} !important`,
      },
      "& .otp-title-icon": {
        color: `${sc.hoverTitleIconColor || sc.titleIconColor} !important`,
      },
      "& .otp-helper-text": {
        color: `${sc.hoverHelperTextColor || sc.helperTextTopColor} !important`,
      },
    });
    return <OtpInput {...props} className={overrides} />;
  }

  if (showcaseState === "focused") {
    const base = cfg?.base || {};
    const focusRing = sc.focusRingColor || "rgba(0,0,0,0.4)";
    const spread = base.focusRingSpread || "2px";
    const overrides = css({
      "& input": {
        boxShadow: `0 0 0 ${spread} ${focusRing} !important`,
        borderColor: `${sc.focusBorderColor || sc.borderColor} !important`,
      },
      "& .otp-title-text": {
        color: `${sc.hoverTitleColor || sc.titleColor} !important`,
      },
      "& .otp-title-icon": {
        color: `${sc.hoverTitleIconColor || sc.titleIconColor} !important`,
      },
      "& .otp-helper-text": {
        color: `${sc.hoverHelperTextColor || sc.helperTextTopColor} !important`,
      },
    });
    return <OtpInput {...props} className={overrides} />;
  }

  return <OtpInput {...props} />;
};

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<OtpInputProps> = {
  title: "Tarmac TDS/OTP Fields",
  component: OtpInput,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<OtpInputProps>;

// ─── Shared Styles ───────────────────────────────────────────────────────────

const st: Record<string, React.CSSProperties> = {
  page: {
    padding: 24,
    fontFamily: "Noto Sans, sans-serif",
    fontSize: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: 700,
    color: "#374151",
    margin: "32px 0 8px",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#6b7280",
    margin: "16px 0 8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "120px repeat(5, 1fr)",
    gap: "8px 12px",
    alignItems: "start",
  },
  colHdr: {
    fontSize: 10,
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
    padding: "4px 0",
  },
  rowLabel: {
    fontSize: 9,
    color: "#b0b0b0",
    textAlign: "right" as const,
    paddingRight: 8,
    paddingTop: 8,
  },
  cell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    padding: "4px 0",
  },
};

// ─── Default Props for Showcase ──────────────────────────────────────────────

const defaultShowcaseProps: Partial<OtpInputProps> = {
  otpStyle: "tarmac-01",
  numDigits: 4,
  title: "OTP Code",
  titleIcon: <InfoIco s={14} />,
  helperTextTop: "Helper",
  subtext: "Subtext",
  helperTextBottom: "Helper bottom",
  placeholder: "_",
};

/* ═══ Story 1: Interactive Playground ═══ */

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    otpStyle: "tarmac-01",
    numDigits: 6,
    otpSize: "lg",
    otpFieldStyle: "default",
    isDisabled: false,
    isGhost: false,
    title: "Enter OTP",
    titleIcon: true as any,
    helperTextTop: "Helper top",
    helperTextBottom: "Helper bottom",
    subtext: "Subtext",
    placeholder: "_",
  },
  argTypes: {
    numDigits: { control: { type: "number", min: 1, max: 12 } },
    otpSize: { control: "select", options: [...SIZES] },
    otpFieldStyle: { control: "select", options: [...STYLES] },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
    title: { control: "text" },
    titleIcon: { control: "boolean", description: "Show title icon (ReactNode toggle)" },
    helperTextTop: { control: "text" },
    helperTextBottom: { control: "text" },
    subtext: { control: "text" },
    placeholder: { control: "text" },
    inputType: { control: "select", options: ["text", "password", "number"] },
  },
  render: ({ titleIcon, ...args }) => (
    <div style={{ width: 420 }}>
      <OtpInput
        {...args}
        otpStyle="tarmac-01"
        titleIcon={titleIcon ? <InfoIco s={14} /> : undefined}
      />
    </div>
  ),
};

/* ═══ Reusable Section Components ═══ */

/** Renders a single style across all sizes and states */
const StyleSection: React.FC<{
  otpFieldStyle: OtpFieldStyleVariant;
  numDigits?: number;
}> = ({ otpFieldStyle, numDigits = 4 }) => (
  <div>
    <div style={st.title}>{STYLE_LABELS[otpFieldStyle] || otpFieldStyle}</div>
    {SIZES.map((size) => (
      <div key={size}>
        <div style={st.subtitle}>{SIZE_LABELS[size] || size}</div>
        <div style={st.grid}>
          <div />
          {STATES.map((s) => (
            <div key={s} style={st.colHdr}>{s}</div>
          ))}
          <div style={st.rowLabel}>
            {numDigits}-digit
          </div>
          {STATES.map((state) => (
            <div key={state} style={st.cell}>
              <ShowcaseOtpFields
                {...defaultShowcaseProps}
                otpFieldStyle={otpFieldStyle}
                otpSize={size}
                numDigits={numDigits}
                showcaseState={state}
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ═══ Story 2: Full Matrix — Style × Size × State for 4-Number and 6-Number ═══ */

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={st.page}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
        OTP Fields — Full Variant Matrix
      </div>
      {[4, 6].map((digits) => (
        <div key={digits}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#111827",
              margin: "24px 0 8px",
              borderBottom: "3px solid #374151",
              paddingBottom: 4,
            }}
          >
            {digits}-Number Type
          </div>
          {STYLES.map((style) => (
            <StyleSection
              key={style}
              otpFieldStyle={style}
              numDigits={digits}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

/* ═══ Stories 3–6: Per-Style ═══ */

const perStyle = (otpFieldStyle: OtpFieldStyleVariant): Story => ({
  render: () => (
    <div style={st.page}>
      <StyleSection otpFieldStyle={otpFieldStyle} numDigits={4} />
      <StyleSection otpFieldStyle={otpFieldStyle} numDigits={6} />
    </div>
  ),
});

export const Default: Story = { name: "Default", ...perStyle("default") };
export const Success: Story = { name: "Success", ...perStyle("success") };
export const Error: Story = { name: "Error", ...perStyle("error") };
export const Info: Story = { name: "Info", ...perStyle("info") };

/* ═══ Story 7: Disabled State ═══ */

const DisabledSection: React.FC = () => (
  <div style={st.page}>
    <div style={st.title}>Disabled State</div>
    {STYLES.map((style) => (
      <div key={style}>
        <div style={st.subtitle}>{STYLE_LABELS[style]}</div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {SIZES.map((size) => (
            <div key={size}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
                {SIZE_LABELS[size]}
              </div>
              <OtpInput
                {...defaultShowcaseProps}
                otpFieldStyle={style}
                otpSize={size}
                isDisabled
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Disabled: Story = {
  name: "Disabled",
  render: () => <DisabledSection />,
};

/* ═══ Story 8: Ghost State ═══ */

const GhostSection: React.FC = () => (
  <div style={st.page}>
    <div style={st.title}>Ghost / Skeleton State</div>
    {STYLES.map((style) => (
      <div key={style}>
        <div style={st.subtitle}>{STYLE_LABELS[style]}</div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {SIZES.map((size) => (
            <div key={size}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
                {SIZE_LABELS[size]}
              </div>
              <OtpInput
                {...defaultShowcaseProps}
                otpFieldStyle={style}
                otpSize={size}
                isGhost
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Ghost: Story = {
  name: "Ghost",
  render: () => <GhostSection />,
};

/* ═══ Story 9: Boolean Toggles ═══ */

const TOGGLE_COMBOS: { label: string; props: Partial<OtpInputProps> }[] = [
  { label: "All toggles ON", props: { title: "OTP Code", titleIcon: <InfoIco s={14} />, helperTextTop: "Helper top", subtext: "Subtext", helperTextBottom: "Helper bottom" } },
  { label: "Title only", props: { title: "OTP Code" } },
  { label: "Title + Icon", props: { title: "OTP Code", titleIcon: <InfoIco s={14} /> } },
  { label: "Helper text top only", props: { helperTextTop: "Helper top" } },
  { label: "Subtext only", props: { subtext: "Subtext here" } },
  { label: "Helper text bottom only", props: { helperTextBottom: "Helper bottom" } },
  { label: "Subtext + Helper bottom", props: { subtext: "Subtext", helperTextBottom: "Helper bottom" } },
  { label: "Title + Subtext (no helpers)", props: { title: "OTP Code", subtext: "Subtext" } },
  { label: "No toggles (inputs only)", props: {} },
];

export const BooleanToggles: Story = {
  name: "Boolean Toggles",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Boolean Toggle Combinations</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {TOGGLE_COMBOS.map(({ label, props: toggleProps }) => (
          <div key={label}>
            <div style={st.subtitle}>{label}</div>
            <OtpInput
              otpStyle="tarmac-01"
              numDigits={4}
              otpSize="lg"
              otpFieldStyle="default"
              placeholder="_"
              {...toggleProps}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 10: 4-Number vs 6-Number ═══ */

export const FourVsSixNumber: Story = {
  name: "4-Number vs 6-Number",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>4-Number vs 6-Number Comparison</div>
      {SIZES.map((size) => (
        <div key={size}>
          <div style={st.subtitle}>{SIZE_LABELS[size]}</div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
                4-Number
              </div>
              <OtpInput
                {...defaultShowcaseProps}
                otpSize={size}
                numDigits={4}
              />
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
                6-Number
              </div>
              <OtpInput
                {...defaultShowcaseProps}
                otpSize={size}
                numDigits={6}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ═══ Story 11: Light vs Dark Mode ═══ */

export const LightVsDarkMode: Story = {
  name: "Light vs Dark Mode",
  decorators: [], // override default decorator — we provide our own wrappers
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
          Light Mode
        </div>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {STYLES.map((style) => (
              <div key={style}>
                <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>
                  {STYLE_LABELS[style]}
                </div>
                <OtpInput
                  {...defaultShowcaseProps}
                  otpFieldStyle={style}
                  numDigits={4}
                />
              </div>
            ))}
          </div>
        </Wrap>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
          Dark Mode
        </div>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {STYLES.map((style) => (
              <div key={style}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    marginBottom: 4,
                  }}
                >
                  {STYLE_LABELS[style]}
                </div>
                <OtpInput
                  {...defaultShowcaseProps}
                  otpFieldStyle={style}
                  numDigits={4}
                />
              </div>
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
