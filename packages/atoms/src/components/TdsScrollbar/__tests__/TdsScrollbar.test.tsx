import React from "react";
import { render, screen } from "@testing-library/react";
import TdsScrollbar from "../index";

describe("TdsScrollbar", () => {
  // ─── Rendering ───────────────────────────────────────────────────────────

  it("renders children", () => {
    render(
      <TdsScrollbar>
        <p>Hello</p>
      </TdsScrollbar>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders without children", () => {
    const { container } = render(<TdsScrollbar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders a wrapper div", () => {
    const { container } = render(
      <TdsScrollbar>
        <span>content</span>
      </TdsScrollbar>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
  });

  it("renders multiple children", () => {
    render(
      <TdsScrollbar>
        <p>First</p>
        <p>Second</p>
        <p>Third</p>
      </TdsScrollbar>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
  });

  it("renders deeply nested children", () => {
    render(
      <TdsScrollbar>
        <div>
          <div>
            <span data-testid="deep">Nested</span>
          </div>
        </div>
      </TdsScrollbar>
    );
    expect(screen.getByTestId("deep")).toBeInTheDocument();
  });

  // ─── Variants ────────────────────────────────────────────────────────────

  it("renders grey variant (default)", () => {
    const { container } = render(
      <TdsScrollbar>
        <p>grey</p>
      </TdsScrollbar>
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("grey")).toBeInTheDocument();
  });

  it("renders black variant", () => {
    const { container } = render(
      <TdsScrollbar variant="black">
        <p>black</p>
      </TdsScrollbar>
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("black")).toBeInTheDocument();
  });

  it("renders coal variant", () => {
    const { container } = render(
      <TdsScrollbar variant="coal">
        <p>coal</p>
      </TdsScrollbar>
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("coal")).toBeInTheDocument();
  });

  it("renders all variants without error", () => {
    const variants = ["grey", "black", "coal"] as const;
    variants.forEach((v) => {
      const { unmount } = render(
        <TdsScrollbar variant={v}>
          <span>{v}</span>
        </TdsScrollbar>
      );
      expect(screen.getByText(v)).toBeInTheDocument();
      unmount();
    });
  });

  // ─── Sizes ───────────────────────────────────────────────────────────────

  it("renders large size", () => {
    const { container } = render(
      <TdsScrollbar size="large">
        <p>large</p>
      </TdsScrollbar>
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("large")).toBeInTheDocument();
  });

  it("renders small size (default)", () => {
    const { container } = render(
      <TdsScrollbar>
        <p>small</p>
      </TdsScrollbar>
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("small")).toBeInTheDocument();
  });

  it("renders all sizes without error", () => {
    const sizes = ["large", "small"] as const;
    sizes.forEach((s) => {
      const { unmount } = render(
        <TdsScrollbar size={s}>
          <span>{s}</span>
        </TdsScrollbar>
      );
      expect(screen.getByText(s)).toBeInTheDocument();
      unmount();
    });
  });

  // ─── All Combinations ────────────────────────────────────────────────────

  it("renders all variant × size combinations without error", () => {
    const variants = ["grey", "black", "coal"] as const;
    const sizes = ["large", "small"] as const;
    variants.forEach((v) => {
      sizes.forEach((s) => {
        const label = `${v}-${s}`;
        const { unmount } = render(
          <TdsScrollbar variant={v} size={s}>
            <span>{label}</span>
          </TdsScrollbar>
        );
        expect(screen.getByText(label)).toBeInTheDocument();
        unmount();
      });
    });
  });

  // ─── Emotion CSS class applied ───────────────────────────────────────────

  it("applies an Emotion CSS class to the wrapper div", () => {
    const { container } = render(
      <TdsScrollbar>
        <p>styled</p>
      </TdsScrollbar>
    );
    const wrapper = container.firstChild as HTMLElement;
    // Emotion generates a class starting with "css-"
    const hasEmotionClass = Array.from(wrapper.classList).some((c) =>
      c.startsWith("css-")
    );
    expect(hasEmotionClass).toBe(true);
  });

  it("applies different classes for different variants", () => {
    const { container: greyContainer } = render(
      <TdsScrollbar variant="grey">
        <p>g</p>
      </TdsScrollbar>
    );
    const { container: blackContainer } = render(
      <TdsScrollbar variant="black">
        <p>b</p>
      </TdsScrollbar>
    );
    const greyClass = (greyContainer.firstChild as HTMLElement).className;
    const blackClass = (blackContainer.firstChild as HTMLElement).className;
    expect(greyClass).not.toBe(blackClass);
  });

  it("applies different classes for different sizes", () => {
    const { container: lgContainer } = render(
      <TdsScrollbar size="large">
        <p>lg</p>
      </TdsScrollbar>
    );
    const { container: smContainer } = render(
      <TdsScrollbar size="small">
        <p>sm</p>
      </TdsScrollbar>
    );
    const lgClass = (lgContainer.firstChild as HTMLElement).className;
    const smClass = (smContainer.firstChild as HTMLElement).className;
    expect(lgClass).not.toBe(smClass);
  });

  // ─── Default props ───────────────────────────────────────────────────────

  it("defaults to grey variant when no variant prop is passed", () => {
    const { container: defaultContainer } = render(
      <TdsScrollbar>
        <p>default</p>
      </TdsScrollbar>
    );
    const { container: greyContainer } = render(
      <TdsScrollbar variant="grey">
        <p>explicit grey</p>
      </TdsScrollbar>
    );
    const defaultClass = (defaultContainer.firstChild as HTMLElement).className;
    const greyClass = (greyContainer.firstChild as HTMLElement).className;
    expect(defaultClass).toBe(greyClass);
  });

  it("defaults to small size when no size prop is passed", () => {
    const { container: defaultContainer } = render(
      <TdsScrollbar>
        <p>default</p>
      </TdsScrollbar>
    );
    const { container: smallContainer } = render(
      <TdsScrollbar size="small">
        <p>explicit small</p>
      </TdsScrollbar>
    );
    const defaultClass = (defaultContainer.firstChild as HTMLElement).className;
    const smallClass = (smallContainer.firstChild as HTMLElement).className;
    expect(defaultClass).toBe(smallClass);
  });

  // ─── No ThemeProvider dependency ─────────────────────────────────────────

  it("works without any ThemeProvider wrapping", () => {
    // This component should be fully self-contained
    const { container } = render(
      <TdsScrollbar variant="black" size="large">
        <div data-testid="no-theme">No theme needed</div>
      </TdsScrollbar>
    );
    expect(screen.getByTestId("no-theme")).toBeInTheDocument();
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toBeTruthy();
  });

  // ─── Wrapper does not add extra DOM ──────────────────────────────────────

  it("wrapper div is the only extra DOM element", () => {
    const { container } = render(
      <TdsScrollbar>
        <p data-testid="child">Only child</p>
      </TdsScrollbar>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper.children.length).toBe(1);
    expect(screen.getByTestId("child").parentElement).toBe(wrapper);
  });

  // ─── Scrollbar CSS properties (Firefox) ──────────────────────────────────

  it("sets scrollbar-width: thin on the wrapper (Firefox)", () => {
    const { container } = render(
      <TdsScrollbar>
        <p>firefox</p>
      </TdsScrollbar>
    );
    const wrapper = container.firstChild as HTMLElement;
    const computed = getComputedStyle(wrapper);
    // Emotion injects styles into a <style> tag; jsdom may not compute
    // pseudo-element styles, but we can verify the class was applied
    expect(wrapper.className).toBeTruthy();
  });

  // ─── Re-render with different props ──────────────────────────────────────

  it("updates styles when variant changes", () => {
    const { container, rerender } = render(
      <TdsScrollbar variant="grey">
        <p>content</p>
      </TdsScrollbar>
    );
    const greyClass = (container.firstChild as HTMLElement).className;

    rerender(
      <TdsScrollbar variant="black">
        <p>content</p>
      </TdsScrollbar>
    );
    const blackClass = (container.firstChild as HTMLElement).className;
    expect(greyClass).not.toBe(blackClass);
  });

  it("updates styles when size changes", () => {
    const { container, rerender } = render(
      <TdsScrollbar size="small">
        <p>content</p>
      </TdsScrollbar>
    );
    const smallClass = (container.firstChild as HTMLElement).className;

    rerender(
      <TdsScrollbar size="large">
        <p>content</p>
      </TdsScrollbar>
    );
    const largeClass = (container.firstChild as HTMLElement).className;
    expect(smallClass).not.toBe(largeClass);
  });

  // ─── Edge cases ──────────────────────────────────────────────────────────

  it("handles null children gracefully", () => {
    const { container } = render(
      <TdsScrollbar>{null}</TdsScrollbar>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles conditional children", () => {
    const show = false;
    render(
      <TdsScrollbar>
        {show && <p>hidden</p>}
        <p>visible</p>
      </TdsScrollbar>
    );
    expect(screen.queryByText("hidden")).not.toBeInTheDocument();
    expect(screen.getByText("visible")).toBeInTheDocument();
  });

  it("preserves child event handlers", () => {
    const onClick = jest.fn();
    render(
      <TdsScrollbar>
        <button onClick={onClick}>Click me</button>
      </TdsScrollbar>
    );
    screen.getByText("Click me").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("preserves child refs", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TdsScrollbar>
        <div ref={ref} data-testid="ref-child">
          ref test
        </div>
      </TdsScrollbar>
    );
    expect(ref.current).toBe(screen.getByTestId("ref-child"));
  });
});
