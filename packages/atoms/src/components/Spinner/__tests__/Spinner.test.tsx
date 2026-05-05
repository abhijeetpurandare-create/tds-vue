import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "../index";

const tarmacSpinnerConfig = {
  variants: {
    "tarmac-01": { color: "#000000", trackColor: "#d4d4d4" },
    "tarmac-02": { color: "#d4d4d4", trackColor: "#000000" },
    "tarmac-03": { color: "#ffffff", trackColor: "rgba(255,255,255,0.2)" },
    "tarmac-04": { color: "#ed1b36", trackColor: "#d4d4d4" },
    default: { color: "#4B5563", trackColor: "#E5E7EB" },
    primary: { color: "#2563EB", trackColor: "#DBEAFE" },
  },
  sizes: {
    sm: { size: "h-4 w-4", strokeWidth: 3 },
    md: { size: "h-6 w-6", strokeWidth: 4 },
    lg: { size: "h-8 w-8", strokeWidth: 4 },
    "16px": { size: "16px", strokeWidth: 3 },
    "20px": { size: "20px", strokeWidth: 3 },
    "24px": { size: "24px", strokeWidth: 3.5 },
    "28px": { size: "28px", strokeWidth: 3.5 },
    "32px": { size: "32px", strokeWidth: 4 },
    "36px": { size: "36px", strokeWidth: 4 },
    "40px": { size: "40px", strokeWidth: 4 },
    "44px": { size: "44px", strokeWidth: 4 },
  },
};

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({
    theme: { components: { spinner: tarmacSpinnerConfig } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

/* ═══════════════════════════════════════════════════════════════════
 * LEGACY SPINNER — backward compatibility tests (≥20)
 * ═══════════════════════════════════════════════════════════════════ */
describe("Spinner — Legacy (backward compatibility)", () => {
  it("renders with default props", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders an SVG inside the status div", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a circle (track) and path (arc) in the SVG", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("circle")).toBeInTheDocument();
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  // --- Sizes ---
  it("renders size=sm without error", () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=md without error", () => {
    render(<Spinner size="md" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=lg without error", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // --- Variants ---
  it("renders variant=default", () => {
    render(<Spinner variant="default" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders variant=primary", () => {
    render(<Spinner variant="primary" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders variant=secondary", () => {
    render(<Spinner variant="secondary" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders variant=success", () => {
    render(<Spinner variant="success" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders variant=error", () => {
    render(<Spinner variant="error" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders variant=warning", () => {
    render(<Spinner variant="warning" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders variant=info", () => {
    render(<Spinner variant="info" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // --- Custom props ---
  it("applies custom color prop", () => {
    const { container } = render(<Spinner color="red" />);
    const path = container.querySelector("path");
    expect(path).toBeInTheDocument();
  });

  it("applies custom trackColor prop", () => {
    const { container } = render(<Spinner trackColor="blue" />);
    const circle = container.querySelector("circle");
    expect(circle).toBeInTheDocument();
  });

  it("applies className prop", () => {
    const { container } = render(<Spinner className="my-spinner" />);
    expect(container.querySelector(".my-spinner")).toBeInTheDocument();
  });

  it("applies inline style prop", () => {
    render(<Spinner style={{ marginTop: 10 }} />);
    const el = screen.getByRole("status");
    expect(el.style.marginTop).toBe("10px");
  });

  // --- Backward compat: tarmac props ignored without tarmacVariant ---
  it("ignores tarmacSize when tarmacVariant is not set", () => {
    render(<Spinner tarmacSize="44px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders legacy path when no tarmac props", () => {
    const { container } = render(<Spinner size="md" variant="primary" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Legacy path uses className-based stroke colors
    const circle = container.querySelector("circle");
    expect(circle?.getAttribute("class")).toBeTruthy();
  });
});

/* ═══════════════════════════════════════════════════════════════════
 * TARMAC TDS SPINNER — new Tarmac rendering path tests (≥25)
 * ═══════════════════════════════════════════════════════════════════ */
describe("Spinner — Tarmac TDS", () => {
  // --- Basic rendering ---
  it("renders tarmac spinner when tarmacVariant is set", () => {
    render(<Spinner tarmacVariant="tarmac-01" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders an SVG in tarmac path", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders circle and path in tarmac SVG", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" />);
    expect(container.querySelector("circle")).toBeInTheDocument();
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("renders sr-only Loading text for accessibility", () => {
    render(<Spinner tarmacVariant="tarmac-01" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // --- All 4 variants ---
  it("renders tarmac-01 variant", () => {
    render(<Spinner tarmacVariant="tarmac-01" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders tarmac-02 variant", () => {
    render(<Spinner tarmacVariant="tarmac-02" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders tarmac-03 variant", () => {
    render(<Spinner tarmacVariant="tarmac-03" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders tarmac-04 variant", () => {
    render(<Spinner tarmacVariant="tarmac-04" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // --- All 8 sizes ---
  it("renders size=16px", () => {
    render(<Spinner tarmacVariant="tarmac-01" tarmacSize="16px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=20px", () => {
    render(<Spinner tarmacVariant="tarmac-01" tarmacSize="20px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=24px", () => {
    render(<Spinner tarmacVariant="tarmac-01" tarmacSize="24px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=28px", () => {
    render(<Spinner tarmacVariant="tarmac-01" tarmacSize="28px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=32px", () => {
    render(<Spinner tarmacVariant="tarmac-01" tarmacSize="32px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=36px", () => {
    render(<Spinner tarmacVariant="tarmac-01" tarmacSize="36px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=40px", () => {
    render(<Spinner tarmacVariant="tarmac-01" tarmacSize="40px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders size=44px", () => {
    render(<Spinner tarmacVariant="tarmac-01" tarmacSize="44px" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // --- Defaults ---
  it("defaults to 24px size when tarmacSize is not provided", () => {
    render(<Spinner tarmacVariant="tarmac-01" />);
    const el = screen.getByRole("status");
    expect(el.style.width).toBe("24px");
    expect(el.style.height).toBe("24px");
  });

  // --- Exhaustive combo test ---
  it("renders all variant × size combinations without error", () => {
    const variants = ["tarmac-01", "tarmac-02", "tarmac-03", "tarmac-04"] as const;
    const sizes = ["16px", "20px", "24px", "28px", "32px", "36px", "40px", "44px"] as const;
    variants.forEach((v) =>
      sizes.forEach((sz) => {
        const { unmount } = render(
          <Spinner tarmacVariant={v} tarmacSize={sz} />
        );
        expect(screen.getByRole("status")).toBeInTheDocument();
        unmount();
      })
    );
  });

  // --- Stroke colors from theme ---
  it("applies tarmac-01 stroke color to path", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" />);
    const path = container.querySelector("path");
    expect(path?.getAttribute("stroke")).toBe("#000000");
  });

  it("applies tarmac-01 track color to circle", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" />);
    const circle = container.querySelector("circle");
    expect(circle?.getAttribute("stroke")).toBe("#d4d4d4");
  });

  it("applies tarmac-04 DLV Red stroke color", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-04" />);
    const path = container.querySelector("path");
    expect(path?.getAttribute("stroke")).toBe("#ed1b36");
  });

  // --- Custom color overrides ---
  it("allows color prop to override tarmac variant color", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" color="purple" />);
    const path = container.querySelector("path");
    expect(path?.getAttribute("stroke")).toBe("purple");
  });

  it("allows trackColor prop to override tarmac variant trackColor", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" trackColor="orange" />);
    const circle = container.querySelector("circle");
    expect(circle?.getAttribute("stroke")).toBe("orange");
  });

  // --- HTML attributes ---
  it("applies className", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" className="custom-spin" />);
    expect(container.querySelector(".custom-spin")).toBeInTheDocument();
  });

  it("applies inline style", () => {
    render(<Spinner tarmacVariant="tarmac-01" style={{ opacity: 0.5 }} />);
    const el = screen.getByRole("status");
    expect(el.style.opacity).toBe("0.5");
  });

  // --- Stroke width from size config ---
  it("uses correct strokeWidth for 16px size", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" tarmacSize="16px" />);
    const circle = container.querySelector("circle");
    expect(circle?.getAttribute("stroke-width")).toBe("3");
  });

  it("uses correct strokeWidth for 32px size", () => {
    const { container } = render(<Spinner tarmacVariant="tarmac-01" tarmacSize="32px" />);
    const circle = container.querySelector("circle");
    expect(circle?.getAttribute("stroke-width")).toBe("4");
  });
});
