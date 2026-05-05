import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, ThemeProvider, useTheme, Badge, InputAddon, DropdownList } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { InputProps, InputFieldType, InputFieldSize, InputFieldStyleVariant, StatusIndicatorType } from "@delhivery/tarmac";

// ─── Constants ───────────────────────────────────────────────────────────────

const TYPES: InputFieldType[] = ["regular", "success", "infoBlue", "error"];
const SIZES: InputFieldSize[] = ["lg", "md", "sm"];
const STYLE_VARIANTS: InputFieldStyleVariant[] = ["standard", "addonLeft", "addonRight"];
const STATUS_INDICATORS: StatusIndicatorType[] = ["success", "failed", "information"];

const TYPE_LABELS: Record<string, string> = { regular: "Regular", success: "Success", infoBlue: "Info Blue", error: "Error" };
const SIZE_LABELS: Record<string, string> = { lg: "Large", md: "Medium", sm: "Small" };
const STYLE_LABELS: Record<string, string> = { standard: "Standard", addonLeft: "Add-on Left", addonRight: "Add-on Right" };

type ShowcaseState = "default" | "hover" | "focused" | "disabled" | "ghost";
const STATES: ShowcaseState[] = ["default", "hover", "focused", "disabled", "ghost"];

// ─── Icons ───────────────────────────────────────────────────────────────────

const Ico = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const InfoIco = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
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

// ─── ShowcaseWrapper — storybook-only, forces visual states ──────────────────

const ShowcaseInput: React.FC<
  InputProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.inputField_tarmac;
  const tc = cfg?.types?.[props.inputType || "regular"] || {};

  if (showcaseState === "default") return <Input {...props} />;
  if (showcaseState === "disabled") return <Input {...props} isDisabled />;
  if (showcaseState === "ghost") return <Input {...props} isGhost />;

  if (showcaseState === "hover") {
    const overrides = css({
      '& > div:nth-child(2) > div, & > div:first-child > div': {
        borderColor: `${tc.hoverBorderColor || tc.borderColor} !important`,
        backgroundColor: `${tc.hoverBackgroundColor || tc.backgroundColor} !important`,
      },
    });
    return <Input {...props} className={overrides} />;
  }

  if (showcaseState === "focused") {
    const focusRing = tc.focusRingColor || "rgba(0,0,0,0.4)";
    const overrides = css({
      '& > div:nth-child(2) > div, & > div:first-child > div': {
        boxShadow: `0 0 0 2px ${focusRing} !important`,
        borderColor: `${tc.activeBorderColor || tc.borderColor} !important`,
      },
    });
    return <Input {...props} className={overrides} />;
  }

  return <Input {...props} />;
};

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<InputProps> = {
  title: "Tarmac TDS/Input Field",
  component: Input,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<InputProps>;

// ─── Shared Styles ───────────────────────────────────────────────────────────

const st: Record<string, React.CSSProperties> = {
  page: { padding: 24, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title: { fontSize: 15, fontWeight: 700, color: "#374151", margin: "32px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  subtitle: { fontSize: 13, fontWeight: 600, color: "#6b7280", margin: "16px 0 8px" },
  grid: { display: "grid", gridTemplateColumns: "120px repeat(5, 1fr)", gap: "8px 12px", alignItems: "start" },
  colHdr: { fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, textAlign: "center" as const, padding: "4px 0" },
  rowLabel: { fontSize: 9, color: "#b0b0b0", textAlign: "right" as const, paddingRight: 8, paddingTop: 8 },
  cell: { display: "flex", justifyContent: "center", alignItems: "start", padding: "4px 0", minWidth: 180 },
};

/* ═══ Story 1: Interactive Playground ═══ */

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    inputStyle: "tarmac-01",
    inputType: "regular",
    inputSize: "md",
    styleVariant: "standard",
    label: "Label",
    placeholder: "Placeholder text",
  },
  argTypes: {
    inputType: { control: "select", options: [...TYPES] },
    inputSize: { control: "select", options: [...SIZES] },
    styleVariant: { control: "select", options: [...STYLE_VARIANTS] },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
    isMandatory: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    addonText: { control: "text" },
    helperTextTop: { control: "text" },
    helperTextBottom: { control: "text" },
    statusText: { control: "text" },
    subtext: { control: "text" },
    statusIndicator: { control: "select", options: [undefined, ...STATUS_INDICATORS] },
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Input
        {...args}
        inputStyle="tarmac-01"
        leadingIcon={<Ico />}
        trailingIcon={<Ico />}
        titleIcon={<InfoIco s={14} />}
        badge={<Badge variant="coal" size="sm" badgeType="outlined" isDisabled text="Badge" />}
      />
    </div>
  ),
};

/* ═══ Story 2: Full Matrix — Type × Size × State per Style Variant ═══ */

const TypeSection: React.FC<{
  inputType: InputFieldType;
  styleVariant: InputFieldStyleVariant;
}> = ({ inputType, styleVariant }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={st.subtitle}>{TYPE_LABELS[inputType as string]}</div>
    <div style={st.grid}>
      <div />
      {STATES.map((s) => (
        <div key={s} style={st.colHdr}>{s}</div>
      ))}
      {SIZES.map((size) => (
        <React.Fragment key={size}>
          <div style={st.rowLabel}>{SIZE_LABELS[size as string]}</div>
          {STATES.map((state) => (
            <div key={state} style={st.cell}>
              <div style={{ width: "100%" }}>
                <ShowcaseInput
                  showcaseState={state}
                  inputStyle="tarmac-01"
                  inputType={inputType}
                  inputSize={size}
                  styleVariant={styleVariant}
                  label="Label"
                  placeholder="Placeholder"
                  leadingIcon={<Ico s={size === "lg" ? 20 : size === "md" ? 16 : 12} />}
                  trailingIcon={<Ico s={size === "lg" ? 20 : size === "md" ? 16 : 12} />}
                  addonText={styleVariant !== "standard" ? "Http://" : undefined}
                  helperTextBottom="Helper text"
                />
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const StyleVariantSection: React.FC<{ styleVariant: InputFieldStyleVariant }> = ({ styleVariant }) => (
  <div>
    <div style={st.title}>{STYLE_LABELS[styleVariant as string]}</div>
    {TYPES.map((t) => (
      <TypeSection key={t as string} inputType={t} styleVariant={styleVariant} />
    ))}
  </div>
);

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={st.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>
        3 Styles × 4 Types × 3 Sizes × 5 States = 180 input fields
      </p>
      {STYLE_VARIANTS.map((sv) => (
        <StyleVariantSection key={sv as string} styleVariant={sv} />
      ))}
    </div>
  ),
};

/* ═══ Stories 3-6: Per-Type Stories ═══ */

const PerTypeSection: React.FC<{ inputType: InputFieldType }> = ({ inputType }) => (
  <div style={st.page}>
    <div style={st.title}>{TYPE_LABELS[inputType as string]}</div>
    {STYLE_VARIANTS.map((sv) => (
      <div key={sv as string} style={{ marginBottom: 32 }}>
        <div style={st.subtitle}>{STYLE_LABELS[sv as string]}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {SIZES.map((size) => (
            <div key={size as string}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
              <Input
                inputStyle="tarmac-01"
                inputType={inputType}
                inputSize={size}
                styleVariant={sv}
                label="Label"
                placeholder="Placeholder"
                leadingIcon={<Ico s={20} />}
                trailingIcon={<Ico s={20} />}
                addonText={sv !== "standard" ? "Http://" : undefined}
                helperTextBottom="Helper text"
                statusText="Status"
                statusIndicator={inputType === "success" ? "success" : inputType === "error" ? "failed" : "information"}
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const perType = (inputType: InputFieldType): Story => ({
  render: () => <PerTypeSection inputType={inputType} />,
});

export const Regular: Story = { name: "Regular", ...perType("regular") };
export const Success: Story = { name: "Success", ...perType("success") };
export const InfoBlue: Story = { name: "Info Blue", ...perType("infoBlue") };
export const Error_: Story = { name: "Error", ...perType("error") };

/* ═══ Stories 7-9: Per-Style Variant Stories ═══ */

const PerStyleSection: React.FC<{ styleVariant: InputFieldStyleVariant }> = ({ styleVariant }) => (
  <div style={st.page}>
    <div style={st.title}>{STYLE_LABELS[styleVariant as string]}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {TYPES.map((t) =>
        SIZES.map((size) => (
          <div key={`${t}-${size}`}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
              {TYPE_LABELS[t as string]} / {SIZE_LABELS[size as string]}
            </div>
            <Input
              inputStyle="tarmac-01"
              inputType={t}
              inputSize={size}
              styleVariant={styleVariant}
              label="Label"
              placeholder="Placeholder"
              leadingIcon={<Ico s={20} />}
              trailingIcon={<Ico s={20} />}
              addonText={styleVariant !== "standard" ? "Http://" : undefined}
              helperTextBottom="Helper text"
            />
          </div>
        ))
      )}
    </div>
  </div>
);

export const AddonLeft: Story = {
  name: "Add-on Left",
  render: () => <PerStyleSection styleVariant="addonLeft" />,
};

export const AddonRight: Story = {
  name: "Add-on Right",
  render: () => <PerStyleSection styleVariant="addonRight" />,
};

/* ═══ Story 10: Disabled State ═══ */

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Disabled State</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {TYPES.map((t) => (
          <div key={t as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{TYPE_LABELS[t as string]}</div>
            {STYLE_VARIANTS.map((sv) =>
              SIZES.map((size) => (
                <div key={`${sv}-${size}`} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 9, color: "#b0b0b0", marginBottom: 2 }}>
                    {STYLE_LABELS[sv as string]} / {SIZE_LABELS[size as string]}
                  </div>
                  <Input
                    inputStyle="tarmac-01"
                    inputType={t}
                    inputSize={size}
                    styleVariant={sv}
                    isDisabled
                    label="Label"
                    placeholder="Placeholder"
                    leadingIcon={<Ico s={20} />}
                    trailingIcon={<Ico s={20} />}
                    addonText={sv !== "standard" ? "Http://" : undefined}
                    helperTextBottom="Helper text"
                    isMandatory
                    badge={<Badge variant="coal" size="sm" badgeType="outlined" isDisabled text="Badge" />}
                  />
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 11: Ghost State (Skeleton) ═══ */

export const GhostState: Story = {
  name: "Ghost (Skeleton)",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Ghost State — Skeleton Layout</div>
      <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 12 }}>
        Ghost renders as skeleton placeholder blocks — no text, icons, or borders.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {TYPES.map((t) => (
          <div key={t as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 8 }}>{TYPE_LABELS[t as string]}</div>
            {SIZES.map((size) => (
              <div key={size as string} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: "#b0b0b0", marginBottom: 2 }}>{SIZE_LABELS[size as string]}</div>
                <Input inputStyle="tarmac-01" inputType={t} inputSize={size} isGhost />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 12: Badge & Status Indicator ═══ */

export const BadgeAndStatus: Story = {
  name: "Badge & Status Indicator",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Badge Variations</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>Badge inside input</div>
          <Input
            inputStyle="tarmac-01"
            label="With Badge"
            placeholder="Placeholder"
            badge={<Badge variant="coal" size="sm" badgeType="outlined" isDisabled text="Badge" />}
          />
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>Badge + Icons</div>
          <Input
            inputStyle="tarmac-01"
            label="Badge + Icons"
            placeholder="Placeholder"
            leadingIcon={<Ico s={20} />}
            trailingIcon={<Ico s={20} />}
            badge={<Badge variant="coal" size="sm" badgeType="outlined" isDisabled text="Badge" />}
          />
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>Badge + Status Text</div>
          <Input
            inputStyle="tarmac-01"
            label="Badge + Status"
            placeholder="Placeholder"
            badge={<Badge variant="coal" size="sm" badgeType="outlined" isDisabled text="Badge" />}
            statusText="99+"
            helperTextBottom="Helper text"
          />
        </div>
      </div>

      <div style={st.title}>Status Indicator Variations</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {STATUS_INDICATORS.map((si) => (
          <div key={si}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{si}</div>
            <Input
              inputStyle="tarmac-01"
              inputType={si === "success" ? "success" : si === "failed" ? "error" : "infoBlue"}
              label="Label"
              placeholder="Placeholder"
              statusIndicator={si}
              statusText={si === "success" ? "Verified" : si === "failed" ? "Invalid" : "Information"}
              subtext="Subtext goes here"
              helperTextBottom="Helper text"
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 7: Boolean Toggles ═══ */

export const BooleanToggles: Story = {
  name: "Boolean Toggles",
  render: () => {
    const base: Partial<InputProps> = {
      inputStyle: "tarmac-01",
      inputType: "regular",
      inputSize: "md",
      styleVariant: "standard",
      placeholder: "Placeholder",
    };

    const toggles: Array<{ label: string; props: Partial<InputProps> }> = [
      { label: "Label only", props: { label: "Field Label" } },
      { label: "Label + Mandatory", props: { label: "Field Label", isMandatory: true } },
      { label: "Label + Title Icon", props: { label: "Field Label", titleIcon: <InfoIco s={14} /> } },
      { label: "Label + Badge", props: { label: "Field Label", badge: <Badge variant="coal" size="sm" badgeType="outlined" isDisabled text="Badge" /> } },
      { label: "Label + Subtext", props: { label: "Field Label", subtext: "Supporting text" } },
      { label: "Leading Icon", props: { label: "Field Label", leadingIcon: <Ico /> } },
      { label: "Trailing Icon", props: { label: "Field Label", trailingIcon: <Ico /> } },
      { label: "Both Icons", props: { label: "Field Label", leadingIcon: <Ico />, trailingIcon: <Ico /> } },
      { label: "Helper Text Top", props: { label: "Field Label", helperTextTop: "Helper text above" } },
      { label: "Helper Text Bottom", props: { label: "Field Label", helperTextBottom: "Helper text below" } },
      { label: "Both Helper Texts", props: { label: "Field Label", helperTextTop: "Top helper", helperTextBottom: "Bottom helper" } },
      { label: "Status Text", props: { label: "Field Label", statusText: "Status message", helperTextBottom: "Helper" } },
      { label: "Status Indicator (Success)", props: { label: "Field Label", statusIndicator: "success", statusText: "Verified" } },
      { label: "Status Indicator (Failed)", props: { label: "Field Label", statusIndicator: "failed", statusText: "Invalid" } },
      { label: "Status Indicator (Information)", props: { label: "Field Label", statusIndicator: "information", statusText: "Info" } },
      { label: "Add-on Left", props: { label: "Field Label", styleVariant: "addonLeft", addonText: "Http://" } },
      { label: "Add-on Right", props: { label: "Field Label", styleVariant: "addonRight", addonText: ".com" } },
      {
        label: "All Toggles On",
        props: {
          label: "Field Label",
          isMandatory: true,
          titleIcon: <InfoIco s={14} />,
          badge: <Badge variant="coal" size="sm" badgeType="outlined" isDisabled text="Badge" />,
          subtext: "Supporting text",
          leadingIcon: <Ico />,
          trailingIcon: <Ico />,
          helperTextTop: "Top helper",
          helperTextBottom: "Bottom helper",
          statusText: "Status",
          statusIndicator: "success",
        },
      },
    ];

    return (
      <div style={st.page}>
        <div style={st.title}>Boolean Toggle Combinations</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {toggles.map((t) => (
            <div key={t.label}>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>{t.label}</div>
              <Input {...base} {...t.props} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ═══ Story 8: Light vs Dark Mode ═══ */

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  parameters: { layout: "fullscreen" },
  render: () => {
    const samples = TYPES.map((t) => ({
      inputType: t,
      label: TYPE_LABELS[t as string],
    }));

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
          <Wrap>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {samples.map(({ inputType, label }) => (
                <Input
                  key={inputType as string}
                  inputStyle="tarmac-01"
                  inputType={inputType}
                  inputSize="md"
                  label={label}
                  placeholder="Placeholder"
                  leadingIcon={<Ico />}
                  trailingIcon={<Ico />}
                  helperTextBottom="Helper text"
                  statusText="Status"
                  statusIndicator={inputType === "success" ? "success" : inputType === "error" ? "failed" : "information"}
                />
              ))}
            </div>
          </Wrap>
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
          <DarkWrap>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {samples.map(({ inputType, label }) => (
                <Input
                  key={inputType as string}
                  inputStyle="tarmac-01"
                  inputType={inputType}
                  inputSize="md"
                  label={label}
                  placeholder="Placeholder"
                  leadingIcon={<Ico />}
                  trailingIcon={<Ico />}
                  helperTextBottom="Helper text"
                  statusText="Status"
                  statusIndicator={inputType === "success" ? "success" : inputType === "error" ? "failed" : "information"}
                />
              ))}
            </div>
          </DarkWrap>
        </div>
      </div>
    );
  },
};


/* ═══ Icons for Addon Stories ═══ */

const ChevronDown = ({ s = 12 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

const SortIcon = ({ s = 14 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
  </svg>
);

/* ═══ Story: Interactive Addon (Compound Component) ═══ */

const countryCodeOptions = [
  { value: "+91", label: "+91", description: "India" },
  { value: "+1", label: "+1", description: "United States" },
  { value: "+44", label: "+44", description: "United Kingdom" },
  { value: "+61", label: "+61", description: "Australia" },
  { value: "+81", label: "+81", description: "Japan" },
];

const InteractiveAddonDemo: React.FC = () => {
  const [countryCode, setCountryCode] = React.useState("+91");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState("Asc");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={st.page}>
      <div style={st.title}>Interactive Addon — Compound Component Pattern</div>
      <p style={{ color: "#6b7280", marginBottom: 24, fontSize: 12 }}>
        Addons are ReactNode slots. Use the optional InputAddon helper for built-in keyboard/a11y support,
        or pass any custom component directly. The dropdown list uses the Tarmac DropdownList compound component.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth: 800 }}>
        {/* Example 1: Country code picker with DropdownList (addonLeft) */}
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8, fontWeight: 600 }}>
            Country Code Picker (addonLeft + DropdownList)
          </div>
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <Input
              inputStyle="tarmac-01"
              inputSize="md"
              styleVariant="addonLeft"
              label="Phone Number"
              placeholder="Enter phone number"
              addonLeft={
                <InputAddon
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-haspopup="listbox"
                  aria-expanded={showDropdown}
                  aria-label="Select country code"
                >
                  <span>{countryCode}</span>
                  <ChevronDown />
                </InputAddon>
              }
            />
            {showDropdown && (
              <div
                role="listbox"
                style={{
                  position: "absolute", top: "100%", left: 0, marginTop: 4,
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 6,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10, minWidth: 160,
                  overflow: "hidden",
                }}
              >
                {countryCodeOptions.map((opt) => (
                  <DropdownList.Cell
                    key={opt.value}
                    cellStyle="regular"
                    size="md"
                    isSelected={opt.value === countryCode}
                    onClick={() => { setCountryCode(opt.value); setShowDropdown(false); }}
                  >
                    <DropdownList.Content label={opt.label} subtext={opt.description} />
                  </DropdownList.Cell>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Example 2: Sort button (addonRight) */}
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8, fontWeight: 600 }}>
            Sort Toggle (addonRight + InputAddon)
          </div>
          <Input
            inputStyle="tarmac-01"
            inputSize="md"
            styleVariant="addonRight"
            label="Search"
            placeholder="Search items..."
            leadingIcon={<Ico />}
            addonRight={
              <InputAddon
                onClick={() => setSortOrder(sortOrder === "Asc" ? "Desc" : "Asc")}
                aria-label={`Sort ${sortOrder === "Asc" ? "descending" : "ascending"}`}
              >
                <SortIcon />
                <span>{sortOrder}</span>
              </InputAddon>
            }
          />
        </div>

        {/* Example 3: Static text addon (backward compat with addonText) */}
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8, fontWeight: 600 }}>
            Static Text (backward compat — addonText)
          </div>
          <Input
            inputStyle="tarmac-01"
            inputSize="md"
            styleVariant="addonLeft"
            label="Website"
            placeholder="yoursite"
            addonText="https://"
          />
        </div>

        {/* Example 4: addonRight with static text */}
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8, fontWeight: 600 }}>
            Domain Suffix (addonRight — addonText)
          </div>
          <Input
            inputStyle="tarmac-01"
            inputSize="md"
            styleVariant="addonRight"
            label="Domain"
            placeholder="yoursite"
            addonText=".com"
          />
        </div>

        {/* Example 5: Raw ReactNode — no InputAddon helper */}
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8, fontWeight: 600 }}>
            Raw ReactNode (no InputAddon helper)
          </div>
          <Input
            inputStyle="tarmac-01"
            inputSize="md"
            styleVariant="addonLeft"
            label="Currency"
            placeholder="0.00"
            addonLeft={
              <button
                onClick={() => alert("Currency picker opened")}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4,
                  color: "inherit", fontSize: "inherit", padding: 0,
                }}
              >
                USD <ChevronDown />
              </button>
            }
          />
        </div>

        {/* Example 6: Disabled addon */}
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 8, fontWeight: 600 }}>
            Disabled State
          </div>
          <Input
            inputStyle="tarmac-01"
            inputSize="md"
            styleVariant="addonLeft"
            label="Phone Number"
            placeholder="Enter phone number"
            isDisabled
            addonLeft={
              <InputAddon onClick={() => {}} isDisabled aria-label="Select country code">
                <span>+91</span>
                <ChevronDown />
              </InputAddon>
            }
          />
        </div>
      </div>

      {/* Size variations with DropdownList */}
      <div style={st.title}>Addon Sizes with DropdownList</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 900 }}>
        {SIZES.map((size) => (
          <div key={size as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
            <Input
              inputStyle="tarmac-01"
              inputSize={size}
              styleVariant="addonLeft"
              label="Phone"
              placeholder="Enter number"
              addonLeft={
                <InputAddon onClick={() => {}} aria-label="Select country code">
                  <span>+91</span>
                  <ChevronDown />
                </InputAddon>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const InteractiveAddon: Story = {
  name: "Interactive Addon (Compound)",
  render: () => <InteractiveAddonDemo />,
};
