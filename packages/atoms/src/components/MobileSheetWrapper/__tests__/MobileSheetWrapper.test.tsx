import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import MobileSheetWrapper from "../index";

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({ theme: { components: {} } }),
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

describe("MobileSheetWrapper — Rendering", () => {
  it("renders children when isOpen is true", () => {
    render(<MobileSheetWrapper isOpen><div>Hello</div></MobileSheetWrapper>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("returns null when isOpen is false and unmount delay passes", () => {
    render(<MobileSheetWrapper isOpen={false}><div>Gone</div></MobileSheetWrapper>);
    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.queryByText("Gone")).not.toBeInTheDocument();
  });

  it("renders overlay and panel", () => {
    render(<MobileSheetWrapper isOpen><div>C</div></MobileSheetWrapper>);
    expect(screen.getByTestId("mobilesheet-overlay")).toBeInTheDocument();
    expect(screen.getByTestId("mobilesheet-panel")).toBeInTheDocument();
  });

  it("panel has role=dialog and aria-modal=true", () => {
    render(<MobileSheetWrapper isOpen><div>C</div></MobileSheetWrapper>);
    const panel = screen.getByTestId("mobilesheet-panel");
    expect(panel).toHaveAttribute("role", "dialog");
    expect(panel).toHaveAttribute("aria-modal", "true");
  });

  it("applies className to panel", () => {
    render(<MobileSheetWrapper isOpen className="custom"><div>C</div></MobileSheetWrapper>);
    expect(screen.getByTestId("mobilesheet-panel").className).toContain("custom");
  });

  it("applies inline style to panel", () => {
    render(<MobileSheetWrapper isOpen style={{ padding: 99 }}><div>C</div></MobileSheetWrapper>);
    expect(screen.getByTestId("mobilesheet-panel")).toHaveStyle({ padding: "99px" });
  });
});

describe("MobileSheetWrapper — Interactions", () => {
  it("calls onClose when overlay is clicked", () => {
    const onClose = jest.fn();
    render(<MobileSheetWrapper isOpen onClose={onClose}><div>C</div></MobileSheetWrapper>);
    fireEvent.click(screen.getByTestId("mobilesheet-overlay"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on swipe-down exceeding threshold", () => {
    const onClose = jest.fn();
    render(<MobileSheetWrapper isOpen onClose={onClose}><div>C</div></MobileSheetWrapper>);
    const panel = screen.getByTestId("mobilesheet-panel");
    fireEvent.touchStart(panel, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 80 }] });
    fireEvent.touchEnd(panel);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on small swipe", () => {
    const onClose = jest.fn();
    render(<MobileSheetWrapper isOpen onClose={onClose}><div>C</div></MobileSheetWrapper>);
    const panel = screen.getByTestId("mobilesheet-panel");
    fireEvent.touchStart(panel, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 20 }] });
    fireEvent.touchEnd(panel);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("respects custom swipeThreshold", () => {
    const onClose = jest.fn();
    render(<MobileSheetWrapper isOpen onClose={onClose} swipeThreshold={100}><div>C</div></MobileSheetWrapper>);
    const panel = screen.getByTestId("mobilesheet-panel");
    fireEvent.touchStart(panel, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 80 }] });
    fireEvent.touchEnd(panel);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.touchStart(panel, { touches: [{ clientY: 0 }] });
    fireEvent.touchMove(panel, { touches: [{ clientY: 150 }] });
    fireEvent.touchEnd(panel);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("MobileSheetWrapper — Animation lifecycle", () => {
  it("mounts DOM when isOpen goes true, animates in after rAF", () => {
    const { rerender } = render(<MobileSheetWrapper isOpen={false}><div>C</div></MobileSheetWrapper>);
    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.queryByText("C")).not.toBeInTheDocument();

    rerender(<MobileSheetWrapper isOpen={true}><div>C</div></MobileSheetWrapper>);
    // DOM mounted immediately
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("keeps DOM during close animation, removes after delay", () => {
    const { rerender } = render(<MobileSheetWrapper isOpen={true}><div>C</div></MobileSheetWrapper>);
    rerender(<MobileSheetWrapper isOpen={false}><div>C</div></MobileSheetWrapper>);
    // Still mounted during animation
    expect(screen.getByText("C")).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.queryByText("C")).not.toBeInTheDocument();
  });

  it("respects custom unmountDelay", () => {
    const { rerender } = render(<MobileSheetWrapper isOpen={true} unmountDelay={500}><div>C</div></MobileSheetWrapper>);
    rerender(<MobileSheetWrapper isOpen={false} unmountDelay={500}><div>C</div></MobileSheetWrapper>);
    act(() => { jest.advanceTimersByTime(300); });
    // Still mounted — custom delay is 500ms
    expect(screen.getByText("C")).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(200); });
    expect(screen.queryByText("C")).not.toBeInTheDocument();
  });

  it("handles rapid open/close toggling", () => {
    const { rerender } = render(<MobileSheetWrapper isOpen={true}><div>C</div></MobileSheetWrapper>);
    rerender(<MobileSheetWrapper isOpen={false}><div>C</div></MobileSheetWrapper>);
    act(() => { jest.advanceTimersByTime(100); });
    rerender(<MobileSheetWrapper isOpen={true}><div>C</div></MobileSheetWrapper>);
    expect(screen.getByText("C")).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(300); });
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("cleans up on unmount during close", () => {
    const { rerender, unmount } = render(<MobileSheetWrapper isOpen={true}><div>C</div></MobileSheetWrapper>);
    rerender(<MobileSheetWrapper isOpen={false}><div>C</div></MobileSheetWrapper>);
    expect(() => unmount()).not.toThrow();
  });
});

describe("MobileSheetWrapper — Reusability with different content", () => {
  it("works as a generic wrapper for any content", () => {
    render(
      <MobileSheetWrapper isOpen>
        <nav data-testid="custom-nav">Navigation</nav>
        <main data-testid="custom-main">Main content</main>
        <footer data-testid="custom-footer">Footer</footer>
      </MobileSheetWrapper>
    );
    expect(screen.getByTestId("custom-nav")).toBeInTheDocument();
    expect(screen.getByTestId("custom-main")).toBeInTheDocument();
    expect(screen.getByTestId("custom-footer")).toBeInTheDocument();
  });

  it("accepts override props for styling", () => {
    render(
      <MobileSheetWrapper isOpen backgroundColor="#333" borderRadius={12} maxWidth="320px">
        <div>Styled</div>
      </MobileSheetWrapper>
    );
    expect(screen.getByTestId("mobilesheet-panel")).toBeInTheDocument();
  });
});
