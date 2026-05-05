import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import AnchoredOverlay from "../index";

// Stub ReactDOM.createPortal to render inline so we can query the overlay
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

const Content = () => <div data-testid="overlay-content">Overlay</div>;

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

// ─── Rendering ────────────────────────────────────────────────────────────────

describe("rendering", () => {
  it("renders trigger children", () => {
    render(
      <AnchoredOverlay content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("does not render overlay content initially", () => {
    render(
      <AnchoredOverlay content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    expect(screen.queryByTestId("overlay-content")).not.toBeInTheDocument();
  });
});

// ─── Click trigger ────────────────────────────────────────────────────────────

describe("trigger=click", () => {
  it("shows overlay on trigger click", () => {
    render(
      <AnchoredOverlay trigger="click" content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.click(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
  });

  it("hides overlay on second trigger click (toggle)", () => {
    render(
      <AnchoredOverlay trigger="click" content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.click(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    expect(screen.queryByTestId("overlay-content")).not.toBeInTheDocument();
  });
});

// ─── Hover trigger ────────────────────────────────────────────────────────────

describe("trigger=hover", () => {
  it("shows overlay on mouseenter with enterDelay", () => {
    render(
      <AnchoredOverlay trigger="hover" enterDelay={200} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.mouseEnter(screen.getByText("Trigger"));
    expect(screen.queryByTestId("overlay-content")).not.toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(200); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
  });

  it("hides overlay when mouse leaves both trigger and overlay", async () => {
    render(
      <AnchoredOverlay trigger="hover" enterDelay={0} leaveDelay={100} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.mouseEnter(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();

    // simulate mousemove outside both elements
    fireEvent.mouseMove(document, { target: document.body });
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.queryByTestId("overlay-content")).not.toBeInTheDocument();
  });

  it("does not hide when mouse moves within the overlay", () => {
    const { getByTestId } = render(
      <AnchoredOverlay trigger="hover" enterDelay={0} leaveDelay={100} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.mouseEnter(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });

    const overlay = getByTestId("overlay-content");
    // dispatch mousemove directly on the overlay node — target is the overlay itself
    fireEvent.mouseMove(overlay);
    act(() => { jest.advanceTimersByTime(100); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
  });
});

// ─── Focus trigger ────────────────────────────────────────────────────────────

describe("trigger=focus", () => {
  it("shows on focus and hides on blur", () => {
    render(
      <AnchoredOverlay trigger="focus" enterDelay={0} leaveDelay={0} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.focus(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();

    fireEvent.blur(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    expect(screen.queryByTestId("overlay-content")).not.toBeInTheDocument();
  });
});

// ─── Controlled mode ──────────────────────────────────────────────────────────

describe("controlled mode", () => {
  it("shows overlay when visible=true", () => {
    render(
      <AnchoredOverlay visible={true} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
  });

  it("hides overlay when visible=false", () => {
    const { rerender } = render(
      <AnchoredOverlay visible={true} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();

    rerender(
      <AnchoredOverlay visible={false} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    act(() => { jest.runAllTimers(); });
    expect(screen.queryByTestId("overlay-content")).not.toBeInTheDocument();
  });

  it("calls onVisibleChange when trigger fires", () => {
    const onChange = jest.fn();
    render(
      <AnchoredOverlay trigger="click" visible={false} onVisibleChange={onChange} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.click(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

// ─── dismissOnOutsideClick ────────────────────────────────────────────────────

describe("dismissOnOutsideClick", () => {
  it("hides overlay on outside mousedown", () => {
    render(
      <AnchoredOverlay trigger="click" dismissOnOutsideClick content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.click(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    act(() => { jest.runAllTimers(); });
    expect(screen.queryByTestId("overlay-content")).not.toBeInTheDocument();
  });

  it("does not hide on mousedown inside the overlay", () => {
    render(
      <AnchoredOverlay trigger="click" dismissOnOutsideClick content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.click(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });

    fireEvent.mouseDown(screen.getByTestId("overlay-content"));
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
  });

  it("does not hide on mousedown on the trigger itself", () => {
    render(
      <AnchoredOverlay trigger="click" dismissOnOutsideClick content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.click(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });

    fireEvent.mouseDown(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });
    // still visible — trigger mousedown doesn't dismiss, the click toggle does
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
  });

  it("does not dismiss when dismissOnOutsideClick is false", () => {
    render(
      <AnchoredOverlay trigger="click" dismissOnOutsideClick={false} content={<Content />}>
        <button>Trigger</button>
      </AnchoredOverlay>
    );
    fireEvent.click(screen.getByText("Trigger"));
    act(() => { jest.runAllTimers(); });

    fireEvent.mouseDown(document.body);
    act(() => { jest.runAllTimers(); });
    expect(screen.getByTestId("overlay-content")).toBeInTheDocument();
  });
});

// ─── placementToArrow util ────────────────────────────────────────────────────

describe("placementToCoachmarksArrow util", () => {
  const { placementToCoachmarksArrow } = require("../utils");

  const cases: [string, string][] = [
    ["top",          "bottom-mid"],
    ["top-start",    "bottom-left"],
    ["top-end",      "bottom-right"],
    ["bottom",       "top-mid"],
    ["bottom-start", "top-left"],
    ["bottom-end",   "top-right"],
    ["left",         "right-mid"],
    ["left-start",   "right-top"],
    ["left-end",     "right-bottom"],
    ["right",        "left-mid"],
    ["right-start",  "left-top"],
    ["right-end",    "left-bottom"],
  ];

  it.each(cases)("placement=%s → arrowPosition=%s", (placement, expected) => {
    expect(placementToCoachmarksArrow(placement)).toBe(expected);
  });
});
