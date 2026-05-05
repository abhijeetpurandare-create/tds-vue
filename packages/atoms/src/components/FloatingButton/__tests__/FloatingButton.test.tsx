import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FloatingButton from "../index";
import { ThemeProvider } from "../../ThemeProvider";

describe("FloatingButton Component", () => {
  const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  it("renders with default props", () => {
    renderWithTheme(<FloatingButton>Click me</FloatingButton>);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
    expect(button.parentElement?.parentElement).toHaveStyle({
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      borderRadius: "9999px",
    });
  });

  it("renders with different variants", () => {
    const { rerender } = renderWithTheme(
      <FloatingButton variant="primary">Primary</FloatingButton>
    );
    expect(screen.getByText("Primary")).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <FloatingButton variant="secondary">Secondary</FloatingButton>
      </ThemeProvider>
    );
    expect(screen.getByText("Secondary")).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <FloatingButton variant="outline">Outline</FloatingButton>
      </ThemeProvider>
    );
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = renderWithTheme(
      <FloatingButton size="sm">Small</FloatingButton>
    );
    let button = screen.getByText("Small").parentElement?.parentElement;
    expect(button).toHaveStyle({ padding: "0.5rem" });

    rerender(
      <ThemeProvider>
        <FloatingButton size="md">Medium</FloatingButton>
      </ThemeProvider>
    );
    button = screen.getByText("Medium").parentElement?.parentElement;
    expect(button).toHaveStyle({ padding: "0.75rem" });

    rerender(
      <ThemeProvider>
        <FloatingButton size="lg">Large</FloatingButton>
      </ThemeProvider>
    );
    button = screen.getByText("Large").parentElement?.parentElement;
    expect(button).toHaveStyle({ padding: "1rem" });
  });

  it("handles loading state", () => {
    renderWithTheme(
      <FloatingButton isLoading>Loading</FloatingButton>
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });

  it("handles disabled state", () => {
    renderWithTheme(
      <FloatingButton disabled>Disabled</FloatingButton>
    );
    const button = screen.getByText("Disabled").parentElement?.parentElement;
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ cursor: "not-allowed" });
  });

  it("renders with icon", () => {
    const icon = <span data-testid="test-icon">🔥</span>;
    renderWithTheme(
      <FloatingButton icon={icon}>With Icon</FloatingButton>
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <FloatingButton onClick={handleClick}>Click me</FloatingButton>
    );
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with custom positioning", () => {
    renderWithTheme(
      <FloatingButton
        position="top-left"
        top="2rem"
        left="2rem"
      >
        Custom Position
      </FloatingButton>
    );
    const button = screen.getByText("Custom Position").parentElement?.parentElement;
    expect(button).toHaveStyle({
      position: "fixed",
      top: "2rem",
      left: "2rem",
    });
  });

  it("renders with custom styles", () => {
    renderWithTheme(
      <FloatingButton
        backgroundColor="red"
        borderColor="blue"
        radius="4px"
        shadow="none"
        zIndex={20}
      >
        Custom Styles
      </FloatingButton>
    );
    const button = screen.getByText("Custom Styles").parentElement?.parentElement;
    expect(button).toHaveStyle({
      backgroundColor: "red",
      borderColor: "blue",
      borderRadius: "4px",
      boxShadow: "none",
      zIndex: 20,
    });
  });

  it("renders with text prop", () => {
    renderWithTheme(
      <FloatingButton text="Button Text" />
    );
    expect(screen.getByText("Button Text")).toBeInTheDocument();
  });

  it("handles isRounded prop", () => {
    const { rerender } = renderWithTheme(
      <FloatingButton isRounded>Rounded</FloatingButton>
    );
    let button = screen.getByText("Rounded").parentElement?.parentElement;
    expect(button).toHaveStyle({ borderRadius: "9999px" });

    rerender(
      <ThemeProvider>
        <FloatingButton isRounded={false}>Not Rounded</FloatingButton>
      </ThemeProvider>
    );
    button = screen.getByText("Not Rounded").parentElement?.parentElement;
    expect(button).toHaveStyle({ borderRadius: "0.375rem" });
  });

  it("applies custom className", () => {
    renderWithTheme(
      <FloatingButton className="custom-class">Custom Class</FloatingButton>
    );
    const button = screen.getByText("Custom Class").parentElement?.parentElement;
    expect(button).toHaveClass("custom-class");
  });
}); 