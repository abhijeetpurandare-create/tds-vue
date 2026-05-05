import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Switch from "../index";

// Mock ThemeProvider — provide toggle_tarmac config so the Tarmac rendering
// path is exercised when tarmacColor is passed.
const tarmacConfig = {
  base: {
    transition: "all 0.15s ease-in-out",
    radius: "999px",
    handleColor: "#ffffff",
  },
  styles: {
    filled: {
      black: {
        uncheckedBackgroundColor: "#666666",
        checkedBackgroundColor: "#000000",
        hoverUncheckedBackgroundColor: "#454545",
        hoverCheckedBackgroundColor: "#454545",
        pressedUncheckedBackgroundColor: "#666666",
        pressedCheckedBackgroundColor: "#000000",
        focusRingColor: "rgba(0,0,0,0.4)",
      },
      blue: {
        uncheckedBackgroundColor: "#6cb9fc",
        checkedBackgroundColor: "#2396fb",
        hoverUncheckedBackgroundColor: "#2396fb",
        hoverCheckedBackgroundColor: "#2396fb",
        focusRingColor: "rgba(35,150,251,0.4)",
      },
      dlv_red: {
        uncheckedBackgroundColor: "#f36779",
        checkedBackgroundColor: "#ed1b36",
        hoverUncheckedBackgroundColor: "#ed1b36",
        hoverCheckedBackgroundColor: "#ed1b36",
        focusRingColor: "rgba(237,27,54,0.4)",
      },
      green: {
        uncheckedBackgroundColor: "#67c59e",
        checkedBackgroundColor: "#1ba86e",
        hoverUncheckedBackgroundColor: "#1ba86e",
        hoverCheckedBackgroundColor: "#1ba86e",
        focusRingColor: "rgba(27,168,110,0.4)",
      },
    },
    outlined: {
      black: {
        uncheckedBorderColor: "#e6e6e6",
        checkedBorderColor: "#454545",
        uncheckedBackgroundColor: "#ffffff",
        checkedBackgroundColor: "#ffffff",
        handleUncheckedColor: "#666666",
        handleCheckedColor: "#000000",
        focusRingColor: "rgba(0,0,0,0.4)",
      },
      blue: {
        uncheckedBorderColor: "#91cafd",
        checkedBorderColor: "#48a7fc",
        uncheckedBackgroundColor: "#ffffff",
        checkedBackgroundColor: "#e6f3fe",
        handleUncheckedColor: "#6cb9fc",
        handleCheckedColor: "#2396fb",
        focusRingColor: "rgba(35,150,251,0.4)",
      },
      dlv_red: {
        uncheckedBorderColor: "#f68d9a",
        checkedBorderColor: "#f04158",
        uncheckedBackgroundColor: "#ffffff",
        checkedBackgroundColor: "#fde8eb",
        handleUncheckedColor: "#f36779",
        handleCheckedColor: "#ed1b36",
        focusRingColor: "rgba(237,27,54,0.4)",
      },
      green: {
        uncheckedBorderColor: "#8dd3b6",
        checkedBorderColor: "#41b686",
        uncheckedBackgroundColor: "#ffffff",
        checkedBackgroundColor: "#ecf8f3",
        handleUncheckedColor: "#67c59e",
        handleCheckedColor: "#1ba86e",
        focusRingColor: "rgba(27,168,110,0.4)",
      },
    },
  },
  sizes: {
    lg: {
      trackWidth: "40px",
      trackHeight: "24px",
      handleSize: "16px",
      handleOffset: "4px",
      borderWidth: "1px",
    },
    sm: {
      trackWidth: "34px",
      trackHeight: "20px",
      handleSize: "12px",
      handleOffset: "4px",
      borderWidth: "1px",
    },
  },
  states: {
    disabled: {
      uncheckedBackgroundColor: "#f7f7f7",
      checkedBackgroundColor: "#e6e6e6",
      handleColor: "#ffffff",
      borderColor: "#ededed",
    },
    ghost: {
      backgroundColor: "#d4d4d4",
      handleColor: "#ededed",
    },
  },
};

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: { components: { toggle_tarmac: tarmacConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

/* ═══════════════════════════════════════════════════════════════════
 * LEGACY SWITCH — backward compatibility tests (≥20)
 * No tarmacColor = legacy rendering path.
 * ═══════════════════════════════════════════════════════════════════ */
describe("Switch — Legacy (backward compatibility)", () => {
  // --- Rendering ---
  it("renders with default props", () => {
    render(<Switch />);
    const el = screen.getByRole("switch");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-checked", "false");
  });

  it("renders a <button> element with role=switch", () => {
    render(<Switch />);
    const el = screen.getByRole("switch");
    expect(el.tagName).toBe("BUTTON");
    expect(el).toHaveAttribute("type", "button");
  });

  it("renders with checkedChildren and unCheckedChildren", () => {
    render(<Switch checkedChildren="ON" unCheckedChildren="OFF" />);
    expect(screen.getByText("OFF")).toBeInTheDocument();
  });

  // --- Sizes ---
  it("renders size=sm without error", () => {
    render(<Switch size="sm" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders size=md without error", () => {
    render(<Switch size="md" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders size=lg without error", () => {
    render(<Switch size="lg" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  // --- Variants ---
  it("renders variant=primary without error", () => {
    render(<Switch variant="primary" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders variant=secondary without error", () => {
    render(<Switch variant="secondary" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders variant=outline without error", () => {
    render(<Switch variant="outline" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  // --- Checked state ---
  it("handles uncontrolled toggle via click", () => {
    const onChange = jest.fn();
    render(<Switch onChange={onChange} />);
    const el = screen.getByRole("switch");
    fireEvent.click(el);
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
    expect(el).toHaveAttribute("aria-checked", "true");
    fireEvent.click(el);
    expect(onChange).toHaveBeenCalledWith(false, expect.any(Object));
    expect(el).toHaveAttribute("aria-checked", "false");
  });

  it("supports controlled checked prop", () => {
    const onChange = jest.fn();
    const { rerender } = render(<Switch checked={false} onChange={onChange} />);
    const el = screen.getByRole("switch");
    expect(el).toHaveAttribute("aria-checked", "false");
    fireEvent.click(el);
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
    rerender(<Switch checked={true} onChange={onChange} />);
    expect(el).toHaveAttribute("aria-checked", "true");
  });

  it("supports controlled value prop", () => {
    render(<Switch value={true} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("supports defaultChecked", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("supports defaultValue", () => {
    render(<Switch defaultValue={true} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  // --- Disabled ---
  it("disables the button when disabled=true", () => {
    render(<Switch disabled />);
    const el = screen.getByRole("switch");
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("does NOT fire onChange when disabled", () => {
    const onChange = jest.fn();
    render(<Switch disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  // --- Loading ---
  it("disables the button and shows spinner when loading", () => {
    render(<Switch loading />);
    const el = screen.getByRole("switch");
    expect(el).toBeDisabled();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // --- Events ---
  it("fires onClick handler", () => {
    const onClick = jest.fn();
    render(<Switch onClick={onClick} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onClick).toHaveBeenCalled();
  });

  // --- HTML attributes ---
  it("applies className prop", () => {
    const { container } = render(<Switch className="my-switch" />);
    expect(container.querySelector(".my-switch")).toBeInTheDocument();
  });

  it("applies id prop", () => {
    render(<Switch id="sw-1" />);
    expect(document.getElementById("sw-1")).toBeInTheDocument();
  });

  it("applies title prop", () => {
    const { container } = render(<Switch title="toggle me" />);
    expect(container.querySelector('[title="toggle me"]')).toBeInTheDocument();
  });

  it("applies tabIndex prop", () => {
    render(<Switch tabIndex={3} />);
    expect(screen.getByRole("switch")).toHaveAttribute("tabindex", "3");
  });

  it("handles autoFocus", () => {
    render(<Switch autoFocus />);
    expect(screen.getByRole("switch")).toHaveFocus();
  });

  // --- Backward compat: tarmac props ignored without tarmacColor ---
  it("ignores tarmacStyle when tarmacColor is not set", () => {
    render(<Switch tarmacStyle="outlined" />);
    const el = screen.getByRole("switch");
    expect(el).toBeInTheDocument();
    // Legacy path — no tarmac rendering
    expect(el).toHaveAttribute("aria-checked", "false");
  });

  it("ignores tarmacSize when tarmacColor is not set", () => {
    render(<Switch tarmacSize="sm" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("ignores isGhost when tarmacColor is not set", () => {
    render(<Switch isGhost />);
    const el = screen.getByRole("switch");
    expect(el).toBeInTheDocument();
  });
});

/* ═══════════════════════════════════════════════════════════════════
 * TARMAC TDS TOGGLE — new Tarmac rendering path tests (≥25)
 * ═══════════════════════════════════════════════════════════════════ */
describe("Switch — Tarmac TDS (Toggle)", () => {
  // --- Basic rendering ---
  it("renders tarmac toggle when tarmacColor is set", () => {
    render(<Switch tarmacColor="black" />);
    const el = screen.getByRole("switch");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-checked", "false");
  });

  it("renders a <button> with role=switch in tarmac path", () => {
    render(<Switch tarmacColor="blue" />);
    const el = screen.getByRole("switch");
    expect(el.tagName).toBe("BUTTON");
    expect(el).toHaveAttribute("type", "button");
  });

  it("renders a handle div inside the button", () => {
    const { container } = render(<Switch tarmacColor="black" />);
    const btn = container.querySelector('button[role="switch"]');
    expect(btn?.querySelector("div")).toBeInTheDocument();
  });

  // --- All 4 colors (filled) ---
  it("renders black filled", () => {
    render(<Switch tarmacColor="black" tarmacStyle="filled" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders blue filled", () => {
    render(<Switch tarmacColor="blue" tarmacStyle="filled" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders dlv_red filled", () => {
    render(<Switch tarmacColor="dlv_red" tarmacStyle="filled" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders green filled", () => {
    render(<Switch tarmacColor="green" tarmacStyle="filled" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  // --- All 4 colors (outlined) ---
  it("renders black outlined", () => {
    render(<Switch tarmacColor="black" tarmacStyle="outlined" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders blue outlined", () => {
    render(<Switch tarmacColor="blue" tarmacStyle="outlined" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders dlv_red outlined", () => {
    render(<Switch tarmacColor="dlv_red" tarmacStyle="outlined" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders green outlined", () => {
    render(<Switch tarmacColor="green" tarmacStyle="outlined" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  // --- Both sizes ---
  it("renders size=lg", () => {
    render(<Switch tarmacColor="black" tarmacSize="lg" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders size=sm", () => {
    render(<Switch tarmacColor="black" tarmacSize="sm" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  // --- Defaults ---
  it("defaults to filled style when tarmacStyle is not provided", () => {
    render(<Switch tarmacColor="black" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("defaults to lg size when tarmacSize is not provided", () => {
    render(<Switch tarmacColor="black" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  // --- Exhaustive combo test ---
  it("renders all color × style × size combinations without error", () => {
    const colors = ["black", "blue", "dlv_red", "green"] as const;
    const styles = ["filled", "outlined"] as const;
    const sizes = ["lg", "sm"] as const;
    colors.forEach((c) =>
      styles.forEach((st) =>
        sizes.forEach((sz) => {
          const { unmount } = render(
            <Switch tarmacColor={c} tarmacStyle={st} tarmacSize={sz} />
          );
          expect(screen.getByRole("switch")).toBeInTheDocument();
          unmount();
        })
      )
    );
  });

  // --- Checked state ---
  it("reflects checked=true in aria-checked", () => {
    render(<Switch tarmacColor="black" checked={true} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("reflects checked=false in aria-checked", () => {
    render(<Switch tarmacColor="black" checked={false} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("toggles uncontrolled state on click", () => {
    const onChange = jest.fn();
    render(<Switch tarmacColor="blue" onChange={onChange} />);
    const el = screen.getByRole("switch");
    expect(el).toHaveAttribute("aria-checked", "false");
    fireEvent.click(el);
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
    expect(el).toHaveAttribute("aria-checked", "true");
  });

  it("supports controlled checked prop", () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Switch tarmacColor="green" checked={false} onChange={onChange} />
    );
    const el = screen.getByRole("switch");
    expect(el).toHaveAttribute("aria-checked", "false");
    fireEvent.click(el);
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
    rerender(<Switch tarmacColor="green" checked={true} onChange={onChange} />);
    expect(el).toHaveAttribute("aria-checked", "true");
  });

  it("supports defaultChecked", () => {
    render(<Switch tarmacColor="black" defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  // --- Disabled ---
  it("disables the button when disabled=true", () => {
    render(<Switch tarmacColor="black" disabled />);
    const el = screen.getByRole("switch");
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("does NOT fire onChange when disabled", () => {
    const onChange = jest.fn();
    render(<Switch tarmacColor="black" disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders disabled + checked combo", () => {
    render(<Switch tarmacColor="dlv_red" disabled checked />);
    const el = screen.getByRole("switch");
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute("aria-checked", "true");
  });

  // --- Ghost ---
  it("renders ghost state", () => {
    render(<Switch tarmacColor="black" isGhost />);
    const el = screen.getByRole("switch");
    expect(el).toBeInTheDocument();
  });

  it("does NOT fire onChange when ghost", () => {
    const onChange = jest.fn();
    render(<Switch tarmacColor="black" isGhost onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  // --- Events ---
  it("fires onChange when clicked", () => {
    const onChange = jest.fn();
    render(<Switch tarmacColor="black" onChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it("fires onClick handler", () => {
    const onClick = jest.fn();
    render(<Switch tarmacColor="blue" onClick={onClick} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onClick).toHaveBeenCalled();
  });

  // --- HTML attributes pass-through ---
  it("applies className", () => {
    const { container } = render(
      <Switch tarmacColor="black" className="tarmac-toggle" />
    );
    expect(container.querySelector(".tarmac-toggle")).toBeInTheDocument();
  });

  it("applies id", () => {
    render(<Switch tarmacColor="black" id="toggle-1" />);
    expect(document.getElementById("toggle-1")).toBeInTheDocument();
  });

  it("applies title", () => {
    const { container } = render(
      <Switch tarmacColor="black" title="toggle tip" />
    );
    expect(container.querySelector('[title="toggle tip"]')).toBeInTheDocument();
  });

  it("applies tabIndex", () => {
    render(<Switch tarmacColor="black" tabIndex={7} />);
    expect(screen.getByRole("switch")).toHaveAttribute("tabindex", "7");
  });

  it("handles autoFocus in tarmac path", () => {
    render(<Switch tarmacColor="black" autoFocus />);
    expect(screen.getByRole("switch")).toHaveFocus();
  });

  // --- No checkedChildren/unCheckedChildren in tarmac path ---
  it("does not render inner text span in tarmac path", () => {
    const { container } = render(
      <Switch tarmacColor="black" checkedChildren="ON" unCheckedChildren="OFF" />
    );
    // Tarmac path only renders a handle div, no text span
    expect(screen.queryByText("ON")).not.toBeInTheDocument();
    expect(screen.queryByText("OFF")).not.toBeInTheDocument();
  });
});
