import React from "react";
import { render, screen } from "@testing-library/react";
import Pill from "../index";

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: {
      components: {
        pill_tarmac: {
          base: { fontFamily: "sans-serif", fontWeight: "500", borderRadius: "999px" },
          types: {
            solid: {
              black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" },
              blue: { backgroundColor: "#3b82f6", textColor: "#ffffff" },
              warning: { backgroundColor: "#f59e0b", textColor: "#7b6414" },
            },
            subtle: {
              black: { backgroundColor: "#e6e6e6", textColor: "#2b2b2b" },
            },
            outlined: {
              black: { backgroundColor: "transparent", textColor: "#2b2b2b", borderColor: "#2b2b2b" },
            },
          },
          variants: {
            black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" },
            blue: { backgroundColor: "#3b82f6", textColor: "#ffffff" },
            warning: { backgroundColor: "#f59e0b", textColor: "#7b6414" },
          },
          sizes: {
            sm: { padding: "4px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "2px" },
            md: { padding: "6px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "2px" },
            lg: { padding: "6px", fontSize: "12px", lineHeight: "16px", iconSize: "16px", gap: "2px" },
          },
          states: {
            disabled: { backgroundColor: "#dedede", textColor: "#cdcbcb", borderColor: "transparent" },
            disabledOutlined: { backgroundColor: "transparent", textColor: "#cdcbcb", borderColor: "#ededed" },
            ghost: { backgroundColor: "#dedede", textColor: "transparent", borderColor: "transparent" },
          },
        },
      },
    },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Pill Component — Tarmac Mode", () => {
  it("renders with text prop in Tarmac mode", () => {
    render(<Pill pillVariant="black" text="Status" />);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders with children in Tarmac mode", () => {
    render(<Pill pillVariant="black">Active</Pill>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders as a span element (non-interactive)", () => {
    const { container } = render(<Pill pillVariant="black" text="Info" />);
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("renders leadingIcon", () => {
    render(<Pill pillVariant="black" text="With Icon" leadingIcon={<span data-testid="lead">L</span>} />);
    expect(screen.getByTestId("lead")).toBeInTheDocument();
  });

  it("renders trailingIcon", () => {
    render(<Pill pillVariant="black" text="With Icon" trailingIcon={<span data-testid="trail">T</span>} />);
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("renders both icons simultaneously", () => {
    render(
      <Pill
        pillVariant="black"
        text="Both"
        leadingIcon={<span data-testid="lead">L</span>}
        trailingIcon={<span data-testid="trail">T</span>}
      />
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("shows status dot when showStatus is true", () => {
    const { container } = render(<Pill pillVariant="black" text="Active" showStatus />);
    const dot = container.querySelector("span > span:first-child");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveStyle({ borderRadius: "50%" });
  });

  it("hides status dot by default", () => {
    const { container } = render(<Pill pillVariant="black" text="No Status" />);
    const spans = container.querySelectorAll("span > span");
    const hasDot = Array.from(spans).some(
      (el) => (el as HTMLElement).style.borderRadius === "50%"
    );
    expect(hasDot).toBe(false);
  });

  it("accepts className prop", () => {
    const { container } = render(<Pill pillVariant="black" text="Custom" className="my-pill" />);
    expect(container.querySelector(".my-pill")).toBeInTheDocument();
  });

  it("renders all 8 Tarmac variants without error", () => {
    const variants = ["black", "white", "coal", "blue", "success", "error", "warning", "legacy_blue"] as const;
    variants.forEach((v) => {
      const { unmount } = render(<Pill pillVariant={v} text={v} />);
      expect(screen.getByText(v)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all 3 sizes without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((sz) => {
      const { unmount } = render(<Pill pillVariant="black" text={`size-${sz}`} size={sz} />);
      expect(screen.getByText(`size-${sz}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all 3 pill types without error", () => {
    const types = ["solid", "subtle", "outlined"] as const;
    types.forEach((t) => {
      const { unmount } = render(<Pill pillVariant="black" text={`type-${t}`} pillType={t} />);
      expect(screen.getByText(`type-${t}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders disabled state", () => {
    render(<Pill pillVariant="black" text="Disabled" isDisabled />);
    expect(screen.getByText("Disabled")).toBeInTheDocument();
  });

  it("renders ghost state", () => {
    render(<Pill pillVariant="black" text="Ghost" isGhost />);
    expect(screen.getByText("Ghost")).toBeInTheDocument();
  });
});

describe("Pill Component — Legacy Mode", () => {
  it("renders with legacy variant prop", () => {
    render(<Pill variant="success" text="Legacy" />);
    expect(screen.getByText("Legacy")).toBeInTheDocument();
  });

  it("renders with legacy default variant", () => {
    render(<Pill text="Default" />);
    expect(screen.getByText("Default")).toBeInTheDocument();
  });

  it("renders closable pill", () => {
    render(<Pill text="Closable" closable />);
    expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
  });

  it("hides when visible is false", () => {
    const { container } = render(<Pill text="Hidden" visible={false} />);
    expect(container.querySelector("span")).not.toBeInTheDocument();
  });
});
