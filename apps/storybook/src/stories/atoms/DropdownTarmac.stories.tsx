import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown, DropdownList, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { DropdownTarmacProps, DropdownInputType, DropdownTarmacSize } from "@delhivery/tarmac";

// ─── Constants ───────────────────────────────────────────────────────────────

const INPUT_TYPES: DropdownInputType[] = ["default", "addonLeft", "addonRight"];
const SIZES: DropdownTarmacSize[] = ["lg", "md", "sm"];

const INPUT_TYPE_LABELS: Record<string, string> = { default: "Default", addonLeft: "Add-on Left", addonRight: "Add-on Right" };
const SIZE_LABELS: Record<string, string> = { lg: "Large", md: "Medium", sm: "Small" };

type ShowcaseState = "default" | "hover" | "pressed" | "focused" | "disabled" | "ghost";
const STATES: ShowcaseState[] = ["default", "hover", "pressed", "focused", "disabled", "ghost"];

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

// ─── Sample Options ──────────────────────────────────────────────────────────

const simpleOptions = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
  { value: "opt4", label: "Option 4" },
  { value: "opt5", label: "Option 5" },
  { value: "opt6", label: "Option 6" },
];

const richOptions = [
  { value: "r1", label: "Dashboard", description: "View analytics", leadingIcon: <Ico s={16} />, showCheckbox: true },
  { value: "r2", label: "Settings", description: "Manage preferences", leadingIcon: <Ico s={16} />, showCheckbox: true },
  { value: "r3", label: "Profile", description: "Edit your profile", leadingIcon: <Ico s={16} />, showCheckbox: true },
  { value: "r4", label: "Notifications", description: "Alert settings", leadingIcon: <Ico s={16} />, showCheckbox: true },
  { value: "r5", label: "Help Center", description: "Get support", leadingIcon: <Ico s={16} />, showCheckbox: true },
];

const groupedOptions = [
  { value: "g1", label: "New York", group: "North America" },
  { value: "g2", label: "Los Angeles", group: "North America" },
  { value: "g3", label: "Chicago", group: "North America" },
  { value: "g4", label: "London", group: "Europe" },
  { value: "g5", label: "Paris", group: "Europe" },
  { value: "g6", label: "Berlin", group: "Europe" },
  { value: "g7", label: "Tokyo", group: "Asia" },
  { value: "g8", label: "Singapore", group: "Asia" },
];

const infoBlueCellOptions = [
  { value: "ib1", label: "Info Item 1", cellStyle: "infoBlue" as const, showCheckbox: true },
  { value: "ib2", label: "Info Item 2", cellStyle: "infoBlue" as const, showCheckbox: true },
  { value: "ib3", label: "Info Item 3", cellStyle: "infoBlue" as const, showCheckbox: true },
];

const longOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `long-${i + 1}`,
  label: `Option ${i + 1}`,
}));

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

const ShowcaseDropdown: React.FC<
  DropdownTarmacProps & { options: any[]; showcaseState: ShowcaseState; placeholder?: string }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.dropdown_tarmac;
  const tc = cfg?.inputField?.types?.[props.dropdownInputType || "default"] || cfg?.inputField?.types?.regular || {};

  if (showcaseState === "default") return <Dropdown {...props} />;
  if (showcaseState === "disabled") return <Dropdown {...props} isDisabled />;
  if (showcaseState === "ghost") return <Dropdown {...props} isGhost />;

  if (showcaseState === "hover") {
    const isAddon = props.dropdownInputType === "addonLeft" || props.dropdownInputType === "addonRight";
    const overrides = css({
      '& [data-testid="dropdown-input-field"]': {
        borderColor: isAddon ? undefined : `${tc.hoverBorderColor || tc.borderColor} !important`,
        backgroundColor: isAddon ? undefined : `${tc.hoverBackgroundColor || tc.backgroundColor} !important`,
        color: `${(tc as any).hoverTextColor || tc.textColor} !important`,
        // For addon types, change borders on inner input and addon sections
        ...(isAddon && {
          '& > div': {
            borderColor: `${tc.hoverBorderColor || tc.borderColor} !important`,
          },
        }),
      },
    });
    return <div className={overrides}><Dropdown {...props} /></div>;
  }

  if (showcaseState === "pressed") {
    const isAddon = props.dropdownInputType === "addonLeft" || props.dropdownInputType === "addonRight";
    const overrides = css({
      '& [data-testid="dropdown-input-field"]': {
        borderColor: isAddon ? undefined : `${tc.activeBorderColor || tc.borderColor} !important`,
        backgroundColor: isAddon ? undefined : `${tc.hoverBackgroundColor || tc.backgroundColor} !important`,
        ...(isAddon && {
          '& > div': {
            borderColor: `${tc.activeBorderColor || tc.borderColor} !important`,
          },
        }),
      },
    });
    return <div className={overrides}><Dropdown {...props} /></div>;
  }

  if (showcaseState === "focused") {
    const focusRing = tc.focusRingColor || "rgba(0,0,0,0.4)";
    const isAddon = props.dropdownInputType === "addonLeft" || props.dropdownInputType === "addonRight";
    const overrides = css({
      '& [data-testid="dropdown-input-field"]': {
        // Focus ring on the outer wrapper (addon or default input)
        boxShadow: `0 0 0 2px ${focusRing} !important`,
        borderColor: isAddon ? undefined : `${tc.activeBorderColor || tc.borderColor} !important`,
        ...(isAddon && {
          '& > div': {
            borderColor: `${tc.activeBorderColor || tc.borderColor} !important`,
          },
        }),
      },
    });
    return <div className={overrides}><Dropdown {...props} /></div>;
  }

  return <Dropdown {...props} />;
};

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<DropdownTarmacProps> = {
  title: "Tarmac TDS/Dropdown",
  component: Dropdown,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<DropdownTarmacProps>;

// ─── Shared Styles ───────────────────────────────────────────────────────────

const st: Record<string, React.CSSProperties> = {
  page: { padding: 24, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title: { fontSize: 15, fontWeight: 700, color: "#374151", margin: "32px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  subtitle: { fontSize: 13, fontWeight: 600, color: "#6b7280", margin: "16px 0 8px" },
  grid: { display: "grid", gridTemplateColumns: "120px repeat(6, 1fr)", gap: "8px 12px", alignItems: "start" },
  colHdr: { fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase" as const, textAlign: "center" as const, padding: "4px 0" },
  rowLabel: { fontSize: 9, color: "#b0b0b0", textAlign: "right" as const, paddingRight: 8, paddingTop: 8 },
  cell: { display: "flex", justifyContent: "center", alignItems: "start", padding: "4px 0", minWidth: 200 },
};

/* ═══ Story 8.2: Playground ═══ */

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    dropdownStyle: "tarmac-01",
    dropdownInputType: "default",
    dropdownSize: "lg",
    label: "Label",
    placeholder: "Select an option",
    options: simpleOptions,
  },
  argTypes: {
    dropdownInputType: { control: "select", options: [...INPUT_TYPES] },
    dropdownSize: { control: "select", options: [...SIZES] },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
    isMandatory: { control: "boolean" },
    isSearchable: { control: "boolean" },
    multiple: { control: "boolean" },
    showFooter: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    addonText: { control: "text" },
    helperTextTop: { control: "text" },
    listVariant: { control: "select", options: ["listSet1", "listSet2"] },
    maxVisibleItems: { control: { type: "number", min: 2, max: 8 } },
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Dropdown
        {...args}
        dropdownStyle="tarmac-01"
        options={simpleOptions}
        leadingIcon={<Ico />}
        titleIcon={<InfoIco s={14} />}
        tarmacOptions={simpleOptions}
      />
    </div>
  ),
};

/* ═══ Story 8.3: Full Matrix — InputField Type × Size × State ═══ */

const InputTypeSection: React.FC<{
  dropdownInputType: DropdownInputType;
}> = ({ dropdownInputType }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={st.subtitle}>{INPUT_TYPE_LABELS[dropdownInputType as string]}</div>
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
                <ShowcaseDropdown
                  showcaseState={state}
                  dropdownStyle="tarmac-01"
                  dropdownInputType={dropdownInputType}
                  dropdownSize={size}
                  options={simpleOptions}
                  label="Label"
                  placeholder="Placeholder"
                  leadingIcon={<Ico s={size === "lg" ? 20 : size === "md" ? 16 : 12} />}
                  addonText={dropdownInputType !== "default" ? "Http://" : undefined}
                />
              </div>
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
        3 Types × 3 Sizes × 6 States = 54 dropdown input fields
      </p>
      {INPUT_TYPES.map((it) => (
        <InputTypeSection key={it as string} dropdownInputType={it} />
      ))}
    </div>
  ),
};

/* ═══ Story 8.4: Per-Input-Type Stories (Default, Add-on Left, Add-on Right) ═══ */

const PerInputTypeSection: React.FC<{ dropdownInputType: DropdownInputType }> = ({ dropdownInputType }) => (
  <div style={st.page}>
    <div style={st.title}>{INPUT_TYPE_LABELS[dropdownInputType as string]}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {SIZES.map((size) => (
        <div key={size as string}>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownInputType={dropdownInputType}
            dropdownSize={size}
            options={simpleOptions}
            label="Label"
            placeholder="Placeholder"
            leadingIcon={<Ico s={20} />}
            addonText={dropdownInputType !== "default" ? "Http://" : undefined}
          />
        </div>
      ))}
    </div>
  </div>
);

export const DefaultType: Story = {
  name: "Default",
  render: () => <PerInputTypeSection dropdownInputType="default" />,
};

export const AddonLeft: Story = {
  name: "Add-on Left",
  render: () => <PerInputTypeSection dropdownInputType="addonLeft" />,
};

export const AddonRight: Story = {
  name: "Add-on Right",
  render: () => <PerInputTypeSection dropdownInputType="addonRight" />,
};

/* ═══ Story 8.5: Per-State Stories (Disabled, Ghost) ═══ */

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Disabled State</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {INPUT_TYPES.map((it) =>
          SIZES.map((size) => (
            <div key={`${it}-${size}`} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
                {INPUT_TYPE_LABELS[it as string]} / {SIZE_LABELS[size as string]}
              </div>
              <Dropdown
                dropdownStyle="tarmac-01"
                dropdownInputType={it}
                dropdownSize={size}
                isDisabled
                options={simpleOptions}
                label="Label"
                placeholder="Placeholder"
                leadingIcon={<Ico s={20} />}
                addonText={it !== "default" ? "Http://" : undefined}
                isMandatory
              />
            </div>
          ))
        )}
      </div>
    </div>
  ),
};

export const GhostState: Story = {
  name: "Ghost (Skeleton)",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Ghost State — Skeleton Layout</div>
      <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 12 }}>
        Ghost renders as skeleton placeholder blocks — no text, icons, or borders.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {SIZES.map((size) => (
          <div key={size as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 8 }}>{SIZE_LABELS[size as string]}</div>
            <Dropdown
              dropdownStyle="tarmac-01"
              dropdownSize={size}
              isGhost
              options={simpleOptions}
              label="Label"
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 8.6: Drop Cell Variants (Regular and Info Blue) ═══ */

export const DropCellVariants: Story = {
  name: "Drop Cell Variants",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Drop Cell Variants — Regular vs Info Blue</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={st.subtitle}>Regular Cell Style</div>
          {SIZES.map((size) => (
            <div key={size as string} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
              <Dropdown
                dropdownStyle="tarmac-01"
                dropdownSize={size}
                options={simpleOptions}
                label="Regular Cells"
                placeholder="Click to open"
                tarmacOptions={[
                  { value: "rc1", label: "Regular Item 1", showCheckbox: true, cellStyle: "regular" },
                  { value: "rc2", label: "Regular Item 2", showCheckbox: true, cellStyle: "regular" },
                  { value: "rc3", label: "Regular Item 3", showCheckbox: true, cellStyle: "regular", disabled: true },
                ]}
              />
            </div>
          ))}
        </div>
        <div>
          <div style={st.subtitle}>Info Blue Cell Style</div>
          {SIZES.map((size) => (
            <div key={size as string} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
              <Dropdown
                dropdownStyle="tarmac-01"
                dropdownSize={size}
                options={simpleOptions}
                label="Info Blue Cells"
                placeholder="Click to open"
                tarmacOptions={[
                  ...infoBlueCellOptions,
                  { value: "ib4", label: "Disabled Info", cellStyle: "infoBlue" as const, showCheckbox: true, disabled: true },
                ]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ═══ Story 8.7: List Variants (List set 1 and List set 2) ═══ */

export const ListVariants: Story = {
  name: "List Variants",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>List Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={st.subtitle}>List Set 1 — Simple Text</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="md"
            options={simpleOptions}
            label="Simple List"
            placeholder="Select an option"
            listVariant="listSet1"
            tarmacOptions={simpleOptions}
          />
        </div>
        <div>
          <div style={st.subtitle}>List Set 2 — With Icons & Descriptions</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="md"
            options={simpleOptions}
            label="Rich List"
            placeholder="Select an option"
            listVariant="listSet2"
            tarmacOptions={richOptions}
          />
        </div>
      </div>
    </div>
  ),
};

/* ═══ Story 8.8: Boolean Toggles ═══ */

export const BooleanToggles: Story = {
  name: "Boolean Toggles",
  render: () => {
    const base: Partial<DropdownTarmacProps> & { options: any[] } = {
      dropdownStyle: "tarmac-01",
      dropdownInputType: "default",
      dropdownSize: "md",
      placeholder: "Placeholder",
      options: simpleOptions,
    };

    const toggles: Array<{ label: string; props: Partial<DropdownTarmacProps> }> = [
      { label: "Label only", props: { label: "Field Label" } },
      { label: "Label + Mandatory", props: { label: "Field Label", isMandatory: true } },
      { label: "Label + Title Icon", props: { label: "Field Label", titleIcon: <InfoIco s={14} /> } },
      { label: "Leading Icon", props: { label: "Field Label", leadingIcon: <Ico /> } },
      { label: "Helper Text Top", props: { label: "Field Label", helperTextTop: "Helper text above" } },
      {
        label: "All Toggles On",
        props: {
          label: "Field Label",
          isMandatory: true,
          titleIcon: <InfoIco s={14} />,
          leadingIcon: <Ico />,
          helperTextTop: "Top helper",
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
              <Dropdown {...base} {...t.props} />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ═══ Story 8.9: Multi-Select with Chip Pills ═══ */

const MultiSelectDemo: React.FC = () => {
  const [selected, setSelected] = React.useState<(string | number)[]>(["opt1", "opt3"]);

  return (
    <div style={st.page}>
      <div style={st.title}>Multi-Select with Chip Pills</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={st.subtitle}>Pre-selected Values</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="md"
            options={simpleOptions}
            label="Multi-Select"
            placeholder="Select options"
            multiple
            value={selected}
            onChange={(v) => setSelected(v as (string | number)[])}
            tarmacOptions={simpleOptions.map(o => ({ ...o, showCheckbox: true }))}
          />
        </div>
        <div>
          <div style={st.subtitle}>Empty Multi-Select</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="md"
            options={simpleOptions}
            label="Multi-Select"
            placeholder="Select options"
            multiple
            tarmacOptions={simpleOptions.map(o => ({ ...o, showCheckbox: true }))}
          />
        </div>
        <div>
          <div style={st.subtitle}>Large Size</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="lg"
            options={simpleOptions}
            label="Large Multi-Select"
            placeholder="Select options"
            multiple
            value={["opt1", "opt2", "opt4"]}
            tarmacOptions={simpleOptions.map(o => ({ ...o, showCheckbox: true }))}
          />
        </div>
        <div>
          <div style={st.subtitle}>Small Size</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="sm"
            options={simpleOptions}
            label="Small Multi-Select"
            placeholder="Select options"
            multiple
            value={["opt2"]}
            tarmacOptions={simpleOptions.map(o => ({ ...o, showCheckbox: true }))}
          />
        </div>
      </div>
    </div>
  );
};

export const MultiSelect: Story = {
  name: "Multi-Select",
  render: () => <MultiSelectDemo />,
};

/* ═══ Story 8.10: Searchable ═══ */

const SearchableDemo: React.FC = () => {
  const [value, setValue] = React.useState<string | number | (string | number)[]>();

  return (
    <div style={st.page}>
      <div style={st.title}>Searchable Dropdown</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={st.subtitle}>Single-Select Searchable</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="md"
            options={longOptions}
            label="Search Options"
            placeholder="Type to search..."
            isSearchable
            value={value}
            onChange={setValue}
            tarmacOptions={longOptions}
          />
        </div>
        <div>
          <div style={st.subtitle}>Multi-Select Searchable</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="md"
            options={longOptions}
            label="Search & Multi-Select"
            placeholder="Type to search..."
            isSearchable
            multiple
            tarmacOptions={longOptions.map(o => ({ ...o, showCheckbox: true }))}
          />
        </div>
      </div>
    </div>
  );
};

export const Searchable: Story = {
  name: "Searchable",
  render: () => <SearchableDemo />,
};

/* ═══ Story 8.11: Grouped Options with Section Headers ═══ */

export const GroupedOptions: Story = {
  name: "Grouped Options",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Grouped Options with Section Headers</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {SIZES.map((size) => (
          <div key={size as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
            <Dropdown
              dropdownStyle="tarmac-01"
              dropdownSize={size}
              options={simpleOptions}
              label="Select City"
              placeholder="Choose a city"
              tarmacOptions={groupedOptions}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 8.12: Footer CTAs ═══ */

export const FooterCTAs: Story = {
  name: "Footer CTAs",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Footer CTAs</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={st.subtitle}>Default Footer Buttons</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="md"
            options={simpleOptions}
            label="With Footer"
            placeholder="Select an option"
            showFooter
            onAddNew={() => console.log("Add new clicked")}
            onCancel={() => console.log("Cancel clicked")}
            onAction={() => console.log("Action clicked")}
            tarmacOptions={simpleOptions}
          />
        </div>
        <div>
          <div style={st.subtitle}>Custom Footer Content</div>
          <Dropdown
            dropdownStyle="tarmac-01"
            dropdownSize="md"
            options={simpleOptions}
            label="Custom Footer"
            placeholder="Select an option"
            ctaActions={
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", width: "100%" }}>
                <button style={{ padding: "4px 12px", borderRadius: 4, border: "1px solid #ccc", background: "white", cursor: "pointer" }}>Reset</button>
                <button style={{ padding: "4px 12px", borderRadius: 4, border: "none", background: "#2563EB", color: "white", cursor: "pointer" }}>Apply</button>
              </div>
            }
            tarmacOptions={simpleOptions}
          />
        </div>
      </div>
    </div>
  ),
};

/* ═══ Story 8.13: Light vs Dark Mode ═══ */

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {INPUT_TYPES.map((it) => (
              <Dropdown
                key={it as string}
                dropdownStyle="tarmac-01"
                dropdownInputType={it}
                dropdownSize="md"
                options={simpleOptions}
                label={INPUT_TYPE_LABELS[it as string]}
                placeholder="Placeholder"
                leadingIcon={<Ico />}
                addonText={it !== "default" ? "Http://" : undefined}
              />
            ))}
          </div>
        </Wrap>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {INPUT_TYPES.map((it) => (
              <Dropdown
                key={it as string}
                dropdownStyle="tarmac-01"
                dropdownInputType={it}
                dropdownSize="md"
                options={simpleOptions}
                label={INPUT_TYPE_LABELS[it as string]}
                placeholder="Placeholder"
                leadingIcon={<Ico />}
                addonText={it !== "default" ? "Http://" : undefined}
              />
            ))}
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};

/* ═══ Story 8.14: Drop Cell Anatomy — Compound Component ═══ */

const AddIcon = ({ s = 20 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const CELL_SIZES = ["lg", "md", "sm"] as const;

const CellAnatomySection: React.FC<{ cellStyle: string; label: string }> = ({ cellStyle, label }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={st.subtitle}>{label}</div>
    {CELL_SIZES.map(size => (
      <div key={size} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size]}</div>
        <div style={{ border: "1px solid #e6e6e6", borderRadius: 6, overflow: "hidden" }}>
          {/* Default — all boolean toggles on */}
          <DropdownList.Cell cellStyle={cellStyle} size={size}>
            <DropdownList.Avatar>RP</DropdownList.Avatar>
            <DropdownList.Checkbox />
            <DropdownList.LeadingIcon><AddIcon s={size === "lg" ? 20 : 16} /></DropdownList.LeadingIcon>
            <DropdownList.Content label="Text here" subtext="Text here" />
            <DropdownList.TrailingIcon><AddIcon s={size === "lg" ? 20 : 16} /></DropdownList.TrailingIcon>
            <DropdownList.Pills label="2" />
          </DropdownList.Cell>

          {/* Selected */}
          <DropdownList.Cell cellStyle={cellStyle} size={size} isSelected>
            <DropdownList.Avatar>RP</DropdownList.Avatar>
            <DropdownList.Checkbox />
            <DropdownList.LeadingIcon><AddIcon s={size === "lg" ? 20 : 16} /></DropdownList.LeadingIcon>
            <DropdownList.Content label="Selected cell" subtext="Text here" />
            <DropdownList.TrailingIcon><AddIcon s={size === "lg" ? 20 : 16} /></DropdownList.TrailingIcon>
            <DropdownList.Pills label="2" />
          </DropdownList.Cell>

          {/* Disabled */}
          <DropdownList.Cell cellStyle={cellStyle} size={size} isDisabled>
            <DropdownList.Avatar>RP</DropdownList.Avatar>
            <DropdownList.Checkbox />
            <DropdownList.LeadingIcon><AddIcon s={size === "lg" ? 20 : 16} /></DropdownList.LeadingIcon>
            <DropdownList.Content label="Disabled cell" subtext="Text here" />
            <DropdownList.TrailingIcon><AddIcon s={size === "lg" ? 20 : 16} /></DropdownList.TrailingIcon>
          </DropdownList.Cell>
        </div>
      </div>
    ))}
  </div>
);

export const DropCellAnatomy: Story = {
  name: "Drop Cell Anatomy",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Drop Cell Anatomy — Compound Component</div>
      <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 12 }}>
        Figma layout: Avatar → Checkbox → Leading Icon → Content (text + subtext) → Trailing Icon → Pills.
        All with 8px gap and 12px padding. Each sub-component is optional via composition.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <CellAnatomySection cellStyle="regular" label="Regular" />
        <CellAnatomySection cellStyle="infoBlue" label="Info Blue" />
      </div>
    </div>
  ),
};

/* ═══ Story 8.15: Drop Cell Boolean Toggles ═══ */

const CELL_COMBOS = [
  { name: "Text only", checkbox: false, avatar: false, leadingIcon: false, subtext: false, trailingIcon: false, pills: false },
  { name: "Checkbox", checkbox: true, avatar: false, leadingIcon: false, subtext: false, trailingIcon: false, pills: false },
  { name: "Avatar + Subtext", checkbox: false, avatar: true, leadingIcon: false, subtext: true, trailingIcon: false, pills: false },
  { name: "Leading + Trailing Icon", checkbox: false, avatar: false, leadingIcon: true, subtext: false, trailingIcon: true, pills: false },
  { name: "Checkbox + Avatar + Subtext", checkbox: true, avatar: true, leadingIcon: false, subtext: true, trailingIcon: false, pills: false },
  { name: "Checkbox + Pills", checkbox: true, avatar: false, leadingIcon: false, subtext: false, trailingIcon: false, pills: true },
  { name: "All toggles on", checkbox: true, avatar: true, leadingIcon: true, subtext: true, trailingIcon: true, pills: true },
] as const;

const CellBooleanDemo: React.FC = () => {
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  return (
    <div style={st.page}>
      <div style={st.title}>Drop Cell — Boolean Toggle Combinations</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {(["regular", "infoBlue"] as const).map(cellStyle => (
          <div key={cellStyle}>
            <div style={st.subtitle}>{cellStyle === "regular" ? "Regular" : "Info Blue"}</div>
            <div style={{ border: "1px solid #e6e6e6", borderRadius: 6, overflow: "hidden" }}>
              {CELL_COMBOS.map(combo => (
                <DropdownList.Cell
                  key={combo.name}
                  cellStyle={cellStyle}
                  size="md"
                  isSelected={!!selected[`${cellStyle}-${combo.name}`]}
                  onClick={() => setSelected(s => ({ ...s, [`${cellStyle}-${combo.name}`]: !s[`${cellStyle}-${combo.name}`] }))}
                >
                  {combo.avatar && <DropdownList.Avatar>RP</DropdownList.Avatar>}
                  {combo.checkbox && <DropdownList.Checkbox />}
                  {combo.leadingIcon && <DropdownList.LeadingIcon><AddIcon /></DropdownList.LeadingIcon>}
                  <DropdownList.Content label={combo.name} subtext={combo.subtext ? "Supporting text" : undefined} />
                  {combo.trailingIcon && <DropdownList.TrailingIcon><AddIcon /></DropdownList.TrailingIcon>}
                  {combo.pills && <DropdownList.Pills label="3" />}
                </DropdownList.Cell>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DropCellBooleanToggles: Story = {
  name: "Drop Cell Boolean Toggles",
  render: () => <CellBooleanDemo />,
};

/* ═══ Story 8.16: Drop Cell in Dropdown — renderOption ═══ */

const RenderOptionDemo: React.FC = () => {
  const [value, setValue] = React.useState<string | number | (string | number)[]>();

  const options = [
    { value: "u1", label: "Alice Johnson", description: "Engineering", avatar: "AJ" },
    { value: "u2", label: "Bob Smith", description: "Design", avatar: "BS" },
    { value: "u3", label: "Carol White", description: "Product", avatar: "CW" },
    { value: "u4", label: "Dave Brown", description: "Marketing", avatar: "DB", disabled: true },
  ];

  return (
    <div style={st.page}>
      <div style={st.title}>Custom renderOption — Compound Composition</div>
      <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 12 }}>
        Uses the <code>renderOption</code> prop to compose each cell with DropdownList sub-components.
      </p>
      <div style={{ maxWidth: 360 }}>
        <Dropdown
          dropdownStyle="tarmac-01"
          dropdownSize="md"
          options={options.map(o => ({ value: o.value, label: o.label }))}
          label="Select team member"
          placeholder="Choose a person"
          multiple
          value={value}
          onChange={setValue}
          tarmacOptions={options.map(o => ({
            value: o.value,
            label: o.label,
            description: o.description,
            disabled: o.disabled,
          }))}
          renderOption={(option, isSelected) => (
            <DropdownList.Cell
              cellStyle="regular"
              size="md"
              isSelected={isSelected}
              isDisabled={!!option.disabled}
              onClick={() => {
                if (option.disabled) return;
                const arr = Array.isArray(value) ? value : value !== undefined ? [value] : [];
                const next = arr.includes(option.value)
                  ? arr.filter(v => v !== option.value)
                  : [...arr, option.value];
                setValue(next);
              }}
            >
              <DropdownList.Avatar>
                {options.find(o => o.value === option.value)?.avatar}
              </DropdownList.Avatar>
              <DropdownList.Checkbox />
              <DropdownList.Content label={option.label} subtext={option.description} />
              <DropdownList.Pills label="2" />
            </DropdownList.Cell>
          )}
        />
      </div>
    </div>
  );
};

export const CustomRenderOption: Story = {
  name: "Custom renderOption",
  render: () => <RenderOptionDemo />,
};

/* ═══════════════════════════════════════════════════════════════════
 * DROPDOWN LIST — Standalone DropdownList.Cell stories with controls
 * ═══════════════════════════════════════════════════════════════════ */

// ─── DropdownList Playground with Controls ───────────────────────────────────

interface ListPlaygroundArgs {
  cellStyle: "regular" | "infoBlue";
  size: "sm" | "md" | "lg";
  isSelected: boolean;
  isDisabled: boolean;
  label: string;
  subtext: string;
  showCheckbox: boolean;
  showAvatar: boolean;
  avatarText: string;
  showLeadingIcon: boolean;
  showTrailingIcon: boolean;
  showPills: boolean;
  pillLabel: string;
}

const ListPlaygroundCell: React.FC<ListPlaygroundArgs> = (args) => {
  const [selected, setSelected] = React.useState(args.isSelected);
  React.useEffect(() => setSelected(args.isSelected), [args.isSelected]);

  return (
    <div style={{ maxWidth: 400, border: "1px solid #e6e6e6", borderRadius: 6, overflow: "hidden" }}>
      <DropdownList.Cell
        cellStyle={args.cellStyle}
        size={args.size}
        isSelected={selected}
        isDisabled={args.isDisabled}
        onClick={() => setSelected(s => !s)}
      >
        {args.showAvatar && <DropdownList.Avatar>{args.avatarText}</DropdownList.Avatar>}
        {args.showCheckbox && <DropdownList.Checkbox />}
        {args.showLeadingIcon && <DropdownList.LeadingIcon><AddIcon s={args.size === "lg" ? 20 : 16} /></DropdownList.LeadingIcon>}
        <DropdownList.Content label={args.label} subtext={args.subtext || undefined} />
        {args.showTrailingIcon && <DropdownList.TrailingIcon><AddIcon s={args.size === "lg" ? 20 : 16} /></DropdownList.TrailingIcon>}
        {args.showPills && <DropdownList.Pills label={args.pillLabel} />}
      </DropdownList.Cell>
    </div>
  );
};

export const ListPlayground: Story = {
  name: "List Cell Playground",
  parameters: { layout: "centered" },
  args: {
    cellStyle: "regular",
    size: "md",
    isSelected: false,
    isDisabled: false,
    label: "Cell label text",
    subtext: "Supporting description",
    showCheckbox: true,
    showAvatar: true,
    avatarText: "RP",
    showLeadingIcon: false,
    showTrailingIcon: false,
    showPills: false,
    pillLabel: "2",
  },
  argTypes: {
    cellStyle: { control: "select", options: ["regular", "infoBlue"], description: "Cell style variant" },
    size: { control: "select", options: ["sm", "md", "lg"], description: "Cell size" },
    isSelected: { control: "boolean", description: "Whether the cell is selected" },
    isDisabled: { control: "boolean", description: "Whether the cell is disabled" },
    label: { control: "text", description: "Primary label text" },
    subtext: { control: "text", description: "Secondary description text (leave empty to hide)" },
    showCheckbox: { control: "boolean", description: "Show checkbox sub-component" },
    showAvatar: { control: "boolean", description: "Show avatar sub-component" },
    avatarText: { control: "text", description: "Avatar initials", if: { arg: "showAvatar" } },
    showLeadingIcon: { control: "boolean", description: "Show leading icon" },
    showTrailingIcon: { control: "boolean", description: "Show trailing icon" },
    showPills: { control: "boolean", description: "Show pills badge" },
    pillLabel: { control: "text", description: "Pill label text", if: { arg: "showPills" } },
  },
  render: (args) => <ListPlaygroundCell {...(args as unknown as ListPlaygroundArgs)} />,
};

// ─── DropdownList Multi-Select Interactive ───────────────────────────────────

const LIST_ITEMS = [
  { id: "u1", label: "Alice Johnson", desc: "Engineering", initials: "AJ" },
  { id: "u2", label: "Bob Smith", desc: "Design", initials: "BS" },
  { id: "u3", label: "Carol White", desc: "Product", initials: "CW" },
  { id: "u4", label: "Dave Brown", desc: "Marketing", initials: "DB" },
  { id: "u5", label: "Eve Davis", desc: "Sales", initials: "ED" },
];

const ListMultiSelectDemo: React.FC = () => {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(["u1"]));

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={st.page}>
      <div style={st.title}>DropdownList — Interactive Multi-Select</div>
      <p style={{ color: "#6b7280", marginBottom: 16, fontSize: 12 }}>
        Click cells or checkboxes to toggle selection. Props are injected from Cell to sub-components via cloneElement.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {(["regular", "infoBlue"] as const).map(cellStyle => (
          <div key={cellStyle}>
            <div style={st.subtitle}>{cellStyle === "regular" ? "Regular" : "Info Blue"}</div>
            <div style={{ border: "1px solid #e6e6e6", borderRadius: 6, overflow: "hidden", maxWidth: 360 }}>
              {LIST_ITEMS.map(item => (
                <DropdownList.Cell
                  key={item.id}
                  cellStyle={cellStyle}
                  size="md"
                  isSelected={selected.has(item.id)}
                  onClick={() => toggle(item.id)}
                >
                  <DropdownList.Avatar>{item.initials}</DropdownList.Avatar>
                  <DropdownList.Checkbox />
                  <DropdownList.Content label={item.label} subtext={item.desc} />
                </DropdownList.Cell>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ListMultiSelect: Story = {
  name: "List Multi-Select",
  render: () => <ListMultiSelectDemo />,
};

// ─── DropdownList Size Comparison ────────────────────────────────────────────

export const ListSizeComparison: Story = {
  name: "List Size Comparison",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>DropdownList — Size Comparison (sm / md / lg)</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {SIZES.map(size => (
          <div key={size as string}>
            <div style={st.subtitle}>{SIZE_LABELS[size as string]}</div>
            <div style={{ border: "1px solid #e6e6e6", borderRadius: 6, overflow: "hidden", maxWidth: 360 }}>
              <DropdownList.Cell size={size}>
                <DropdownList.LeadingIcon><Ico s={size === "lg" ? 20 : 16} /></DropdownList.LeadingIcon>
                <DropdownList.Content label="Search results" subtext="3 items found" />
                <DropdownList.Pills label="3" />
              </DropdownList.Cell>
              <DropdownList.Cell size={size} isSelected>
                <DropdownList.Avatar>AB</DropdownList.Avatar>
                <DropdownList.Checkbox />
                <DropdownList.Content label="Selected item" subtext="With avatar" />
                <DropdownList.TrailingIcon><AddIcon s={size === "lg" ? 20 : 16} /></DropdownList.TrailingIcon>
              </DropdownList.Cell>
              <DropdownList.Cell size={size} isDisabled>
                <DropdownList.Checkbox />
                <DropdownList.Content label="Disabled item" />
              </DropdownList.Cell>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
