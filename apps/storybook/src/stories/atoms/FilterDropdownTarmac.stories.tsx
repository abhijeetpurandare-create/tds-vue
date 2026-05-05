import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterDropdown, ThemeProvider } from "@delhivery/tarmac";
import type { FilterDropdownProps } from "@delhivery/tarmac";

// ─── Theme Wrapper ────────────────────────────────────────────────────────────

const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider initialSource="./tarmac-theme.json" activeTheme="tarmac-theme">
    {children}
  </ThemeProvider>
);

// ─── Icons ────────────────────────────────────────────────────────────────────

const FilterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zM9 15a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

// ─── Sample Data ──────────────────────────────────────────────────────────────

const cityOptions = [
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "kolkata", label: "Kolkata" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "disabled_opt", label: "Disabled (option)", disabled: true },
];

const longOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "food", label: "Food & Beverages" },
  { value: "furniture", label: "Furniture" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "books", label: "Books" },
  { value: "toys", label: "Toys & Games" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "automotive", label: "Automotive" },
  { value: "garden", label: "Garden & Outdoors" },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const st: Record<string, React.CSSProperties> = {
  page:     { padding: 32, fontFamily: "Noto Sans, sans-serif", fontSize: 12 },
  title:    { fontSize: 15, fontWeight: 700, color: "#374151", margin: "24px 0 8px", borderBottom: "2px solid #e5e7eb", paddingBottom: 6 },
  subtitle: { fontSize: 12, fontWeight: 600, color: "#6b7280", margin: "16px 0 6px" },
  row:      { display: "flex", flexDirection: "row", gap: 16, alignItems: "flex-start", flexWrap: "wrap" as const },
  col:      { display: "flex", flexDirection: "column", gap: 4 },
  label:    { fontSize: 10, color: "#9ca3af" },
  note:     { fontSize: 11, color: "#6b7280", marginBottom: 12 },
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof FilterDropdown> = {
  title: "Tarmac TDS/FilterDropdown",
  component: FilterDropdown,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [(Story) => <Wrap><Story /></Wrap>],
  argTypes: {
    size:              { control: "select", options: ["lg", "sm"] },
    isDisabled:        { control: "boolean" },
    isGhost:           { control: "boolean" },
    searchable:        { control: "boolean" },
    multiple:          { control: "boolean" },
    hasApply:          { control: "boolean" },
    placeholder:       { control: "text" },
    searchPlaceholder: { control: "text" },
    applyLabel:        { control: "text" },
    maxVisibleLabels:  { control: { type: "number", min: 1, max: 5 } },
  },
};
export default meta;
type Story = StoryObj<typeof FilterDropdown>;

// ─── Playground ───────────────────────────────────────────────────────────────

const PlaygroundRender: React.FC<FilterDropdownProps> = (args) => {
  const [selected, setSelected] = React.useState<(string | number)[]>([]);
  return (
    <div style={{ padding: 40 }}>
      <FilterDropdown
        {...args}
        options={cityOptions}
        value={selected}
        onChange={setSelected}
        onApply={(vals) => { setSelected(vals); }}
      />
    </div>
  );
};

export const Playground: Story = {
  name: "Playground",
  parameters: { layout: "centered" },
  args: {
    placeholder: "Filter",
    size: "lg",
    isDisabled: false,
    isGhost: false,
    searchable: false,
    multiple: true,
    hasApply: true,
    searchPlaceholder: "Search",
    applyLabel: "Apply",
    maxVisibleLabels: 1,
  },
  render: (args) => <PlaygroundRender {...args} />,
};

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div style={st.page}>
      <p style={st.title}>Filter Dropdown — All States</p>

      <p style={st.subtitle}>Collapsed — default</p>
      <div style={st.row}>
        {(["lg", "sm"] as const).map(size => (
          <div key={size} style={st.col}>
            <div style={st.label}>{size === "lg" ? "Large" : "Small"}</div>
            <FilterDropdown placeholder="Filter" options={cityOptions} size={size} />
          </div>
        ))}
      </div>

      <p style={st.subtitle}>Collapsed — with leading icon</p>
      <div style={st.row}>
        {(["lg", "sm"] as const).map(size => (
          <div key={size} style={st.col}>
            <div style={st.label}>{size === "lg" ? "Large" : "Small"}</div>
            <FilterDropdown placeholder="Filter" options={cityOptions} size={size} leadingIcon={<FilterIcon size={size === "lg" ? 20 : 16} />} />
          </div>
        ))}
      </div>

      <p style={st.subtitle}>Active — 1 item selected</p>
      <div style={st.row}>
        {(["lg", "sm"] as const).map(size => (
          <div key={size} style={st.col}>
            <div style={st.label}>{size === "lg" ? "Large" : "Small"}</div>
            <FilterDropdown placeholder="Filter" options={cityOptions} value={["mumbai"]} size={size} />
          </div>
        ))}
      </div>

      <p style={st.subtitle}>Filtered — overflow count (+2)</p>
      <div style={st.row}>
        {(["lg", "sm"] as const).map(size => (
          <div key={size} style={st.col}>
            <div style={st.label}>{size === "lg" ? "Large" : "Small"}</div>
            <FilterDropdown placeholder="Filter" options={cityOptions} value={["mumbai", "delhi", "bangalore"]} size={size} maxVisibleLabels={1} />
          </div>
        ))}
      </div>

      <p style={st.subtitle}>Disabled</p>
      <div style={st.row}>
        {(["lg", "sm"] as const).map(size => (
          <div key={size} style={st.col}>
            <div style={st.label}>{size === "lg" ? "Large" : "Small"}</div>
            <FilterDropdown placeholder="Filter" options={cityOptions} size={size} isDisabled />
          </div>
        ))}
      </div>

      <p style={st.subtitle}>Ghost (skeleton)</p>
      <div style={st.row}>
        {(["lg", "sm"] as const).map(size => (
          <div key={size} style={st.col}>
            <div style={st.label}>{size === "lg" ? "Large" : "Small"}</div>
            <FilterDropdown placeholder="Filter" options={cityOptions} size={size} isGhost />
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Collapsed ────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: "Collapsed",
  render: () => (
    <div style={st.page}>
      <p style={st.title}>Collapsed State</p>
      <div style={st.row}>
        <div style={st.col}>
          <div style={st.label}>Large — no icon</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} size="lg" />
        </div>
        <div style={st.col}>
          <div style={st.label}>Large — with leading icon</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} size="lg" leadingIcon={<FilterIcon size={20} />} />
        </div>
        <div style={st.col}>
          <div style={st.label}>Small — no icon</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} size="sm" />
        </div>
        <div style={st.col}>
          <div style={st.label}>Small — with leading icon</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} size="sm" leadingIcon={<FilterIcon size={16} />} />
        </div>
      </div>
    </div>
  ),
};

// ─── Active ───────────────────────────────────────────────────────────────────

export const Active: Story = {
  name: "Active (Selected)",
  render: () => {
    const Demo = () => {
      const [sel, setSel] = React.useState<(string | number)[]>(["mumbai"]);
      return (
        <div style={st.page}>
          <p style={st.title}>Active State — Items Selected</p>
          <div style={st.row}>
            <div style={st.col}>
              <div style={st.label}>Large — 1 selected</div>
              <FilterDropdown placeholder="Filter" options={cityOptions} value={sel} onChange={setSel} onApply={setSel} size="lg" />
            </div>
            <div style={st.col}>
              <div style={st.label}>Small — 1 selected</div>
              <FilterDropdown placeholder="Filter" options={cityOptions} value={sel} onChange={setSel} onApply={setSel} size="sm" />
            </div>
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};

// ─── Filtered (overflow) ──────────────────────────────────────────────────────

export const Filtered: Story = {
  name: "Filtered (Overflow + Count)",
  render: () => (
    <div style={st.page}>
      <p style={st.title}>Filtered State — Overflow with Count Pill</p>
      <p style={st.note}>When selected items exceed maxVisibleLabels, a count pill (+N) appears.</p>
      <div style={st.row}>
        <div style={st.col}>
          <div style={st.label}>Large — 3 selected, maxVisible=1 → "+2"</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} value={["mumbai", "delhi", "bangalore"]} size="lg" maxVisibleLabels={1} />
        </div>
        <div style={st.col}>
          <div style={st.label}>Small — 4 selected, maxVisible=1 → "+3"</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} value={["mumbai", "delhi", "bangalore", "hyderabad"]} size="sm" maxVisibleLabels={1} />
        </div>
        <div style={st.col}>
          <div style={st.label}>Large — 3 selected, maxVisible=2 → "+1"</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} value={["mumbai", "delhi", "bangalore"]} size="lg" maxVisibleLabels={2} />
        </div>
      </div>
    </div>
  ),
};

// ─── Expanded ─────────────────────────────────────────────────────────────────

export const Expanded: Story = {
  name: "Expanded (Open)",
  render: () => {
    const Demo = () => {
      const [sel, setSel] = React.useState<(string | number)[]>([]);
      return (
        <div style={{ ...st.page, paddingBottom: 320 }}>
          <p style={st.title}>Expanded State — Dropdown Open</p>
          <p style={st.note}>Click the trigger to open. Checkboxes allow multi-select. Apply commits the selection.</p>
          <div style={st.row}>
            <div style={st.col}>
              <div style={st.label}>Large</div>
              <FilterDropdown placeholder="Filter" options={cityOptions} value={sel} onChange={setSel} onApply={setSel} size="lg" />
            </div>
            <div style={st.col}>
              <div style={st.label}>Small</div>
              <FilterDropdown placeholder="Filter" options={cityOptions} value={sel} onChange={setSel} onApply={setSel} size="sm" />
            </div>
            <div style={st.col}>
              <div style={st.label}>With disabled option</div>
              <FilterDropdown placeholder="Status" options={statusOptions} value={sel} onChange={setSel} onApply={setSel} size="lg" />
            </div>
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};

// ─── Searchable ───────────────────────────────────────────────────────────────

export const Searchable: Story = {
  name: "Searchable",
  render: () => {
    const Demo = () => {
      const [sel, setSel] = React.useState<(string | number)[]>([]);
      const [selSm, setSelSm] = React.useState<(string | number)[]>([]);
      const [selLong, setSelLong] = React.useState<(string | number)[]>([]);
      return (
        <div style={{ ...st.page, paddingBottom: 400 }}>
          <p style={st.title}>Searchable — Filter options by typing</p>
          <p style={st.note}>
            When <code>searchable</code> is enabled, a search input appears at the top of the dropdown panel.
            Options are filtered in real-time as you type. The query clears when the panel closes.
          </p>

          <p style={st.subtitle}>Large — searchable</p>
          <div style={st.row}>
            <div style={st.col}>
              <div style={st.label}>Default placeholder "Search"</div>
              <FilterDropdown
                placeholder="City"
                options={cityOptions}
                value={sel}
                onChange={setSel}
                onApply={setSel}
                size="lg"
                searchable
              />
            </div>
            <div style={st.col}>
              <div style={st.label}>Custom searchPlaceholder</div>
              <FilterDropdown
                placeholder="Status"
                options={statusOptions}
                value={sel}
                onChange={setSel}
                onApply={setSel}
                size="lg"
                searchable
                searchPlaceholder="Find status..."
              />
            </div>
            <div style={st.col}>
              <div style={st.label}>With leading icon</div>
              <FilterDropdown
                placeholder="Category"
                options={longOptions}
                value={selLong}
                onChange={setSelLong}
                onApply={setSelLong}
                size="lg"
                searchable
                leadingIcon={<FilterIcon size={20} />}
              />
            </div>
          </div>

          <p style={st.subtitle}>Small — searchable</p>
          <div style={st.row}>
            <div style={st.col}>
              <div style={st.label}>Small + searchable</div>
              <FilterDropdown
                placeholder="City"
                options={cityOptions}
                value={selSm}
                onChange={setSelSm}
                onApply={setSelSm}
                size="sm"
                searchable
              />
            </div>
            <div style={st.col}>
              <div style={st.label}>Small + searchable + leading icon</div>
              <FilterDropdown
                placeholder="Category"
                options={longOptions}
                value={selSm}
                onChange={setSelSm}
                onApply={setSelSm}
                size="sm"
                searchable
                leadingIcon={<FilterIcon size={16} />}
              />
            </div>
          </div>

          <p style={st.subtitle}>Searchable — many options (10 items)</p>
          <p style={st.note}>Try typing "out" to filter to Sports & Outdoors and Garden & Outdoors.</p>
          <div style={st.row}>
            <div style={st.col}>
              <div style={st.label}>Large — 10 options</div>
              <FilterDropdown
                placeholder="Category"
                options={longOptions}
                value={selLong}
                onChange={setSelLong}
                onApply={setSelLong}
                size="lg"
                searchable
                maxVisibleLabels={2}
              />
            </div>
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div style={st.page}>
      <p style={st.title}>Disabled State</p>
      <div style={st.row}>
        <div style={st.col}>
          <div style={st.label}>Large — empty</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} size="lg" isDisabled />
        </div>
        <div style={st.col}>
          <div style={st.label}>Large — with selection</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} value={["mumbai"]} size="lg" isDisabled />
        </div>
        <div style={st.col}>
          <div style={st.label}>Small — empty</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} size="sm" isDisabled />
        </div>
        <div style={st.col}>
          <div style={st.label}>Small — with selection</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} value={["mumbai"]} size="sm" isDisabled />
        </div>
      </div>
    </div>
  ),
};

// ─── Ghost ────────────────────────────────────────────────────────────────────

export const Ghost: Story = {
  name: "Ghost (Skeleton)",
  render: () => (
    <div style={st.page}>
      <p style={st.title}>Ghost State — Skeleton Placeholder</p>
      <div style={st.row}>
        <div style={st.col}>
          <div style={st.label}>Large</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} size="lg" isGhost />
        </div>
        <div style={st.col}>
          <div style={st.label}>Small</div>
          <FilterDropdown placeholder="Filter" options={cityOptions} size="sm" isGhost />
        </div>
      </div>
    </div>
  ),
};

// ─── Interactive Demo ─────────────────────────────────────────────────────────

export const InteractiveDemo: Story = {
  name: "Interactive Demo",
  render: () => {
    const Demo = () => {
      const [cityFilter, setCityFilter] = React.useState<(string | number)[]>([]);
      const [statusFilter, setStatusFilter] = React.useState<(string | number)[]>([]);
      const [catFilter, setCatFilter] = React.useState<(string | number)[]>([]);

      return (
        <div style={{ ...st.page, paddingBottom: 320 }}>
          <p style={st.title}>Interactive Demo — Filter Bar</p>
          <p style={st.note}>Multiple FilterDropdowns working together. City and Category use searchable mode.</p>

          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <FilterDropdown
              placeholder="City"
              options={cityOptions}
              value={cityFilter}
              onChange={setCityFilter}
              onApply={setCityFilter}
              size="lg"
              searchable
              leadingIcon={<FilterIcon size={20} />}
            />
            <FilterDropdown
              placeholder="Status"
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              onApply={setStatusFilter}
              size="lg"
            />
            <FilterDropdown
              placeholder="Category"
              options={longOptions}
              value={catFilter}
              onChange={setCatFilter}
              onApply={setCatFilter}
              size="lg"
              searchable
              maxVisibleLabels={1}
            />
          </div>

          {(cityFilter.length > 0 || statusFilter.length > 0 || catFilter.length > 0) && (
            <div style={{ marginTop: 16, padding: "8px 12px", background: "#f0f7fe", borderRadius: 4, fontSize: 12, color: "#2B2B2B", lineHeight: "20px" }}>
              <strong>Applied:</strong>{" "}
              {cityFilter.length > 0 && <>City: {cityFilter.join(", ")} </>}
              {statusFilter.length > 0 && <>· Status: {statusFilter.join(", ")} </>}
              {catFilter.length > 0 && <>· Category: {catFilter.join(", ")}</>}
            </div>
          )}
        </div>
      );
    };
    return <Demo />;
  },
};

// ─── Interaction Patterns ─────────────────────────────────────────────────────

export const InteractionPatterns: Story = {
  name: "Interaction Patterns",
  render: () => {
    // 1. Single select — commits immediately, no Apply button
    const SingleSelectDemo = () => {
      const [selected, setSelected] = React.useState<(string | number)[]>([]);
      return (
        <div style={st.col}>
          <div style={st.label}>Single select (multiple=false)</div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Clicking an option commits immediately and closes the panel.</div>
          <FilterDropdown
            placeholder="Select city"
            options={cityOptions}
            value={selected}
            onChange={setSelected}
            size="lg"
            multiple={false}
          />
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
            Selected: <strong style={{ color: "#2b2b2b" }}>{selected.length ? selected.join(", ") : "—"}</strong>
          </div>
        </div>
      );
    };

    // 2. Multi-select instant commit — no Apply button, each click commits
    const InstantCommitDemo = () => {
      const [selected, setSelected] = React.useState<(string | number)[]>([]);
      return (
        <div style={st.col}>
          <div style={st.label}>Multi-select, instant commit (hasApply=false)</div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Each checkbox click commits immediately. No Apply button shown.</div>
          <FilterDropdown
            placeholder="Filter cities"
            options={cityOptions}
            value={selected}
            onChange={setSelected}
            size="lg"
            multiple={true}
            hasApply={false}
          />
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
            Selected: <strong style={{ color: "#2b2b2b" }}>{selected.length ? selected.join(", ") : "—"}</strong>
          </div>
        </div>
      );
    };

    // 3. Multi-select with Apply (default) — draft state, commits on Apply
    const BatchApplyDemo = () => {
      const [committed, setCommitted] = React.useState<(string | number)[]>([]);
      const [draft, setDraft] = React.useState<(string | number)[]>([]);
      return (
        <div style={st.col}>
          <div style={st.label}>Multi-select with Apply (default)</div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Checkboxes update a draft. Trigger only updates on Apply. Dismiss reverts draft.</div>
          <FilterDropdown
            placeholder="Filter cities"
            options={cityOptions}
            value={committed}
            onChange={setDraft}
            onApply={setCommitted}
            size="lg"
          />
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
            Draft: <strong style={{ color: "#2396fb" }}>{draft.length ? draft.join(", ") : "—"}</strong>
            {" · "}
            Committed: <strong style={{ color: "#2b2b2b" }}>{committed.length ? committed.join(", ") : "—"}</strong>
          </div>
        </div>
      );
    };

    return (
      <div style={{ ...st.page, paddingBottom: 360 }}>
        <p style={st.title}>Interaction Patterns</p>
        <p style={{ ...st.note, marginBottom: 20 }}>
          Three distinct UX patterns controlled by <code>multiple</code> and <code>hasApply</code> props.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <SingleSelectDemo />
          <InstantCommitDemo />
          <BatchApplyDemo />
        </div>
      </div>
    );
  },
};

// ─── Controlled vs Uncontrolled ───────────────────────────────────────────────

export const ControlledVsUncontrolled: Story = {
  name: "Controlled vs Uncontrolled",
  render: () => {
    const badge = (color: string, text: string) => (
      <span style={{ display: "inline-block", padding: "1px 8px", borderRadius: 999, background: color, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: "#fff", textTransform: "uppercase" as const }}>
        {text}
      </span>
    );

    const Divider = () => <div style={{ borderTop: "1px solid #e5e7eb", margin: "8px 0" }} />;

    // ── 1. No value prop — component manages everything internally ────────────
    // Checkboxes toggle live. Trigger updates only on Apply.
    // Dismiss without Apply reverts checkboxes to last applied state.
    const UncontrolledDemo = () => {
      const [applied, setApplied] = React.useState<(string | number)[]>([]);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {badge("#6366f1", "Uncontrolled")}
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>No value prop</span>
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", lineHeight: "16px" }}>
            Parent passes no <code>value</code>. The component manages pending selection
            internally — checkboxes toggle live while the panel is open.
            Trigger only updates when Apply is clicked. Closing without Apply reverts checkboxes.
          </div>
          <FilterDropdown
            options={cityOptions}
            onApply={setApplied}
            placeholder="City"
            size="lg"
          />
          <Divider />
          <div style={{ fontSize: 11, color: "#6b7280" }}>
            Last applied: <strong style={{ color: "#2b2b2b" }}>{applied.length ? applied.join(", ") : "—"}</strong>
          </div>
        </div>
      );
    };

    // ── 2. Pre-selected via value prop — seeds initial committed state ────────
    // value only seeds the component; parent doesn't need to update it on onChange.
    const PreSelectedDemo = () => {
      const [applied, setApplied] = React.useState<(string | number)[]>(["mumbai", "delhi"]);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {badge("#0891b2", "Pre-selected")}
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>value seeds initial state</span>
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", lineHeight: "16px" }}>
            <code>value</code> seeds the committed state on mount (and whenever it changes externally).
            The component still manages pending selection internally — parent only needs to
            update <code>value</code> when it wants to reset or change the committed state from outside.
          </div>
          <FilterDropdown
            options={cityOptions}
            value={applied}
            onApply={setApplied}
            placeholder="City"
            size="lg"
          />
          <Divider />
          <div style={{ fontSize: 11, color: "#6b7280" }}>
            Committed: <strong style={{ color: "#2b2b2b" }}>{applied.join(", ")}</strong>
          </div>
        </div>
      );
    };

    // ── 3. External reset — parent can clear selection from outside ───────────
    const ExternalResetDemo = () => {
      const [committed, setCommitted] = React.useState<(string | number)[]>([]);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {badge("#059669", "External reset")}
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Parent controls value</span>
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", lineHeight: "16px" }}>
            When the parent updates <code>value</code> (e.g. a "Clear all" button), the component
            syncs both committed and pending state. <code>onChange</code> is optional — it fires
            on each click purely for the parent to observe, but the component doesn't depend on it.
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <FilterDropdown
              options={cityOptions}
              value={committed}
              onApply={setCommitted}
              onChange={(next) => console.log("onChange (informational):", next)}
              placeholder="City"
              size="lg"
            />
            <button
              onClick={() => setCommitted([])}
              style={{ padding: "8px 12px", fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 4, cursor: "pointer", background: "#fff", color: "#374151", whiteSpace: "nowrap" as const }}
            >
              Clear all
            </button>
          </div>
          <Divider />
          <div style={{ fontSize: 11, color: "#6b7280" }}>
            Committed: <strong style={{ color: "#2b2b2b" }}>{committed.length ? committed.join(", ") : "—"}</strong>
          </div>
        </div>
      );
    };

    return (
      <Wrap>
        <div style={{ padding: 32, fontFamily: "Noto Sans, sans-serif", display: "flex", flexDirection: "column", gap: 40, maxWidth: 520, paddingBottom: 360 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
              Controlled vs Uncontrolled
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", lineHeight: "18px", padding: "8px 12px", background: "#f8fafc", borderRadius: 4, border: "1px solid #e5e7eb" }}>
              The component owns <code>isOpen</code>, <code>pendingValues</code> (in-panel), and <code>searchQuery</code>.
              <br />
              <code>committedValues</code> (what the trigger shows) only updates on Apply or when <code>value</code> prop changes.
              <br />
              Dismiss without Apply always reverts pending back to committed.
            </div>
          </div>
          <UncontrolledDemo />
          <PreSelectedDemo />
          <ExternalResetDemo />
        </div>
      </Wrap>
    );
  },
};
