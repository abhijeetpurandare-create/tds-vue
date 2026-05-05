import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Chip from "../index";

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: { components: {} },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Chip Component", () => {
  it("renders with text prop", () => {
    render(<Chip text="Status" />);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders with children", () => {
    render(<Chip>Active</Chip>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders as a span element with tabIndex for interactivity", () => {
    const { container } = render(<Chip text="Info" />);
    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
    expect(span).toHaveAttribute("tabindex", "0");
  });

  it("renders leadingIcon", () => {
    render(<Chip text="With Icon" leadingIcon={<span data-testid="lead">L</span>} />);
    expect(screen.getByTestId("lead")).toBeInTheDocument();
  });

  it("renders trailingIcon", () => {
    render(<Chip text="With Icon" trailingIcon={<span data-testid="trail">T</span>} />);
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("renders both icons simultaneously", () => {
    render(
      <Chip
        text="Both"
        leadingIcon={<span data-testid="lead">L</span>}
        trailingIcon={<span data-testid="trail">T</span>}
      />
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("shows left status dot when statusLeft is true", () => {
    const { container } = render(<Chip text="Active" statusLeft />);
    const dot = container.querySelector("span > span:first-child");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveStyle({ borderRadius: "50%" });
  });

  it("shows right status dot when statusRight is true", () => {
    const { container } = render(<Chip text="Active" statusRight />);
    const dot = container.querySelector("span > span:last-child");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveStyle({ borderRadius: "50%" });
  });

  it("hides status dots by default", () => {
    const { container } = render(<Chip text="No Status" />);
    const spans = container.querySelectorAll("span > span");
    const hasDot = Array.from(spans).some(
      (s) => (s as HTMLElement).style.borderRadius === "50%"
    );
    expect(hasDot).toBe(false);
  });

  it("accepts className prop", () => {
    const { container } = render(<Chip text="Custom" className="my-chip" />);
    expect(container.querySelector(".my-chip")).toBeInTheDocument();
  });

  it("renders all 9 chip types without error", () => {
    const types = ["black", "white", "coal", "blue", "success", "error", "warning", "legacy_blue", "dlv_red"] as const;
    types.forEach((t) => {
      const { unmount } = render(<Chip text={t} chipType={t} />);
      expect(screen.getByText(t)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all 3 sizes without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((s) => {
      const { unmount } = render(<Chip text={`size-${s}`} size={s} />);
      expect(screen.getByText(`size-${s}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders both variants without error", () => {
    const variants = ["standard", "outlined"] as const;
    variants.forEach((v) => {
      const { unmount } = render(<Chip text={`variant-${v}`} chipVariant={v} />);
      expect(screen.getByText(`variant-${v}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders disabled state with tabIndex -1", () => {
    const { container } = render(<Chip text="Disabled" isDisabled />);
    expect(screen.getByText("Disabled")).toBeInTheDocument();
    const span = container.querySelector("span");
    expect(span).toHaveAttribute("tabindex", "-1");
  });

  it("renders ghost state with tabIndex -1", () => {
    const { container } = render(<Chip text="Ghost" isGhost />);
    expect(screen.getByText("Ghost")).toBeInTheDocument();
    const span = container.querySelector("span");
    expect(span).toHaveAttribute("tabindex", "-1");
  });

  it("fires onClick handler", () => {
    const handleClick = jest.fn();
    render(<Chip text="Clickable" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Clickable"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does NOT fire onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Chip text="Disabled" isDisabled onClick={handleClick} />);
    fireEvent.click(screen.getByText("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does NOT fire onClick when ghost", () => {
    const handleClick = jest.fn();
    render(<Chip text="Ghost" isGhost onClick={handleClick} />);
    fireEvent.click(screen.getByText("Ghost"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("sets role=button when onClick is provided", () => {
    const { container } = render(<Chip text="Button" onClick={() => {}} />);
    const span = container.querySelector("span");
    expect(span).toHaveAttribute("role", "button");
  });

  it("does not set role when onClick is not provided", () => {
    const { container } = render(<Chip text="Display" />);
    const span = container.querySelector("span");
    expect(span).not.toHaveAttribute("role");
  });
});
