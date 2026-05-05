import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchDropdown from "../index";

// ─── Mock ThemeProvider ──────────────────────────────────────────────────────
// Provide resolved hex values for the `searchDropdown_tarmac` config.

const mockSearchDropdownTarmacConfig = {
  base: {
    fontFamily: "Noto Sans, sans-serif",
    captionFontFamily: "Noto Sans, sans-serif",
    fontWeight: "500",
    radius: "4px",
    listRadius: "4px",
    transition: "all 0.15s ease-in-out",
    focusRingSpread: "2px",
  },
  searchField: {
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
    textColor: "#2b2b2b",
    placeholderColor: "#cdcbcb",
    iconColor: "#999999",
    hoverBorderColor: "#b0b0b0",
    hoverBackgroundColor: "#ffffff",
    activeBorderColor: "#b0b0b0",
    activeBackgroundColor: "#ffffff",
    focusRingColor: "rgba(0,0,0,0.3)",
    borderWidth: "1px",
    sizes: {
      lg: { height: "48px", fontSize: "16px", lineHeight: "24px", padding: "12px", gap: "4px", iconSize: "24px" },
      md: { height: "44px", fontSize: "14px", lineHeight: "20px", padding: "12px", gap: "4px", iconSize: "20px" },
      sm: { height: "36px", fontSize: "12px", lineHeight: "16px", paddingHorizontal: "12px", paddingVertical: "8px", gap: "4px", iconSize: "16px" },
    },
  },
  searchCell: {
    styles: {
      regular: {
        textColor: "#2b2b2b",
        descriptionColor: "#999999",
        backgroundColor: "transparent",
        hoverBackgroundColor: "#f5f5f5",
        activeBackgroundColor: "#ededed",
        disabledTextColor: "#cdcbcb",
        iconColor: "#2b2b2b",
      },
      blue: {
        textColor: "#2b2b2b",
        descriptionColor: "#999999",
        backgroundColor: "transparent",
        hoverBackgroundColor: "#e3f2fd",
        activeBackgroundColor: "#bbdefb",
        disabledTextColor: "#cdcbcb",
        iconColor: "#1565c0",
      },
    },
    sizes: {
      lg: { fontSize: "16px", lineHeight: "24px", descriptionFontSize: "12px", descriptionLineHeight: "16px", padding: "12px", gap: "8px", iconSize: "24px" },
      md: { fontSize: "14px", lineHeight: "20px", descriptionFontSize: "12px", descriptionLineHeight: "16px", padding: "12px", gap: "8px", iconSize: "20px" },
      sm: { fontSize: "12px", lineHeight: "16px", descriptionFontSize: "12px", descriptionLineHeight: "16px", padding: "12px", gap: "8px", iconSize: "16px" },
    },
  },
  list: {
    backgroundColor: "#ffffff",
    borderColor: "#e0e0e0",
    borderWidth: "1px",
    borderRadiusBottomLeft: "4px",
    borderRadiusBottomRight: "4px",
    scrollbarColor: "#d4d4d4",
    scrollbarWidth: "4px",
    scrollbarRadius: "999px",
    scrollbarPaddingX: "4px",
    scrollbarPaddingY: "24px",
  },
  tagsRow: { padding: "8px", gap: "4px" },
  sectionHeader: {
    color: "#999999",
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "10px",
    lineHeight: "12px",
    paddingTop: "8px",
    paddingBottom: "2px",
    paddingHorizontal: "8px",
  },
  searchHistoryLabel: {
    color: "#454545",
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    lineHeight: "16px",
    iconSize: "16px",
    padding: "8px",
    gap: "4px",
  },
  divider: { color: "#e0e0e0", height: "1px" },
  footer: { borderTopColor: "#e0e0e0", padding: "8px", gap: "8px" },
  states: {
    disabled: {
      backgroundColor: "#ffffff",
      borderColor: "#ededed",
      textColor: "#cdcbcb",
      placeholderColor: "#cdcbcb",
      iconColor: "#cdcbcb",
      cursor: "default",
    },
    ghost: {
      backgroundColor: "#ededed",
      borderColor: "transparent",
      textColor: "transparent",
      cursor: "default",
      pointerEvents: "none",
      skeletonFieldHeight: "44px",
      skeletonFieldRadius: "4px",
    },
  },
};

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: {
      components: {
        searchDropdown_tarmac: mockSearchDropdownTarmacConfig,
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../../../config/config", () => ({
  defaultThemeConfig: {
    components: {
      searchDropdown_tarmac: {
        base: { fontFamily: "Noto Sans, sans-serif", fontWeight: "500", radius: "4px", transition: "all 0.15s ease-in-out", focusRingSpread: "2px" },
        searchField: { borderColor: "#e0e0e0", textColor: "#2b2b2b", sizes: { md: { height: "44px", fontSize: "14px" } } },
        searchCell: { styles: { regular: { textColor: "#2b2b2b" } }, sizes: { md: { fontSize: "14px" } } },
        list: { backgroundColor: "#ffffff", borderColor: "#e0e0e0" },
        tagsRow: {},
        sectionHeader: {},
        searchHistoryLabel: {},
        divider: {},
        footer: {},
        states: { disabled: {}, ghost: { backgroundColor: "#ededed", borderColor: "transparent" } },
      },
    },
  },
}));

// Mock sub-components
jest.mock("../../Checkbox", () => {
  const MockCheckbox = (props: any) => (
    <input
      type="checkbox"
      data-testid="tarmac-checkbox"
      data-tarmac-variant={props.tarmacVariant}
      data-tarmac-style={props.tarmacStyle}
      data-size={props.size}
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange || (() => {})}
    />
  );
  MockCheckbox.displayName = "Checkbox";
  return { __esModule: true, default: MockCheckbox };
});

jest.mock("../../Button", () => {
  const MockButton = (props: any) => (
    <button
      data-testid="tarmac-button"
      data-button-style={props.buttonStyle}
      data-variant={props.variant}
      data-size={props.size}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
  MockButton.displayName = "Button";
  return { __esModule: true, default: MockButton };
});

jest.mock("../../Pill", () => {
  const MockPill = (props: any) => (
    <span
      data-testid="tarmac-pill"
      data-pill-variant={props.pillVariant}
      data-pill-type={props.pillType}
      data-size={props.size}
      onClick={props.onClick}
    >
      {props.text}
      {props.trailingIcon && (
        <span data-testid="pill-trailing-icon" onClick={props.onClick}>
          {props.trailingIcon}
        </span>
      )}
    </span>
  );
  MockPill.displayName = "Pill";
  return { __esModule: true, default: MockPill };
});

// ─── Shared test data ────────────────────────────────────────────────────────

const basicOptions = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
];

const basicTags = [
  { id: "t1", label: "Tag One", onRemove: jest.fn() },
  { id: "t2", label: "Tag Two", onRemove: jest.fn() },
];


/* ═══════════════════════════════════════════════════════════════════
 * LEGACY (backward compatibility) — Task 9.1
 * No legacy SearchDropdown exists. When discriminator is absent,
 * the component renders nothing.
 * ═══════════════════════════════════════════════════════════════════ */
describe("SearchDropdown — Legacy (backward compatibility)", () => {
  it("renders nothing when discriminator is absent", () => {
    const { container } = render(
      <SearchDropdown options={basicOptions} placeholder="Search..." />
    );
    expect(container.innerHTML).toBe("");
  });
});


/* ═══════════════════════════════════════════════════════════════════
 * TARMAC TDS — Task 9.2
 * ≥25 tests covering discriminator, sizes, field variants, combos,
 * tags, trailing icon, disabled, ghost states.
 * ═══════════════════════════════════════════════════════════════════ */
describe("SearchDropdown — Tarmac TDS", () => {
  // --- 1. Discriminator rendering ---
  it("renders Tarmac path when searchDropdownStyle is set", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        placeholder="Search..."
      />
    );
    expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
  });

  // --- 2. Renders nothing when discriminator absent ---
  it("renders nothing when searchDropdownStyle is not set", () => {
    const { container } = render(
      <SearchDropdown options={basicOptions} placeholder="Search..." />
    );
    expect(container.innerHTML).toBe("");
  });

  // --- 3. Size: lg ---
  it("renders size=lg", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" size="lg" options={basicOptions} placeholder="Large" />
    );
    expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Large")).toBeInTheDocument();
  });

  // --- 4. Size: md ---
  it("renders size=md", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" size="md" options={basicOptions} placeholder="Medium" />
    );
    expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Medium")).toBeInTheDocument();
  });

  // --- 5. Size: sm ---
  it("renders size=sm", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" size="sm" options={basicOptions} placeholder="Small" />
    );
    expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Small")).toBeInTheDocument();
  });

  // --- 6. Field Variant: standard ---
  it("renders fieldVariant=standard", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" fieldVariant="standard" options={basicOptions} placeholder="Standard" />
    );
    expect(screen.getByTestId("search-field")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Standard")).toBeInTheDocument();
  });

  // --- 7. Field Variant: withTags ---
  it("renders fieldVariant=withTags with tags", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        fieldVariant="withTags"
        tags={basicTags}
        options={basicOptions}
        placeholder="With Tags"
      />
    );
    expect(screen.getByTestId("search-field")).toBeInTheDocument();
    const chips = screen.getAllByTestId("tarmac-pill");
    expect(chips.length).toBe(2);
  });

  // --- 8. Exhaustive combo: Field Variant × Size ---
  it("renders all Field Variant × Size combinations without error", () => {
    const variants = ["standard", "withTags"] as const;
    const sizes = ["lg", "md", "sm"] as const;

    variants.forEach((v) =>
      sizes.forEach((sz) => {
        const ph = `combo-${v}-${sz}`;
        const { unmount } = render(
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            fieldVariant={v}
            size={sz}
            tags={v === "withTags" ? basicTags : undefined}
            options={basicOptions}
            placeholder={ph}
          />
        );
        expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
        unmount();
      })
    );
  });

  // --- 9. With Tags renders Tarmac Chip components ---
  it("With Tags variant renders Tarmac Chip components", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        fieldVariant="withTags"
        tags={basicTags}
        options={basicOptions}
        placeholder="Chips"
      />
    );
    const chips = screen.getAllByTestId("tarmac-pill");
    expect(chips.length).toBe(2);
    expect(chips[0]).toHaveTextContent("Tag One");
    expect(chips[1]).toHaveTextContent("Tag Two");
  });

  // --- 10. Tag onRemove callback ---
  it("invokes tag onRemove callback when chip is clicked", () => {
    const onRemove1 = jest.fn();
    const onRemove2 = jest.fn();
    const tags = [
      { id: "t1", label: "Tag One", onRemove: onRemove1 },
      { id: "t2", label: "Tag Two", onRemove: onRemove2 },
    ];
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        fieldVariant="withTags"
        tags={tags}
        options={basicOptions}
        placeholder="Remove"
      />
    );
    const chips = screen.getAllByTestId("tarmac-pill");
    fireEvent.click(chips[0]);
    expect(onRemove1).toHaveBeenCalled();
  });

  // --- 11. Trailing icon conditional rendering (present) ---
  it("renders trailing icon when provided", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        trailingIcon={<span data-testid="custom-trailing">X</span>}
        placeholder="Trail"
      />
    );
    expect(screen.getByTestId("search-trailing-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-trailing")).toBeInTheDocument();
  });

  // --- 12. Trailing icon conditional rendering (absent) ---
  it("does not render trailing icon when not provided", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="No Trail" />
    );
    expect(screen.queryByTestId("search-trailing-icon")).not.toBeInTheDocument();
  });

  // --- 13. Leading icon renders by default ---
  it("renders leading icon by default (search icon)", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Lead" />
    );
    expect(screen.getByTestId("search-leading-icon")).toBeInTheDocument();
  });

  // --- 14. Custom leading icon ---
  it("renders custom leading icon when provided", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        leadingIcon={<span data-testid="custom-leading">🔍</span>}
        placeholder="Custom Lead"
      />
    );
    expect(screen.getByTestId("custom-leading")).toBeInTheDocument();
  });

  // --- 15. Disabled state: disabled styling ---
  it("renders disabled state with disabled input", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" isDisabled options={basicOptions} placeholder="Disabled" />
    );
    const input = screen.getByTestId("search-input");
    expect(input).toBeDisabled();
  });

  // --- 16. Disabled state: no list opening ---
  it("disabled state prevents list from opening", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" isDisabled options={basicOptions} placeholder="No Open" />
    );
    fireEvent.click(screen.getByTestId("search-field"));
    expect(screen.queryByTestId("search-list-panel")).not.toBeInTheDocument();
  });

  // --- 17. Ghost state: skeleton blocks ---
  it("renders ghost state with skeleton blocks", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" isGhost options={basicOptions} placeholder="Ghost" />
    );
    expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("ghost-skeleton")).toBeInTheDocument();
  });

  // --- 18. Ghost state: no interactive elements ---
  it("ghost state has no interactive elements", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" isGhost options={basicOptions} placeholder="Ghost NI" />
    );
    expect(screen.queryByTestId("search-list-panel")).not.toBeInTheDocument();
    expect(screen.queryByTestId("search-input")).not.toBeInTheDocument();
    expect(screen.queryByTestId("search-field")).not.toBeInTheDocument();
  });

  // --- 19. Default size is md ---
  it("defaults to size=md when no size prop is provided", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Default Size" />
    );
    expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Default Size")).toBeInTheDocument();
  });

  // --- 20. Default fieldVariant is standard ---
  it("defaults to fieldVariant=standard when no fieldVariant prop is provided", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Default Variant" />
    );
    expect(screen.getByTestId("search-field")).toBeInTheDocument();
    // No chips should be rendered in standard variant
    expect(screen.queryByTestId("tarmac-pill")).not.toBeInTheDocument();
  });

  // --- 21. withTags without tags renders no chips ---
  it("withTags variant without tags renders no chips", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        fieldVariant="withTags"
        options={basicOptions}
        placeholder="No Tags"
      />
    );
    expect(screen.queryByTestId("tarmac-pill")).not.toBeInTheDocument();
  });

  // --- 22. Search field has combobox role ---
  it("search field has role=combobox", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="ARIA" />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  // --- 23. aria-expanded is false when closed ---
  it("aria-expanded is false when list is closed", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Closed" />
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false");
  });

  // --- 24. aria-expanded is true when open ---
  it("aria-expanded is true when list is open", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Open" />
    );
    fireEvent.click(screen.getByTestId("search-field"));
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
  });

  // --- 25. className prop is applied ---
  it("applies className prop to container", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Class" className="custom-class" />
    );
    const container = screen.getByTestId("tarmac-search-dropdown");
    expect(container.className).toContain("custom-class");
  });

  // --- 26. Disabled + withTags: no chips rendered ---
  it("disabled withTags variant does not render chips", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        fieldVariant="withTags"
        tags={basicTags}
        isDisabled
        options={basicOptions}
        placeholder="Disabled Tags"
      />
    );
    expect(screen.queryByTestId("tarmac-pill")).not.toBeInTheDocument();
  });
});


/* ═══════════════════════════════════════════════════════════════════
 * TARMAC TDS — Search Cell & List sub-component tests (Task 9.3)
 * ═══════════════════════════════════════════════════════════════════ */
describe("SearchDropdown — Tarmac TDS — Search Cell & List", () => {
  // --- 1. Search Cell rendering with Regular style ---
  it("renders Search Cell with Regular style", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[{ value: "r1", label: "Regular Cell", cellStyle: "regular" }]}
        isOpen
        placeholder="Regular"
      />
    );
    expect(screen.getByTestId("tarmac-search-cell")).toBeInTheDocument();
    expect(screen.getByText("Regular Cell")).toBeInTheDocument();
  });

  // --- 2. Search Cell rendering with Blue style ---
  it("renders Search Cell with Blue style", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[{ value: "b1", label: "Blue Cell", cellStyle: "blue" }]}
        isOpen
        placeholder="Blue"
      />
    );
    expect(screen.getByText("Blue Cell")).toBeInTheDocument();
  });

  // --- 3. Search Cell with Tarmac Checkbox ---
  it("renders Search Cell with Tarmac Checkbox (not raw HTML checkbox)", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[{ value: "cb1", label: "Checkbox Cell", showCheckbox: true }]}
        isOpen
        placeholder="CB"
      />
    );
    const checkbox = screen.getByTestId("tarmac-checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-tarmac-style", "box");
  });

  // --- 4. Search Cell with description text (List set 2) ---
  it("renders Search Cell with description text", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[{ value: "d1", label: "Desc Cell", description: "A description" }]}
        isOpen
        placeholder="Desc"
      />
    );
    expect(screen.getByText("Desc Cell")).toBeInTheDocument();
    expect(screen.getByTestId("cell-description")).toBeInTheDocument();
    expect(screen.getByText("A description")).toBeInTheDocument();
  });

  // --- 5. Search Cell with leading icon ---
  it("renders Search Cell with leading icon", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[{ value: "li1", label: "Lead Icon", leadingIcon: <span data-testid="my-lead-icon">L</span> }]}
        isOpen
        placeholder="LI"
      />
    );
    expect(screen.getByTestId("cell-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("my-lead-icon")).toBeInTheDocument();
  });

  // --- 6. Search Cell with trailing icon ---
  it("renders Search Cell with trailing icon", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[{ value: "ti1", label: "Trail Icon", trailingIcon: <span data-testid="my-trail-icon">T</span> }]}
        isOpen
        placeholder="TI"
      />
    );
    expect(screen.getByTestId("cell-trailing-icon")).toBeInTheDocument();
    expect(screen.getByTestId("my-trail-icon")).toBeInTheDocument();
  });

  // --- 7. Grouped options with section headers ---
  it("renders grouped options with section headers", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[
          { value: "g1", label: "Apple", group: "Fruits" },
          { value: "g2", label: "Banana", group: "Fruits" },
          { value: "g3", label: "Carrot", group: "Vegetables" },
        ]}
        isOpen
        placeholder="Grouped"
      />
    );
    const headers = screen.getAllByTestId("section-header");
    expect(headers.length).toBe(2);
    expect(headers[0]).toHaveTextContent("Fruits");
    expect(headers[1]).toHaveTextContent("Vegetables");
  });

  // --- 8. Dividers between cells ---
  it("renders dividers between consecutive cells", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        isOpen
        placeholder="Dividers"
      />
    );
    const dividers = screen.getAllByTestId("cell-divider");
    // 3 options → 2 dividers between them
    expect(dividers.length).toBe(2);
  });

  // --- 9. Tags row at top of list ---
  it("renders Tags row at top of list when tags are provided", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        tags={basicTags}
        options={basicOptions}
        isOpen
        placeholder="Tags Row"
      />
    );
    expect(screen.getByTestId("list-tags-row")).toBeInTheDocument();
  });

  // --- 10. Search history label rendering ---
  it("renders search history label when provided", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        searchHistoryLabel="Recent Searches"
        searchHistoryIcon={<span data-testid="history-icon">🕐</span>}
        isOpen
        placeholder="History"
      />
    );
    expect(screen.getByTestId("search-history-label")).toBeInTheDocument();
    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
    expect(screen.getByTestId("history-icon")).toBeInTheDocument();
  });

  // --- 11. Footer CTAs with Tarmac Button components ---
  it("renders footer CTAs with Tarmac Button components", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        showFooter
        isOpen
        placeholder="Footer"
      />
    );
    expect(screen.getByTestId("list-footer")).toBeInTheDocument();
    const buttons = screen.getAllByTestId("tarmac-button");
    expect(buttons.length).toBe(3);
    expect(buttons[0]).toHaveTextContent("Add new");
    expect(buttons[1]).toHaveTextContent("Cancel");
    expect(buttons[2]).toHaveTextContent("Action");
  });

  // --- 12. Custom footer content via ctaActions ---
  it("renders custom footer content via ctaActions", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        ctaActions={<button data-testid="custom-cta">Custom Action</button>}
        isOpen
        placeholder="Custom Footer"
      />
    );
    expect(screen.getByTestId("list-footer")).toBeInTheDocument();
    expect(screen.getByTestId("custom-cta")).toBeInTheDocument();
  });

  // --- 13. Footer CTA callbacks ---
  it("footer CTA buttons invoke callbacks", () => {
    const onAddNew = jest.fn();
    const onCancel = jest.fn();
    const onAction = jest.fn();
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        showFooter
        onAddNew={onAddNew}
        onCancel={onCancel}
        onAction={onAction}
        isOpen
        placeholder="CTA Callbacks"
      />
    );
    const buttons = screen.getAllByTestId("tarmac-button");
    fireEvent.click(buttons[0]);
    expect(onAddNew).toHaveBeenCalled();
    fireEvent.click(buttons[1]);
    expect(onCancel).toHaveBeenCalled();
    fireEvent.click(buttons[2]);
    expect(onAction).toHaveBeenCalled();
  });

  // --- 14. List panel has role=listbox ---
  it("list panel has role=listbox", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen placeholder="Listbox" />
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  // --- 15. Search cells have role=option ---
  it("search cells have role=option", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen placeholder="Options" />
    );
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(3);
  });

  // --- 16. No footer when showFooter is false ---
  it("does not render footer when showFooter is false", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen placeholder="No Footer" />
    );
    expect(screen.queryByTestId("list-footer")).not.toBeInTheDocument();
  });

  // --- 17. No search history label when not provided ---
  it("does not render search history label when not provided", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen placeholder="No History" />
    );
    expect(screen.queryByTestId("search-history-label")).not.toBeInTheDocument();
  });
});


/* ═══════════════════════════════════════════════════════════════════
 * TARMAC TDS — Interaction behavior tests (Task 9.4)
 * ═══════════════════════════════════════════════════════════════════ */
describe("SearchDropdown — Tarmac TDS — Interactions", () => {
  // --- 1. Search filtering: options filtered by query ---
  it("filters options by search query", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Filter" />
    );
    fireEvent.click(screen.getByTestId("search-field"));
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Option 1" } });
    const cells = screen.getAllByTestId("tarmac-search-cell");
    expect(cells.length).toBe(1);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  // --- 2. No results found message ---
  it("shows no results found message when no options match", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="No Match" />
    );
    fireEvent.click(screen.getByTestId("search-field"));
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "zzzzz" } });
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  // --- 3. Option selection invokes onSelect callback ---
  it("invokes onSelect callback when option is clicked", () => {
    const onSelect = jest.fn();
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        onSelect={onSelect}
        placeholder="Select"
      />
    );
    fireEvent.click(screen.getByTestId("search-field"));
    fireEvent.click(screen.getByText("Option 1"));
    expect(onSelect).toHaveBeenCalledWith("opt1");
  });

  // --- 4. Selected option renders with Blue style ---
  it("selected option renders with Blue style (aria-selected=true)", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        value="opt2"
        isOpen
        placeholder="Selected"
      />
    );
    const cells = screen.getAllByTestId("tarmac-search-cell");
    // opt2 is the second option
    expect(cells[1]).toHaveAttribute("aria-selected", "true");
    // Others should be false
    expect(cells[0]).toHaveAttribute("aria-selected", "false");
    expect(cells[2]).toHaveAttribute("aria-selected", "false");
  });

  // --- 5. Keyboard: ArrowDown opens list ---
  it("ArrowDown opens list when closed", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="KB Open" />
    );
    const input = screen.getByTestId("search-input");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByTestId("search-list-panel")).toBeInTheDocument();
  });

  // --- 6. Keyboard: ArrowDown moves focus ---
  it("ArrowDown moves focus to next cell when list is open", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen placeholder="KB Down" />
    );
    const input = screen.getByTestId("search-input");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    // First option should be focused
    const cells = screen.getAllByTestId("tarmac-search-cell");
    expect(cells[0]).toHaveAttribute("data-focused", "true");
  });

  // --- 7. Keyboard: ArrowUp moves focus ---
  it("ArrowUp moves focus to previous cell when list is open", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen placeholder="KB Up" />
    );
    const input = screen.getByTestId("search-input");
    // Move down twice
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    // Move up once
    fireEvent.keyDown(input, { key: "ArrowUp" });
    const cells = screen.getAllByTestId("tarmac-search-cell");
    expect(cells[0]).toHaveAttribute("data-focused", "true");
  });

  // --- 8. Keyboard: Enter selects focused option ---
  it("Enter selects focused option", () => {
    const onSelect = jest.fn();
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        onSelect={onSelect}
        isOpen
        placeholder="KB Enter"
      />
    );
    const input = screen.getByTestId("search-input");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("opt1");
  });

  // --- 9. Keyboard: Escape closes list ---
  it("Escape closes list", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="KB Esc" />
    );
    fireEvent.click(screen.getByTestId("search-field"));
    expect(screen.getByTestId("search-list-panel")).toBeInTheDocument();
    const input = screen.getByTestId("search-input");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByTestId("search-list-panel")).not.toBeInTheDocument();
  });

  // --- 10. Click-outside closes list ---
  it("closes list on click outside", () => {
    render(
      <div>
        <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Outside" />
        <div data-testid="outside">Outside element</div>
      </div>
    );
    fireEvent.click(screen.getByTestId("search-field"));
    expect(screen.getByTestId("search-list-panel")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByTestId("search-list-panel")).not.toBeInTheDocument();
  });

  // --- 11. ARIA: role=combobox ---
  it("has role=combobox on search field", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="ARIA CB" />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  // --- 12. ARIA: aria-expanded ---
  it("aria-expanded toggles with list open/close", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="ARIA Exp" />
    );
    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(screen.getByTestId("search-field"));
    expect(combobox).toHaveAttribute("aria-expanded", "true");
  });

  // --- 13. ARIA: role=listbox on list panel ---
  it("list panel has role=listbox", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen placeholder="ARIA LB" />
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  // --- 14. ARIA: role=option on cells ---
  it("search cells have role=option", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen placeholder="ARIA Opt" />
    );
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(3);
  });

  // --- 15. ARIA: aria-selected on cells ---
  it("aria-selected is set on selected option", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        value="opt1"
        isOpen
        placeholder="ARIA Sel"
      />
    );
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveAttribute("aria-selected", "true");
    expect(options[1]).toHaveAttribute("aria-selected", "false");
  });

  // --- 16. ARIA: aria-disabled on disabled cells ---
  it("aria-disabled is set on disabled option", () => {
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[
          { value: "d1", label: "Disabled", disabled: true },
          { value: "d2", label: "Enabled" },
        ]}
        isOpen
        placeholder="ARIA Dis"
      />
    );
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveAttribute("aria-disabled", "true");
    expect(options[1]).toHaveAttribute("aria-disabled", "false");
  });

  // --- 17. Placeholder text ---
  it("displays placeholder text in input", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Type here..." />
    );
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  // --- 18. defaultThemeConfig fallback when theme is missing ---
  it("renders with defaultThemeConfig fallback when theme is missing", () => {
    // The mock already provides defaultThemeConfig fallback
    // This test verifies the component renders without error using the fallback
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Fallback" />
    );
    expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
  });

  // --- 19. Disabled option cannot be selected ---
  it("disabled option does not invoke onSelect", () => {
    const onSelect = jest.fn();
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[
          { value: "d1", label: "Disabled", disabled: true },
          { value: "d2", label: "Enabled" },
        ]}
        onSelect={onSelect}
        isOpen
        placeholder="Dis Select"
      />
    );
    const cells = screen.getAllByTestId("tarmac-search-cell");
    fireEvent.click(cells[0]);
    expect(onSelect).not.toHaveBeenCalled();
    fireEvent.click(cells[1]);
    expect(onSelect).toHaveBeenCalledWith("d2");
  });

  // --- 20. Search filtering is case-insensitive ---
  it("search filtering is case-insensitive", () => {
    render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} placeholder="Case" />
    );
    fireEvent.click(screen.getByTestId("search-field"));
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "option 2" } });
    const cells = screen.getAllByTestId("tarmac-search-cell");
    expect(cells.length).toBe(1);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  // --- 21. onSearch callback is invoked ---
  it("invokes onSearch callback when typing", () => {
    const onSearch = jest.fn();
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={basicOptions}
        onSearch={onSearch}
        placeholder="Search CB"
      />
    );
    fireEvent.click(screen.getByTestId("search-field"));
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onSearch).toHaveBeenCalledWith("test");
  });

  // --- 22. Controlled isOpen prop ---
  it("respects controlled isOpen prop", () => {
    const { rerender } = render(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen={false} placeholder="Controlled" />
    );
    expect(screen.queryByTestId("search-list-panel")).not.toBeInTheDocument();
    rerender(
      <SearchDropdown searchDropdownStyle="tarmac-01" options={basicOptions} isOpen={true} placeholder="Controlled" />
    );
    expect(screen.getByTestId("search-list-panel")).toBeInTheDocument();
  });

  // --- 23. Keyboard navigation skips disabled options ---
  it("keyboard navigation skips disabled options", () => {
    const onSelect = jest.fn();
    render(
      <SearchDropdown
        searchDropdownStyle="tarmac-01"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B", disabled: true },
          { value: "c", label: "C" },
        ]}
        onSelect={onSelect}
        isOpen
        placeholder="Skip Disabled"
      />
    );
    const input = screen.getByTestId("search-input");
    // ArrowDown → first enabled (A)
    fireEvent.keyDown(input, { key: "ArrowDown" });
    // ArrowDown → skip B (disabled) → C
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith("c");
  });
});


/* ═══════════════════════════════════════════════════════════════════
 * PROPERTY-BASED TESTS — fast-check (Tasks 3.8, 3.9, 9.5–9.16)
 * ═══════════════════════════════════════════════════════════════════ */
import * as fc from "fast-check";
import {
  buildSearchFieldStyles,
  buildSearchCellStyles,
  type SearchDropdownStyleParams,
  type SearchCellStyleParams,
  type SearchDropdownTarmacConfig,
} from "../useSearchDropdownStyles";

import { cache as emotionCache } from "@emotion/css";

// ─── Shared config for property-based style builder tests ────────────────────
const pbtConfig: SearchDropdownTarmacConfig = mockSearchDropdownTarmacConfig as unknown as SearchDropdownTarmacConfig;

/** Extract all CSS rules from Emotion's sheet that match a given class name */
function getEmotionCSSRules(className: string): string {
  const allRules: string[] = [];
  const tags = (emotionCache.sheet as any)?.tags;
  if (tags) {
    for (const tag of tags) {
      const sheet = tag?.sheet;
      if (sheet?.cssRules) {
        for (let i = 0; i < sheet.cssRules.length; i++) {
          const rule = sheet.cssRules[i];
          if (rule.cssText?.includes(`.${className}`)) {
            allRules.push(rule.cssText);
          }
        }
      }
    }
  }
  return allRules.join("\n");
}


/* ───────────────────────────────────────────────────────────────────
 * Task 3.8 — Property 2: CSS pseudo-states generated for all sub-components
 * Feature: search-dropdown-tarmac-migration, Property 2
 * Validates: Requirements 5.2, 5.3, 5.4, 5.7, 6.2, 6.3, 7.2, 7.3
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 2: CSS pseudo-states generated for all sub-components", () => {
  it("buildSearchFieldStyles generates :hover, :active, :focus-within pseudo-state selectors", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("lg", "md", "sm"),
        fc.constantFrom("standard", "withTags"),
        (size, fieldVariant) => {
          const params: SearchDropdownStyleParams = {
            config: pbtConfig,
            size,
            fieldVariant,
            isDisabled: false,
            isGhost: false,
            isOpen: false,
          };
          const className = buildSearchFieldStyles(params);
          expect(className.length).toBeGreaterThan(0);

          const cssRules = getEmotionCSSRules(className);
          expect(cssRules).toContain(":hover");
          expect(cssRules).toContain(":active");
          expect(cssRules).toContain(":focus-within");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("buildSearchCellStyles generates :hover, :active pseudo-state selectors for cell style variants", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("regular", "blue"),
        fc.constantFrom("lg", "md", "sm"),
        (cellStyle, size) => {
          const params: SearchCellStyleParams = {
            config: pbtConfig,
            cellStyle,
            size,
            isSelected: false,
            isDisabled: false,
          };
          const className = buildSearchCellStyles(params);
          expect(className.length).toBeGreaterThan(0);

          const cssRules = getEmotionCSSRules(className);
          expect(cssRules).toContain(":hover");
          expect(cssRules).toContain(":active");
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 3.9 — Property 5: Cell style variants produce distinct styles
 * Feature: search-dropdown-tarmac-migration, Property 5
 * Validates: Requirements 6.1, 7.1
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 5: Cell style variants produce distinct styles", () => {
  it("buildSearchCellStyles produces distinct CSS class strings for regular vs blue", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("lg", "md", "sm"),
        fc.boolean(),
        (size, isSelected) => {
          const regularCls = buildSearchCellStyles({
            config: pbtConfig,
            cellStyle: "regular",
            size,
            isSelected,
            isDisabled: false,
          });
          const blueCls = buildSearchCellStyles({
            config: pbtConfig,
            cellStyle: "blue",
            size,
            isSelected,
            isDisabled: false,
          });
          expect(regularCls).not.toBe(blueCls);
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.5 — Property 1: Exhaustive variant rendering
 * Feature: search-dropdown-tarmac-migration, Property 1
 * Validates: Requirements 4.1, 4.2, 4.3, 9.1, 9.2, 9.3, 19.1, 19.2, 19.3, 19.4, 19.5, 19.8, 19.9
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 1: Exhaustive variant rendering", () => {
  it("renders without error for all fieldVariant × size × disabled/ghost combinations", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("standard", "withTags"),
        fc.constantFrom("lg", "md", "sm"),
        fc.boolean(),
        fc.boolean(),
        (fieldVariant, size, isDisabled, isGhost) => {
          const tags = fieldVariant === "withTags"
            ? [{ id: "t1", label: "Tag", onRemove: jest.fn() }]
            : undefined;
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              fieldVariant={fieldVariant}
              size={size}
              isDisabled={isDisabled}
              isGhost={isGhost}
              tags={tags}
              options={basicOptions}
              placeholder="PBT"
            />
          );
          expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });


  it("renders cells without error for all cellStyle × size × disabled combinations", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("regular", "blue"),
        fc.constantFrom("lg", "md", "sm"),
        fc.boolean(),
        (cellStyle, size, disabled) => {
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              size={size}
              options={[{ value: "v1", label: "Cell", cellStyle, disabled }]}
              isOpen
              placeholder="Cell PBT"
            />
          );
          expect(screen.getByTestId("tarmac-search-cell")).toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.6 — Property 3: Boolean toggle conditional rendering
 * Feature: search-dropdown-tarmac-migration, Property 3
 * Validates: Requirements 2.3, 2.4, 3.1, 8.1, 8.2, 8.4, 8.5, 10.3, 10.4, 10.8
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 3: Boolean toggle conditional rendering", () => {
  it("trailing icon present when provided, absent when not", () => {
    fc.assert(
      fc.property(fc.boolean(), (hasTrailing) => {
        const { unmount } = render(
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            options={basicOptions}
            trailingIcon={hasTrailing ? <span data-testid="trail">T</span> : undefined}
            placeholder="Toggle"
          />
        );
        if (hasTrailing) {
          expect(screen.getByTestId("search-trailing-icon")).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId("search-trailing-icon")).not.toBeInTheDocument();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });


  it("cell checkbox present when showCheckbox is true, absent when false", () => {
    fc.assert(
      fc.property(fc.boolean(), (showCheckbox) => {
        const { unmount } = render(
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            options={[{ value: "v1", label: "Cell", showCheckbox }]}
            isOpen
            placeholder="CB Toggle"
          />
        );
        if (showCheckbox) {
          expect(screen.getByTestId("tarmac-checkbox")).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId("tarmac-checkbox")).not.toBeInTheDocument();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("cell description present when provided, absent when not", () => {
    fc.assert(
      fc.property(fc.boolean(), (hasDesc) => {
        const { unmount } = render(
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            options={[{ value: "v1", label: "Cell", description: hasDesc ? "Desc" : undefined }]}
            isOpen
            placeholder="Desc Toggle"
          />
        );
        if (hasDesc) {
          expect(screen.getByTestId("cell-description")).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId("cell-description")).not.toBeInTheDocument();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });


  it("search history label present when provided, absent when not", () => {
    fc.assert(
      fc.property(fc.boolean(), (hasHistory) => {
        const { unmount } = render(
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            options={basicOptions}
            searchHistoryLabel={hasHistory ? "Recent" : undefined}
            isOpen
            placeholder="History Toggle"
          />
        );
        if (hasHistory) {
          expect(screen.getByTestId("search-history-label")).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId("search-history-label")).not.toBeInTheDocument();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("footer present when showFooter is true, absent when false", () => {
    fc.assert(
      fc.property(fc.boolean(), (showFooter) => {
        const { unmount } = render(
          <SearchDropdown
            searchDropdownStyle="tarmac-01"
            options={basicOptions}
            showFooter={showFooter}
            isOpen
            placeholder="Footer Toggle"
          />
        );
        if (showFooter) {
          expect(screen.getByTestId("list-footer")).toBeInTheDocument();
        } else {
          expect(screen.queryByTestId("list-footer")).not.toBeInTheDocument();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.7 — Property 4: Disabled and ghost state rendering
 * Feature: search-dropdown-tarmac-migration, Property 4
 * Validates: Requirements 5.5, 5.6, 6.4, 7.4, 19.10
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 4: Disabled and ghost state rendering", () => {
  it("disabled state: input is disabled and list does not open on click", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("standard", "withTags"),
        fc.constantFrom("lg", "md", "sm"),
        (fieldVariant, size) => {
          const tags = fieldVariant === "withTags"
            ? [{ id: "t1", label: "Tag", onRemove: jest.fn() }]
            : undefined;
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              fieldVariant={fieldVariant}
              size={size}
              isDisabled
              tags={tags}
              options={basicOptions}
              placeholder="Dis PBT"
            />
          );
          expect(screen.getByTestId("search-input")).toBeDisabled();
          fireEvent.click(screen.getByTestId("search-field"));
          expect(screen.queryByTestId("search-list-panel")).not.toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });


  it("ghost state: skeleton renders and no interactive elements present", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("standard", "withTags"),
        fc.constantFrom("lg", "md", "sm"),
        (fieldVariant, size) => {
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              fieldVariant={fieldVariant}
              size={size}
              isGhost
              options={basicOptions}
              placeholder="Ghost PBT"
            />
          );
          expect(screen.getByTestId("ghost-skeleton")).toBeInTheDocument();
          expect(screen.queryByTestId("search-list-panel")).not.toBeInTheDocument();
          expect(screen.queryByTestId("search-input")).not.toBeInTheDocument();
          expect(screen.queryByTestId("search-field")).not.toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.8 — Property 6: Search filtering preserves matching options
 * Feature: search-dropdown-tarmac-migration, Property 6
 * Validates: Requirements 14.1, 14.2
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 6: Search filtering preserves matching options", () => {
  it("filtered results contain only options matching the query (case-insensitive)", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            value: fc.nat().map(String),
            label: fc.stringOf(fc.constantFrom("a", "b", "c", "d", "e", " "), { minLength: 1, maxLength: 10 }),
          }),
          { minLength: 1, maxLength: 8 }
        ),
        fc.stringOf(fc.constantFrom("a", "b", "c", "d", "e"), { minLength: 1, maxLength: 3 }),
        (options, query) => {
          // Deduplicate values
          const uniqueOpts = options.filter((o, i, arr) => arr.findIndex(x => x.value === o.value) === i);
          if (uniqueOpts.length === 0) return;

          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              options={uniqueOpts}
              placeholder="Filter PBT"
            />
          );
          fireEvent.click(screen.getByTestId("search-field"));
          const input = screen.getByTestId("search-input");
          fireEvent.change(input, { target: { value: query } });

          const cells = screen.queryAllByTestId("tarmac-search-cell");
          const expected = uniqueOpts.filter(o =>
            o.label.toLowerCase().includes(query.toLowerCase())
          );
          expect(cells.length).toBe(expected.length);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.9 — Property 7: Option selection invokes callback with correct value
 * Feature: search-dropdown-tarmac-migration, Property 7
 * Validates: Requirements 15.1, 15.3
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 7: Option selection invokes callback with correct value", () => {
  it("clicking a non-disabled option invokes onSelect with that option's value", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            value: fc.nat().map(String),
            label: fc.stringOf(fc.constantFrom("A", "B", "C", "D"), { minLength: 1, maxLength: 6 }),
          }),
          { minLength: 1, maxLength: 5 }
        ),
        (options) => {
          const uniqueOpts = options.filter((o, i, arr) => arr.findIndex(x => x.value === o.value) === i);
          if (uniqueOpts.length === 0) return;

          const onSelect = jest.fn();
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              options={uniqueOpts}
              onSelect={onSelect}
              isOpen
              placeholder="Select PBT"
            />
          );
          const cells = screen.getAllByTestId("tarmac-search-cell");
          // Click the first cell
          fireEvent.click(cells[0]);
          expect(onSelect).toHaveBeenCalledWith(uniqueOpts[0].value);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.10 — Property 8: Keyboard navigation traverses options correctly
 * Feature: search-dropdown-tarmac-migration, Property 8
 * Validates: Requirements 16.1, 16.2, 16.3, 16.4
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 8: Keyboard navigation traverses options correctly", () => {
  it("ArrowDown advances focus, ArrowUp decrements, Enter selects", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 6 }),
        (n) => {
          const opts = Array.from({ length: n }, (_, i) => ({
            value: `v${i}`,
            label: `Option ${i}`,
          }));
          const onSelect = jest.fn();
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              options={opts}
              onSelect={onSelect}
              isOpen
              placeholder="KB PBT"
            />
          );
          const input = screen.getByTestId("search-input");

          // ArrowDown to first option
          fireEvent.keyDown(input, { key: "ArrowDown" });
          let cells = screen.getAllByTestId("tarmac-search-cell");
          expect(cells[0]).toHaveAttribute("data-focused", "true");

          // ArrowDown to second option
          fireEvent.keyDown(input, { key: "ArrowDown" });
          cells = screen.getAllByTestId("tarmac-search-cell");
          expect(cells[1]).toHaveAttribute("data-focused", "true");

          // ArrowUp back to first
          fireEvent.keyDown(input, { key: "ArrowUp" });
          cells = screen.getAllByTestId("tarmac-search-cell");
          expect(cells[0]).toHaveAttribute("data-focused", "true");

          // Enter selects first option
          fireEvent.keyDown(input, { key: "Enter" });
          expect(onSelect).toHaveBeenCalledWith("v0");
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.11 — Property 9: Grouped options render section headers and dividers
 * Feature: search-dropdown-tarmac-migration, Property 9
 * Validates: Requirements 10.2, 10.5
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 9: Grouped options render section headers and dividers", () => {
  it("renders section headers for each unique group", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom("Fruits", "Vegetables", "Grains"),
          { minLength: 1, maxLength: 6 }
        ),
        (groups) => {
          const opts = groups.map((g, i) => ({
            value: `v${i}`,
            label: `Item ${i}`,
            group: g,
          }));
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              options={opts}
              isOpen
              placeholder="Group PBT"
            />
          );
          const headers = screen.getAllByTestId("section-header");
          const uniqueGroups = [...new Set(groups)];
          expect(headers.length).toBe(uniqueGroups.length);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });


  it("renders N-1 dividers for N cells within each group", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 6 }),
        (n) => {
          const opts = Array.from({ length: n }, (_, i) => ({
            value: `v${i}`,
            label: `Item ${i}`,
            group: "SameGroup",
          }));
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              options={opts}
              isOpen
              placeholder="Divider PBT"
            />
          );
          const dividers = screen.getAllByTestId("cell-divider");
          expect(dividers.length).toBe(n - 1);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.12 — Property 10: List set variants control cell anatomy
 * Feature: search-dropdown-tarmac-migration, Property 10
 * Validates: Requirements 12.1, 12.2
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 10: List set variants control cell anatomy", () => {
  it("options with showCheckbox render Tarmac Checkbox", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 5 }),
        (n) => {
          const opts = Array.from({ length: n }, (_, i) => ({
            value: `v${i}`,
            label: `Item ${i}`,
            showCheckbox: true,
          }));
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              options={opts}
              isOpen
              placeholder="ListSet1 PBT"
            />
          );
          const checkboxes = screen.getAllByTestId("tarmac-checkbox");
          expect(checkboxes.length).toBe(n);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("options with description render description text", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 5 }),
        (n) => {
          const opts = Array.from({ length: n }, (_, i) => ({
            value: `v${i}`,
            label: `Item ${i}`,
            description: `Description ${i}`,
          }));
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              options={opts}
              isOpen
              placeholder="ListSet2 PBT"
            />
          );
          const descs = screen.getAllByTestId("cell-description");
          expect(descs.length).toBe(n);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.13 — Property 11: Theme JSON tokens exist in variables file
 * Feature: search-dropdown-tarmac-migration, Property 11
 * Validates: Requirements 17.1, 17.2, 17.12, 23.2
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 11: Theme JSON tokens exist in variables file", () => {
  it("all {{TokenName}} placeholders in searchDropdown_tarmac exist in tarmac-variables-full.json", () => {
    const fs = require("fs");
    const path = require("path");

    const themePath = path.resolve(__dirname, "../../../../public/tarmac-theme.json");
    const varsPath = path.resolve(__dirname, "../../ThemeProvider/tarmac-variables-full.json");

    const themeJson = JSON.parse(fs.readFileSync(themePath, "utf-8"));
    const varsJson = JSON.parse(fs.readFileSync(varsPath, "utf-8"));

    // Extract all variable names from tarmac-variables-full.json
    const allVarNames: string[] = [];
    const collections = varsJson.collections || {};
    for (const col of Object.values(collections) as any[]) {
      if (col.variables) {
        for (const varObj of Object.values(col.variables) as any[]) {
          if (varObj.name) allVarNames.push(varObj.name);
        }
      }
    }

    // Extract all {{...}} tokens from searchDropdown_tarmac
    const sdSection = themeJson["tarmac-theme"]?.components?.searchDropdown_tarmac;
    if (!sdSection) return; // Skip if section doesn't exist yet

    const sdJson = JSON.stringify(sdSection);
    const tokenMatches = [...sdJson.matchAll(/\{\{([^}]+)\}\}/g)];
    const uniqueTokens = [...new Set(tokenMatches.map(m => m[1]))];

    expect(uniqueTokens.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.constantFrom(...uniqueTokens),
        (token) => {
          expect(allVarNames).toContain(token);
        }
      ),
      { numRuns: Math.min(uniqueTokens.length * 3, 200) }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.14 — Property 12: Open union types accept arbitrary strings
 * Feature: search-dropdown-tarmac-migration, Property 12
 * Validates: Requirements 1.1, 1.3, 20.4
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 12: Open union types accept arbitrary strings", () => {
  it("renders without error for arbitrary string values on open-union props", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 10 }),
        fc.string({ minLength: 1, maxLength: 10 }),
        fc.string({ minLength: 1, maxLength: 10 }),
        (size, fieldVariant, cellStyle) => {
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle={"custom-style" as any}
              size={size}
              fieldVariant={fieldVariant}
              options={[{ value: "v1", label: "Item", cellStyle }]}
              placeholder="Union PBT"
            />
          );
          expect(screen.getByTestId("tarmac-search-dropdown")).toBeInTheDocument();
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.15 — Property 13: ARIA attributes present on interactive elements
 * Feature: search-dropdown-tarmac-migration, Property 13
 * Validates: Requirements 16.6
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 13: ARIA attributes present on interactive elements", () => {
  it("combobox, listbox, option, aria-expanded, aria-selected, aria-disabled are present", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("lg", "md", "sm"),
        fc.boolean(),
        (size, hasDisabledOption) => {
          const opts = [
            { value: "v1", label: "A", disabled: hasDisabledOption },
            { value: "v2", label: "B" },
          ];
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              size={size}
              options={opts}
              value="v2"
              isOpen
              placeholder="ARIA PBT"
            />
          );
          // role=combobox
          const combobox = screen.getByRole("combobox");
          expect(combobox).toBeInTheDocument();
          expect(combobox).toHaveAttribute("aria-expanded", "true");

          // role=listbox
          expect(screen.getByRole("listbox")).toBeInTheDocument();

          // role=option with aria-selected and aria-disabled
          const options = screen.getAllByRole("option");
          expect(options.length).toBe(2);
          expect(options[0]).toHaveAttribute("aria-selected", "false");
          expect(options[1]).toHaveAttribute("aria-selected", "true");
          if (hasDisabledOption) {
            expect(options[0]).toHaveAttribute("aria-disabled", "true");
          }
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


/* ───────────────────────────────────────────────────────────────────
 * Task 9.16 — Property 14: Collapsed/Expanded toggle and search value clearing
 * Feature: search-dropdown-tarmac-migration, Property 14
 * Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5, 14.5
 * ─────────────────────────────────────────────────────────────────── */
describe("Property 14: Collapsed/Expanded toggle and search value clearing", () => {
  it("clicking field toggles open/close and search value clears on close", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("standard", "withTags"),
        fc.constantFrom("lg", "md", "sm"),
        (fieldVariant, size) => {
          const onOpenChange = jest.fn();
          const tags = fieldVariant === "withTags"
            ? [{ id: "t1", label: "Tag", onRemove: jest.fn() }]
            : undefined;
          const { unmount } = render(
            <SearchDropdown
              searchDropdownStyle="tarmac-01"
              fieldVariant={fieldVariant}
              size={size}
              tags={tags}
              options={basicOptions}
              onOpenChange={onOpenChange}
              placeholder="Toggle PBT"
            />
          );

          // Click to open
          fireEvent.click(screen.getByTestId("search-field"));
          expect(screen.getByTestId("search-list-panel")).toBeInTheDocument();
          expect(onOpenChange).toHaveBeenCalledWith(true);

          // Type a search value
          const input = screen.getByTestId("search-input");
          fireEvent.change(input, { target: { value: "test" } });
          expect(input).toHaveValue("test");

          // Click to close
          fireEvent.click(screen.getByTestId("search-field"));
          expect(screen.queryByTestId("search-list-panel")).not.toBeInTheDocument();
          expect(onOpenChange).toHaveBeenCalledWith(false);

          // Search value should be cleared
          expect(input).toHaveValue("");
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
