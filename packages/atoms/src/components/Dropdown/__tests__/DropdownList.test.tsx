import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownList from "../DropdownList";

// ─── Mock ThemeProvider ──────────────────────────────────────────────────────

function dropCellConfig() {
  return {
    styles: {
      regular: { textColor: "#2b2b2b", descriptionColor: "#6b6b6b", backgroundColor: "transparent", hoverBackgroundColor: "#f5f5f5", pressedBackgroundColor: "#ededed", disabledTextColor: "#cdcbcb", iconColor: "#2b2b2b", checkboxVariant: "Standard" },
      infoBlue: { textColor: "#1565c0", descriptionColor: "#42a5f5", backgroundColor: "transparent", hoverBackgroundColor: "#e3f2fd", pressedBackgroundColor: "#bbdefb", disabledTextColor: "#cdcbcb", iconColor: "#1565c0", checkboxVariant: "blue" },
    },
    sizes: {
      lg: { height: "48px", fontSize: "16px", lineHeight: "24px", descriptionFontSize: "12px", descriptionLineHeight: "16px", paddingVertical: "8px", paddingHorizontal: "8px", iconSize: "20px", gap: "8px" },
      md: { height: "40px", fontSize: "14px", lineHeight: "20px", descriptionFontSize: "12px", descriptionLineHeight: "16px", paddingVertical: "8px", paddingHorizontal: "8px", iconSize: "20px", gap: "8px" },
      sm: { height: "32px", fontSize: "14px", lineHeight: "20px", descriptionFontSize: "12px", descriptionLineHeight: "16px", paddingVertical: "6px", paddingHorizontal: "8px", iconSize: "20px", gap: "6px" },
    },
  };
}

jest.mock("../../ThemeProvider", () => {
  const dc = dropCellConfig();
  return {
    useTheme: () => ({
      theme: {
        components: {
          dropdown_tarmac: {
            base: { fontFamily: "Noto Sans", fontWeight: "500", radius: "4px", transition: "all 0.15s", focusRingSpread: "2px" },
            inputField: { types: { regular: {} }, sizes: { md: {} }, addon: {} },
            dropCell: dc,
            list: { backgroundColor: "#ffffff", borderColor: "#e0e0e0" },
            sectionHeader: {}, footer: {}, search: {},
            states: { disabled: {}, ghost: {} },
          },
        },
      },
    }),
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

jest.mock("../../../config/config", () => {
  const dc = dropCellConfig();
  return {
    defaultThemeConfig: {
      components: {
        dropdown_tarmac: {
          base: { fontFamily: "Noto Sans", fontWeight: "500", radius: "4px" },
          inputField: { types: { regular: {} }, sizes: { md: {} }, addon: {} },
          dropCell: dc,
          list: {}, sectionHeader: {}, footer: {}, search: {},
          states: { disabled: {}, ghost: {} },
        },
      },
    },
  };
});

jest.mock("../../Checkbox", () => {
  const MockCheckbox = (props: any) => (
    <input
      type="checkbox"
      data-testid="tarmac-checkbox"
      data-tarmac-variant={props.tarmacVariant}
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange || (() => {})}
    />
  );
  MockCheckbox.displayName = "Checkbox";
  return { __esModule: true, default: MockCheckbox };
});

jest.mock("../../Avatar", () => {
  const MockAvatar = (props: any) => (
    <div data-testid="tarmac-avatar" data-avatar-type={props.avatarType} data-is-disabled={props.isDisabled}>
      {props.children}
    </div>
  );
  MockAvatar.displayName = "Avatar";
  return { __esModule: true, default: MockAvatar };
});

jest.mock("../../Pill", () => {
  const MockPill = (props: any) => (
    <span data-testid="pill" data-variant={props.pillVariant} data-type={props.pillType}>
      {props.children}
    </span>
  );
  MockPill.displayName = "Pill";
  return { __esModule: true, default: MockPill };
});

// ─── Icon helper ─────────────────────────────────────────────────────────────

const TestIcon = () => <svg data-testid="test-icon" />;

// ═══════════════════════════════════════════════════════════════════
// DropdownList.Cell — rendering & props injection
// ═══════════════════════════════════════════════════════════════════

describe("DropdownList.Cell", () => {
  it("renders with role=option and default aria attributes", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.Content label="Item" />
      </DropdownList.Cell>
    );
    const cell = screen.getByTestId("dropdown-list-cell");
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveAttribute("role", "option");
    expect(cell).toHaveAttribute("aria-selected", "false");
  });

  it("sets aria-selected=true when isSelected", () => {
    render(
      <DropdownList.Cell isSelected>
        <DropdownList.Content label="Selected" />
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("dropdown-list-cell")).toHaveAttribute("aria-selected", "true");
  });

  it("sets aria-disabled when isDisabled", () => {
    render(
      <DropdownList.Cell isDisabled>
        <DropdownList.Content label="Disabled" />
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("dropdown-list-cell")).toHaveAttribute("aria-disabled", "true");
  });

  it("fires onClick when not disabled", () => {
    const onClick = jest.fn();
    render(
      <DropdownList.Cell onClick={onClick}>
        <DropdownList.Content label="Clickable" />
      </DropdownList.Cell>
    );
    fireEvent.click(screen.getByTestId("dropdown-list-cell"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does NOT fire onClick when disabled", () => {
    const onClick = jest.fn();
    render(
      <DropdownList.Cell isDisabled onClick={onClick}>
        <DropdownList.Content label="Disabled" />
      </DropdownList.Cell>
    );
    fireEvent.click(screen.getByTestId("dropdown-list-cell"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(
      <DropdownList.Cell className="custom-cls">
        <DropdownList.Content label="Custom" />
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("dropdown-list-cell").className).toContain("custom-cls");
  });

  it("renders all sizes without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach(size => {
      const { unmount } = render(
        <DropdownList.Cell size={size}>
          <DropdownList.Content label={`Size ${size}`} />
        </DropdownList.Cell>
      );
      expect(screen.getByText(`Size ${size}`)).toBeInTheDocument();
      unmount();
    });
  });
});


// ═══════════════════════════════════════════════════════════════════
// DropdownList.Checkbox — prop injection from Cell
// ═══════════════════════════════════════════════════════════════════

describe("DropdownList.Checkbox", () => {
  it("inherits isSelected from Cell as checked", () => {
    render(
      <DropdownList.Cell isSelected>
        <DropdownList.Checkbox />
      </DropdownList.Cell>
    );
    const checkbox = screen.getByTestId("tarmac-checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("inherits isDisabled from Cell as disabled", () => {
    render(
      <DropdownList.Cell isDisabled>
        <DropdownList.Checkbox />
      </DropdownList.Cell>
    );
    const checkbox = screen.getByTestId("tarmac-checkbox") as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it("allows explicit checked override", () => {
    render(
      <DropdownList.Cell isSelected={false}>
        <DropdownList.Checkbox checked={true} />
      </DropdownList.Cell>
    );
    const checkbox = screen.getByTestId("tarmac-checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("allows explicit disabled override", () => {
    render(
      <DropdownList.Cell isDisabled={false}>
        <DropdownList.Checkbox disabled={true} />
      </DropdownList.Cell>
    );
    const checkbox = screen.getByTestId("tarmac-checkbox") as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it("uses blue variant for infoBlue cellStyle when selected", () => {
    render(
      <DropdownList.Cell cellStyle="infoBlue" isSelected>
        <DropdownList.Checkbox />
      </DropdownList.Cell>
    );
    const checkbox = screen.getByTestId("tarmac-checkbox");
    expect(checkbox).toHaveAttribute("data-tarmac-variant", "blue");
  });

  it("uses standard variant for regular cellStyle", () => {
    render(
      <DropdownList.Cell cellStyle="regular" isSelected>
        <DropdownList.Checkbox />
      </DropdownList.Cell>
    );
    const checkbox = screen.getByTestId("tarmac-checkbox");
    expect(checkbox).toHaveAttribute("data-tarmac-variant", "standard");
  });

  it("checkbox onChange triggers Cell onToggle", () => {
    const onClick = jest.fn();
    render(
      <DropdownList.Cell onClick={onClick}>
        <DropdownList.Checkbox />
      </DropdownList.Cell>
    );
    // Simulate the checkbox onChange which internally calls _onToggle (the Cell onClick)
    const checkbox = screen.getByTestId("tarmac-checkbox") as HTMLInputElement;
    // The mock renders a native <input> — React onChange fires on click for checkboxes
    fireEvent.click(checkbox);
    // The click bubbles to the wrapper span which has stopPropagation,
    // but the onChange handler on the input still calls _onToggle
    expect(onClick).toHaveBeenCalled();
  });

  it("click on checkbox wrapper stops propagation to Cell", () => {
    const onClick = jest.fn();
    render(
      <DropdownList.Cell onClick={onClick}>
        <DropdownList.Checkbox />
      </DropdownList.Cell>
    );
    fireEvent.click(screen.getByTestId("dropdown-list-checkbox"));
    // The stopPropagation on the span should prevent Cell onClick
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════════════
// DropdownList.Avatar
// ═══════════════════════════════════════════════════════════════════

describe("DropdownList.Avatar", () => {
  it("renders avatar with initials", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.Avatar>AB</DropdownList.Avatar>
      </DropdownList.Cell>
    );
    const avatar = screen.getByTestId("tarmac-avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("data-avatar-type", "initials");
    expect(avatar).toHaveTextContent("AB");
  });

  it("renders avatar with image src", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.Avatar src="https://example.com/img.png" alt="User" />
      </DropdownList.Cell>
    );
    const avatar = screen.getByTestId("tarmac-avatar");
    expect(avatar).toHaveAttribute("data-avatar-type", "image");
  });

  it("passes isDisabled from Cell to Avatar", () => {
    render(
      <DropdownList.Cell isDisabled>
        <DropdownList.Avatar>XY</DropdownList.Avatar>
      </DropdownList.Cell>
    );
    const avatar = screen.getByTestId("tarmac-avatar");
    expect(avatar).toHaveAttribute("data-is-disabled", "true");
  });
});


// ═══════════════════════════════════════════════════════════════════
// DropdownList.Content
// ═══════════════════════════════════════════════════════════════════

describe("DropdownList.Content", () => {
  it("renders label text", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.Content label="Main Label" />
      </DropdownList.Cell>
    );
    expect(screen.getByText("Main Label")).toBeInTheDocument();
  });

  it("renders subtext when provided", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.Content label="Label" subtext="Description text" />
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("dropdown-list-subtext")).toHaveTextContent("Description text");
  });

  it("does not render subtext when not provided", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.Content label="Label only" />
      </DropdownList.Cell>
    );
    expect(screen.queryByTestId("dropdown-list-subtext")).not.toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════
// DropdownList.LeadingIcon & TrailingIcon
// ═══════════════════════════════════════════════════════════════════

describe("DropdownList.LeadingIcon", () => {
  it("renders leading icon", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.LeadingIcon><TestIcon /></DropdownList.LeadingIcon>
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("dropdown-list-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });
});

describe("DropdownList.TrailingIcon", () => {
  it("renders trailing icon", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.TrailingIcon><TestIcon /></DropdownList.TrailingIcon>
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("dropdown-list-trailing-icon")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });
});

// ═══════════════════════════════════════════════════════════════════
// DropdownList.Pills
// ═══════════════════════════════════════════════════════════════════

describe("DropdownList.Pills", () => {
  it("renders pill with label", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.Pills label="5" />
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("pill")).toHaveTextContent("5");
  });

  it("uses black variant for regular cellStyle", () => {
    render(
      <DropdownList.Cell cellStyle="regular">
        <DropdownList.Pills label="3" />
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("pill")).toHaveAttribute("data-variant", "black");
  });

  it("uses blue variant for infoBlue cellStyle", () => {
    render(
      <DropdownList.Cell cellStyle="infoBlue">
        <DropdownList.Pills label="3" />
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("pill")).toHaveAttribute("data-variant", "blue");
  });

  it("allows explicit variant override", () => {
    render(
      <DropdownList.Cell cellStyle="regular">
        <DropdownList.Pills label="3" variant="red" />
      </DropdownList.Cell>
    );
    expect(screen.getByTestId("pill")).toHaveAttribute("data-variant", "red");
  });
});

// ═══════════════════════════════════════════════════════════════════
// Full composition — all sub-components together
// ═══════════════════════════════════════════════════════════════════

describe("DropdownList — Full Composition", () => {
  it("renders all sub-components inside a Cell", () => {
    render(
      <DropdownList.Cell cellStyle="regular" size="md" isSelected>
        <DropdownList.Avatar>RP</DropdownList.Avatar>
        <DropdownList.Checkbox />
        <DropdownList.LeadingIcon><TestIcon /></DropdownList.LeadingIcon>
        <DropdownList.Content label="Full Cell" subtext="With everything" />
        <DropdownList.TrailingIcon><TestIcon /></DropdownList.TrailingIcon>
        <DropdownList.Pills label="2" />
      </DropdownList.Cell>
    );

    expect(screen.getByTestId("dropdown-list-cell")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-list-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-list-checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-list-leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-list-content")).toBeInTheDocument();
    expect(screen.getByText("Full Cell")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-list-subtext")).toHaveTextContent("With everything");
    expect(screen.getByTestId("dropdown-list-trailing-icon")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-list-pills")).toBeInTheDocument();
  });

  it("renders minimal Cell with only Content", () => {
    render(
      <DropdownList.Cell>
        <DropdownList.Content label="Minimal" />
      </DropdownList.Cell>
    );
    expect(screen.getByText("Minimal")).toBeInTheDocument();
    expect(screen.queryByTestId("dropdown-list-checkbox")).not.toBeInTheDocument();
    expect(screen.queryByTestId("dropdown-list-avatar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("dropdown-list-leading-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("dropdown-list-trailing-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("dropdown-list-pills")).not.toBeInTheDocument();
  });

  it("renders multiple cells with independent state", () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();

    render(
      <div>
        <DropdownList.Cell isSelected onClick={onClick1}>
          <DropdownList.Checkbox />
          <DropdownList.Content label="Cell 1" />
        </DropdownList.Cell>
        <DropdownList.Cell isSelected={false} onClick={onClick2}>
          <DropdownList.Checkbox />
          <DropdownList.Content label="Cell 2" />
        </DropdownList.Cell>
      </div>
    );

    const cells = screen.getAllByTestId("dropdown-list-cell");
    expect(cells[0]).toHaveAttribute("aria-selected", "true");
    expect(cells[1]).toHaveAttribute("aria-selected", "false");

    const checkboxes = screen.getAllByTestId("tarmac-checkbox") as HTMLInputElement[];
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);

    fireEvent.click(cells[0]);
    expect(onClick1).toHaveBeenCalledTimes(1);
    expect(onClick2).not.toHaveBeenCalled();

    fireEvent.click(cells[1]);
    expect(onClick2).toHaveBeenCalledTimes(1);
  });

  it("renders both cellStyle variants", () => {
    const { container } = render(
      <div>
        <DropdownList.Cell cellStyle="regular" isSelected>
          <DropdownList.Checkbox />
          <DropdownList.Content label="Regular" />
        </DropdownList.Cell>
        <DropdownList.Cell cellStyle="infoBlue" isSelected>
          <DropdownList.Checkbox />
          <DropdownList.Content label="Info Blue" />
        </DropdownList.Cell>
      </div>
    );

    const checkboxes = screen.getAllByTestId("tarmac-checkbox");
    expect(checkboxes[0]).toHaveAttribute("data-tarmac-variant", "standard");
    expect(checkboxes[1]).toHaveAttribute("data-tarmac-variant", "blue");
  });
});
