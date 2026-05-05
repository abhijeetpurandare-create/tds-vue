import React from "react";
import { render, screen } from "@testing-library/react";
import StepperVertical from "../index";
import type { StepperVerticalStep } from "../index";

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({ theme: { components: {} } }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Also mock StepperText and StepperIcon since they have their own ThemeProvider deps
jest.mock("../../StepperText", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ title, subtext, showSubtext, state, stepNumber, "data-testid": testId }: any) => (
      <div data-testid={testId || "stepper-text"} data-state={state} data-step={stepNumber}>
        <span data-testid="step-title">{title}</span>
        {showSubtext && subtext && <span data-testid="step-subtext">{subtext}</span>}
      </div>
    ),
  };
});

const STEPS: StepperVerticalStep[] = [
  { title: "Order Placed", subtext: "Received", state: "default" },
  { title: "Processing", subtext: "In progress", state: "active" },
  { title: "Shipped", subtext: "On the way", state: "disabled" },
];

describe("StepperVertical", () => {
  describe("Rendering", () => {
    it("renders without crashing with default props", () => {
      render(<StepperVertical steps={STEPS} />);
      expect(screen.getByTestId("stepper-vertical")).toBeInTheDocument();
    });

    it("renders correct number of steps", () => {
      render(<StepperVertical steps={STEPS} />);
      expect(screen.getAllByTestId(/stepper-vertical-step-/)).toHaveLength(3);
    });

    it("renders step titles", () => {
      render(<StepperVertical steps={STEPS} />);
      expect(screen.getByText("Order Placed")).toBeInTheDocument();
      expect(screen.getByText("Processing")).toBeInTheDocument();
      expect(screen.getByText("Shipped")).toBeInTheDocument();
    });

    it("renders fallback title when title is not provided", () => {
      render(<StepperVertical steps={[{}, {}]} />);
      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
    });

    it("applies data-testid prop", () => {
      render(<StepperVertical steps={STEPS} data-testid="my-stepper" />);
      expect(screen.getByTestId("my-stepper")).toBeInTheDocument();
    });

    it("applies data-size attribute", () => {
      render(<StepperVertical steps={STEPS} size="md" />);
      expect(screen.getByTestId("stepper-vertical")).toHaveAttribute("data-size", "md");
    });

    it("applies custom className", () => {
      const { container } = render(<StepperVertical steps={STEPS} className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("renders single step without crashing", () => {
      render(<StepperVertical steps={[{ title: "Only Step" }]} />);
      expect(screen.getByText("Only Step")).toBeInTheDocument();
    });

    it("renders empty steps array without crashing", () => {
      render(<StepperVertical steps={[]} />);
      expect(screen.getByTestId("stepper-vertical")).toBeInTheDocument();
    });
  });

  describe("Subtext", () => {
    it("does not render subtext by default (showSubtext=false)", () => {
      render(<StepperVertical steps={STEPS} showSubtext={false} />);
      expect(screen.queryByTestId("step-subtext")).not.toBeInTheDocument();
    });

    it("renders subtext when showSubtext=true and subtext is provided", () => {
      render(<StepperVertical steps={STEPS} showSubtext={true} />);
      expect(screen.getAllByTestId("step-subtext")).toHaveLength(3);
    });

    it("does not render subtext when showSubtext=true but subtext is empty", () => {
      const steps: StepperVerticalStep[] = [{ title: "Step 1" }];
      render(<StepperVertical steps={steps} showSubtext={true} />);
      expect(screen.queryByTestId("step-subtext")).not.toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders size lg without error", () => {
      render(<StepperVertical steps={STEPS} size="lg" />);
      expect(screen.getByTestId("stepper-vertical")).toHaveAttribute("data-size", "lg");
    });

    it("renders size md without error", () => {
      render(<StepperVertical steps={STEPS} size="md" />);
      expect(screen.getByTestId("stepper-vertical")).toHaveAttribute("data-size", "md");
    });

    it("renders size sm without error", () => {
      render(<StepperVertical steps={STEPS} size="sm" />);
      expect(screen.getByTestId("stepper-vertical")).toHaveAttribute("data-size", "sm");
    });
  });

  describe("States", () => {
    it("passes correct state to each step", () => {
      render(<StepperVertical steps={STEPS} />);
      const step0 = screen.getByTestId("stepper-vertical-step-0").firstChild as HTMLElement;
      const step1 = screen.getByTestId("stepper-vertical-step-1").firstChild as HTMLElement;
      const step2 = screen.getByTestId("stepper-vertical-step-2").firstChild as HTMLElement;
      expect(step0).toHaveAttribute("data-state", "default");
      expect(step1).toHaveAttribute("data-state", "active");
      expect(step2).toHaveAttribute("data-state", "disabled");
    });

    it("defaults to 'default' state when step.state is not provided", () => {
      render(<StepperVertical steps={[{ title: "Step" }]} />);
      const stepText = screen.getByTestId("stepper-vertical-step-0").firstChild as HTMLElement;
      expect(stepText).toHaveAttribute("data-state", "default");
    });

    it("renders all-default steps", () => {
      const steps = STEPS.map(s => ({ ...s, state: "default" as const }));
      render(<StepperVertical steps={steps} />);
      screen.getAllByTestId(/stepper-vertical-step-/).forEach(el => {
        expect((el.firstChild as HTMLElement).getAttribute("data-state")).toBe("default");
      });
    });

    it("renders all-active steps", () => {
      const steps = STEPS.map(s => ({ ...s, state: "active" as const }));
      render(<StepperVertical steps={steps} />);
      screen.getAllByTestId(/stepper-vertical-step-/).forEach(el => {
        expect((el.firstChild as HTMLElement).getAttribute("data-state")).toBe("active");
      });
    });

    it("renders all-disabled steps", () => {
      const steps = STEPS.map(s => ({ ...s, state: "disabled" as const }));
      render(<StepperVertical steps={steps} />);
      screen.getAllByTestId(/stepper-vertical-step-/).forEach(el => {
        expect((el.firstChild as HTMLElement).getAttribute("data-state")).toBe("disabled");
      });
    });
  });

  describe("Icon Styles", () => {
    const iconStyles = ["numeric", "icon", "black", "coal", "dlv_red", "blue", "green"] as const;
    iconStyles.forEach(style => {
      it(`renders iconStyle="${style}" without error`, () => {
        render(<StepperVertical steps={STEPS} iconStyle={style} />);
        expect(screen.getByTestId("stepper-vertical")).toBeInTheDocument();
      });
    });
  });

  describe("Step Numbers", () => {
    it("passes correct stepNumber to each step (1-indexed)", () => {
      render(<StepperVertical steps={STEPS} />);
      expect(screen.getByTestId("stepper-vertical-step-0").firstChild).toHaveAttribute("data-step", "1");
      expect(screen.getByTestId("stepper-vertical-step-1").firstChild).toHaveAttribute("data-step", "2");
      expect(screen.getByTestId("stepper-vertical-step-2").firstChild).toHaveAttribute("data-step", "3");
    });
  });

  describe("Step Counts", () => {
    [2, 3, 4, 5, 6, 7, 8].forEach(n => {
      it(`renders ${n} steps without error`, () => {
        const steps = Array.from({ length: n }, (_, i) => ({ title: `Step ${i + 1}` }));
        render(<StepperVertical steps={steps} />);
        expect(screen.getAllByTestId(/stepper-vertical-step-/)).toHaveLength(n);
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
            <StepperVertical steps={STEPS} size={size} iconStyle={style} />
          );
          expect(screen.getByTestId("stepper-vertical")).toBeInTheDocument();
          unmount();
        });
      });
    });
  });

  describe("Theme fallback", () => {
    it("renders correctly without ThemeProvider (uses defaultThemeConfig)", () => {
      render(<StepperVertical steps={STEPS} />);
      expect(screen.getByTestId("stepper-vertical")).toBeInTheDocument();
    });
  });
});
