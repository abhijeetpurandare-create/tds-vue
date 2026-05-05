import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { TextAreaProps, TextAreaType, TextAreaSize, TextAreaStyleVariant } from "@delhivery/tarmac";

// ─── Constants ───────────────────────────────────────────────────────────────

const TYPES: TextAreaType[] = ["regular", "success", "infoBlue", "error"];
const SIZES: TextAreaSize[] = ["lg", "md", "sm"];
const STYLE_VARIANTS: TextAreaStyleVariant[] = ["standard", "withTags"];

const TYPE_LABELS: Record<string, string> = { regular: "Regular", success: "Success", infoBlue: "Info Blue", error: "Error" };
const SIZE_LABELS: Record<string, string> = { lg: "Large", md: "Medium", sm: "Small" };
const STYLE_LABELS: Record<string, string> = { standard: "Standard", withTags: "With Tags" };

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

const ShowcaseTextArea: React.FC<
  TextAreaProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.textArea_tarmac;
  const tc = cfg?.types?.[props.textAreaType || "regular"] || {};

  if (showcaseState === "default") return <TextArea {...props} />;
  if (showcaseState === "disabled") return <TextArea {...props} isDisabled />;
  if (showcaseState === "ghost") return <TextArea {...props} isGhost />;

  if (showcaseState === "hover") {
    const overrides = css({
      '& [data-testid="textarea-input-container"]': {
        borderColor: `${tc.hoverBorderColor || tc.borderColor} !important`,
        backgroundColor: `${tc.hoverBackgroundColor || tc.backgroundColor} !important`,
      },
    });
    return <div className={overrides}><TextArea {...props} /></div>;
  }

  if (showcaseState === "focused") {
    const focusRing = tc.focusRingColor || "rgba(0,0,0,0.4)";
    const overrides = css({
      '& [data-testid="textarea-input-container"]': {
        boxShadow: `0 0 0 2px ${focusRing} !important`,
        borderColor: `${tc.activeBorderColor || tc.borderColor} !important`,
      },
    });
    return <div className={overrides}><TextArea {...props} /></div>;
  }

  return <TextArea {...props} />;
};

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<TextAreaProps> = {
  title: "Tarmac TDS/Text Area",
  component: TextArea,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<TextAreaProps>;

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

/* ═══ Story 1: Default ═══ */

export const Default: Story = {
  name: "Default",
  parameters: { layout: "centered" },
  args: {
    textAreaStyle: "tarmac-01",
    textAreaType: "regular",
    textAreaSize: "md",
    styleVariant: "standard",
    label: "Title here",
    rows: 4,
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <TextArea
        {...args}
        textAreaStyle="tarmac-01"
        defaultValue="Something goes here"
        helperTextTop="Helper text"
        helperTextBottom="Helper text"
        subtext="Subtext goes here"
        statusText="99+"
      />
    </div>
  ),
};

/* ═══ Story 2: Playground ═══ */

const PlaygroundRender: React.FC<TextAreaProps> = (args) => {
  const [tags, setTags] = React.useState([
    { value: "Tag 1" },
    { value: "Tag 2", status: "success" as const },
  ]);
  const isWithTags = args.styleVariant === "withTags";
  return (
    <div style={{ width: 360 }}>
      <TextArea
        {...args}
        textAreaStyle="tarmac-01"
        tags={isWithTags ? tags : undefined}
        onTagsChange={isWithTags ? setTags : undefined}
      />
    </div>
  );
};

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    textAreaStyle: "tarmac-01",
    textAreaType: "regular",
    textAreaSize: "md",
    styleVariant: "standard",
    label: "Title here",
    defaultValue: "Something goes here",
    rows: 4,
    isDisabled: false,
    isGhost: false,
    isMandatory: false,
    helperTextTop: "Helper text",
    helperTextBottom: "Helper text",
    subtext: "Subtext goes here",
    statusText: "99+",
  },
  argTypes: {
    textAreaType: { control: "select", options: [...TYPES] },
    textAreaSize: { control: "select", options: [...SIZES] },
    styleVariant: { control: "select", options: [...STYLE_VARIANTS] },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
    isMandatory: { control: "boolean" },
    label: { control: "text" },
    helperTextTop: { control: "text" },
    helperTextBottom: { control: "text" },
    descriptionText: { control: "text" },
    subtext: { control: "text" },
    statusText: { control: "text" },
    rows: { control: { type: "number", min: 1, max: 20 } },
  },
  render: (args) => <PlaygroundRender {...args} />,
};

/* ═══ Story 3: Full Matrix — Type × Size × State per Style Variant ═══ */

const TextAreaTypeSection: React.FC<{
  textAreaType: TextAreaType;
  styleVariant: TextAreaStyleVariant;
}> = ({ textAreaType, styleVariant }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={st.subtitle}>{TYPE_LABELS[textAreaType as string]}</div>
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
                <ShowcaseTextArea
                  showcaseState={state}
                  textAreaStyle="tarmac-01"
                  textAreaType={textAreaType}
                  textAreaSize={size}
                  styleVariant={styleVariant}
                  label="Title here"
                  defaultValue="Something goes here"
                  rows={3}
                  helperTextTop="Helper text"
                  helperTextBottom="Helper text"
                  subtext="Subtext goes here"
                  statusText="99+"
                  tags={styleVariant === "withTags" ? [{ value: "Tags" }, { value: "Tags" }, { value: "Tags" }, { value: "Tags" }, { value: "Tags" }] : undefined}
                />
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const TextAreaStyleVariantSection: React.FC<{ styleVariant: TextAreaStyleVariant }> = ({ styleVariant }) => (
  <div>
    <div style={st.title}>{STYLE_LABELS[styleVariant as string]}</div>
    {TYPES.map((t) => (
      <TextAreaTypeSection key={t as string} textAreaType={t} styleVariant={styleVariant} />
    ))}
  </div>
);

export const FullMatrix: Story = {
  name: "Full Matrix",
  render: () => (
    <div style={st.page}>
      <p style={{ color: "#6b7280", marginBottom: 8 }}>
        2 Styles × 4 Types × 3 Sizes × 5 States = 120 text areas
      </p>
      {STYLE_VARIANTS.map((sv) => (
        <TextAreaStyleVariantSection key={sv as string} styleVariant={sv} />
      ))}
    </div>
  ),
};

/* ═══ Stories 4-7: Per-Type Stories ═══ */

const PerTypeTextAreaSection: React.FC<{ textAreaType: TextAreaType }> = ({ textAreaType }) => (
  <div style={st.page}>
    <div style={st.title}>{TYPE_LABELS[textAreaType as string]}</div>
    {STYLE_VARIANTS.map((sv) => (
      <div key={sv as string} style={{ marginBottom: 32 }}>
        <div style={st.subtitle}>{STYLE_LABELS[sv as string]}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {SIZES.map((size) => (
            <div key={size as string}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
              <TextArea
                textAreaStyle="tarmac-01"
                textAreaType={textAreaType}
                textAreaSize={size}
                styleVariant={sv}
                label="Title here"
                defaultValue="Something goes here"
                rows={3}
                helperTextTop="Helper text"
                helperTextBottom="Helper text"
                subtext="Subtext goes here"
                statusText="99+"
                tags={sv === "withTags" ? [{ value: "Tags" }, { value: "Tags" }, { value: "Tags" }] : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const perTextAreaType = (textAreaType: TextAreaType): Story => ({
  render: () => <PerTypeTextAreaSection textAreaType={textAreaType} />,
});

export const Regular: Story = { name: "Regular", ...perTextAreaType("regular") };
export const Success: Story = { name: "Success", ...perTextAreaType("success") };
export const InfoBlue: Story = { name: "Info Blue", ...perTextAreaType("infoBlue") };
export const Error_: Story = { name: "Error", ...perTextAreaType("error") };

/* ═══ Stories 8-9: Per-Style Variant Stories ═══ */

const PerStyleTextAreaSection: React.FC<{ styleVariant: TextAreaStyleVariant }> = ({ styleVariant }) => (
  <div style={st.page}>
    <div style={st.title}>{STYLE_LABELS[styleVariant as string]}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {TYPES.map((t) =>
        SIZES.map((size) => (
          <div key={`${t}-${size}`}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
              {TYPE_LABELS[t as string]} / {SIZE_LABELS[size as string]}
            </div>
            <TextArea
              textAreaStyle="tarmac-01"
              textAreaType={t}
              textAreaSize={size}
              styleVariant={styleVariant}
              label="Title here"
              defaultValue="Something goes here"
              rows={3}
              helperTextTop="Helper text"
              helperTextBottom="Helper text"
              subtext="Subtext goes here"
              statusText="99+"
              tags={styleVariant === "withTags" ? [{ value: "Tags" }, { value: "Tags" }, { value: "Tags" }] : undefined}
            />
          </div>
        ))
      )}
    </div>
  </div>
);

export const StandardStyle: Story = {
  name: "Standard",
  render: () => <PerStyleTextAreaSection styleVariant="standard" />,
};

export const WithTagsStyle: Story = {
  name: "With Tags",
  render: () => <PerStyleTextAreaSection styleVariant="withTags" />,
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
                  <TextArea
                    textAreaStyle="tarmac-01"
                    textAreaType={t}
                    textAreaSize={size}
                    styleVariant={sv}
                    isDisabled
                    label="Title here"
                    defaultValue="Something goes here"
                    rows={3}
                    helperTextTop="Helper text"
                    helperTextBottom="Helper text"
                    subtext="Subtext goes here"
                    statusText="99+"
                    isMandatory
                    tags={sv === "withTags" ? [{ value: "Tags" }, { value: "Tags" }] : undefined}
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
        Ghost renders as skeleton placeholder blocks — no text, icons, tags, or borders.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {TYPES.map((t) => (
          <div key={t as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 8 }}>{TYPE_LABELS[t as string]}</div>
            {SIZES.map((size) => (
              <div key={size as string} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: "#b0b0b0", marginBottom: 2 }}>{SIZE_LABELS[size as string]}</div>
                <TextArea textAreaStyle="tarmac-01" textAreaType={t} textAreaSize={size} isGhost />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 12: Boolean Toggles ═══ */

export const BooleanToggles: Story = {
  name: "Boolean Toggles",
  render: () => {
    const base: Partial<TextAreaProps> = {
      textAreaStyle: "tarmac-01",
      textAreaType: "regular",
      textAreaSize: "md",
      styleVariant: "standard",
      placeholder: "Placeholder",
      rows: 3,
    };

    const toggles: Array<{ label: string; props: Partial<TextAreaProps> }> = [
      { label: "Label only", props: { label: "Field Label" } },
      { label: "Label + Mandatory", props: { label: "Field Label", isMandatory: true } },
      { label: "Label + Title Icon", props: { label: "Field Label", titleIcon: <InfoIco s={14} /> } },
      { label: "Label + Subtext", props: { label: "Field Label", subtext: "Supporting text" } },
      { label: "Trailing Icon", props: { label: "Field Label", trailingIcon: <Ico /> } },
      { label: "Helper Text Top", props: { label: "Field Label", helperTextTop: "Helper text above" } },
      { label: "Helper Text Bottom", props: { label: "Field Label", helperTextBottom: "Helper text below" } },
      { label: "Both Helper Texts", props: { label: "Field Label", helperTextTop: "Top helper", helperTextBottom: "Bottom helper" } },
      { label: "Description Text", props: { label: "Field Label", descriptionText: "A longer description providing context" } },
      { label: "Status Text", props: { label: "Field Label", statusText: "Status message", helperTextBottom: "Helper" } },
      {
        label: "All Toggles On",
        props: {
          label: "Field Label",
          isMandatory: true,
          titleIcon: <InfoIco s={14} />,
          subtext: "Supporting text",
          trailingIcon: <Ico />,
          helperTextTop: "Top helper",
          helperTextBottom: "Bottom helper",
          descriptionText: "Description text here",
          statusText: "Status",
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
              <TextArea {...base} {...t.props} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ═══ Story 13: Tags Sub-Component ═══ */

const TagsDemo: React.FC = () => {
  const [blueTags, setBlueTags] = React.useState<{ value: string; status?: "default" | "error" | "success" }[]>([
    { value: "React" },
    { value: "TypeScript" },
    { value: "Emotion" },
  ]);
  const [successTags, setSuccessTags] = React.useState<{ value: string; status?: "default" | "error" | "success" }[]>([
    { value: "Verified", status: "success" },
    { value: "Approved", status: "success" },
  ]);
  const [errorTags, setErrorTags] = React.useState<{ value: string; status?: "default" | "error" | "success" }[]>([
    { value: "Invalid", status: "error" },
    { value: "Rejected", status: "error" },
  ]);
  const [mixedTags, setMixedTags] = React.useState<{ value: string; status?: "default" | "error" | "success" }[]>([
    { value: "Default" },
    { value: "Success", status: "success" },
    { value: "Error", status: "error" },
  ]);
  const [maxTags, setMaxTags] = React.useState<{ value: string; status?: "default" | "error" | "success" }[]>([
    { value: "Tag 1" },
    { value: "Tag 2" },
    { value: "Tag 3" },
  ]);

  return (
    <div style={st.page}>
      <div style={st.title}>Tags Sub-Component — Types & Interactions</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>Blue / Default Tags</div>
          <TextArea
            textAreaStyle="tarmac-01"
            styleVariant="withTags"
            label="Default Tags"
            placeholder="Type and press Enter..."
            rows={2}
            tags={blueTags}
            onTagsChange={setBlueTags}
          />
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>Success Tags</div>
          <TextArea
            textAreaStyle="tarmac-01"
            textAreaType="success"
            styleVariant="withTags"
            label="Success Tags"
            placeholder="Type and press Enter..."
            rows={2}
            tags={successTags}
            onTagsChange={setSuccessTags}
          />
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>Error Tags</div>
          <TextArea
            textAreaStyle="tarmac-01"
            textAreaType="error"
            styleVariant="withTags"
            label="Error Tags"
            placeholder="Type and press Enter..."
            rows={2}
            tags={errorTags}
            onTagsChange={setErrorTags}
          />
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>Mixed Tag Types</div>
          <TextArea
            textAreaStyle="tarmac-01"
            styleVariant="withTags"
            label="Mixed Tags"
            placeholder="Type and press Enter..."
            rows={2}
            tags={mixedTags}
            onTagsChange={setMixedTags}
          />
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>Max Tag Count (3)</div>
          <TextArea
            textAreaStyle="tarmac-01"
            styleVariant="withTags"
            label="Max 3 Tags"
            placeholder="Max 3 tags allowed"
            rows={2}
            tags={maxTags}
            onTagsChange={setMaxTags}
            maxTagCount={3}
            helperTextBottom="Maximum 3 tags allowed"
          />
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 600 }}>Disabled Tags</div>
          <TextArea
            textAreaStyle="tarmac-01"
            styleVariant="withTags"
            label="Disabled"
            placeholder="Cannot edit"
            rows={2}
            isDisabled
            tags={[{ value: "Locked" }, { value: "Read-only", status: "success" }]}
          />
        </div>
      </div>
    </div>
  );
};

export const TagsSubComponent: Story = {
  name: "Tags Sub-Component",
  render: () => <TagsDemo />,
};

/* ═══ Story 14: Light vs Dark Mode ═══ */

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  parameters: { layout: "fullscreen" },
  render: () => {
    const samples = TYPES.map((t) => ({
      textAreaType: t,
      label: TYPE_LABELS[t as string],
    }));

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
          <Wrap>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {samples.map(({ textAreaType, label }) => (
                <TextArea
                  key={textAreaType as string}
                  textAreaStyle="tarmac-01"
                  textAreaType={textAreaType}
                  textAreaSize="md"
                  label={label}
                  defaultValue="Something goes here"
                  rows={3}
                  helperTextTop="Helper text"
                  helperTextBottom="Helper text"
                  subtext="Subtext goes here"
                  statusText="99+"
                />
              ))}
            </div>
          </Wrap>
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
          <DarkWrap>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {samples.map(({ textAreaType, label }) => (
                <TextArea
                  key={textAreaType as string}
                  textAreaStyle="tarmac-01"
                  textAreaType={textAreaType}
                  textAreaSize="md"
                  label={label}
                  defaultValue="Something goes here"
                  rows={3}
                  helperTextTop="Helper text"
                  helperTextBottom="Helper text"
                  subtext="Subtext goes here"
                  statusText="99+"
                />
              ))}
            </div>
          </DarkWrap>
        </div>
      </div>
    );
  },
};
