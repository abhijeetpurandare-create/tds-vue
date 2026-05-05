import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox, { CheckboxGroup } from "../index";

// Mock ThemeProvider — provide checkbox_tarmac config so the Tarmac rendering
// path is exercised when tarmacVariant is passed. Legacy tests (no tarmacVariant)
// still use the legacy path because the component only enters Tarmac branch
// when both tarmacVariant AND config exist.
const tarmacConfig = {
  base: {
    transition: "all 0.15s ease-in-out",
    borderWidth: "1px",
    radius: { box: "2px", rounded: "999px" },
    focus: { outline: "none", ring: "0 0 0 2px rgba(0,0,0,0.4)" },
    label: { fontFamily: "Noto Sans, sans-serif", color: "#2b2b2b" },
    subtext: { fontFamily: "Noto Sans, sans-serif", color: "#454545" },
  },
  variants: {
    standard: {
      borderColor: "#e6e6e6",
      hoverBorderColor: "#cccccc",
      checkedBackgroundColor: "#000000",
      checkedBorderColor: "#000000",
      checkmarkColor: "#ffffff",
      focusRingColor: "rgba(0,0,0,0.4)",
    },
    blue: {
      borderColor: "#91cafd",
      checkedBackgroundColor: "#2396fb",
      checkedBorderColor: "#2396fb",
      checkmarkColor: "#ffffff",
    },
    green: {
      borderColor: "#8dd3b6",
      checkedBackgroundColor: "#1ba86e",
      checkedBorderColor: "#1ba86e",
      checkmarkColor: "#ffffff",
    },
    dlv_red: {
      borderColor: "#ed899d",
      checkedBackgroundColor: "#ed1b36",
      checkedBorderColor: "#ed1b36",
      checkmarkColor: "#ffffff",
    },
  },
  sizes: {
    lg: { boxSize: "24px", gap: "8px", labelFontSize: "16px" },
    md: { boxSize: "20px", gap: "6px", labelFontSize: "14px" },
    sm: { boxSize: "16px", gap: "4px", labelFontSize: "12px" },
  },
  states: {
    disabled: { borderColor: "#ededed", checkmarkColor: "#cdcbcb", labelColor: "#cdcbcb" },
  },
};

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: { components: { checkbox_tarmac: tarmacConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

/* ═══════════════════════════════════════════════════════════════════
 * LEGACY CHECKBOX — backward compatibility tests
 * These verify that the existing API still works identically after
 * the Tarmac code was added. No tarmacVariant = legacy path.
 * ═══════════════════════════════════════════════════════════════════ */
describe("Checkbox — Legacy (backward compatibility)", () => {
  // --- Rendering ---
  it("renders with children as label text", () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders without children (standalone checkbox)", () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector("label")).toBeInTheDocument();
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });

  it("renders a <label> wrapping a hidden <input type=checkbox>", () => {
    const { container } = render(<Checkbox>Label</Checkbox>);
    const label = container.querySelector("label");
    const input = container.querySelector('input[type="checkbox"]');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label!.contains(input)).toBe(true);
  });

  it("renders the checkbox icon span", () => {
    const { container } = render(<Checkbox>With icon</Checkbox>);
    // Legacy path renders: label > input + span(icon) + span(label)
    const spans = container.querySelectorAll("label > span");
    expect(spans.length).toBeGreaterThanOrEqual(1);
  });

  // --- Sizes ---
  it("renders size=sm without error", () => {
    const { unmount } = render(<Checkbox size="sm">Small</Checkbox>);
    expect(screen.getByText("Small")).toBeInTheDocument();
    unmount();
  });

  it("renders size=md without error", () => {
    const { unmount } = render(<Checkbox size="md">Medium</Checkbox>);
    expect(screen.getByText("Medium")).toBeInTheDocument();
    unmount();
  });

  it("renders size=lg without error", () => {
    const { unmount } = render(<Checkbox size="lg">Large</Checkbox>);
    expect(screen.getByText("Large")).toBeInTheDocument();
    unmount();
  });

  // --- Checked state ---
  it("supports controlled checked=true", () => {
    const { container } = render(<Checkbox checked={true}>On</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("supports controlled checked=false", () => {
    const { container } = render(<Checkbox checked={false}>Off</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  it("toggles controlled checked on rerender", () => {
    const { container, rerender } = render(<Checkbox checked={false}>Ctrl</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(false);
    rerender(<Checkbox checked={true}>Ctrl</Checkbox>);
    expect(input.checked).toBe(true);
    rerender(<Checkbox checked={false}>Ctrl</Checkbox>);
    expect(input.checked).toBe(false);
  });

  it("supports defaultChecked for uncontrolled mode", () => {
    const { container } = render(<Checkbox defaultChecked>Default on</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  // --- Indeterminate ---
  it("sets indeterminate on the native input", () => {
    const { container } = render(<Checkbox indeterminate>Partial</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  // --- Disabled ---
  it("disables the native input when disabled=true", () => {
    const { container } = render(<Checkbox disabled>Disabled</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("sets aria-disabled when disabled", () => {
    const { container } = render(<Checkbox disabled>Disabled</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.getAttribute("aria-disabled")).toBe("true");
  });

  // --- Events ---
  it("fires onChange with correct event shape when clicked", () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange}>Click me</Checkbox>);
    fireEvent.click(screen.getByText("Click me"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const evt = onChange.mock.calls[0][0];
    expect(evt.target.checked).toBe(true);
    expect(typeof evt.stopPropagation).toBe("function");
    expect(typeof evt.preventDefault).toBe("function");
  });

  it("does NOT fire onChange when disabled", () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} disabled>No click</Checkbox>);
    fireEvent.click(screen.getByText("No click"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("fires onClick handler", () => {
    const onClick = jest.fn();
    render(<Checkbox onClick={onClick}>Clickable</Checkbox>);
    fireEvent.click(screen.getByText("Clickable"));
    // onClick fires on the label — clicking child text bubbles, so ≥1 call
    expect(onClick).toHaveBeenCalled();
  });
  it("applies className prop", () => {
    const { container } = render(<Checkbox className="my-cb">Custom</Checkbox>);
    expect(container.querySelector(".my-cb")).toBeInTheDocument();
  });

  it("applies id to the input", () => {
    const { container } = render(<Checkbox id="terms-cb">Terms</Checkbox>);
    expect(container.querySelector("#terms-cb")).toBeInTheDocument();
  });

  it("applies name to the input", () => {
    const { container } = render(<Checkbox name="agree">Agree</Checkbox>);
    const input = container.querySelector('input[name="agree"]');
    expect(input).toBeInTheDocument();
  });

  it("applies value to the input", () => {
    const { container } = render(<Checkbox value="yes">Yes</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.value).toBe("yes");
  });

  it("applies tabIndex to the input", () => {
    const { container } = render(<Checkbox tabIndex={5}>Tab</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.tabIndex).toBe(5);
  });

  it("applies required to the input", () => {
    const { container } = render(<Checkbox required>Required</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it("applies title to the label", () => {
    const { container } = render(<Checkbox title="tooltip">Titled</Checkbox>);
    expect(container.querySelector('[title="tooltip"]')).toBeInTheDocument();
  });

  it("applies inline style", () => {
    const { container } = render(<Checkbox style={{ marginTop: 10 }}>Styled</Checkbox>);
    const label = container.querySelector("label") as HTMLElement;
    expect(label.style.marginTop).toBe("10px");
  });

  // --- Backward compat: legacy props still work after Tarmac additions ---
  it("ignores tarmacStyle when tarmacVariant is not set", () => {
    // tarmacStyle without tarmacVariant should render legacy path
    const { container } = render(<Checkbox tarmacStyle="rounded">Legacy still</Checkbox>);
    expect(screen.getByText("Legacy still")).toBeInTheDocument();
    // Legacy path uses Tailwind classes on the wrapper
    const label = container.querySelector("label");
    expect(label?.className).toContain("items-center");
  });

  it("ignores subtext when tarmacVariant is not set", () => {
    render(<Checkbox subtext="Should not show in legacy">Legacy</Checkbox>);
    expect(screen.getByText("Legacy")).toBeInTheDocument();
    // subtext is only rendered in the Tarmac path
    expect(screen.queryByText("Should not show in legacy")).not.toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════
 * TARMAC TDS CHECKBOX — new Tarmac rendering path tests
 * ═══════════════════════════════════════════════════════════════════ */
describe("Checkbox — Tarmac TDS", () => {
  // --- Basic rendering ---
  it("renders tarmac checkbox when tarmacVariant is set", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg">Tarmac Label</Checkbox>
    );
    expect(screen.getByText("Tarmac Label")).toBeInTheDocument();
    expect(container.querySelector("label")).toBeInTheDocument();
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });

  it("renders without label (checkbox-only)", () => {
    const { container } = render(<Checkbox tarmacVariant="green" size="md" />);
    expect(container.querySelector("label")).toBeInTheDocument();
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
    // No text wrapper span should be rendered — only the box span
    const directSpans = container.querySelectorAll("label > span");
    expect(directSpans.length).toBe(1); // just the box span (checkmark is nested inside)
  });

  // --- All 4 variants ---
  it("renders standard variant", () => {
    render(<Checkbox tarmacVariant="standard" size="lg">Standard</Checkbox>);
    expect(screen.getByText("Standard")).toBeInTheDocument();
  });

  it("renders blue variant", () => {
    render(<Checkbox tarmacVariant="blue" size="lg">Blue</Checkbox>);
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  it("renders green variant", () => {
    render(<Checkbox tarmacVariant="green" size="lg">Green</Checkbox>);
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  it("renders dlv_red variant", () => {
    render(<Checkbox tarmacVariant="dlv_red" size="lg">DLV Red</Checkbox>);
    expect(screen.getByText("DLV Red")).toBeInTheDocument();
  });

  // --- All 3 sizes ---
  it("renders size=sm", () => {
    const { unmount } = render(<Checkbox tarmacVariant="standard" size="sm">Sm</Checkbox>);
    expect(screen.getByText("Sm")).toBeInTheDocument();
    unmount();
  });

  it("renders size=md", () => {
    const { unmount } = render(<Checkbox tarmacVariant="standard" size="md">Md</Checkbox>);
    expect(screen.getByText("Md")).toBeInTheDocument();
    unmount();
  });

  it("renders size=lg", () => {
    const { unmount } = render(<Checkbox tarmacVariant="standard" size="lg">Lg</Checkbox>);
    expect(screen.getByText("Lg")).toBeInTheDocument();
    unmount();
  });

  // --- Both styles ---
  it("renders box style", () => {
    render(<Checkbox tarmacVariant="standard" tarmacStyle="box" size="lg">Box</Checkbox>);
    expect(screen.getByText("Box")).toBeInTheDocument();
  });

  it("renders rounded style", () => {
    render(<Checkbox tarmacVariant="standard" tarmacStyle="rounded" size="lg">Rounded</Checkbox>);
    expect(screen.getByText("Rounded")).toBeInTheDocument();
  });

  it("defaults to box style when tarmacStyle is not provided", () => {
    const { container } = render(<Checkbox tarmacVariant="standard" size="lg">Default style</Checkbox>);
    expect(container.querySelector("label")).toBeInTheDocument();
  });

  // --- All variant × style × size combos render without error ---
  it("renders all 24 variant × style × size combinations", () => {
    const variants = ["standard", "blue", "green", "dlv_red"] as const;
    const styles = ["box", "rounded"] as const;
    const sizes = ["sm", "md", "lg"] as const;
    variants.forEach((v) =>
      styles.forEach((st) =>
        sizes.forEach((sz) => {
          const { unmount } = render(
            <Checkbox tarmacVariant={v} tarmacStyle={st} size={sz}>
              {`${v}-${st}-${sz}`}
            </Checkbox>
          );
          expect(screen.getByText(`${v}-${st}-${sz}`)).toBeInTheDocument();
          unmount();
        })
      )
    );
  });

  // --- Checked state ---
  it("renders checked state with checked input", () => {
    const { container } = render(
      <Checkbox tarmacVariant="blue" size="lg" checked>Checked</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("renders unchecked state", () => {
    const { container } = render(
      <Checkbox tarmacVariant="blue" size="lg" checked={false}>Unchecked</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  // --- Indeterminate ---
  it("sets indeterminate on native input", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" indeterminate>Partial</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it("sets aria-checked=mixed for indeterminate", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" indeterminate>Partial</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.getAttribute("aria-checked")).toBe("mixed");
  });

  it("sets aria-checked=true for checked (not indeterminate)", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" checked>Checked</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    // aria-checked reflects the checked prop when not indeterminate
    expect(input.getAttribute("aria-checked")).toBe("true");
  });

  // --- Disabled ---
  it("disables the native input", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" disabled>Disabled</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("sets aria-disabled=true", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" disabled>Disabled</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.getAttribute("aria-disabled")).toBe("true");
  });

  it("renders disabled + checked combo", () => {
    const { container } = render(
      <Checkbox tarmacVariant="green" size="md" disabled checked>Dis+Chk</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.checked).toBe(true);
  });

  it("renders disabled + indeterminate combo", () => {
    const { container } = render(
      <Checkbox tarmacVariant="dlv_red" size="sm" disabled indeterminate>Dis+Ind</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.indeterminate).toBe(true);
  });

  // --- Events ---
  it("fires onChange when clicked", () => {
    const onChange = jest.fn();
    render(
      <Checkbox tarmacVariant="standard" size="lg" onChange={onChange}>Click</Checkbox>
    );
    fireEvent.click(screen.getByText("Click"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it("does NOT fire onChange when disabled", () => {
    const onChange = jest.fn();
    render(
      <Checkbox tarmacVariant="standard" size="lg" disabled onChange={onChange}>No</Checkbox>
    );
    fireEvent.click(screen.getByText("No"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("fires onClick handler", () => {
    const onClick = jest.fn();
    render(
      <Checkbox tarmacVariant="blue" size="md" onClick={onClick}>Clickable</Checkbox>
    );
    fireEvent.click(screen.getByText("Clickable"));
    // onClick fires on the label — clicking child text bubbles, so ≥1 call
    expect(onClick).toHaveBeenCalled();
  });

  // --- Subtext ---
  it("renders subtext below the label", () => {
    render(
      <Checkbox tarmacVariant="standard" size="lg" subtext="Helper text">Label</Checkbox>
    );
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("renders subtext without label", () => {
    render(
      <Checkbox tarmacVariant="standard" size="lg" subtext="Only subtext" />
    );
    expect(screen.getByText("Only subtext")).toBeInTheDocument();
  });

  it("does not render subtext wrapper when neither children nor subtext", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" />
    );
    // Only box span, no text wrapper
    const directSpans = container.querySelectorAll("label > span");
    expect(directSpans.length).toBe(1); // just the box span
  });

  // --- HTML attributes pass through ---
  it("applies className", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" className="custom-tarmac">Styled</Checkbox>
    );
    expect(container.querySelector(".custom-tarmac")).toBeInTheDocument();
  });

  it("applies id to the input", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" id="tarmac-cb">ID</Checkbox>
    );
    expect(container.querySelector("#tarmac-cb")).toBeInTheDocument();
  });

  it("applies name to the input", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" name="tarmac-name">Named</Checkbox>
    );
    expect(container.querySelector('input[name="tarmac-name"]')).toBeInTheDocument();
  });

  it("applies value to the input", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" value="tval">Val</Checkbox>
    );
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.value).toBe("tval");
  });

  it("applies title to the label", () => {
    const { container } = render(
      <Checkbox tarmacVariant="standard" size="lg" title="tip">Tip</Checkbox>
    );
    expect(container.querySelector('[title="tip"]')).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════
 * CHECKBOX GROUP — tests for the group component
 * ═══════════════════════════════════════════════════════════════════ */
describe("CheckboxGroup", () => {
  it("renders string options as checkboxes", () => {
    render(<CheckboxGroup options={["Apple", "Banana", "Cherry"]} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  it("renders number options", () => {
    render(<CheckboxGroup options={[1, 2, 3]} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders object options with label and value", () => {
    render(
      <CheckboxGroup
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
        ]}
      />
    );
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it("fires onChange with selected values on check", () => {
    const onChange = jest.fn();
    render(<CheckboxGroup options={["A", "B"]} onChange={onChange} />);
    fireEvent.click(screen.getByText("A"));
    expect(onChange).toHaveBeenCalledWith(["A"]);
  });

  it("fires onChange with accumulated values on multiple checks", () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <CheckboxGroup options={["A", "B", "C"]} value={["A"]} onChange={onChange} />
    );
    fireEvent.click(screen.getByText("B"));
    expect(onChange).toHaveBeenCalledWith(["A", "B"]);
  });

  it("fires onChange removing value on uncheck", () => {
    const onChange = jest.fn();
    render(
      <CheckboxGroup options={["A", "B"]} value={["A", "B"]} onChange={onChange} />
    );
    fireEvent.click(screen.getByText("A"));
    expect(onChange).toHaveBeenCalledWith(["B"]);
  });

  it("supports controlled value", () => {
    const { container } = render(
      <CheckboxGroup options={["X", "Y"]} value={["X"]} />
    );
    const inputs = container.querySelectorAll('input[type="checkbox"]');
    expect((inputs[0] as HTMLInputElement).checked).toBe(true);
    expect((inputs[1] as HTMLInputElement).checked).toBe(false);
  });

  it("supports defaultValue for uncontrolled mode", () => {
    const { container } = render(
      <CheckboxGroup options={["X", "Y"]} defaultValue={["Y"]} />
    );
    const inputs = container.querySelectorAll('input[type="checkbox"]');
    expect((inputs[0] as HTMLInputElement).checked).toBe(false);
    expect((inputs[1] as HTMLInputElement).checked).toBe(true);
  });

  it("disables all checkboxes when group is disabled", () => {
    const onChange = jest.fn();
    render(<CheckboxGroup options={["A", "B"]} disabled onChange={onChange} />);
    fireEvent.click(screen.getByText("A"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disables individual options via option.disabled", () => {
    const onChange = jest.fn();
    render(
      <CheckboxGroup
        options={[
          { label: "Enabled", value: "e" },
          { label: "Disabled", value: "d", disabled: true },
        ]}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByText("Disabled"));
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText("Enabled"));
    expect(onChange).toHaveBeenCalledWith(["e"]);
  });

  it("renders children instead of options when both provided", () => {
    render(
      <CheckboxGroup>
        <Checkbox value="custom">Custom child</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getByText("Custom child")).toBeInTheDocument();
  });

  it("applies className to the group wrapper", () => {
    const { container } = render(
      <CheckboxGroup options={["A"]} className="my-group" />
    );
    expect(container.querySelector(".my-group")).toBeInTheDocument();
  });

  it("renders with role=group", () => {
    const { container } = render(<CheckboxGroup options={["A"]} />);
    expect(container.querySelector('[role="group"]')).toBeInTheDocument();
  });

  it("sets aria-orientation=horizontal by default", () => {
    const { container } = render(<CheckboxGroup options={["A"]} />);
    expect(container.querySelector('[aria-orientation="horizontal"]')).toBeInTheDocument();
  });

  it("sets aria-orientation=vertical when vertical=true", () => {
    const { container } = render(<CheckboxGroup options={["A"]} vertical />);
    expect(container.querySelector('[aria-orientation="vertical"]')).toBeInTheDocument();
  });

  it("sets aria-orientation=vertical when orientation=vertical", () => {
    const { container } = render(<CheckboxGroup options={["A"]} orientation="vertical" />);
    expect(container.querySelector('[aria-orientation="vertical"]')).toBeInTheDocument();
  });

  it("passes size to child checkboxes", () => {
    const { container } = render(
      <CheckboxGroup options={["A"]} size="lg" />
    );
    // Just verify it renders without error
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
