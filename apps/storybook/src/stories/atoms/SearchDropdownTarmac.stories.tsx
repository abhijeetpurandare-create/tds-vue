import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchDropdown, ThemeProvider, useTheme } from "@delhivery/tarmac";
import { css } from "@emotion/css";
import type { SearchDropdownProps, SearchDropdownSize, SearchDropdownFieldVariant } from "@delhivery/tarmac";

// ─── Constants ───────────────────────────────────────────────────────────────

const SIZES: SearchDropdownSize[] = ["lg", "md", "sm"];
const FIELD_VARIANTS: SearchDropdownFieldVariant[] = ["standard", "withTags"];

const SIZE_LABELS: Record<string, string> = { lg: "Large", md: "Medium", sm: "Small" };
const VARIANT_LABELS: Record<string, string> = { standard: "Standard", withTags: "With Tags" };

type ShowcaseState = "default" | "hover" | "active" | "focused" | "disabled" | "ghost";
const STATES: ShowcaseState[] = ["default", "hover", "active", "focused", "disabled", "ghost"];

// ─── Icons ───────────────────────────────────────────────────────────────────

const SearchIco = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const CloseIco = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const InfoIco = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

const CloseCircleIco = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 1.667A8.336 8.336 0 0 0 1.667 10c0 4.6 3.733 8.333 8.333 8.333S18.333 14.6 18.333 10 14.6 1.667 10 1.667Zm4.167 11.316-1.184 1.184L10 11.183l-2.983 2.984-1.184-1.184L8.817 10 5.833 7.017l1.184-1.184L10 8.817l2.983-2.984 1.184 1.184L11.183 10l2.984 2.983Z" />
  </svg>
);

const AddCircleIco = ({ s = 16 }: { s?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 1.667A8.336 8.336 0 0 0 1.667 10c0 4.6 3.733 8.333 8.333 8.333S18.333 14.6 18.333 10 14.6 1.667 10 1.667Zm5 9.166h-4.167V15H9.167v-4.167H5V9.167h4.167V5h1.666v4.167H15v1.666Z" />
  </svg>
);

// ─── Sample Data ─────────────────────────────────────────────────────────────

const sampleOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" },
];

const sampleTags = [
  { id: "1", label: "Tag 1" },
  { id: "2", label: "Tag 2" },
];

const checkboxOptions = [
  { value: "c1", label: "Checkbox Item 1", showCheckbox: true },
  { value: "c2", label: "Checkbox Item 2", showCheckbox: true },
  { value: "c3", label: "Checkbox Item 3", showCheckbox: true },
  { value: "c4", label: "Checkbox Item 4", showCheckbox: true },
  { value: "c5", label: "Checkbox Item 5", showCheckbox: true },
];

const richOptions = [
  { value: "r1", label: "Dashboard", description: "View analytics", leadingIcon: <InfoIco s={16} /> },
  { value: "r2", label: "Settings", description: "Manage preferences", leadingIcon: <InfoIco s={16} /> },
  { value: "r3", label: "Profile", description: "Edit your profile", leadingIcon: <InfoIco s={16} /> },
  { value: "r4", label: "Notifications", description: "Alert settings", leadingIcon: <InfoIco s={16} /> },
  { value: "r5", label: "Help Center", description: "Get support", leadingIcon: <InfoIco s={16} /> },
];

const regularCellOptions = [
  { value: "reg1", label: "Regular Item 1", cellStyle: "regular" as const },
  { value: "reg2", label: "Regular Item 2", cellStyle: "regular" as const },
  { value: "reg3", label: "Regular Item 3", cellStyle: "regular" as const },
];

const blueCellOptions = [
  { value: "blue1", label: "Blue Item 1", cellStyle: "blue" as const },
  { value: "blue2", label: "Blue Item 2", cellStyle: "blue" as const },
  { value: "blue3", label: "Blue Item 3", cellStyle: "blue" as const },
];

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

const ShowcaseSearchDropdown: React.FC<
  SearchDropdownProps & { showcaseState: ShowcaseState }
> = ({ showcaseState, ...props }) => {
  const { theme } = useTheme();
  const cfg = theme.components?.searchDropdown_tarmac;
  const sf = cfg?.searchField || {};

  if (showcaseState === "default") return <SearchDropdown {...props} />;
  if (showcaseState === "disabled") return <SearchDropdown {...props} isDisabled />;
  if (showcaseState === "ghost") return <SearchDropdown {...props} isGhost />;

  if (showcaseState === "hover") {
    const overrides = css({
      '& [data-testid="search-field"]': {
        borderColor: `${sf.hoverBorderColor || sf.borderColor} !important`,
        backgroundColor: `${sf.hoverBackgroundColor || sf.backgroundColor} !important`,
      },
    });
    return <div className={overrides}><SearchDropdown {...props} /></div>;
  }

  if (showcaseState === "active") {
    const overrides = css({
      '& [data-testid="search-field"]': {
        borderColor: `${sf.activeBorderColor || sf.borderColor} !important`,
        backgroundColor: `${sf.activeBackgroundColor || sf.backgroundColor} !important`,
      },
    });
    return <div className={overrides}><SearchDropdown {...props} /></div>;
  }

  if (showcaseState === "focused") {
    const focusRing = sf.focusRingColor || "rgba(0,0,0,0.4)";
    const overrides = css({
      '& [data-testid="search-field"]': {
        boxShadow: `0 0 0 2px ${focusRing} !important`,
        borderColor: `${sf.activeBorderColor || sf.borderColor} !important`,
      },
    });
    return <div className={overrides}><SearchDropdown {...props} /></div>;
  }

  return <SearchDropdown {...props} />;
};

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<SearchDropdownProps> = {
  title: "Tarmac TDS/Search Dropdown",
  component: SearchDropdown,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;
type Story = StoryObj<SearchDropdownProps>;

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
    searchDropdownStyle: "tarmac-01",
    fieldVariant: "standard",
    size: "md",
    placeholder: "Search",
    options: sampleOptions,
    maxVisibleItems: 5,
    showFooter: false,
  },
  argTypes: {
    fieldVariant: { control: "select", options: ["standard", "withTags"] },
    size: { control: "select", options: ["lg", "md", "sm"] },
    isDisabled: { control: "boolean" },
    isGhost: { control: "boolean" },
    placeholder: { control: "text" },
    listVariant: { control: "select", options: ["listSet1", "listSet2"] },
    maxVisibleItems: { control: { type: "number", min: 2, max: 8 } },
    showFooter: { control: "boolean" },
    searchHistoryLabel: { control: "text" },
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <SearchDropdown
        {...args}
        searchDropdownStyle="tarmac-01"
        options={sampleOptions}
        leadingIcon={<SearchIco />}
        trailingIcon={<CloseIco />}
      />
    </div>
  ),
};

/* ═══ Story 8.3: Full Matrix — Field Variant × Size × State ═══ */

const VariantSection: React.FC<{ fieldVariant: SearchDropdownFieldVariant }> = ({ fieldVariant }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={st.subtitle}>{VARIANT_LABELS[fieldVariant as string]}</div>
    <div style={st.grid}>
      <div />
      {STATES.map((s) => (
        <div key={s} style={st.colHdr}>{s}</div>
      ))}
      {SIZES.map((size) => (
        <React.Fragment key={size as string}>
          <div style={st.rowLabel}>{SIZE_LABELS[size as string]}</div>
          {STATES.map((state) => (
            <div key={state} style={st.cell}>
              <div style={{ width: "100%" }}>
                <ShowcaseSearchDropdown
                  showcaseState={state}
                  searchDropdownStyle="tarmac-01"
                  fieldVariant={fieldVariant}
                  size={size}
                  options={sampleOptions}
                  placeholder={fieldVariant === "withTags" ? undefined : "Search"}
                  leadingIcon={<SearchIco s={size === "lg" ? 20 : size === "md" ? 16 : 12} />}
                  tags={fieldVariant === "withTags" ? sampleTags : undefined}
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
        2 Variants × 3 Sizes × 6 States = 36 search field combinations
      </p>
      {FIELD_VARIANTS.map((fv) => (
        <VariantSection key={fv as string} fieldVariant={fv} />
      ))}
    </div>
  ),
};

/* ═══ Story 8.4: Search Field States ═══ */

export const SearchFieldStates: Story = {
  name: "Search Field States",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Search Field States — All 6 States per Size</div>
      {SIZES.map((size) => (
        <div key={size as string} style={{ marginBottom: 32 }}>
          <div style={st.subtitle}>{SIZE_LABELS[size as string]}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {STATES.map((state) => (
              <div key={state}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4, textTransform: "uppercase" }}>{state}</div>
                <ShowcaseSearchDropdown
                  showcaseState={state}
                  searchDropdownStyle="tarmac-01"
                  size={size}
                  options={sampleOptions}
                  placeholder="Search"
                  leadingIcon={<SearchIco />}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ═══ Story 8.5: Search Field With Tags ═══ */

export const SearchFieldWithTags: Story = {
  name: "Search Field With Tags",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Search Field — With Tags Variant</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {SIZES.map((size) => (
          <div key={size as string}>
            <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              fieldVariant="withTags"
              size={size}
              options={sampleOptions}
              leadingIcon={<SearchIco />}
              tags={sampleTags}
            />
          </div>
        ))}
      </div>
      <div style={st.subtitle}>With Tags — More Tags</div>
      <div style={{ maxWidth: 400 }}>
        <SearchDropdown
          searchDropdownStyle="tarmac-01"
          fieldVariant="withTags"
          size="md"
          options={sampleOptions}
          leadingIcon={<SearchIco />}
          tags={[
            { id: "1", label: "Tag 1" },
            { id: "2", label: "Tag 2" },
            { id: "3", label: "Tag 3" },
            { id: "4", label: "Long Tag Name" },
          ]}
        />
      </div>
    </div>
  ),
};

/* ═══ Story 8.6: Search Cells — Regular and Blue Styles ═══ */

export const SearchCells: Story = {
  name: "Search Cells",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Search Cells — Regular vs Blue Styles</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={st.subtitle}>Regular Cell Style</div>
          {SIZES.map((size) => (
            <div key={size as string} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
              <SearchDropdown
                searchDropdownStyle="tarmac-01"
                size={size}
                options={[
                  ...regularCellOptions,
                  { value: "reg-dis", label: "Disabled Regular", cellStyle: "regular" as const, disabled: true },
                ]}
                placeholder="Regular cells"
                isOpen
              />
            </div>
          ))}
        </div>
        <div>
          <div style={st.subtitle}>Blue Cell Style</div>
          {SIZES.map((size) => (
            <div key={size as string} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{SIZE_LABELS[size as string]}</div>
              <SearchDropdown
                searchDropdownStyle="tarmac-01"
                size={size}
                options={[
                  ...blueCellOptions,
                  { value: "blue-dis", label: "Disabled Blue", cellStyle: "blue" as const, disabled: true },
                ]}
                placeholder="Blue cells"
                isOpen
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/* ═══ Story 8.7: Search List Variants ═══ */

export const SearchListVariants: Story = {
  name: "Search List Variants",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Search List Variants</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={st.subtitle}>List Set 1 — Checkbox Cells</div>
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            size="md"
            options={checkboxOptions}
            placeholder="List set 1"
            listVariant="listSet1"
            isOpen
          />
        </div>
        <div>
          <div style={st.subtitle}>List Set 2 — Text + Description Cells</div>
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            size="md"
            options={richOptions}
            placeholder="List set 2"
            listVariant="listSet2"
            isOpen
          />
        </div>
      </div>
    </div>
  ),
};

/* ═══ Story 8.8: Search List Footer ═══ */

export const SearchListFooter: Story = {
  name: "Search List Footer",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Search List Footer — CTAs</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        <div>
          <div style={st.subtitle}>Default Footer Buttons</div>
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            size="md"
            options={sampleOptions}
            placeholder="With footer"
            showFooter
            isOpen
            onAddNew={() => console.log("Add new clicked")}
            onCancel={() => console.log("Cancel clicked")}
            onAction={() => console.log("Action clicked")}
          />
        </div>
        <div>
          <div style={st.subtitle}>Custom Footer Content</div>
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            size="md"
            options={sampleOptions}
            placeholder="Custom footer"
            isOpen
            ctaActions={
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", width: "100%" }}>
                <button style={{ padding: "4px 12px", borderRadius: 4, border: "1px solid #ccc", background: "white", cursor: "pointer" }}>Reset</button>
                <button style={{ padding: "4px 12px", borderRadius: 4, border: "none", background: "#2563EB", color: "white", cursor: "pointer" }}>Apply</button>
              </div>
            }
          />
        </div>
      </div>
    </div>
  ),
};

/* ═══ Story 8.9: Disabled State ═══ */

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <div style={st.page}>
      <div style={st.title}>Disabled State</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {FIELD_VARIANTS.map((fv) =>
          SIZES.map((size) => (
            <div key={`${fv}-${size}`} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>
                {VARIANT_LABELS[fv as string]} / {SIZE_LABELS[size as string]}
              </div>
              <SearchDropdown
                searchDropdownStyle="tarmac-01"
                fieldVariant={fv}
                size={size}
                isDisabled
                options={sampleOptions}
                placeholder="Disabled..."
                leadingIcon={<SearchIco />}
                tags={fv === "withTags" ? sampleTags : undefined}
              />
            </div>
          ))
        )}
      </div>
    </div>
  ),
};

/* ═══ Story 8.10: Ghost / Skeleton State ═══ */

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
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              size={size}
              isGhost
              options={sampleOptions}
              placeholder="Ghost..."
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ═══ Story 8.11: Light vs Dark Mode ═══ */

export const LightVsDark: Story = {
  name: "Light vs Dark Mode",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 24, fontFamily: "Noto Sans, sans-serif" }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Light Mode</p>
        <Wrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SIZES.map((size) => (
              <SearchDropdown
                key={size as string}
                searchDropdownStyle="tarmac-01"
                size={size}
                options={sampleOptions}
                placeholder="Search"
                leadingIcon={<SearchIco />}
                trailingIcon={<CloseIco />}
              />
            ))}
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              fieldVariant="withTags"
              size="md"
              options={sampleOptions}
              leadingIcon={<SearchIco />}
              tags={sampleTags}
            />
          </div>
        </Wrap>
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 12 }}>Dark Mode</p>
        <DarkWrap>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SIZES.map((size) => (
              <SearchDropdown
                key={size as string}
                searchDropdownStyle="tarmac-01"
                size={size}
                options={sampleOptions}
                placeholder="Search"
                leadingIcon={<SearchIco />}
                trailingIcon={<CloseIco />}
              />
            ))}
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              fieldVariant="withTags"
              size="md"
              options={sampleOptions}
              leadingIcon={<SearchIco />}
              tags={sampleTags}
            />
          </div>
        </DarkWrap>
      </div>
    </div>
  ),
};
