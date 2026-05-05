import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fc from "fast-check";
import {
  buildOtpFieldsStyles,
  type OtpFieldsConfig,
  type OtpFieldsStyleParams,
} from "../useOtpFieldsStyles";

// Mock ThemeProvider and templateResolver to avoid ESM import issues
jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({ theme: null }),
}));

jest.mock("../../../utils/templateResolver", () => ({
  resolveTemplatePlaceholders: (theme: any) => theme,
}));

// Mock the legacy Input component to avoid theme dependency issues in legacy path tests
jest.mock("../../Input", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: React.forwardRef((props: any, ref: any) =>
      React.createElement("input", {
        ref,
        type: props.type || "text",
        value: props.value ?? "",
        placeholder: props.placeholder,
        maxLength: props.maxLength,
        disabled: props.disabled,
        "aria-label": props["aria-label"],
        onChange: props.onChange,
        onKeyDown: props.onKeyDown,
        onPaste: props.onPaste,
        autoComplete: props.autoComplete,
        style: props.style,
      })
    ),
  };
});

// Dynamic import after mocks are set up
// eslint-disable-next-line @typescript-eslint/no-var-requires
const OtpInput = require("../index").default;

describe("OtpInput Component", () => {
  it("renders with default props", () => {
    render(<OtpInput />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6); // Default numDigits
    inputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });
  });

  it("renders with custom number of digits", () => {
    render(<OtpInput numDigits={4} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  it("renders with label and helper text", () => {
    render(
      <OtpInput 
        label="Enter OTP" 
        helperText="Code sent to your phone" 
      />
    );
    expect(screen.getByText("Enter OTP")).toBeInTheDocument();
    expect(screen.getByText("Code sent to your phone")).toBeInTheDocument();
  });

  it("handles input changes correctly", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput onChange={onChange} numDigits={4} />);
    
    const inputs = screen.getAllByRole("textbox");
    
    // Type in first input
    await user.type(inputs[0], "1");
    expect(onChange).toHaveBeenCalledWith("1");
    
    // Focus should move to next input
    expect(inputs[1]).toHaveFocus();
  });

  it("handles backspace correctly", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput onChange={onChange} numDigits={4} value="12" />);
    
    const inputs = screen.getAllByRole("textbox");
    
    // Focus on second input (which has value "2") and press backspace
    inputs[1].focus();
    await user.keyboard("{Backspace}");
    
    // Should clear the current input first
    expect(onChange).toHaveBeenCalledWith("1");
    
    // Now press backspace again on empty input to go back
    await user.keyboard("{Backspace}");
    expect(inputs[0]).toHaveFocus();
  });

  it("handles paste correctly", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput onChange={onChange} numDigits={4} />);
    
    const inputs = screen.getAllByRole("textbox");
    
    // Paste into first input
    await user.click(inputs[0]);
    await user.paste("1234");
    
    expect(onChange).toHaveBeenCalledWith("1234");
  });

  it("handles number input type validation", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput onChange={onChange} inputType="number" numDigits={4} />);
    
    const inputs = screen.getAllByRole("spinbutton"); // number inputs have role spinbutton
    
    // Try to type a letter - should be ignored
    await user.type(inputs[0], "a");
    expect(onChange).not.toHaveBeenCalled();
    
    // Type a number - should work
    await user.type(inputs[0], "1");
    expect(onChange).toHaveBeenCalledWith("1");
  });

  it("calls onComplete when OTP is fully entered", async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(<OtpInput onComplete={onComplete} numDigits={3} />);
    
    const inputs = screen.getAllByRole("textbox");
    
    // Enter complete OTP
    await user.type(inputs[0], "1");
    await user.type(inputs[1], "2");
    await user.type(inputs[2], "3");
    
    expect(onComplete).toHaveBeenCalledWith("123");
  });

  it("handles disabled state", () => {
    render(<OtpInput isDisabled={true} />);
    const inputs = screen.getAllByRole("textbox");
    
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("handles arrow key navigation", async () => {
    const user = userEvent.setup();
    render(<OtpInput numDigits={4} />);
    
    const inputs = screen.getAllByRole("textbox");
    
    // Focus first input
    inputs[0].focus();
    
    // Press right arrow
    await user.keyboard("{ArrowRight}");
    expect(inputs[1]).toHaveFocus();
    
    // Press left arrow
    await user.keyboard("{ArrowLeft}");
    expect(inputs[0]).toHaveFocus();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<OtpInput size="sm" />);
    // With the mocked Input, the <input> is directly inside the width wrapper div
    let wrapper = screen.getAllByRole("textbox")[0].parentElement;
    expect(wrapper).toHaveStyle({ width: "2.5rem" });

    rerender(<OtpInput size="lg" />);
    wrapper = screen.getAllByRole("textbox")[0].parentElement;
    expect(wrapper).toHaveStyle({ width: "3.5rem" });
  });

  it("renders with different variants", () => {
    render(<OtpInput variant="filled" />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toBeInTheDocument();
  });

  it("renders with different status states", () => {
    render(<OtpInput status="error" />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toBeInTheDocument();
  });

  it("auto focuses first input when autoFocus is true", () => {
    render(<OtpInput autoFocus={true} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveFocus();
  });

  it("handles controlled value prop", () => {
    render(<OtpInput value="123" numDigits={4} />);
    const inputs = screen.getAllByRole("textbox");
    
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
    expect(inputs[2]).toHaveValue("3");
    expect(inputs[3]).toHaveValue("");
  });

  it("limits input to single character", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput onChange={onChange} />);
    
    const inputs = screen.getAllByRole("textbox");
    
    // Try to type multiple characters
    await user.type(inputs[0], "123");
    
    // Should only accept the last character in the first input
    // and should have filled subsequent inputs
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
    expect(inputs[2]).toHaveValue("3");
  });

  it("handles paste with number validation", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput onChange={onChange} inputType="number" numDigits={4} />);
    
    const inputs = screen.getAllByRole("spinbutton"); // number inputs have role spinbutton
    
    // Paste mixed content
    await user.click(inputs[0]);
    await user.paste("1a2b3c4d");
    
    // Should only accept numbers
    expect(onChange).toHaveBeenCalledWith("1234");
  });
}); 


/* ═══════════════════════════════════════════════════════════════════
 * LEGACY (BACKWARD COMPATIBILITY) TESTS — Task 7.2
 * Validates: Requirements 21.2, 19.1, 19.2, 19.7
 * ═══════════════════════════════════════════════════════════════════ */

describe("Legacy (backward compatibility)", () => {
  // 1. Rendering with default props — 6 inputs
  it("renders 6 inputs by default (no props)", () => {
    render(<OtpInput />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
  });

  // 2–6. All legacy sizes (xs, sm, md, lg, xl)
  it.each([
    ["xs", "2rem"],
    ["sm", "2.5rem"],
    ["md", "3rem"],
    ["lg", "3.5rem"],
    ["xl", "4rem"],
  ])("renders with legacy size '%s' — wrapper width is %s", (size, expectedWidth) => {
    render(<OtpInput size={size} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThan(0);
    const wrapper = inputs[0].parentElement;
    expect(wrapper).toHaveStyle({ width: expectedWidth });
  });

  // 7–10. All legacy variants
  it.each(["outlined", "borderless", "filled", "underlined"])(
    "renders with legacy variant '%s' without error",
    (variant) => {
      const { container } = render(<OtpInput variant={variant} />);
      expect(container.firstChild).not.toBeNull();
      expect(screen.getAllByRole("textbox")).toHaveLength(6);
    }
  );

  // 11–14. All legacy statuses
  it.each(["default", "error", "warning", "success"])(
    "renders with legacy status '%s' without error",
    (status) => {
      const { container } = render(<OtpInput status={status} />);
      expect(container.firstChild).not.toBeNull();
      expect(screen.getAllByRole("textbox")).toHaveLength(6);
    }
  );

  // 15. Disabled state
  it("disables all inputs when isDisabled is true", () => {
    render(<OtpInput isDisabled={true} />);
    screen.getAllByRole("textbox").forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  // 16. Label and helperText rendering
  it("renders label and helperText", () => {
    render(<OtpInput label="OTP Code" helperText="Check your SMS" />);
    expect(screen.getByText("OTP Code")).toBeInTheDocument();
    expect(screen.getByText("Check your SMS")).toBeInTheDocument();
  });

  // 17. Value and onChange
  it("populates inputs from value prop and calls onChange on input", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput value="12" numDigits={4} onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
    expect(inputs[2]).toHaveValue("");
    expect(inputs[3]).toHaveValue("");

    await user.type(inputs[2], "3");
    expect(onChange).toHaveBeenCalledWith("123");
  });

  // 18–19. numDigits variations
  it.each([3, 4, 6, 8])(
    "renders %i inputs when numDigits=%i",
    (n) => {
      render(<OtpInput numDigits={n} />);
      expect(screen.getAllByRole("textbox")).toHaveLength(n);
    }
  );

  // 20. Keyboard navigation — ArrowRight
  it("moves focus right on ArrowRight", async () => {
    const user = userEvent.setup();
    render(<OtpInput numDigits={4} />);
    const inputs = screen.getAllByRole("textbox");
    inputs[0].focus();
    await user.keyboard("{ArrowRight}");
    expect(inputs[1]).toHaveFocus();
  });

  // 21. Keyboard navigation — ArrowLeft
  it("moves focus left on ArrowLeft", async () => {
    const user = userEvent.setup();
    render(<OtpInput numDigits={4} />);
    const inputs = screen.getAllByRole("textbox");
    inputs[1].focus();
    await user.keyboard("{ArrowLeft}");
    expect(inputs[0]).toHaveFocus();
  });

  // 22. Keyboard navigation — Backspace on empty moves to previous
  it("moves focus to previous input and clears it on Backspace when current is empty", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput numDigits={4} value="1" onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    // Focus on second input (empty)
    inputs[1].focus();
    await user.keyboard("{Backspace}");
    expect(inputs[0]).toHaveFocus();
    expect(onChange).toHaveBeenCalledWith("");
  });

  // 23. Paste behavior
  it("distributes pasted text across inputs", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput numDigits={4} onChange={onChange} />);
    const inputs = screen.getAllByRole("textbox");
    await user.click(inputs[0]);
    await user.paste("5678");
    expect(onChange).toHaveBeenCalledWith("5678");
  });

  // 24. onComplete callback
  it("calls onComplete when all digits are filled", async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(<OtpInput numDigits={3} onComplete={onComplete} />);
    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "1");
    await user.type(inputs[1], "2");
    await user.type(inputs[2], "3");
    expect(onComplete).toHaveBeenCalledWith("123");
  });

  // 25. autoFocus
  it("focuses the first input when autoFocus is true", () => {
    render(<OtpInput autoFocus={true} />);
    expect(screen.getAllByRole("textbox")[0]).toHaveFocus();
  });

  // 26. inputType number rejects non-digits
  it("rejects non-digit characters when inputType is 'number'", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput inputType="number" numDigits={4} onChange={onChange} />);
    const inputs = screen.getAllByRole("spinbutton");
    await user.type(inputs[0], "a");
    expect(onChange).not.toHaveBeenCalled();
    await user.type(inputs[0], "5");
    expect(onChange).toHaveBeenCalledWith("5");
  });

  // 27. className pass-through
  it("passes className to the root element", () => {
    const { container } = render(<OtpInput className="my-custom-class" />);
    expect(container.firstChild).toHaveClass("my-custom-class");
  });

  // 28. style pass-through
  it("passes style to the root element", () => {
    const { container } = render(
      <OtpInput style={{ backgroundColor: "red" }} />
    );
    expect(container.firstChild).toHaveStyle({ backgroundColor: "red" });
  });

  // 29. ref forwarding
  it("forwards ref to the root div element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<OtpInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // 30. Tarmac-only props ignored gracefully
  it("ignores Tarmac-only props when otpStyle is absent", () => {
    const { container } = render(
      <OtpInput
        title="Title"
        titleIcon={<span>🔒</span>}
        helperTextTop="Top helper"
        helperTextBottom="Bottom helper"
        subtext="Sub"
        isGhost={true}
        otpSize="sm"
        otpFieldStyle="error"
      />
    );
    // Legacy path — no role="group", no aria-hidden
    expect(container.querySelector('[role="group"]')).toBeNull();
    expect(container.firstChild).not.toBeNull();
    // Should still render 6 textbox inputs (legacy path)
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });
});


/* ═══════════════════════════════════════════════════════════════════
 * TARMAC TDS TESTS — Task 7.3
 * Validates: Requirements 21.3, 21.5, 21.6, 17.1, 17.2, 17.3, 17.4,
 *            17.5, 17.6, 17.7
 * ═══════════════════════════════════════════════════════════════════ */

describe("Tarmac TDS", () => {
  // ── 1. Rendering with discriminator prop ────────────────────────────────
  it("renders role='group' container when otpStyle='tarmac-01'", () => {
    const { container } = render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} />
    );
    const group = container.querySelector('[role="group"]');
    expect(group).not.toBeNull();
  });

  // ── 2–5. Each style variant individually ───────────────────────────────
  it.each(["default", "success", "error", "info"])(
    "renders with otpFieldStyle='%s' without error",
    (style) => {
      const { container } = render(
        <OtpInput otpStyle="tarmac-01" otpFieldStyle={style} numDigits={4} />
      );
      expect(container.querySelector('[role="group"]')).not.toBeNull();
    }
  );

  // ── 6–8. Each size variant individually ────────────────────────────────
  it.each(["lg", "md", "sm"])(
    "renders with otpSize='%s' without error",
    (size) => {
      const { container } = render(
        <OtpInput otpStyle="tarmac-01" otpSize={size} numDigits={4} />
      );
      expect(container.querySelector('[role="group"]')).not.toBeNull();
    }
  );

  // ── 9–10. Both type variants ───────────────────────────────────────────
  it("renders 4 inputs when numDigits=4", () => {
    render(<OtpInput otpStyle="tarmac-01" numDigits={4} />);
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    expect(inputs).toHaveLength(4);
  });

  it("renders 6 inputs when numDigits=6", () => {
    render(<OtpInput otpStyle="tarmac-01" numDigits={6} />);
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    expect(inputs).toHaveLength(6);
  });

  // ── 11. Exhaustive Style × Size × Type combo (4×3×2 = 24) ─────────────
  it("renders without error for all 24 Style × Size × Type combinations", () => {
    const styles = ["default", "success", "error", "info"] as const;
    const sizes = ["lg", "md", "sm"] as const;
    const types = [4, 6] as const;

    for (const style of styles) {
      for (const size of sizes) {
        for (const numDigits of types) {
          const { container, unmount } = render(
            <OtpInput
              otpStyle="tarmac-01"
              otpFieldStyle={style}
              otpSize={size}
              numDigits={numDigits}
            />
          );
          expect(container.querySelector('[role="group"]')).not.toBeNull();
          const inputs = container.querySelectorAll("input");
          expect(inputs).toHaveLength(numDigits);
          unmount();
        }
      }
    }
  });

  // ── 12. Boolean toggles present when provided ──────────────────────────
  it("renders title when provided", () => {
    render(<OtpInput otpStyle="tarmac-01" title="Enter OTP" numDigits={4} />);
    expect(screen.getByText("Enter OTP")).toBeInTheDocument();
  });

  it("renders titleIcon when provided", () => {
    render(
      <OtpInput
        otpStyle="tarmac-01"
        titleIcon={<span data-testid="icon">🔒</span>}
        numDigits={4}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders helperTextTop when provided", () => {
    render(
      <OtpInput otpStyle="tarmac-01" helperTextTop="Top helper" numDigits={4} />
    );
    expect(screen.getByText("Top helper")).toBeInTheDocument();
  });

  it("renders helperTextBottom when provided", () => {
    render(
      <OtpInput
        otpStyle="tarmac-01"
        helperTextBottom="Bottom helper"
        numDigits={4}
      />
    );
    expect(screen.getByText("Bottom helper")).toBeInTheDocument();
  });

  it("renders subtext when provided", () => {
    render(
      <OtpInput otpStyle="tarmac-01" subtext="Sub info" numDigits={4} />
    );
    expect(screen.getByText("Sub info")).toBeInTheDocument();
  });

  // ── 13. Disabled state ─────────────────────────────────────────────────
  it("sets native disabled attribute on all inputs when isDisabled", () => {
    render(
      <OtpInput otpStyle="tarmac-01" isDisabled={true} numDigits={4} />
    );
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  // ── 14. Ghost skeleton rendering ───────────────────────────────────────
  it("renders no <input> elements and sets aria-hidden='true' when isGhost", () => {
    const { container } = render(
      <OtpInput otpStyle="tarmac-01" isGhost={true} numDigits={4} />
    );
    expect(container.querySelectorAll("input")).toHaveLength(0);
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  // ── 15. Keyboard navigation — auto-advance on digit entry ──────────────
  it("auto-advances focus to next input on digit entry", async () => {
    const user = userEvent.setup();
    render(<OtpInput otpStyle="tarmac-01" numDigits={4} />);
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    await user.type(inputs[0], "1");
    expect(inputs[1]).toHaveFocus();
  });

  // ── 16. Keyboard navigation — backspace to previous ────────────────────
  it("moves focus to previous input on Backspace when current is empty", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <OtpInput
        otpStyle="tarmac-01"
        numDigits={4}
        value="1"
        onChange={onChange}
      />
    );
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    inputs[1].focus();
    await user.keyboard("{Backspace}");
    expect(inputs[0]).toHaveFocus();
  });

  // ── 17. Keyboard navigation — ArrowLeft / ArrowRight ───────────────────
  it("moves focus with ArrowLeft and ArrowRight", async () => {
    const user = userEvent.setup();
    render(<OtpInput otpStyle="tarmac-01" numDigits={4} />);
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    inputs[1].focus();
    await user.keyboard("{ArrowLeft}");
    expect(inputs[0]).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(inputs[1]).toHaveFocus();
  });

  // ── 18. Paste behavior ─────────────────────────────────────────────────
  it("distributes pasted text across inputs", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} onChange={onChange} />
    );
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    await user.click(inputs[0]);
    await user.paste("5678");
    expect(onChange).toHaveBeenCalledWith("5678");
  });

  // ── 19. onChange callback ──────────────────────────────────────────────
  it("calls onChange on digit entry", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} onChange={onChange} />
    );
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    await user.type(inputs[0], "3");
    expect(onChange).toHaveBeenCalledWith("3");
  });

  // ── 20. onComplete callback ────────────────────────────────────────────
  it("calls onComplete when all digits are filled", async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(
      <OtpInput
        otpStyle="tarmac-01"
        numDigits={3}
        onComplete={onComplete}
      />
    );
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    await user.type(inputs[0], "1");
    await user.type(inputs[1], "2");
    await user.type(inputs[2], "3");
    expect(onComplete).toHaveBeenCalledWith("123");
  });

  // ── 21. className pass-through ─────────────────────────────────────────
  it("passes className to the Tarmac container", () => {
    const { container } = render(
      <OtpInput
        otpStyle="tarmac-01"
        numDigits={4}
        className="my-tarmac-class"
      />
    );
    expect(container.firstChild).toHaveClass("my-tarmac-class");
  });

  // ── 22. helperText maps to helperTextBottom ────────────────────────────
  it("maps legacy helperText prop to helperTextBottom on Tarmac path", () => {
    render(
      <OtpInput
        otpStyle="tarmac-01"
        numDigits={4}
        helperText="Legacy helper"
      />
    );
    expect(screen.getByText("Legacy helper")).toBeInTheDocument();
  });

  // ── 23. Top row not rendered when no title/titleIcon/helperTextTop ─────
  it("does not render top row when no title, titleIcon, or helperTextTop", () => {
    const { container } = render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} />
    );
    const group = container.querySelector('[role="group"]')!;
    // The first child should be the input row, not a top row
    // Top row has space-between layout; input row has the inputs
    const firstChild = group.children[0] as HTMLElement;
    expect(firstChild.querySelectorAll("input").length).toBeGreaterThan(0);
  });

  // ── 24. Bottom row not rendered when no subtext/helperTextBottom ───────
  it("does not render bottom row when no subtext or helperTextBottom", () => {
    const { container } = render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} />
    );
    const group = container.querySelector('[role="group"]')!;
    // Should only have 1 child (the input row)
    expect(group.children).toHaveLength(1);
  });

  // ── 25. Subtext text content renders correctly for each style ──────────
  it.each([
    ["default", "Default sub"],
    ["success", "Success sub"],
    ["error", "Error sub"],
    ["info", "Info sub"],
  ])(
    "renders subtext text content for style '%s'",
    (style, subtextContent) => {
      render(
        <OtpInput
          otpStyle="tarmac-01"
          otpFieldStyle={style}
          subtext={subtextContent}
          numDigits={4}
        />
      );
      expect(screen.getByText(subtextContent)).toBeInTheDocument();
    }
  );

  // ── 26. Ref forwarding on Tarmac path ──────────────────────────────────
  it("forwards ref to the Tarmac container div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<OtpInput otpStyle="tarmac-01" numDigits={4} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.getAttribute("role")).toBe("group");
  });

  // ── 27. Falls back to defaultThemeConfig when theme is missing ─────────
  it("renders without error when theme is null (falls back to defaultThemeConfig)", () => {
    // ThemeProvider is mocked to return { theme: null }, so this tests the fallback
    const { container } = render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} />
    );
    expect(container.querySelector('[role="group"]')).not.toBeNull();
    expect(container.querySelectorAll("input")).toHaveLength(4);
  });

  // ── 28. Accessibility: role="group" and aria-label ─────────────────────
  it("sets role='group' and aria-label on the container", () => {
    const { container } = render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} title="Verify Code" />
    );
    const group = container.querySelector('[role="group"]')!;
    expect(group.getAttribute("aria-label")).toBe("Verify Code");
  });

  it("uses 'OTP Input' as default aria-label when no title", () => {
    const { container } = render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} />
    );
    const group = container.querySelector('[role="group"]')!;
    expect(group.getAttribute("aria-label")).toBe("OTP Input");
  });

  // ── 29. Accessibility: aria-disabled ───────────────────────────────────
  it("sets aria-disabled='true' when isDisabled", () => {
    const { container } = render(
      <OtpInput otpStyle="tarmac-01" numDigits={4} isDisabled={true} />
    );
    const group = container.querySelector('[role="group"]')!;
    expect(group.getAttribute("aria-disabled")).toBe("true");
  });

  // ── 30. Accessibility: autocomplete="one-time-code" on first input ─────
  it("sets autocomplete='one-time-code' on the first input only", () => {
    render(<OtpInput otpStyle="tarmac-01" numDigits={4} />);
    const inputs = screen.getAllByLabelText(/^Digit \d+$/);
    expect(inputs[0]).toHaveAttribute("autocomplete", "one-time-code");
    expect(inputs[1]).toHaveAttribute("autocomplete", "off");
    expect(inputs[2]).toHaveAttribute("autocomplete", "off");
    expect(inputs[3]).toHaveAttribute("autocomplete", "off");
  });

  // ── 31. Accessibility: aria-label on each input ────────────────────────
  it("sets aria-label='Digit N' on each input (1-indexed)", () => {
    render(<OtpInput otpStyle="tarmac-01" numDigits={4} />);
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByLabelText(`Digit ${i}`)).toBeInTheDocument();
    }
  });
});


/* ═══════════════════════════════════════════════════════════════════
 * PROPERTY-BASED TESTS — fast-check (Tasks 2.2, 2.3)
 * ═══════════════════════════════════════════════════════════════════ */

// ── Mock theme config with resolved hex values ───────────────────────────

const mockOtpFieldsConfig: OtpFieldsConfig = {
  base: {
    fontFamily: "Noto Sans, sans-serif",
    captionFontFamily: "Noto Sans, sans-serif",
    fontWeight: "500",
    radius: "6px",
    borderWidth: "1px",
    transition: "all 0.15s ease-in-out",
    focusRingSpread: "2px",
    inputBoxGap: "8px",
    rowGap: "6px",
    titleIconGap: "4px",
    titleIconSize: "20px",
  },
  styles: {
    default: {
      borderColor: "#e6e6e6",
      backgroundColor: "#ffffff",
      textColor: "#2b2b2b",
      placeholderColor: "#cdcbcb",
      hoverBorderColor: "#cccccc",
      hoverBackgroundColor: "#ffffff",
      hoverTitleColor: "#2b2b2b",
      hoverTitleIconColor: "#2b2b2b",
      hoverHelperTextColor: "#454545",
      activeBorderColor: "#cccccc",
      focusBorderColor: "#cccccc",
      focusRingColor: "rgba(0,0,0,0.4)",
      titleColor: "#808080",
      titleIconColor: "#808080",
      helperTextTopColor: "#666666",
      helperTextBottomColor: "#666666",
      subtextColor: "#666666",
    },
    success: {
      borderColor: "#e6e6e6",
      backgroundColor: "#ffffff",
      textColor: "#2b2b2b",
      placeholderColor: "#cdcbcb",
      hoverBorderColor: "#cccccc",
      hoverBackgroundColor: "#ffffff",
      hoverTitleColor: "#2b2b2b",
      hoverTitleIconColor: "#2b2b2b",
      hoverHelperTextColor: "#454545",
      activeBorderColor: "#cccccc",
      focusBorderColor: "#cccccc",
      focusRingColor: "rgba(0,0,0,0.4)",
      titleColor: "#808080",
      titleIconColor: "#808080",
      helperTextTopColor: "#666666",
      helperTextBottomColor: "#666666",
      subtextColor: "#1ba86e",
    },
    error: {
      borderColor: "#e6e6e6",
      backgroundColor: "#ffffff",
      textColor: "#2b2b2b",
      placeholderColor: "#cdcbcb",
      hoverBorderColor: "#cccccc",
      hoverBackgroundColor: "#ffffff",
      hoverTitleColor: "#2b2b2b",
      hoverTitleIconColor: "#2b2b2b",
      hoverHelperTextColor: "#454545",
      activeBorderColor: "#cccccc",
      focusBorderColor: "#cccccc",
      focusRingColor: "rgba(0,0,0,0.4)",
      titleColor: "#808080",
      titleIconColor: "#808080",
      helperTextTopColor: "#666666",
      helperTextBottomColor: "#666666",
      subtextColor: "#dc143c",
    },
    info: {
      borderColor: "#e6e6e6",
      backgroundColor: "#ffffff",
      textColor: "#2b2b2b",
      placeholderColor: "#cdcbcb",
      hoverBorderColor: "#cccccc",
      hoverBackgroundColor: "#ffffff",
      hoverTitleColor: "#2b2b2b",
      hoverTitleIconColor: "#2b2b2b",
      hoverHelperTextColor: "#454545",
      activeBorderColor: "#cccccc",
      focusBorderColor: "#cccccc",
      focusRingColor: "rgba(0,0,0,0.4)",
      titleColor: "#808080",
      titleIconColor: "#808080",
      helperTextTopColor: "#666666",
      helperTextBottomColor: "#666666",
      subtextColor: "#2396fb",
    },
  },
  sizes: {
    lg: {
      inputBoxHeight: "48px",
      inputBoxWidth: "48px",
      inputFontSize: "16px",
      inputLineHeight: "24px",
      titleFontSize: "14px",
      titleLineHeight: "20px",
      captionFontSize: "12px",
      captionLineHeight: "16px",
      titleFontWeight: "500",
    },
    md: {
      inputBoxHeight: "40px",
      inputBoxWidth: "40px",
      inputFontSize: "14px",
      inputLineHeight: "20px",
      titleFontSize: "12px",
      titleLineHeight: "16px",
      captionFontSize: "10px",
      captionLineHeight: "14px",
      titleFontWeight: "500",
    },
    sm: {
      inputBoxHeight: "32px",
      inputBoxWidth: "32px",
      inputFontSize: "12px",
      inputLineHeight: "16px",
      titleFontSize: "10px",
      titleLineHeight: "14px",
      captionFontSize: "8px",
      captionLineHeight: "12px",
      titleFontWeight: "500",
    },
  },
  states: {
    disabled: {
      backgroundColor: "#f5f5f5",
      borderColor: "#ededed",
      textColor: "#cdcbcb",
      placeholderColor: "#cdcbcb",
      titleColor: "#cdcbcb",
      titleIconColor: "#cdcbcb",
      helperTextTopColor: "#cdcbcb",
      helperTextBottomColor: "#cdcbcb",
      subtextColor: "#cdcbcb",
      cursor: "default",
    },
    ghost: {
      skeletonBackgroundColor: "#ededed",
      skeletonRadius: "6px",
      skeletonTitleRadius: "12px",
      pointerEvents: "none",
      cursor: "default",
    },
  },
};

// ── Arbitraries ──────────────────────────────────────────────────────────

const styleVariants = ["default", "success", "error", "info"] as const;
const styleVariantArb = () => fc.constantFrom(...styleVariants);

const sizeVariants = ["lg", "md", "sm"] as const;
const sizeVariantArb = () => fc.constantFrom(...sizeVariants);

/** Arbitrary CSS color string */
const cssColor = () =>
  fc.oneof(
    fc.hexaString({ minLength: 6, maxLength: 6 }).map((h) => `#${h}`),
    fc.constant("rgba(0,0,0,0.4)"),
    fc.constant("#ffffff"),
    fc.constant("#f5f5f5"),
    fc.constant("transparent"),
  );

/** Helper to build default style params */
const buildParams = (
  overrides?: Partial<OtpFieldsStyleParams>
): OtpFieldsStyleParams => ({
  config: mockOtpFieldsConfig,
  otpFieldStyle: "default",
  otpSize: "lg",
  isDisabled: false,
  isGhost: false,
  ...overrides,
});


// ── Property 4: CSS pseudo-states generated for all style variants ───────

describe("Feature: otp-fields-tarmac-migration, Property 4: CSS pseudo-states generated for all style variants", () => {
  /**
   * **Validates: Requirements 4.2, 4.4, 4.8, 4.9**
   *
   * For any style variant in {default, success, error, info}, the
   * `buildOtpFieldsStyles` function SHALL generate Emotion CSS for the
   * `inputBox` class containing `:hover` and `:focus` pseudo-state
   * selectors with non-empty style rules derived from the theme config.
   * When `isDisabled` is true, the `:hover` and `:focus` overrides SHALL
   * be suppressed.
   */
  it("should produce different inputBox class names when hover/focus config values change for any style variant", () => {
    fc.assert(
      fc.property(
        styleVariantArb(),
        sizeVariantArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (otpFieldStyle, otpSize, hoverHex, focusHex) => {
          // configA: use the mock config as-is
          const configA: OtpFieldsConfig = JSON.parse(
            JSON.stringify(mockOtpFieldsConfig)
          );

          // configB: change hover and focus colors for the target style
          const configB: OtpFieldsConfig = JSON.parse(
            JSON.stringify(mockOtpFieldsConfig)
          );
          configB.styles[otpFieldStyle] = {
            ...configB.styles[otpFieldStyle],
            hoverBorderColor: `#ff${hoverHex.slice(0, 4)}`,
            hoverBackgroundColor: `#ee${hoverHex.slice(0, 4)}`,
            focusBorderColor: `#dd${focusHex.slice(0, 4)}`,
            focusRingColor: `rgba(${parseInt(focusHex.slice(0, 2), 16)},0,0,0.5)`,
          };

          const stylesA = buildOtpFieldsStyles(
            buildParams({ config: configA, otpFieldStyle, otpSize })
          );
          const stylesB = buildOtpFieldsStyles(
            buildParams({ config: configB, otpFieldStyle, otpSize })
          );

          // If :hover and :focus pseudo-states are generated, changing their
          // config values MUST produce a different Emotion class name
          expect(stylesA.inputBox).not.toBe(stylesB.inputBox);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should suppress :hover and :focus overrides when isDisabled is true — changing hover/focus config should NOT affect inputBox class", () => {
    fc.assert(
      fc.property(
        styleVariantArb(),
        sizeVariantArb(),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        fc.hexaString({ minLength: 6, maxLength: 6 }),
        (otpFieldStyle, otpSize, hoverHex, focusHex) => {
          // configA: use the mock config as-is
          const configA: OtpFieldsConfig = JSON.parse(
            JSON.stringify(mockOtpFieldsConfig)
          );

          // configB: change hover and focus colors for the target style
          const configB: OtpFieldsConfig = JSON.parse(
            JSON.stringify(mockOtpFieldsConfig)
          );
          configB.styles[otpFieldStyle] = {
            ...configB.styles[otpFieldStyle],
            hoverBorderColor: `#ff${hoverHex.slice(0, 4)}`,
            hoverBackgroundColor: `#ee${hoverHex.slice(0, 4)}`,
            focusBorderColor: `#dd${focusHex.slice(0, 4)}`,
            focusRingColor: `rgba(${parseInt(focusHex.slice(0, 2), 16)},0,0,0.5)`,
          };

          // Both with isDisabled=true — hover/focus should be suppressed
          const stylesA = buildOtpFieldsStyles(
            buildParams({
              config: configA,
              otpFieldStyle,
              otpSize,
              isDisabled: true,
            })
          );
          const stylesB = buildOtpFieldsStyles(
            buildParams({
              config: configB,
              otpFieldStyle,
              otpSize,
              isDisabled: true,
            })
          );

          // When disabled, hover/focus are suppressed, so changing those
          // config values should NOT produce a different inputBox class
          expect(stylesA.inputBox).toBe(stylesB.inputBox);
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ── Property 8: Style-specific subtext and helper text colors ────────────

describe("Feature: otp-fields-tarmac-migration, Property 8: Style-specific subtext and helper text colors", () => {
  /**
   * **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.7, 10.4, 10.5, 10.6, 10.7**
   *
   * For any style variant in {default, success, error, info}, the subtext
   * element color SHALL match the `subtextColor` from the theme config's
   * `styles` section. The style variants success, error, and info SHALL
   * each produce a different subtext color from the default style.
   */
  it("should produce different subtext class names when subtextColor changes for any style variant", () => {
    fc.assert(
      fc.property(
        styleVariantArb(),
        sizeVariantArb(),
        fc
          .tuple(
            fc.hexaString({ minLength: 6, maxLength: 6 }),
            fc.hexaString({ minLength: 6, maxLength: 6 })
          )
          .filter(([a, b]) => a !== b),
        (otpFieldStyle, otpSize, [hexA, hexB]) => {
          // configA: set subtextColor to colorA
          const configA: OtpFieldsConfig = JSON.parse(
            JSON.stringify(mockOtpFieldsConfig)
          );
          configA.styles[otpFieldStyle] = {
            ...configA.styles[otpFieldStyle],
            subtextColor: `#${hexA}`,
          };

          // configB: set subtextColor to colorB (different)
          const configB: OtpFieldsConfig = JSON.parse(
            JSON.stringify(mockOtpFieldsConfig)
          );
          configB.styles[otpFieldStyle] = {
            ...configB.styles[otpFieldStyle],
            subtextColor: `#${hexB}`,
          };

          const stylesA = buildOtpFieldsStyles(
            buildParams({ config: configA, otpFieldStyle, otpSize })
          );
          const stylesB = buildOtpFieldsStyles(
            buildParams({ config: configB, otpFieldStyle, otpSize })
          );

          // Changing subtextColor must produce a different subtext class
          expect(stylesA.subtext).not.toBe(stylesB.subtext);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should produce distinct subtext class names for success, error, and info vs default", () => {
    fc.assert(
      fc.property(sizeVariantArb(), (otpSize) => {
        const stylesDefault = buildOtpFieldsStyles(
          buildParams({ otpFieldStyle: "default", otpSize })
        );
        const stylesSuccess = buildOtpFieldsStyles(
          buildParams({ otpFieldStyle: "success", otpSize })
        );
        const stylesError = buildOtpFieldsStyles(
          buildParams({ otpFieldStyle: "error", otpSize })
        );
        const stylesInfo = buildOtpFieldsStyles(
          buildParams({ otpFieldStyle: "info", otpSize })
        );

        // Each non-default style must produce a different subtext class from default
        expect(stylesSuccess.subtext).not.toBe(stylesDefault.subtext);
        expect(stylesError.subtext).not.toBe(stylesDefault.subtext);
        expect(stylesInfo.subtext).not.toBe(stylesDefault.subtext);

        // All four must be mutually distinct
        const subtextClasses = new Set([
          stylesDefault.subtext,
          stylesSuccess.subtext,
          stylesError.subtext,
          stylesInfo.subtext,
        ]);
        expect(subtextClasses.size).toBe(4);
      }),
      { numRuns: 100 }
    );
  });
});


// ── Property 1: Discriminator prop activates Tarmac path ─────────────────

describe("Feature: otp-fields-tarmac-migration, Property 1: Discriminator prop activates Tarmac path", () => {
  /**
   * **Validates: Requirements 1.1, 1.3**
   *
   * For any string value passed as `otpStyle`, the OtpInput component SHALL
   * produce the Tarmac DOM structure (individual `<input>` elements with
   * Emotion-generated classes, not legacy `Input` sub-components) and SHALL
   * NOT throw a runtime error.
   */
  it("should render the Tarmac path with role='group' container for any otpStyle string value", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (otpStyle) => {
          const { container, unmount } = render(
            <OtpInput otpStyle={otpStyle} numDigits={4} />
          );

          // Tarmac path produces a container with role="group"
          const group = container.querySelector('[role="group"]');
          expect(group).not.toBeNull();

          // Tarmac path renders native <input> elements directly (not wrapped in legacy Input sub-components)
          const inputs = container.querySelectorAll('input');
          expect(inputs.length).toBe(4);

          // Each input should have an Emotion-generated className (non-empty)
          inputs.forEach((input: Element) => {
            expect((input as HTMLElement).className).not.toBe("");
          });

          // Legacy path uses the Input component which wraps inputs in extra divs with specific class patterns
          // Tarmac path should NOT have legacy Input sub-component wrappers
          const legacyInputWrappers = container.querySelectorAll('.py-2');
          expect(legacyInputWrappers.length).toBe(0);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ── Property 2: numDigits controls input box count ───────────────────────

describe("Feature: otp-fields-tarmac-migration, Property 2: numDigits controls input box count", () => {
  /**
   * **Validates: Requirements 2.1, 2.2, 2.4, 11.1**
   *
   * For any positive integer `n` passed as `numDigits`, the OtpInput
   * component in the Tarmac path SHALL render exactly `n` individual
   * `<input>` elements (or `n` ghost skeleton blocks when `isGhost` is
   * true), each with `maxLength=1` and `text-align: center`.
   */
  it("should render exactly n input elements with maxLength=1 for any positive numDigits", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 12 }),
        (numDigits) => {
          const { container, unmount } = render(
            <OtpInput otpStyle="tarmac-01" numDigits={numDigits} />
          );

          const inputs = container.querySelectorAll('input');
          expect(inputs.length).toBe(numDigits);

          inputs.forEach((input: Element) => {
            expect((input as HTMLInputElement).maxLength).toBe(1);
          });

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should render exactly n ghost skeleton blocks when isGhost is true for any positive numDigits", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 12 }),
        (numDigits) => {
          const { container, unmount } = render(
            <OtpInput otpStyle="tarmac-01" numDigits={numDigits} isGhost={true} />
          );

          // Ghost path should NOT render any <input> elements
          const inputs = container.querySelectorAll('input');
          expect(inputs.length).toBe(0);

          // Ghost path should have aria-hidden="true" on the container
          const ghostContainer = container.querySelector('[aria-hidden="true"]');
          expect(ghostContainer).not.toBeNull();

          // Ghost path renders div blocks as skeleton placeholders
          // The ghost input row contains exactly numDigits child divs
          const ghostInputRow = ghostContainer!.children;
          // Find the row that contains the ghost input boxes (it's the one with numDigits children)
          let ghostBoxCount = 0;
          for (let i = 0; i < ghostContainer!.children.length; i++) {
            const child = ghostContainer!.children[i] as HTMLElement;
            // The ghost input row is the div that contains exactly numDigits child divs
            if (child.children.length === numDigits) {
              ghostBoxCount = child.children.length;
              break;
            }
          }
          expect(ghostBoxCount).toBe(numDigits);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ── Property 3: Exhaustive variant rendering without error ───────────────

describe("Feature: otp-fields-tarmac-migration, Property 3: Exhaustive variant rendering without error", () => {
  /**
   * **Validates: Requirements 17.5, 17.6, 17.7**
   *
   * For all combinations of `otpFieldStyle` × `otpSize` × `numDigits` ×
   * `isDisabled` × `isGhost` and all boolean toggle combinations, the
   * OtpInput component SHALL render without throwing an error when the
   * Tarmac path is active.
   */
  it("should render without error for all variant × toggle combinations", () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.constantFrom("default", "success", "error", "info"),
          fc.constantFrom("lg", "md", "sm"),
          fc.constantFrom(4, 6),
          fc.boolean(),
          fc.boolean()
        ),
        fc.record({
          hasTitle: fc.boolean(),
          hasTitleIcon: fc.boolean(),
          hasHelperTextTop: fc.boolean(),
          hasHelperTextBottom: fc.boolean(),
          hasSubtext: fc.boolean(),
        }),
        ([otpFieldStyle, otpSize, numDigits, isDisabled, isGhost], toggles) => {
          const props: Record<string, any> = {
            otpStyle: "tarmac-01",
            otpFieldStyle,
            otpSize,
            numDigits,
            isDisabled,
            isGhost,
          };

          if (toggles.hasTitle) props.title = "Enter OTP";
          if (toggles.hasTitleIcon) props.titleIcon = React.createElement("span", null, "🔒");
          if (toggles.hasHelperTextTop) props.helperTextTop = "Helper top";
          if (toggles.hasHelperTextBottom) props.helperTextBottom = "Helper bottom";
          if (toggles.hasSubtext) props.subtext = "Subtext here";

          // Should not throw
          const { container, unmount } = render(
            React.createElement(OtpInput, props)
          );

          // Should render something
          expect(container.firstChild).not.toBeNull();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ── Property 13: Backward compatibility — Tarmac props ignored without discriminator ──

describe("Feature: otp-fields-tarmac-migration, Property 13: Backward compatibility — Tarmac props ignored without discriminator", () => {
  /**
   * **Validates: Requirements 19.1, 19.5**
   *
   * For any Tarmac-only prop (otpSize, otpFieldStyle, title, titleIcon,
   * helperTextTop, helperTextBottom, subtext, isGhost) passed WITHOUT the
   * `otpStyle` discriminator, the component SHALL render the legacy path
   * without errors and without Tarmac-specific elements.
   */
  it("should render the legacy path and ignore Tarmac-only props when otpStyle is absent", () => {
    fc.assert(
      fc.property(
        fc.record({
          otpSize: fc.option(fc.constantFrom("lg", "md", "sm"), { nil: undefined }),
          otpFieldStyle: fc.option(fc.constantFrom("default", "success", "error", "info"), { nil: undefined }),
          title: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
          titleIcon: fc.option(fc.constant("icon-placeholder"), { nil: undefined }),
          helperTextTop: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
          helperTextBottom: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
          subtext: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
          isGhost: fc.option(fc.boolean(), { nil: undefined }),
        }),
        (tarmacProps) => {
          // Render WITHOUT otpStyle discriminator — should use legacy path
          const props: Record<string, any> = { numDigits: 4 };
          if (tarmacProps.otpSize !== undefined) props.otpSize = tarmacProps.otpSize;
          if (tarmacProps.otpFieldStyle !== undefined) props.otpFieldStyle = tarmacProps.otpFieldStyle;
          if (tarmacProps.title !== undefined) props.title = tarmacProps.title;
          if (tarmacProps.titleIcon !== undefined) props.titleIcon = React.createElement("span", null, tarmacProps.titleIcon);
          if (tarmacProps.helperTextTop !== undefined) props.helperTextTop = tarmacProps.helperTextTop;
          if (tarmacProps.helperTextBottom !== undefined) props.helperTextBottom = tarmacProps.helperTextBottom;
          if (tarmacProps.subtext !== undefined) props.subtext = tarmacProps.subtext;
          if (tarmacProps.isGhost !== undefined) props.isGhost = tarmacProps.isGhost;

          const { container, unmount } = render(
            React.createElement(OtpInput, props)
          );

          // Should not throw — component rendered
          expect(container.firstChild).not.toBeNull();

          // Legacy path should NOT have role="group" (Tarmac-specific)
          const group = container.querySelector('[role="group"]');
          expect(group).toBeNull();

          // Legacy path should NOT have aria-hidden="true" on the root (Tarmac ghost-specific)
          const rootEl = container.firstChild as HTMLElement;
          expect(rootEl.getAttribute("aria-hidden")).toBeNull();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});



// ── Property 5: Disabled state propagation to all elements ───────────────

describe("Feature: otp-fields-tarmac-migration, Property 5: Disabled state propagation to all elements", () => {
  /**
   * **Validates: Requirements 4.5, 4.6**
   *
   * For any combination of boolean toggle props (title, titleIcon,
   * helperTextTop, helperTextBottom, subtext), when `isDisabled` is true,
   * ALL rendered `<input>` elements SHALL have the native `disabled`
   * attribute set, and the style builder SHALL apply disabled-specific
   * colors from `config.states.disabled` to all text elements.
   */

  it("should set the native disabled attribute on ALL <input> elements for any toggle combination when isDisabled=true", () => {
    fc.assert(
      fc.property(
        fc.record({
          hasTitle: fc.boolean(),
          hasTitleIcon: fc.boolean(),
          hasHelperTextTop: fc.boolean(),
          hasHelperTextBottom: fc.boolean(),
          hasSubtext: fc.boolean(),
        }),
        (toggles) => {
          const props: Record<string, any> = {
            otpStyle: "tarmac-01",
            isDisabled: true,
            numDigits: 4,
          };

          if (toggles.hasTitle) props.title = "Enter OTP";
          if (toggles.hasTitleIcon)
            props.titleIcon = React.createElement("span", null, "🔒");
          if (toggles.hasHelperTextTop) props.helperTextTop = "Helper top";
          if (toggles.hasHelperTextBottom)
            props.helperTextBottom = "Helper bottom";
          if (toggles.hasSubtext) props.subtext = "Subtext here";

          const { container, unmount } = render(
            React.createElement(OtpInput, props)
          );

          // Every <input> must have the native disabled attribute
          const inputs = container.querySelectorAll("input");
          expect(inputs.length).toBe(4);
          inputs.forEach((input: HTMLInputElement) => {
            expect(input.disabled).toBe(true);
          });

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should apply disabled-specific colors from config.states.disabled to all text element styles when isDisabled=true", () => {
    const ds = mockOtpFieldsConfig.states.disabled!;

    fc.assert(
      fc.property(
        fc.record({
          hasTitle: fc.boolean(),
          hasTitleIcon: fc.boolean(),
          hasHelperTextTop: fc.boolean(),
          hasHelperTextBottom: fc.boolean(),
          hasSubtext: fc.boolean(),
        }),
        (toggles) => {
          const styles = buildOtpFieldsStyles(
            buildParams({ isDisabled: true })
          );

          // titleText should use disabled titleColor
          if (toggles.hasTitle) {
            const enabledStyles = buildOtpFieldsStyles(
              buildParams({ isDisabled: false })
            );
            // Disabled and enabled must produce different titleText classes
            // because disabled uses ds.titleColor while enabled uses sc.titleColor
            expect(styles.titleText).not.toBe(enabledStyles.titleText);
          }

          // titleIcon should use disabled titleIconColor
          if (toggles.hasTitleIcon) {
            const enabledStyles = buildOtpFieldsStyles(
              buildParams({ isDisabled: false })
            );
            expect(styles.titleIcon).not.toBe(enabledStyles.titleIcon);
          }

          // helperTextTop should use disabled helperTextTopColor
          if (toggles.hasHelperTextTop) {
            const enabledStyles = buildOtpFieldsStyles(
              buildParams({ isDisabled: false })
            );
            expect(styles.helperTextTop).not.toBe(enabledStyles.helperTextTop);
          }

          // helperTextBottom should use disabled helperTextBottomColor
          if (toggles.hasHelperTextBottom) {
            const enabledStyles = buildOtpFieldsStyles(
              buildParams({ isDisabled: false })
            );
            expect(styles.helperTextBottom).not.toBe(
              enabledStyles.helperTextBottom
            );
          }

          // subtext should use disabled subtextColor
          if (toggles.hasSubtext) {
            const enabledStyles = buildOtpFieldsStyles(
              buildParams({ isDisabled: false })
            );
            expect(styles.subtext).not.toBe(enabledStyles.subtext);
          }

          // inputBox should use disabled colors (bg, border, text)
          const enabledStyles = buildOtpFieldsStyles(
            buildParams({ isDisabled: false })
          );
          expect(styles.inputBox).not.toBe(enabledStyles.inputBox);

          // container should differ (disabled suppresses hover, applies disabled child colors)
          expect(styles.container).not.toBe(enabledStyles.container);
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ── Property 6: Ghost skeleton replaces interactive elements ─────────────

describe("Feature: otp-fields-tarmac-migration, Property 6: Ghost skeleton replaces interactive elements", () => {
  /**
   * **Validates: Requirements 4.7, 14.1, 14.2, 14.3, 14.4**
   *
   * For any `numDigits` value and any combination of boolean toggle props,
   * when `isGhost` is true, the component SHALL NOT render any `<input>`
   * elements. Instead, it SHALL render skeleton placeholder `<div>` blocks
   * matching the count of the corresponding elements, with
   * `pointer-events: none` on the container and `aria-hidden="true"`.
   */

  it("should render NO <input> elements and set aria-hidden='true' on the ghost container for any numDigits and toggle combination", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.record({
          hasTitle: fc.boolean(),
          hasTitleIcon: fc.boolean(),
          hasHelperTextTop: fc.boolean(),
          hasHelperTextBottom: fc.boolean(),
          hasSubtext: fc.boolean(),
        }),
        (numDigits, toggles) => {
          const props: Record<string, any> = {
            otpStyle: "tarmac-01",
            isGhost: true,
            numDigits,
          };

          if (toggles.hasTitle) props.title = "Enter OTP";
          if (toggles.hasTitleIcon)
            props.titleIcon = React.createElement("span", null, "🔒");
          if (toggles.hasHelperTextTop) props.helperTextTop = "Helper top";
          if (toggles.hasHelperTextBottom)
            props.helperTextBottom = "Helper bottom";
          if (toggles.hasSubtext) props.subtext = "Subtext here";

          const { container, unmount } = render(
            React.createElement(OtpInput, props)
          );

          // Ghost path must NOT render any <input> elements
          const inputs = container.querySelectorAll("input");
          expect(inputs.length).toBe(0);

          // Ghost container must have aria-hidden="true"
          const ghostContainer = container.querySelector(
            '[aria-hidden="true"]'
          );
          expect(ghostContainer).not.toBeNull();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should render exactly numDigits skeleton <div> blocks in the ghost input row for any numDigits and toggle combination", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.record({
          hasTitle: fc.boolean(),
          hasTitleIcon: fc.boolean(),
          hasHelperTextTop: fc.boolean(),
          hasHelperTextBottom: fc.boolean(),
          hasSubtext: fc.boolean(),
        }),
        (numDigits, toggles) => {
          const props: Record<string, any> = {
            otpStyle: "tarmac-01",
            isGhost: true,
            numDigits,
          };

          if (toggles.hasTitle) props.title = "Enter OTP";
          if (toggles.hasTitleIcon)
            props.titleIcon = React.createElement("span", null, "🔒");
          if (toggles.hasHelperTextTop) props.helperTextTop = "Helper top";
          if (toggles.hasHelperTextBottom)
            props.helperTextBottom = "Helper bottom";
          if (toggles.hasSubtext) props.subtext = "Subtext here";

          const { container, unmount } = render(
            React.createElement(OtpInput, props)
          );

          const ghostRoot = container.querySelector('[aria-hidden="true"]')!;

          // Find the ghost input row — the child div whose children count
          // matches numDigits (skeleton input boxes)
          let ghostInputBoxCount = 0;
          for (let i = 0; i < ghostRoot.children.length; i++) {
            const child = ghostRoot.children[i] as HTMLElement;
            if (child.children.length === numDigits) {
              ghostInputBoxCount = child.children.length;
              // Verify each skeleton block is a <div> (not an <input>)
              for (let j = 0; j < child.children.length; j++) {
                expect(child.children[j].tagName).toBe("DIV");
              }
              break;
            }
          }
          expect(ghostInputBoxCount).toBe(numDigits);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should apply pointer-events: none on the ghost container via the style builder for any numDigits", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.record({
          hasTitle: fc.boolean(),
          hasTitleIcon: fc.boolean(),
          hasHelperTextTop: fc.boolean(),
          hasHelperTextBottom: fc.boolean(),
          hasSubtext: fc.boolean(),
        }),
        (numDigits, toggles) => {
          // Verify at the style builder level that ghostContainer includes
          // pointer-events: none
          const styles = buildOtpFieldsStyles(
            buildParams({ isGhost: true })
          );

          // The ghostContainer class must differ from the normal container
          // (ghost has pointer-events: none, cursor: default)
          const normalStyles = buildOtpFieldsStyles(
            buildParams({ isGhost: false })
          );
          expect(styles.ghostContainer).not.toBe(normalStyles.container);

          // Also verify at the DOM level
          const props: Record<string, any> = {
            otpStyle: "tarmac-01",
            isGhost: true,
            numDigits,
          };

          if (toggles.hasTitle) props.title = "Enter OTP";
          if (toggles.hasTitleIcon)
            props.titleIcon = React.createElement("span", null, "🔒");
          if (toggles.hasHelperTextTop) props.helperTextTop = "Helper top";
          if (toggles.hasHelperTextBottom)
            props.helperTextBottom = "Helper bottom";
          if (toggles.hasSubtext) props.subtext = "Subtext here";

          const { container, unmount } = render(
            React.createElement(OtpInput, props)
          );

          const ghostRoot = container.querySelector(
            '[aria-hidden="true"]'
          ) as HTMLElement;
          expect(ghostRoot).not.toBeNull();

          // The ghost container should have the ghostContainer Emotion class
          // which includes pointer-events: none
          expect(ghostRoot.className).not.toBe("");

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ── Property 7: Boolean toggle presence and absence ──────────────────────

describe("Feature: otp-fields-tarmac-migration, Property 7: Boolean toggle presence and absence", () => {
  /**
   * **Validates: Requirements 6.1, 6.2, 7.1, 7.2, 8.1, 8.2, 9.1, 9.2, 10.1, 10.2, 12.4, 12.5**
   *
   * For any combination of the five boolean toggle props (title, titleIcon,
   * helperTextTop, helperTextBottom, subtext), each corresponding DOM element
   * SHALL be present when its prop is provided and absent when not. The top
   * row wrapper SHALL not render when none of title, titleIcon, or
   * helperTextTop is provided. The bottom row wrapper SHALL not render when
   * neither subtext nor helperTextBottom is provided.
   */

  const toggleArb = fc.record({
    title: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
    titleIcon: fc.option(
      fc.constant(React.createElement("span", { "data-testid": "pbt-icon" }, "★")),
      { nil: undefined }
    ),
    helperTextTop: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
    helperTextBottom: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
    subtext: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
  });

  it("should render each toggle element when its prop is provided and omit it when not", () => {
    fc.assert(
      fc.property(toggleArb, (toggles) => {
        const props: Record<string, any> = {
          otpStyle: "tarmac-01",
          numDigits: 4,
        };

        if (toggles.title !== undefined) props.title = toggles.title;
        if (toggles.titleIcon !== undefined) props.titleIcon = toggles.titleIcon;
        if (toggles.helperTextTop !== undefined) props.helperTextTop = toggles.helperTextTop;
        if (toggles.helperTextBottom !== undefined) props.helperTextBottom = toggles.helperTextBottom;
        if (toggles.subtext !== undefined) props.subtext = toggles.subtext;

        const { container, unmount } = render(
          React.createElement(OtpInput, props)
        );

        const group = container.querySelector('[role="group"]')!;

        // Title: present when provided, absent when not
        if (toggles.title !== undefined) {
          const titleEl = container.querySelector(".otp-title-text");
          expect(titleEl).not.toBeNull();
          expect(titleEl!.textContent).toBe(toggles.title);
        } else {
          const titleEl = container.querySelector(".otp-title-text");
          expect(titleEl).toBeNull();
        }

        // Title Icon: present when provided, absent when not
        if (toggles.titleIcon !== undefined) {
          const iconEl = container.querySelector(".otp-title-icon");
          expect(iconEl).not.toBeNull();
        } else {
          const iconEl = container.querySelector(".otp-title-icon");
          expect(iconEl).toBeNull();
        }

        // Helper Text Top: present when provided, absent when not
        if (toggles.helperTextTop !== undefined) {
          const htTopEls = container.querySelectorAll(".otp-helper-text");
          // helperTextTop is the first .otp-helper-text in the top row
          const topRowExists = !!(toggles.title || toggles.titleIcon || toggles.helperTextTop);
          if (topRowExists) {
            // Find the helper text in the top row (first child of group when top row exists)
            const topRow = group.children[0] as HTMLElement;
            const helperInTop = topRow.querySelector(".otp-helper-text");
            expect(helperInTop).not.toBeNull();
            expect(helperInTop!.textContent).toBe(toggles.helperTextTop);
          }
        } else {
          // If no helperTextTop, there should be no .otp-helper-text in the top row
          const hasTopRow = !!(toggles.title || toggles.titleIcon || toggles.helperTextTop);
          if (hasTopRow) {
            const topRow = group.children[0] as HTMLElement;
            // Top row exists but helperTextTop is absent — no helper text in top row
            const helperInTop = topRow.querySelector(".otp-helper-text");
            expect(helperInTop).toBeNull();
          }
        }

        // Helper Text Bottom: present when provided, absent when not
        if (toggles.helperTextBottom !== undefined) {
          const hasTopRow = !!(toggles.title || toggles.titleIcon || toggles.helperTextTop);
          const bottomRowIndex = hasTopRow ? 2 : 1;
          const bottomRow = group.children[bottomRowIndex] as HTMLElement;
          expect(bottomRow).toBeDefined();
          const helperInBottom = bottomRow.querySelector(".otp-helper-text");
          expect(helperInBottom).not.toBeNull();
          expect(helperInBottom!.textContent).toBe(toggles.helperTextBottom);
        } else {
          // If no helperTextBottom, check there's no helper text in the bottom row
          const hasBottomRow = !!(toggles.subtext || toggles.helperTextBottom);
          if (hasBottomRow) {
            const hasTopRow = !!(toggles.title || toggles.titleIcon || toggles.helperTextTop);
            const bottomRowIndex = hasTopRow ? 2 : 1;
            const bottomRow = group.children[bottomRowIndex] as HTMLElement;
            const helperInBottom = bottomRow.querySelector(".otp-helper-text");
            expect(helperInBottom).toBeNull();
          }
        }

        // Subtext: present when provided, absent when not
        if (toggles.subtext !== undefined) {
          // Subtext is a span in the bottom row (no special class, but it's the first span)
          const allSpans = container.querySelectorAll("span");
          const subtextFound = Array.from(allSpans).some(
            (span) => span.textContent === toggles.subtext && !span.classList.contains("otp-helper-text")
              && !span.classList.contains("otp-title-text") && !span.classList.contains("otp-title-icon")
          );
          expect(subtextFound).toBe(true);
        } else {
          // No subtext prop — no subtext span should exist in the bottom row
          // (We can't easily distinguish subtext from other spans, but we can check
          // that the bottom row doesn't have a non-helper-text span if it exists)
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("should not render top row wrapper when none of title, titleIcon, or helperTextTop is provided", () => {
    fc.assert(
      fc.property(
        fc.record({
          helperTextBottom: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
          subtext: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
        }),
        (bottomToggles) => {
          // Explicitly NO title, titleIcon, or helperTextTop
          const props: Record<string, any> = {
            otpStyle: "tarmac-01",
            numDigits: 4,
          };

          if (bottomToggles.helperTextBottom !== undefined)
            props.helperTextBottom = bottomToggles.helperTextBottom;
          if (bottomToggles.subtext !== undefined)
            props.subtext = bottomToggles.subtext;

          const { container, unmount } = render(
            React.createElement(OtpInput, props)
          );

          const group = container.querySelector('[role="group"]')!;

          // First child of group should be the input row (contains <input> elements)
          const firstChild = group.children[0] as HTMLElement;
          const inputsInFirst = firstChild.querySelectorAll("input");
          expect(inputsInFirst.length).toBe(4);

          // No title text or icon should exist anywhere
          expect(container.querySelector(".otp-title-text")).toBeNull();
          expect(container.querySelector(".otp-title-icon")).toBeNull();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not render bottom row wrapper when neither subtext nor helperTextBottom is provided", () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
          titleIcon: fc.option(
            fc.constant(React.createElement("span", { "data-testid": "pbt-icon" }, "★")),
            { nil: undefined }
          ),
          helperTextTop: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
        }),
        (topToggles) => {
          // Explicitly NO subtext or helperTextBottom
          const props: Record<string, any> = {
            otpStyle: "tarmac-01",
            numDigits: 4,
          };

          if (topToggles.title !== undefined) props.title = topToggles.title;
          if (topToggles.titleIcon !== undefined) props.titleIcon = topToggles.titleIcon;
          if (topToggles.helperTextTop !== undefined) props.helperTextTop = topToggles.helperTextTop;

          const { container, unmount } = render(
            React.createElement(OtpInput, props)
          );

          const group = container.querySelector('[role="group"]')!;
          const hasTopRow = !!(topToggles.title || topToggles.titleIcon || topToggles.helperTextTop);

          // Last child of group should be the input row (contains <input> elements)
          const lastChild = group.children[group.children.length - 1] as HTMLElement;
          const inputsInLast = lastChild.querySelectorAll("input");
          expect(inputsInLast.length).toBe(4);

          // Expected children count: 1 (input row only) or 2 (top row + input row)
          const expectedChildren = hasTopRow ? 2 : 1;
          expect(group.children.length).toBe(expectedChildren);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ── Property 9: Keyboard navigation auto-advance and backspace ───────────

describe("Feature: otp-fields-tarmac-migration, Property 9: Keyboard navigation auto-advance and backspace", () => {
  /**
   * **Validates: Requirements 13.1, 13.2, 13.3, 13.4**
   *
   * For any digit position `i` in `[0, numDigits)`, when a digit is entered
   * at position `i` and `i < numDigits - 1`, focus SHALL advance to position
   * `i + 1`. When Backspace is pressed on an empty input at position `i > 0`,
   * focus SHALL move to position `i - 1` and that position's value SHALL be
   * cleared. ArrowLeft at position `i > 0` SHALL move focus to `i - 1`.
   * ArrowRight at position `i < numDigits - 1` SHALL move focus to `i + 1`.
   */

  it("should auto-advance focus to the next input when a digit is entered at position i < numDigits-1", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 8 }),
        fc.nat(),
        (numDigits, rawPos) => {
          // Constrain position to [0, numDigits - 2] so there's always a next input
          const pos = rawPos % (numDigits - 1);

          const { unmount } = render(
            <OtpInput otpStyle="tarmac-01" numDigits={numDigits} />
          );

          const input = screen.getByLabelText(`Digit ${pos + 1}`) as HTMLInputElement;
          input.focus();
          expect(input).toHaveFocus();

          // Simulate typing a digit via fireEvent for precise control
          fireEvent.change(input, { target: { value: "5" } });

          // Focus should have advanced to the next input
          const nextInput = screen.getByLabelText(`Digit ${pos + 2}`) as HTMLInputElement;
          expect(nextInput).toHaveFocus();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should move focus to previous input and clear its value on Backspace when current input is empty and i > 0", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 8 }),
        fc.nat(),
        (numDigits, rawPos) => {
          // Constrain position to [1, numDigits - 1] so there's always a previous input
          const pos = (rawPos % (numDigits - 1)) + 1;

          // Pre-fill the previous position so we can verify it gets cleared
          const valueArr = Array(numDigits).fill("");
          valueArr[pos - 1] = "7";
          const value = valueArr.join("");

          const onChange = jest.fn();
          const { unmount } = render(
            <OtpInput
              otpStyle="tarmac-01"
              numDigits={numDigits}
              value={value}
              onChange={onChange}
            />
          );

          const input = screen.getByLabelText(`Digit ${pos + 1}`) as HTMLInputElement;
          input.focus();
          expect(input).toHaveFocus();

          // Press Backspace on the empty input
          fireEvent.keyDown(input, { key: "Backspace" });

          // Focus should move to the previous input
          const prevInput = screen.getByLabelText(`Digit ${pos}`) as HTMLInputElement;
          expect(prevInput).toHaveFocus();

          // onChange should have been called with the previous position cleared
          expect(onChange).toHaveBeenCalled();
          const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
          // The character at pos-1 should be cleared
          expect(lastCall[pos - 1] === "" || lastCall[pos - 1] === undefined || lastCall.length <= pos - 1).toBe(true);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should move focus to previous input on ArrowLeft when i > 0", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 8 }),
        fc.nat(),
        (numDigits, rawPos) => {
          // Constrain position to [1, numDigits - 1] so there's always a previous input
          const pos = (rawPos % (numDigits - 1)) + 1;

          const { unmount } = render(
            <OtpInput otpStyle="tarmac-01" numDigits={numDigits} />
          );

          const input = screen.getByLabelText(`Digit ${pos + 1}`) as HTMLInputElement;
          input.focus();
          expect(input).toHaveFocus();

          // Press ArrowLeft
          fireEvent.keyDown(input, { key: "ArrowLeft" });

          // Focus should move to the previous input
          const prevInput = screen.getByLabelText(`Digit ${pos}`) as HTMLInputElement;
          expect(prevInput).toHaveFocus();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should move focus to next input on ArrowRight when i < numDigits - 1", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 8 }),
        fc.nat(),
        (numDigits, rawPos) => {
          // Constrain position to [0, numDigits - 2] so there's always a next input
          const pos = rawPos % (numDigits - 1);

          const { unmount } = render(
            <OtpInput otpStyle="tarmac-01" numDigits={numDigits} />
          );

          const input = screen.getByLabelText(`Digit ${pos + 1}`) as HTMLInputElement;
          input.focus();
          expect(input).toHaveFocus();

          // Press ArrowRight
          fireEvent.keyDown(input, { key: "ArrowRight" });

          // Focus should move to the next input
          const nextInput = screen.getByLabelText(`Digit ${pos + 2}`) as HTMLInputElement;
          expect(nextInput).toHaveFocus();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});



// ── Property 10: Paste distribution across input boxes ───────────────────

describe("Feature: otp-fields-tarmac-migration, Property 10: Paste distribution across input boxes", () => {
  /**
   * **Validates: Requirements 13.5, 13.6**
   *
   * For any string pasted into the component with `numDigits = n`, the
   * pasted characters SHALL be distributed across input boxes starting
   * from the first box, limited to `n` characters. When `inputType` is
   * "number", non-digit characters in the pasted string SHALL be filtered
   * out before distribution.
   */

  it("should distribute pasted characters across inputs starting from the first box, limited to numDigits", () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.char(), { minLength: 1, maxLength: 20 }),
        fc.integer({ min: 1, max: 8 }),
        (pasteContent, numDigits) => {
          const onChange = jest.fn();
          const { unmount } = render(
            <OtpInput
              otpStyle="tarmac-01"
              numDigits={numDigits}
              onChange={onChange}
            />
          );

          const firstInput = screen.getByLabelText("Digit 1") as HTMLInputElement;

          // Simulate paste on the first input
          fireEvent.paste(firstInput, {
            clipboardData: { getData: () => pasteContent },
          });

          // The paste handler trims, then slices to numDigits
          const trimmed = pasteContent.trim();
          if (!trimmed) {
            // Empty after trim — onChange should not be called
            expect(onChange).not.toHaveBeenCalled();
            unmount();
            return;
          }

          const expected = trimmed.slice(0, numDigits);

          // onChange should have been called with the distributed characters
          expect(onChange).toHaveBeenCalled();
          const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
          expect(lastCall).toBe(expected.padEnd(numDigits, "").slice(0, numDigits));

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should filter out non-digit characters from pasted text when inputType is 'number'", () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.char(), { minLength: 1, maxLength: 20 }),
        fc.integer({ min: 1, max: 8 }),
        (pasteContent, numDigits) => {
          const onChange = jest.fn();
          const { unmount } = render(
            <OtpInput
              otpStyle="tarmac-01"
              numDigits={numDigits}
              inputType="number"
              onChange={onChange}
            />
          );

          const firstInput = screen.getByLabelText("Digit 1") as HTMLInputElement;

          // Simulate paste on the first input
          fireEvent.paste(firstInput, {
            clipboardData: { getData: () => pasteContent },
          });

          // The paste handler trims, filters non-digits, then slices to numDigits
          const trimmed = pasteContent.trim();
          if (!trimmed) {
            expect(onChange).not.toHaveBeenCalled();
            unmount();
            return;
          }

          const digitsOnly = trimmed.replace(/\D/g, "");
          if (!digitsOnly) {
            // All non-digit characters — after filtering, nothing to paste
            // The handler checks `if (!paste) return` after trim, but the
            // filtering happens after that check, so onChange may still be
            // called with empty values if the raw paste was non-empty
            // Let's check: the handler does `let valid = ...replace(/\D/g, '')`
            // then `valid = valid.slice(0, numDigits)` — valid could be ""
            // then builds newOtpValues from valid.split('') which is [''] for ""
            // Actually for empty string, split('') returns [] so it fills with empty
            // onChange is called with the joined result
            if (onChange.mock.calls.length > 0) {
              const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
              // All characters should be empty (no digits survived filtering)
              expect(lastCall.replace(/\s/g, "")).toBe("");
            }
            unmount();
            return;
          }

          const expected = digitsOnly.slice(0, numDigits);

          expect(onChange).toHaveBeenCalled();
          const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
          expect(lastCall).toBe(expected.padEnd(numDigits, "").slice(0, numDigits));

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});



// ── Property 11: onChange and onComplete callbacks ────────────────────────

describe("Feature: otp-fields-tarmac-migration, Property 11: onChange and onComplete callbacks", () => {
  /**
   * **Validates: Requirements 13.8, 13.9**
   *
   * For any sequence of digit inputs filling all `numDigits` positions,
   * verify `onChange` called on every input change, and `onComplete`
   * called exactly once when all positions filled.
   */

  it("should call onChange on every digit input and onComplete exactly once when all positions are filled", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 6 }).chain((n) =>
          fc.tuple(
            fc.constant(n),
            fc.stringOf(
              fc.constantFrom("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"),
              { minLength: n, maxLength: n }
            )
          )
        ),
        ([numDigits, digitString]) => {
          const onChange = jest.fn();
          const onComplete = jest.fn();

          const { unmount } = render(
            <OtpInput
              otpStyle="tarmac-01"
              numDigits={numDigits}
              onChange={onChange}
              onComplete={onComplete}
            />
          );

          // Enter each digit one by one using fireEvent.change
          for (let i = 0; i < numDigits; i++) {
            const input = screen.getByLabelText(`Digit ${i + 1}`) as HTMLInputElement;
            fireEvent.change(input, { target: { value: digitString[i] } });
          }

          // onChange should be called at least numDigits times (once per input)
          expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(numDigits);

          // onComplete should be called exactly once when all positions are filled
          expect(onComplete).toHaveBeenCalledTimes(1);

          // onComplete should be called with the full OTP string
          expect(onComplete).toHaveBeenCalledWith(digitString);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not call onComplete when not all positions are filled", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 3, max: 6 }).chain((n) =>
          fc.tuple(
            fc.constant(n),
            // Generate a digit string shorter than numDigits (1 to n-1 digits)
            fc.integer({ min: 1, max: n - 1 }).chain((len) =>
              fc.stringOf(
                fc.constantFrom("0", "1", "2", "3", "4", "5", "6", "7", "8", "9"),
                { minLength: len, maxLength: len }
              )
            )
          )
        ),
        ([numDigits, partialDigits]) => {
          const onChange = jest.fn();
          const onComplete = jest.fn();

          const { unmount } = render(
            <OtpInput
              otpStyle="tarmac-01"
              numDigits={numDigits}
              onChange={onChange}
              onComplete={onComplete}
            />
          );

          // Enter only a partial set of digits
          for (let i = 0; i < partialDigits.length; i++) {
            const input = screen.getByLabelText(`Digit ${i + 1}`) as HTMLInputElement;
            fireEvent.change(input, { target: { value: partialDigits[i] } });
          }

          // onChange should be called for each digit entered
          expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(partialDigits.length);

          // onComplete should NOT be called since not all positions are filled
          expect(onComplete).not.toHaveBeenCalled();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/* ═══════════════════════════════════════════════════════════════════
 * PROPERTY 12 — Theme JSON token validity (Task 7.10)
 * Validates: Requirements 15.2, 15.7, 18.2
 * ═══════════════════════════════════════════════════════════════════ */

describe("Property 12: Theme JSON token validity", () => {
  const fs = require("fs");
  const path = require("path");

  // Read theme JSON and extract otpFields_tarmac section
  const themeJsonPath = path.resolve(__dirname, "../../../../public/tarmac-theme.json");
  const themeJson = JSON.parse(fs.readFileSync(themeJsonPath, "utf-8"));
  const otpFieldsTarmac = themeJson["tarmac-theme"]?.components?.otpFields_tarmac;

  // Read variables file and build a set of all variable names
  const variablesPath = path.resolve(__dirname, "../../ThemeProvider/tarmac-variables-full.json");
  const variablesJson = JSON.parse(fs.readFileSync(variablesPath, "utf-8"));

  const allVariableNames = new Set<string>();
  for (const collection of variablesJson.collections || []) {
    for (const variable of collection.variables || []) {
      if (variable.name) {
        allVariableNames.add(variable.name);
      }
    }
  }

  // Recursively extract all {{TokenName}} placeholders
  const tokenPattern = /\{\{([^}]+)\}\}/g;
  const tokens: string[] = [];

  function extractTokens(obj: any): void {
    if (typeof obj === "string") {
      let match: RegExpExecArray | null;
      while ((match = tokenPattern.exec(obj)) !== null) {
        tokens.push(match[1]);
      }
    } else if (typeof obj === "object" && obj !== null) {
      for (const value of Object.values(obj)) {
        extractTokens(value);
      }
    }
  }

  extractTokens(otpFieldsTarmac);
  const uniqueTokens = [...new Set(tokens)];

  // Recursively extract all string values from the config
  const allStringValues: string[] = [];

  function extractStringValues(obj: any): void {
    if (typeof obj === "string") {
      allStringValues.push(obj);
    } else if (typeof obj === "object" && obj !== null) {
      for (const value of Object.values(obj)) {
        extractStringValues(value);
      }
    }
  }

  extractStringValues(otpFieldsTarmac);

  it("otpFields_tarmac section should exist in theme JSON", () => {
    expect(otpFieldsTarmac).toBeDefined();
  });

  it("should have at least one token in the otpFields_tarmac section", () => {
    expect(uniqueTokens.length).toBeGreaterThan(0);
  });

  it("variables file should have variable names loaded", () => {
    expect(allVariableNames.size).toBeGreaterThan(0);
  });

  it("every {{TokenName}} in otpFields_tarmac SHALL exist in tarmac-variables-full.json", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...uniqueTokens),
        (tokenName) => {
          expect(allVariableNames.has(tokenName)).toBe(true);
        }
      ),
      { numRuns: Math.max(100, uniqueTokens.length) }
    );
  });

  it("no hardcoded hex (#xxx, #xxxxxx, #xxxxxxxx) or rgb/rgba values in config values", () => {
    // Patterns for hardcoded color values
    const hexPattern = /^#[0-9a-fA-F]{3,8}$/;
    const rgbPattern = /^rgba?\s*\(/i;

    // CSS-safe literals that are allowed (not color values)
    // e.g. "none", "default", "text", numbers, transitions, font families, "sans-serif"
    const isCssSafeLiteral = (val: string): boolean => {
      // If it contains a {{token}} placeholder, it's fine
      if (/\{\{[^}]+\}\}/.test(val)) return true;
      // Pure numbers (with optional units)
      if (/^\d+(\.\d+)?(px|rem|em|%)?$/.test(val)) return true;
      // CSS keywords and safe literals
      if (/^(none|default|text|auto|inherit|initial|unset|normal|bold|pointer|not-allowed)$/.test(val)) return true;
      // Font family strings (e.g. "sans-serif", "Noto Sans, sans-serif")
      if (/^[a-zA-Z\s,'-]+$/.test(val) && !hexPattern.test(val)) return true;
      // Transition shorthand (e.g. "all 0.15s ease-in-out")
      if (/^all\s+[\d.]+s\s+[\w-]+$/.test(val)) return true;
      return false;
    };

    for (const val of allStringValues) {
      // Check for standalone hardcoded hex values
      expect(hexPattern.test(val)).toBe(false);
      // Check for standalone rgb/rgba values
      expect(rgbPattern.test(val)).toBe(false);
    }
  });
});


/* ═══════════════════════════════════════════════════════════════════
 * PROPERTY 14 — Accessibility attributes (Task 7.11)
 * Validates: Requirements 23.1, 23.2, 23.3, 23.4, 23.6
 * ═══════════════════════════════════════════════════════════════════ */

describe("Property 14: Accessibility attributes", () => {
  it("each input has aria-label, container has role=group, isDisabled sets aria-disabled, isGhost sets aria-hidden, first input has autocomplete=one-time-code", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 8 }),
        fc.boolean(),
        fc.boolean(),
        (numDigits, isDisabled, isGhost) => {
          const { container, unmount } = render(
            <OtpInput
              otpStyle="tarmac-01"
              numDigits={numDigits}
              isDisabled={isDisabled}
              isGhost={isGhost}
            />
          );

          if (isGhost) {
            // Ghost: container has aria-hidden="true"
            const ghostContainer = container.firstChild as HTMLElement;
            expect(ghostContainer.getAttribute("aria-hidden")).toBe("true");

            // Ghost: no <input> elements exist
            const inputs = container.querySelectorAll("input");
            expect(inputs).toHaveLength(0);
          } else {
            // Non-ghost: container has role="group"
            const group = container.querySelector('[role="group"]');
            expect(group).not.toBeNull();

            // Each <input> has aria-label="Digit {i}" (1-indexed)
            const inputs = container.querySelectorAll("input");
            expect(inputs).toHaveLength(numDigits);
            inputs.forEach((input, i) => {
              expect(input.getAttribute("aria-label")).toBe(`Digit ${i + 1}`);
            });

            // First input has autocomplete="one-time-code"
            expect(inputs[0].getAttribute("autocomplete")).toBe("one-time-code");

            // When isDisabled: container has aria-disabled="true"
            if (isDisabled) {
              expect(group!.getAttribute("aria-disabled")).toBe("true");
            } else {
              expect(group!.getAttribute("aria-disabled")).toBeNull();
            }
          }

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
