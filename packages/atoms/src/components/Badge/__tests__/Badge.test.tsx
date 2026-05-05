import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "../index";

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: { components: {} },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Badge Component", () => {
  it("renders with text prop", () => {
    render(<Badge text="Status" />);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders with children", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders as a span element (non-interactive)", () => {
    const { container } = render(<Badge text="Info" />);
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("renders leadingIcon", () => {
    render(<Badge text="With Icon" leadingIcon={<span data-testid="lead">L</span>} />);
    expect(screen.getByTestId("lead")).toBeInTheDocument();
  });

  it("renders trailingIcon", () => {
    render(<Badge text="With Icon" trailingIcon={<span data-testid="trail">T</span>} />);
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("renders both icons simultaneously", () => {
    render(
      <Badge
        text="Both"
        leadingIcon={<span data-testid="lead">L</span>}
        trailingIcon={<span data-testid="trail">T</span>}
      />
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("shows status dot when showStatus is true", () => {
    const { container } = render(<Badge text="Active" showStatus />);
    const dot = container.querySelector("span > span:first-child");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveStyle({ borderRadius: "50%" });
  });

  it("hides status dot by default", () => {
    const { container } = render(<Badge text="No Status" />);
    const spans = container.querySelectorAll("span > span");
    const hasDot = Array.from(spans).some(
      (s) => (s as HTMLElement).style.borderRadius === "50%"
    );
    expect(hasDot).toBe(false);
  });

  it("accepts className prop", () => {
    const { container } = render(<Badge text="Custom" className="my-badge" />);
    expect(container.querySelector(".my-badge")).toBeInTheDocument();
  });

  it("renders all 9 variants without error", () => {
    const variants = ["black", "white", "coal", "dlv_red", "info", "success", "warning", "error", "cardbox"] as const;
    variants.forEach((v) => {
      const { unmount } = render(<Badge text={v} variant={v} />);
      expect(screen.getByText(v)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all 3 sizes without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((s) => {
      const { unmount } = render(<Badge text={`size-${s}`} size={s} />);
      expect(screen.getByText(`size-${s}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all 3 badge types without error", () => {
    const types = ["solid", "subtle", "outlined"] as const;
    types.forEach((t) => {
      const { unmount } = render(<Badge text={`type-${t}`} badgeType={t} />);
      expect(screen.getByText(`type-${t}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders disabled state", () => {
    render(<Badge text="Disabled" isDisabled />);
    expect(screen.getByText("Disabled")).toBeInTheDocument();
  });

  it("renders ghost state", () => {
    render(<Badge text="Ghost" isGhost />);
    expect(screen.getByText("Ghost")).toBeInTheDocument();
  });
});
