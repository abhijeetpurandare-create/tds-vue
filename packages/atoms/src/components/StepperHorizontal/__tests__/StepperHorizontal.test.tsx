import React from "react";
import { render, screen } from "@testing-library/react";
import StepperHorizontal from "../index";
import type { StepperHorizontalStep } from "../index";

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({ theme: { components: {} } }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../../StepperIcon", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ stepNumber, variant, "data-testid": testId }: any) => (
      <div data-testid={testId || "stepper-icon"} data-variant={variant} data-step={stepNumber} />
    ),
  };
});

const STEPS: StepperHorizontalStep[] = [
  { title: "Order Placed", subtext: "Received", state: "default" },
  { title: "Processing", subtext: "In progress", state: "active" },
  { title: "Shipped", subtext: "On the way", state: "disabled" },
  { title: "Delivered", subtext: "Done", state: "disabled" },
];

describe("StepperHorizontal", () => {
  describe("Rendering", () => {
    it("renders without crashing with default props", () => {
      render(<StepperHorizontal steps={STEPS} />);
      expect(screen.getByTestId("stepper-horizontal")).toBeInTheDocument();
    });

    it("renders correct number of step columns", () => {
      render(<StepperHorizontal steps={STEPS} />);
      expect(screen.getAllByTestId(/stepper-horizontal-step-/)).toHaveLength(4);
    });

    it("renders step titles", () => {
      render(<StepperHorizontal steps={STEPS} />);
      expect(screen.getByText("Order Placed")).toBeInTheDocument();
      expect(screen.getByText("Processing")).toBeInTheDocument();
      expect(screen.getByText("Shipped")).toBeInTheDocument();
      expect(screen.getByText("Delivered")).toBeInTheDocument();
    });

    it("renders fallback title when title is not provided", () => {
      render(<StepperHorizontal steps={[{}, {}, {}]} />);
      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
      expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("applies data-testid prop", () => {
      render(<StepperHorizontal steps={STEPS} data-testid="my-stepper" />);
      expect(screen.getByTestId("my-stepper")).toBeInTheDocument();
    });

    it("applies data-size attribute", () => {
      render(<StepperHorizontal steps={STEPS} size="md" />);
      expect(screen.getByTestId("stepper-horizontal")).toHaveAttribute("data-size", "md");
    });

    it("applies custom className", () => {
      const { container } = render(<StepperHorizontal steps={STEPS} className="my-class" />);
      expect(container.firstChild).toHaveClass("my-class");
    });

    it("renders single step without crashing", () => {
      render(<StepperHorizontal steps={[{ title: "Only" }]} />);
      expect(screen.getByText("Only")).toBeInTheDocument();
    });

    it("renders empty steps array without crashing", () => {
      render(<StepperHorizontal steps={[]} />);
      expect(screen.getByTestId("stepper-horizontal")).toBeInTheDocument();
    });
  });

  describe("Connectors", () => {
    it("renders N-1 connectors for N steps", () => {
      render(<StepperHorizontal steps={STEPS} />);
      // 4 steps → 3 connectors
      expect(screen.getAllByTestId(/stepper-horizontal-connector-/)).toHaveLength(3);
    });

    it("renders 0 connectors for 1 step", () => {
      render(<StepperHorizontal steps={[{ title: "Solo" }]} />);
      expect(screen.queryAllByTestId(/stepper-horizontal-connector-/)).toHaveLength(0);
    });

    it("renders 1 connector for 2 steps", () => {
      render(<StepperHorizontal steps={[{ title: "A" }, { title: "B" }]} />);
      expect(screen.getAllByTestId(/stepper-horizontal-connector-/)).toHaveLength(1);
    });

    it("connectors have aria-hidden=true", () => {
      render(<StepperHorizontal steps={STEPS} />);
      screen.getAllByTestId(/stepper-horizontal-connector-/).forEach(el => {
        expect(el).toHaveAttribute("aria-hidden", "true");
      });
    });
  });

  describe("Subtext", () => {
    it("does not render subtext by default (showSubtext=false)", () => {
      render(<StepperHorizontal steps={STEPS} showSubtext={false} />);
      expect(screen.queryByText("Received")).not.toBeInTheDocument();
    });

    it("renders subtext when showSubtext=true and subtext is provided", () => {
      render(<StepperHorizontal steps={STEPS} showSubtext={true} />);
      expect(screen.getByText("Received")).toBeInTheDocument();
      expect(screen.getByText("In progress")).toBeInTheDocument();
    });

    it("does not render subtext when showSubtext=true but subtext is empty", () => {
      const steps: StepperHorizontalStep[] = [{ title: "Step 1" }];
      render(<StepperHorizontal steps={steps} showSubtext={true} />);
      // subtext prop is undefined — no subtext element rendered
      expect(screen.queryAllByText(/./)).toHaveLength(1); // only the title
    });
  });

  describe("Sizes", () => {
    it("renders size lg without error", () => {
      render(<StepperHorizontal steps={STEPS} size="lg" />);
      expect(screen.getByTestId("stepper-horizontal")).toHaveAttribute("data-size", "lg");
    });

    it("renders size md without error", () => {
      render(<StepperHorizontal steps={STEPS} size="md" />);
      expect(screen.getByTestId("stepper-horizontal")).toHaveAttribute("data-size", "md");
    });

    it("renders size sm without error", () => {
      render(<StepperHorizontal steps={STEPS} size="sm" />);
      expect(screen.getByTestId("stepper-horizontal")).toHaveAttribute("data-size", "sm");
    });
  });

  describe("States → Icon variants", () => {
    it("maps 'default' state to 'solid' icon variant", () => {
      render(<StepperHorizontal steps={[{ title: "S1", state: "default" }]} />);
      expect(screen.getByTestId("stepper-horizontal-step-0").querySelector("[data-variant]"))
        ?.toHaveAttribute("data-variant", "solid");
    });

    it("maps 'active' state to 'outlined' icon variant", () => {
      render(<StepperHorizontal steps={[{ title: "S1", state: "active" }]} />);
      expect(screen.getByTestId("stepper-horizontal-step-0").querySelector("[data-variant]"))
        ?.toHaveAttribute("data-variant", "outlined");
    });

    it("maps 'disabled' state to 'disabled' icon variant", () => {
      render(<StepperHorizontal steps={[{ title: "S1", state: "disabled" }]} />);
      expect(screen.getByTestId("stepper-horizontal-step-0").querySelector("[data-variant]"))
        ?.toHaveAttribute("data-variant", "disabled");
    });

    it("defaults to 'solid' variant when state is not provided", () => {
      render(<StepperHorizontal steps={[{ title: "S1" }]} />);
      expect(screen.getByTestId("stepper-horizontal-step-0").querySelector("[data-variant]"))
        ?.toHaveAttribute("data-variant", "solid");
    });
  });

  describe("Step Numbers", () => {
    it("passes 1-indexed step numbers to icons", () => {
      render(<StepperHorizontal steps={STEPS} />);
      expect(screen.getByTestId("stepper-horizontal-step-0").querySelector("[data-step]"))
        ?.toHaveAttribute("data-step", "1");
      expect(screen.getByTestId("stepper-horizontal-step-1").querySelector("[data-step]"))
        ?.toHaveAttribute("data-step", "2");
      expect(screen.getByTestId("stepper-horizontal-step-3").querySelector("[data-step]"))
        ?.toHaveAttribute("data-step", "4");
    });
  });

  describe("Icon Styles", () => {
    const iconStyles = ["numeric", "icon", "black", "coal", "dlv_red", "blue", "green"] as const;
    iconStyles.forEach(style => {
      it(`renders iconStyle="${style}" without error`, () => {
        render(<StepperHorizontal steps={STEPS} iconStyle={style} />);
        expect(screen.getByTestId("stepper-horizontal")).toBeInTheDocument();
      });
    });
  });

  describe("Step Counts", () => {
    [2, 3, 4, 5, 6, 7, 8].forEach(n => {
      it(`renders ${n} steps with ${n - 1} connectors`, () => {
        const steps = Array.from({ length: n }, (_, i) => ({ title: `Step ${i + 1}` }));
        render(<StepperHorizontal steps={steps} />);
        expect(screen.getAllByTestId(/stepper-horizontal-step-/)).toHaveLength(n);
        if (n > 1) {
          expect(screen.getAllByTestId(/stepper-horizontal-connector-/)).toHaveLength(n - 1);
        }
      });
    });
  });

  describe("All size × iconStyle combinations", () => {
    it("renders all combinations without error", () => {
      const sizes = ["sm", "md", "lg"] as const;
      const styles = ["numeric", "black", "coal", "blue", "green", "dlv_red"] as const;
      sizes.forEach(size => {
        styles.forEach(style => {
          const { unmount } = render(
            <StepperHorizontal steps={STEPS} size={size} iconStyle={style} />
          );
          expect(screen.getByTestId("stepper-horizontal")).toBeInTheDocument();
          unmount();
        });
      });
    });
  });

  describe("Theme fallback", () => {
    it("renders correctly without ThemeProvider (uses defaultThemeConfig)", () => {
      render(<StepperHorizontal steps={STEPS} />);
      expect(screen.getByTestId("stepper-horizontal")).toBeInTheDocument();
    });
  });
});
