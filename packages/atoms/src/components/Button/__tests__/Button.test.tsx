import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../index";

// Mock ThemeProvider to avoid ESM import issues with figma-variables-resolver
jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: { components: {} },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Button Component", () => {
  it("renders with text prop", () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("renders with children", () => {
    render(<Button>Hello</Button>);
    expect(screen.getByRole("button", { name: "Hello" })).toBeInTheDocument();
  });

  it("is disabled when isDisabled is true", () => {
    render(<Button text="Disabled" isDisabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button text="Disabled" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when isLoading is true", () => {
    render(<Button text="Loading" isLoading />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("fires onClick handler", () => {
    const handleClick = jest.fn();
    render(<Button text="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button text="Click" onClick={handleClick} isDisabled />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders leadingIcon", () => {
    const icon = <span data-testid="lead-icon">L</span>;
    render(<Button text="With Icon" leadingIcon={icon} />);
    expect(screen.getByTestId("lead-icon")).toBeInTheDocument();
  });

  it("renders trailingIcon", () => {
    const icon = <span data-testid="trail-icon">T</span>;
    render(<Button text="With Icon" trailingIcon={icon} />);
    expect(screen.getByTestId("trail-icon")).toBeInTheDocument();
  });

  it("renders both leading and trailing icons simultaneously", () => {
    render(
      <Button
        text="Both"
        leadingIcon={<span data-testid="lead">L</span>}
        trailingIcon={<span data-testid="trail">T</span>}
      />
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("supports legacy icon + iconPosition='left'", () => {
    const icon = <span data-testid="legacy-icon">I</span>;
    render(<Button text="Legacy" icon={icon} iconPosition="left" />);
    expect(screen.getByTestId("legacy-icon")).toBeInTheDocument();
  });

  it("supports legacy icon + iconPosition='right'", () => {
    const icon = <span data-testid="legacy-icon">I</span>;
    render(<Button text="Legacy" icon={icon} iconPosition="right" />);
    expect(screen.getByTestId("legacy-icon")).toBeInTheDocument();
  });

  it("applies ghost class when isGhost is true", () => {
    render(<Button text="Ghost" isGhost />);
    expect(screen.getByRole("button").className).toContain("ghost");
  });

  it("renders Button.Text compound component", () => {
    render(<Button.Text text="Text Button" />);
    expect(screen.getByRole("button")).toHaveTextContent("Text Button");
  });

  it("renders Button.Icon compound component", () => {
    const icon = <span data-testid="icon-btn">I</span>;
    render(<Button.Icon icon={icon} />);
    expect(screen.getByTestId("icon-btn")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    render(<Button text="Custom" className="my-custom-class" />);
    expect(screen.getByRole("button").className).toContain("my-custom-class");
  });

  it("defaults to primary buttonStyle", () => {
    const { container } = render(<Button text="Default" />);
    expect(container.querySelector("button")).toBeInTheDocument();
  });

  it("renders dlv_red variant without error", () => {
    render(<Button text="DLV Red" variant="dlv_red" buttonStyle="primary" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders coal variant without error", () => {
    render(<Button text="Coal" variant="coal" buttonStyle="primary" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders dlv_red secondary style without error", () => {
    render(<Button text="DLV Red Secondary" variant="dlv_red" buttonStyle="secondary" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders coal secondary style without error", () => {
    render(<Button text="Coal Secondary" variant="coal" buttonStyle="secondary" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders dlv_red tertiary style without error", () => {
    render(<Button text="DLV Red Tertiary" variant="dlv_red" buttonStyle="tertiary" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders coal tertiary style without error", () => {
    render(<Button text="Coal Tertiary" variant="coal" buttonStyle="tertiary" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders dlv_red disabled state without error", () => {
    render(<Button text="DLV Red Disabled" variant="dlv_red" isDisabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders coal disabled state without error", () => {
    render(<Button text="Coal Disabled" variant="coal" isDisabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders all new variants across all sizes without error", () => {
    const newVariants = ["dlv_red", "coal"] as const;
    const sizes = ["sm", "md", "lg"] as const;
    newVariants.forEach((variant) => {
      sizes.forEach((size) => {
        const { unmount } = render(<Button text="Btn" variant={variant} size={size} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
        unmount();
      });
    });
  });
});
