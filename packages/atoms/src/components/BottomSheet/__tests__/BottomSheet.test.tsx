import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import BottomSheet from "../index";

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: {
      components: {
        bottomSheet: {
          base: {
            backgroundColor: "#ffffff",
            borderRadius: "6",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            fontFamily: "Noto Sans, sans-serif",
            titleFontSize: "14",
            titleLineHeight: "20",
            titleColor: "#2b2b2b",
            subtextFontSize: "12",
            subtextColor: "#454545",
            padding: "12",
            headerGap: "8",
            iconSize: "20",
          },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

let rafCallbacks: FrameRequestCallback[];

function flushRAF() {
  for (let i = 0; i < 4 && rafCallbacks.length > 0; i++) {
    const cbs = [...rafCallbacks];
    rafCallbacks = [];
    cbs.forEach((cb) => cb(performance.now()));
  }
}

beforeEach(() => {
  jest.useFakeTimers();
  rafCallbacks = [];
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    rafCallbacks.push(cb);
    return rafCallbacks.length;
  });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
});
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("BottomSheet — Legacy (backward compatibility)", () => {
  it("renders when isOpen is true", () => {
    render(<BottomSheet isOpen><div>Content</div></BottomSheet>);
    act(() => { flushRAF(); });
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("removes from DOM after close animation completes", () => {
    render(<BottomSheet isOpen={false}><div>Gone</div></BottomSheet>);
    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.queryByText("Gone")).not.toBeInTheDocument();
  });

  it("renders children as body content", () => {
    render(<BottomSheet isOpen><p>Hello world</p></BottomSheet>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    const onClose = jest.fn();
    render(<BottomSheet isOpen onClose={onClose}><div>Content</div></BottomSheet>);
    fireEvent.click(screen.getByTestId("mobilesheet-overlay"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders close button when cancellable is true (default)", () => {
    render(<BottomSheet isOpen><div>Content</div></BottomSheet>);
    expect(screen.getByTestId("bottomsheet-close")).toBeInTheDocument();
  });

  it("hides close button when cancellable is false", () => {
    render(<BottomSheet isOpen cancellable={false}><div>Content</div></BottomSheet>);
    expect(screen.queryByTestId("bottomsheet-close")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<BottomSheet isOpen onClose={onClose}><div>Content</div></BottomSheet>);
    fireEvent.click(screen.getByTestId("bottomsheet-close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("applies custom className to wrapper panel", () => {
    render(<BottomSheet isOpen className="my-custom"><div>Content</div></BottomSheet>);
    expect(screen.getByTestId("mobilesheet-panel").className).toContain("my-custom");
  });

  it("applies custom inline style", () => {
    render(<BottomSheet isOpen style={{ maxHeight: "50vh" }}><div>Content</div></BottomSheet>);
    expect(screen.getByTestId("mobilesheet-panel")).toHaveStyle({ maxHeight: "50vh" });
  });

  it("has role=dialog and aria-modal=true", () => {
    render(<BottomSheet isOpen><div>Content</div></BottomSheet>);
    const panel = screen.getByTestId("mobilesheet-panel");
    expect(panel).toHaveAttribute("role", "dialog");
    expect(panel).toHaveAttribute("aria-modal", "true");
  });

  it("close button has aria-label", () => {
    render(<BottomSheet isOpen><div>Content</div></BottomSheet>);
    expect(screen.getByTestId("bottomsheet-close")).toHaveAttribute("aria-label", "Close bottom sheet");
  });

  it("handles swipe-down gesture to close", () => {
    const onClose = jest.fn();
    render(<BottomSheet isOpen onClose={onClose}><div>Content</div></BottomSheet>);
    const panel = screen.getByTestId("mobilesheet-panel");
    fireEvent.touchStart(panel, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 100 }] });
    fireEvent.touchEnd(panel);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on small swipe", () => {
    const onClose = jest.fn();
    render(<BottomSheet isOpen onClose={onClose}><div>Content</div></BottomSheet>);
    const panel = screen.getByTestId("mobilesheet-panel");
    fireEvent.touchStart(panel, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 20 }] });
    fireEvent.touchEnd(panel);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("applies crossButtonStyle to close button", () => {
    render(<BottomSheet isOpen crossButtonStyle={{ color: "red" }}><div>Content</div></BottomSheet>);
    expect(screen.getByTestId("bottomsheet-close")).toHaveStyle({ color: "red" });
  });
});

describe("BottomSheet — Tarmac TDS", () => {
  it("renders title in header", () => {
    render(<BottomSheet isOpen title="My Title"><div>Body</div></BottomSheet>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders subtext in header", () => {
    render(<BottomSheet isOpen title="Title" subtext="Sub"><div>Body</div></BottomSheet>);
    expect(screen.getByText("Sub")).toBeInTheDocument();
  });

  it("hides header when showHeader is false", () => {
    render(<BottomSheet isOpen showHeader={false}><div>Body</div></BottomSheet>);
    expect(screen.queryByTestId("bottomsheet-header")).not.toBeInTheDocument();
  });

  it("renders headerIcon", () => {
    render(<BottomSheet isOpen headerIcon={<span data-testid="hdr-icon">IC</span>}><div>Body</div></BottomSheet>);
    expect(screen.getByTestId("hdr-icon")).toBeInTheDocument();
  });

  it("renders snackbar slot", () => {
    render(<BottomSheet isOpen snackbar={<div data-testid="snack">Alert</div>}><div>Body</div></BottomSheet>);
    expect(screen.getByTestId("snack")).toBeInTheDocument();
  });

  it("renders bodyTitle and bodyDescription", () => {
    render(<BottomSheet isOpen bodyTitle="BT" bodyDescription="BD" />);
    expect(screen.getByText("BT")).toBeInTheDocument();
    expect(screen.getByText("BD")).toBeInTheDocument();
  });

  it("renders custom illustration via illustration prop", () => {
    render(<BottomSheet isOpen illustration={<img data-testid="custom-ill" alt="" />} bodyTitle="T" />);
    expect(screen.getByTestId("custom-ill")).toBeInTheDocument();
  });

  it("renders built-in illustration via illustrationType", () => {
    render(<BottomSheet isOpen illustrationType="success" bodyTitle="T" />);
    expect(screen.getByTestId("bottomsheet-illustration")).toBeInTheDocument();
  });

  it("prefers illustration prop over illustrationType", () => {
    render(<BottomSheet isOpen illustration={<span data-testid="custom">C</span>} illustrationType="error" bodyTitle="T" />);
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    expect(screen.getAllByTestId("bottomsheet-illustration")).toHaveLength(1);
  });

  it("renders checkboxContent", () => {
    render(<BottomSheet isOpen checkboxContent={<label data-testid="cb">Check</label>} bodyTitle="T" />);
    expect(screen.getByTestId("cb")).toBeInTheDocument();
  });

  it("renders footer with horizontal layout by default", () => {
    render(<BottomSheet isOpen footer={<button>OK</button>} bodyTitle="T" />);
    expect(screen.getByTestId("bottomsheet-footer")).toBeInTheDocument();
  });

  it("renders footer with vertical layout", () => {
    render(<BottomSheet isOpen ctaStyle="vertical" footer={<button>OK</button>} bodyTitle="T" />);
    expect(screen.getByTestId("bottomsheet-footer")).toBeInTheDocument();
  });

  it("does not render footer when not provided", () => {
    render(<BottomSheet isOpen bodyTitle="T" />);
    expect(screen.queryByTestId("bottomsheet-footer")).not.toBeInTheDocument();
  });

  it("renders slot content for slotMini type", () => {
    render(<BottomSheet isOpen sheetType="slotMini" slotContent={<div data-testid="slot-c">Slot</div>} />);
    expect(screen.getByTestId("slot-c")).toBeInTheDocument();
  });

  it("renders slot content for slotDual type", () => {
    render(<BottomSheet isOpen sheetType="slotDual" slotContent={<div data-testid="slot-c">Slot</div>} slotHeader={<div data-testid="slot-h">H</div>} />);
    expect(screen.getByTestId("slot-c")).toBeInTheDocument();
    expect(screen.getByTestId("slot-h")).toBeInTheDocument();
  });

  it("renders all sheetType values without error", () => {
    (["standard", "slotMini", "slotDual", "slot"] as const).forEach((t) => {
      const { unmount } = render(<BottomSheet isOpen sheetType={t} bodyTitle="T" />);
      expect(screen.getByTestId("mobilesheet-panel")).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all illustrationType values without error", () => {
    (["success", "download", "error", "warning", "caution"] as const).forEach((t) => {
      const { unmount } = render(<BottomSheet isOpen illustrationType={t} bodyTitle="T" />);
      expect(screen.getByTestId("bottomsheet-illustration")).toBeInTheDocument();
      unmount();
    });
  });
});

describe("BottomSheet — Compound children", () => {
  it("renders BottomSheet.Body content", () => {
    render(<BottomSheet isOpen title="T"><BottomSheet.Body><p>Compound body</p></BottomSheet.Body></BottomSheet>);
    expect(screen.getByText("Compound body")).toBeInTheDocument();
  });

  it("renders BottomSheet.Footer content", () => {
    render(<BottomSheet isOpen title="T"><BottomSheet.Footer><button>Done</button></BottomSheet.Footer></BottomSheet>);
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByTestId("bottomsheet-footer")).toBeInTheDocument();
  });

  it("renders BottomSheet.Slot content for slot type", () => {
    render(<BottomSheet isOpen sheetType="slotMini" title="T"><BottomSheet.Slot><div data-testid="cslot">Custom slot</div></BottomSheet.Slot></BottomSheet>);
    expect(screen.getByTestId("cslot")).toBeInTheDocument();
  });

  it("renders plain children as body content", () => {
    render(<BottomSheet isOpen title="T"><p>Plain child</p></BottomSheet>);
    expect(screen.getByText("Plain child")).toBeInTheDocument();
  });
});

describe("BottomSheet — Open/Close animation", () => {
  it("mounts DOM immediately when isOpen transitions to true", () => {
    const { rerender } = render(<BottomSheet isOpen={false}><div>Content</div></BottomSheet>);
    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.queryByText("Content")).not.toBeInTheDocument();

    rerender(<BottomSheet isOpen={true}><div>Content</div></BottomSheet>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("keeps DOM mounted during close animation (300ms)", () => {
    const { rerender } = render(<BottomSheet isOpen={true}><div>Content</div></BottomSheet>);
    expect(screen.getByText("Content")).toBeInTheDocument();

    rerender(<BottomSheet isOpen={false}><div>Content</div></BottomSheet>);
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByTestId("mobilesheet-panel")).toBeInTheDocument();
    expect(screen.getByTestId("mobilesheet-overlay")).toBeInTheDocument();

    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("overlay fades out during close", () => {
    const { rerender } = render(<BottomSheet isOpen={true}><div>Content</div></BottomSheet>);
    expect(screen.getByTestId("mobilesheet-overlay")).toBeInTheDocument();

    rerender(<BottomSheet isOpen={false}><div>Content</div></BottomSheet>);
    expect(screen.getByTestId("mobilesheet-overlay")).toBeInTheDocument();

    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.queryByTestId("mobilesheet-overlay")).not.toBeInTheDocument();
  });

  it("cleans up timeout on unmount during close animation", () => {
    const { rerender, unmount } = render(<BottomSheet isOpen={true}><div>Content</div></BottomSheet>);
    rerender(<BottomSheet isOpen={false}><div>Content</div></BottomSheet>);
    expect(() => unmount()).not.toThrow();
  });

  it("handles rapid open/close toggling", () => {
    const { rerender } = render(<BottomSheet isOpen={true}><div>Content</div></BottomSheet>);
    rerender(<BottomSheet isOpen={false}><div>Content</div></BottomSheet>);
    act(() => { jest.advanceTimersByTime(100); });
    rerender(<BottomSheet isOpen={true}><div>Content</div></BottomSheet>);
    expect(screen.getByText("Content")).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("swipe-down triggers onClose", () => {
    const onClose = jest.fn();
    render(<BottomSheet isOpen onClose={onClose}><div>Content</div></BottomSheet>);
    const panel = screen.getByTestId("mobilesheet-panel");
    fireEvent.touchStart(panel, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 80 }] });
    fireEvent.touchEnd(panel);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("close button triggers onClose", () => {
    const onClose = jest.fn();
    render(<BottomSheet isOpen onClose={onClose}><div>Content</div></BottomSheet>);
    fireEvent.click(screen.getByTestId("bottomsheet-close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("overlay click triggers onClose", () => {
    const onClose = jest.fn();
    render(<BottomSheet isOpen onClose={onClose}><div>Content</div></BottomSheet>);
    fireEvent.click(screen.getByTestId("mobilesheet-overlay"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
