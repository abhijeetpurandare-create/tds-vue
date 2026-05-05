import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../index";

// ─── Mock ThemeProvider ──────────────────────────────────────────────────────
// Provide both legacy `input` config and Tarmac `inputField_tarmac` config
// with resolved hex values (not {{tokens}}).

const mockInputFieldConfig = {
  base: {
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: "400",
    radius: "4px",
    transition: "all 0.15s ease-in-out",
    focusRingSpread: "2px",
  },
  types: {
    regular: {
      borderColor: "#e0e0e0",
      textColor: "#2b2b2b",
      placeholderColor: "#cdcbcb",
      helperTextColor: "#6b6b6b",
      statusTextColor: "#6b6b6b",
      hoverBorderColor: "#b0b0b0",
      activeBorderColor: "#909090",
      focusRingColor: "rgba(0,0,0,0.4)",
      backgroundColor: "#ffffff",
      hoverBackgroundColor: "#ffffff",
      labelColor: "#2b2b2b",
      subtextColor: "#6b6b6b",
      addonBackgroundColor: "#f5f5f5",
      addonTextColor: "#6b6b6b",
      addonBorderColor: "#e0e0e0",
    },
    success: {
      borderColor: "#2e7d32",
      textColor: "#2b2b2b",
      placeholderColor: "#cdcbcb",
      helperTextColor: "#2e7d32",
      statusTextColor: "#2e7d32",
      hoverBorderColor: "#1b5e20",
      activeBorderColor: "#145218",
      focusRingColor: "rgba(46,125,50,0.4)",
      backgroundColor: "#ffffff",
      hoverBackgroundColor: "#ffffff",
      labelColor: "#2b2b2b",
      subtextColor: "#6b6b6b",
      addonBackgroundColor: "#f5f5f5",
      addonTextColor: "#6b6b6b",
      addonBorderColor: "#2e7d32",
    },
    infoBlue: {
      borderColor: "#1565c0",
      textColor: "#2b2b2b",
      placeholderColor: "#cdcbcb",
      helperTextColor: "#1565c0",
      statusTextColor: "#1565c0",
      hoverBorderColor: "#0d47a1",
      activeBorderColor: "#0a3880",
      focusRingColor: "rgba(21,101,192,0.4)",
      backgroundColor: "#ffffff",
      hoverBackgroundColor: "#ffffff",
      labelColor: "#2b2b2b",
      subtextColor: "#6b6b6b",
      addonBackgroundColor: "#f5f5f5",
      addonTextColor: "#6b6b6b",
      addonBorderColor: "#1565c0",
    },
    error: {
      borderColor: "#c62828",
      textColor: "#2b2b2b",
      placeholderColor: "#cdcbcb",
      helperTextColor: "#c62828",
      statusTextColor: "#c62828",
      hoverBorderColor: "#b71c1c",
      activeBorderColor: "#a01515",
      focusRingColor: "rgba(198,40,40,0.4)",
      backgroundColor: "#ffffff",
      hoverBackgroundColor: "#ffffff",
      labelColor: "#2b2b2b",
      subtextColor: "#6b6b6b",
      addonBackgroundColor: "#f5f5f5",
      addonTextColor: "#6b6b6b",
      addonBorderColor: "#c62828",
    },
  },
  sizes: {
    lg: {
      height: "48px",
      fontSize: "16px",
      lineHeight: "24px",
      paddingVertical: "12px",
      paddingHorizontal: "16px",
      iconSize: "20px",
      iconGap: "8px",
      titleFontSize: "14px",
      titleLineHeight: "20px",
      helperFontSize: "12px",
      helperLineHeight: "16px",
      titleIconSize: "16px",
      containerGap: "4px",
    },
    md: {
      height: "40px",
      fontSize: "14px",
      lineHeight: "20px",
      paddingVertical: "8px",
      paddingHorizontal: "12px",
      iconSize: "16px",
      iconGap: "8px",
      titleFontSize: "12px",
      titleLineHeight: "16px",
      helperFontSize: "12px",
      helperLineHeight: "16px",
      titleIconSize: "14px",
      containerGap: "4px",
    },
    sm: {
      height: "32px",
      fontSize: "12px",
      lineHeight: "16px",
      paddingVertical: "6px",
      paddingHorizontal: "8px",
      iconSize: "12px",
      iconGap: "6px",
      titleFontSize: "10px",
      titleLineHeight: "14px",
      helperFontSize: "10px",
      helperLineHeight: "14px",
      titleIconSize: "12px",
      containerGap: "2px",
    },
  },
  states: {
    disabled: {
      backgroundColor: "#f5f5f5",
      borderColor: "#ededed",
      textColor: "#cdcbcb",
      labelColor: "#cdcbcb",
      placeholderColor: "#cdcbcb",
      cursor: "default",
    },
    ghost: {
      backgroundColor: "#dedede",
      borderColor: "transparent",
      textColor: "transparent",
      labelColor: "transparent",
      cursor: "default",
      pointerEvents: "none",
    },
  },
};

const mockLegacyInputConfig = {
  base: {
    fontFamily: "inherit",
    fontWeight: "400",
    transition: "all 0.2s ease-in-out",
    focus: {
      outline: "2px solid transparent",
      ring: "0 0 0 2px rgba(59, 130, 246, 0.5)",
    },
    radius: { default: "0.5rem", sharp: "0", rounded: "9999px" },
  },
  label: { color: "#1E1A1A", fontWeight: "500", fontSize: "0.875rem" },
  helperText: { fontWeight: "400", fontSize: "0.75rem" },
  addOnBefore: {
    backgroundColor: "#FAF7F7",
    padding: "8px 12px",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sizes: {
    xs: { padding: "0.25rem 0.375rem", fontSize: "0.75rem", height: "auto" },
    sm: { padding: "0.375rem 0.5rem", fontSize: "0.875rem", height: "auto" },
    md: { padding: "0.5rem 0.75rem", fontSize: "1rem", height: "auto" },
    lg: { padding: "0.75rem 1rem", fontSize: "1.125rem", height: "auto" },
    xl: { padding: "1rem 1.25rem", fontSize: "1.25rem", height: "auto" },
  },
  variants: {
    filled: {
      backgroundColor: "#f3f4f6",
      borderColor: "#E5E3E3",
      textColor: "#1E1A1A",
      placeholderColor: "#9CA3AF",
      focusBorderColor: "black",
    },
    outlined: {
      backgroundColor: "transparent",
      borderColor: "#E5E3E3",
      textColor: "#1E1A1A",
      placeholderColor: "#9CA3AF",
      focusBorderColor: "black",
    },
    borderless: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#1E1A1A",
      placeholderColor: "#9CA3AF",
      focusBorderColor: "transparent",
      border: "none",
    },
    underlined: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#1E1A1A",
      placeholderColor: "#9CA3AF",
      focusBorderColor: "black",
      borderBottom: "1px solid",
    },
  },
  states: {
    default: {
      backgroundColor: "#FFFFFF",
      borderColor: "#E5E3E3",
      textColor: "#1E1A1A",
      shadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",
    },
    error: {
      backgroundColor: "#FFFFFF",
      borderColor: "#EF4444",
      textColor: "#991B1B",
      shadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",
    },
    success: {
      backgroundColor: "#FFFFFF",
      borderColor: "#22C55E",
      textColor: "#065F46",
      shadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",
    },
    warning: {
      backgroundColor: "#FFFFFF",
      borderColor: "#F59E0B",
      textColor: "#92400E",
      shadow: "0px 0px 0px 4px rgba(245, 158, 11, 0.10)",
    },
  },
};

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: {
      components: {
        input: mockLegacyInputConfig,
        inputField_tarmac: mockInputFieldConfig,
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));


/* ═══════════════════════════════════════════════════════════════════
 * LEGACY INPUT — backward compatibility tests
 * These verify the existing Input API works identically after the
 * Tarmac code was added. No inputStyle = legacy path.
 * ═══════════════════════════════════════════════════════════════════ */
describe("Input — Legacy (backward compatibility)", () => {
  // --- 1. Default render ---
  it("renders with default props", () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    expect(input).toBeInTheDocument();
    expect(input.tagName.toLowerCase()).toBe("input");
  });

  // --- 2–5. All legacy variants ---
  it("renders variant=outlined", () => {
    const { container } = render(<Input variant="outlined" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders variant=borderless", () => {
    render(<Input variant="borderless" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
  });

  it("renders variant=filled", () => {
    render(<Input variant="filled" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
  });

  it("renders variant=underlined", () => {
    render(<Input variant="underlined" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
  });

  // --- 6–10. All legacy sizes ---
  it("renders size=xs", () => {
    render(<Input size="xs" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
  });

  it("renders size=sm", () => {
    render(<Input size="sm" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
  });

  it("renders size=md", () => {
    render(<Input size="md" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
  });

  it("renders size=lg", () => {
    render(<Input size="lg" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
  });

  it("renders size=xl", () => {
    render(<Input size="xl" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
  });

  // --- 11. addonBefore / addonAfter ---
  it("renders with addonBefore and addonAfter", () => {
    render(<Input addonBefore="https://" addonAfter=".com" placeholder="domain" />);
    expect(screen.getByText("https://")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
  });

  // --- 12. prefixIcon / suffixIcon ---
  it("renders with prefixIcon and suffixIcon", () => {
    render(
      <Input
        prefixIcon={<span data-testid="prefix">P</span>}
        suffixIcon={<span data-testid="suffix">S</span>}
        placeholder="icons"
      />
    );
    expect(screen.getByTestId("prefix")).toBeInTheDocument();
    expect(screen.getByTestId("suffix")).toBeInTheDocument();
  });

  // --- 13. allowClear ---
  it("handles allowClear functionality", async () => {
    const handleClear = jest.fn();
    render(<Input allowClear onClear={handleClear} placeholder="clear" value="text" onChange={() => {}} />);
    const clearBtn = screen.getByText("×");
    await userEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  // --- 14. isPassword ---
  it("renders password field with isPassword", () => {
    const { container } = render(<Input isPassword status="error" placeholder="pwd" />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "password");
  });

  // --- 15. showCount / count ---
  it("shows character count when showCount and count are set", () => {
    render(<Input showCount count={50} value="Hello" placeholder="count" />);
    expect(screen.getByText("5/50")).toBeInTheDocument();
  });

  // --- 16. label and helperText ---
  it("renders label and helperText", () => {
    render(<Input label="Email" helperText="Enter email" placeholder="email" required />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("Enter email")).toBeInTheDocument();
  });

  // --- 17. disabled ---
  it("handles disabled state", () => {
    render(<Input disabled placeholder="disabled" />);
    expect(screen.getByPlaceholderText("disabled")).toBeDisabled();
  });

  // --- 18. status variants ---
  it("renders all status variants without error", () => {
    const statuses = ["error", "warning", "success", "default"] as const;
    statuses.forEach((s) => {
      const { unmount } = render(<Input status={s} placeholder={`status-${s}`} />);
      expect(screen.getByPlaceholderText(`status-${s}`)).toBeInTheDocument();
      unmount();
    });
  });

  // --- 19. multiline ---
  it("renders as textarea when multiline is true", () => {
    render(<Input multiline rows={3} placeholder="multi" />);
    const textarea = screen.getByPlaceholderText("multi");
    expect(textarea.tagName.toLowerCase()).toBe("textarea");
  });

  // --- 20. isMobileNumberField ---
  it("renders mobile number field with country code", () => {
    render(<Input isMobileNumberField placeholder="phone" />);
    expect(screen.getByPlaceholderText("phone")).toBeInTheDocument();
    // Country code addon should be rendered
    expect(screen.getByText("+91")).toBeInTheDocument();
  });

  // --- 21. ref forwarding ---
  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="ref-test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe("ref-test");
  });

  // --- 22. controlled value ---
  it("handles controlled value", () => {
    const { rerender } = render(<Input value="hello" placeholder="ctrl" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("ctrl")).toHaveValue("hello");
    rerender(<Input value="world" placeholder="ctrl" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("ctrl")).toHaveValue("world");
  });

  // --- 23. uncontrolled value ---
  it("handles uncontrolled value changes", async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="unctrl" />);
    const input = screen.getByPlaceholderText("unctrl");
    await userEvent.type(input, "abc");
    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(input).toHaveValue("abc");
  });

  // --- 24. onPressEnter ---
  it("fires onPressEnter callback", () => {
    const handleEnter = jest.fn();
    render(<Input onPressEnter={handleEnter} placeholder="enter" />);
    fireEvent.keyDown(screen.getByPlaceholderText("enter"), { key: "Enter" });
    expect(handleEnter).toHaveBeenCalledTimes(1);
  });

  // --- 25. onClear ---
  it("fires onClear callback", async () => {
    const handleClear = jest.fn();
    render(<Input allowClear onClear={handleClear} value="x" onChange={() => {}} placeholder="clr" />);
    await userEvent.click(screen.getByText("×"));
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  // --- 26. Tarmac-only props ignored ---
  it("ignores Tarmac-only props when inputStyle is not set", () => {
    const { container } = render(
      <Input
        placeholder="legacy"
        titleIcon={<span data-testid="title-icon">TI</span>}
        badge={<span data-testid="badge">B</span>}
        statusIndicator="success"
        helperTextTop="top helper"
        inputType="error"
        inputSize="lg"
        styleVariant="addonLeft"
        statusText="status"
        subtext="sub"
        isMandatory
      />
    );
    expect(screen.getByPlaceholderText("legacy")).toBeInTheDocument();
    // Tarmac-specific elements should NOT be rendered
    expect(screen.queryByTestId("title-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
    expect(screen.queryByText("top helper")).not.toBeInTheDocument();
    expect(screen.queryByText("status")).not.toBeInTheDocument();
    expect(screen.queryByText("sub")).not.toBeInTheDocument();
    // Legacy path renders a <section> wrapper
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});


/* ═══════════════════════════════════════════════════════════════════
 * TARMAC TDS INPUT — new Tarmac rendering path tests
 * ═══════════════════════════════════════════════════════════════════ */
describe("Input — Tarmac TDS", () => {
  // --- 1. Discriminator rendering ---
  it("renders Tarmac path when inputStyle is set", () => {
    const { container } = render(
      <Input inputStyle="tarmac-01" placeholder="tarmac" />
    );
    expect(screen.getByPlaceholderText("tarmac")).toBeInTheDocument();
    // Tarmac path does NOT render a <section> (legacy does)
    expect(container.querySelector("section")).not.toBeInTheDocument();
    // Tarmac path renders an <input> inside a div-based structure
    expect(container.querySelector("input")).toBeInTheDocument();
  });

  // --- 2–5. Each type variant ---
  it("renders type=regular", () => {
    render(<Input inputStyle="tarmac-01" inputType="regular" placeholder="regular" />);
    expect(screen.getByPlaceholderText("regular")).toBeInTheDocument();
  });

  it("renders type=success", () => {
    render(<Input inputStyle="tarmac-01" inputType="success" placeholder="success" />);
    expect(screen.getByPlaceholderText("success")).toBeInTheDocument();
  });

  it("renders type=infoBlue", () => {
    render(<Input inputStyle="tarmac-01" inputType="infoBlue" placeholder="info" />);
    expect(screen.getByPlaceholderText("info")).toBeInTheDocument();
  });

  it("renders type=error", () => {
    render(<Input inputStyle="tarmac-01" inputType="error" placeholder="error" />);
    expect(screen.getByPlaceholderText("error")).toBeInTheDocument();
  });

  // --- 6–8. Each size variant ---
  it("renders size=lg", () => {
    render(<Input inputStyle="tarmac-01" inputSize="lg" placeholder="lg" />);
    expect(screen.getByPlaceholderText("lg")).toBeInTheDocument();
  });

  it("renders size=md", () => {
    render(<Input inputStyle="tarmac-01" inputSize="md" placeholder="md" />);
    expect(screen.getByPlaceholderText("md")).toBeInTheDocument();
  });

  it("renders size=sm", () => {
    render(<Input inputStyle="tarmac-01" inputSize="sm" placeholder="sm" />);
    expect(screen.getByPlaceholderText("sm")).toBeInTheDocument();
  });

  // --- 9–11. Each style variant ---
  it("renders styleVariant=standard (no addon)", () => {
    const { container } = render(
      <Input inputStyle="tarmac-01" styleVariant="standard" placeholder="std" />
    );
    expect(screen.getByPlaceholderText("std")).toBeInTheDocument();
    // No addon text should be rendered
    expect(container.textContent).not.toContain("Http://");
  });

  it("renders styleVariant=addonLeft with addonText", () => {
    render(
      <Input inputStyle="tarmac-01" styleVariant="addonLeft" addonText="Http://" placeholder="addon-l" />
    );
    expect(screen.getByPlaceholderText("addon-l")).toBeInTheDocument();
    expect(screen.getByText("Http://")).toBeInTheDocument();
  });

  it("renders styleVariant=addonRight with addonText", () => {
    render(
      <Input inputStyle="tarmac-01" styleVariant="addonRight" addonText=".com" placeholder="addon-r" />
    );
    expect(screen.getByPlaceholderText("addon-r")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
  });

  // --- 12. label toggle ---
  it("renders label when provided", () => {
    render(<Input inputStyle="tarmac-01" label="Username" placeholder="lbl" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  // --- 13. titleIcon toggle ---
  it("renders titleIcon when provided with label", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        label="Field"
        titleIcon={<span data-testid="t-icon">🔍</span>}
        placeholder="ti"
      />
    );
    expect(screen.getByTestId("t-icon")).toBeInTheDocument();
  });

  // --- 14. leadingIcon toggle ---
  it("renders leadingIcon", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        leadingIcon={<span data-testid="lead">L</span>}
        placeholder="lead"
      />
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
  });

  // --- 15. trailingIcon toggle ---
  it("renders trailingIcon", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        trailingIcon={<span data-testid="trail">T</span>}
        placeholder="trail"
      />
    );
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  // --- 16. helperTextTop toggle ---
  it("renders helperTextTop", () => {
    render(<Input inputStyle="tarmac-01" helperTextTop="Top help" placeholder="htt" />);
    expect(screen.getByText("Top help")).toBeInTheDocument();
  });

  // --- 17. helperTextBottom toggle ---
  it("renders helperTextBottom", () => {
    render(<Input inputStyle="tarmac-01" helperTextBottom="Bottom help" placeholder="htb" />);
    expect(screen.getByText("Bottom help")).toBeInTheDocument();
  });

  // --- 18. disabled state ---
  it("renders disabled state with native disabled attribute", () => {
    render(<Input inputStyle="tarmac-01" isDisabled placeholder="dis" />);
    expect(screen.getByPlaceholderText("dis")).toBeDisabled();
  });

  // --- 19. ghost state (skeleton layout) ---
  it("renders ghost state without error", () => {
    const { container } = render(
      <Input inputStyle="tarmac-01" isGhost placeholder="ghost" />
    );
    // Ghost state renders as skeleton blocks — no input element
    const outerDiv = container.firstElementChild as HTMLElement;
    expect(outerDiv).toBeInTheDocument();
    // The Emotion CSS class should be present
    expect(outerDiv.className).toContain("css-");
    // Should NOT render an input element (skeleton mode)
    expect(container.querySelector("input")).toBeNull();
  });

  // --- 20. Exhaustive combo test: Type × Style × Size ---
  it("renders all Type × Style × Size combinations without error", () => {
    const types = ["regular", "success", "infoBlue", "error"] as const;
    const styles = ["standard", "addonLeft", "addonRight"] as const;
    const sizes = ["lg", "md", "sm"] as const;

    types.forEach((t) =>
      styles.forEach((s) =>
        sizes.forEach((sz) => {
          const ph = `combo-${t}-${s}-${sz}`;
          const { unmount } = render(
            <Input
              inputStyle="tarmac-01"
              inputType={t}
              styleVariant={s}
              inputSize={sz}
              addonText="Add"
              placeholder={ph}
            />
          );
          expect(screen.getByPlaceholderText(ph)).toBeInTheDocument();
          unmount();
        })
      )
    );
  });

  // --- 21. leadingIcon precedence over prefixIcon ---
  it("leadingIcon takes precedence over prefixIcon", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        leadingIcon={<span data-testid="leading">L</span>}
        prefixIcon={<span data-testid="prefix">P</span>}
        placeholder="prec-l"
      />
    );
    expect(screen.getByTestId("leading")).toBeInTheDocument();
    expect(screen.queryByTestId("prefix")).not.toBeInTheDocument();
  });

  // --- 22. trailingIcon precedence over suffixIcon ---
  it("trailingIcon takes precedence over suffixIcon", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        trailingIcon={<span data-testid="trailing">T</span>}
        suffixIcon={<span data-testid="suffix">S</span>}
        placeholder="prec-t"
      />
    );
    expect(screen.getByTestId("trailing")).toBeInTheDocument();
    expect(screen.queryByTestId("suffix")).not.toBeInTheDocument();
  });

  // --- 23. prefixIcon falls back when leadingIcon absent ---
  it("falls back to prefixIcon when leadingIcon is not provided", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        prefixIcon={<span data-testid="prefix-fb">P</span>}
        placeholder="fb-prefix"
      />
    );
    expect(screen.getByTestId("prefix-fb")).toBeInTheDocument();
  });

  // --- 24. helperText maps to helperTextBottom ---
  it("maps legacy helperText to helperTextBottom on Tarmac path", () => {
    render(<Input inputStyle="tarmac-01" helperText="Legacy helper" placeholder="ht-map" />);
    expect(screen.getByText("Legacy helper")).toBeInTheDocument();
  });

  // --- 25. Title container not rendered when no label/subtext ---
  it("does not render title container when no label or subtext", () => {
    const { container } = render(
      <Input inputStyle="tarmac-01" placeholder="no-title" />
    );
    // No <label> element should exist
    expect(container.querySelector("label")).not.toBeInTheDocument();
  });

  // --- 26. Subtext container not rendered when no statusText/helperTextBottom ---
  it("does not render subtext container when no statusText or helperTextBottom", () => {
    const { container } = render(
      <Input inputStyle="tarmac-01" placeholder="no-sub" />
    );
    // The component should only have: outer container > (input row)
    // No subtext container with status indicator
    const allSpans = container.querySelectorAll("span");
    // No status indicator dots
    allSpans.forEach((span) => {
      expect(span.style.borderRadius).not.toBe("50%");
    });
  });

  // --- 27. Badge rendering ---
  it("renders Badge via badge prop when label is present", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        label="With Badge"
        badge={<span data-testid="badge-el">Badge</span>}
        placeholder="badge"
      />
    );
    expect(screen.getByTestId("badge-el")).toBeInTheDocument();
  });

  // --- 28. Badge renders inside input container even without label ---
  it("renders badge inside input container even when label is absent", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        badge={<span data-testid="badge-no">Badge</span>}
        placeholder="no-badge"
      />
    );
    // Figma: badge is inside the input container, not the title row
    expect(screen.getByTestId("badge-no")).toBeInTheDocument();
  });

  // --- 29–31. StatusIndicator rendering for each type ---
  it("renders status indicator for success", () => {
    const { container } = render(
      <Input
        inputStyle="tarmac-01"
        statusIndicator="success"
        statusText="All good"
        placeholder="si-s"
      />
    );
    expect(screen.getByText("All good")).toBeInTheDocument();
    // Status indicator dot should be present
    const dot = container.querySelector("span[class]");
    expect(dot).toBeInTheDocument();
  });

  it("renders status indicator for failed", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        statusIndicator="failed"
        statusText="Error occurred"
        placeholder="si-f"
      />
    );
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  it("renders status indicator for information", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        statusIndicator="information"
        helperTextBottom="Info text"
        placeholder="si-i"
      />
    );
    expect(screen.getByText("Info text")).toBeInTheDocument();
  });

  // --- 32. Mandatory asterisk ---
  it("renders mandatory asterisk with isMandatory + label", () => {
    render(
      <Input inputStyle="tarmac-01" label="Required Field" isMandatory placeholder="mand" />
    );
    expect(screen.getByText("Required Field")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  // --- 33. Mandatory asterisk not rendered without label ---
  it("does not render mandatory asterisk without label", () => {
    const { container } = render(
      <Input inputStyle="tarmac-01" isMandatory placeholder="no-mand" />
    );
    expect(container.textContent).not.toContain("*");
  });

  // --- 34. ref forwarding on Tarmac path ---
  it("forwards ref correctly on Tarmac path", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input inputStyle="tarmac-01" ref={ref} placeholder="tarmac-ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe("tarmac-ref");
  });

  // --- 35. defaultThemeConfig fallback ---
  it("renders without error when theme config is missing (uses defaultThemeConfig)", () => {
    // The mock always provides the config, but we can test with an unknown inputType
    // to verify graceful fallback to empty config
    render(
      <Input inputStyle="tarmac-01" inputType={"unknownType" as any} placeholder="fallback" />
    );
    expect(screen.getByPlaceholderText("fallback")).toBeInTheDocument();
  });

  // --- 36. subtext rendering ---
  it("renders subtext in title container", () => {
    render(
      <Input inputStyle="tarmac-01" label="Title" subtext="Subtitle text" placeholder="sub" />
    );
    expect(screen.getByText("Subtitle text")).toBeInTheDocument();
  });

  // --- 37. statusText rendering ---
  it("renders statusText in subtext container", () => {
    render(
      <Input inputStyle="tarmac-01" statusText="Validated" placeholder="st" />
    );
    expect(screen.getByText("Validated")).toBeInTheDocument();
  });

  // --- 38. All boolean toggles combined ---
  it("renders with all boolean toggles enabled simultaneously", () => {
    render(
      <Input
        inputStyle="tarmac-01"
        label="Full"
        titleIcon={<span data-testid="all-ti">TI</span>}
        leadingIcon={<span data-testid="all-li">LI</span>}
        trailingIcon={<span data-testid="all-tri">TRI</span>}
        helperTextTop="Top"
        helperTextBottom="Bottom"
        badge={<span data-testid="all-badge">B</span>}
        statusIndicator="success"
        statusText="OK"
        subtext="Sub"
        isMandatory
        placeholder="all-toggles"
      />
    );
    expect(screen.getByText("Full")).toBeInTheDocument();
    expect(screen.getByTestId("all-ti")).toBeInTheDocument();
    expect(screen.getByTestId("all-li")).toBeInTheDocument();
    expect(screen.getByTestId("all-tri")).toBeInTheDocument();
    expect(screen.getByText("Top")).toBeInTheDocument();
    expect(screen.getByText("Bottom")).toBeInTheDocument();
    expect(screen.getByTestId("all-badge")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
    expect(screen.getByText("Sub")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
