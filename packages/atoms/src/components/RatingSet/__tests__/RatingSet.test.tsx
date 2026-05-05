import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RatingSet from "../index";
import type { RatingItem } from "../index";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../ThemeProvider", () => ({
  useTheme: () => ({ theme: { components: {} } }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Popup to render children directly (no portal, no overlay)
jest.mock("../../Popup", () => ({
  __esModule: true,
  default: ({ children, isOpen, title, footerCtasRight, onClose }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="mock-popup">
        <div data-testid="mock-popup-header">{title}</div>
        <div data-testid="mock-popup-content">{children}</div>
        <div data-testid="mock-popup-footer">{footerCtasRight}</div>
        {onClose && <button data-testid="mock-popup-close" onClick={onClose}>×</button>}
      </div>
    );
  },
}));

jest.mock("../../Button", () => ({
  __esModule: true,
  default: ({ text, onClick, buttonStyle: _, variant: _v, ...rest }: any) => (
    <button data-testid="mock-button" onClick={onClick} {...rest}>{text}</button>
  ),
}));

jest.mock("../../Badge", () => ({
  __esModule: true,
  default: ({ children }: any) => <span data-testid="mock-badge">{children}</span>,
}));

jest.mock("../../Tooltip", () => ({
  __esModule: true,
  default: ({ content, renderInline }: any) =>
    renderInline ? <div data-testid="mock-tooltip">{content}</div> : null,
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CUSTOM_ITEMS: RatingItem[] = [
  { icon: "😡", label: "Terrible" },
  { icon: "😞", label: "Bad" },
  { icon: "😐", label: "Okay" },
  { icon: "😊", label: "Good" },
  { icon: "🥰", label: "Amazing" },
];

// ─── Rendering ───────────────────────────────────────────────────────────────

describe("RatingSet — Rendering", () => {
  it("renders with default props", () => {
    render(<RatingSet />);
    expect(screen.getByTestId("mock-popup")).toBeInTheDocument();
  });

  it("renders the title in the popup header", () => {
    render(<RatingSet title="How was it?" />);
    expect(screen.getByTestId("mock-popup-header")).toHaveTextContent("How was it?");
  });

  it("renders default title 'Rate Us !'", () => {
    render(<RatingSet />);
    expect(screen.getByTestId("mock-popup-header")).toHaveTextContent("Rate Us !");
  });

  it("does not render when isOpen=false", () => {
    render(<RatingSet isOpen={false} />);
    expect(screen.queryByTestId("mock-popup")).not.toBeInTheDocument();
  });

  it("renders ghost skeleton when isGhost=true", () => {
    render(<RatingSet isGhost />);
    expect(screen.getByTestId("ratingset-ghost")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-popup")).not.toBeInTheDocument();
  });

  it("renders className on ghost", () => {
    render(<RatingSet isGhost className="my-ghost" />);
    expect(screen.getByTestId("ratingset-ghost").className).toContain("my-ghost");
  });
});


// ─── Emoji Style ─────────────────────────────────────────────────────────────

describe("RatingSet — Emojis", () => {
  it("renders 5 default emoji buttons", () => {
    render(<RatingSet ratingStyle="emojis" />);
    expect(screen.getByTestId("ratingset-emoji-set")).toBeInTheDocument();
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`ratingset-emoji-${i}`)).toBeInTheDocument();
    }
  });

  it("renders custom items when provided", () => {
    render(<RatingSet ratingStyle="emojis" items={CUSTOM_ITEMS} />);
    expect(screen.getByTestId("ratingset-emoji-0")).toHaveTextContent("😡");
    expect(screen.getByTestId("ratingset-emoji-4")).toHaveTextContent("🥰");
  });

  it("calls onChange with 1-based index when emoji is clicked", () => {
    const onChange = jest.fn();
    render(<RatingSet ratingStyle="emojis" value={0} onChange={onChange} />);
    fireEvent.click(screen.getByTestId("ratingset-emoji-2"));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("calls onChange with correct index for each emoji", () => {
    const onChange = jest.fn();
    render(<RatingSet ratingStyle="emojis" value={0} onChange={onChange} />);
    fireEvent.click(screen.getByTestId("ratingset-emoji-0"));
    expect(onChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByTestId("ratingset-emoji-4"));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("marks selected emoji with aria-pressed=true", () => {
    render(<RatingSet ratingStyle="emojis" value={3} />);
    expect(screen.getByTestId("ratingset-emoji-2")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("ratingset-emoji-0")).toHaveAttribute("aria-pressed", "false");
  });

  it("shows badge with correct label from items when value is set", () => {
    render(<RatingSet ratingStyle="emojis" value={3} showBadge />);
    expect(screen.getByTestId("ratingset-badge")).toBeInTheDocument();
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Ok");
  });

  it("shows badge with custom item label", () => {
    render(<RatingSet ratingStyle="emojis" items={CUSTOM_ITEMS} value={1} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Terrible");
  });

  it("does not show badge when value=0 for emojis", () => {
    render(<RatingSet ratingStyle="emojis" value={0} showBadge />);
    expect(screen.queryByTestId("ratingset-badge")).not.toBeInTheDocument();
  });

  it("does not show badge when showBadge=false", () => {
    render(<RatingSet ratingStyle="emojis" value={3} showBadge={false} />);
    expect(screen.queryByTestId("ratingset-badge")).not.toBeInTheDocument();
  });

  it("uses badgeLabel override instead of item label", () => {
    render(<RatingSet ratingStyle="emojis" value={3} showBadge badgeLabel="Custom!" />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Custom!");
  });

  it("has correct aria-label on each emoji button", () => {
    render(<RatingSet ratingStyle="emojis" items={CUSTOM_ITEMS} />);
    expect(screen.getByTestId("ratingset-emoji-0")).toHaveAttribute("aria-label", "Rate 1: Terrible");
    expect(screen.getByTestId("ratingset-emoji-4")).toHaveAttribute("aria-label", "Rate 5: Amazing");
  });
});

// ─── Stars Style ─────────────────────────────────────────────────────────────

describe("RatingSet — Stars", () => {
  it("renders 5 default star buttons", () => {
    render(<RatingSet ratingStyle="stars" />);
    expect(screen.getByTestId("ratingset-star-set")).toBeInTheDocument();
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`ratingset-star-${i}`)).toBeInTheDocument();
    }
  });

  it("renders custom maxStars count", () => {
    render(<RatingSet ratingStyle="stars" maxStars={3} />);
    expect(screen.getByTestId("ratingset-star-0")).toBeInTheDocument();
    expect(screen.getByTestId("ratingset-star-2")).toBeInTheDocument();
    expect(screen.queryByTestId("ratingset-star-3")).not.toBeInTheDocument();
  });

  it("calls onChange with 1-based index when star is clicked", () => {
    const onChange = jest.fn();
    render(<RatingSet ratingStyle="stars" value={0} onChange={onChange} />);
    fireEvent.click(screen.getByTestId("ratingset-star-3"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("marks stars up to value with aria-pressed=true", () => {
    render(<RatingSet ratingStyle="stars" value={3} />);
    expect(screen.getByTestId("ratingset-star-0")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("ratingset-star-2")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("ratingset-star-3")).toHaveAttribute("aria-pressed", "false");
  });

  it("shows badge with star label when value is set", () => {
    render(<RatingSet ratingStyle="stars" value={4} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Good");
  });

  it("renders custom star items with custom labels", () => {
    const starItems: RatingItem[] = [
      { icon: "⭐", label: "Meh" },
      { icon: "⭐", label: "Fine" },
      { icon: "⭐", label: "Wow" },
    ];
    render(<RatingSet ratingStyle="stars" items={starItems} value={2} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Fine");
    expect(screen.queryByTestId("ratingset-star-3")).not.toBeInTheDocument();
  });
});


// ─── Slider Style ────────────────────────────────────────────────────────────

describe("RatingSet — Slider", () => {
  it("renders slider input", () => {
    render(<RatingSet ratingStyle="slider" />);
    expect(screen.getByTestId("ratingset-slider")).toBeInTheDocument();
    expect(screen.getByTestId("ratingset-slider-input")).toBeInTheDocument();
  });

  it("renders slider knob", () => {
    render(<RatingSet ratingStyle="slider" value={50} />);
    expect(screen.getByTestId("ratingset-slider-knob")).toBeInTheDocument();
  });

  it("renders tooltip on slider", () => {
    render(<RatingSet ratingStyle="slider" value={50} />);
    expect(screen.getByTestId("ratingset-slider-tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("mock-tooltip")).toBeInTheDocument();
  });

  it("calls onChange with numeric value when slider changes", () => {
    const onChange = jest.fn();
    render(<RatingSet ratingStyle="slider" value={50} onChange={onChange} />);
    fireEvent.change(screen.getByTestId("ratingset-slider-input"), { target: { value: "75" } });
    expect(onChange).toHaveBeenCalledWith(75);
  });

  it("calls onChange with 0 when slider is dragged to start", () => {
    const onChange = jest.fn();
    render(<RatingSet ratingStyle="slider" value={50} onChange={onChange} />);
    fireEvent.change(screen.getByTestId("ratingset-slider-input"), { target: { value: "0" } });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("calls onChange with 100 when slider is dragged to end", () => {
    const onChange = jest.fn();
    render(<RatingSet ratingStyle="slider" value={50} onChange={onChange} />);
    fireEvent.change(screen.getByTestId("ratingset-slider-input"), { target: { value: "100" } });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it("shows badge at slider value=0 (unlike emojis/stars)", () => {
    render(<RatingSet ratingStyle="slider" value={0} showBadge />);
    expect(screen.getByTestId("ratingset-badge")).toBeInTheDocument();
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Unhappy");
  });

  it("shows correct badge label for slider ranges", () => {
    const { rerender } = render(<RatingSet ratingStyle="slider" value={10} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Unhappy");

    rerender(<RatingSet ratingStyle="slider" value={30} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Hmm");

    rerender(<RatingSet ratingStyle="slider" value={50} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Ok");

    rerender(<RatingSet ratingStyle="slider" value={70} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Nice");

    rerender(<RatingSet ratingStyle="slider" value={90} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Great");
  });

  it("shows correct badge label with custom slider items", () => {
    const items: RatingItem[] = [
      { icon: "🥶", label: "Freezing" },
      { icon: "😬", label: "Cold" },
      { icon: "😊", label: "Warm" },
      { icon: "🔥", label: "Hot" },
    ];
    const { rerender } = render(<RatingSet ratingStyle="slider" items={items} value={10} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Freezing");

    rerender(<RatingSet ratingStyle="slider" items={items} value={40} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Cold");

    rerender(<RatingSet ratingStyle="slider" items={items} value={60} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Warm");

    rerender(<RatingSet ratingStyle="slider" items={items} value={80} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Hot");
  });

  it("slider input has correct min/max/value attributes", () => {
    render(<RatingSet ratingStyle="slider" value={42} />);
    const input = screen.getByTestId("ratingset-slider-input");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("value", "42");
  });

  it("slider input has aria-label", () => {
    render(<RatingSet ratingStyle="slider" value={50} />);
    expect(screen.getByTestId("ratingset-slider-input")).toHaveAttribute("aria-label", "Rating slider");
  });
});

// ─── Feedback ────────────────────────────────────────────────────────────────

describe("RatingSet — Feedback", () => {
  it("renders feedbackInput when showFeedback=true", () => {
    render(
      <RatingSet
        showFeedback
        feedbackInput={<textarea data-testid="custom-feedback" placeholder="Type here" />}
      />
    );
    expect(screen.getByTestId("ratingset-feedback")).toBeInTheDocument();
    expect(screen.getByTestId("custom-feedback")).toBeInTheDocument();
  });

  it("does not render feedback when showFeedback=false", () => {
    render(
      <RatingSet
        showFeedback={false}
        feedbackInput={<textarea data-testid="custom-feedback" />}
      />
    );
    expect(screen.queryByTestId("ratingset-feedback")).not.toBeInTheDocument();
  });

  it("renders any custom node as feedbackInput", () => {
    render(
      <RatingSet
        showFeedback
        feedbackInput={<div data-testid="custom-input">Custom input component</div>}
      />
    );
    expect(screen.getByTestId("custom-input")).toBeInTheDocument();
    expect(screen.getByTestId("custom-input")).toHaveTextContent("Custom input component");
  });

  it("does not render anything when showFeedback=true but feedbackInput is not provided", () => {
    render(<RatingSet showFeedback />);
    expect(screen.getByTestId("ratingset-feedback")).toBeInTheDocument();
    // Should be empty
    expect(screen.getByTestId("ratingset-feedback")).toBeEmptyDOMElement();
  });
});


// ─── Footer / Submit ─────────────────────────────────────────────────────────

describe("RatingSet — Footer & Submit", () => {
  it("renders default submit button in footer", () => {
    render(<RatingSet />);
    expect(screen.getByTestId("mock-popup-footer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-button")).toHaveTextContent("Submit");
  });

  it("renders custom submitText", () => {
    render(<RatingSet submitText="Send" />);
    expect(screen.getByTestId("mock-button")).toHaveTextContent("Send");
  });

  it("calls onSubmit when submit button is clicked", () => {
    const onSubmit = jest.fn();
    render(<RatingSet onSubmit={onSubmit} />);
    fireEvent.click(screen.getByTestId("mock-button"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders custom footerActions instead of default button", () => {
    render(
      <RatingSet footerActions={<button data-testid="custom-cta">Custom</button>} />
    );
    expect(screen.getByTestId("custom-cta")).toBeInTheDocument();
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();
  });

  it("calls onClose when popup close is triggered", () => {
    const onClose = jest.fn();
    render(<RatingSet onClose={onClose} />);
    fireEvent.click(screen.getByTestId("mock-popup-close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

// ─── Uncontrolled Mode ───────────────────────────────────────────────────────

describe("RatingSet — Uncontrolled", () => {
  it("manages internal state for emojis when no onChange provided", () => {
    render(<RatingSet ratingStyle="emojis" showBadge />);
    // Initially no badge (value=0)
    expect(screen.queryByTestId("ratingset-badge")).not.toBeInTheDocument();
    // Click emoji 3
    fireEvent.click(screen.getByTestId("ratingset-emoji-2"));
    // Badge should now appear with "Ok"
    expect(screen.getByTestId("ratingset-badge")).toBeInTheDocument();
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Ok");
  });

  it("manages internal state for stars when no onChange provided", () => {
    render(<RatingSet ratingStyle="stars" showBadge />);
    expect(screen.queryByTestId("ratingset-badge")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("ratingset-star-4"));
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Excellent");
  });

  it("manages internal state for slider when no onChange provided", () => {
    render(<RatingSet ratingStyle="slider" showBadge />);
    // Slider starts at 50 (internal default)
    expect(screen.getByTestId("ratingset-badge")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("ratingset-slider-input"), { target: { value: "10" } });
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Unhappy");
  });
});

// ─── Compound Composition ────────────────────────────────────────────────────

describe("RatingSet — Compound Composition", () => {
  it("renders children instead of default content", () => {
    render(
      <RatingSet ratingStyle="emojis" value={2}>
        <div data-testid="custom-child">Custom content</div>
      </RatingSet>
    );
    expect(screen.getByTestId("custom-child")).toBeInTheDocument();
    // Default emoji set should NOT render
    expect(screen.queryByTestId("ratingset-emoji-set")).not.toBeInTheDocument();
  });

  it("sub-components read context from parent", () => {
    const onChange = jest.fn();
    render(
      <RatingSet ratingStyle="emojis" value={0} onChange={onChange} items={CUSTOM_ITEMS}>
        <RatingSet.Content>
          <RatingSet.EmojiRating />
        </RatingSet.Content>
      </RatingSet>
    );
    expect(screen.getByTestId("ratingset-emoji-0")).toHaveTextContent("😡");
    fireEvent.click(screen.getByTestId("ratingset-emoji-1"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("BadgeLabel reads label from context items", () => {
    render(
      <RatingSet ratingStyle="emojis" value={2} items={CUSTOM_ITEMS}>
        <RatingSet.Content>
          <RatingSet.BadgeLabel />
        </RatingSet.Content>
      </RatingSet>
    );
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Bad");
  });

  it("BadgeLabel accepts override label prop", () => {
    render(
      <RatingSet ratingStyle="emojis" value={2} items={CUSTOM_ITEMS}>
        <RatingSet.Content>
          <RatingSet.BadgeLabel label="Override" />
        </RatingSet.Content>
      </RatingSet>
    );
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Override");
  });

  it("Feedback sub-component works in composition mode", () => {
    const onChange = jest.fn();
    render(
      <RatingSet ratingStyle="emojis" value={1}>
        <RatingSet.Content>
          <RatingSet.Feedback>
            <textarea
              data-testid="ratingset-feedback-input"
              value="test"
              onChange={(e) => onChange(e.target.value)}
              placeholder="Custom..."
            />
          </RatingSet.Feedback>
        </RatingSet.Content>
      </RatingSet>
    );
    expect(screen.getByTestId("ratingset-feedback-input")).toHaveValue("test");
    expect(screen.getByTestId("ratingset-feedback-input")).toHaveAttribute("placeholder", "Custom...");
    fireEvent.change(screen.getByTestId("ratingset-feedback-input"), { target: { value: "new" } });
    expect(onChange).toHaveBeenCalledWith("new");
  });
});

// ─── Edge Cases ──────────────────────────────────────────────────────────────

describe("RatingSet — Edge Cases", () => {
  it("clamps slider value to 0-100 range", () => {
    render(<RatingSet ratingStyle="slider" value={150} showBadge />);
    expect(screen.getByTestId("ratingset-slider-input")).toHaveAttribute("value", "100");
  });

  it("clamps slider value at negative to 0", () => {
    render(<RatingSet ratingStyle="slider" value={-10} showBadge />);
    expect(screen.getByTestId("ratingset-slider-input")).toHaveAttribute("value", "0");
  });

  it("emoji value beyond items length shows last item label", () => {
    render(<RatingSet ratingStyle="emojis" value={99} showBadge />);
    expect(screen.getByTestId("mock-badge")).toHaveTextContent("Great");
  });

  it("renders all 3 rating styles without error", () => {
    const styles = ["emojis", "stars", "slider"] as const;
    styles.forEach((style) => {
      const { unmount } = render(<RatingSet ratingStyle={style} />);
      expect(screen.getByTestId("mock-popup")).toBeInTheDocument();
      unmount();
    });
  });

  it("renders with empty items array without crashing", () => {
    render(<RatingSet ratingStyle="emojis" items={[]} />);
    expect(screen.getByTestId("ratingset-emoji-set")).toBeInTheDocument();
    expect(screen.queryByTestId("ratingset-emoji-0")).not.toBeInTheDocument();
  });

  it("renders with single item", () => {
    const onChange = jest.fn();
    render(<RatingSet ratingStyle="emojis" items={[{ icon: "👍", label: "Like" }]} value={0} onChange={onChange} />);
    expect(screen.getByTestId("ratingset-emoji-0")).toHaveTextContent("👍");
    fireEvent.click(screen.getByTestId("ratingset-emoji-0"));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
